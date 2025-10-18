import { neonClient } from './neon.js';

// Helper function to check if Neon client is available
const checkNeonClient = () => {
  if (!neonClient) {
    throw new Error('Neon database not configured. Please set VITE_NEON_URL environment variable.');
  }
};

export const neonTrainingService = {
  // Get all training
  async getAll() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM training 
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch training from Neon:', error);
      throw error;
    }
  },

  // Get active training only
  async getActive() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM training 
        WHERE is_active = true
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch active training from Neon:', error);
      throw error;
    }
  },

  // Get training by ID
  async getById(id) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM training 
        WHERE id = ${id}
        LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Failed to fetch training by ID from Neon:', error);
      throw error;
    }
  },

  // Create training
  async create(trainingData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        INSERT INTO training (
          title_en, title_ru, title_pl, description_en, description_ru, description_pl,
          content_en, content_ru, content_pl, image_url, duration_en, duration_ru, duration_pl, is_active
        ) VALUES (
          ${trainingData.title_en}, ${trainingData.title_ru}, ${trainingData.title_pl},
          ${trainingData.description_en}, ${trainingData.description_ru}, ${trainingData.description_pl},
          ${trainingData.content_en}, ${trainingData.content_ru}, ${trainingData.content_pl},
          ${trainingData.image_url}, ${trainingData.duration_en}, ${trainingData.duration_ru}, ${trainingData.duration_pl}, ${trainingData.is_active ?? true}
        )
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to create training in Neon:', error);
      throw error;
    }
  },

  // Update training
  async update(id, trainingData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        UPDATE training 
        SET 
          title_en = ${trainingData.title_en},
          title_ru = ${trainingData.title_ru},
          title_pl = ${trainingData.title_pl},
          description_en = ${trainingData.description_en},
          description_ru = ${trainingData.description_ru},
          description_pl = ${trainingData.description_pl},
          content_en = ${trainingData.content_en},
          content_ru = ${trainingData.content_ru},
          content_pl = ${trainingData.content_pl},
          image_url = ${trainingData.image_url},
          duration_en = ${trainingData.duration_en},
          duration_ru = ${trainingData.duration_ru},
          duration_pl = ${trainingData.duration_pl},
          is_active = ${trainingData.is_active},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to update training in Neon:', error);
      throw error;
    }
  },

  // Delete training
  async delete(id) {
    checkNeonClient();

    try {
      await neonClient`
        DELETE FROM training 
        WHERE id = ${id}
      `;
      return true;
    } catch (error) {
      console.error('Failed to delete training in Neon:', error);
      throw error;
    }
  },
};
