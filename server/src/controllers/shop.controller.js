import { shopDbService } from '../services/database/shop.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const shopController = {
  /**
   * Get all products
   * GET /api/shop
   */
  async getAll(req, res, next) {
    try {
      const products = await shopDbService.getAll();

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get active products
   * GET /api/shop/active
   */
  async getActive(req, res, next) {
    try {
      const products = await shopDbService.getActive();

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get product by ID
   * GET /api/shop/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await shopDbService.getById(id);

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create product (admin only)
   * POST /api/shop
   */
  async create(req, res, next) {
    try {
      const product = await shopDbService.create(req.body);

      logger.info(`Product created: ${product.id} by ${req.user?.email}`);

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update product (admin only)
   * PUT /api/shop/:id
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await shopDbService.update(id, req.body);

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      logger.info(`Product updated: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete product (admin only)
   * DELETE /api/shop/:id
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await shopDbService.delete(id);

      logger.info(`Product deleted: ${id} by ${req.user?.email}`);

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
