import { neonShopService } from './neonShopService';

export const shopService = {
  // Get all products
  async getAll() {
    return await neonShopService.getAll();
  },

  // Get active products only
  async getActive() {
    return await neonShopService.getActive();
  },

  // Get product by ID
  async getById(id) {
    return await neonShopService.getById(id);
  },

  // Create product
  async create(productData) {
    return await neonShopService.create(productData);
  },

  // Update product
  async update(id, productData) {
    return await neonShopService.update(id, productData);
  },

  // Delete product
  async delete(id) {
    await neonShopService.delete(id);
    return { message: 'Product deleted successfully' };
  },
};
