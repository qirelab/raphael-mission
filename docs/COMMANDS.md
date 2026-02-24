# 🔧 Полезные команды

Шпаргалка по командам для разработки и деплоя.

---

## 💻 Локальная разработка

### Backend:

```bash
cd server

# Запуск в режиме разработки
npm run dev

# Прямой запуск без nodemon
node src/server.js

# Проверка подключения к БД
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM projects;"

# Применить миграции
psql -U raphael_user -d raphael_db -f migrations/000_create_tables.sql
psql -U raphael_user -d raphael_db -f migrations/001_add_indexes.sql
psql -U raphael_user -d raphael_db -f migrations/003_insert_sample_data.sql

# Проверка индексов
psql -U raphael_user -d raphael_db -f migrations/002_verify_indexes.sql

# Экспорт БД
pg_dump -U raphael_user -d raphael_db > backup.sql

# Импорт БД
psql -U raphael_user -d raphael_db -f backup.sql
```

### Frontend:

```bash
# Запуск dev сервера
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Проверка типов
npm run type-check  # если есть TypeScript
```

### PostgreSQL:

```bash
# Подключиться к БД
psql -U raphael_user -d raphael_db

# Список таблиц
\dt

# Описание таблицы
\d projects

# Список индексов
\di

# Выполнить SQL файл
\i path/to/file.sql

# Выйти
\q

# Одна команда
psql -U raphael_user -d raphael_db -c "SELECT * FROM projects LIMIT 5;"
```

### Redis (если используется):

```bash
# Docker Redis
docker run -d --name raphael-redis -p 6379:6379 --restart=always redis:7-alpine
docker start raphael-redis
docker stop raphael-redis
docker logs raphael-redis

# Redis CLI
docker exec -it raphael-redis redis-cli
# или нативно:
redis-cli

# Внутри redis-cli:
PING                           # Проверка
KEYS *                         # Все ключи
GET "projects:active"          # Получить значение
DEL "projects:active"          # Удалить ключ
FLUSHALL                       # Очистить всё
TTL "projects:active"          # Время жизни
INFO stats                     # Статистика
EXIT                           # Выход
```

---

## 🚀 Production (VPS)

### PM2:

```bash
# Запуск
pm2 start ecosystem.config.js
pm2 start src/server.js --name raphael-backend

# Управление
pm2 restart raphael-backend
pm2 stop raphael-backend
pm2 delete raphael-backend
pm2 reload raphael-backend      # Graceful reload

# Мониторинг
pm2 status
pm2 list
pm2 monit                       # Интерактивный мониторинг
pm2 logs raphael-backend        # Все логи
pm2 logs raphael-backend --err  # Только ошибки
pm2 logs --lines 100            # Последние 100 строк

# Автозапуск
pm2 save
pm2 startup
pm2 unstartup                   # Удалить автозапуск

# Полезное
pm2 flush                       # Очистить логи
pm2 reset raphael-backend       # Сбросить счётчики
pm2 describe raphael-backend    # Подробная информация
```

### Nginx:

```bash
# Управление
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx       # Без остановки
sudo systemctl status nginx

# Проверка конфигурации
sudo nginx -t

# Редактирование конфига
sudo nano /etc/nginx/sites-available/raphael-backend

# Активация/деактивация сайта
sudo ln -s /etc/nginx/sites-available/raphael-backend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/raphael-backend

# Логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log | grep "POST"

# Тест производительности
ab -n 1000 -c 10 https://yourdomain.com/api/projects
```

### PostgreSQL:

```bash
# Управление сервисом
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl restart postgresql
sudo systemctl status postgresql

# Подключение
sudo -u postgres psql
psql -U raphael_user -d raphael_db

# Бэкап
pg_dump -U raphael_user raphael_db > backup_$(date +%Y%m%d).sql
pg_dump -U raphael_user raphael_db | gzip > backup_$(date +%Y%m%d).sql.gz

# Восстановление
psql -U raphael_user -d raphael_db -f backup.sql
gunzip -c backup.sql.gz | psql -U raphael_user -d raphael_db

# Автоматический бэкап (cron)
crontab -e
# Добавить: 0 2 * * * pg_dump -U raphael_user raphael_db | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz

# Логи
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Производительность
psql -U raphael_user -d raphael_db -c "SELECT * FROM pg_stat_activity;"
psql -U raphael_user -d raphael_db -c "SELECT * FROM pg_stat_user_tables;"
```

### Redis:

```bash
# Управление
sudo systemctl start redis-server
sudo systemctl stop redis-server
sudo systemctl restart redis-server
sudo systemctl status redis-server

# CLI
redis-cli -a your_password ping
redis-cli -a your_password INFO stats
redis-cli -a your_password MONITOR      # Смотреть команды в реальном времени

# Логи
sudo tail -f /var/log/redis/redis-server.log

# Конфиг
sudo nano /etc/redis/redis.conf
```

### SSL (Certbot):

```bash
# Получить/обновить сертификат
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Обновить все сертификаты
sudo certbot renew

# Тест обновления
sudo certbot renew --dry-run

# Список сертификатов
sudo certbot certificates

# Удалить сертификат
sudo certbot delete --cert-name yourdomain.com

# Автоматическое обновление (проверить)
sudo systemctl status certbot.timer
```

### Git:

```bash
# Обновление кода
cd /var/www/raphael-mission
git pull origin main

# Проверка изменений
git status
git log --oneline -10

# Откатить изменения
git reset --hard HEAD
git clean -fd

# Переключить ветку
git checkout develop
git pull

# Клонирование
git clone https://github.com/your-repo/raphael-mission.git
```

### Файловая система:

```bash
# Навигация
cd /var/www/raphael-mission/server
ls -la
pwd

# Копирование
cp source.txt destination.txt
cp -r source_dir/ destination_dir/

# Перемещение/переименование
mv old_name.txt new_name.txt

# Удаление
rm file.txt
rm -rf directory/

# Права доступа
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Просмотр файла
cat file.txt
less file.txt
head -n 20 file.txt
tail -n 20 file.txt
tail -f log.txt                 # Следить за изменениями

# Поиск файлов
find /var/www -name "*.js"
grep -r "DATABASE_URL" /var/www/raphael-mission/server/

# Дисковое пространство
df -h
du -sh /var/www/raphael-mission
```

### Мониторинг системы:

```bash
# Процессор и память
top
htop                            # Интерактивный (требует установки)
free -h                         # Память
uptime                          # Аптайм и нагрузка

# Диск
df -h                           # Свободное место
du -sh *                        # Размер папок

# Сеть
netstat -tulpn                  # Открытые порты
ss -tulpn                       # Альтернатива netstat
curl ifconfig.me                # Внешний IP

# Процессы
ps aux | grep node
ps aux | grep nginx
ps aux | grep postgres

# Убить процесс
kill -9 <PID>
pkill -f node
```

### Firewall (UFW):

```bash
# Управление
sudo ufw enable
sudo ufw disable
sudo ufw status
sudo ufw status verbose

# Правила
sudo ufw allow 22/tcp           # SSH
sudo ufw allow 80/tcp           # HTTP
sudo ufw allow 443/tcp          # HTTPS
sudo ufw allow from 192.168.1.0/24  # Разрешить подсеть

# Удалить правило
sudo ufw delete allow 80/tcp

# Сброс всех правил
sudo ufw reset
```

---

## 📦 NPM команды

```bash
# Установка
npm install
npm install --production        # Только production зависимости
npm install package-name
npm install -g package-name     # Глобально
npm install --save-dev package-name  # Dev зависимость

# Обновление
npm update
npm update package-name
npm outdated                    # Показать устаревшие

# Удаление
npm uninstall package-name
npm prune                       # Удалить неиспользуемые

# Проверка
npm list
npm list --depth=0              # Только топ-уровень
npm audit                       # Проверка уязвимостей
npm audit fix                   # Исправить уязвимости

# Очистка
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Диагностика проблем

### Backend не работает:

```bash
# Проверить что запущен
pm2 status

# Логи
pm2 logs raphael-backend --err --lines 50

# Проверить порт
netstat -tulpn | grep :6388
curl http://localhost:6388/health

# Проверить .env
cat /var/www/raphael-mission/server/.env | grep DATABASE_URL

# Ручной запуск для диагностики
cd /var/www/raphael-mission/server
node src/server.js
```

### Frontend не загружается:

```bash
# Проверить Nginx
sudo nginx -t
sudo systemctl status nginx

# Проверить файлы
ls -la /var/www/html/
cat /var/www/html/index.html

# Логи Nginx
sudo tail -f /var/log/nginx/error.log

# Проверить DNS
nslookup yourdomain.com
ping yourdomain.com

# Тест локально
curl http://localhost/
curl https://localhost/
```

### БД не работает:

```bash
# Проверить сервис
sudo systemctl status postgresql

# Попытка подключения
psql -U raphael_user -d raphael_db -c "SELECT 1;"

# Логи
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Проверить процесс
ps aux | grep postgres

# Перезапуск
sudo systemctl restart postgresql
```

### Redis проблемы:

```bash
# Проверить сервис
sudo systemctl status redis-server

# Тест
redis-cli -a password ping

# Логи
sudo tail -f /var/log/redis/redis-server.log

# Очистить кеш
redis-cli -a password FLUSHALL

# Проверить память
redis-cli -a password INFO memory
```

### SSL проблемы:

```bash
# Проверить сертификат
sudo certbot certificates
openssl s_client -connect yourdomain.com:443

# Обновить
sudo certbot renew --force-renewal

# Проверить Nginx конфиг для SSL
sudo cat /etc/nginx/sites-available/raphael-backend | grep ssl

# Логи Certbot
sudo journalctl -u certbot -n 50
```

---

## 🛠️ Быстрые фиксы

```bash
# Перезапустить всё
pm2 restart all
sudo systemctl restart nginx
sudo systemctl restart postgresql
sudo systemctl restart redis-server

# Очистить кеш
redis-cli -a password FLUSHALL
pm2 flush

# Проверить места на диске
df -h
sudo du -sh /var/log/*
sudo journalctl --vacuum-time=3d  # Очистить старые логи

# Обновить зависимости
cd /var/www/raphael-mission/server
npm install --production

# Применить индексы БД
psql -U raphael_user -d raphael_db -f migrations/001_add_indexes.sql
```

---

## 📝 Шаблоны команд

### Полный перезапуск приложения:

```bash
cd /var/www/raphael-mission
git pull
cd server && npm install --production
pm2 restart raphael-backend
pm2 logs raphael-backend --lines 20
```

### Бэкап всего:

```bash
# БД
pg_dump -U raphael_user raphael_db | gzip > /backup/db_$(date +%Y%m%d).sql.gz

# Код
tar -czf /backup/code_$(date +%Y%m%d).tar.gz /var/www/raphael-mission

# .env файлы
cp /var/www/raphael-mission/server/.env /backup/env_backup_$(date +%Y%m%d)
```

### Восстановление из бэкапа:

```bash
# БД
gunzip -c /backup/db_20240225.sql.gz | psql -U raphael_user -d raphael_db

# Код
cd /var/www
sudo rm -rf raphael-mission
tar -xzf /backup/code_20240225.tar.gz

# Перезапуск
cd /var/www/raphael-mission/server
pm2 restart raphael-backend
```

---

Полное руководство: `DEPLOYMENT_GUIDE.md`
Checklist: `DEPLOYMENT_CHECKLIST.md`
