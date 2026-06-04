-- ============================================================================
-- Testimonies Page — Share Your Story block (editable)
-- Version: 009
-- Description: Extend testimonies_hero table with the bottom "Share Your Story"
--              block fields (title, description, button label — EN/RU/PL).
-- ============================================================================

ALTER TABLE testimonies_hero
    ADD COLUMN IF NOT EXISTS share_title_en        TEXT,
    ADD COLUMN IF NOT EXISTS share_title_ru        TEXT,
    ADD COLUMN IF NOT EXISTS share_title_pl        TEXT,

    ADD COLUMN IF NOT EXISTS share_description_en  TEXT,
    ADD COLUMN IF NOT EXISTS share_description_ru  TEXT,
    ADD COLUMN IF NOT EXISTS share_description_pl  TEXT,

    ADD COLUMN IF NOT EXISTS share_button_en       TEXT,
    ADD COLUMN IF NOT EXISTS share_button_ru       TEXT,
    ADD COLUMN IF NOT EXISTS share_button_pl       TEXT;

-- Seed defaults from translations only where NULL (idempotent — safe to re-run).
UPDATE testimonies_hero
SET
    share_title_en       = COALESCE(share_title_en, 'Share Your Story'),
    share_title_ru       = COALESCE(share_title_ru, 'Поделитесь своей историей'),
    share_title_pl       = COALESCE(share_title_pl, 'Podziel się swoją historią'),

    share_description_en = COALESCE(share_description_en, 'Has the Raphael Mission touched your life? We would love to hear your testimony and share it with others who need hope.'),
    share_description_ru = COALESCE(share_description_ru, 'Коснулась ли Миссия Raphael вашей жизни? Расскажите нам своё свидетельство — оно вдохновит тех, кому нужна надежда.'),
    share_description_pl = COALESCE(share_description_pl, 'Czy Misja Raphael dotknęła twojego życia? Chętnie poznamy twoje świadectwo i podzielimy się nim z tymi, którzy potrzebują nadziei.'),

    share_button_en      = COALESCE(share_button_en, 'Share Your Story'),
    share_button_ru      = COALESCE(share_button_ru, 'Поделиться историей'),
    share_button_pl      = COALESCE(share_button_pl, 'Podziel się historią');
