import { supabase } from './supabase';

export const contactService = {
  // Get contact info
  async get() {
    const { data, error } = await supabase.from('contact_info').select('*').limit(1).single();

    if (error) throw error;
    return data;
  },

  // Update contact info
  async update(contactData) {
    // First, get the existing record
    const { data: existing } = await supabase.from('contact_info').select('id').limit(1).single();

    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from('contact_info')
        .update(contactData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new record if none exists
      const { data, error } = await supabase
        .from('contact_info')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },
};
