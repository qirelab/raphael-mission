import { projectsDbService } from '../services/database/projects.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const projectsController = {
  /**
   * Get all projects
   * GET /api/projects
   */
  async getAll(req, res, next) {
    try {
      const projects = await projectsDbService.getAll();

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get active projects
   * GET /api/projects/active
   */
  async getActive(req, res, next) {
    try {
      const projects = await projectsDbService.getActive();

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get random projects
   * GET /api/projects/random
   */
  async getRandom(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const projects = await projectsDbService.getRandom(limit);

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get first N projects
   * GET /api/projects/first
   */
  async getFirst(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const projects = await projectsDbService.getFirst(limit);

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get project by ID
   * GET /api/projects/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectsDbService.getById(id);

      if (!project) {
        throw new NotFoundError('Project not found');
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get project by slug
   * GET /api/projects/slug/:slug
   */
  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const project = await projectsDbService.getBySlug(slug);

      if (!project) {
        throw new NotFoundError('Project not found');
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create project (admin only)
   * POST /api/projects
   */
  async create(req, res, next) {
    try {
      const project = await projectsDbService.create(req.body);

      logger.info(`Project created: ${project.slug} by ${req.user?.email}`);

      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update project (admin only)
   * PUT /api/projects/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectsDbService.update(id, req.body);

      if (!project) {
        throw new NotFoundError('Project not found');
      }

      logger.info(`Project updated: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete project (admin only)
   * DELETE /api/projects/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await projectsDbService.delete(id);

      logger.info(`Project deleted: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
