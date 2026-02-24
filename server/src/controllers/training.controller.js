import { trainingDbService } from '../services/database/training.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const trainingController = {
  /**
   * Get all training
   * GET /api/training
   */
  async getAll(req, res, next) {
    try {
      const training = await trainingDbService.getAll();

      res.json({
        success: true,
        data: training,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get active training
   * GET /api/training/active
   */
  async getActive(req, res, next) {
    try {
      const training = await trainingDbService.getActive();

      res.json({
        success: true,
        data: training,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get training by ID
   * GET /api/training/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const training = await trainingDbService.getById(id);

      if (!training) {
        throw new NotFoundError('Training not found');
      }

      res.json({
        success: true,
        data: training,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create training (admin only)
   * POST /api/training
   */
  async create(req, res, next) {
    try {
      const training = await trainingDbService.create(req.body);

      logger.info(`Training created: ${training.id} by ${req.user?.email}`);

      res.status(201).json({
        success: true,
        data: training,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update training (admin only)
   * PUT /api/training/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const training = await trainingDbService.update(id, req.body);

      if (!training) {
        throw new NotFoundError('Training not found');
      }

      logger.info(`Training updated: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        data: training,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete training (admin only)
   * DELETE /api/training/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await trainingDbService.delete(id);

      logger.info(`Training deleted: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Training deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
