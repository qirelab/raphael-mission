import express from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public route
router.get('/', contactController.get);

// Protected routes (admin only) with stricter rate limiting
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateContact),
  contactController.update
);

router.delete(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  contactController.clear
);

export default router;
