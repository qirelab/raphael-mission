-- ============================================================================
-- Initial Database Schema for Raphael Mission
-- Version: 000
-- Date: 2024-02-24
-- Description: Create all tables from scratch for local development
-- ============================================================================

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_active BOOLEAN DEFAULT true,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. USER SESSIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. LOGIN ATTEMPTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    success BOOLEAN NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. SHOP PRODUCTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS shop_products (
    id SERIAL PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. TESTIMONIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS testimonies (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    content_en TEXT NOT NULL,
    content_ru TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 7. TRAINING TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS training (
    id SERIAL PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. CONTACT TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(50),
    address_en TEXT,
    address_ru TEXT,
    social_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INSERT DEFAULT DATA
-- ============================================================================

-- Default contact info (single row)
INSERT INTO contact (email, phone, address_en, address_ru, social_links)
VALUES (
    'info@raphael-mission.org',
    '+7 (XXX) XXX-XX-XX',
    'Default Address EN',
    'Адрес по умолчанию RU',
    '{"facebook": "", "instagram": "", "telegram": "", "youtube": ""}'::jsonb
)
ON CONFLICT DO NOTHING;

-- Default admin user (password: Raphael$2026!Secure#Admin*Pass)
INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
    'admin@raphael.com',
    '$2a$12$72QBkIxacLfaKtz9uS673.No8MNv6uB1reuiMizf8.77V/N3UMZtm',
    'Admin User',
    'admin',
    true
)
ON CONFLICT (email) DO NOTHING;

-- Sample projects
INSERT INTO projects (title_en, title_ru, description_en, description_ru, slug, is_active, order_index)
VALUES
    ('Mission to Africa', 'Миссия в Африку', 'Humanitarian mission to help communities in Africa', 'Гуманитарная миссия помощи общинам в Африке', 'mission-africa', true, 1),
    ('Children Education', 'Образование детей', 'Providing education to underprivileged children', 'Предоставление образования малообеспеченным детям', 'children-education', true, 2),
    ('Medical Aid', 'Медицинская помощь', 'Free medical care for those in need', 'Бесплатная медицинская помощь нуждающимся', 'medical-aid', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- Sample testimonies
INSERT INTO testimonies (author_name, content_en, content_ru, rating, is_approved)
VALUES
    ('John Smith', 'Amazing work! God bless you!', 'Потрясающая работа! Да благословит вас Бог!', 5, true),
    ('Maria Garcia', 'Very inspiring mission', 'Очень вдохновляющая миссия', 5, true),
    ('Ivan Petrov', 'Great service to the community', 'Отличное служение обществу', 5, true)
ON CONFLICT DO NOTHING;

-- Sample training programs
INSERT INTO training (title_en, title_ru, description_en, description_ru, duration, level, price, is_active)
VALUES
    ('Biblical Studies', 'Библейские исследования', 'Deep dive into scripture', 'Глубокое изучение Писания', '3 months', 'beginner', 0.00, true),
    ('Leadership Training', 'Обучение лидерству', 'Develop leadership skills', 'Развитие лидерских навыков', '6 months', 'intermediate', 0.00, true),
    ('Ministry Preparation', 'Подготовка к служению', 'Prepare for full-time ministry', 'Подготовка к служению на полное время', '1 year', 'advanced', 0.00, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- UPDATE TRIGGERS FOR updated_at
-- ============================================================================

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_products_updated_at BEFORE UPDATE ON shop_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonies_updated_at BEFORE UPDATE ON testimonies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_updated_at BEFORE UPDATE ON training
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check all tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check row counts
SELECT
    'users' as table_name, COUNT(*) as rows FROM users
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'shop_products', COUNT(*) FROM shop_products
UNION ALL
SELECT 'testimonies', COUNT(*) FROM testimonies
UNION ALL
SELECT 'training', COUNT(*) FROM training
UNION ALL
SELECT 'contact', COUNT(*) FROM contact;

-- ============================================================================
-- COMPLETED
-- ============================================================================
-- Next step: Run 001_add_indexes.sql to add performance indexes
-- ============================================================================
