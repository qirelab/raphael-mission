import { authDbService } from '../services/database/auth.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const authController = {
  /**
   * Sign in user
   * POST /api/auth/signin
   */
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;

      const result = await authDbService.signIn(email, password, ipAddress);

      logger.info(`User signed in: ${email}`);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Sign out user
   * POST /api/auth/signout
   */
  async signOut(req, res, next) {
    try {
      const sessionId = req.user?.sessionId;

      await authDbService.signOut(sessionId);

      logger.info(`User signed out: ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Signed out successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current session
   * GET /api/auth/session
   */
  async getSession(req, res, next) {
    try {
      const sessionId = req.user?.sessionId;

      if (!sessionId) {
        throw new NotFoundError('No active session');
      }

      const session = await authDbService.getSessionById(sessionId);

      if (!session) {
        throw new NotFoundError('Session not found');
      }

      res.json({
        success: true,
        data: { session },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current user
   * GET /api/auth/user
   */
  async getUser(req, res, next) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new NotFoundError('User not found');
      }

      const user = await authDbService.getUserById(userId);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      res.json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update password
   * PUT /api/auth/password
   */
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      await authDbService.updatePassword(userId, currentPassword, newPassword);

      logger.info(`Password updated for user: ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get security statistics (admin only)
   * GET /api/auth/security-stats
   */
  async getSecurityStats(req, res, next) {
    try {
      const stats = await authDbService.getSecurityStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },
};
