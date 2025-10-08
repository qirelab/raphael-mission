import { supabase } from './supabase';

const BUCKET_NAME = 'raphael-mission-images';

export const storageService = {
  // Upload image to Supabase Storage
  async uploadImage(file, folder = 'general') {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload file
      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

      return { url: publicUrl, path: fileName };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image from Supabase Storage
  async deleteImage(path) {
    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  // Get public URL for existing image
  getPublicUrl(path) {
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return publicUrl;
  },
};
