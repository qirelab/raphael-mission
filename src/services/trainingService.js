import { apiClient } from './apiClient.js';

export const trainingService = {
  // Get all training programs
  async getAll() {
    const response = await apiClient.get('/training');
    return response.data;
  },

  // Get active training programs only
  async getActive() {
    const response = await apiClient.get('/training/active');
    return response.data;
  },

  // Get training program by ID
  async getById(id) {
    const response = await apiClient.get(`/training/${id}`);
    return response.data;
  },

  // Create training program
  async create(programData) {
    const response = await apiClient.post('/training', programData);
    return response.data;
  },

  // Update training program
  async update(id, programData) {
    const response = await apiClient.put(`/training/${id}`, programData);
    return response.data;
  },

  // Delete training program
  async delete(id) {
    const response = await apiClient.delete(`/training/${id}`);
    return response.data;
  },
};
