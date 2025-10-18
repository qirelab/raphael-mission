// Simple storage service stub for Neon-only setup
// Note: File uploads require Supabase Storage or custom implementation

export const storageService = {
  async uploadImage(file, folder = 'general') {
    // Simple stub - returns a placeholder URL
    // In production, implement proper file upload
    console.warn('⚠️ File upload is disabled - using stub service');

    // Create a data URL for preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          path: `${folder}/stub-${Date.now()}-${file.name}`,
        });
      };
      reader.readAsDataURL(file);
    });
  },

  async deleteImage(path) {
    console.warn('⚠️ File deletion is disabled - using stub service');
    return { success: true };
  },

  getPublicUrl(path) {
    // Return the path as-is for stub
    return { data: { publicUrl: path } };
  },
};


