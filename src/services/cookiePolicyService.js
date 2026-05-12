import { apiClient } from './apiClient.js';

export const cookiePolicyService = {
  async get() {
    const response = await apiClient.get('/cookie-policy');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/cookie-policy', payload);
    return response.data;
  },
};
