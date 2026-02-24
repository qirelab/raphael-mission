import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

export const contactDbService = {
  // Get contact info
  async get() {
    // Check cache first
    const cacheKey = 'contact:info';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached contact info');
      return cached;
    }

    try {
      const result = await pool.query(
        'SELECT * FROM contact_info ORDER BY id DESC LIMIT 1'
      );

      const data = result.rows[0] || null;

      // Cache the result
      await cacheService.set(cacheKey, data);
      logger.info('💾 Cached contact info data');

      return data;
    } catch (error) {
      logger.error('Failed to fetch contact info:', error);
      throw error;
    }
  },

  // Update contact info
  async update(contactData) {
    try {
      // Check if record exists
      const existing = await pool.query(
        'SELECT id FROM contact_info ORDER BY id DESC LIMIT 1'
      );

      if (existing.rows.length > 0) {
        // Update existing record
        const result = await pool.query(
          `UPDATE contact_info
          SET
            phone_number = COALESCE($1, phone_number),
            email = COALESCE($2, email),
            address_line1_en = COALESCE($3, address_line1_en),
            address_line1_ru = COALESCE($4, address_line1_ru),
            address_line1_pl = COALESCE($5, address_line1_pl),
            address_line2_en = COALESCE($6, address_line2_en),
            address_line2_ru = COALESCE($7, address_line2_ru),
            address_line2_pl = COALESCE($8, address_line2_pl),
            city = COALESCE($9, city),
            country = COALESCE($10, country),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $11
          RETURNING *`,
          [
            contactData.phone_number || null,
            contactData.email || null,
            contactData.address_line1_en || null,
            contactData.address_line1_ru || null,
            contactData.address_line1_pl || null,
            contactData.address_line2_en || null,
            contactData.address_line2_ru || null,
            contactData.address_line2_pl || null,
            contactData.city || null,
            contactData.country || null,
            existing.rows[0].id
          ]
        );

        // Clear contact cache
        await cacheService.del('contact:info');
        logger.info('🗑️ Cleared contact cache after update');

        return result.rows[0];
      } else {
        // Create new record
        const result = await pool.query(
          `INSERT INTO contact_info (
            phone_number, email, address_line1_en, address_line1_ru, address_line1_pl,
            address_line2_en, address_line2_ru, address_line2_pl, city, country
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *`,
          [
            contactData.phone_number,
            contactData.email,
            contactData.address_line1_en || null,
            contactData.address_line1_ru || null,
            contactData.address_line1_pl || null,
            contactData.address_line2_en || null,
            contactData.address_line2_ru || null,
            contactData.address_line2_pl || null,
            contactData.city || null,
            contactData.country || null
          ]
        );

        // Clear contact cache
        await cacheService.del('contact:info');
        logger.info('🗑️ Cleared contact cache after create');

        return result.rows[0];
      }
    } catch (error) {
      logger.error('Failed to update contact info:', error);
      throw error;
    }
  },

  // Clear all contact info
  async clear() {
    try {
      await pool.query('DELETE FROM contact_info');

      // Clear contact cache
      await cacheService.del('contact:info');
      logger.info('🗑️ Cleared contact cache after clear');

      return true;
    } catch (error) {
      logger.error('Failed to clear contact info:', error);
      throw error;
    }
  },
};
