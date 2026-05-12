import express from 'express';
import { cookiePolicyController } from '../controllers/cookiePolicy.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public read
router.get('/', cookiePolicyController.get);

// Protected update (admin)
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateCookiePolicy),
  cookiePolicyController.update
);

export default router;
