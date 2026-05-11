-- ============================================================================
-- Projects Page Hero — Editable Content
-- Version: 006
-- Description: Create projects_hero table for the editable Hero block of the
--              public "Проекты" page (title / bible quote / source /
--              description + background image, with EN/RU/PL support).
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects_hero (
    id SERIAL PRIMARY KEY,

    -- Page title
    title_en         TEXT,
    title_ru         TEXT,
    title_pl         TEXT,

    -- Bible quote (italic)
    bible_quote_en   TEXT,
    bible_quote_ru   TEXT,
    bible_quote_pl   TEXT,

    -- Quote source / citation
    bible_source_en  TEXT,
    bible_source_ru  TEXT,
    bible_source_pl  TEXT,

    -- Page description
    description_en   TEXT,
    description_ru   TEXT,
    description_pl   TEXT,

    -- Background image
    background_image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_projects_hero_updated_at ON projects_hero;
CREATE TRIGGER update_projects_hero_updated_at
    BEFORE UPDATE ON projects_hero
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO projects_hero (
    title_en, title_ru, title_pl,
    bible_quote_en, bible_quote_ru, bible_quote_pl,
    bible_source_en, bible_source_ru, bible_source_pl,
    description_en, description_ru, description_pl,
    background_image_url
)
SELECT
    'Our Projects', 'Наши проекты', 'Nasze projekty',

    '"I have come that you may have life, and have it to the full."',
    '«Я пришёл, чтобы вы имели жизнь и имели жизнь с избытком».',
    '„Przyszedłem po to, abyście mieli życie i mieli je w obfitości".',

    'Jesus (John 10:10)', 'Иисус (Иоанна 10:10)', 'Jezus (Jana 10:10)',

    'Through each project we see the fruit of the Gospel: open hearts for Jesus, repentance and transformed lives, where people receive freedom, healing, and hope, returning to the meaning of life.',
    'Через каждый проект мы видим плоды Евангелия: открытые сердца для Иисуса, покаяние и изменённые жизни, где люди получают свободу, исцеление и надежду, возвращаясь к смыслу жизни.',
    'Przez każdy projekt widzimy owoce Ewangelii: otwarte serca dla Jezusa, nawrócenie i odmienione życie, w którym ludzie otrzymują wolność, uzdrowienie i nadzieję, wracając do sensu życia.',

    '/images/projects.png'
WHERE NOT EXISTS (SELECT 1 FROM projects_hero);
