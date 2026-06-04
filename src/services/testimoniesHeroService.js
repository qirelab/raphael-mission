import { apiClient } from './apiClient.js';

export const testimoniesHeroService = {
  async get() {
    const response = await apiClient.get('/testimonies-hero');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/testimonies-hero', payload);
    return response.data;
  },
};
