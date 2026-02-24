import { logger } from '../utils/logger.js';
import { ApiError } from '../utils/errors.js';

/**
 * Global error handler middleware
 * Must be registered AFTER all routes
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Handle operational errors (ApiError instances)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Handle validation errors from Joi
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.details || {},
      },
    });
  }

  // Handle database errors
  if (err.code) {
    // PostgreSQL error codes
    if (err.code === '23505') {
      // Unique violation
      return res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'Resource already exists',
          details: { constraint: err.constraint },
        },
      });
    }

    if (err.code === '23503') {
      // Foreign key violation
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Invalid reference',
          details: { constraint: err.constraint },
        },
      });
    }

    if (err.code === '23502') {
      // Not null violation
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Required field missing',
          details: { column: err.column },
        },
      });
    }
  }

  // Handle unexpected errors
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: message,
      ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack,
      }),
    },
  });
};

export default errorHandler;
