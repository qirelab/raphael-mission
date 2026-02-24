import { contactDbService } from '../services/database/contact.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const contactController = {
  /**
   * Get contact info (public)
   * GET /api/contact
   */
  async get(req, res, next) {
    try {
      const contact = await contactDbService.get();

      if (!contact) {
        throw new NotFoundError('Contact information not found');
      }

      res.json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update contact info (admin only)
   * PUT /api/contact
   */
  async update(req, res, next) {
    try {
      const contact = await contactDbService.update(req.body);

      logger.info(`Contact info updated by ${req.user?.email}`);

      res.json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Clear contact info (admin only)
   * DELETE /api/contact
   */
  async clear(req, res, next) {
    try {
      await contactDbService.clear();

      logger.info(`Contact info cleared by ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Contact information cleared successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
