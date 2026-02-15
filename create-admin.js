import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const neonUrl = process.env.VITE_NEON_URL;

if (!neonUrl) {
  console.error('❌ VITE_NEON_URL not found in environment variables');
  console.error('Please create a .env file with your Neon database URL');
  process.exit(1);
}

const sql = neon(neonUrl);

// Admin credentials
const ADMIN_EMAIL = 'admin@raphaelmission.org';
const ADMIN_PASSWORD = 'Raphael$2026!Secure#Admin*Pass';
const ADMIN_NAME = 'Raphael Admin';
const ADMIN_ROLE = 'admin';

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...\n');

    // Check if users table exists
    console.log('📋 Checking database tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `;

    if (tables.length === 0) {
      console.log('⚠️  Users table not found. Creating tables...\n');

      // Create users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('✅ Users table created');

      // Create user_sessions table
      await sql`
        CREATE TABLE IF NOT EXISTS user_sessions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          session_token VARCHAR(255) UNIQUE NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('✅ User sessions table created');

      // Create login_attempts table
      await sql`
        CREATE TABLE IF NOT EXISTS login_attempts (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          ip_address VARCHAR(45),
          success BOOLEAN DEFAULT false,
          attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('✅ Login attempts table created\n');
    } else {
      console.log('✅ Users table exists\n');
    }

    // Check if admin already exists
    console.log('🔍 Checking if admin user exists...');
    const existingAdmin = await sql`
      SELECT id, email FROM users WHERE email = ${ADMIN_EMAIL}
    `;

    if (existingAdmin.length > 0) {
      console.log(`⚠️  Admin user already exists with email: ${ADMIN_EMAIL}`);
      console.log('Updating password...\n');

      // Update existing admin password
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await sql`
        UPDATE users 
        SET password_hash = ${passwordHash}, 
            updated_at = CURRENT_TIMESTAMP
        WHERE email = ${ADMIN_EMAIL}
      `;

      console.log('✅ Admin password updated successfully!\n');
    } else {
      console.log('Creating new admin user...\n');

      // Hash password
      console.log('🔐 Hashing password...');
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      console.log('✅ Password hashed\n');

      // Insert admin user
      console.log('💾 Inserting admin user into database...');
      await sql`
        INSERT INTO users (email, password_hash, name, role, is_active)
        VALUES (${ADMIN_EMAIL}, ${passwordHash}, ${ADMIN_NAME}, ${ADMIN_ROLE}, true)
      `;
      console.log('✅ Admin user created successfully!\n');
    }

    // Display credentials
    console.log('═══════════════════════════════════════════════════');
    console.log('🎉 ADMIN USER CREDENTIALS');
    console.log('═══════════════════════════════════════════════════');
    console.log(`📧 Email:    ${ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`👤 Name:     ${ADMIN_NAME}`);
    console.log(`🎭 Role:     ${ADMIN_ROLE}`);
    console.log('═══════════════════════════════════════════════════');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('💡 You can now login at: http://localhost:4028/admin/login\n');

    // Verify user was created
    const verifyUser = await sql`
      SELECT id, email, name, role, is_active, created_at 
      FROM users 
      WHERE email = ${ADMIN_EMAIL}
    `;

    if (verifyUser.length > 0) {
      console.log('✅ Verification successful - User found in database');
      console.log(`   User ID: ${verifyUser[0].id}`);
      console.log(`   Created: ${verifyUser[0].created_at}\n`);
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    console.error('\nDetails:', error.message);
    process.exit(1);
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
