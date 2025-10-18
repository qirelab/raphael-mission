import { neonClient } from './neon.js';

// Helper function to check if Neon client is available
const checkNeonClient = () => {
  if (!neonClient) {
    throw new Error('Neon database not configured. Please set VITE_NEON_URL environment variable.');
  }
};

export const neonShopService = {
  // Get all products
  async getAll() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM shop_products 
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch products from Neon:', error);
      throw error;
    }
  },

  // Get active products only
  async getActive() {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM shop_products 
        WHERE is_active = true
        ORDER BY created_at DESC
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch active products from Neon:', error);
      throw error;
    }
  },

  // Get product by ID
  async getById(id) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM shop_products 
        WHERE id = ${id}
        LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Failed to fetch product by ID from Neon:', error);
      throw error;
    }
  },

  // Create product
  async create(productData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        INSERT INTO shop_products (
          name_en, name_ru, name_pl, description_en, description_ru, description_pl,
          price, currency, image_url, stock_quantity, is_active
        ) VALUES (
          ${productData.name_en}, ${productData.name_ru}, ${productData.name_pl},
          ${productData.description_en}, ${productData.description_ru}, ${productData.description_pl},
          ${productData.price}, ${productData.currency || 'USD'}, ${productData.image_url},
          ${productData.stock_quantity || 0}, ${productData.is_active ?? true}
        )
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to create product in Neon:', error);
      throw error;
    }
  },

  // Update product
  async update(id, productData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        UPDATE shop_products 
        SET 
          name_en = ${productData.name_en},
          name_ru = ${productData.name_ru},
          name_pl = ${productData.name_pl},
          description_en = ${productData.description_en},
          description_ru = ${productData.description_ru},
          description_pl = ${productData.description_pl},
          price = ${productData.price},
          currency = ${productData.currency},
          image_url = ${productData.image_url},
          stock_quantity = ${productData.stock_quantity},
          is_active = ${productData.is_active},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Failed to update product in Neon:', error);
      throw error;
    }
  },

  // Delete product
  async delete(id) {
    checkNeonClient();

    try {
      await neonClient`
        DELETE FROM shop_products 
        WHERE id = ${id}
      `;
      return { message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Failed to delete product in Neon:', error);
      throw error;
    }
  },
};
