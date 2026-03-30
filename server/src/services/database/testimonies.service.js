import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

export const testimoniesDbService = {
  // Get all testimonies
  async getAll() {
    // Check cache first
    const cacheKey = 'testimonies:all';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached testimonies');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM testimonies ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached testimonies data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch testimonies:', error);
      throw error;
    }
  },

  // Get active testimonies (approved testimonies)
  async getActive() {
    // Check cache first
    const cacheKey = 'testimonies:active';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached active testimonies');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM testimonies WHERE is_approved = true ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached active testimonies data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch active testimonies:', error);
      throw error;
    }
  },

  // Get approved testimonies
  async getApproved() {
    return this.getActive();
  },

  // Get testimony by ID
  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM testimonies WHERE id = $1 LIMIT 1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Failed to fetch testimony by ID:', error);
      throw error;
    }
  },

  // Create testimony
  async create(testimonyData) {
    try {
      const result = await pool.query(
        `INSERT INTO testimonies (
          name, name_en, name_ru, name_pl, title_en, title_ru, title_pl,
          content_en, content_ru, content_pl, image_url, is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
        [
          testimonyData.name || '',
          testimonyData.name_en || '',
          testimonyData.name_ru || '',
          testimonyData.name_pl || '',
          testimonyData.title_en || '',
          testimonyData.title_ru || '',
          testimonyData.title_pl || '',
          testimonyData.content_en || '',
          testimonyData.content_ru || '',
          testimonyData.content_pl || '',
          testimonyData.image_url || null,
          testimonyData.is_approved ?? false
        ]
      );

      // Clear testimonies cache
      await cacheService.clearPattern('testimonies:*');
      logger.info('🗑️ Cleared testimonies cache after create');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to create testimony:', error);
      throw error;
    }
  },

  // Update testimony
  async update(id, testimonyData) {
    try {
      const result = await pool.query(
        `UPDATE testimonies
        SET
          name = COALESCE($1, name),
          name_en = COALESCE($2, name_en),
          name_ru = COALESCE($3, name_ru),
          name_pl = COALESCE($4, name_pl),
          title_en = COALESCE($5, title_en),
          title_ru = COALESCE($6, title_ru),
          title_pl = COALESCE($7, title_pl),
          content_en = COALESCE($8, content_en),
          content_ru = COALESCE($9, content_ru),
          content_pl = COALESCE($10, content_pl),
          image_url = COALESCE($11, image_url),
          is_approved = COALESCE($12, is_approved),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $13
        RETURNING *`,
        [
          testimonyData.name || null,
          testimonyData.name_en || null,
          testimonyData.name_ru || null,
          testimonyData.name_pl || null,
          testimonyData.title_en || null,
          testimonyData.title_ru || null,
          testimonyData.title_pl || null,
          testimonyData.content_en || null,
          testimonyData.content_ru || null,
          testimonyData.content_pl || null,
          testimonyData.image_url || null,
          testimonyData.is_approved !== undefined ? testimonyData.is_approved : null,
          id
        ]
      );

      // Clear testimonies cache
      await cacheService.clearPattern('testimonies:*');
      logger.info('🗑️ Cleared testimonies cache after update');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to update testimony:', error);
      throw error;
    }
  },

  // Delete testimony
  async delete(id) {
    try {
      await pool.query(
        'DELETE FROM testimonies WHERE id = $1',
        [id]
      );

      // Clear testimonies cache
      await cacheService.clearPattern('testimonies:*');
      logger.info('🗑️ Cleared testimonies cache after delete');

      return true;
    } catch (error) {
      logger.error('Failed to delete testimony:', error);
      throw error;
    }
  },

  // Approve testimony
  async approve(id) {
    try {
      const result = await pool.query(
        'UPDATE testimonies SET is_approved = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [id]
      );

      // Clear testimonies cache
      await cacheService.clearPattern('testimonies:*');
      logger.info('🗑️ Cleared testimonies cache after approve');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to approve testimony:', error);
      throw error;
    }
  },

  // Get random testimonies (for homepage)
  async getRandom(limit = 3) {
    try {
      const result = await pool.query(
        'SELECT * FROM testimonies WHERE is_approved = true ORDER BY RANDOM() LIMIT $1',
        [limit]
      );
      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch random testimonies:', error);
      throw error;
    }
  },
};
