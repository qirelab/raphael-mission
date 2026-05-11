import express from 'express';
import { testimoniesHeroController } from '../controllers/testimoniesHero.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public read
router.get('/', testimoniesHeroController.get);

// Protected update (admin)
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateTestimoniesHero),
  testimoniesHeroController.update
);

export default router;
