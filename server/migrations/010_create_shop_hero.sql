-- ============================================================================
-- Shop Page Hero — Editable Content
-- Version: 010
-- Description: Create shop_hero table for the editable Hero block of the
--              public "Магазин" page (title + description, EN/RU/PL).
-- ============================================================================

CREATE TABLE IF NOT EXISTS shop_hero (
    id SERIAL PRIMARY KEY,

    -- Page title
    title_en        TEXT,
    title_ru        TEXT,
    title_pl        TEXT,

    -- Page description (subheading)
    description_en  TEXT,
    description_ru  TEXT,
    description_pl  TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_shop_hero_updated_at ON shop_hero;
CREATE TRIGGER update_shop_hero_updated_at
    BEFORE UPDATE ON shop_hero
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO shop_hero (
    title_en, title_ru, title_pl,
    description_en, description_ru, description_pl
)
SELECT
    'Support Our Mission Through Your Purchase',
    'Поддержите нашу миссию через покупку',
    'Wesprzyj naszą misję poprzez zakup',

    'This shop features original handmade paintings by the artist Katryn Feli—an evangelist and missionary, and one of the founders of Raphael Mission. By purchasing a painting, you support the mission and help us spread the Gospel even further and respond to people''s needs. To purchase, please write to us.',
    'В этом магазине представлены авторские картины ручной работы художницы Katryn Feli — евангелиста и миссионера, одной из основателей миссии Raphael. Приобретая картину, вы поддерживаете миссию и помогаете нам распространять Евангелие ещё больше и отвечать на нужды людей. Для приобретения напишите нам.',
    'W tym sklepie prezentowane są autorskie, ręcznie malowane obrazy artystki Katryn Feli — ewangelistki i misjonarki, jednej z założycielek misji Raphael. Kupując obraz, wspierasz misję i pomagasz nam jeszcze szerzej głosić Ewangelię oraz odpowiadać na potrzeby ludzi. Aby dokonać zakupu, napisz do nas.'
WHERE NOT EXISTS (SELECT 1 FROM shop_hero);
