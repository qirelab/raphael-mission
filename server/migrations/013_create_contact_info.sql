-- ============================================================================
-- Contact Info — Editable Contact Data
-- Version: 013
-- Description: Create contact_info table used by the public site and the
--              admin "Контактная информация" page. The old `contact` table
--              from migration 000 had a different schema (single-language
--              address, social_links JSONB) and is no longer used by the
--              app — its data is migrated below if present.
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,

    phone_number      VARCHAR(50),
    email             VARCHAR(255),

    address_line1_en  TEXT,
    address_line1_ru  TEXT,
    address_line1_pl  TEXT,

    address_line2_en  TEXT,
    address_line2_ru  TEXT,
    address_line2_pl  TEXT,

    city              VARCHAR(255),
    country           VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_contact_info_updated_at ON contact_info;
CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON contact_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Migrate data from the legacy `contact` table (migration 000) into the new
-- schema, only if the legacy table exists and the new table is still empty.
-- Single-language fields (phone, address_en, address_ru) map to their nearest
-- equivalents in the new schema.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'contact'
    ) AND NOT EXISTS (SELECT 1 FROM contact_info) THEN
        INSERT INTO contact_info (
            phone_number, email,
            address_line1_en, address_line1_ru
        )
        SELECT phone, email, address_en, address_ru
        FROM contact
        ORDER BY id DESC
        LIMIT 1;
    END IF;
END $$;

-- Seed a default row if neither legacy data nor existing rows are present, so
-- the admin page has something to load on a fresh install.
INSERT INTO contact_info (
    phone_number, email,
    address_line1_en, address_line1_ru, address_line1_pl,
    city, country
)
SELECT
    '+1 234 567 8900',
    'info@raphael-mission.org',
    '123 Main Street',
    'ул. Главная 123',
    'ul. Główna 123',
    'New York',
    'USA'
WHERE NOT EXISTS (SELECT 1 FROM contact_info);
