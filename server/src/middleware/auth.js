import { verifyToken } from '../utils/jwt.js';
import { authDbService } from '../services/database/auth.service.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new UnauthorizedError('Authentication token required');
    }

    // Verify JWT token
    const decoded = verifyToken(token);

    // Check if session exists in database and is not expired
    const session = await authDbService.getSessionById(decoded.sessionId);

    if (!session) {
      throw new UnauthorizedError('Invalid or expired session');
    }

    // Attach user data to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      sessionId: decoded.sessionId,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json(error.toJSON());
    }

    // Handle JWT errors
    if (error.message.includes('Token') || error.message.includes('token')) {
      return res.status(401).json(
        new UnauthorizedError(error.message).toJSON()
      );
    }

    next(error);
  }
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (req.user.role !== 'admin') {
      throw new ForbiddenError('Admin access required');
    }

    next();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return res.status(403).json(error.toJSON());
    }

    if (error instanceof UnauthorizedError) {
      return res.status(401).json(error.toJSON());
    }

    next(error);
  }
};

/**
 * Optional authentication - attach user if token is present, but don't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      const session = await authDbService.getSessionById(decoded.sessionId);

      if (session) {
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          sessionId: decoded.sessionId,
        };
      }
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};
