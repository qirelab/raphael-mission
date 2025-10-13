-- Скрипт для исправления структуры таблиц в Supabase
-- Запустите этот SQL в Supabase SQL Editor

-- 1. Проверка и исправление таблицы training_programs
-- Убедимся что есть все поля для переводов duration
ALTER TABLE training_programs 
  ADD COLUMN IF NOT EXISTS duration_en TEXT,
  ADD COLUMN IF NOT EXISTS duration_ru TEXT,
  ADD COLUMN IF NOT EXISTS duration_pl TEXT;

-- Удаляем старое поле duration если оно есть
ALTER TABLE training_programs DROP COLUMN IF EXISTS duration;

-- 2. Проверка таблицы shop_products
-- Удаляем stock_quantity (проблема #3)
ALTER TABLE shop_products DROP COLUMN IF EXISTS stock_quantity;

-- 3. Проверка таблицы contact_info
-- Добавляем поля для переводов
ALTER TABLE contact_info
  ADD COLUMN IF NOT EXISTS phone_label_en TEXT DEFAULT 'Call Us',
  ADD COLUMN IF NOT EXISTS phone_label_ru TEXT DEFAULT 'Позвоните нам',
  ADD COLUMN IF NOT EXISTS phone_label_pl TEXT DEFAULT 'Zadzwoń do nas',
  ADD COLUMN IF NOT EXISTS email_label_en TEXT DEFAULT 'Email Us',
  ADD COLUMN IF NOT EXISTS email_label_ru TEXT DEFAULT 'Напишите нам',
  ADD COLUMN IF NOT EXISTS email_label_pl TEXT DEFAULT 'Napisz do nas',
  ADD COLUMN IF NOT EXISTS address_label_en TEXT DEFAULT 'Visit Us',
  ADD COLUMN IF NOT EXISTS address_label_ru TEXT DEFAULT 'Посетите нас',
  ADD COLUMN IF NOT EXISTS address_label_pl TEXT DEFAULT 'Odwiedź nas';

-- Убедимся что основные поля есть
ALTER TABLE contact_info
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS address_line1 TEXT,
  ADD COLUMN IF NOT EXISTS address_line2 TEXT;

-- 4. Проверка таблицы testimonies
-- Убедимся что есть поля для переводов
ALTER TABLE testimonies
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS title_ru TEXT,
  ADD COLUMN IF NOT EXISTS title_pl TEXT,
  ADD COLUMN IF NOT EXISTS testimony_en TEXT,
  ADD COLUMN IF NOT EXISTS testimony_ru TEXT,
  ADD COLUMN IF NOT EXISTS testimony_pl TEXT;

-- Если есть старое поле testimony, удалим его
ALTER TABLE testimonies DROP COLUMN IF EXISTS testimony;
ALTER TABLE testimonies DROP COLUMN IF EXISTS title;

-- Показать структуру всех таблиц для проверки
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('training_programs', 'shop_products', 'contact_info', 'testimonies', 'projects')
ORDER BY table_name, ordinal_position;


