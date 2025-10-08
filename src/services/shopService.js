import { supabase } from './supabase';

export const shopService = {
  // Get all products
  async getAll() {
    const { data, error } = await supabase
      .from('shop_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get active products only
  async getActive() {
    const { data, error } = await supabase
      .from('shop_products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get product by ID
  async getById(id) {
    const { data, error } = await supabase.from('shop_products').select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  },

  // Create product
  async create(productData) {
    const { data, error } = await supabase
      .from('shop_products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update product
  async update(id, productData) {
    const { data, error } = await supabase
      .from('shop_products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete product
  async delete(id) {
    const { error } = await supabase.from('shop_products').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Product deleted successfully' };
  },
};
