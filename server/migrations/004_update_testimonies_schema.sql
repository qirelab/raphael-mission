-- ============================================================================
-- Migration: Update testimonies table to match production schema
-- ============================================================================
-- This migration updates the local testimonies table structure to match
-- the production schema from Neon with multilingual fields
-- ============================================================================

-- Step 1: Add new multilingual columns
ALTER TABLE testimonies
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS name_en VARCHAR(255),
ADD COLUMN IF NOT EXISTS name_ru VARCHAR(255),
ADD COLUMN IF NOT EXISTS name_pl VARCHAR(255),
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_ru TEXT,
ADD COLUMN IF NOT EXISTS title_pl TEXT,
ADD COLUMN IF NOT EXISTS content_pl TEXT;

-- Step 2: Migrate data from old columns to new columns
UPDATE testimonies
SET
  name = author_name,
  name_en = author_name,
  name_ru = author_name,
  name_pl = author_name
WHERE name IS NULL;

-- Step 3: Drop the old author_name column (only if it exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'testimonies' AND column_name = 'author_name'
  ) THEN
    ALTER TABLE testimonies DROP COLUMN author_name;
  END IF;
END $$;

-- Step 4: Drop rating column if exists (not used in production)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'testimonies' AND column_name = 'rating'
  ) THEN
    ALTER TABLE testimonies DROP COLUMN rating;
  END IF;
END $$;

-- Step 5: Set NOT NULL constraint on name column
ALTER TABLE testimonies ALTER COLUMN name SET NOT NULL;

-- Step 6: Verify the schema
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'testimonies'
ORDER BY ordinal_position;

-- ============================================================================
-- COMPLETED
-- ============================================================================
-- Testimonies table now has the correct production schema:
-- - id, name (NOT NULL), name_en, name_ru, name_pl
-- - title_en, title_ru, title_pl
-- - content_en (NOT NULL), content_ru (NOT NULL), content_pl
-- - image_url, is_approved, created_at, updated_at
-- ============================================================================
