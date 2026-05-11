-- ============================================================================
-- Privacy Policy Page — Editable Content
-- Version: 012
-- Description: Create privacy_policy table for editable content of the public
--              "/privacy-policy" page: hero (title + subtitle) + 6 sections
--              with titles and content, 4 list items in section 2, and a
--              contact block — EN/RU/PL.
-- ============================================================================

CREATE TABLE IF NOT EXISTS privacy_policy (
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

    -- Section 2 (with bullet list)
    section2_title_en   TEXT,
    section2_title_ru   TEXT,
    section2_title_pl   TEXT,
    section2_content_en TEXT,
    section2_content_ru TEXT,
    section2_content_pl TEXT,
    section2_item1_en   TEXT,
    section2_item1_ru   TEXT,
    section2_item1_pl   TEXT,
    section2_item2_en   TEXT,
    section2_item2_ru   TEXT,
    section2_item2_pl   TEXT,
    section2_item3_en   TEXT,
    section2_item3_ru   TEXT,
    section2_item3_pl   TEXT,
    section2_item4_en   TEXT,
    section2_item4_ru   TEXT,
    section2_item4_pl   TEXT,

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

DROP TRIGGER IF EXISTS update_privacy_policy_updated_at ON privacy_policy;
CREATE TRIGGER update_privacy_policy_updated_at
    BEFORE UPDATE ON privacy_policy
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO privacy_policy (
    hero_title_en, hero_title_ru, hero_title_pl,
    hero_subtitle_en, hero_subtitle_ru, hero_subtitle_pl,

    section1_title_en, section1_title_ru, section1_title_pl,
    section1_content_en, section1_content_ru, section1_content_pl,

    section2_title_en, section2_title_ru, section2_title_pl,
    section2_content_en, section2_content_ru, section2_content_pl,
    section2_item1_en, section2_item1_ru, section2_item1_pl,
    section2_item2_en, section2_item2_ru, section2_item2_pl,
    section2_item3_en, section2_item3_ru, section2_item3_pl,
    section2_item4_en, section2_item4_ru, section2_item4_pl,

    section3_title_en, section3_title_ru, section3_title_pl,
    section3_content_en, section3_content_ru, section3_content_pl,

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
    'Privacy Policy', 'Политика конфиденциальности', 'Polityka prywatności',
    'Last updated: January 2026', 'Последнее обновление: январь 2026', 'Ostatnia aktualizacja: styczeń 2026',

    '1. Information We Collect', '1. Информация, которую мы собираем', '1. Informacje, które zbieramy',
    'At Raphael Mission, we collect information you provide directly to us when you donate, volunteer, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, mailing address, and payment information.',
    'В Миссии Raphael мы собираем информацию, которую вы предоставляете нам напрямую, когда жертвуете, становитесь волонтёром, подписываетесь на нашу рассылку или связываетесь с нами. Это может включать ваше имя, адрес электронной почты, номер телефона, почтовый адрес и платёжную информацию.',
    'W Misji Raphael zbieramy informacje, które nam bezpośrednio przekazujesz, gdy dokonujesz darowizny, stajesz się wolontariuszem, zapisujesz się do naszego newslettera lub kontaktujesz się z nami. Może to obejmować Twoje imię i nazwisko, adres e-mail, numer telefonu, adres pocztowy i informacje płatnicze.',

    '2. How We Use Your Information', '2. Как мы используем вашу информацию', '2. Jak wykorzystujemy Twoje informacje',
    'We use the information we collect to:', 'Мы используем собранную информацию для:', 'Wykorzystujemy zebrane informacje do:',
    'Process your donations and send receipts', 'Обработки ваших пожертвований и отправки квитанций', 'Przetwarzania Twoich darowizn i wysyłania potwierdzeń',
    'Communicate with you about our mission and programs', 'Общения с вами о нашей миссии и программах', 'Komunikacji z Tobą o naszej misji i programach',
    'Send newsletters and updates (with your consent)', 'Отправки новостных рассылок и обновлений (с вашего согласия)', 'Wysyłania newsletterów i aktualizacji (za Twoją zgodą)',
    'Improve our website and services', 'Улучшения нашего веб-сайта и услуг', 'Ulepszania naszej strony internetowej i usług',

    '3. Information Sharing', '3. Обмен информацией', '3. Udostępnianie informacji',
    'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our mission, as long as they agree to keep this information confidential.',
    'Мы не продаём, не обмениваем и не сдаём в аренду вашу личную информацию третьим лицам. Мы можем делиться информацией с доверенными поставщиками услуг, которые помогают нам в работе нашего сайта и реализации нашей миссии, при условии, что они соглашаются сохранять эту информацию конфиденциальной.',
    'Nie sprzedajemy, nie wymieniamy ani nie wynajmujemy Twoich danych osobowych stronom trzecim. Możemy udostępniać informacje zaufanym dostawcom usług, którzy pomagają nam w prowadzeniu naszej strony internetowej i realizacji naszej misji, pod warunkiem że zgadzają się zachować te informacje w tajemnicy.',

    '4. Data Security', '4. Безопасность данных', '4. Bezpieczeństwo danych',
    'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment information is encrypted and processed through secure payment gateways.',
    'Мы применяем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Вся платёжная информация шифруется и обрабатывается через защищённые платёжные шлюзы.',
    'Wdrażamy odpowiednie środki bezpieczeństwa w celu ochrony Twoich danych osobowych przed nieautoryzowanym dostępem, zmianą, ujawnieniem lub zniszczeniem. Wszystkie informacje płatnicze są szyfrowane i przetwarzane przez bezpieczne bramy płatnicze.',

    '5. Your Rights', '5. Ваши права', '5. Twoje prawa',
    'You have the right to access, correct, or delete your personal information at any time. You may also opt-out of receiving promotional communications from us by following the unsubscribe instructions in our emails.',
    'Вы имеете право получить доступ, исправить или удалить свою личную информацию в любое время. Вы также можете отказаться от получения рекламных сообщений от нас, следуя инструкциям по отписке в наших письмах.',
    'Masz prawo dostępu, poprawiania lub usuwania swoich danych osobowych w dowolnym momencie. Możesz także zrezygnować z otrzymywania od nas komunikatów promocyjnych, postępując zgodnie z instrukcjami rezygnacji z subskrypcji w naszych e-mailach.',

    '6. Changes to This Policy', '6. Изменения в этой политике', '6. Zmiany w tej polityce',
    'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
    'Мы можем время от времени обновлять эту политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую политику на этой странице и обновив дату "Последнее обновление".',
    'Możemy od czasu do czasu aktualizować tę politykę prywatności. Powiadomimy Cię o wszelkich zmianach, publikując nową politykę na tej stronie i aktualizując datę "Ostatnia aktualizacja".',

    'Contact Us', 'Свяжитесь с нами', 'Skontaktuj się z nami',
    'If you have any questions about this Privacy Policy, please contact us at:',
    'Если у вас есть вопросы об этой Политике конфиденциальности, свяжитесь с нами:',
    'Jeśli masz pytania dotyczące tej Polityki prywatności, skontaktuj się z nami:'
WHERE NOT EXISTS (SELECT 1 FROM privacy_policy);
