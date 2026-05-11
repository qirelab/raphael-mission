import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

const CACHE_KEY = 'about:page';

// All text columns kept in one place — used for whitelisted UPDATE.
// Order has no meaning, but listing them once keeps the service DRY.
const TEXT_COLUMNS = [
  'hero_title_en', 'hero_title_ru', 'hero_title_pl',

  'hero_paragraph1_en', 'hero_paragraph1_ru', 'hero_paragraph1_pl',
  'hero_paragraph2_en', 'hero_paragraph2_ru', 'hero_paragraph2_pl',
  'hero_paragraph3_en', 'hero_paragraph3_ru', 'hero_paragraph3_pl',
  'hero_paragraph4_en', 'hero_paragraph4_ru', 'hero_paragraph4_pl',
  'hero_paragraph5_en', 'hero_paragraph5_ru', 'hero_paragraph5_pl',

  'hero_image_url',

  'values_title_en', 'values_title_ru', 'values_title_pl',
  'values_desc_en',  'values_desc_ru',  'values_desc_pl',

  'value1_title_en', 'value1_title_ru', 'value1_title_pl',
  'value1_desc_en',  'value1_desc_ru',  'value1_desc_pl',

  'value2_title_en', 'value2_title_ru', 'value2_title_pl',
  'value2_desc_en',  'value2_desc_ru',  'value2_desc_pl',

  'value3_title_en', 'value3_title_ru', 'value3_title_pl',
  'value3_desc_en',  'value3_desc_ru',  'value3_desc_pl',
];

export const aboutDbService = {
  async get() {
    const cached = await cacheService.get(CACHE_KEY);
    if (cached) {
      logger.info('📦 Returning cached about page');
      return cached;
    }

    const result = await pool.query(
      'SELECT * FROM about_page ORDER BY id ASC LIMIT 1'
    );

    const data = result.rows[0] || null;
    await cacheService.set(CACHE_KEY, data);
    return data;
  },

  async update(payload) {
    // Whitelist — never trust body keys against the SQL column list directly.
    const setClauses = [];
    const values = [];
    let i = 1;
    for (const col of TEXT_COLUMNS) {
      if (Object.prototype.hasOwnProperty.call(payload, col)) {
        setClauses.push(`${col} = $${i++}`);
        values.push(payload[col] ?? null);
      }
    }

    const existing = await pool.query('SELECT id FROM about_page ORDER BY id ASC LIMIT 1');

    let row;
    if (existing.rows.length > 0) {
      if (setClauses.length === 0) {
        // Nothing to update — just return the current state.
        const current = await pool.query(
          'SELECT * FROM about_page WHERE id = $1',
          [existing.rows[0].id]
        );
        row = current.rows[0];
      } else {
        setClauses.push('updated_at = CURRENT_TIMESTAMP');
        values.push(existing.rows[0].id);
        const sql = `UPDATE about_page SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`;
        const result = await pool.query(sql, values);
        row = result.rows[0];
      }
    } else {
      // First-time insert: build a column list + placeholders.
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
        ? `INSERT INTO about_page (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`
        : `INSERT INTO about_page DEFAULT VALUES RETURNING *`;
      const result = await pool.query(sql, insertValues);
      row = result.rows[0];
    }

    await cacheService.del(CACHE_KEY);
    logger.info('🗑️ Cleared about_page cache after update');
    return row;
  },
};
