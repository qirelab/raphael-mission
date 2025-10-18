import { neonClient } from './neon.js';
import { cacheService } from './cacheService.js';

// Helper function to check if Neon client is available
const checkNeonClient = () => {
  if (!neonClient) {
    throw new Error('Neon database not configured. Please set VITE_NEON_URL environment variable.');
  }
};

export const neonTestimoniesService = {
  // Get all testimonies
  async getAll() {
    checkNeonClient();

    // Check cache first
    const cacheKey = 'testimonies:all';
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Returning cached testimonies');
      return cached;
    }

    try {
      const result = await neonClient`
        SELECT * FROM testimonies 
        ORDER BY created_at DESC
      `;

      // Cache the result
      cacheService.set(cacheKey, result);
      console.log('💾 Cached testimonies data');

      return result;
    } catch (error) {
      console.error('Failed to fetch testimonies from Neon:', error);
      throw error;
    }
  },

  // Get active testimonies (using is_approved instead of is_active)
  async getActive() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM testimonies 
        WHERE is_approved = true
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch active testimonies from Neon:', error);
      throw error;
    }
  },

  // Get approved testimonies
  async getApproved() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM testimonies 
        WHERE is_approved = true
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch approved testimonies from Neon:', error);
      throw error;
    }
  },

  // Get testimony by ID
  async getById(id) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM testimonies 
        WHERE id = ${id}
        LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Failed to fetch testimony by ID from Neon:', error);
      throw error;
    }
  },

  // Create testimony
  async create(testimonyData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        INSERT INTO testimonies (
          name, name_en, name_ru, name_pl, title_en, title_ru, title_pl,
          content_en, content_ru, content_pl, image_url, is_approved
        ) VALUES (
          ${testimonyData.name}, ${testimonyData.name_en}, ${testimonyData.name_ru}, ${testimonyData.name_pl},
          ${testimonyData.title_en}, ${testimonyData.title_ru}, ${testimonyData.title_pl},
          ${testimonyData.content_en}, ${testimonyData.content_ru}, ${testimonyData.content_pl}, 
          ${testimonyData.image_url}, ${testimonyData.is_approved || false}
        )
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to create testimony in Neon:', error);
      throw error;
    }
  },

  // Update testimony
  async update(id, testimonyData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        UPDATE testimonies 
        SET 
          name = ${testimonyData.name},
          name_en = ${testimonyData.name_en},
          name_ru = ${testimonyData.name_ru},
          name_pl = ${testimonyData.name_pl},
          title_en = ${testimonyData.title_en},
          title_ru = ${testimonyData.title_ru},
          title_pl = ${testimonyData.title_pl},
          content_en = ${testimonyData.content_en},
          content_ru = ${testimonyData.content_ru},
          content_pl = ${testimonyData.content_pl},
          image_url = ${testimonyData.image_url},
          is_approved = ${testimonyData.is_approved},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to update testimony in Neon:', error);
      throw error;
    }
  },

  // Delete testimony
  async delete(id) {
    checkNeonClient();

    try {
      await neonClient`
        DELETE FROM testimonies 
        WHERE id = ${id}
      `;
      return true;
    } catch (error) {
      console.error('Failed to delete testimony in Neon:', error);
      throw error;
    }
  },

  // Approve testimony
  async approve(id) {
    checkNeonClient();

    try {
      const result = await neonClient`
        UPDATE testimonies 
        SET is_approved = true, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to approve testimony in Neon:', error);
      throw error;
    }
  },

  // Get random testimonies (for homepage)
  async getRandom(limit = 3) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM testimonies 
        WHERE is_approved = true
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch random testimonies from Neon:', error);
      throw error;
    }
  },
};
