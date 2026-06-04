-- ============================================================================
-- Projects Page CTA — Editable Content
-- Version: 007
-- Description: Extend projects_hero table with CTA block fields
--              (Call-to-Action: title, description, 2 button labels — EN/RU/PL).
-- ============================================================================

ALTER TABLE projects_hero
    ADD COLUMN IF NOT EXISTS cta_title_en          TEXT,
    ADD COLUMN IF NOT EXISTS cta_title_ru          TEXT,
    ADD COLUMN IF NOT EXISTS cta_title_pl          TEXT,

    ADD COLUMN IF NOT EXISTS cta_description_en    TEXT,
    ADD COLUMN IF NOT EXISTS cta_description_ru    TEXT,
    ADD COLUMN IF NOT EXISTS cta_description_pl    TEXT,

    ADD COLUMN IF NOT EXISTS cta_get_involved_en   TEXT,
    ADD COLUMN IF NOT EXISTS cta_get_involved_ru   TEXT,
    ADD COLUMN IF NOT EXISTS cta_get_involved_pl   TEXT,

    ADD COLUMN IF NOT EXISTS cta_donate_now_en     TEXT,
    ADD COLUMN IF NOT EXISTS cta_donate_now_ru     TEXT,
    ADD COLUMN IF NOT EXISTS cta_donate_now_pl     TEXT;

-- Seed CTA defaults from translations only for the existing row, and only if
-- the corresponding column is still NULL (idempotent — safe to re-run).
UPDATE projects_hero
SET
    cta_title_en        = COALESCE(cta_title_en, 'Join Us in Making a Difference'),
    cta_title_ru        = COALESCE(cta_title_ru, 'Присоединяйтесь к нам в изменении мира'),
    cta_title_pl        = COALESCE(cta_title_pl, 'Dołącz do nas w czynieniu różnicy'),

    cta_description_en  = COALESCE(cta_description_en, 'Your support and participation can help us reach more communities and transform more lives. Together, we can spread hope and compassion to those who need it most.'),
    cta_description_ru  = COALESCE(cta_description_ru, 'Ваша поддержка и участие помогают нам охватывать больше сообществ и преобразовывать больше жизней. Вместе мы несём надежду и сострадание тем, кто особенно нуждается.'),
    cta_description_pl  = COALESCE(cta_description_pl, 'Twoje wsparcie i uczestnictwo pomagają nam dotrzeć do większej liczby społeczności i zmieniać więcej żyć. Razem nieśmy nadzieję i współczucie tym, którzy najbardziej tego potrzebują.'),

    cta_get_involved_en = COALESCE(cta_get_involved_en, 'Get Involved'),
    cta_get_involved_ru = COALESCE(cta_get_involved_ru, 'Принять участие'),
    cta_get_involved_pl = COALESCE(cta_get_involved_pl, 'Zaangażuj się'),

    cta_donate_now_en   = COALESCE(cta_donate_now_en, 'Donate Now'),
    cta_donate_now_ru   = COALESCE(cta_donate_now_ru, 'Пожертвовать сейчас'),
    cta_donate_now_pl   = COALESCE(cta_donate_now_pl, 'Przekaż teraz');
