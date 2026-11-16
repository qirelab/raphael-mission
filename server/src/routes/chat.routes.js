import express from 'express';
import { chatController } from '../controllers/chat.controller.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validateRequest.js';
import { schemas } from '../utils/validators.js';

const router = express.Router();

// Public: website support assistant (streams SSE)
router.post('/', chatLimiter, validateBody(schemas.chatMessage), chatController.message);

export default router;
