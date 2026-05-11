import { projectsHeroDbService } from '../services/database/projectsHero.service.js';
import { logger } from '../utils/logger.js';

export const projectsHeroController = {
  /**
   * Get Projects Hero content (public)
   * GET /api/projects-hero
   */
  async get(req, res, next) {
    try {
      const data = await projectsHeroDbService.get();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update Projects Hero content (admin only)
   * PUT /api/projects-hero
   */
  async update(req, res, next) {
    try {
      const data = await projectsHeroDbService.update(req.body);
      logger.info(`Projects hero updated by ${req.user?.email}`);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
