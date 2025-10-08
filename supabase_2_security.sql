-- STEP 2: Setup Row Level Security
-- Run this AFTER step 1

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view active projects" ON projects;
DROP POLICY IF EXISTS "Public can view active testimonies" ON testimonies;
DROP POLICY IF EXISTS "Public can view active training" ON training_programs;
DROP POLICY IF EXISTS "Public can view active products" ON shop_products;
DROP POLICY IF EXISTS "Public can view contact info" ON contact_info;
DROP POLICY IF EXISTS "Admins have full access to projects" ON projects;
DROP POLICY IF EXISTS "Admins have full access to testimonies" ON testimonies;
DROP POLICY IF EXISTS "Admins have full access to contact" ON contact_info;
DROP POLICY IF EXISTS "Admins have full access to training" ON training_programs;
DROP POLICY IF EXISTS "Admins have full access to products" ON shop_products;

-- Public read policies
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

-- Admin full access policies
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

