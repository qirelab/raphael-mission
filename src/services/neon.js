import { neon } from '@neondatabase/serverless';

// Neon database configuration
const neonUrl = import.meta.env.VITE_NEON_URL;

// Create Neon client with fallback
let neonClient = null;

if (neonUrl) {
  try {
    neonClient = neon(neonUrl);
  } catch (error) {
    console.error('Failed to initialize Neon client:', error);
  }
} else {
  console.warn('Missing Neon database URL. Please set VITE_NEON_URL in your .env file');
}

// Export the client (null if not configured)
export { neonClient };

// Test connection
export const testNeonConnection = async () => {
  if (!neonClient) {
    console.error(
      'Neon client not initialized. Please check your VITE_NEON_URL environment variable.'
    );
    return false;
  }

  try {
    const result = await neonClient`SELECT 1 as test`;
    console.log('Neon connection successful:', result);
    return true;
  } catch (error) {
    console.error('Neon connection failed:', error);
    return false;
  }
};
