import { apiClient } from './apiClient.js';

export const aboutService = {
  async get() {
    const response = await apiClient.get('/about');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/about', payload);
    return response.data;
  },
};
