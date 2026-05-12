import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

const CACHE_KEY = 'home:page';

// Multilingual bases — each has _en, _ru, _pl variants.
const MULTILINGUAL_BASES = [
  'hero_title',
  'hero_title_highlight',
  'hero_description',
  'hero_btn_support',
  'hero_btn_learn_more',

  'mission_title',
  'mission_description',
  'card1_title', 'card1_desc',
  'card2_title', 'card2_desc',
  'card3_title', 'card3_desc',

  'projects_title', 'projects_description',
  'support_title', 'support_description',
  'testimonies_title', 'testimonies_description',

  'contact_title', 'contact_description',
  'label_address', 'label_phone', 'label_email',
  'form_title',
  'ph_first_name', 'ph_last_name', 'ph_email', 'ph_subject', 'ph_message',
];
const LANGS = ['en', 'ru', 'pl'];

// Single-value columns (no language variants)
const SINGLE_COLUMNS = ['logo_url'];

const TEXT_COLUMNS = [
  ...MULTILINGUAL_BASES.flatMap((base) => LANGS.map((lang) => `${base}_${lang}`)),
  ...SINGLE_COLUMNS,
];

export const homePageDbService = {
  async get() {
    const cached = await cacheService.get(CACHE_KEY);
    if (cached) {
      logger.info('📦 Returning cached home page');
      return cached;
    }

    const result = await pool.query(
      'SELECT * FROM home_page ORDER BY id ASC LIMIT 1'
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

    const existing = await pool.query('SELECT id FROM home_page ORDER BY id ASC LIMIT 1');

    let row;
    if (existing.rows.length > 0) {
      if (setClauses.length === 0) {
        const current = await pool.query(
          'SELECT * FROM home_page WHERE id = $1',
          [existing.rows[0].id]
        );
        row = current.rows[0];
      } else {
        setClauses.push('updated_at = CURRENT_TIMESTAMP');
        values.push(existing.rows[0].id);
        const sql = `UPDATE home_page SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`;
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
        ? `INSERT INTO home_page (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`
        : `INSERT INTO home_page DEFAULT VALUES RETURNING *`;
      const result = await pool.query(sql, insertValues);
      row = result.rows[0];
    }

    await cacheService.del(CACHE_KEY);
    logger.info('🗑️ Cleared home_page cache after update');
    return row;
  },
};
