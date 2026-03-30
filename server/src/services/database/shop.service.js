import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

export const shopDbService = {
  // Get all products
  async getAll() {
    // Check cache first
    const cacheKey = 'shop:all';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached products');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM shop_products ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached products data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch products:', error);
      throw error;
    }
  },

  // Get active products only
  async getActive() {
    // Check cache first
    const cacheKey = 'shop:active';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached active products');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM shop_products WHERE is_active = true ORDER BY created_at DESC'
      );

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached active products data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch active products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM shop_products WHERE id = $1 LIMIT 1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Failed to fetch product by ID:', error);
      throw error;
    }
  },

  // Create product
  async create(productData) {
    try {
      const result = await pool.query(
        `INSERT INTO shop_products (
          name_en, name_ru, name_pl, description_en, description_ru, description_pl,
          price, currency, image_url, stock_quantity, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
          productData.name_en || '',
          productData.name_ru || '',
          productData.name_pl || '',
          productData.description_en || '',
          productData.description_ru || '',
          productData.description_pl || '',
          productData.price !== undefined ? productData.price : 0,
          productData.currency || 'USD',
          productData.image_url || null,
          productData.stock_quantity !== undefined ? productData.stock_quantity : 0,
          productData.is_active ?? true
        ]
      );

      // Clear shop cache
      await cacheService.clearPattern('shop:*');
      logger.info('🗑️ Cleared shop cache after create');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to create product:', error);
      throw error;
    }
  },

  // Update product
  async update(id, productData) {
    try {
      const result = await pool.query(
        `UPDATE shop_products
        SET
          name_en = COALESCE($1, name_en),
          name_ru = COALESCE($2, name_ru),
          name_pl = COALESCE($3, name_pl),
          description_en = COALESCE($4, description_en),
          description_ru = COALESCE($5, description_ru),
          description_pl = COALESCE($6, description_pl),
          price = COALESCE($7, price),
          currency = COALESCE($8, currency),
          image_url = COALESCE($9, image_url),
          stock_quantity = COALESCE($10, stock_quantity),
          is_active = COALESCE($11, is_active),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *`,
        [
          productData.name_en || null,
          productData.name_ru || null,
          productData.name_pl || null,
          productData.description_en || null,
          productData.description_ru || null,
          productData.description_pl || null,
          productData.price !== undefined ? productData.price : null,
          productData.currency || null,
          productData.image_url || null,
          productData.stock_quantity !== undefined ? productData.stock_quantity : null,
          productData.is_active !== undefined ? productData.is_active : null,
          id
        ]
      );

      // Clear shop cache
      await cacheService.clearPattern('shop:*');
      logger.info('🗑️ Cleared shop cache after update');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to update product:', error);
      throw error;
    }
  },

  // Delete product
  async delete(id) {
    try {
      await pool.query(
        'DELETE FROM shop_products WHERE id = $1',
        [id]
      );

      // Clear shop cache
      await cacheService.clearPattern('shop:*');
      logger.info('🗑️ Cleared shop cache after delete');

      return true;
    } catch (error) {
      logger.error('Failed to delete product:', error);
      throw error;
    }
  },
};
