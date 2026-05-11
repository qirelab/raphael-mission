import { aboutDbService } from '../services/database/about.service.js';
import { logger } from '../utils/logger.js';

export const aboutController = {
  /**
   * Get About page content (public)
   * GET /api/about
   */
  async get(req, res, next) {
    try {
      const data = await aboutDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update About page content (admin only)
   * PUT /api/about
   */
  async update(req, res, next) {
    try {
      const data = await aboutDbService.update(req.body);
      logger.info(`About page updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
