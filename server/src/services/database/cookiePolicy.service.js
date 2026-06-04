import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

const CACHE_KEY = 'cookie:policy';

// Build whitelist programmatically — each base field has en/ru/pl variants.
const BASES = [
  'hero_title', 'hero_subtitle',
  'section1_title', 'section1_content',
  'section2_title', 'section2_content',
  'type1_title', 'type1_desc',
  'type2_title', 'type2_desc',
  'type3_title', 'type3_desc',
  'section3_title', 'section3_content',
  'section4_title', 'section4_content',
  'contact_title', 'contact_content',
];
const LANGS = ['en', 'ru', 'pl'];
const TEXT_COLUMNS = BASES.flatMap((base) => LANGS.map((lang) => `${base}_${lang}`));

export const cookiePolicyDbService = {
  async get() {
    const cached = await cacheService.get(CACHE_KEY);
    if (cached) {
      logger.info('📦 Returning cached cookie policy');
      return cached;
    }

    const result = await pool.query(
      'SELECT * FROM cookie_policy ORDER BY id ASC LIMIT 1'
    );
    const data = result.rows[0] || null;
    await cacheService.set(CACHE_KEY, data);
    return data;
  },

  async update(payload) {
    const setClauses = [];
    const values = [];
    let i = 1;
    for (const col of TEXT_COLUMNS) {
      if (Object.prototype.hasOwnProperty.call(payload, col)) {
        setClauses.push(`${col} = $${i++}`);
        values.push(payload[col] ?? null);
      }
    }

    const existing = await pool.query('SELECT id FROM cookie_policy ORDER BY id ASC LIMIT 1');

    let row;
    if (existing.rows.length > 0) {
      if (setClauses.length === 0) {
        const current = await pool.query(
          'SELECT * FROM cookie_policy WHERE id = $1',
          [existing.rows[0].id]
        );
        row = current.rows[0];
      } else {
        setClauses.push('updated_at = CURRENT_TIMESTAMP');
        values.push(existing.rows[0].id);
        const sql = `UPDATE cookie_policy SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`;
        const result = await pool.query(sql, values);
        row = result.rows[0];
      }
    } else {
      const cols = [];
      const placeholders = [];
      const insertValues = [];
      let j = 1;
      for (const col of TEXT_COLUMNS) {
        if (Object.prototype.hasOwnProperty.call(payload, col)) {
          cols.push(col);
          placeholders.push(`$${j++}`);
          insertValues.push(payload[col] ?? null);
        }
      }
      const sql = cols.length
        ? `INSERT INTO cookie_policy (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`
        : `INSERT INTO cookie_policy DEFAULT VALUES RETURNING *`;
      const result = await pool.query(sql, insertValues);
      row = result.rows[0];
    }

    await cacheService.del(CACHE_KEY);
    logger.info('🗑️ Cleared cookie_policy cache after update');
    return row;
  },
};
