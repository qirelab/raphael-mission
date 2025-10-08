-- Raphael Mission - Complete Supabase Schema
-- Just copy and paste this entire file into Supabase SQL Editor

-- ============================================
-- STEP 1: CREATE TABLES
-- ============================================

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

-- ============================================
-- STEP 2: CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonies_active ON testimonies(is_active);
CREATE INDEX IF NOT EXISTS idx_training_active ON training_programs(is_active);
CREATE INDEX IF NOT EXISTS idx_products_active ON shop_products(is_active);

-- ============================================
-- STEP 3: INSERT DEFAULT DATA
-- ============================================

INSERT INTO contact_info (phone_number, email, address_line1, city, country) 
VALUES ('+1 234 567 8900', 'contact@raphaelmission.org', '123 Mission Street', 'Faith City', 'USA')
ON CONFLICT DO NOTHING;

-- ============================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 5: CREATE RLS POLICIES
-- ============================================

-- Public can view active content
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

-- Authenticated users (admins) have full access
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

-- ============================================
-- DONE! Now create admin user in Authentication > Users
-- ============================================

