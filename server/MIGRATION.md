# Миграция данных из Neon в PostgreSQL на VPS

Этот документ описывает процесс миграции данных из Neon Database в PostgreSQL на вашем VPS.

## Шаг 1: Установка PostgreSQL на VPS

```bash
# Установка PostgreSQL 15
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Проверка статуса
sudo systemctl status postgresql
```

## Шаг 2: Создание БД и пользователя

```bash
sudo -u postgres psql

# В PostgreSQL консоли:
CREATE DATABASE raphael_db;
CREATE USER raphael_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;

# Дать права на схему public (для PostgreSQL 15+)
\c raphael_db
GRANT ALL ON SCHEMA public TO raphael_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO raphael_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO raphael_user;

\q
```

## Шаг 3: Экспорт данных из Neon

На локальной машине с доступом к Neon:

```bash
# Установите переменную с URL Neon (из вашего .env файла)
export NEON_URL="postgresql://neondb_owner:npg_XXX@ep-fragrant-grass-XXX-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Экспорт схемы (структура таблиц)
pg_dump "$NEON_URL" --schema-only -f schema.sql

# Экспорт данных
pg_dump "$NEON_URL" --data-only -f data.sql

# Или всё сразу
pg_dump "$NEON_URL" -f full_backup.sql
```

## Шаг 4: Импорт данных в PostgreSQL на VPS

### Вариант A: Через SCP (безопаснее)

```bash
# Скопировать файлы на VPS
scp schema.sql data.sql user@your-vps-ip:/tmp/

# На VPS:
ssh user@your-vps-ip

# Импорт схемы
psql -U raphael_user -d raphael_db -f /tmp/schema.sql

# Импорт данных
psql -U raphael_user -d raphael_db -f /tmp/data.sql

# Или полный бэкап
psql -U raphael_user -d raphael_db -f /tmp/full_backup.sql

# Очистка
rm /tmp/schema.sql /tmp/data.sql
```

### Вариант B: Прямая миграция (если VPS имеет доступ к Neon)

```bash
# На VPS, одной командой:
pg_dump "$NEON_URL" | psql "postgresql://raphael_user:password@localhost/raphael_db"
```

## Шаг 5: Проверка миграции

```bash
# Подключиться к БД
psql -U raphael_user -d raphael_db

# Проверить таблицы
\dt

# Проверить количество записей в основных таблицах
SELECT 'projects' as table_name, COUNT(*) FROM projects
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'testimonies', COUNT(*) FROM testimonies
UNION ALL
SELECT 'shop_products', COUNT(*) FROM shop_products
UNION ALL
SELECT 'training', COUNT(*) FROM training
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info;

# Проверить структуру таблицы (пример)
\d projects

\q
```

## Шаг 6: Настройка connection string

Обновите `server/.env`:

```env
# Старое (Neon)
# DATABASE_URL=postgresql://neondb_owner:npg_XXX@neon.tech/neondb?sslmode=require

# Новое (локальный PostgreSQL)
DATABASE_URL=postgresql://raphael_user:your_secure_password@localhost:5432/raphael_db
```

## Шаг 7: Тестирование

```bash
cd /var/www/raphael-mission/server

# Тест подключения к БД
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://raphael_user:password@localhost/raphael_db'
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error:', err);
  } else {
    console.log('✅ Connected:', res.rows[0]);
  }
  pool.end();
});
"

# Запустить backend
npm run dev
```

## Решение проблем

### Ошибка: "permission denied for schema public"

```bash
sudo -u postgres psql -d raphael_db

GRANT ALL ON SCHEMA public TO raphael_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO raphael_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO raphael_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO raphael_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO raphael_user;
```

### Ошибка: "password authentication failed"

Проверьте `/etc/postgresql/15/main/pg_hba.conf`:

```bash
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Должна быть строка:
# local   all   raphael_user   md5

sudo systemctl restart postgresql
```

### Ошибка: "could not connect to server"

```bash
# Проверить что PostgreSQL запущен
sudo systemctl status postgresql

# Проверить порт
sudo netstat -tulpn | grep 5432

# Проверить логи
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

## Бэкап после миграции

После успешной миграции создайте регулярные бэкапы:

```bash
# Создать директорию для бэкапов
sudo mkdir -p /var/backups/postgresql
sudo chown raphael_user:raphael_user /var/backups/postgresql

# Бэкап вручную
pg_dump -U raphael_user raphael_db | gzip > /var/backups/postgresql/backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Автоматический бэкап через cron (каждый день в 2:00)
crontab -e

# Добавить:
0 2 * * * pg_dump -U raphael_user raphael_db | gzip > /var/backups/postgresql/backup_$(date +\%Y\%m\%d).sql.gz

# Очистка старых бэкапов (старше 30 дней)
0 3 * * * find /var/backups/postgresql -name "backup_*.sql.gz" -mtime +30 -delete
```

## Откат на Neon (в случае проблем)

Если что-то пошло не так, можно быстро вернуться на Neon:

```bash
# В server/.env измените обратно:
DATABASE_URL=postgresql://neondb_owner:npg_XXX@neon.tech/neondb?sslmode=require

# Перезапустите backend
pm2 restart raphael-backend
```

## Следующие шаги

После успешной миграции:

1. ✅ Протестировать все API endpoints
2. ✅ Проверить что админ-панель работает
3. ✅ Настроить регулярные бэкапы
4. ✅ Настроить мониторинг БД
5. ✅ Отключить Neon Database (через 1-2 недели после проверки)
