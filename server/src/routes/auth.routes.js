import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public routes (with rate limiting)
router.post(
  '/signin',
  authLimiter,
  validateBody(schemas.signIn),
  authController.signIn
);

// Protected routes
router.post(
  '/signout',
  authenticateToken,
  authController.signOut
);

router.get(
  '/session',
  authenticateToken,
  authController.getSession
);

router.get(
  '/user',
  authenticateToken,
  authController.getUser
);

router.put(
  '/password',
  authenticateToken,
  validateBody(schemas.updatePassword),
  authController.updatePassword
);

// Admin routes
router.get(
  '/security-stats',
  authenticateToken,
  requireAdmin,
  authController.getSecurityStats
);

export default router;
