# Database Migrations

Этот каталог содержит SQL миграции для оптимизации производительности базы данных Raphael Mission.

## Файлы миграций

### 001_add_indexes.sql
**Назначение:** Создание всех performance-критичных индексов
**Версия:** 001
**Дата:** 2024-02-24
**Индексы:** 24 индекса для 8 таблиц
**Ожидаемое улучшение:** 90-95% для индексированных запросов

### 002_verify_indexes.sql
**Назначение:** Проверка и мониторинг индексов
**Содержит:**
- Проверку существования индексов
- Статистику использования индексов
- Мониторинг производительности
- Рекомендации по обслуживанию

---

## Применение миграций

### Локальная разработка

```bash
# 1. Подключитесь к базе данных
psql -U raphael_user -d raphael_db

# 2. Примените миграцию
\i server/migrations/001_add_indexes.sql

# 3. Проверьте результат
\i server/migrations/002_verify_indexes.sql

# 4. Выйдите
\q
```

### Production (VPS)

```bash
# 1. Скопируйте файлы на VPS (если ещё не в репозитории)
scp server/migrations/*.sql user@your-vps:/var/www/raphael-mission/server/migrations/

# 2. На VPS подключитесь к базе
ssh user@your-vps
psql -U raphael_user -d raphael_db

# 3. Примените миграцию
\i /var/www/raphael-mission/server/migrations/001_add_indexes.sql

# 4. Проверьте
\i /var/www/raphael-mission/server/migrations/002_verify_indexes.sql
```

### Через командную строку (без psql интерактивного режима)

```bash
# Локально
psql -U raphael_user -d raphael_db -f server/migrations/001_add_indexes.sql
psql -U raphael_user -d raphael_db -f server/migrations/002_verify_indexes.sql

# На VPS
psql -U raphael_user -d raphael_db -f /var/www/raphael-mission/server/migrations/001_add_indexes.sql
```

---

## Созданные индексы

### 📊 Projects (5 индексов)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_projects_slug` | UNIQUE | HIGH | URL routing через slug |
| `idx_projects_active_created` | COMPOSITE | HIGH | getActive() - самый частый запрос |
| `idx_projects_active` | SIMPLE | MEDIUM | Фильтр активных проектов |
| `idx_projects_order_index` | SIMPLE | MEDIUM | Сортировка для отображения |
| `idx_projects_created` | SIMPLE | LOW | Сортировка по дате создания |

### 🛒 Shop Products (4 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_shop_products_active_created` | COMPOSITE | HIGH | getActive() - каталог товаров |
| `idx_shop_products_active` | SIMPLE | MEDIUM | Фильтр активных товаров |
| `idx_shop_products_stock` | PARTIAL | LOW | Только товары в наличии |
| `idx_shop_products_price` | SIMPLE | LOW | Сортировка по цене |

### 💬 Testimonies (3 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_testimonies_approved_created` | COMPOSITE | HIGH | getApproved() - публичные отзывы |
| `idx_testimonies_approved` | SIMPLE | MEDIUM | Фильтр одобренных |
| `idx_testimonies_rating` | SIMPLE | LOW | Сортировка по рейтингу |

### 📚 Training (3 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_training_active_created` | COMPOSITE | HIGH | getActive() - активные программы |
| `idx_training_level` | SIMPLE | MEDIUM | Фильтр по уровню сложности |
| `idx_training_price` | SIMPLE | MEDIUM | Сортировка по цене |

### 👤 Users (3 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_users_email` | UNIQUE | HIGH | Аутентификация (login) |
| `idx_users_active_email` | COMPOSITE | HIGH | signIn() оптимизация |
| `idx_users_role` | SIMPLE | MEDIUM | Фильтр по роли |

### 🔐 User Sessions (3 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_user_sessions_user_id` | SIMPLE | HIGH | Foreign key performance |
| `idx_user_sessions_id_expires` | COMPOSITE PARTIAL | HIGH | Валидация активных сессий |
| `idx_user_sessions_expires` | SIMPLE | MEDIUM | Очистка истёкших сессий |

### 🔒 Login Attempts (2 индекса)

| Индекс | Тип | Приоритет | Назначение |
|--------|-----|-----------|------------|
| `idx_login_attempts_email_success_time` | COMPOSITE | HIGH | Отслеживание неудачных попыток входа |
| `idx_login_attempts_time` | SIMPLE | MEDIUM | Очистка старых попыток |

### 📞 Contact (0 индексов)

Таблица содержит 1 строку, индексы не требуются.

---

## Проверка результатов

### Сразу после применения

```sql
-- Проверить что все индексы созданы (должно быть 24)
SELECT COUNT(*) FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts');

-- Посмотреть список всех индексов
SELECT tablename, indexname FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts')
ORDER BY tablename, indexname;
```

### Тест производительности (BEFORE vs AFTER)

```sql
-- До создания индексов: Seq Scan (медленно)
EXPLAIN ANALYZE SELECT * FROM projects WHERE is_active = true ORDER BY created_at DESC;
-- Expected: Seq Scan on projects, ~100-500ms

-- После создания индексов: Index Scan (быстро)
EXPLAIN ANALYZE SELECT * FROM projects WHERE is_active = true ORDER BY created_at DESC;
-- Expected: Index Scan using idx_projects_active_created, ~5-20ms (90-95% improvement)
```

---

## Мониторинг производительности

### Ежедневный health check

```sql
-- Быстрая проверка здоровья индексов
SELECT
    'Total Indexes' as metric,
    COUNT(*) as value
FROM pg_indexes
WHERE schemaname = 'public'
UNION ALL
SELECT
    'Unused Indexes',
    COUNT(*)
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND idx_scan = 0
AND indexrelname NOT LIKE '%_pkey';
```

### Еженедельный отчёт

```sql
-- Запустить полный verification script
\i server/migrations/002_verify_indexes.sql

-- Обратить внимание на:
-- 1. Index Usage Statistics - все HIGH priority индексы должны использоваться
-- 2. Cache Hit Ratio - должен быть > 95%
-- 3. Unused Indexes - если индекс не используется 2+ недели, рассмотреть удаление
```

### Ежемесячное обслуживание

```bash
# 1. Проверить bloat
psql -U raphael_user -d raphael_db -c "
SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

# 2. VACUUM если много dead tuples
psql -U raphael_user -d raphael_db -c "VACUUM ANALYZE;"

# 3. REINDEX если индексы раздулись (> 100MB)
psql -U raphael_user -d raphael_db -c "REINDEX DATABASE raphael_db;"
```

---

## Откат миграции (Rollback)

Если нужно удалить все индексы:

```sql
-- Раскомментировать и выполнить ROLLBACK секцию из 001_add_indexes.sql
DROP INDEX IF EXISTS idx_projects_slug;
DROP INDEX IF EXISTS idx_projects_active_created;
-- ... остальные 22 индекса
```

Или выполнить автоматически:

```bash
# Создать rollback скрипт
cat > server/migrations/rollback_001.sql << 'EOF'
DROP INDEX IF EXISTS idx_projects_slug;
DROP INDEX IF EXISTS idx_projects_active_created;
DROP INDEX IF EXISTS idx_projects_active;
DROP INDEX IF EXISTS idx_projects_order_index;
DROP INDEX IF EXISTS idx_projects_created;
DROP INDEX IF EXISTS idx_shop_products_active_created;
DROP INDEX IF EXISTS idx_shop_products_active;
DROP INDEX IF EXISTS idx_shop_products_stock;
DROP INDEX IF EXISTS idx_shop_products_price;
DROP INDEX IF EXISTS idx_testimonies_approved_created;
DROP INDEX IF EXISTS idx_testimonies_approved;
DROP INDEX IF EXISTS idx_testimonies_rating;
DROP INDEX IF EXISTS idx_training_active_created;
DROP INDEX IF EXISTS idx_training_level;
DROP INDEX IF EXISTS idx_training_price;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_active_email;
DROP INDEX IF EXISTS idx_users_role;
DROP INDEX IF EXISTS idx_user_sessions_user_id;
DROP INDEX IF EXISTS idx_user_sessions_id_expires;
DROP INDEX IF EXISTS idx_user_sessions_expires;
DROP INDEX IF EXISTS idx_login_attempts_email_success_time;
DROP INDEX IF EXISTS idx_login_attempts_time;
EOF

# Применить rollback
psql -U raphael_user -d raphael_db -f server/migrations/rollback_001.sql
```

---

## Ожидаемые результаты

### Производительность (BEFORE → AFTER)

| Запрос | До индексов | После индексов | Улучшение |
|--------|-------------|----------------|-----------|
| `projects.getActive()` | 100-500ms (Seq Scan) | 5-20ms (Index Scan) | **90-95%** |
| `projects.getBySlug()` | 50-200ms (Seq Scan) | 2-10ms (Index Scan) | **95%** |
| `users.login` | 100-300ms (Seq Scan) | 5-15ms (Index Scan) | **90-95%** |
| `sessions.validate` | 50-150ms (Seq Scan) | 2-5ms (Index Scan) | **95%** |
| `shop.getActive()` | 80-400ms (Seq Scan) | 5-15ms (Index Scan) | **90-95%** |
| `testimonies.getApproved()` | 70-300ms (Seq Scan) | 5-12ms (Index Scan) | **90%** |

### Размер индексов (примерная оценка)

| Таблица | Индексы | Размер индексов |
|---------|---------|-----------------|
| projects | 5 | ~500 KB |
| shop_products | 4 | ~400 KB |
| testimonies | 3 | ~300 KB |
| training | 3 | ~250 KB |
| users | 3 | ~100 KB |
| user_sessions | 3 | ~200 KB |
| login_attempts | 2 | ~150 KB |
| **TOTAL** | **23** | **~2 MB** |

Размер индексов минимален, а выигрыш в производительности огромен!

---

## Best Practices

### ✅ DO (Рекомендуется)

1. **Мониторить регулярно:**
   - Ежедневно: cache hit ratio
   - Еженедельно: unused indexes
   - Ежемесячно: bloat и REINDEX

2. **VACUUM регулярно:**
   ```sql
   -- Автоматически каждую ночь (настроить в cron)
   VACUUM ANALYZE;
   ```

3. **Анализировать медленные запросы:**
   ```sql
   -- Включить pg_stat_statements
   CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
   ```

4. **Обновлять статистику после больших изменений:**
   ```sql
   ANALYZE projects;
   ANALYZE shop_products;
   -- и т.д.
   ```

### ❌ DON'T (Избегать)

1. **Не создавайте индексы "на всякий случай"** - каждый индекс замедляет INSERT/UPDATE/DELETE

2. **Не создавайте дублирующиеся индексы:**
   ```sql
   -- Плохо:
   CREATE INDEX idx_projects_active ON projects(is_active);
   CREATE INDEX idx_projects_active_2 ON projects(is_active, id);  -- ДУБЛИКАТ!
   ```

3. **Не индексируйте маленькие таблицы** (< 1000 строк) - Seq Scan будет быстрее

4. **Не забывайте удалять неиспользуемые индексы:**
   ```sql
   -- Если idx_scan = 0 в течение 1+ месяца
   DROP INDEX unused_index_name;
   ```

---

## Troubleshooting

### Индекс не используется

**Проблема:** EXPLAIN ANALYZE показывает Seq Scan вместо Index Scan

**Решения:**
1. Обновить статистику: `ANALYZE table_name;`
2. Проверить размер таблицы: если < 1000 строк, Postgres может предпочесть Seq Scan
3. Проверить селективность: индекс на колонке с 2-3 уникальными значениями малоэффективен
4. Увеличить `random_page_cost` в postgresql.conf для SSD дисков

### Медленные INSERT/UPDATE

**Проблема:** После добавления индексов INSERT стал медленнее

**Решения:**
1. Это нормально - индексы требуют обновления при изменении данных
2. Если критично, рассмотреть удаление LOW priority индексов
3. Использовать batch INSERT для массовых операций
4. Временно отключать индексы при импорте больших объёмов данных:
   ```sql
   DROP INDEX idx_name;
   -- Импорт данных
   CREATE INDEX idx_name ON table(column);
   ```

### Index bloat

**Проблема:** Индекс раздулся и занимает > 100 MB

**Решение:**
```sql
-- REINDEX конкретной таблицы
REINDEX TABLE projects;

-- Или всей базы (требует EXCLUSIVE LOCK)
REINDEX DATABASE raphael_db;

-- Или CONCURRENTLY (без блокировки, но дольше)
REINDEX INDEX CONCURRENTLY idx_projects_active_created;
```

---

## Дополнительные ресурсы

- [PostgreSQL Indexes Documentation](https://www.postgresql.org/docs/current/indexes.html)
- [Index Performance Tips](https://www.postgresql.org/docs/current/indexes-types.html)
- [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- [Maintenance Tasks](https://www.postgresql.org/docs/current/maintenance.html)

---

## История изменений

| Версия | Дата | Изменения |
|--------|------|-----------|
| 001 | 2024-02-24 | Создание 24 индексов для всех таблиц |
| 002 | 2024-02-24 | Verification и monitoring скрипты |

---

## Контакты

Для вопросов по миграциям и производительности БД обращайтесь к:
- Backend документации: `server/README.md`
- Security Audit: `SECURITY_AUDIT.md`
- Setup Guide: `SETUP.md`
