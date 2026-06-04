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

// Content migrations (005–012) and the schema object each one is expected to
// produce. On a legacy/baselined production DB these were wrongly marked as
// applied without running, so their tables/columns never got created — which
// made the public content endpoints (/about, /donation-page, …) return 500.
const SCHEMA_GUARDS = [
  { file: '005_create_about_page.sql', table: 'about_page' },
  { file: '006_create_projects_hero.sql', table: 'projects_hero' },
  { file: '007_add_projects_cta.sql', table: 'projects_hero', column: 'cta_title_en' },
  { file: '008_create_testimonies_hero.sql', table: 'testimonies_hero' },
  { file: '009_add_testimonies_share.sql', table: 'testimonies_hero', column: 'share_title_en' },
  { file: '010_create_shop_hero.sql', table: 'shop_hero' },
  { file: '011_create_donation_page.sql', table: 'donation_page' },
  { file: '012_create_privacy_policy.sql', table: 'privacy_policy' },
];

const schemaObjectExists = async (client, table, column) => {
  if (column) {
    const r = await client.query(
      `SELECT 1 FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1 AND column_name = $2 LIMIT 1`,
      [table, column]
    );
    return r.rowCount > 0;
  }
  const r = await client.query(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = $1 LIMIT 1`,
    [table]
  );
  return r.rowCount > 0;
};

// Self-heal: if a guarded migration is recorded as applied but the schema
// object it should have created is missing, drop its record so it re-runs this
// cycle. All guarded migrations are idempotent (CREATE TABLE IF NOT EXISTS /
// ADD COLUMN IF NOT EXISTS / seed-if-empty), so re-running them is safe and a
// no-op on databases where the objects already exist.
const healBaselinedSchema = async (client) => {
  for (const g of SCHEMA_GUARDS) {
    const present = await schemaObjectExists(client, g.table, g.column);
    if (present) continue;
    const del = await client.query('DELETE FROM schema_migrations WHERE filename = $1', [g.file]);
    if (del.rowCount > 0) {
      const what = g.column ? `column ${g.table}.${g.column}` : `table ${g.table}`;
      logger.warn(`🩹 Re-queuing migration ${g.file}: expected ${what} is missing`);
    }
  }
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

    // Re-queue any content migration whose schema object is missing (legacy
    // baselined DBs) so it re-runs below.
    await healBaselinedSchema(client);

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
