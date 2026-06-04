-- ============================================================================
-- Terms of Service Page — Editable Content
-- Version: 014
-- Description: Create terms_of_service table for editable content of the public
--              "/terms-of-service" page: hero (title + subtitle) + 6 sections
--              with titles and content, 3 list items in section 3, and a
--              contact block — EN/RU/PL.
-- ============================================================================

CREATE TABLE IF NOT EXISTS terms_of_service (
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

    -- Section 2
    section2_title_en   TEXT,
    section2_title_ru   TEXT,
    section2_title_pl   TEXT,
    section2_content_en TEXT,
    section2_content_ru TEXT,
    section2_content_pl TEXT,

    -- Section 3 (with bullet list — 3 items)
    section3_title_en   TEXT,
    section3_title_ru   TEXT,
    section3_title_pl   TEXT,
    section3_content_en TEXT,
    section3_content_ru TEXT,
    section3_content_pl TEXT,
    section3_item1_en   TEXT,
    section3_item1_ru   TEXT,
    section3_item1_pl   TEXT,
    section3_item2_en   TEXT,
    section3_item2_ru   TEXT,
    section3_item2_pl   TEXT,
    section3_item3_en   TEXT,
    section3_item3_ru   TEXT,
    section3_item3_pl   TEXT,

    -- Section 4
    section4_title_en   TEXT,
    section4_title_ru   TEXT,
    section4_title_pl   TEXT,
    section4_content_en TEXT,
    section4_content_ru TEXT,
    section4_content_pl TEXT,

    -- Section 5
    section5_title_en   TEXT,
    section5_title_ru   TEXT,
    section5_title_pl   TEXT,
    section5_content_en TEXT,
    section5_content_ru TEXT,
    section5_content_pl TEXT,

    -- Section 6
    section6_title_en   TEXT,
    section6_title_ru   TEXT,
    section6_title_pl   TEXT,
    section6_content_en TEXT,
    section6_content_ru TEXT,
    section6_content_pl TEXT,

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

DROP TRIGGER IF EXISTS update_terms_of_service_updated_at ON terms_of_service;
CREATE TRIGGER update_terms_of_service_updated_at
    BEFORE UPDATE ON terms_of_service
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO terms_of_service (
    hero_title_en, hero_title_ru, hero_title_pl,
    hero_subtitle_en, hero_subtitle_ru, hero_subtitle_pl,

    section1_title_en, section1_title_ru, section1_title_pl,
    section1_content_en, section1_content_ru, section1_content_pl,

    section2_title_en, section2_title_ru, section2_title_pl,
    section2_content_en, section2_content_ru, section2_content_pl,

    section3_title_en, section3_title_ru, section3_title_pl,
    section3_content_en, section3_content_ru, section3_content_pl,
    section3_item1_en, section3_item1_ru, section3_item1_pl,
    section3_item2_en, section3_item2_ru, section3_item2_pl,
    section3_item3_en, section3_item3_ru, section3_item3_pl,

    section4_title_en, section4_title_ru, section4_title_pl,
    section4_content_en, section4_content_ru, section4_content_pl,

    section5_title_en, section5_title_ru, section5_title_pl,
    section5_content_en, section5_content_ru, section5_content_pl,

    section6_title_en, section6_title_ru, section6_title_pl,
    section6_content_en, section6_content_ru, section6_content_pl,

    contact_title_en, contact_title_ru, contact_title_pl,
    contact_content_en, contact_content_ru, contact_content_pl
)
SELECT
    'Terms of Service', 'Условия использования', 'Warunki usługi',
    'Last updated: January 2026', 'Последнее обновление: январь 2026', 'Ostatnia aktualizacja: styczeń 2026',

    '1. Acceptance of Terms', '1. Принятие условий', '1. Akceptacja warunków',
    'By accessing and using the Raphael Mission website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.',
    'Получая доступ и используя веб-сайт Миссии Raphael, вы принимаете и соглашаетесь соблюдать эти Условия использования. Если вы не согласны с этими условиями, пожалуйста, не используйте наш сайт.',
    'Uzyskując dostęp i korzystając ze strony internetowej Misji Raphael, akceptujesz i zgadzasz się przestrzegać niniejszych Warunków usługi. Jeśli nie zgadzasz się z tymi warunkami, prosimy nie korzystać z naszej strony.',

    '2. Use of Website', '2. Использование сайта', '2. Korzystanie ze strony',
    'You may use our website for lawful purposes only. You agree not to use the website in any way that could damage, disable, overburden, or impair our servers or networks, or interfere with any other party''s use of the website.',
    'Вы можете использовать наш сайт только в законных целях. Вы соглашаетесь не использовать сайт способом, который может повредить, отключить, перегрузить или нарушить работу наших серверов или сетей, или помешать использованию сайта другими лицами.',
    'Możesz korzystać z naszej strony wyłącznie w celach zgodnych z prawem. Zgadzasz się nie używać strony w sposób, który mógłby uszkodzić, wyłączyć, przeciążyć lub zakłócić nasze serwery lub sieci, lub zakłócić korzystanie ze strony przez inne osoby.',

    '3. Donations', '3. Пожертвования', '3. Darowizny',
    'All donations are voluntary and non-refundable except as required by law. By making a donation, you represent that:',
    'Все пожертвования являются добровольными и невозвратными, за исключением случаев, предусмотренных законом. Делая пожертвование, вы подтверждаете, что:',
    'Wszystkie darowizny są dobrowolne i bezzwrotne, z wyjątkiem przypadków wymaganych przez prawo. Dokonując darowizny, oświadczasz, że:',
    'You are authorized to use the payment method provided',
    'Вы уполномочены использовать предоставленный способ оплаты',
    'Jesteś upoważniony do korzystania z podanej metody płatności',
    'The donation is being made with your own funds',
    'Пожертвование делается из ваших собственных средств',
    'Darowizna jest dokonywana z Twoich własnych środków',
    'You understand that donations support our charitable mission',
    'Вы понимаете, что пожертвования поддерживают нашу благотворительную миссию',
    'Rozumiesz, że darowizny wspierają naszą misję charytatywną',

    '4. Intellectual Property', '4. Интеллектуальная собственность', '4. Własność intelektualna',
    'All content on this website, including text, graphics, logos, images, and software, is the property of Raphael Mission and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.',
    'Весь контент на этом сайте, включая текст, графику, логотипы, изображения и программное обеспечение, является собственностью Миссии Raphael и защищён авторским правом и другими законами об интеллектуальной собственности. Вы не можете воспроизводить, распространять или создавать производные работы без нашего письменного разрешения.',
    'Cała zawartość tej strony, w tym tekst, grafika, logo, obrazy i oprogramowanie, jest własnością Misji Raphael i chroniona prawami autorskimi oraz innymi prawami własności intelektualnej. Nie możesz powielać, rozpowszechniać ani tworzyć dzieł pochodnych bez naszej pisemnej zgody.',

    '5. Limitation of Liability', '5. Ограничение ответственности', '5. Ograniczenie odpowiedzialności',
    'Raphael Mission shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website, even if we have been advised of the possibility of such damages.',
    'Миссия Raphael не несёт ответственности за любые косвенные, случайные, особые, последующие или штрафные убытки, возникшие в результате вашего использования или невозможности использования сайта, даже если нас уведомили о возможности таких убытков.',
    'Misja Raphael nie ponosi odpowiedzialności za jakiekolwiek szkody pośrednie, przypadkowe, szczególne, wynikowe lub karne wynikające z korzystania lub niemożności korzystania ze strony, nawet jeśli zostaliśmy poinformowani o możliwości takich szkód.',

    '6. Changes to Terms', '6. Изменения условий', '6. Zmiany warunków',
    'We reserve the right to modify these Terms of Service at any time. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.',
    'Мы оставляем за собой право изменять эти Условия использования в любое время. Ваше продолжение использования сайта после публикации изменений означает ваше принятие изменённых условий.',
    'Zastrzegamy sobie prawo do modyfikacji niniejszych Warunków usługi w dowolnym momencie. Twoje dalsze korzystanie ze strony po opublikowaniu zmian oznacza akceptację zmienionych warunków.',

    'Questions', 'Вопросы', 'Pytania',
    'If you have any questions about these Terms of Service, please contact us at:',
    'Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами:',
    'Jeśli masz pytania dotyczące niniejszych Warunków usługi, skontaktuj się z nami:'
WHERE NOT EXISTS (SELECT 1 FROM terms_of_service);
