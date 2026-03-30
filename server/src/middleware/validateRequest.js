import { ValidationError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

/**
 * Middleware factory to validate request body, params, or query
 * @param {Joi.Schema} schema - Joi validation schema
 * @param {string} source - Source to validate ('body', 'params', 'query')
 */
export const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];

      const { error, value } = schema.validate(dataToValidate, {
        abortEarly: false, // Return all errors, not just the first one
        stripUnknown: true, // Remove unknown fields
      });

      if (error) {
        // Format validation errors
        const details = {};
        error.details.forEach((detail) => {
          const field = detail.path.join('.');
          details[field] = detail.message;
        });

        logger.warn('Validation error:', { source, details });

        throw new ValidationError('Validation failed', details);
      }

      // Replace request data with validated (and sanitized) data
      req[source] = value;

      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(422).json(err.toJSON());
      }
      next(err);
    }
  };
};

/**
 * Validate request body
 */
export const validateBody = (schema) => validateRequest(schema, 'body');

/**
 * Validate request params
 */
export const validateParams = (schema) => validateRequest(schema, 'params');

/**
 * Validate request query
 */
export const validateQuery = (schema) => validateRequest(schema, 'query');
