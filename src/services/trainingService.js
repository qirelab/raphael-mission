import { supabase } from './supabase';

export const trainingService = {
  // Get all training programs
  async getAll() {
    const { data, error } = await supabase
      .from('training_programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get active training programs only
  async getActive() {
    const { data, error } = await supabase
      .from('training_programs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get training program by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('training_programs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create training program
  async create(trainingData) {
    const { data, error } = await supabase
      .from('training_programs')
      .insert([trainingData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update training program
  async update(id, trainingData) {
    const { data, error } = await supabase
      .from('training_programs')
      .update(trainingData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete training program
  async delete(id) {
    const { error } = await supabase.from('training_programs').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Training program deleted successfully' };
  },
};
