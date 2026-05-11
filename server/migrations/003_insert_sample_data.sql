-- ============================================================================
-- Sample Data for Local Development
-- Version: 003
-- Date: 2024-02-25
-- Description: Realistic test data for Raphael Mission
-- ============================================================================

-- ============================================================================
-- 1. CLEAR EXISTING DATA (optional - remove if you want to keep existing)
-- ============================================================================

TRUNCATE TABLE login_attempts CASCADE;
TRUNCATE TABLE user_sessions CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE shop_products CASCADE;
TRUNCATE TABLE testimonies CASCADE;
TRUNCATE TABLE training CASCADE;
TRUNCATE TABLE contact CASCADE;

-- ============================================================================
-- 2. USERS
-- ============================================================================

-- Admin user (password: Raphael$2026!Secure#Admin*Pass)
INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
    'admin@raphael.com',
    '$2a$12$72QBkIxacLfaKtz9uS673.No8MNv6uB1reuiMizf8.77V/N3UMZtm',
    'Администратор',
    'admin',
    true
);

-- Regular user (password: User123!)
INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
    'user@raphael.com',
    '$2a$12$s4VCpreQt/4GbeD9n7CWaeuNsBdOqJCbovTPNi5f5l.67E1OIKOme',
    'Обычный пользователь',
    'user',
    true
);

-- ============================================================================
-- 3. PROJECTS
-- ============================================================================

INSERT INTO projects (title_en, title_ru, description_en, description_ru, slug, image_url, is_active, order_index)
VALUES
    (
        'Mission to Africa',
        'Миссия в Африку',
        'Supporting communities in Kenya and Uganda with clean water projects, education programs, and spiritual guidance. Our teams work directly with local churches to bring hope and practical help.',
        'Поддержка общин в Кении и Уганде проектами чистой воды, образовательными программами и духовным наставничеством. Наши команды работают напрямую с местными церквями, чтобы принести надежду и практическую помощь.',
        'mission-africa',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        true,
        1
    ),
    (
        'Children Education Center',
        'Центр образования детей',
        'A comprehensive education program for underprivileged children in Eastern Europe. We provide free tutoring, meals, and Christian values education for over 200 children annually.',
        'Комплексная образовательная программа для малообеспеченных детей в Восточной Европе. Мы предоставляем бесплатное обучение, питание и образование христианских ценностей для более 200 детей ежегодно.',
        'children-education',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        true,
        2
    ),
    (
        'Medical Mission',
        'Медицинская миссия',
        'Free medical care and mobile clinics serving remote villages. Our trained medical professionals provide basic healthcare, vaccinations, and health education while sharing the Gospel.',
        'Бесплатная медицинская помощь и мобильные клиники, обслуживающие отдалённые деревни. Наши обученные медицинские специалисты предоставляют базовое здравоохранение, вакцинацию и обучение здоровью, делясь Евангелием.',
        'medical-mission',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        true,
        3
    ),
    (
        'Church Planting Initiative',
        'Инициатива посадки церквей',
        'Establishing new churches in unreached areas of Central Asia. Training local pastors and leaders to build sustainable, indigenous church communities.',
        'Создание новых церквей в недостигнутых областях Центральной Азии. Обучение местных пасторов и лидеров для построения устойчивых, коренных церковных общин.',
        'church-planting',
        'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
        true,
        4
    ),
    (
        'Refugee Support Program',
        'Программа поддержки беженцев',
        'Helping displaced families rebuild their lives with housing assistance, job training, and spiritual counseling. We serve refugees from conflict zones with dignity and compassion.',
        'Помощь перемещённым семьям восстановить свою жизнь с помощью жилищной помощи, профессионального обучения и духовного консультирования. Мы служим беженцам из зон конфликта с достоинством и состраданием.',
        'refugee-support',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        true,
        5
    ),
    (
        'Bible Translation Project',
        'Проект перевода Библии',
        'Translating Scripture into minority languages so everyone can read God''s Word in their heart language. Currently working on 5 language projects in Southeast Asia.',
        'Перевод Писания на языки меньшинств, чтобы каждый мог читать Слово Божье на языке своего сердца. В настоящее время ведётся работа над 5 языковыми проектами в Юго-Восточной Азии.',
        'bible-translation',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        true,
        6
    ),
    (
        'Orphanage Care',
        'Забота о сиротах',
        'Providing loving homes and quality care for orphaned children. Our orphanages offer education, healthcare, and most importantly, a Christian family environment.',
        'Предоставление любящих домов и качественной заботы для детей-сирот. Наши детские дома предлагают образование, здравоохранение и, что важнее всего, христианскую семейную среду.',
        'orphanage-care',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        true,
        7
    ),
    (
        'Emergency Relief Fund',
        'Фонд экстренной помощи',
        'Rapid response to natural disasters and humanitarian crises. We provide immediate aid including food, water, shelter, and trauma counseling to affected communities.',
        'Быстрое реагирование на стихийные бедствия и гуманитарные кризисы. Мы предоставляем немедленную помощь, включая еду, воду, убежище и консультирование по травмам пострадавшим общинам.',
        'emergency-relief',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
        false,
        8
    );

-- ============================================================================
-- 4. SHOP PRODUCTS
-- ============================================================================

INSERT INTO shop_products (title_en, title_ru, description_en, description_ru, price, image_url, is_active, stock_quantity)
VALUES
    (
        'Mission Support - Monthly',
        'Поддержка миссии - Ежемесячная',
        'Monthly recurring donation to support our ongoing mission work. Helps fund daily operations, staff salaries, and continuous outreach programs.',
        'Ежемесячное регулярное пожертвование для поддержки нашей текущей миссионерской работы. Помогает финансировать повседневные операции, зарплаты персонала и постоянные программы охвата.',
        25.00,
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
        true,
        999
    ),
    (
        'Sponsor a Child',
        'Спонсор ребёнка',
        'Sponsor one child''s education and care for a full year. Includes school supplies, meals, clothing, and mentorship. You''ll receive quarterly updates and photos.',
        'Спонсирование образования и заботы одного ребёнка на полный год. Включает школьные принадлежности, питание, одежду и наставничество. Вы будете получать ежеквартальные отчёты и фотографии.',
        50.00,
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        true,
        50
    ),
    (
        'Clean Water Well',
        'Колодец чистой воды',
        'Fund the construction of one clean water well serving 500+ people. Transform an entire village with access to safe drinking water and sanitation.',
        'Финансирование строительства одного колодца чистой воды, обслуживающего более 500 человек. Преобразуйте целую деревню с доступом к безопасной питьевой воде и санитарии.',
        500.00,
        'https://images.unsplash.com/photo-1541923127444-29b43f0b4dc6?w=800',
        true,
        10
    ),
    (
        'Missionary Care Package',
        'Пакет заботы миссионера',
        'Support a missionary family with essential supplies and encouragement. Includes food, hygiene products, books, and communication tools.',
        'Поддержите миссионерскую семью необходимыми принадлежностями и ободрением. Включает еду, средства гигиены, книги и инструменты связи.',
        75.00,
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
        true,
        30
    ),
    (
        'Bible Translation - 1 Chapter',
        'Перевод Библии - 1 глава',
        'Fund the translation of one Bible chapter into a minority language. Professional translators work with native speakers to ensure accuracy.',
        'Финансирование перевода одной главы Библии на язык меньшинства. Профессиональные переводчики работают с носителями языка для обеспечения точности.',
        100.00,
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        true,
        100
    ),
    (
        'Medical Clinic - One Day',
        'Медицинская клиника - Один день',
        'Fund one day of mobile medical clinic operations. Provides healthcare for 100+ patients in remote areas.',
        'Финансирование одного дня работы мобильной медицинской клиники. Обеспечивает здравоохранение для более 100 пациентов в отдалённых районах.',
        200.00,
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        true,
        20
    ),
    (
        'Emergency Relief Kit',
        'Набор экстренной помощи',
        'Disaster relief package including food, water purification, first aid, blankets, and hygiene supplies for one family.',
        'Пакет помощи при бедствиях, включая еду, очистку воды, первую помощь, одеяла и средства гигиены для одной семьи.',
        150.00,
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
        true,
        40
    ),
    (
        'Church Building Fund',
        'Фонд строительства церкви',
        'Contribute to building new church facilities in unreached areas. Includes construction materials, labor, and basic furnishings.',
        'Внести вклад в строительство новых церковных объектов в недостигнутых районах. Включает строительные материалы, труд и основную мебель.',
        1000.00,
        'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
        true,
        5
    );

-- ============================================================================
-- 5. TESTIMONIES
-- ============================================================================

INSERT INTO testimonies (author_name, content_en, content_ru, rating, image_url, is_approved)
VALUES
    (
        'John Smith',
        'I was blessed to serve with Raphael Mission in Kenya. Seeing how they combine practical help with spiritual guidance changed my life. The local communities are truly transformed!',
        'Я был благословлён служить с миссией Рафаила в Кении. Видя, как они сочетают практическую помощь с духовным руководством, изменило мою жизнь. Местные общины действительно преобразованы!',
        5,
        'https://i.pravatar.cc/150?img=12',
        true
    ),
    (
        'Maria Garcia',
        'As a sponsored child 15 years ago, I can testify to the incredible impact of this ministry. Now I''m a teacher helping other children. Thank you for changing my life!',
        'Будучи спонсируемым ребёнком 15 лет назад, я могу засвидетельствовать невероятное влияние этого служения. Теперь я учитель, помогающий другим детям. Спасибо за изменение моей жизни!',
        5,
        'https://i.pravatar.cc/150?img=5',
        true
    ),
    (
        'Pastor Ivan Petrov',
        'Raphael Mission trained me as a church planter in Central Asia. Their support, both spiritual and practical, has been invaluable. We now have 5 thriving churches!',
        'Миссия Рафаила обучила меня как насадителя церквей в Центральной Азии. Их поддержка, как духовная, так и практическая, была бесценна. У нас теперь 5 процветающих церквей!',
        5,
        'https://i.pravatar.cc/150?img=33',
        true
    ),
    (
        'Sarah Johnson',
        'The medical mission team literally saved my daughter''s life when she fell ill in our remote village. But more than that, they shared God''s love with our entire community.',
        'Команда медицинской миссии буквально спасла жизнь моей дочери, когда она заболела в нашей отдалённой деревне. Но более того, они поделились Божьей любовью со всей нашей общиной.',
        5,
        'https://i.pravatar.cc/150?img=9',
        true
    ),
    (
        'Ahmed Hassan',
        'I came as a refugee with nothing. Raphael Mission provided shelter, job training, and most importantly, hope. I found Jesus and a new purpose for my life.',
        'Я пришёл как беженец ни с чем. Миссия Рафаила предоставила убежище, профессиональное обучение и, что важнее всего, надежду. Я нашёл Иисуса и новую цель для моей жизни.',
        5,
        'https://i.pravatar.cc/150?img=68',
        true
    ),
    (
        'Anna Kowalski',
        'Volunteering with Raphael Mission was the best decision I ever made. The dedication of the staff and the genuine transformation in people''s lives is remarkable.',
        'Волонтёрство в миссии Рафаила было лучшим решением, которое я когда-либо принимала. Преданность персонала и подлинное преобразование в жизни людей замечательны.',
        5,
        'https://i.pravatar.cc/150?img=20',
        true
    ),
    (
        'David Kim',
        'After the earthquake destroyed our village, Raphael Mission was there within 48 hours. They provided not just emergency supplies, but long-term rebuilding support.',
        'После того как землетрясение разрушило нашу деревню, миссия Рафаила была там в течение 48 часов. Они предоставили не только экстренные принадлежности, но и долгосрочную поддержку восстановления.',
        5,
        'https://i.pravatar.cc/150?img=14',
        true
    ),
    (
        'Elena Popescu',
        'Being able to read the Bible in my native language for the first time brought tears to my eyes. Thank you to everyone who supported the translation project!',
        'Возможность читать Библию на моём родном языке в первый раз вызвала слёзы на моих глазах. Спасибо всем, кто поддержал проект перевода!',
        5,
        'https://i.pravatar.cc/150?img=45',
        true
    ),
    (
        'Michael Chen',
        'Pending review - Great organization doing God''s work!',
        'Ожидает проверки - Отличная организация, делающая Божью работу!',
        4,
        'https://i.pravatar.cc/150?img=51',
        false
    );

-- ============================================================================
-- 6. TRAINING PROGRAMS
-- ============================================================================

INSERT INTO training (title_en, title_ru, description_en, description_ru, duration, level, price, is_active)
VALUES
    (
        'Biblical Studies Foundation',
        'Основы библейских исследований',
        'Comprehensive introduction to Scripture study, hermeneutics, and biblical theology. Perfect for new believers and those wanting to deepen their understanding of God''s Word.',
        'Всестороннее введение в изучение Писания, герменевтику и библейскую теологию. Идеально для новых верующих и тех, кто хочет углубить своё понимание Слова Божьего.',
        '3 months',
        'beginner',
        0.00,
        true
    ),
    (
        'Leadership Development',
        'Развитие лидерства',
        'Develop Christ-centered leadership skills for ministry. Covers team building, conflict resolution, vision casting, and servant leadership principles.',
        'Развитие лидерских навыков, сосредоточенных на Христе, для служения. Охватывает создание команды, разрешение конфликтов, формирование видения и принципы служащего лидерства.',
        '6 months',
        'intermediate',
        0.00,
        true
    ),
    (
        'Cross-Cultural Ministry',
        'Межкультурное служение',
        'Prepare for effective ministry in different cultural contexts. Learn cultural sensitivity, language acquisition basics, and contextualization of the Gospel.',
        'Подготовка к эффективному служению в различных культурных контекстах. Изучение культурной чувствительности, основ изучения языка и контекстуализации Евангелия.',
        '4 months',
        'intermediate',
        0.00,
        true
    ),
    (
        'Pastoral Ministry Intensive',
        'Интенсив пасторского служения',
        'Comprehensive training for aspiring pastors and ministry leaders. Includes preaching, pastoral care, church administration, and theological foundations.',
        'Всестороннее обучение для начинающих пасторов и лидеров служения. Включает проповедь, пасторскую заботу, церковное администрирование и теологические основания.',
        '1 year',
        'advanced',
        0.00,
        true
    ),
    (
        'Church Planting Bootcamp',
        'Буткемп посадки церквей',
        'Intensive training for church planters. Strategic planning, fundraising, team building, and sustainable church growth in unreached areas.',
        'Интенсивное обучение для насадителей церквей. Стратегическое планирование, сбор средств, создание команды и устойчивый рост церкви в недостигнутых областях.',
        '8 months',
        'advanced',
        0.00,
        true
    ),
    (
        'Youth Ministry Training',
        'Обучение молодёжному служению',
        'Equip yourself to minister effectively to young people. Covers adolescent psychology, relevant teaching methods, and creating engaging youth programs.',
        'Оснаститесь для эффективного служения молодым людям. Охватывает психологию подростков, актуальные методы обучения и создание увлекательных молодёжных программ.',
        '5 months',
        'intermediate',
        0.00,
        true
    ),
    (
        'Evangelism & Discipleship',
        'Евангелизация и ученичество',
        'Learn to effectively share the Gospel and make disciples. Practical training in personal evangelism, follow-up, and multiplication principles.',
        'Научитесь эффективно делиться Евангелием и делать учеников. Практическое обучение личной евангелизации, последующему служению и принципам умножения.',
        '4 months',
        'beginner',
        0.00,
        true
    ),
    (
        'Bible Translation Workshop',
        'Семинар по переводу Библии',
        'Training for those called to Bible translation work. Linguistics basics, translation principles, and cultural considerations in Scripture translation.',
        'Обучение для тех, кто призван к работе по переводу Библии. Основы лингвистики, принципы перевода и культурные соображения в переводе Писания.',
        '6 months',
        'advanced',
        0.00,
        true
    ),
    (
        'Chaplaincy Training',
        'Обучение капелланству',
        'Prepare for chaplaincy in hospitals, prisons, military, or institutions. Pastoral care in crisis, ethics, and specialized ministry contexts.',
        'Подготовка к капелланству в больницах, тюрьмах, военных или учреждениях. Пасторская забота в кризисе, этика и специализированные контексты служения.',
        '6 months',
        'advanced',
        0.00,
        false
    );

-- ============================================================================
-- 7. CONTACT INFORMATION
-- ============================================================================

INSERT INTO contact (email, phone, address_en, address_ru, social_links)
VALUES (
    'info@raphael-mission.org',
    '+1 (555) 123-4567',
    '123 Mission Street, Suite 100, City, State 12345, USA',
    'ул. Миссионерская, 123, офис 100, Город, Область 12345, США',
    '{
        "facebook": "https://facebook.com/raphaelmission",
        "instagram": "https://instagram.com/raphaelmission",
        "telegram": "https://t.me/raphaelmission",
        "youtube": "https://youtube.com/@raphaelmission",
        "twitter": "https://twitter.com/raphaelmission"
    }'::jsonb
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT
    'users' as table_name, COUNT(*) as records FROM users
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'shop_products', COUNT(*) FROM shop_products
UNION ALL
SELECT 'testimonies', COUNT(*) FROM testimonies
UNION ALL
SELECT 'training', COUNT(*) FROM training
UNION ALL
SELECT 'contact', COUNT(*) FROM contact
ORDER BY table_name;

-- ============================================================================
-- SAMPLE DATA SUMMARY
-- ============================================================================
-- Users: 2 (1 admin, 1 regular)
-- Projects: 8 (7 active, 1 inactive)
-- Shop Products: 8 (all active)
-- Testimonies: 9 (8 approved, 1 pending)
-- Training: 9 (8 active, 1 inactive)
-- Contact: 1
-- ============================================================================
