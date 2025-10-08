-- Add location field to testimonies table
-- Run this in Supabase SQL Editor after creating tables

ALTER TABLE testimonies 
ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- Update existing records with empty location if needed
UPDATE testimonies 
SET location = COALESCE(title_en, '')
WHERE location IS NULL;

