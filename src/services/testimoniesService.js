import { apiClient } from './apiClient.js';

export const testimoniesService = {
  // Get all testimonies
  async getAll() {
    const response = await apiClient.get('/testimonies');
    return response.data;
  },

  // Get approved testimonies only
  async getApproved() {
    const response = await apiClient.get('/testimonies/approved');
    return response.data;
  },

  // Get active testimonies (alias for getApproved)
  async getActive() {
    const response = await apiClient.get('/testimonies/approved');
    return response.data;
  },

  // Get testimony by ID
  async getById(id) {
    const response = await apiClient.get(`/testimonies/${id}`);
    return response.data;
  },

  // Create testimony
  async create(testimonyData) {
    const response = await apiClient.post('/testimonies', testimonyData);
    return response.data;
  },

  // Update testimony
  async update(id, testimonyData) {
    const response = await apiClient.put(`/testimonies/${id}`, testimonyData);
    return response.data;
  },

  // Delete testimony
  async delete(id) {
    const response = await apiClient.delete(`/testimonies/${id}`);
    return response.data;
  },

  // Approve testimony
  async approve(id) {
    const response = await apiClient.patch(`/testimonies/${id}/approve`);
    return response.data;
  },

  // Reject testimony
  async reject(id) {
    const response = await apiClient.patch(`/testimonies/${id}/reject`);
    return response.data;
  },
};
