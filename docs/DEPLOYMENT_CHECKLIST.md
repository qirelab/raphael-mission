# ✅ Production Deployment Checklist

Быстрая шпаргалка для деплоя на VPS.

---

## 🚀 Быстрый старт (команды по порядку)

### На VPS:

```bash
# 1. Установка всего необходимого
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update && sudo apt install -y nodejs postgresql postgresql-contrib redis-server nginx git certbot python3-certbot-nginx
sudo npm install -g pm2

# 2. PostgreSQL
sudo -u postgres psql
CREATE DATABASE raphael_db;
CREATE USER raphael_user WITH PASSWORD 'ваш_пароль';
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;
\c raphael_db
GRANT ALL ON SCHEMA public TO raphael_user;
\q

# 3. Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 4. Клонирование
cd /var/www
sudo git clone https://github.com/your-repo/raphael-mission.git
sudo chown -R $USER:$USER raphael-mission

# 5. Backend setup
cd raphael-mission/server
npm install --production
cp .env.example .env
nano .env  # Заполнить DATABASE_URL, JWT_SECRET, REDIS_URL, ALLOWED_ORIGINS

# 6. Клонирование БД из Neon напрямую
pg_dump "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | psql -U raphael_user -d raphael_db

# Применить индексы
psql -U raphael_user -d raphael_db -f migrations/001_add_indexes.sql

# 7. Запуск backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Выполнить команду которую покажет PM2

# 8. Frontend (файлы с локальной машины)
sudo mkdir -p /var/www/html
sudo cp -r /tmp/dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

# 9. Nginx конфиг
sudo nano /etc/nginx/sites-available/raphael-backend
# Вставить конфиг (см. DEPLOYMENT_GUIDE.md, Этап 6)
sudo ln -s /etc/nginx/sites-available/raphael-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 10. SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 11. Firewall
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 📋 Перед деплоем (на локальной машине)

```bash
# 1. Сборка frontend
npm run build

# 2. Упаковка
tar -czf dist.tar.gz dist/

# 3. Копирование на VPS
scp dist.tar.gz user@vps-ip:/tmp/
```

**Примечание:** БД клонируется напрямую из Neon на VPS (см. шаг #6 выше), поэтому экспорт БД с локальной машины не требуется.

---

## 🔍 Проверки после деплоя

```bash
# Сервисы
sudo systemctl status postgresql
sudo systemctl status redis-server
sudo systemctl status nginx
pm2 status

# Тесты
curl http://localhost:6388/health
curl https://yourdomain.com/health
curl https://yourdomain.com/api/projects

# Логи
pm2 logs raphael-backend
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Обновление приложения

### Backend:
```bash
cd /var/www/raphael-mission
git pull
cd server && npm install --production
pm2 restart raphael-backend
```

### Frontend:
```bash
# Локально: npm run build && tar -czf dist.tar.gz dist/ && scp dist.tar.gz user@vps:/tmp/
# На VPS:
cd /tmp && tar -xzf dist.tar.gz
sudo cp -r dist/* /var/www/html/
```

---

## ⚠️ Важные файлы

**На VPS:**
- Backend: `/var/www/raphael-mission/server/`
- Frontend: `/var/www/html/`
- Nginx конфиг: `/etc/nginx/sites-available/raphael-backend`
- PM2 логи: `~/.pm2/logs/`
- PostgreSQL: `/var/lib/postgresql/14/main/`

**Environment:**
- Backend .env: `/var/www/raphael-mission/server/.env`
- Frontend .env: Зашито в build

---

## 🆘 Быстрые фиксы

### Backend не работает:
```bash
pm2 logs raphael-backend --err
pm2 restart raphael-backend
```

### Frontend 404:
```bash
sudo nginx -t
sudo systemctl reload nginx
ls -la /var/www/html/  # Проверить файлы
```

### БД не подключается:
```bash
psql -U raphael_user -d raphael_db -c "SELECT 1;"
# Проверить DATABASE_URL в .env
```

### SSL проблемы:
```bash
sudo certbot renew
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📝 Credentials (заполнить свои)

```env
# PostgreSQL
User: raphael_user
Password: ________________
Database: raphael_db

# Redis
Password: ________________

# JWT
Secret: ________________ (сгенерировать: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Domain
Primary: ________________
WWW: ________________

# VPS
IP: ________________
SSH User: ________________
```

---

## 🔒 Security checklist

- [ ] JWT_SECRET = случайная строка 64+ символов
- [ ] PostgreSQL пароль надёжный
- [ ] Redis пароль установлен
- [ ] UFW firewall включен
- [ ] SSL сертификат установлен
- [ ] NODE_ENV=production в backend .env
- [ ] ALLOWED_ORIGINS = только ваш домен
- [ ] Fail2ban установлен (опционально)

---

Полная инструкция: `DEPLOYMENT_GUIDE.md`
