import express from 'express';
import authRoutes from './auth.routes.js';
import projectsRoutes from './projects.routes.js';
import projectsHeroRoutes from './projectsHero.routes.js';
import shopRoutes from './shop.routes.js';
import testimoniesRoutes from './testimonies.routes.js';
import testimoniesHeroRoutes from './testimoniesHero.routes.js';
import trainingRoutes from './training.routes.js';
import contactRoutes from './contact.routes.js';
import aboutRoutes from './about.routes.js';
import privacyPolicyRoutes from './privacyPolicy.routes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/projects-hero', projectsHeroRoutes);
router.use('/shop', shopRoutes);
router.use('/testimonies', testimoniesRoutes);
router.use('/testimonies-hero', testimoniesHeroRoutes);
router.use('/training', trainingRoutes);
router.use('/contact', contactRoutes);
router.use('/about', aboutRoutes);
router.use('/privacy-policy', privacyPolicyRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Raphael Mission API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      projectsHero: '/api/projects-hero',
      shop: '/api/shop',
      testimonies: '/api/testimonies',
      testimoniesHero: '/api/testimonies-hero',
      training: '/api/training',
      contact: '/api/contact',
      about: '/api/about',
      privacyPolicy: '/api/privacy-policy',
    },
  });
});

export default router;
