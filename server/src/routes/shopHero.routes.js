import express from 'express';
import { shopHeroController } from '../controllers/shopHero.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public read
router.get('/', shopHeroController.get);

// Protected update (admin)
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateShopHero),
  shopHeroController.update
);

export default router;
