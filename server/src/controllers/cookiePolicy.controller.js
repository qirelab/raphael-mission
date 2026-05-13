import { cookiePolicyDbService } from '../services/database/cookiePolicy.service.js';
import { logger } from '../utils/logger.js';

export const cookiePolicyController = {
  /**
   * Get Cookie Policy content (public)
   * GET /api/cookie-policy
   */
  async get(req, res, next) {
    try {
      const data = await cookiePolicyDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Cookie Policy content (admin only)
   * PUT /api/cookie-policy
   */
  async update(req, res, next) {
    try {
      const data = await cookiePolicyDbService.update(req.body);
      logger.info(`Cookie policy updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
