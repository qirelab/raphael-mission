-- ============================================================================
-- Cookie Policy Page — Editable Content
-- Version: 014
-- Description: Create cookie_policy table for editable content of the public
--              "/cookie-policy" page: hero (title + subtitle) + 4 sections
--              with titles and content, 3 cookie types (title + description)
--              inside section 2, and a contact block — EN/RU/PL.
-- ============================================================================

CREATE TABLE IF NOT EXISTS cookie_policy (
    id SERIAL PRIMARY KEY,

    -- Hero
    hero_title_en       TEXT,
    hero_title_ru       TEXT,
    hero_title_pl       TEXT,

    hero_subtitle_en    TEXT,
    hero_subtitle_ru    TEXT,
    hero_subtitle_pl    TEXT,

    -- Section 1
    section1_title_en   TEXT,
    section1_title_ru   TEXT,
    section1_title_pl   TEXT,
    section1_content_en TEXT,
    section1_content_ru TEXT,
    section1_content_pl TEXT,

    -- Section 2 (with 3 cookie types)
    section2_title_en   TEXT,
    section2_title_ru   TEXT,
    section2_title_pl   TEXT,
    section2_content_en TEXT,
    section2_content_ru TEXT,
    section2_content_pl TEXT,

    type1_title_en      TEXT,
    type1_title_ru      TEXT,
    type1_title_pl      TEXT,
    type1_desc_en       TEXT,
    type1_desc_ru       TEXT,
    type1_desc_pl       TEXT,

    type2_title_en      TEXT,
    type2_title_ru      TEXT,
    type2_title_pl      TEXT,
    type2_desc_en       TEXT,
    type2_desc_ru       TEXT,
    type2_desc_pl       TEXT,

    type3_title_en      TEXT,
    type3_title_ru      TEXT,
    type3_title_pl      TEXT,
    type3_desc_en       TEXT,
    type3_desc_ru       TEXT,
    type3_desc_pl       TEXT,

    -- Section 3
    section3_title_en   TEXT,
    section3_title_ru   TEXT,
    section3_title_pl   TEXT,
    section3_content_en TEXT,
    section3_content_ru TEXT,
    section3_content_pl TEXT,

    -- Section 4
    section4_title_en   TEXT,
    section4_title_ru   TEXT,
    section4_title_pl   TEXT,
    section4_content_en TEXT,
    section4_content_ru TEXT,
    section4_content_pl TEXT,

    -- Contact block
    contact_title_en    TEXT,
    contact_title_ru    TEXT,
    contact_title_pl    TEXT,
    contact_content_en  TEXT,
    contact_content_ru  TEXT,
    contact_content_pl  TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_cookie_policy_updated_at ON cookie_policy;
CREATE TRIGGER update_cookie_policy_updated_at
    BEFORE UPDATE ON cookie_policy
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO cookie_policy (
    hero_title_en, hero_title_ru, hero_title_pl,
    hero_subtitle_en, hero_subtitle_ru, hero_subtitle_pl,

    section1_title_en, section1_title_ru, section1_title_pl,
    section1_content_en, section1_content_ru, section1_content_pl,

    section2_title_en, section2_title_ru, section2_title_pl,
    section2_content_en, section2_content_ru, section2_content_pl,

    type1_title_en, type1_title_ru, type1_title_pl,
    type1_desc_en, type1_desc_ru, type1_desc_pl,

    type2_title_en, type2_title_ru, type2_title_pl,
    type2_desc_en, type2_desc_ru, type2_desc_pl,

    type3_title_en, type3_title_ru, type3_title_pl,
    type3_desc_en, type3_desc_ru, type3_desc_pl,

    section3_title_en, section3_title_ru, section3_title_pl,
    section3_content_en, section3_content_ru, section3_content_pl,

    section4_title_en, section4_title_ru, section4_title_pl,
    section4_content_en, section4_content_ru, section4_content_pl,

    contact_title_en, contact_title_ru, contact_title_pl,
    contact_content_en, contact_content_ru, contact_content_pl
)
SELECT
    'Cookie Policy', 'Политика использования файлов cookie', 'Polityka plików cookie',
    'Last updated: January 2026', 'Последнее обновление: январь 2026', 'Ostatnia aktualizacja: styczeń 2026',

    'What Are Cookies', 'Что такое файлы cookie', 'Czym są pliki cookie',
    'Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.',
    'Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта. Они помогают нам предоставлять вам лучший опыт, запоминая ваши предпочтения и понимая, как вы используете наш сайт.',
    'Pliki cookie to małe pliki tekstowe, które są zapisywane na Twoim urządzeniu podczas odwiedzania naszej strony. Pomagają nam zapewnić Ci lepsze doświadczenie, zapamiętując Twoje preferencje i rozumiejąc, jak korzystasz z naszej strony.',

    'Types of Cookies We Use', 'Типы используемых cookie', 'Rodzaje używanych plików cookie',
    'We use the following types of cookies:', 'Мы используем следующие типы файлов cookie:', 'Używamy następujących rodzajów plików cookie:',

    'Essential Cookies', 'Необходимые cookie', 'Niezbędne pliki cookie',
    'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
    'Эти файлы cookie необходимы для правильной работы сайта. Они обеспечивают основные функции, такие как безопасность, управление сетью и доступность.',
    'Te pliki cookie są niezbędne do prawidłowego działania strony. Umożliwiają podstawowe funkcje, takie jak bezpieczeństwo, zarządzanie siecią i dostępność.',

    'Analytics Cookies', 'Аналитические cookie', 'Analityczne pliki cookie',
    'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим сайтом, собирая и сообщая информацию анонимно.',
    'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną, zbierając i raportując informacje anonimowo.',

    'Preference Cookies', 'Предпочтительные cookie', 'Preferencyjne pliki cookie',
    'These cookies allow our website to remember choices you make (such as language preference) and provide enhanced, personalized features.',
    'Эти файлы cookie позволяют нашему сайту запоминать ваш выбор (например, языковые предпочтения) и предоставлять улучшенные персонализированные функции.',
    'Te pliki cookie pozwalają naszej stronie zapamiętywać Twoje wybory (takie jak preferencje językowe) i zapewniać ulepszone, spersonalizowane funkcje.',

    'Managing Cookies', 'Управление файлами cookie', 'Zarządzanie plikami cookie',
    'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.',
    'Вы можете контролировать и/или удалять файлы cookie по своему желанию. Вы можете удалить все файлы cookie, которые уже находятся на вашем компьютере, и настроить большинство браузеров на предотвращение их размещения. Однако, если вы сделаете это, вам, возможно, придётся вручную настраивать некоторые предпочтения каждый раз при посещении нашего сайта.',
    'Możesz kontrolować i/lub usuwać pliki cookie według własnego uznania. Możesz usunąć wszystkie pliki cookie, które już znajdują się na Twoim komputerze i możesz ustawić większość przeglądarek, aby zapobiegały ich umieszczaniu. Jeśli jednak to zrobisz, może być konieczne ręczne dostosowanie niektórych preferencji za każdym razem, gdy odwiedzasz naszą stronę.',

    'Third-Party Cookies', 'Сторонние cookie', 'Pliki cookie stron trzecich',
    'We may use third-party services such as Google Analytics that also use cookies. These services have their own privacy policies, and we have no control over their cookies.',
    'Мы можем использовать сторонние сервисы, такие как Google Analytics, которые также используют файлы cookie. У этих сервисов есть свои политики конфиденциальности, и мы не контролируем их файлы cookie.',
    'Możemy korzystać z usług stron trzecich, takich jak Google Analytics, które również używają plików cookie. Te usługi mają własne polityki prywatności i nie mamy kontroli nad ich plikami cookie.',

    'Questions About Cookies', 'Вопросы о файлах cookie', 'Pytania o pliki cookie',
    'If you have any questions about our use of cookies, please contact us at:',
    'Если у вас есть вопросы об использовании нами файлов cookie, свяжитесь с нами:',
    'Jeśli masz pytania dotyczące naszego używania plików cookie, skontaktuj się z nami:'
WHERE NOT EXISTS (SELECT 1 FROM cookie_policy);
