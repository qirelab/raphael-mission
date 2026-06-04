import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/database.js';
import { logger } from './logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, '..', '..', 'migrations');

// Migrations up to and including this number predate the auto-runner. On a
// production DB they have already been applied manually; on a fresh install
// they have not. The baseline step (see baselineIfNeeded) decides which
// situation we're in by probing for the `users` table.
const PRE_RUNNER_BASELINE = '012';

// Sample-data migration must never auto-run — it TRUNCATEs core tables.
const SKIP_FILES = new Set(['003_insert_sample_data.sql']);

const ensureTrackingTable = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// If schema_migrations is empty AND a core table from the pre-runner era
// already exists, record migrations 000–012 as already applied so the runner
// doesn't try to re-create / re-truncate them. On a truly fresh DB the core
// table is absent and we let every migration run.
const baselineIfNeeded = async (client, allFiles) => {
  const { rows } = await client.query('SELECT COUNT(*)::int AS n FROM schema_migrations');
  if (rows[0].n > 0) return;

  const probe = await client.query(`
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'users'
    LIMIT 1
  `);
  if (probe.rowCount === 0) return;

  const baselineFiles = allFiles.filter((f) => f.slice(0, 3) <= PRE_RUNNER_BASELINE);
  if (baselineFiles.length === 0) return;

  for (const f of baselineFiles) {
    await client.query(
      'INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING',
      [f]
    );
  }
  logger.info(`📌 Baseline: marked ${baselineFiles.length} pre-runner migrations as applied`);
};

// The `update_updated_at_column()` trigger function is defined only in
// migration 000. On a baselined database (000–012 marked applied without
// actually running — see baselineIfNeeded) the tables exist but this function
// may be missing, which makes every later migration that attaches an
// updated_at trigger fail with "function update_updated_at_column() does not
// exist". Recreate it idempotently so pending migrations can rely on it.
const ensureTriggerFunction = async (client) => {
  await client.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
};

const listMigrationFiles = async () => {
  const entries = await readdir(MIGRATIONS_DIR);
  return entries
    .filter((f) => f.endsWith('.sql') && !SKIP_FILES.has(f))
    .sort();
};

const applyMigration = async (client, filename) => {
  const sql = await readFile(join(MIGRATIONS_DIR, filename), 'utf8');
  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
    await client.query('COMMIT');
    logger.info(`✅ Migration applied: ${filename}`);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  }
};

export const runMigrations = async () => {
  const client = await pool.connect();
  try {
    await ensureTrackingTable(client);

    const files = await listMigrationFiles();
    await baselineIfNeeded(client, files);

    // Guarantee shared DB objects (trigger function) exist before applying
    // pending migrations that depend on them.
    await ensureTriggerFunction(client);

    const { rows } = await client.query('SELECT filename FROM schema_migrations');
    const applied = new Set(rows.map((r) => r.filename));

    const pending = files.filter((f) => !applied.has(f));
    if (pending.length === 0) {
      logger.info('🗂️  Migrations: nothing to apply');
      return;
    }

    logger.info(`🗂️  Applying ${pending.length} migration(s): ${pending.join(', ')}`);
    for (const f of pending) {
      await applyMigration(client, f);
    }
  } finally {
    client.release();
  }
};
