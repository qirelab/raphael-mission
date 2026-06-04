import { apiClient } from './apiClient.js';

export const homePageService = {
  async get() {
    const response = await apiClient.get('/home-page');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/home-page', payload);
    return response.data;
  },
};
