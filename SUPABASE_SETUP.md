# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or login
3. Click "New Project"
4. Fill in:
   - **Name**: `raphael-mission`
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

## 2. Get API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** section
3. Copy these values:
   - **URL**: `Project URL`
   - **anon/public key**: `anon` key

## 3. Setup Environment Variables

Create `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Create Database Tables

1. Go to **SQL Editor** in Supabase dashboard
2. Create new query
3. Paste the schema from `server/database/schema.sql`
4. **Important modifications needed**:
   - Remove the trigger functions and triggers at the end (Supabase has built-in timestamp handling)
   - Remove the admin user insert (we'll create this via Supabase Auth)

Run this simplified schema:

\`\`\`sql
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
id BIGSERIAL PRIMARY KEY,
title_en TEXT NOT NULL,
title_ru TEXT NOT NULL,
title_pl TEXT NOT NULL,
description_en TEXT NOT NULL,
description_ru TEXT NOT NULL,
description_pl TEXT NOT NULL,
hero_description_en TEXT,
hero_description_ru TEXT,
hero_description_pl TEXT,
what_we_do_en TEXT,
what_we_do_ru TEXT,
what_we_do_pl TEXT,
impact_title_en TEXT,
impact_title_ru TEXT,
impact_title_pl TEXT,
stat1_en TEXT,
stat1_ru TEXT,
stat1_pl TEXT,
stat2_en TEXT,
stat2_ru TEXT,
stat2_pl TEXT,
stat3_en TEXT,
stat3_ru TEXT,
stat3_pl TEXT,
approach_title_en TEXT,
approach_title_ru TEXT,
approach_title_pl TEXT,
approach1_en TEXT,
approach1_ru TEXT,
approach1_pl TEXT,
approach2_en TEXT,
approach2_ru TEXT,
approach2_pl TEXT,
approach3_en TEXT,
approach3_ru TEXT,
approach3_pl TEXT,
approach4_en TEXT,
approach4_ru TEXT,
approach4_pl TEXT,
image_url TEXT,
slug VARCHAR(255) UNIQUE NOT NULL,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Testimonies table
CREATE TABLE IF NOT EXISTS testimonies (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
title_en VARCHAR(255),
title_ru VARCHAR(255),
title_pl VARCHAR(255),
testimony_en TEXT NOT NULL,
testimony_ru TEXT NOT NULL,
testimony_pl TEXT NOT NULL,
image_url TEXT,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact info table
CREATE TABLE IF NOT EXISTS contact_info (
id BIGSERIAL PRIMARY KEY,
phone_number VARCHAR(50),
email VARCHAR(255),
address_line1 TEXT,
address_line2 TEXT,
city VARCHAR(255),
country VARCHAR(255),
facebook_url TEXT,
twitter_url TEXT,
youtube_url TEXT,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Training programs table
CREATE TABLE IF NOT EXISTS training_programs (
id BIGSERIAL PRIMARY KEY,
title_en VARCHAR(255) NOT NULL,
title_ru VARCHAR(255) NOT NULL,
title_pl VARCHAR(255) NOT NULL,
description_en TEXT NOT NULL,
description_ru TEXT NOT NULL,
description_pl TEXT NOT NULL,
duration_en VARCHAR(100),
duration_ru VARCHAR(100),
duration_pl VARCHAR(100),
image_url TEXT,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shop products table
CREATE TABLE IF NOT EXISTS shop_products (
id BIGSERIAL PRIMARY KEY,
name_en VARCHAR(255) NOT NULL,
name_ru VARCHAR(255) NOT NULL,
name_pl VARCHAR(255) NOT NULL,
description_en TEXT,
description_ru TEXT,
description_pl TEXT,
price DECIMAL(10, 2) NOT NULL,
currency VARCHAR(10) DEFAULT 'USD',
image_url TEXT,
stock_quantity INTEGER DEFAULT 0,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table (for reference, not used directly)
CREATE TABLE IF NOT EXISTS admin_users (
id UUID PRIMARY KEY,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonies_active ON testimonies(is_active);
CREATE INDEX IF NOT EXISTS idx_training_active ON training_programs(is_active);
CREATE INDEX IF NOT EXISTS idx_products_active ON shop_products(is_active);

-- Insert default contact info
INSERT INTO contact_info (phone_number, email, address_line1, city, country)
VALUES ('+1 234 567 8900', 'contact@raphaelmission.org', '123 Mission Street', 'Faith City', 'USA');
\`\`\`

5. Click **Run** to create all tables

## 5. Setup Row Level Security (RLS)

Supabase requires RLS for security. Run these policies:

\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view active content)
CREATE POLICY "Public can view active projects" ON projects
FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active testimonies" ON testimonies
FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active training" ON training_programs
FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON shop_products
FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view contact info" ON contact_info
FOR SELECT USING (true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Admins have full access to projects" ON projects
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to testimonies" ON testimonies
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to contact" ON contact_info
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to training" ON training_programs
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to products" ON shop_products
FOR ALL USING (auth.role() = 'authenticated');
\`\`\`

## 6. Create Admin User

1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click **Add user** > **Create new user**
3. Fill in:
   - **Email**: `admin@raphaelmission.org` (or your email)
   - **Password**: Create a secure password
   - **Auto Confirm User**: Enable (check the box)
4. Click **Create user**

## 7. Test the Connection

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Visit `http://localhost:5173/admin/login`
3. Login with your admin credentials
4. You should see the admin dashboard!

## 8. Optional: Enable Email Authentication

By default, Supabase uses email/password. To enable magic links or OAuth:

1. Go to **Authentication** > **Providers**
2. Configure desired providers (Google, GitHub, etc.)
3. Update email templates under **Email Templates**

## Troubleshooting

### "Invalid API key" error

- Double-check your `.env` file has correct values
- Make sure you're using the `anon` key, not the `service_role` key
- Restart your dev server after changing `.env`

### Can't login to admin panel

- Verify user was created in **Authentication** > **Users**
- Check that **Auto Confirm User** was enabled
- Try resetting password in Supabase dashboard

### Data not showing up

- Check RLS policies are created
- Verify tables have data (go to **Table Editor**)
- Check browser console for errors

### "relation does not exist" error

- Make sure all tables were created successfully
- Check spelling matches exactly (case-sensitive)

## Next Steps

- Add sample data through admin panel
- Configure storage for images (Supabase Storage)
- Setup backup strategy
- Configure production environment variables

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
