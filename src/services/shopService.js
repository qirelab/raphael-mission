import { apiClient } from './apiClient.js';

export const shopService = {
  // Get all products
  async getAll() {
    const response = await apiClient.get('/shop');
    return response.data;
  },

  // Get active products only
  async getActive() {
    const response = await apiClient.get('/shop/active');
    return response.data;
  },

  // Get product by ID
  async getById(id) {
    const response = await apiClient.get(`/shop/${id}`);
    return response.data;
  },

  // Create product
  async create(productData) {
    const response = await apiClient.post('/shop', productData);
    return response.data;
  },

  // Update product
  async update(id, productData) {
    const response = await apiClient.put(`/shop/${id}`, productData);
    return response.data;
  },

  // Delete product
  async delete(id) {
    const response = await apiClient.delete(`/shop/${id}`);
    return response.data;
  },
};
