import { apiClient } from './apiClient.js';

export const donationPageService = {
  async get() {
    const response = await apiClient.get('/donation-page');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/donation-page', payload);
    return response.data;
  },
};
