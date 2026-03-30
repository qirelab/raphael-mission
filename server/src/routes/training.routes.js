import express from 'express';
import { trainingController } from '../controllers/training.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody, validateParams } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.get('/', trainingController.getAll);
router.get('/active', trainingController.getActive);
router.get('/:id', validateParams(schemas.id), trainingController.getById);

// Protected routes (admin only) with stricter rate limiting
router.post(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.createTraining),
  trainingController.create
);

router.put(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  validateBody(schemas.updateTraining),
  trainingController.update
);

router.delete(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  trainingController.delete
);

export default router;
