# 🚀 Production Deployment Guide - Raphael Mission

Полная пошаговая инструкция по деплою на VPS (Ubuntu/Debian).

---

## 📋 Предварительные требования

- VPS с Ubuntu 20.04+ или Debian 11+
- Доменное имя (например, `raphael-mission.com`)
- SSH доступ к VPS
- Минимум 2GB RAM, 20GB диск

---

## 🎯 Архитектура Production

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
              ┌─────────────┐
              │   Nginx     │  (Port 80/443)
              │   Reverse   │  - SSL/TLS
              │   Proxy     │  - Static files
              └──────┬──────┘  - API routing
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
  ┌─────────────┐        ┌─────────────┐
  │  Frontend   │        │   Backend   │
  │  (Static)   │        │   (PM2)     │
  │  /var/www/  │        │  Port 6388  │
  │    html/    │        └──────┬──────┘
  └─────────────┘               │
                        ┌───────┴────────┐
                        │                │
                        ▼                ▼
                 ┌──────────┐    ┌──────────┐
                 │PostgreSQL│    │  Redis   │
                 │Port 5432 │    │Port 6379 │
                 └──────────┘    └──────────┘
```

---

## 📝 Этап 1: Подготовка VPS

### 1.1 Подключение к VPS

```bash
ssh root@your-vps-ip
# или
ssh user@your-vps-ip
```

### 1.2 Обновление системы

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.3 Установка необходимых пакетов

```bash
# Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Redis
sudo apt install redis-server -y

# Nginx
sudo apt install nginx -y

# PM2 (глобально)
sudo npm install -g pm2

# Git
sudo apt install git -y

# Certbot (для SSL)
sudo apt install certbot python3-certbot-nginx -y
```

### 1.4 Проверка установки

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
psql --version    # PostgreSQL 14+
redis-cli --version
nginx -v
pm2 --version
```

---

## 💾 Этап 2: Настройка PostgreSQL

### 2.1 Создание базы данных

```bash
sudo -u postgres psql
```

В psql консоли:

```sql
-- Создать базу данных
CREATE DATABASE raphael_db;

-- Создать пользователя с паролем
CREATE USER raphael_user WITH PASSWORD 'ваш_надёжный_пароль_здесь';

-- Дать права
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;

-- Подключиться к БД
\c raphael_db

-- Дать права на схему
GRANT ALL ON SCHEMA public TO raphael_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO raphael_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO raphael_user;

-- Выйти
\q
```

### 2.2 Клонирование данных из Neon напрямую

**На VPS (прямое клонирование из Neon):**

```bash
# Клонировать БД из Neon напрямую через pipe (без промежуточных файлов)
pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | psql -U raphael_user -d raphael_db

# Проверить импорт
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM projects;"
```

**Альтернативный метод (если нужно сохранить backup):**

```bash
# На локальной машине: экспортировать и скопировать на VPS
pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > raphael_production.sql
scp raphael_production.sql user@your-vps-ip:/tmp/

# На VPS: импортировать
psql -U raphael_user -d raphael_db -f /tmp/raphael_production.sql
rm /tmp/raphael_production.sql
```

### 2.3 Применить индексы для производительности

```bash
# После клонирования репозитория (см. Этап 4)
psql -U raphael_user -d raphael_db -f /var/www/raphael-mission/server/migrations/001_add_indexes.sql
```

---

## 🔴 Этап 3: Настройка Redis

### 3.1 Установка (уже сделано в Этапе 1)

```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### 3.2 Настройка безопасности (опционально, но рекомендуется)

```bash
# Редактировать конфиг
sudo nano /etc/redis/redis.conf
```

Найти и изменить:

```conf
# Запретить внешние подключения (если Redis на том же сервере)
bind 127.0.0.1 ::1

# Установить пароль (раскомментировать и изменить)
requirepass ваш_надёжный_redis_пароль

# Сохранить: Ctrl+O, Enter, Ctrl+X
```

Перезапустить Redis:

```bash
sudo systemctl restart redis-server
```

Проверить работу:

```bash
# Без пароля:
redis-cli ping

# С паролем:
redis-cli -a ваш_надёжный_redis_пароль ping
# Ответ: PONG
```

---

## 📦 Этап 4: Деплой Backend

### 4.1 Клонирование репозитория

```bash
cd /var/www
sudo git clone https://github.com/your-username/raphael-mission.git
sudo chown -R $USER:$USER /var/www/raphael-mission
cd /var/www/raphael-mission/server
```

### 4.2 Установка зависимостей

```bash
npm install --production
```

### 4.3 Настройка .env для production

```bash
cp .env.example .env
nano .env
```

Заполнить:

```env
# Server
NODE_ENV=production
PORT=6388

# Database (локальная PostgreSQL на VPS)
DATABASE_URL=postgresql://raphael_user:ваш_пароль_БД@localhost:5432/raphael_db

# JWT Secret (ОБЯЗАТЕЛЬНО изменить!)
# Сгенерировать: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=сгенерированный_64_символьный_ключ_здесь
JWT_EXPIRES_IN=24h

# Redis
REDIS_URL=redis://:ваш_redis_пароль@localhost:6379
# Или без пароля:
# REDIS_URL=redis://localhost:6379

# CORS (ваш домен)
FRONTEND_URL=https://raphael-mission.com
ALLOWED_ORIGINS=https://raphael-mission.com,https://www.raphael-mission.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION_MS=900000

# Cache
CACHE_TTL_MS=300000

# Logging
LOG_LEVEL=info
```

Сохранить: `Ctrl+O`, `Enter`, `Ctrl+X`

### 4.4 Тестовый запуск backend

```bash
node src/server.js
```

Ожидаемый вывод:

```
✅ Environment variables loaded
✅ Database connection successful
✅ Redis: Connected successfully
✅ Cache: Using Redis
🚀 Server running on port 6388
```

Если работает - нажмите `Ctrl+C` для остановки.

### 4.5 Запуск через PM2

```bash
# Запустить backend
pm2 start ecosystem.config.js

# Сохранить PM2 конфигурацию
pm2 save

# Настроить автозапуск при перезагрузке VPS
pm2 startup
# Выполнить команду, которую PM2 покажет

# Проверить статус
pm2 status

# Посмотреть логи
pm2 logs raphael-backend
```

**Полезные команды PM2:**

```bash
pm2 restart raphael-backend  # Перезапустить
pm2 stop raphael-backend     # Остановить
pm2 delete raphael-backend   # Удалить
pm2 logs raphael-backend     # Логи реального времени
pm2 monit                    # Мониторинг
```

---

## 🌐 Этап 5: Деплой Frontend

### 5.1 Настройка .env для production

На **локальной машине**:

```bash
cd C:\Study\commercial-projects\raphael-mission
```

Создать `.env.production`:

```env
VITE_API_URL=https://raphael-mission.com/api
VITE_OPENROUTER_API_KEY=ваш_ключ_если_есть
VITE_EMAILJS_SERVICE_ID=ваш_service_id
VITE_EMAILJS_TEMPLATE_ID=ваш_template_id
VITE_EMAILJS_PUBLIC_KEY=ваш_public_key
```

### 5.2 Сборка frontend

```bash
npm run build
```

Создастся папка `dist/` с готовыми файлами.

### 5.3 Копирование на VPS

**Вариант 1: Автоматический деплой через GitHub Actions**

При push в `master` ветку GitHub Actions автоматически:
1. Соберёт проект (`npm run build`)
2. Создаст архив `raphael-mission.tar.gz`
3. Скопирует на VPS в `/var/www/raphael-mission/build/`

**Вариант 2: Ручной деплой**

**С локальной машины:**

```bash
# Собрать проект
npm run build

# Упаковать build в архив
tar -czf raphael-mission.tar.gz build/

# Скопировать на VPS
scp raphael-mission.tar.gz user@your-vps-ip:/tmp/
```

**На VPS:**

```bash
# Распаковать
cd /tmp
tar -xzf raphael-mission.tar.gz

# Переместить в целевую директорию
sudo mkdir -p /var/www/raphael-mission/build
sudo cp -r build/* /var/www/raphael-mission/build/
sudo chown -R www-data:www-data /var/www/raphael-mission/build
sudo chmod -R 755 /var/www/raphael-mission/build

# Удалить временные файлы
rm -rf /tmp/build /tmp/raphael-mission.tar.gz
```

---

## ⚙️ Этап 6: Настройка Nginx

### 6.1 Использовать конфиг из репозитория

В репозитории уже есть готовый `nginx.conf` в корне проекта.

```bash
# Скопировать конфиг из репозитория
sudo cp /var/www/raphael-mission/nginx.conf /etc/nginx/sites-available/raphael-mission

# ВАЖНО: Отредактировать server_name под ваш домен (если отличается)
sudo nano /etc/nginx/sites-available/raphael-mission
# Изменить: server_name raphael-mission.com www.raphael-mission.com;
# На ваш домен, если нужно
```

### 6.2 Активировать конфиг

```bash
# Создать символическую ссылку
sudo ln -s /etc/nginx/sites-available/raphael-mission /etc/nginx/sites-enabled/

# Удалить дефолтный конфиг (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверить конфигурацию
sudo nginx -t

# Перезапустить Nginx
sudo systemctl reload nginx
```

### 6.3 Тестирование (без SSL)

```bash
# Проверить health
curl http://your-vps-ip/health

# Проверить API
curl http://your-vps-ip/api/projects

# Проверить frontend
curl http://your-vps-ip/
```

Если всё работает - переходим к SSL!

---

## 🔒 Этап 7: Настройка SSL (HTTPS)

### 7.1 Установка Certbot (уже сделано в Этапе 1)

### 7.2 Получение SSL сертификата

```bash
sudo certbot --nginx -d raphael-mission.com -d www.raphael-mission.com
```

Certbot спросит:

1. **Email:** ваш email для уведомлений
2. **Terms of Service:** Agree (A)
3. **Share email:** Yes/No (на ваш выбор)
4. **Redirect HTTP to HTTPS:** Yes (2) - рекомендуется!

Certbot автоматически:
- Получит SSL сертификат от Let's Encrypt
- Обновит конфиг Nginx
- Настроит автоматическое обновление сертификата

### 7.3 Проверка автообновления сертификата

```bash
# Проверить таймер
sudo systemctl status certbot.timer

# Тест обновления (dry run)
sudo certbot renew --dry-run
```

### 7.4 Финальная проверка HTTPS

Откройте в браузере:

- https://raphael-mission.com
- https://www.raphael-mission.com
- https://raphael-mission.com/api/projects

Должен быть зелёный замочек SSL! ✅

---

## 🔍 Этап 8: Финальные проверки

### 8.1 Проверка всех сервисов

```bash
# PostgreSQL
sudo systemctl status postgresql
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM projects;"

# Redis
sudo systemctl status redis-server
redis-cli -a ваш_пароль ping

# PM2 Backend
pm2 status
pm2 logs raphael-backend --lines 20

# Nginx
sudo systemctl status nginx
sudo nginx -t
```

### 8.2 Проверка логов

```bash
# Backend логи
pm2 logs raphael-backend

# Nginx access логи
sudo tail -f /var/log/nginx/access.log

# Nginx error логи
sudo tail -f /var/log/nginx/error.log

# PostgreSQL логи
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### 8.3 Проверка производительности

```bash
# Проверить индексы
psql -U raphael_user -d raphael_db -f /var/www/raphael-mission/server/migrations/002_verify_indexes.sql

# Проверить cache hit ratio (должен быть > 95%)
# Смотреть вывод 002_verify_indexes.sql
```

### 8.4 Тестирование функционала

1. **Frontend:** https://raphael-mission.com
   - ✅ Главная страница загружается
   - ✅ Проекты отображаются
   - ✅ Отзывы работают
   - ✅ Контакты показываются

2. **Backend API:** https://raphael-mission.com/api/projects
   - ✅ Возвращает JSON
   - ✅ Быстрый ответ (< 50ms с кешем)

3. **Admin панель:** https://raphael-mission.com/admin
   - ✅ Можно войти (admin@raphael.com)
   - ✅ CRUD операции работают
   - ✅ Кеш инвалидируется при обновлениях

---

## 🔄 Обновление приложения (CI/CD)

### Ручное обновление backend:

```bash
# На VPS
cd /var/www/raphael-mission
git pull origin master

# Обновить зависимости (если изменились)
cd server
npm install --production

# Перезапустить PM2
pm2 restart raphael-backend

# Проверить логи
pm2 logs raphael-backend
```

### Ручное обновление frontend:

**Вариант 1: Автоматически через Git push**

```bash
# На локальной машине
git add .
git commit -m "Update frontend"
git push origin master

# GitHub Actions автоматически задеплоит на VPS
```

**Вариант 2: Вручную**

**На локальной машине:**

```bash
# Собрать новую версию
npm run build

# Упаковать и отправить на VPS
tar -czf raphael-mission.tar.gz build/
scp raphael-mission.tar.gz user@your-vps-ip:/tmp/
```

**На VPS:**

```bash
# Распаковать и заменить
cd /tmp
tar -xzf raphael-mission.tar.gz
sudo cp -r build/* /var/www/raphael-mission/build/
sudo chown -R www-data:www-data /var/www/raphael-mission/build

# Очистить временные файлы
rm -rf /tmp/build /tmp/raphael-mission.tar.gz
```

---

## 🛡️ Безопасность

### 1. Firewall (UFW)

```bash
# Включить firewall
sudo ufw enable

# Разрешить SSH
sudo ufw allow 22/tcp

# Разрешить HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Проверить статус
sudo ufw status
```

### 2. Fail2Ban (защита от брутфорса)

```bash
# Установить
sudo apt install fail2ban -y

# Настроить
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# Включить защиту для Nginx
# Найти [nginx-http-auth] и установить enabled = true

# Перезапустить
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban
```

### 3. Ротация логов

```bash
# Настроить PM2 для ротации логов
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 📊 Мониторинг

### 1. PM2 Monitoring

```bash
# Установить PM2 dashboard
pm2 install pm2-server-monit

# Открыть мониторинг
pm2 monit
```

### 2. Nginx Monitoring

```bash
# Включить status page
sudo nano /etc/nginx/sites-available/raphael-mission

# Добавить внутри server {}:
# location /nginx_status {
#     stub_status;
#     allow 127.0.0.1;
#     deny all;
# }

# Перезапустить
sudo systemctl reload nginx

# Проверить
curl http://localhost/nginx_status
```

### 3. PostgreSQL Monitoring

```bash
# Посмотреть активные подключения
psql -U raphael_user -d raphael_db -c "SELECT count(*) FROM pg_stat_activity;"

# Посмотреть медленные запросы
# Настроить в postgresql.conf:
# log_min_duration_statement = 1000  # логировать запросы > 1 сек
```

---

## 🔧 Troubleshooting

### Backend не запускается

```bash
# Проверить логи PM2
pm2 logs raphael-backend --err

# Проверить .env
cat /var/www/raphael-mission/server/.env | grep DATABASE_URL

# Проверить подключение к БД
psql -U raphael_user -d raphael_db -c "SELECT 1;"

# Проверить Redis
redis-cli -a ваш_пароль ping
```

### Frontend не загружается

```bash
# Проверить Nginx конфиг
sudo nginx -t

# Проверить файлы
ls -la /var/www/raphael-mission/build/

# Проверить логи Nginx
sudo tail -f /var/log/nginx/error.log

# Проверить права доступа
sudo chown -R www-data:www-data /var/www/raphael-mission/build
sudo chmod -R 755 /var/www/raphael-mission/build
```

### SSL не работает

```bash
# Проверить сертификаты
sudo certbot certificates

# Обновить вручную
sudo certbot renew

# Проверить конфиг Nginx
sudo nginx -t

# Проверить порты
sudo netstat -tulpn | grep :443
```

### Медленная работа

```bash
# Проверить индексы БД
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';"
# Должно быть >= 23

# Проверить Redis cache
redis-cli -a ваш_пароль INFO stats

# Проверить нагрузку сервера
htop
# или
top
```

---

## 📝 Чеклист финального деплоя

- [ ] VPS настроен и обновлён
- [ ] PostgreSQL установлен и БД создана
- [ ] Данные мигрированы из локальной БД
- [ ] Индексы применены (001_add_indexes.sql)
- [ ] Redis установлен и настроен
- [ ] Backend склонирован и настроен
- [ ] Backend .env заполнен с правильными credentials
- [ ] PM2 запущен и настроен автозапуск
- [ ] Frontend собран и скопирован на VPS
- [ ] Nginx настроен для backend и frontend
- [ ] SSL сертификат получен через Certbot
- [ ] HTTPS работает (зелёный замочек)
- [ ] Firewall настроен (UFW)
- [ ] Все сервисы запущены и работают
- [ ] Логи проверены, ошибок нет
- [ ] Тестирование функционала выполнено

---

## 🎉 Поздравляю!

Ваше приложение развёрнуто на production!

**Доступ:**
- Frontend: https://raphael-mission.com
- API: https://raphael-mission.com/api
- Admin: https://raphael-mission.com/admin

---

## 📚 Дополнительные ресурсы

- **PM2 Docs:** https://pm2.keymetrics.io/docs/
- **Nginx Docs:** https://nginx.org/en/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Redis Docs:** https://redis.io/docs/
- **Certbot Docs:** https://certbot.eff.org/docs/

---

## 🆘 Поддержка

Если возникли проблемы при деплое:

1. Проверьте логи (PM2, Nginx, PostgreSQL)
2. Убедитесь что все сервисы запущены
3. Проверьте firewall правила
4. Проверьте DNS настройки домена

**Полезные команды для диагностики:**

```bash
# Статус всех сервисов
sudo systemctl status postgresql
sudo systemctl status redis-server
sudo systemctl status nginx
pm2 status

# Все логи
pm2 logs
sudo tail -f /var/log/nginx/error.log
sudo journalctl -u postgresql -n 50
```

---

**Создано:** 2024-02-25
**Версия:** 1.0
**Проект:** Raphael Mission - Production Deployment
