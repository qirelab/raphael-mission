import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
const result = dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  // Try loading from current directory as fallback
  dotenv.config();
}

// Verify critical environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set in .env file');
  console.error('Expected location:', path.join(__dirname, '..', '.env'));
  console.error('');
  console.error('Please create server/.env with:');
  console.error('DATABASE_URL=postgresql://raphael_user:dev_password_2024@localhost:5432/raphael_db');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('   DATABASE_URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')); // Hide password
