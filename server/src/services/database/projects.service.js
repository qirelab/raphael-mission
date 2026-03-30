import { pool } from '../../config/database.js';
import { cacheService } from '../cache.service.js';
import { logger } from '../../utils/logger.js';

export const projectsDbService = {
  // Get all projects
  async getAll() {
    // Check cache first
    const cacheKey = 'projects:all';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached projects');
      return cached;
    }

    try {
      const result = await pool.query(`
        SELECT * FROM projects
        ORDER BY created_at DESC
      `);

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached projects data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  // Get active projects only
  async getActive() {
    // Check cache first
    const cacheKey = 'projects:active';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached active projects');
      return cached;
    }

    try {
      const result = await pool.query(`
        SELECT * FROM projects
        WHERE is_active = true
        ORDER BY created_at DESC
      `);

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached active projects data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch active projects:', error);
      throw error;
    }
  },

  // Get project by ID
  async getById(id) {
    try {
      const result = await pool.query(`
        SELECT * FROM projects
        WHERE id = $1
        LIMIT 1
      `, [id]);

      return result.rows[0] || null;
    } catch (error) {
      logger.error('Failed to fetch project by ID:', error);
      throw error;
    }
  },

  // Get project by slug
  async getBySlug(slug) {
    try {
      const result = await pool.query(`
        SELECT * FROM projects
        WHERE slug = $1
        LIMIT 1
      `, [slug]);

      return result.rows[0] || null;
    } catch (error) {
      logger.error('Failed to fetch project by slug:', error);
      throw error;
    }
  },

  // Create project
  async create(projectData) {
    try {
      const result = await pool.query(`
        INSERT INTO projects (
          slug, title_en, title_ru, title_pl, description_en, description_ru, description_pl,
          about_project_en, about_project_ru, about_project_pl, what_we_do_en, what_we_do_ru, what_we_do_pl,
          impact_description_en, impact_description_ru, impact_description_pl,
          stat1_en, stat1_ru, stat1_pl, stat2_en, stat2_ru, stat2_pl, stat3_en, stat3_ru, stat3_pl,
          image_url, gallery_images, is_active
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
        )
        RETURNING *
      `, [
        projectData.slug || '',
        projectData.title_en || '',
        projectData.title_ru || '',
        projectData.title_pl || '',
        projectData.description_en || '',
        projectData.description_ru || '',
        projectData.description_pl || '',
        projectData.about_project_en || '',
        projectData.about_project_ru || '',
        projectData.about_project_pl || '',
        projectData.what_we_do_en || '',
        projectData.what_we_do_ru || '',
        projectData.what_we_do_pl || '',
        projectData.impact_description_en || '',
        projectData.impact_description_ru || '',
        projectData.impact_description_pl || '',
        projectData.stat1_en || '',
        projectData.stat1_ru || '',
        projectData.stat1_pl || '',
        projectData.stat2_en || '',
        projectData.stat2_ru || '',
        projectData.stat2_pl || '',
        projectData.stat3_en || '',
        projectData.stat3_ru || '',
        projectData.stat3_pl || '',
        projectData.image_url || null,
        JSON.stringify(projectData.gallery_images || []),
        projectData.is_active ?? true
      ]);

      // Clear projects cache
      await cacheService.clearPattern('projects:*');
      logger.info('🗑️ Cleared projects cache after create');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to create project:', error);
      throw error;
    }
  },

  // Update project
  async update(id, projectData) {
    try {
      const result = await pool.query(`
        UPDATE projects
        SET
          slug = COALESCE($1, slug),
          title_en = COALESCE($2, title_en),
          title_ru = COALESCE($3, title_ru),
          title_pl = COALESCE($4, title_pl),
          description_en = COALESCE($5, description_en),
          description_ru = COALESCE($6, description_ru),
          description_pl = COALESCE($7, description_pl),
          about_project_en = COALESCE($8, about_project_en),
          about_project_ru = COALESCE($9, about_project_ru),
          about_project_pl = COALESCE($10, about_project_pl),
          what_we_do_en = COALESCE($11, what_we_do_en),
          what_we_do_ru = COALESCE($12, what_we_do_ru),
          what_we_do_pl = COALESCE($13, what_we_do_pl),
          impact_title_en = COALESCE($14, impact_title_en),
          impact_title_ru = COALESCE($15, impact_title_ru),
          impact_title_pl = COALESCE($16, impact_title_pl),
          impact_description_en = COALESCE($17, impact_description_en),
          impact_description_ru = COALESCE($18, impact_description_ru),
          impact_description_pl = COALESCE($19, impact_description_pl),
          stat1_en = COALESCE($20, stat1_en),
          stat1_ru = COALESCE($21, stat1_ru),
          stat1_pl = COALESCE($22, stat1_pl),
          stat2_en = COALESCE($23, stat2_en),
          stat2_ru = COALESCE($24, stat2_ru),
          stat2_pl = COALESCE($25, stat2_pl),
          stat3_en = COALESCE($26, stat3_en),
          stat3_ru = COALESCE($27, stat3_ru),
          stat3_pl = COALESCE($28, stat3_pl),
          image_url = COALESCE($29, image_url),
          gallery_images = COALESCE($30, gallery_images),
          is_active = COALESCE($31, is_active),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $32
        RETURNING *
      `, [
        projectData.slug || null,
        projectData.title_en || null,
        projectData.title_ru || null,
        projectData.title_pl || null,
        projectData.description_en || null,
        projectData.description_ru || null,
        projectData.description_pl || null,
        projectData.about_project_en || null,
        projectData.about_project_ru || null,
        projectData.about_project_pl || null,
        projectData.what_we_do_en || null,
        projectData.what_we_do_ru || null,
        projectData.what_we_do_pl || null,
        projectData.impact_title_en || null,
        projectData.impact_title_ru || null,
        projectData.impact_title_pl || null,
        projectData.impact_description_en || null,
        projectData.impact_description_ru || null,
        projectData.impact_description_pl || null,
        projectData.stat1_en || null,
        projectData.stat1_ru || null,
        projectData.stat1_pl || null,
        projectData.stat2_en || null,
        projectData.stat2_ru || null,
        projectData.stat2_pl || null,
        projectData.stat3_en || null,
        projectData.stat3_ru || null,
        projectData.stat3_pl || null,
        projectData.image_url || null,
        projectData.gallery_images ? JSON.stringify(projectData.gallery_images) : null,
        projectData.is_active !== undefined ? projectData.is_active : null,
        id
      ]);

      // Clear projects cache
      await cacheService.clearPattern('projects:*');
      logger.info('🗑️ Cleared projects cache after update');

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to update project:', error);
      throw error;
    }
  },

  // Delete project
  async delete(id) {
    try {
      await pool.query(`
        DELETE FROM projects
        WHERE id = $1
      `, [id]);

      // Clear projects cache
      await cacheService.clearPattern('projects:*');
      logger.info('🗑️ Cleared projects cache after delete');

      return true;
    } catch (error) {
      logger.error('Failed to delete project:', error);
      throw error;
    }
  },

  // Get random projects (for homepage)
  async getRandom(limit = 3) {
    try {
      const result = await pool.query(`
        SELECT * FROM projects
        WHERE is_active = true
        ORDER BY RANDOM()
        LIMIT $1
      `, [limit]);

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch random projects:', error);
      throw error;
    }
  },

  // Get first projects (for homepage)
  async getFirst(limit = 3) {
    // Check cache first
    const cacheKey = `projects:first:${limit}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      logger.info('📦 Returning cached first projects');
      return cached;
    }

    try {
      const result = await pool.query(`
        SELECT * FROM projects
        WHERE is_active = true
        ORDER BY created_at DESC
        LIMIT $1
      `, [limit]);

      // Cache the result
      await cacheService.set(cacheKey, result.rows);
      logger.info('💾 Cached first projects data');

      return result.rows;
    } catch (error) {
      logger.error('Failed to fetch first projects:', error);
      throw error;
    }
  },
};
