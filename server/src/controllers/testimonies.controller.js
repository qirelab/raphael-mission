import { testimoniesDbService } from '../services/database/testimonies.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const testimoniesController = {
  /**
   * Get all testimonies (admin only)
   * GET /api/testimonies
   */
  async getAll(req, res, next) {
    try {
      const testimonies = await testimoniesDbService.getAll();

      res.json({
        success: true,
        data: testimonies,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get approved testimonies (public)
   * GET /api/testimonies/approved
   */
  async getApproved(req, res, next) {
    try {
      const testimonies = await testimoniesDbService.getApproved();

      res.json({
        success: true,
        data: testimonies,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get random testimonies (public)
   * GET /api/testimonies/random
   */
  async getRandom(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const testimonies = await testimoniesDbService.getRandom(limit);

      res.json({
        success: true,
        data: testimonies,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get testimony by ID
   * GET /api/testimonies/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const testimony = await testimoniesDbService.getById(id);

      if (!testimony) {
        throw new NotFoundError('Testimony not found');
      }

      res.json({
        success: true,
        data: testimony,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create testimony (public, requires approval)
   * POST /api/testimonies
   */
  async create(req, res, next) {
    try {
      const testimony = await testimoniesDbService.create(req.body);

      logger.info(`Testimony created: ${testimony.id}`);

      res.status(201).json({
        success: true,
        data: testimony,
        message: 'Testimony submitted successfully. It will be reviewed before being published.',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update testimony (admin only)
   * PUT /api/testimonies/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const testimony = await testimoniesDbService.update(id, req.body);

      if (!testimony) {
        throw new NotFoundError('Testimony not found');
      }

      logger.info(`Testimony updated: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        data: testimony,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Approve testimony (admin only)
   * PATCH /api/testimonies/:id/approve
   */
  async approve(req, res, next) {
    try {
      const { id } = req.params;
      const testimony = await testimoniesDbService.approve(id);

      if (!testimony) {
        throw new NotFoundError('Testimony not found');
      }

      logger.info(`Testimony approved: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        data: testimony,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete testimony (admin only)
   * DELETE /api/testimonies/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await testimoniesDbService.delete(id);

      logger.info(`Testimony deleted: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Testimony deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
