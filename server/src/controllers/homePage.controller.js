import { homePageDbService } from '../services/database/homePage.service.js';
import { logger } from '../utils/logger.js';

export const homePageController = {
  /**
   * Get Home Page content (public)
   * GET /api/home-page
   */
  async get(req, res, next) {
    try {
      const data = await homePageDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Home Page content (admin only)
   * PUT /api/home-page
   */
  async update(req, res, next) {
    try {
      const data = await homePageDbService.update(req.body);
      logger.info(`Home page updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
