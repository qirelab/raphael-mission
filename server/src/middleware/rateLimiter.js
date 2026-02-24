import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * PUBLIC GET API LIMITER
 * For public read endpoints (projects, shop, testimonies, etc.)
 * After frontend optimization, normal users make very few requests
 */
export const publicGetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 0 : 500, // 0 = unlimited in dev, 500 in production
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again later',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Public GET rate limit exceeded for IP: ${req.ip}, path: ${req.path}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this IP, please try again later',
      },
    });
  },
  skip: () => isDevelopment, // Skip rate limiting entirely in development
});

/**
 * ADMIN API LIMITER
 * For admin endpoints (POST/PUT/DELETE operations)
 * Lower limit to protect against abuse
 */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 0 : 100, // 0 = unlimited in dev, 100 in production
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many admin requests, please try again later',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Admin rate limit exceeded for IP: ${req.ip}, path: ${req.path}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many admin requests, please try again later',
      },
    });
  },
  skip: () => isDevelopment,
});

/**
 * AUTH LIMITER
 * For authentication endpoints (login, password reset)
 * Very strict to prevent brute-force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 0 : 10, // 0 = unlimited in dev, 10 in production
  skipSuccessfulRequests: true, // Don't count successful logins
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts, please try again in 15 minutes',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}, email: ${req.body?.email || 'unknown'}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many login attempts, please try again in 15 minutes',
      },
    });
  },
  skip: () => isDevelopment,
});

/**
 * CREATE LIMITER
 * For public creation endpoints (contact forms, testimony submissions)
 * Moderate limit to prevent spam
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDevelopment ? 0 : 10, // 0 = unlimited in dev, 10 per hour in production
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many submissions, please try again later',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Create rate limit exceeded for IP: ${req.ip}, path: ${req.path}`);
    res.status(429).json({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many submissions, please try again later',
      },
    });
  },
  skip: () => isDevelopment,
});

// Backward compatibility - use publicGetLimiter as default
export const apiLimiter = publicGetLimiter;
