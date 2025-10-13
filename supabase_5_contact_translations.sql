-- Add translation columns to contact_info table
-- Run this in your Supabase SQL editor

ALTER TABLE contact_info 
  ADD COLUMN IF NOT EXISTS phone_number_en VARCHAR(50),
  ADD COLUMN IF NOT EXISTS phone_number_ru VARCHAR(50),
  ADD COLUMN IF NOT EXISTS phone_number_pl VARCHAR(50),
  ADD COLUMN IF NOT EXISTS email_en VARCHAR(255),
  ADD COLUMN IF NOT EXISTS email_ru VARCHAR(255),
  ADD COLUMN IF NOT EXISTS email_pl VARCHAR(255),
  ADD COLUMN IF NOT EXISTS address_line1_en TEXT,
  ADD COLUMN IF NOT EXISTS address_line1_ru TEXT,
  ADD COLUMN IF NOT EXISTS address_line1_pl TEXT,
  ADD COLUMN IF NOT EXISTS address_line2_en TEXT,
  ADD COLUMN IF NOT EXISTS address_line2_ru TEXT,
  ADD COLUMN IF NOT EXISTS address_line2_pl TEXT;

-- Migrate existing data to English fields (if data exists)
UPDATE contact_info 
SET 
  phone_number_en = COALESCE(phone_number_en, phone_number),
  email_en = COALESCE(email_en, email),
  address_line1_en = COALESCE(address_line1_en, address_line1),
  address_line2_en = COALESCE(address_line2_en, address_line2)
WHERE id IS NOT NULL;

-- You can drop the old columns if you want (optional - uncomment if needed):
-- ALTER TABLE contact_info 
--   DROP COLUMN IF EXISTS phone_number,
--   DROP COLUMN IF EXISTS email,
--   DROP COLUMN IF EXISTS address_line1,
--   DROP COLUMN IF EXISTS address_line2;

