-- ============================================================================
-- About Page Editable Content
-- Version: 005
-- Description: Create about_page table to store editable content for "О нас"
--              section (Hero block + Core Values block) with EN/RU/PL support
-- ============================================================================

CREATE TABLE IF NOT EXISTS about_page (
    id SERIAL PRIMARY KEY,

    -- Hero section: title (3 languages)
    hero_title_en       TEXT,
    hero_title_ru       TEXT,
    hero_title_pl       TEXT,

    -- Hero section: 5 paragraphs (3 languages each)
    hero_paragraph1_en  TEXT,
    hero_paragraph1_ru  TEXT,
    hero_paragraph1_pl  TEXT,

    hero_paragraph2_en  TEXT,
    hero_paragraph2_ru  TEXT,
    hero_paragraph2_pl  TEXT,

    hero_paragraph3_en  TEXT,
    hero_paragraph3_ru  TEXT,
    hero_paragraph3_pl  TEXT,

    hero_paragraph4_en  TEXT,
    hero_paragraph4_ru  TEXT,
    hero_paragraph4_pl  TEXT,

    hero_paragraph5_en  TEXT,
    hero_paragraph5_ru  TEXT,
    hero_paragraph5_pl  TEXT,

    -- Hero section: image
    hero_image_url      TEXT,

    -- Core Values section: title + description
    values_title_en     TEXT,
    values_title_ru     TEXT,
    values_title_pl     TEXT,

    values_desc_en      TEXT,
    values_desc_ru      TEXT,
    values_desc_pl      TEXT,

    -- Core Values section: 3 cards (title + description, 3 languages each)
    value1_title_en     TEXT,
    value1_title_ru     TEXT,
    value1_title_pl     TEXT,
    value1_desc_en      TEXT,
    value1_desc_ru      TEXT,
    value1_desc_pl      TEXT,

    value2_title_en     TEXT,
    value2_title_ru     TEXT,
    value2_title_pl     TEXT,
    value2_desc_en      TEXT,
    value2_desc_ru      TEXT,
    value2_desc_pl      TEXT,

    value3_title_en     TEXT,
    value3_title_ru     TEXT,
    value3_title_pl     TEXT,
    value3_desc_en      TEXT,
    value3_desc_ru      TEXT,
    value3_desc_pl      TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auto-update updated_at column
DROP TRIGGER IF EXISTS update_about_page_updated_at ON about_page;
CREATE TRIGGER update_about_page_updated_at
    BEFORE UPDATE ON about_page
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default content from the current i18n translations so the page does not
-- appear empty before the admin saves anything.
INSERT INTO about_page (
    hero_title_en, hero_title_ru, hero_title_pl,

    hero_paragraph1_en, hero_paragraph1_ru, hero_paragraph1_pl,
    hero_paragraph2_en, hero_paragraph2_ru, hero_paragraph2_pl,
    hero_paragraph3_en, hero_paragraph3_ru, hero_paragraph3_pl,
    hero_paragraph4_en, hero_paragraph4_ru, hero_paragraph4_pl,
    hero_paragraph5_en, hero_paragraph5_ru, hero_paragraph5_pl,

    hero_image_url,

    values_title_en, values_title_ru, values_title_pl,
    values_desc_en,  values_desc_ru,  values_desc_pl,

    value1_title_en, value1_title_ru, value1_title_pl,
    value1_desc_en,  value1_desc_ru,  value1_desc_pl,

    value2_title_en, value2_title_ru, value2_title_pl,
    value2_desc_en,  value2_desc_ru,  value2_desc_pl,

    value3_title_en, value3_title_ru, value3_title_pl,
    value3_desc_en,  value3_desc_ru,  value3_desc_pl
)
SELECT
    'Mission Raphael', 'Миссия Raphael', 'Misja Raphael',

    'Mission Raphael is a Christian mission founded on the Gospel. Our vision is to lead people to Jesus, help them build a close relationship with Him, and bring the Gospel to different nations.',
    'Миссия Raphael — христианская миссия, в основе которой лежит Евангелие. Наше видение — приводить людей к Иисусу, помогать им строить близкие отношения с Ним и нести Евангелие разным народам.',
    'Misja Raphael to chrześcijańska misja, której fundamentem jest Ewangelia. Naszą wizją jest prowadzić ludzi do Jezusa, pomagać im budować bliską relację z Nim i nieść Ewangelię do różnych narodów.',

    'Revelation 22:2 speaks of the tree of life: on both sides of the river stood the tree of life, bearing twelve kinds of fruit and yielding its fruit every month, and the leaves of the tree are for the healing of the nations.',
    'В Откровении 22:2 говорится о дереве жизни: по ту и другую сторону реки — дерево жизни, приносящее двенадцать плодов, дающее на каждый месяц плод свой; и листья дерева — для исцеления народов.',
    'W Objawieniu 22:2 jest mowa o drzewie życia: po obu stronach rzeki stoi drzewo życia, rodzące dwanaście owoców i wydające swój owoc każdego miesiąca, a liście drzewa służą do uzdrowienia narodów.',

    'We believe that God is able to heal every soul, heart, and body. Therefore, an important practice in our ministry is prayer for healing and deliverance.',
    'Мы верим, что Бог способен исцелить каждую душу, сердце и тело. Поэтому в нашем служении важной практикой является молитва за исцеление и освобождение.',
    'Wierzymy, że Bóg jest w stanie uzdrowić każdą duszę, serce i ciało. Dlatego ważną praktyką w naszej służbie jest modlitwa o uzdrowienie i uwolnienie.',

    'We raise up and equip workers, support churches in evangelistic ministry, and strive to establish new communities so that more and more people can hear the Gospel and encounter Jesus.',
    'Мы поднимаем и снаряжаем делателей, поддерживаем церкви в евангелизационном служении и стремимся к открытию новых общин, чтобы всё больше людей могли услышать Евангелие и встретиться с Иисусом.',
    'Podnosimy i wyposażamy pracowników, wspieramy kościoły w służbie ewangelizacyjnej i dążymy do zakładania nowych wspólnot, aby coraz więcej ludzi mogło usłyszeć Ewangelię i spotkać się z Jezusem.',

    'In order to reach more people and different groups of people, we use various gifts and methods. We preach the Gospel through creativity and practical help, demonstrating the power of God so that people may experience supernatural miracles in their lives.',
    'Чтобы достигать больше людей и разных категорий людей, мы используем различные дары и методы. Мы проповедуем Евангелие через творчество и практическую помощь, являя силу Божью, чтобы люди переживали сверхъестественные чудеса в своей жизни.',
    'Aby docierać do większej liczby ludzi i do różnych grup odbiorców, wykorzystujemy różne dary i metody. Głosimy Ewangelię poprzez twórczość i praktyczną pomoc, ukazując moc Bożą, aby ludzie doświadczali nadprzyrodzonych cudów w swoim życiu.',

    '/images/image3.jpeg',

    'Our key values', 'Наши ключевые ценности', 'Nasze kluczowe wartości',
    'We build our ministry on the redemption of Jesus Christ, the power of the Gospel, and God''s love.',
    'Мы строим наше служение на искуплении Иисуса Христа, силе Евангелия и Божьей любви.',
    'Budujemy naszą służbę na odkupieniu Jezusa Chrystusa, mocy Ewangelii i Bożej miłości.',

    'Jesus brought deliverance, freedom, and healing',
    'Иисус принёс избавление, свободу и исцеление',
    'Jezus przyniósł wybawienie, wolność i uzdrowienie',
    'Jesus died for every sin, every curse, and every sickness so that we could be free, and He rose again so that everyone who believes in Him might be justified. We believe that Jesus brought deliverance, freedom, and healing.',
    'Иисус умер за каждый грех, за каждое проклятие и за каждую болезнь, чтобы мы были свободны, и воскрес, чтобы каждый уверовавший в Него был оправдан. Мы верим, что Иисус принёс избавление, свободу и исцеление.',
    'Jezus umarł za każdy grzech, za każde przekleństwo i za każdą chorobę, abyśmy byli wolni, i zmartwychwstał, aby każdy, kto w Niego wierzy, został usprawiedliwiony. Wierzymy, że Jezus przyniósł wybawienie, wolność i uzdrowienie.',

    'The Gospel is the power of God',
    'Евангелие — сила Божья',
    'Ewangelia — moc Boża',
    'The Gospel is the power of God. When the Gospel is preached, it brings power capable of destroying every sickness and every curse and of making the impossible possible. The preached Gospel works miracles.',
    'Евангелие есть сила Божья. Когда проповедуется Евангелие, оно приносит силу, способную разрушать всякую болезнь и всякое проклятие, и делает невозможное возможным. Проповеданное Евангелие производит чудеса.',
    'Ewangelia jest mocą Bożą. Kiedy Ewangelia jest głoszona, przynosi moc zdolną zniszczyć każdą chorobę i każde przekleństwo oraz uczynić niemożliwe możliwym. Głoszona Ewangelia sprawia cuda.',

    'Love is the foundation of everything',
    'Любовь — основание всего',
    'Miłość — fundament wszystkiego',
    'At the heart of everything God does is love. At the heart of every mission, every ministry, and every action there must be love!',
    'В основе всего, что делает Бог, лежит любовь. В основе каждой миссии, каждого служения и каждого действия должна быть любовь!',
    'U podstaw wszystkiego, co czyni Bóg, leży miłość. U podstaw każdej misji, każdej służby i każdego działania powinna być miłość!'
WHERE NOT EXISTS (SELECT 1 FROM about_page);
