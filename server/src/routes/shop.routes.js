import express from 'express';
import { shopController } from '../controllers/shop.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody, validateParams } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.get('/', shopController.getAll);
router.get('/active', shopController.getActive);
router.get('/:id', validateParams(schemas.id), shopController.getById);

// Protected routes (admin only) with stricter rate limiting
router.post(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.createProduct),
  shopController.create
);

router.put(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  validateBody(schemas.updateProduct),
  shopController.update
);

router.delete(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  shopController.delete
);

export default router;
