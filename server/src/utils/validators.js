import Joi from 'joi';

/**
 * Validate data against a Joi schema
 * @param {Object} data - Data to validate
 * @param {Joi.Schema} schema - Joi schema
 * @returns {Object} Validated data
 * @throws {ValidationError} If validation fails
 */
export const validate = (data, schema) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.reduce((acc, detail) => {
      acc[detail.path.join('.')] = detail.message;
      return acc;
    }, {});

    throw new Error(JSON.stringify(details));
  }

  return value;
};

// Common validation schemas
export const schemas = {
  // Auth schemas
  signIn: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'any.required': 'Password is required',
    }),
  }),

  updatePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Current password is required',
    }),
    newPassword: Joi.string().min(8).required().messages({
      'string.min': 'New password must be at least 8 characters',
      'any.required': 'New password is required',
    }),
  }),

  // Project schemas
  createProject: Joi.object({
    slug: Joi.string().allow(''),
    title_en: Joi.string().allow(''),
    title_ru: Joi.string().allow(''),
    title_pl: Joi.string().allow(''),
    description_en: Joi.string().allow(''),
    description_ru: Joi.string().allow(''),
    description_pl: Joi.string().allow(''),
    about_project_en: Joi.string().allow(''),
    about_project_ru: Joi.string().allow(''),
    about_project_pl: Joi.string().allow(''),
    what_we_do_en: Joi.string().allow(''),
    what_we_do_ru: Joi.string().allow(''),
    what_we_do_pl: Joi.string().allow(''),
    impact_title_en: Joi.string().allow(''),
    impact_title_ru: Joi.string().allow(''),
    impact_title_pl: Joi.string().allow(''),
    impact_description_en: Joi.string().allow(''),
    impact_description_ru: Joi.string().allow(''),
    impact_description_pl: Joi.string().allow(''),
    stat1_en: Joi.string().allow(''),
    stat1_ru: Joi.string().allow(''),
    stat1_pl: Joi.string().allow(''),
    stat2_en: Joi.string().allow(''),
    stat2_ru: Joi.string().allow(''),
    stat2_pl: Joi.string().allow(''),
    stat3_en: Joi.string().allow(''),
    stat3_ru: Joi.string().allow(''),
    stat3_pl: Joi.string().allow(''),
    image_url: Joi.string().allow('', null),
    gallery_images: Joi.array().items(Joi.string()).default([]),
    is_active: Joi.boolean().default(true),
  }),

  updateProject: Joi.object({
    slug: Joi.string().allow('', null),
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),
    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),
    about_project_en: Joi.string().allow('', null),
    about_project_ru: Joi.string().allow('', null),
    about_project_pl: Joi.string().allow('', null),
    what_we_do_en: Joi.string().allow('', null),
    what_we_do_ru: Joi.string().allow('', null),
    what_we_do_pl: Joi.string().allow('', null),
    impact_title_en: Joi.string().allow('', null),
    impact_title_ru: Joi.string().allow('', null),
    impact_title_pl: Joi.string().allow('', null),
    impact_description_en: Joi.string().allow('', null),
    impact_description_ru: Joi.string().allow('', null),
    impact_description_pl: Joi.string().allow('', null),
    stat1_en: Joi.string().allow('', null),
    stat1_ru: Joi.string().allow('', null),
    stat1_pl: Joi.string().allow('', null),
    stat2_en: Joi.string().allow('', null),
    stat2_ru: Joi.string().allow('', null),
    stat2_pl: Joi.string().allow('', null),
    stat3_en: Joi.string().allow('', null),
    stat3_ru: Joi.string().allow('', null),
    stat3_pl: Joi.string().allow('', null),
    image_url: Joi.string().allow('', null),
    gallery_images: Joi.array().items(Joi.string()).allow(null),
    is_active: Joi.boolean().allow(null),
  }).unknown(true),

  // Shop schemas
  createProduct: Joi.object({
    name_en: Joi.string().allow(''),
    name_ru: Joi.string().allow(''),
    name_pl: Joi.string().allow(''),
    description_en: Joi.string().allow(''),
    description_ru: Joi.string().allow(''),
    description_pl: Joi.string().allow(''),
    price: Joi.number().min(0).default(0),
    currency: Joi.string().default('USD'),
    image_url: Joi.string().allow('', null),
    stock_quantity: Joi.number().integer().min(0).default(0),
    is_active: Joi.boolean().default(true),
  }),

  updateProduct: Joi.object({
    name_en: Joi.string().allow('', null),
    name_ru: Joi.string().allow('', null),
    name_pl: Joi.string().allow('', null),
    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),
    price: Joi.number().min(0).allow(null),
    currency: Joi.string().allow(null),
    image_url: Joi.string().allow('', null),
    stock_quantity: Joi.number().integer().min(0).allow(null),
    is_active: Joi.boolean().allow(null),
  }).unknown(true),

  // Testimony schemas
  createTestimony: Joi.object({
    name: Joi.string().allow(''),
    name_en: Joi.string().allow(''),
    name_ru: Joi.string().allow(''),
    name_pl: Joi.string().allow(''),
    title_en: Joi.string().allow(''),
    title_ru: Joi.string().allow(''),
    title_pl: Joi.string().allow(''),
    content_en: Joi.string().allow(''),
    content_ru: Joi.string().allow(''),
    content_pl: Joi.string().allow(''),
    image_url: Joi.string().allow('', null),
    is_approved: Joi.boolean().default(false),
  }),

  updateTestimony: Joi.object({
    name: Joi.string().allow('', null),
    name_en: Joi.string().allow('', null),
    name_ru: Joi.string().allow('', null),
    name_pl: Joi.string().allow('', null),
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),
    content_en: Joi.string().allow('', null),
    content_ru: Joi.string().allow('', null),
    content_pl: Joi.string().allow('', null),
    image_url: Joi.string().allow('', null),
    is_approved: Joi.boolean().allow(null),
  }).unknown(true),

  // Training schemas
  createTraining: Joi.object({
    title_en: Joi.string().allow(''),
    title_ru: Joi.string().allow(''),
    title_pl: Joi.string().allow(''),
    description_en: Joi.string().allow(''),
    description_ru: Joi.string().allow(''),
    description_pl: Joi.string().allow(''),
    content_en: Joi.string().allow(''),
    content_ru: Joi.string().allow(''),
    content_pl: Joi.string().allow(''),
    image_url: Joi.string().allow('', null),
    duration_en: Joi.string().allow(''),
    duration_ru: Joi.string().allow(''),
    duration_pl: Joi.string().allow(''),
    is_active: Joi.boolean().default(true),
  }),

  updateTraining: Joi.object({
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),
    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),
    content_en: Joi.string().allow('', null),
    content_ru: Joi.string().allow('', null),
    content_pl: Joi.string().allow('', null),
    image_url: Joi.string().allow('', null),
    duration_en: Joi.string().allow('', null),
    duration_ru: Joi.string().allow('', null),
    duration_pl: Joi.string().allow('', null),
    is_active: Joi.boolean().allow(null),
  }).unknown(true),

  // Contact schemas
  updateContact: Joi.object({
    phone_number: Joi.string().allow('', null),
    email: Joi.string().email().allow('', null),
    address_line1_en: Joi.string().allow('', null),
    address_line1_ru: Joi.string().allow('', null),
    address_line1_pl: Joi.string().allow('', null),
    address_line2_en: Joi.string().allow('', null),
    address_line2_ru: Joi.string().allow('', null),
    address_line2_pl: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    country: Joi.string().allow('', null),
  }).unknown(true),

  // Common schemas
  id: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),

  slug: Joi.object({
    slug: Joi.string().pattern(/^[a-z0-9-]+$/).required(),
  }),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),

  // Query parameter validation for limit
  limitQuery: Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(3),
  }),
};
