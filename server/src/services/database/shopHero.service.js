import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

const CACHE_KEY = 'shop:hero';

// Whitelist of writable columns — used both for filtering the request body and
// for building the UPDATE/INSERT statements safely.
const TEXT_COLUMNS = [
  'title_en', 'title_ru', 'title_pl',
  'description_en', 'description_ru', 'description_pl',
];

export const shopHeroDbService = {
  async get() {
    const cached = await cacheService.get(CACHE_KEY);
    if (cached) {
      logger.info('📦 Returning cached shop hero');
      return cached;
    }

    const result = await pool.query(
      'SELECT * FROM shop_hero ORDER BY id ASC LIMIT 1'
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

    const existing = await pool.query('SELECT id FROM shop_hero ORDER BY id ASC LIMIT 1');

    let row;
    if (existing.rows.length > 0) {
      if (setClauses.length === 0) {
        const current = await pool.query(
          'SELECT * FROM shop_hero WHERE id = $1',
          [existing.rows[0].id]
        );
        row = current.rows[0];
      } else {
        setClauses.push('updated_at = CURRENT_TIMESTAMP');
        values.push(existing.rows[0].id);
        const sql = `UPDATE shop_hero SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`;
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
        ? `INSERT INTO shop_hero (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`
        : `INSERT INTO shop_hero DEFAULT VALUES RETURNING *`;
      const result = await pool.query(sql, insertValues);
      row = result.rows[0];
    }

    await cacheService.del(CACHE_KEY);
    logger.info('🗑️ Cleared shop_hero cache after update');
    return row;
  },
};
