-- ============================================================================
-- Home Page — Editable Static Content
-- Version: 014
-- Description: Create home_page table for editable content of the public
--              landing page "/" — Hero block (logo + title + highlight +
--              description + 2 buttons), Mission section (title + description +
--              3 cards), Current Projects header, Support Our Mission header,
--              Testimonies header, Contact section (title + description +
--              labels + form title + 5 placeholders).
--              All multilingual fields have EN/RU/PL variants.
-- ============================================================================

CREATE TABLE IF NOT EXISTS home_page (
    id SERIAL PRIMARY KEY,

    -- ===== HERO =====
    hero_title_en           TEXT,
    hero_title_ru           TEXT,
    hero_title_pl           TEXT,

    hero_title_highlight_en TEXT,
    hero_title_highlight_ru TEXT,
    hero_title_highlight_pl TEXT,

    hero_description_en     TEXT,
    hero_description_ru     TEXT,
    hero_description_pl     TEXT,

    hero_btn_support_en     TEXT,
    hero_btn_support_ru     TEXT,
    hero_btn_support_pl     TEXT,

    hero_btn_learn_more_en  TEXT,
    hero_btn_learn_more_ru  TEXT,
    hero_btn_learn_more_pl  TEXT,

    logo_url                TEXT,

    -- ===== MISSION (Our Goals) =====
    mission_title_en        TEXT,
    mission_title_ru        TEXT,
    mission_title_pl        TEXT,

    mission_description_en  TEXT,
    mission_description_ru  TEXT,
    mission_description_pl  TEXT,

    card1_title_en          TEXT,
    card1_title_ru          TEXT,
    card1_title_pl          TEXT,
    card1_desc_en           TEXT,
    card1_desc_ru           TEXT,
    card1_desc_pl           TEXT,

    card2_title_en          TEXT,
    card2_title_ru          TEXT,
    card2_title_pl          TEXT,
    card2_desc_en           TEXT,
    card2_desc_ru           TEXT,
    card2_desc_pl           TEXT,

    card3_title_en          TEXT,
    card3_title_ru          TEXT,
    card3_title_pl          TEXT,
    card3_desc_en           TEXT,
    card3_desc_ru           TEXT,
    card3_desc_pl           TEXT,

    -- ===== CURRENT PROJECTS (header only) =====
    projects_title_en       TEXT,
    projects_title_ru       TEXT,
    projects_title_pl       TEXT,
    projects_description_en TEXT,
    projects_description_ru TEXT,
    projects_description_pl TEXT,

    -- ===== SUPPORT OUR MISSION (header only) =====
    support_title_en        TEXT,
    support_title_ru        TEXT,
    support_title_pl        TEXT,
    support_description_en  TEXT,
    support_description_ru  TEXT,
    support_description_pl  TEXT,

    -- ===== TESTIMONIES (header only) =====
    testimonies_title_en       TEXT,
    testimonies_title_ru       TEXT,
    testimonies_title_pl       TEXT,
    testimonies_description_en TEXT,
    testimonies_description_ru TEXT,
    testimonies_description_pl TEXT,

    -- ===== CONTACT =====
    contact_title_en        TEXT,
    contact_title_ru        TEXT,
    contact_title_pl        TEXT,
    contact_description_en  TEXT,
    contact_description_ru  TEXT,
    contact_description_pl  TEXT,

    label_address_en        TEXT,
    label_address_ru        TEXT,
    label_address_pl        TEXT,
    label_phone_en          TEXT,
    label_phone_ru          TEXT,
    label_phone_pl          TEXT,
    label_email_en          TEXT,
    label_email_ru          TEXT,
    label_email_pl          TEXT,

    form_title_en           TEXT,
    form_title_ru           TEXT,
    form_title_pl           TEXT,

    ph_first_name_en        TEXT,
    ph_first_name_ru        TEXT,
    ph_first_name_pl        TEXT,
    ph_last_name_en         TEXT,
    ph_last_name_ru         TEXT,
    ph_last_name_pl         TEXT,
    ph_email_en             TEXT,
    ph_email_ru             TEXT,
    ph_email_pl             TEXT,
    ph_subject_en           TEXT,
    ph_subject_ru           TEXT,
    ph_subject_pl           TEXT,
    ph_message_en           TEXT,
    ph_message_ru           TEXT,
    ph_message_pl           TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_home_page_updated_at ON home_page;
CREATE TRIGGER update_home_page_updated_at
    BEFORE UPDATE ON home_page
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from current i18n translations, only if table is empty.
INSERT INTO home_page (
    hero_title_en, hero_title_ru, hero_title_pl,
    hero_title_highlight_en, hero_title_highlight_ru, hero_title_highlight_pl,
    hero_description_en, hero_description_ru, hero_description_pl,
    hero_btn_support_en, hero_btn_support_ru, hero_btn_support_pl,
    hero_btn_learn_more_en, hero_btn_learn_more_ru, hero_btn_learn_more_pl,
    logo_url,

    mission_title_en, mission_title_ru, mission_title_pl,
    mission_description_en, mission_description_ru, mission_description_pl,

    card1_title_en, card1_title_ru, card1_title_pl,
    card1_desc_en, card1_desc_ru, card1_desc_pl,
    card2_title_en, card2_title_ru, card2_title_pl,
    card2_desc_en, card2_desc_ru, card2_desc_pl,
    card3_title_en, card3_title_ru, card3_title_pl,
    card3_desc_en, card3_desc_ru, card3_desc_pl,

    projects_title_en, projects_title_ru, projects_title_pl,
    projects_description_en, projects_description_ru, projects_description_pl,

    support_title_en, support_title_ru, support_title_pl,
    support_description_en, support_description_ru, support_description_pl,

    testimonies_title_en, testimonies_title_ru, testimonies_title_pl,
    testimonies_description_en, testimonies_description_ru, testimonies_description_pl,

    contact_title_en, contact_title_ru, contact_title_pl,
    contact_description_en, contact_description_ru, contact_description_pl,
    label_address_en, label_address_ru, label_address_pl,
    label_phone_en, label_phone_ru, label_phone_pl,
    label_email_en, label_email_ru, label_email_pl,
    form_title_en, form_title_ru, form_title_pl,
    ph_first_name_en, ph_first_name_ru, ph_first_name_pl,
    ph_last_name_en, ph_last_name_ru, ph_last_name_pl,
    ph_email_en, ph_email_ru, ph_email_pl,
    ph_subject_en, ph_subject_ru, ph_subject_pl,
    ph_message_en, ph_message_ru, ph_message_pl
)
SELECT
    'Our mission is to preach the', 'Наша миссия — нести', 'Naszą misją jest głoszenie',
    'Gospel', 'Евангелие', 'Ewangelii',
    'We believe that the Gospel is the power of God that saves, heals, and gives true freedom to every person and to entire nations.',
    'Мы верим, что Евангелие — это сила Божья, которая спасает, исцеляет и дарует подлинную свободу каждому человеку и целым народам.',
    'Wierzymy, że Ewangelia jest mocą Bożą, która zbawia, uzdrawia i daje prawdziwą wolność każdemu człowiekowi oraz całym narodom.',
    'Support Our Mission', 'Поддержать нашу миссию', 'Wesprzyj naszą misję',
    'Learn More', 'Узнать больше', 'Dowiedz się więcej',
    '/images/img_logo_2.png',

    'Our Goals', 'Наши Цели', 'Nasze Cele',
    'Our goal is to lead people to Jesus.',
    'Наша цель — приводить людей к Иисусу.',
    'Naszym celem jest prowadzić ludzi do Jezusa.',

    'A close relationship with God', 'Близкие отношения с Богом', 'Bliska relacja z Bogiem',
    'To live in constant closeness with God and pass on to others this desire to be near Him.',
    'Быть в постоянной близости с Богом и передавать другим эту жажду быть рядом с Ним.',
    'Być w stałej bliskości z Bogiem i przekazywać innym to pragnienie, by być blisko Niego.',

    'Preach the Gospel', 'Проповедовать Евангелие', 'Głosić Ewangelię',
    'Reach people''s hearts with the Word of the Gospel, God''s love and power, bringing healing, freedom, and restoration.',
    'Достигать сердец людей Словом Евангелия, Божьей любовью и силой, принося исцеление, свободу и восстановление.',
    'Docierać do serc ludzi Słowem Ewangelii, Bożą miłością i mocą, przynosząc uzdrowienie, wolność i odnowę.',

    'Practical help', 'Практическая помощь', 'Praktyczna pomoc',
    'Through practical actions, respond to people''s needs, struggles, and pain.',
    'Через конкретные дела отвечать на нужды, потребности и боль людей.',
    'Przez konkretne działania odpowiadać na potrzeby, pragnienia i ból ludzi.',

    'Our Projects', 'Наши проекты', 'Nasze projekty',
    'We share the Gospel by responding to people''s needs through various outreach initiatives and events.',
    'Мы распространяем Евангелие, реагируя на нужды людей через различные инициативы и мероприятия.',
    'Rozpowszechniamy Ewangelię, reagując na potrzeby ludzi poprzez różne inicjatywy i wydarzenia.',

    'Support Our Mission', 'Поддержите нашу миссию', 'Wesprzyj naszą misję',
    'Your donation helps us spread the Gospel even further and respond to people''s needs.',
    'Ваше пожертвование помогает нам распространять Евангелие ещё больше и отвечать на нужды людей.',
    'Twoje wsparcie finansowe pomaga nam szerzej głosić Ewangelię i odpowiadać na potrzeby ludzi.',

    'Testimonies', 'Свидетельства', 'Świadectwa',
    'Real stories of people who experienced God''s touch, love, renewal, healing, and freedom thanks to Jesus through the Mission''s ministry.',
    'Реальные истории людей, которые пережили Божье прикосновение, любовь, обновление, исцеление и свободу благодаря Иисусу через служение Миссии.',
    'Prawdziwe historie ludzi, którzy doświadczyli Bożego dotknięcia, miłości, odnowienia, uzdrowienia i wolności dzięki Jezusowi poprzez służbę Misji.',

    'Contact Us', 'Свяжитесь с нами', 'Skontaktuj się z nami',
    'We''ll be happy to hear from you. Write to us to learn more about the Mission or to join the ministry.',
    'Мы будем рады вашему сообщению. Напишите нам, чтобы узнать больше о Миссии или присоединиться к служению.',
    'Będzie nam miło otrzymać Twoją wiadomość. Napisz do nas, aby dowiedzieć się więcej o Misji lub dołączyć do służby.',
    'Address', 'Адрес', 'Adres',
    'Phone', 'Телефон', 'Telefon',
    'Email', 'Эл. почта', 'E-mail',
    'Send Message', 'Отправить сообщение', 'Wyślij wiadomość',
    'First Name', 'Имя', 'Imię',
    'Last Name', 'Фамилия', 'Nazwisko',
    'Email Address', 'Электронная почта', 'Adres e-mail',
    'Subject', 'Тема', 'Temat',
    'Your Message', 'Ваше сообщение', 'Twoja wiadomość'
WHERE NOT EXISTS (SELECT 1 FROM home_page);
