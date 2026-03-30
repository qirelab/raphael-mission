# Redis Setup Guide

Руководство по установке и настройке Redis для Raphael Mission.

## 🎯 Как это работает

Backend автоматически определяет доступность Redis:
- ✅ **Если Redis доступен** → использует Redis (быстро, персистентно)
- ⚠️ **Если Redis недоступен** → fallback на node-cache (in-memory, работает из коробки)

**Вывод:** Приложение работает в любом случае!

---

## 🪟 Установка Redis на Windows

### Вариант 1: Docker (рекомендуется) ⭐

Самый простой и стабильный способ.

#### 1. Установить Docker Desktop

1. Скачать: https://www.docker.com/products/docker-desktop/
2. Установить и запустить Docker Desktop
3. Дождаться пока Docker запустится (значок кита в системном трее)

#### 2. Запустить Redis контейнер

```bash
# Запустить Redis в Docker
docker run -d --name raphael-redis -p 6379:6379 redis:7-alpine

# Проверить что контейнер работает
docker ps

# Проверить подключение
docker exec -it raphael-redis redis-cli ping
# Ожидаемый ответ: PONG
```

#### 3. Управление контейнером

```bash
# Остановить Redis
docker stop raphael-redis

# Запустить Redis
docker start raphael-redis

# Перезапустить Redis
docker restart raphael-redis

# Удалить контейнер
docker rm -f raphael-redis

# Посмотреть логи
docker logs raphael-redis

# Подключиться к Redis CLI
docker exec -it raphael-redis redis-cli

# Автозапуск при перезагрузке Windows
docker update --restart=always raphael-redis
```

---

### Вариант 2: WSL2 (для продвинутых)

Если у вас уже установлен WSL2:

```bash
# В WSL2 Ubuntu терминале:
sudo apt update
sudo apt install redis-server -y

# Запустить Redis
sudo service redis-server start

# Проверить
redis-cli ping
```

**Недостаток:** Redis остановится при закрытии WSL терминала.

---

### Вариант 3: Memurai (нативный Windows)

Memurai - это Redis-совместимый сервер для Windows.

1. Скачать: https://www.memurai.com/get-memurai
2. Установить как обычную Windows программу
3. Memurai автоматически запустится как Windows Service
4. Готово!

**Плюсы:**
- Нативное Windows приложение
- Работает как Windows Service
- Автозапуск при перезагрузке

**Минусы:**
- Требует установщик
- Бесплатная версия только для разработки

---

## 🐧 Установка Redis на VPS (Ubuntu/Debian)

На Linux установка очень простая:

```bash
# Установка
sudo apt update
sudo apt install redis-server -y

# Запустить и включить автозапуск
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Проверить статус
sudo systemctl status redis-server

# Проверить подключение
redis-cli ping
# Ответ: PONG
```

### Настройка безопасности (Production)

```bash
# Редактировать конфиг
sudo nano /etc/redis/redis.conf

# Добавить пароль (раскомментировать и изменить):
requirepass your_strong_password_here

# Запретить внешние подключения (если Redis на том же сервере):
bind 127.0.0.1 ::1

# Перезапустить Redis
sudo systemctl restart redis-server

# Тест с паролем
redis-cli -a your_strong_password_here ping
```

**В .env на VPS:**
```env
REDIS_URL=redis://:your_strong_password_here@localhost:6379
```

---

## ⚙️ Настройка Backend

### 1. Установка зависимостей

```bash
cd server

# Установить Redis клиент
npm install redis

# Установить node-cache (для fallback)
npm install node-cache
```

### 2. Настройка .env

Убедитесь что в `server/.env` есть:

```env
# Redis Configuration
REDIS_URL=redis://localhost:6379

# Или с паролем:
# REDIS_URL=redis://:your_password@localhost:6379

# Cache TTL (5 минут)
CACHE_TTL_MS=300000
```

### 3. Запуск Backend

```bash
cd server
npm run dev
```

**Если Redis доступен:**
```
✅ Database connection successful
✅ Redis: Connected successfully
✅ Cache: Using Redis
🚀 Server running on port 5000
```

**Если Redis недоступен (автоматический fallback):**
```
✅ Database connection successful
⚠️  Redis: Connection failed, using in-memory cache (node-cache)
✅ Cache: Using node-cache (in-memory)
🚀 Server running on port 5000
```

---

## 🧪 Тестирование Redis

### 1. Проверка подключения

```bash
# С Docker:
docker exec -it raphael-redis redis-cli ping

# Нативно:
redis-cli ping

# Ожидаемый ответ:
PONG
```

### 2. Проверка кеша через Redis CLI

```bash
# Подключиться к Redis
docker exec -it raphael-redis redis-cli
# Или: redis-cli

# Посмотреть все ключи
KEYS *

# Пример вывода после запроса /api/projects/active:
# 1) "projects:active"

# Получить значение ключа
GET "projects:active"

# Узнать TTL ключа (время жизни в секундах)
TTL "projects:active"

# Удалить ключ
DEL "projects:active"

# Очистить весь кеш
FLUSHALL

# Выйти
EXIT
```

### 3. Проверка кеша через API

```bash
# Первый запрос (медленный - идёт в БД)
time curl http://localhost:5000/api/projects/active

# Второй запрос (быстрый - из кеша)
time curl http://localhost:5000/api/projects/active

# Первый запрос: ~50ms
# Второй запрос: ~2ms (в 25 раз быстрее!)
```

### 4. Мониторинг Redis

```bash
# Подключиться к Redis и включить мониторинг
docker exec -it raphael-redis redis-cli MONITOR

# Теперь делайте запросы к API и смотрите что происходит в Redis
# Ctrl+C для выхода

# Статистика Redis
docker exec -it raphael-redis redis-cli INFO stats
```

---

## 🔧 Troubleshooting

### Проблема: Backend не запускается

**Ошибка:**
```
Failed to connect to Redis: connect ECONNREFUSED 127.0.0.1:6379
```

**Решение:**
1. Проверьте что Redis запущен:
   ```bash
   docker ps  # Должен показать raphael-redis
   # или
   redis-cli ping  # Должен ответить PONG
   ```

2. Если Redis не запущен:
   ```bash
   docker start raphael-redis
   ```

3. Если хотите работать без Redis (временно):
   ```bash
   # Закомментируйте в server/.env:
   # REDIS_URL=redis://localhost:6379

   # Backend автоматически использует node-cache
   ```

---

### Проблема: Docker не установлен

**Ошибка:**
```
docker: command not found
```

**Решения:**
1. Установите Docker Desktop (см. Вариант 1 выше)
2. Или используйте node-cache без Redis (работает из коробки):
   ```bash
   # В server/.env закомментировать:
   # REDIS_URL=redis://localhost:6379
   ```

---

### Проблема: Redis занимает много памяти

**Решение - ограничить память:**

```bash
# Остановить старый контейнер
docker stop raphael-redis
docker rm raphael-redis

# Запустить с ограничением 100MB
docker run -d --name raphael-redis -p 6379:6379 \
  -m 100m \
  redis:7-alpine \
  redis-server --maxmemory 100mb --maxmemory-policy allkeys-lru

# allkeys-lru = удалять старые ключи при нехватке памяти
```

---

### Проблема: Кеш не инвалидируется

**Симптом:** Обновили проект в админке, но на сайте старые данные

**Причина:** Кеш не очистился автоматически

**Решение 1 - Очистить кеш вручную:**
```bash
# Очистить все ключи проектов
docker exec -it raphael-redis redis-cli DEL "projects:active"

# Или очистить весь кеш
docker exec -it raphael-redis redis-cli FLUSHALL
```

**Решение 2 - Перезапустить backend (кеш очистится):**
```bash
cd server
npm run dev  # Ctrl+C и заново
```

**Постоянное решение:** В Этапе 5 мы добавим автоматическую cache invalidation при обновлениях.

---

## 📊 Сравнение Redis vs node-cache

| Характеристика | Redis | node-cache |
|---------------|-------|------------|
| Скорость | 🟢 Очень быстро (~1-2ms) | 🟢 Очень быстро (~1-2ms) |
| Персистентность | ✅ Данные сохраняются | ❌ Теряются при перезапуске |
| Установка (Windows) | ⚠️ Требует Docker/WSL | ✅ npm install |
| Установка (Linux) | ✅ 1 команда | ✅ npm install |
| Память | 🟡 Отдельный процесс | 🟢 В процессе Node.js |
| Кластерный режим PM2 | ✅ Общий кеш | ❌ Каждый процесс свой кеш |
| Мониторинг | ✅ redis-cli, GUI tools | ⚠️ Только через API |
| Production-ready | ✅ Да | 🟡 Ограниченно |

**Рекомендация:**
- **Development (Windows):** node-cache (проще)
- **Production (Linux VPS):** Redis (лучше)

---

## 🎯 Рекомендуемая настройка

### Для локальной разработки (Windows):

**Вариант A - С Redis (рекомендуется если есть Docker):**
```bash
# Установить Docker Desktop
# Запустить Redis:
docker run -d --name raphael-redis -p 6379:6379 --restart=always redis:7-alpine

# В server/.env:
REDIS_URL=redis://localhost:6379

# Запустить backend:
cd server
npm run dev
```

**Вариант B - Без Redis (проще):**
```bash
# В server/.env закомментировать:
# REDIS_URL=redis://localhost:6379

# Запустить backend:
cd server
npm run dev
# Вывод: ✅ Cache: Using node-cache (in-memory)
```

### Для production (VPS):

```bash
# На VPS:
sudo apt install redis-server -y
sudo systemctl enable redis-server

# В server/.env:
REDIS_URL=redis://localhost:6379

# Запустить backend:
pm2 start ecosystem.config.js
```

---

## 📝 Полезные команды Redis

```bash
# Подключиться к Redis CLI
docker exec -it raphael-redis redis-cli

# Внутри redis-cli:
PING                    # Проверка подключения
KEYS *                  # Все ключи в кеше
GET key                 # Получить значение
DEL key                 # Удалить ключ
TTL key                 # Время жизни ключа (секунды)
FLUSHALL               # Очистить весь кеш
INFO stats             # Статистика
DBSIZE                 # Количество ключей
MEMORY USAGE key       # Сколько памяти занимает ключ
EXIT                   # Выход
```

---

## 🔗 Полезные ссылки

- **Redis Documentation:** https://redis.io/docs/
- **Docker Redis Image:** https://hub.docker.com/_/redis
- **node-cache:** https://www.npmjs.com/package/node-cache
- **Memurai (Redis для Windows):** https://www.memurai.com/

---

## ✅ Checklist - Что сделать

- [ ] Установить Docker Desktop (или WSL2/Memurai)
- [ ] Запустить Redis контейнер: `docker run -d --name raphael-redis -p 6379:6379 redis:7-alpine`
- [ ] Проверить подключение: `docker exec -it raphael-redis redis-cli ping`
- [ ] Установить зависимости: `npm install redis node-cache`
- [ ] Настроить `server/.env`: `REDIS_URL=redis://localhost:6379`
- [ ] Запустить backend: `npm run dev`
- [ ] Проверить вывод: `✅ Cache: Using Redis`
- [ ] Протестировать кеш: сделать 2 запроса `/api/projects/active`

---

**Создано:** 2024-02-24
**Проект:** Raphael Mission Backend API
