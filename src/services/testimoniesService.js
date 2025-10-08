import { supabase } from './supabase';

export const testimoniesService = {
  // Get all testimonies
  async getAll() {
    const { data, error } = await supabase
      .from('testimonies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get active testimonies only
  async getActive() {
    const { data, error } = await supabase
      .from('testimonies')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get testimony by ID
  async getById(id) {
    const { data, error } = await supabase.from('testimonies').select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  },

  // Create testimony
  async create(testimonyData) {
    const { data, error } = await supabase
      .from('testimonies')
      .insert([testimonyData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update testimony
  async update(id, testimonyData) {
    const { data, error } = await supabase
      .from('testimonies')
      .update(testimonyData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete testimony
  async delete(id) {
    const { error } = await supabase.from('testimonies').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Testimony deleted successfully' };
  },

  // Get random testimonies (for homepage)
  async getRandom(limit = 3) {
    const { data, error } = await supabase
      .from('testimonies')
      .select('*')
      .eq('is_active', true)
      .limit(limit * 3); // Get more to randomize

    if (error) throw error;

    // Shuffle and return limited results
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  },
};
