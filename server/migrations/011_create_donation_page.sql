-- ============================================================================
-- Donation Page — Editable Content
-- Version: 011
-- Description: Create donation_page table for editable content of the public
--              "Пожертвование" page (title, description, back button label,
--              image — EN/RU/PL).
-- ============================================================================

CREATE TABLE IF NOT EXISTS donation_page (
    id SERIAL PRIMARY KEY,

    -- Page title
    title_en          TEXT,
    title_ru          TEXT,
    title_pl          TEXT,

    -- Page description (under the title)
    description_en    TEXT,
    description_ru    TEXT,
    description_pl    TEXT,

    -- Hero image
    image_url         TEXT,

    -- "Back to donation details" button label
    back_button_en    TEXT,
    back_button_ru    TEXT,
    back_button_pl    TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_donation_page_updated_at ON donation_page;
CREATE TRIGGER update_donation_page_updated_at
    BEFORE UPDATE ON donation_page
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO donation_page (
    title_en, title_ru, title_pl,
    description_en, description_ru, description_pl,
    image_url,
    back_button_en, back_button_ru, back_button_pl
)
SELECT
    'Advance the Mission Through Your Gift',
    'Продвигайте миссию через ваш дар',
    'Wspieraj misję poprzez swój dar',

    '100% of your donation goes directly to humanitarian aid, healthcare, and faith-based outreach.',
    '100% вашего пожертвования идет непосредственно на гуманитарную помощь, здравоохранение и религиозную деятельность.',
    '100% twojej darowizny trafia bezpośrednio na pomoc humanitarną, opiekę zdrowotną i działalność religijną.',

    '/images/money.jpg',

    'Back to donation details',
    'Вернуться к деталям пожертвования',
    'Powrót do szczegółów darowizny'
WHERE NOT EXISTS (SELECT 1 FROM donation_page);
