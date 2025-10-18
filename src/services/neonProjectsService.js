import { neonClient } from './neon.js';
import { cacheService } from './cacheService.js';

// Helper function to check if Neon client is available
const checkNeonClient = () => {
  if (!neonClient) {
    throw new Error('Neon database not configured. Please set VITE_NEON_URL environment variable.');
  }
};

export const neonProjectsService = {
  // Get all projects
  async getAll() {
    checkNeonClient();

    // Check cache first
    const cacheKey = 'projects:all';
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Returning cached projects');
      return cached;
    }

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        ORDER BY created_at DESC
      `;

      // Cache the result
      cacheService.set(cacheKey, result);
      console.log('💾 Cached projects data');

      return result;
    } catch (error) {
      console.error('Failed to fetch projects from Neon:', error);
      throw error;
    }
  },

  // Get active projects only
  async getActive() {
    checkNeonClient();

    // Check cache first
    const cacheKey = 'projects:active';
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Returning cached active projects');
      return cached;
    }

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        WHERE is_active = true
        ORDER BY created_at DESC
      `;

      // Cache the result
      cacheService.set(cacheKey, result);
      console.log('💾 Cached active projects data');

      return result;
    } catch (error) {
      console.error('Failed to fetch active projects from Neon:', error);
      throw error;
    }
  },

  // Get project by ID
  async getById(id) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        WHERE id = ${id}
        LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Failed to fetch project by ID from Neon:', error);
      throw error;
    }
  },

  // Get project by slug
  async getBySlug(slug) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        WHERE slug = ${slug}
        LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Failed to fetch project by slug from Neon:', error);
      throw error;
    }
  },

  // Create project
  async create(projectData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        INSERT INTO projects (
          slug, title_en, title_ru, title_pl, description_en, description_ru, description_pl,
          about_project_en, about_project_ru, about_project_pl, what_we_do_en, what_we_do_ru, what_we_do_pl,
          impact_description_en, impact_description_ru, impact_description_pl,
          stat1_en, stat1_ru, stat1_pl, stat2_en, stat2_ru, stat2_pl, stat3_en, stat3_ru, stat3_pl,
          image_url, gallery_images, is_active
        ) VALUES (
          ${projectData.slug}, ${projectData.title_en}, ${projectData.title_ru}, ${projectData.title_pl},
          ${projectData.description_en}, ${projectData.description_ru}, ${projectData.description_pl},
          ${projectData.about_project_en}, ${projectData.about_project_ru}, ${projectData.about_project_pl},
          ${projectData.what_we_do_en}, ${projectData.what_we_do_ru}, ${projectData.what_we_do_pl},
          ${projectData.impact_description_en}, ${projectData.impact_description_ru}, ${projectData.impact_description_pl},
          ${projectData.stat1_en}, ${projectData.stat1_ru}, ${projectData.stat1_pl},
          ${projectData.stat2_en}, ${projectData.stat2_ru}, ${projectData.stat2_pl},
          ${projectData.stat3_en}, ${projectData.stat3_ru}, ${projectData.stat3_pl},
          ${projectData.image_url}, ${JSON.stringify(projectData.gallery_images)}, ${projectData.is_active ?? true}
        )
        RETURNING *
      `;

      // Clear projects cache
      cacheService.clearPattern('projects:');
      console.log('🗑️ Cleared projects cache after create');

      return result[0];
    } catch (error) {
      console.error('Failed to create project in Neon:', error);
      throw error;
    }
  },

  // Update project
  async update(id, projectData) {
    checkNeonClient();

    try {
      const result = await neonClient`
        UPDATE projects 
        SET 
          slug = ${projectData.slug},
          title_en = ${projectData.title_en},
          title_ru = ${projectData.title_ru},
          title_pl = ${projectData.title_pl},
          description_en = ${projectData.description_en},
          description_ru = ${projectData.description_ru},
          description_pl = ${projectData.description_pl},
          about_project_en = ${projectData.about_project_en},
          about_project_ru = ${projectData.about_project_ru},
          about_project_pl = ${projectData.about_project_pl},
          what_we_do_en = ${projectData.what_we_do_en},
          what_we_do_ru = ${projectData.what_we_do_ru},
          what_we_do_pl = ${projectData.what_we_do_pl},
          impact_title_en = ${projectData.impact_title_en},
          impact_title_ru = ${projectData.impact_title_ru},
          impact_title_pl = ${projectData.impact_title_pl},
          impact_description_en = ${projectData.impact_description_en},
          impact_description_ru = ${projectData.impact_description_ru},
          impact_description_pl = ${projectData.impact_description_pl},
          stat1_en = ${projectData.stat1_en},
          stat1_ru = ${projectData.stat1_ru},
          stat1_pl = ${projectData.stat1_pl},
          stat2_en = ${projectData.stat2_en},
          stat2_ru = ${projectData.stat2_ru},
          stat2_pl = ${projectData.stat2_pl},
          stat3_en = ${projectData.stat3_en},
          stat3_ru = ${projectData.stat3_ru},
          stat3_pl = ${projectData.stat3_pl},
          image_url = ${projectData.image_url},
          gallery_images = ${JSON.stringify(projectData.gallery_images)},
          is_active = ${projectData.is_active ?? true},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;

      // Clear projects cache
      cacheService.clearPattern('projects:');
      console.log('🗑️ Cleared projects cache after update');

      return result[0];
    } catch (error) {
      console.error('Failed to update project in Neon:', error);
      throw error;
    }
  },

  // Delete project
  async delete(id) {
    checkNeonClient();

    try {
      await neonClient`
        DELETE FROM projects 
        WHERE id = ${id}
      `;

      // Clear projects cache
      cacheService.clearPattern('projects:');
      console.log('🗑️ Cleared projects cache after delete');

      return true;
    } catch (error) {
      console.error('Failed to delete project in Neon:', error);
      throw error;
    }
  },

  // Get random projects (for homepage)
  async getRandom(limit = 3) {
    checkNeonClient();

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        WHERE is_active = true
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
      return result;
    } catch (error) {
      console.error('Failed to fetch random projects from Neon:', error);
      throw error;
    }
  },

  // Get first projects (for homepage)
  async getFirst(limit = 3) {
    checkNeonClient();

    // Check cache first
    const cacheKey = `projects:first:${limit}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Returning cached first projects');
      return cached;
    }

    try {
      const result = await neonClient`
        SELECT * FROM projects 
        WHERE is_active = true
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;

      // Cache the result
      cacheService.set(cacheKey, result);
      console.log('💾 Cached first projects data');

      return result;
    } catch (error) {
      console.error('Failed to fetch first projects from Neon:', error);
      throw error;
    }
  },
};
