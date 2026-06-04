import { apiClient } from './apiClient.js';

export const privacyPolicyService = {
  async get() {
    const response = await apiClient.get('/privacy-policy');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/privacy-policy', payload);
    return response.data;
  },
};
