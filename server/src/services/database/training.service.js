import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

export const trainingDbService = {
  // Get all training
  async getAll() {
    // Check cache first
    const cacheKey = 'training:all';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached training');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM training ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached training data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch training:', error);
      throw error;
    }
  },

  // Get active training only
  async getActive() {
    // Check cache first
    const cacheKey = 'training:active';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached active training');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM training WHERE is_active = true ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached active training data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch active training:', error);
      throw error;
    }
  },

  // Get training by ID
  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM training WHERE id = $1 LIMIT 1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Failed to fetch training by ID:', error);
      throw error;
    }
  },

  // Create training
  async create(trainingData) {
    try {
      const result = await pool.query(
        `INSERT INTO training (
          title_en, title_ru, title_pl, description_en, description_ru, description_pl,
          content_en, content_ru, content_pl, image_url, duration_en, duration_ru, duration_pl, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
        [
          trainingData.title_en || '',
          trainingData.title_ru || '',
          trainingData.title_pl || '',
          trainingData.description_en || '',
          trainingData.description_ru || '',
          trainingData.description_pl || '',
          trainingData.content_en || '',
          trainingData.content_ru || '',
          trainingData.content_pl || '',
          trainingData.image_url || null,
          trainingData.duration_en || '',
          trainingData.duration_ru || '',
          trainingData.duration_pl || '',
          trainingData.is_active ?? true
        ]
      );

      // Clear training cache
      await cacheService.clearPattern('training:*');
      logger.info('🗑️ Cleared training cache after create');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to create training:', error);
      throw error;
    }
  },

  // Update training
  async update(id, trainingData) {
    try {
      const result = await pool.query(
        `UPDATE training
        SET
          title_en = COALESCE($1, title_en),
          title_ru = COALESCE($2, title_ru),
          title_pl = COALESCE($3, title_pl),
          description_en = COALESCE($4, description_en),
          description_ru = COALESCE($5, description_ru),
          description_pl = COALESCE($6, description_pl),
          content_en = COALESCE($7, content_en),
          content_ru = COALESCE($8, content_ru),
          content_pl = COALESCE($9, content_pl),
          image_url = COALESCE($10, image_url),
          duration_en = COALESCE($11, duration_en),
          duration_ru = COALESCE($12, duration_ru),
          duration_pl = COALESCE($13, duration_pl),
          is_active = COALESCE($14, is_active),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $15
        RETURNING *`,
        [
          trainingData.title_en || null,
          trainingData.title_ru || null,
          trainingData.title_pl || null,
          trainingData.description_en || null,
          trainingData.description_ru || null,
          trainingData.description_pl || null,
          trainingData.content_en || null,
          trainingData.content_ru || null,
          trainingData.content_pl || null,
          trainingData.image_url || null,
          trainingData.duration_en || null,
          trainingData.duration_ru || null,
          trainingData.duration_pl || null,
          trainingData.is_active !== undefined ? trainingData.is_active : null,
          id
        ]
      );

      // Clear training cache
      await cacheService.clearPattern('training:*');
      logger.info('🗑️ Cleared training cache after update');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to update training:', error);
      throw error;
    }
  },

  // Delete training
  async delete(id) {
    try {
      await pool.query(
        'DELETE FROM training WHERE id = $1',
        [id]
      );

      // Clear training cache
      await cacheService.clearPattern('training:*');
      logger.info('🗑️ Cleared training cache after delete');

      return true;
    } catch (error) {
      logger.error('Failed to delete training:', error);
      throw error;
    }
  },
};
