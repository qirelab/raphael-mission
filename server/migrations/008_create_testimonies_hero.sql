-- ============================================================================
-- Testimonies Page Hero — Editable Content
-- Version: 008
-- Description: Create testimonies_hero table for the editable Hero block of the
--              public "Свидетельства" page (title / highlighted title part /
--              description + background image, with EN/RU/PL support).
-- ============================================================================

CREATE TABLE IF NOT EXISTS testimonies_hero (
    id SERIAL PRIMARY KEY,

    -- Page title (main part, rendered in neutral colour)
    title_en             TEXT,
    title_ru             TEXT,
    title_pl             TEXT,

    -- Highlighted part of the title (rendered in brand green)
    title_highlight_en   TEXT,
    title_highlight_ru   TEXT,
    title_highlight_pl   TEXT,

    -- Page description (subheading)
    description_en       TEXT,
    description_ru       TEXT,
    description_pl       TEXT,

    -- Background image
    background_image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_testimonies_hero_updated_at ON testimonies_hero;
CREATE TRIGGER update_testimonies_hero_updated_at
    BEFORE UPDATE ON testimonies_hero
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO testimonies_hero (
    title_en, title_ru, title_pl,
    title_highlight_en, title_highlight_ru, title_highlight_pl,
    description_en, description_ru, description_pl,
    background_image_url
)
SELECT
    'Stories of Faith and',
    'Истории веры и',
    'Historie wiary i',

    ' Transformation',
    ' преобразования',
    ' transformacji',

    'Real experiences from people whose lives have been touched and changed through the mission''s work.',
    'Реальные истории людей, чьи жизни были затронуты и изменены благодаря работе миссии.',
    'Prawdziwe doświadczenia ludzi, których życie zostało dotknięte i zmienione przez pracę misji.',

    '/images/transformation.png'
WHERE NOT EXISTS (SELECT 1 FROM testimonies_hero);
