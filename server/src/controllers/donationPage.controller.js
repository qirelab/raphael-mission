import { donationPageDbService } from '../services/database/donationPage.service.js';
import { logger } from '../utils/logger.js';

export const donationPageController = {
  /**
   * Get Donation page content (public)
   * GET /api/donation-page
   */
  async get(req, res, next) {
    try {
      const data = await donationPageDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Donation page content (admin only)
   * PUT /api/donation-page
   */
  async update(req, res, next) {
    try {
      const data = await donationPageDbService.update(req.body);
      logger.info(`Donation page updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
