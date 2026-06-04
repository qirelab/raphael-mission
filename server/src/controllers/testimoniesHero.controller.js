import { testimoniesHeroDbService } from '../services/database/testimoniesHero.service.js';
import { logger } from '../utils/logger.js';

export const testimoniesHeroController = {
  /**
   * Get Testimonies Hero content (public)
   * GET /api/testimonies-hero
   */
  async get(req, res, next) {
    try {
      const data = await testimoniesHeroDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Testimonies Hero content (admin only)
   * PUT /api/testimonies-hero
   */
  async update(req, res, next) {
    try {
      const data = await testimoniesHeroDbService.update(req.body);
      logger.info(`Testimonies hero updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
