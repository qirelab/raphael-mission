import { apiClient } from './apiClient.js';

export const termsOfServiceService = {
  async get() {
    const response = await apiClient.get('/terms-of-service');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/terms-of-service', payload);
    return response.data;
  },
};
