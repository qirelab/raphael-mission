import { supabase } from './supabase';

export const projectsService = {
  // Get all projects
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get active projects only
  async getActive() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get project by ID
  async getById(id) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  },

  // Get project by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  },

  // Create project
  async create(projectData) {
    const { data, error } = await supabase.from('projects').insert([projectData]).select().single();

    if (error) throw error;
    return data;
  },

  // Update project
  async update(id, projectData) {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete project
  async delete(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Project deleted successfully' };
  },

  // Get random projects (for homepage)
  async getRandom(limit = 3) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .limit(limit * 3); // Get more to randomize

    if (error) throw error;

    // Shuffle and return limited results
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  },
};
