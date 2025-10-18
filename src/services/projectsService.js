import { neonProjectsService } from './neonProjectsService';

export const projectsService = {
  // Get all projects
  async getAll() {
    return await neonProjectsService.getAll();
  },

  // Get active projects only
  async getActive() {
    return await neonProjectsService.getActive();
  },

  // Get project by ID
  async getById(id) {
    return await neonProjectsService.getById(id);
  },

  // Get project by slug
  async getBySlug(slug) {
    return await neonProjectsService.getBySlug(slug);
  },

  // Create project
  async create(projectData) {
    return await neonProjectsService.create(projectData);
  },

  // Update project
  async update(id, projectData) {
    return await neonProjectsService.update(id, projectData);
  },

  // Delete project
  async delete(id) {
    await neonProjectsService.delete(id);
    return { message: 'Project deleted successfully' };
  },

  // Get random projects (for homepage)
  async getRandom(limit = 3) {
    return await neonProjectsService.getRandom(limit);
  },

  // Get first projects (for homepage)
  async getFirst(limit = 3) {
    return await neonProjectsService.getFirst(limit);
  },
};
