import { neonTestimoniesService } from './neonTestimoniesService';

export const testimoniesService = {
  // Get all testimonies
  async getAll() {
    return await neonTestimoniesService.getAll();
  },

  // Get approved testimonies only
  async getApproved() {
    return await neonTestimoniesService.getApproved();
  },

  // Get active testimonies (alias for getApproved)
  async getActive() {
    return await neonTestimoniesService.getApproved();
  },

  // Get testimony by ID
  async getById(id) {
    return await neonTestimoniesService.getById(id);
  },

  // Create testimony
  async create(testimonyData) {
    return await neonTestimoniesService.create(testimonyData);
  },

  // Update testimony
  async update(id, testimonyData) {
    return await neonTestimoniesService.update(id, testimonyData);
  },

  // Delete testimony
  async delete(id) {
    await neonTestimoniesService.delete(id);
    return { message: 'Testimony deleted successfully' };
  },

  // Approve testimony
  async approve(id) {
    return await neonTestimoniesService.approve(id);
  },

  // Reject testimony
  async reject(id) {
    return await neonTestimoniesService.reject(id);
  },
};
