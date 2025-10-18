import { neonTrainingService } from './neonTrainingService';

export const trainingService = {
  // Get all training programs
  async getAll() {
    return await neonTrainingService.getAll();
  },

  // Get active training programs only
  async getActive() {
    return await neonTrainingService.getActive();
  },

  // Get training program by ID
  async getById(id) {
    return await neonTrainingService.getById(id);
  },

  // Create training program
  async create(programData) {
    return await neonTrainingService.create(programData);
  },

  // Update training program
  async update(id, programData) {
    return await neonTrainingService.update(id, programData);
  },

  // Delete training program
  async delete(id) {
    await neonTrainingService.delete(id);
    return { message: 'Training program deleted successfully' };
  },
};
