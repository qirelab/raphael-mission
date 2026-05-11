import express from 'express';
import { donationPageController } from '../controllers/donationPage.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public read
router.get('/', donationPageController.get);

// Protected update (admin)
router.put(
  '/',
  adminLimiter,
  authenticateToken,
  requireAdmin,
  validateBody(schemas.updateDonationPage),
  donationPageController.update
);

export default router;
