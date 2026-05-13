import { termsOfServiceDbService } from '../services/database/termsOfService.service.js';
import { logger } from '../utils/logger.js';

export const termsOfServiceController = {
  /**
   * Get Terms of Service content (public)
   * GET /api/terms-of-service
   */
  async get(req, res, next) {
    try {
      const data = await termsOfServiceDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Terms of Service content (admin only)
   * PUT /api/terms-of-service
   */
  async update(req, res, next) {
    try {
      const data = await termsOfServiceDbService.update(req.body);
      logger.info(`Terms of service updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
