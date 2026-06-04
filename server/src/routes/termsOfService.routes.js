import express from 'express';
import { termsOfServiceController } from '../controllers/termsOfService.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public read
router.get('/', termsOfServiceController.get);

// Protected update (admin)
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateTermsOfService),
  termsOfServiceController.update
);

export default router;
