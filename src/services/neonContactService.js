import { neonClient } from './neon.js';
import { cacheService } from './cacheService.js';

// Helper function to check if Neon client is available
const checkNeonClient = () => {
  if (!neonClient) {
    throw new Error('Neon database not configured. Please set VITE_NEON_URL environment variable.');
  }
};

export const neonContactService = {
  // Get contact info
  async get() {
    checkNeonClient();

    // Check cache first
    const cacheKey = 'contact:info';
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Returning cached contact info');
      return cached;
    }

    try {
      const result = await neonClient`
        SELECT * FROM contact_info 
        ORDER BY id DESC 
        LIMIT 1
      `;

      const data = result[0] || null;

      // Cache the result
      cacheService.set(cacheKey, data);
      console.log('💾 Cached contact info data');

      return data;
    } catch (error) {
      console.error('Failed to fetch contact info from Neon:', error);
      throw error;
    }
  },

  // Update contact info
  async update(contactData) {
    checkNeonClient();

    try {
      // Check if record exists
      const existing = await neonClient`
        SELECT id FROM contact_info 
        ORDER BY id DESC 
        LIMIT 1
      `;

      if (existing.length > 0) {
        // Update existing record
        const result = await neonClient`
          UPDATE contact_info 
          SET 
            phone_number = ${contactData.phone_number},
            email = ${contactData.email},
            address_line1_en = ${contactData.address_line1_en},
            address_line1_ru = ${contactData.address_line1_ru},
            address_line1_pl = ${contactData.address_line1_pl},
            address_line2_en = ${contactData.address_line2_en},
            address_line2_ru = ${contactData.address_line2_ru},
            address_line2_pl = ${contactData.address_line2_pl},
            city = ${contactData.city},
            country = ${contactData.country},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${existing[0].id}
          RETURNING *
        `;

        // Clear contact cache
        cacheService.delete('contact:info');
        console.log('🗑️ Cleared contact cache after update');

        return result[0];
      } else {
        // Create new record
        const result = await neonClient`
          INSERT INTO contact_info (
            phone_number, email, address_line1_en, address_line1_ru, address_line1_pl,
            address_line2_en, address_line2_ru, address_line2_pl, city, country
          ) VALUES (
            ${contactData.phone_number}, ${contactData.email}, ${contactData.address_line1_en},
            ${contactData.address_line1_ru}, ${contactData.address_line1_pl}, ${contactData.address_line2_en},
            ${contactData.address_line2_ru}, ${contactData.address_line2_pl}, ${contactData.city}, ${contactData.country}
          )
          RETURNING *
        `;
        return result[0];
      }
    } catch (error) {
      console.error('Failed to update contact info in Neon:', error);
      throw error;
    }
  },

  // Clear all contact info
  async clear() {
    checkNeonClient();

    try {
      await neonClient`DELETE FROM contact_info`;
      return true;
    } catch (error) {
      console.error('Failed to clear contact info in Neon:', error);
      throw error;
    }
  },
};
