import { shopHeroDbService } from '../services/database/shopHero.service.js';
import { logger } from '../utils/logger.js';

export const shopHeroController = {
  /**
   * Get Shop Hero content (public)
   * GET /api/shop-hero
   */
  async get(req, res, next) {
    try {
      const data = await shopHeroDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Shop Hero content (admin only)
   * PUT /api/shop-hero
   */
  async update(req, res, next) {
    try {
      const data = await shopHeroDbService.update(req.body);
      logger.info(`Shop hero updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
