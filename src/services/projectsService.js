import { apiClient } from './apiClient.js';

export const projectsService = {
  // Get all projects
  async getAll() {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  // Get active projects only
  async getActive() {
    const response = await apiClient.get('/projects/active');
    return response.data;
  },

  // Get project by ID
  async getById(id) {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  // Get project by slug
  async getBySlug(slug) {
    const response = await apiClient.get(`/projects/slug/${slug}`);
    return response.data;
  },

  // Create project
  async create(projectData) {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  // Update project
  async update(id, projectData) {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  async delete(id) {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },

  // Get random projects (for homepage)
  async getRandom(limit = 3) {
    const response = await apiClient.get(`/projects/random?limit=${limit}`);
    return response.data;
  },

  // Get first projects (for homepage)
  async getFirst(limit = 3) {
    const response = await apiClient.get(`/projects/first?limit=${limit}`);
    return response.data;
  },
};
