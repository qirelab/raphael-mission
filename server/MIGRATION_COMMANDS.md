# Команды для миграции из Neon в локальную БД

Ваши данные подключения:

```
Host: ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech
Database: neondb
Username: neondb_owner
Password: npg_C3bKt8IyDAaB
Full URL: postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## 🚀 Самый простой способ (автоматический скрипт)

### Windows (Command Prompt):
```bash
cd server
migrate-from-neon.bat
```

### Windows (PowerShell):
```powershell
cd server
.\migrate-from-neon.ps1
```

**Скрипт автоматически:**
1. Экспортирует данные из Neon
2. Создаёт бэкап файл с датой
3. Импортирует в локальную БД
4. Проверяет количество записей

---

## 📝 Ручные команды (если скрипты не работают)

### Вариант 1: Прямое копирование (одна команда)

```bash
pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | psql -U raphael_user -d raphael_db
```

**Пароль для raphael_user:** `dev_password_2024`

---

### Вариант 2: С сохранением бэкапа

#### Шаг 1: Экспорт из Neon
```bash
pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > neon_backup.sql
```

#### Шаг 2: Импорт в локальную БД
```bash
psql -U raphael_user -d raphael_db -f neon_backup.sql
```

**Пароль:** `dev_password_2024`

---

### Вариант 3: Только данные (без структуры)

Если структура таблиц уже создана через `000_create_tables.sql`:

#### Экспорт только данных:
```bash
pg_dump --data-only --inserts "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > neon_data_only.sql
```

#### Импорт:
```bash
psql -U raphael_user -d raphael_db -f neon_data_only.sql
```

---

### Вариант 4: Конкретные таблицы

#### Только проекты:
```bash
pg_dump --table=projects "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > projects.sql

psql -U raphael_user -d raphael_db -f projects.sql
```

#### Несколько таблиц:
```bash
pg_dump --table=projects --table=testimonies --table=shop_products "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > selected_tables.sql

psql -U raphael_user -d raphael_db -f selected_tables.sql
```

---

## 🔧 Если возникают проблемы

### Проблема: "pg_dump: command not found"

**Решение - добавить PostgreSQL в PATH:**

#### Command Prompt:
```bash
set PATH=%PATH%;C:\Program Files\PostgreSQL\16\bin
```

#### PowerShell:
```powershell
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
```

#### Или использовать полный путь:
```bash
"C:\Program Files\PostgreSQL\16\bin\pg_dump.exe" "postgresql://neondb_owner:..." > backup.sql
```

---

### Проблема: "таблицы уже существуют"

**Решение 1 - Удалить существующие таблицы:**
```bash
psql -U raphael_user -d raphael_db

DROP TABLE IF EXISTS login_attempts CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS shop_products CASCADE;
DROP TABLE IF EXISTS testimonies CASCADE;
DROP TABLE IF EXISTS training CASCADE;
DROP TABLE IF EXISTS contact CASCADE;

\q
```

**Решение 2 - Очистить данные (оставить структуру):**
```bash
psql -U raphael_user -d raphael_db

TRUNCATE TABLE login_attempts CASCADE;
TRUNCATE TABLE user_sessions CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE shop_products CASCADE;
TRUNCATE TABLE testimonies CASCADE;
TRUNCATE TABLE training CASCADE;
TRUNCATE TABLE contact CASCADE;

\q
```

**Решение 3 - Экспортировать только данные:**
```bash
# Используйте Вариант 3 выше (--data-only)
```

---

### Проблема: "роль neondb_owner не существует"

Это нормально! Эти ошибки можно игнорировать.

**Решение - заменить владельца в SQL файле:**

#### PowerShell:
```powershell
(Get-Content neon_backup.sql) -replace 'neondb_owner', 'raphael_user' | Set-Content neon_backup_fixed.sql
psql -U raphael_user -d raphael_db -f neon_backup_fixed.sql
```

#### Или игнорировать ошибки:
```bash
psql -U raphael_user -d raphael_db -f neon_backup.sql 2>&1 | findstr /V "role.*does not exist"
```

---

## ✅ Проверка после импорта

```bash
# Подключиться к БД
psql -U raphael_user -d raphael_db

# Посмотреть таблицы
\dt

# Проверить количество записей
SELECT 'projects' as table_name, COUNT(*) as rows FROM projects
UNION ALL SELECT 'shop_products', COUNT(*) FROM shop_products
UNION ALL SELECT 'testimonies', COUNT(*) FROM testimonies
UNION ALL SELECT 'training', COUNT(*) FROM training
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'contact', COUNT(*) FROM contact;

# Посмотреть данные проектов
SELECT id, title_en, slug FROM projects LIMIT 5;

# Выйти
\q
```

---

## 📊 Применить индексы после импорта

```bash
# После успешного импорта применить индексы для производительности
psql -U raphael_user -d raphael_db -f migrations/001_add_indexes.sql

# Проверить индексы
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';"
# Должно вернуть >= 23
```

---

## 🔄 Обновить .env после миграции

В `server/.env` изменить:

```env
# БЫЛО (Neon):
# DATABASE_URL=postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# СТАЛО (локальная БД):
DATABASE_URL=postgresql://raphael_user:dev_password_2024@localhost:5432/raphael_db
```

---

## 🚀 Запуск backend после миграции

```bash
cd server
npm run dev
```

**Ожидаемый вывод:**
```
✅ Database connection successful
✅ Redis: Connected (или node-cache)
🚀 Server running on port 5000
```

**Тест:**
```bash
curl http://localhost:5000/api/projects
# Должен вернуть ваши проекты из Neon
```

---

## 📝 Полный процесс пошагово

```bash
# 1. Создать локальную БД (если ещё не создана)
psql -U postgres
CREATE DATABASE raphael_db;
CREATE USER raphael_user WITH PASSWORD 'dev_password_2024';
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;
\c raphael_db
GRANT ALL ON SCHEMA public TO raphael_user;
\q

# 2. Мигрировать данные из Neon
cd server
migrate-from-neon.bat
# Или вручную:
# pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@..." | psql -U raphael_user -d raphael_db

# 3. Применить индексы
psql -U raphael_user -d raphael_db -f migrations/001_add_indexes.sql

# 4. Обновить .env
# DATABASE_URL=postgresql://raphael_user:dev_password_2024@localhost:5432/raphael_db

# 5. Запустить backend
npm run dev

# 6. Проверить
curl http://localhost:5000/api/projects
```

**Готово!** ✅

---

## 🎯 Рекомендуемый способ

**Для Windows (самый простой):**
```bash
cd C:\Study\commercial-projects\raphael-mission\server
migrate-from-neon.bat
```

Скрипт сделает всё автоматически и покажет результат!
