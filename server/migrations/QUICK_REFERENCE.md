# Database Performance - Quick Reference

Быстрая справка по мониторингу и обслуживанию индексов БД.

---

## 🚀 Быстрый старт

### Применить индексы

```bash
# Локально
psql -U raphael_user -d raphael_db -f server/migrations/001_add_indexes.sql

# Production VPS
psql -U raphael_user -d raphael_db -f /var/www/raphael-mission/server/migrations/001_add_indexes.sql
```

### Проверить результат

```bash
psql -U raphael_user -d raphael_db -f server/migrations/002_verify_indexes.sql
```

---

## 📊 Ежедневные проверки (1 минута)

```sql
-- Подключиться к БД
psql -U raphael_user -d raphael_db

-- 1. Количество индексов (должно быть >= 23)
SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';

-- 2. Cache hit ratio (должен быть > 95%)
SELECT
    ROUND((SUM(idx_blks_hit)::float / NULLIF(SUM(idx_blks_hit + idx_blks_read), 0)) * 100, 2) as cache_hit_percent
FROM pg_statio_user_indexes
WHERE schemaname = 'public';

-- 3. Dead tuples (если > 10%, нужен VACUUM)
SELECT
    schemaname,
    tablename,
    n_dead_tup,
    ROUND((n_dead_tup::float / NULLIF(n_live_tup, 0)) * 100, 2) as dead_percent
FROM pg_stat_user_tables
WHERE schemaname = 'public'
AND n_dead_tup > 100
ORDER BY dead_percent DESC;
```

---

## 📈 Еженедельные проверки (5 минут)

```sql
-- 1. Top используемые индексы
SELECT
    tablename,
    indexname,
    idx_scan as scans,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC
LIMIT 10;

-- 2. Неиспользуемые индексы (кандидаты на удаление)
SELECT
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND idx_scan = 0
AND indexrelname NOT LIKE '%_pkey';

-- 3. Самые медленные запросы (если pg_stat_statements включён)
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
/*
SELECT
    substring(query, 1, 80) as query,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_ms,
    ROUND(total_exec_time::numeric, 2) as total_ms
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_%'
ORDER BY mean_exec_time DESC
LIMIT 10;
*/
```

---

## 🔧 Ежемесячное обслуживание (10 минут)

```bash
# 1. VACUUM всей БД
psql -U raphael_user -d raphael_db -c "VACUUM ANALYZE;"

# 2. Проверить размеры таблиц и индексов
psql -U raphael_user -d raphael_db << 'EOF'
SELECT
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as indexes_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
EOF

# 3. REINDEX если индексы раздулись (> 100MB)
# ТОЛЬКО ЕСЛИ НЕОБХОДИМО!
# psql -U raphael_user -d raphael_db -c "REINDEX DATABASE raphael_db;"
```

---

## 🎯 Тестирование производительности

### Тест BEFORE vs AFTER

```sql
-- Проекты (должен использовать idx_projects_active_created)
EXPLAIN ANALYZE
SELECT * FROM projects
WHERE is_active = true
ORDER BY created_at DESC;

-- Slug lookup (должен использовать idx_projects_slug)
EXPLAIN ANALYZE
SELECT * FROM projects
WHERE slug = 'existing-slug';

-- Аутентификация (должен использовать idx_users_active_email)
EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'test@example.com' AND is_active = true;

-- Session validation (должен использовать idx_user_sessions_id_expires)
EXPLAIN ANALYZE
SELECT * FROM user_sessions
WHERE id = 'some-session-id' AND expires_at > NOW();
```

### Интерпретация EXPLAIN ANALYZE

```
Хорошо ✅:
  Index Scan using idx_projects_active_created on projects (cost=0.15..12.17 rows=5 width=500) (actual time=0.025..0.150 rows=5 loops=1)
  Planning Time: 0.123 ms
  Execution Time: 0.234 ms

Плохо ❌:
  Seq Scan on projects (cost=0.00..150.00 rows=5 width=500) (actual time=12.345..124.567 rows=5 loops=1)
  Planning Time: 0.123 ms
  Execution Time: 125.890 ms
```

**Ключевые метрики:**
- `Index Scan` vs `Seq Scan` - Index быстрее в 10-100 раз
- `Execution Time` - основная метрика (< 20ms хорошо, > 100ms плохо)
- `actual time` - реальное время выполнения

---

## ⚠️ Troubleshooting

### Проблема: Индекс не используется

```sql
-- 1. Проверить что индекс существует
SELECT indexname FROM pg_indexes
WHERE tablename = 'projects' AND indexname = 'idx_projects_active_created';

-- 2. Обновить статистику
ANALYZE projects;

-- 3. Проверить размер таблицы (если < 1000 строк, Postgres может игнорировать индекс)
SELECT COUNT(*) FROM projects;

-- 4. Проверить EXPLAIN ANALYZE снова
EXPLAIN ANALYZE SELECT * FROM projects WHERE is_active = true ORDER BY created_at DESC;
```

### Проблема: Медленные INSERT/UPDATE

```sql
-- Проверить сколько индексов на таблице (> 10 может быть много)
SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'your_table';

-- Временное решение: DROP индексов LOW priority
-- DROP INDEX idx_projects_created;

-- Для массового импорта:
-- 1. DROP индексы
-- 2. Импорт данных
-- 3. CREATE индексы обратно
```

### Проблема: Index bloat

```sql
-- Проверить размер индекса
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexrelname::regclass))
FROM pg_indexes
WHERE tablename = 'projects';

-- Если > 100MB, выполнить REINDEX
REINDEX INDEX CONCURRENTLY idx_projects_active_created;
-- или
REINDEX TABLE projects;
```

### Проблема: Низкий cache hit ratio (< 90%)

```sql
-- Увеличить shared_buffers в postgresql.conf
-- Редактировать: sudo nano /etc/postgresql/15/main/postgresql.conf
-- shared_buffers = 256MB  # Увеличить до 25% RAM

-- Перезапустить PostgreSQL
-- sudo systemctl restart postgresql
```

---

## 🔍 Полезные команды psql

```bash
# Подключиться к БД
psql -U raphael_user -d raphael_db

# Внутри psql:
\dt                    # Список таблиц
\di                    # Список индексов
\d+ projects           # Детальная информация о таблице
\timing on             # Показывать время выполнения
\x auto                # Автоматический expanded mode для широких таблиц
\q                     # Выйти
```

---

## 📝 Cheat Sheet - SQL команды

```sql
-- Создать индекс
CREATE INDEX idx_name ON table(column);
CREATE INDEX idx_name ON table(col1, col2 DESC);  -- Composite
CREATE UNIQUE INDEX idx_name ON table(column);     -- Unique
CREATE INDEX idx_name ON table(column) WHERE condition;  -- Partial

-- Удалить индекс
DROP INDEX idx_name;
DROP INDEX CONCURRENTLY idx_name;  -- Без блокировки (медленнее)

-- REINDEX
REINDEX INDEX idx_name;
REINDEX INDEX CONCURRENTLY idx_name;  -- Без блокировки
REINDEX TABLE table_name;
REINDEX DATABASE database_name;

-- VACUUM
VACUUM table_name;
VACUUM ANALYZE table_name;
VACUUM FULL table_name;  -- Полная очистка (блокирует таблицу!)

-- Статистика
ANALYZE table_name;
SELECT * FROM pg_stat_user_indexes WHERE tablename = 'projects';
SELECT * FROM pg_stat_user_tables WHERE tablename = 'projects';
```

---

## 🎨 Цветовая индикация метрик

### Execution Time:
- 🟢 **< 20ms** - Отлично
- 🟡 **20-100ms** - Приемлемо
- 🟠 **100-500ms** - Медленно, требует оптимизации
- 🔴 **> 500ms** - Критично медленно!

### Cache Hit Ratio:
- 🟢 **> 95%** - Отлично
- 🟡 **90-95%** - Хорошо
- 🟠 **80-90%** - Увеличить shared_buffers
- 🔴 **< 80%** - Проблема!

### Dead Tuples %:
- 🟢 **< 5%** - Отлично
- 🟡 **5-10%** - Нормально
- 🟠 **10-20%** - Запланировать VACUUM
- 🔴 **> 20%** - Срочно нужен VACUUM!

### Index Scans:
- 🟢 **> 1000/день** - Активно используется
- 🟡 **100-1000/день** - Используется
- 🟠 **10-100/день** - Редко используется
- 🔴 **0** - Не используется (кандидат на удаление)

---

## 📞 Когда обращаться за помощью

1. **Cache hit ratio < 80%** в течение нескольких дней
2. **Execution time > 500ms** для критичных запросов
3. **Unused indexes** занимают > 100MB
4. **Dead tuples > 30%** на больших таблицах
5. **Disk space usage** растёт > 10GB/месяц

---

## 🔗 Полезные ресурсы

- **Полная документация:** `server/migrations/README.md`
- **Verification скрипт:** `server/migrations/002_verify_indexes.sql`
- **Security audit:** `SECURITY_AUDIT.md`
- **Setup guide:** `SETUP.md`
- **PostgreSQL Docs:** https://www.postgresql.org/docs/current/indexes.html

---

**Последнее обновление:** 2024-02-24
**Версия:** 1.0
