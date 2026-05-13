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

  // Shop Hero — editable hero block of the public "Магазин" page.
  // All fields optional so the admin can save partial updates.
  updateShopHero: Joi.object({
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),

    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),
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

  // About page schema — every text field is optional so the admin can save
  // partial updates (e.g. tweak a single paragraph without resending the rest).
  updateAbout: Joi.object({
    hero_title_en: Joi.string().allow('', null),
    hero_title_ru: Joi.string().allow('', null),
    hero_title_pl: Joi.string().allow('', null),

    hero_paragraph1_en: Joi.string().allow('', null),
    hero_paragraph1_ru: Joi.string().allow('', null),
    hero_paragraph1_pl: Joi.string().allow('', null),
    hero_paragraph2_en: Joi.string().allow('', null),
    hero_paragraph2_ru: Joi.string().allow('', null),
    hero_paragraph2_pl: Joi.string().allow('', null),
    hero_paragraph3_en: Joi.string().allow('', null),
    hero_paragraph3_ru: Joi.string().allow('', null),
    hero_paragraph3_pl: Joi.string().allow('', null),
    hero_paragraph4_en: Joi.string().allow('', null),
    hero_paragraph4_ru: Joi.string().allow('', null),
    hero_paragraph4_pl: Joi.string().allow('', null),
    hero_paragraph5_en: Joi.string().allow('', null),
    hero_paragraph5_ru: Joi.string().allow('', null),
    hero_paragraph5_pl: Joi.string().allow('', null),

    hero_image_url: Joi.string().allow('', null),

    values_title_en: Joi.string().allow('', null),
    values_title_ru: Joi.string().allow('', null),
    values_title_pl: Joi.string().allow('', null),
    values_desc_en:  Joi.string().allow('', null),
    values_desc_ru:  Joi.string().allow('', null),
    values_desc_pl:  Joi.string().allow('', null),

    value1_title_en: Joi.string().allow('', null),
    value1_title_ru: Joi.string().allow('', null),
    value1_title_pl: Joi.string().allow('', null),
    value1_desc_en:  Joi.string().allow('', null),
    value1_desc_ru:  Joi.string().allow('', null),
    value1_desc_pl:  Joi.string().allow('', null),

    value2_title_en: Joi.string().allow('', null),
    value2_title_ru: Joi.string().allow('', null),
    value2_title_pl: Joi.string().allow('', null),
    value2_desc_en:  Joi.string().allow('', null),
    value2_desc_ru:  Joi.string().allow('', null),
    value2_desc_pl:  Joi.string().allow('', null),

    value3_title_en: Joi.string().allow('', null),
    value3_title_ru: Joi.string().allow('', null),
    value3_title_pl: Joi.string().allow('', null),
    value3_desc_en:  Joi.string().allow('', null),
    value3_desc_ru:  Joi.string().allow('', null),
    value3_desc_pl:  Joi.string().allow('', null),
  }).unknown(true),

  // Projects Hero — editable hero block of the public "Проекты" page.
  // All fields optional so the admin can save partial updates.
  updateProjectsHero: Joi.object({
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),

    bible_quote_en: Joi.string().allow('', null),
    bible_quote_ru: Joi.string().allow('', null),
    bible_quote_pl: Joi.string().allow('', null),

    bible_source_en: Joi.string().allow('', null),
    bible_source_ru: Joi.string().allow('', null),
    bible_source_pl: Joi.string().allow('', null),

    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),

    background_image_url: Joi.string().allow('', null),

    // CTA block
    cta_title_en: Joi.string().allow('', null),
    cta_title_ru: Joi.string().allow('', null),
    cta_title_pl: Joi.string().allow('', null),

    cta_description_en: Joi.string().allow('', null),
    cta_description_ru: Joi.string().allow('', null),
    cta_description_pl: Joi.string().allow('', null),

    cta_get_involved_en: Joi.string().allow('', null),
    cta_get_involved_ru: Joi.string().allow('', null),
    cta_get_involved_pl: Joi.string().allow('', null),

    cta_donate_now_en: Joi.string().allow('', null),
    cta_donate_now_ru: Joi.string().allow('', null),
    cta_donate_now_pl: Joi.string().allow('', null),
  }).unknown(true),

  // Testimonies Hero — editable hero block of the public "Свидетельства" page.
  // All fields optional so the admin can save partial updates.
  updateTestimoniesHero: Joi.object({
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),

    title_highlight_en: Joi.string().allow('', null),
    title_highlight_ru: Joi.string().allow('', null),
    title_highlight_pl: Joi.string().allow('', null),

    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),

    background_image_url: Joi.string().allow('', null),

    // Share Your Story block
    share_title_en: Joi.string().allow('', null),
    share_title_ru: Joi.string().allow('', null),
    share_title_pl: Joi.string().allow('', null),

    share_description_en: Joi.string().allow('', null),
    share_description_ru: Joi.string().allow('', null),
    share_description_pl: Joi.string().allow('', null),

    share_button_en: Joi.string().allow('', null),
    share_button_ru: Joi.string().allow('', null),
    share_button_pl: Joi.string().allow('', null),
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

  // Privacy Policy — editable content of the public "/privacy-policy" page.
  // All fields are simple optional strings; built programmatically so the
  // schema stays in sync with the DB columns.
  updatePrivacyPolicy: (() => {
    const bases = [
      'hero_title', 'hero_subtitle',
      'section1_title', 'section1_content',
      'section2_title', 'section2_content',
      'section2_item1', 'section2_item2', 'section2_item3', 'section2_item4',
      'section3_title', 'section3_content',
      'section4_title', 'section4_content',
      'section5_title', 'section5_content',
      'section6_title', 'section6_content',
      'contact_title', 'contact_content',
    ];
    const shape = {};
    for (const base of bases) {
      for (const lang of ['en', 'ru', 'pl']) {
        shape[`${base}_${lang}`] = Joi.string().allow('', null);
      }
    }
    return Joi.object(shape).unknown(true);
  })(),

  // Home page — editable content of the public landing page.
  // Hero (logo + texts + buttons) + Mission (3 cards) + Projects/Support/Testimonies headers + Contact (labels + form placeholders).
  updateHomePage: (() => {
    const multilingualBases = [
      'hero_title', 'hero_title_highlight', 'hero_description',
      'hero_btn_support', 'hero_btn_learn_more',
      'mission_title', 'mission_description',
      'card1_title', 'card1_desc',
      'card2_title', 'card2_desc',
      'card3_title', 'card3_desc',
      'projects_title', 'projects_description',
      'support_title', 'support_description',
      'testimonies_title', 'testimonies_description',
      'contact_title', 'contact_description',
      'label_address', 'label_phone', 'label_email',
      'form_title',
      'ph_first_name', 'ph_last_name', 'ph_email', 'ph_subject', 'ph_message',
    ];
    const shape = {};
    for (const base of multilingualBases) {
  // Cookie Policy — editable content of the public "/cookie-policy" page.
  // Hero + 4 sections + 3 cookie types inside section 2 + contact block.
  updateCookiePolicy: (() => {
  // Terms of Service — editable content of the public "/terms-of-service" page.
  // Same shape as Privacy Policy but with 3 items in section 3 instead of 4 in section 2.
  updateTermsOfService: (() => {
    const bases = [
      'hero_title', 'hero_subtitle',
      'section1_title', 'section1_content',
      'section2_title', 'section2_content',
      'type1_title', 'type1_desc',
      'type2_title', 'type2_desc',
      'type3_title', 'type3_desc',
      'section3_title', 'section3_content',
      'section4_title', 'section4_content',
      'section3_title', 'section3_content',
      'section3_item1', 'section3_item2', 'section3_item3',
      'section4_title', 'section4_content',
      'section5_title', 'section5_content',
      'section6_title', 'section6_content',
      'contact_title', 'contact_content',
    ];
    const shape = {};
    for (const base of bases) {
      for (const lang of ['en', 'ru', 'pl']) {
        shape[`${base}_${lang}`] = Joi.string().allow('', null);
      }
    }
    // Single-value image field
    shape.logo_url = Joi.string().allow('', null);
    return Joi.object(shape).unknown(true);
  })(),

  // Donation page — editable content of the public "Пожертвование" page.
  // All fields optional so the admin can save partial updates.
  updateDonationPage: Joi.object({
    title_en: Joi.string().allow('', null),
    title_ru: Joi.string().allow('', null),
    title_pl: Joi.string().allow('', null),

    description_en: Joi.string().allow('', null),
    description_ru: Joi.string().allow('', null),
    description_pl: Joi.string().allow('', null),

    image_url: Joi.string().allow('', null),

    back_button_en: Joi.string().allow('', null),
    back_button_ru: Joi.string().allow('', null),
    back_button_pl: Joi.string().allow('', null),
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
