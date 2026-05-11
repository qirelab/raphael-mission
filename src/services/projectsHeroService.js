import { apiClient } from './apiClient.js';

export const projectsHeroService = {
  async get() {
    const response = await apiClient.get('/projects-hero');
    return response.data;
  },

  async update(payload) {
    const response = await apiClient.put('/projects-hero', payload);
    return response.data;
  },
};
