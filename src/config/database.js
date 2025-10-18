// Database configuration
export const DATABASE_CONFIG = {
  // Set to 'supabase' or 'neon'
  provider: import.meta.env.VITE_DATABASE_PROVIDER || 'neon',

  // Supabase configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },

  // Neon configuration
  neon: {
    url: import.meta.env.VITE_NEON_URL,
  },
};

// Get current database provider
export const getCurrentProvider = () => {
  return DATABASE_CONFIG.provider;
};

// Check if using Neon
export const isUsingNeon = () => {
  return getCurrentProvider() === 'neon';
};

// Check if using Supabase
export const isUsingSupabase = () => {
  return getCurrentProvider() === 'supabase';
};
