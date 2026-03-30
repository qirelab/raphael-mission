import express from 'express';
import { testimoniesController } from '../controllers/testimonies.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { createLimiter, adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody, validateParams, validateQuery } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.get('/approved', testimoniesController.getApproved);
router.get('/random', validateQuery(schemas.limitQuery), testimoniesController.getRandom);

router.post(
  '/',
  createLimiter,
  validateBody(schemas.createTestimony),
  testimoniesController.create
);

// Admin routes
router.get(
  '/',
  authenticateToken,
  requireAdmin,
  testimoniesController.getAll
);

router.get(
  '/:id',
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  testimoniesController.getById
);

router.put(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  validateBody(schemas.updateTestimony),
  testimoniesController.update
);

router.patch(
  '/:id/approve',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  testimoniesController.approve
);

router.delete(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  testimoniesController.delete
);

export default router;
