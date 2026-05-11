import { privacyPolicyDbService } from '../services/database/privacyPolicy.service.js';
import { logger } from '../utils/logger.js';

export const privacyPolicyController = {
  /**
   * Get Privacy Policy content (public)
   * GET /api/privacy-policy
   */
  async get(req, res, next) {
    try {
      const data = await privacyPolicyDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Privacy Policy content (admin only)
   * PUT /api/privacy-policy
   */
  async update(req, res, next) {
    try {
      const data = await privacyPolicyDbService.update(req.body);
      logger.info(`Privacy policy updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
