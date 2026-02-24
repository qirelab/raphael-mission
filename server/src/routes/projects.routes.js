import express from 'express';
import { projectsController } from '../controllers/projects.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody, validateParams, validateQuery } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.get('/', projectsController.getAll);
router.get('/active', projectsController.getActive);
router.get('/random', validateQuery(schemas.limitQuery), projectsController.getRandom);
router.get('/first', validateQuery(schemas.limitQuery), projectsController.getFirst);
router.get('/slug/:slug', validateParams(schemas.slug), projectsController.getBySlug);
router.get('/:id', validateParams(schemas.id), projectsController.getById);

// Protected routes (admin only) with stricter rate limiting
router.post(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.createProject),
  projectsController.create
);

router.put(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  validateBody(schemas.updateProject),
  projectsController.update
);

router.delete(
  '/:id',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateParams(schemas.id),
  projectsController.delete
);

export default router;
