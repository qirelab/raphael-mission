-- ============================================================================
-- Contact Info — Multilingual City & Country
-- Version: 018
-- Description: Add multilingual variants (EN/RU/PL) for the city and country
--              fields on contact_info. Backfill the new EN variants from the
--              legacy single-language columns so already-saved data stays
--              visible on the public site while the admin UI catches up.
--              The old `city` and `country` columns are kept for backwards
--              compatibility — contact.service.js writes both old and new
--              columns and the public site falls back to the old columns
--              when the localized variant is empty.
-- ============================================================================

ALTER TABLE contact_info
    ADD COLUMN IF NOT EXISTS city_en    VARCHAR(255),
    ADD COLUMN IF NOT EXISTS city_ru    VARCHAR(255),
    ADD COLUMN IF NOT EXISTS city_pl    VARCHAR(255),
    ADD COLUMN IF NOT EXISTS country_en VARCHAR(255),
    ADD COLUMN IF NOT EXISTS country_ru VARCHAR(255),
    ADD COLUMN IF NOT EXISTS country_pl VARCHAR(255);

-- Backfill: copy the legacy single-language value into the English variant
-- only if the English variant is still empty. Keeps RU/PL empty so the admin
-- can fill them in deliberately rather than seeing the English text echoed
-- everywhere.
UPDATE contact_info
SET city_en = city
WHERE city IS NOT NULL AND (city_en IS NULL OR city_en = '');

UPDATE contact_info
SET country_en = country
WHERE country IS NOT NULL AND (country_en IS NULL OR country_en = '');
