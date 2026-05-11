import { apiClient } from './apiClient.js';

export const shopHeroService = {
  async get() {
    const response = await apiClient.get('/shop-hero');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/shop-hero', payload);
    return response.data;
  },
};
