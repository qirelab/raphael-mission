-- ============================================================================
-- Index Verification and Performance Monitoring
-- Version: 002
-- Date: 2024-02-24
-- Description: Verify index creation and monitor performance
-- ============================================================================

-- ============================================================================
-- 1. VERIFY ALL INDEXES EXIST
-- ============================================================================

SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
ORDER BY tablename, indexname;

-- ============================================================================
-- 2. INDEX USAGE STATISTICS
-- ============================================================================

SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
ORDER BY idx_scan DESC;

-- ============================================================================
-- 3. UNUSED INDEXES (after running for a while)
-- ============================================================================

-- Run this after 1-2 weeks of production use to identify unused indexes
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as scans,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND idx_scan = 0
AND indexrelname NOT LIKE '%_pkey'  -- Exclude primary keys
ORDER BY pg_relation_size(indexrelid) DESC;

-- ============================================================================
-- 4. TABLE STATISTICS
-- ============================================================================

SELECT
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    n_live_tup as live_rows,
    n_dead_tup as dead_rows,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
ORDER BY tablename;

-- ============================================================================
-- 5. INDEX BLOAT CHECK
-- ============================================================================

SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as indexes_size
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================================================
-- 6. QUERY PERFORMANCE TESTING
-- ============================================================================

-- Test Projects Queries
EXPLAIN ANALYZE
SELECT * FROM projects
WHERE is_active = true
ORDER BY created_at DESC;

EXPLAIN ANALYZE
SELECT * FROM projects
WHERE slug = 'test-project';

-- Test Shop Queries
EXPLAIN ANALYZE
SELECT * FROM shop_products
WHERE is_active = true
ORDER BY created_at DESC;

-- Test Testimonies Queries
EXPLAIN ANALYZE
SELECT * FROM testimonies
WHERE is_approved = true
ORDER BY created_at DESC
LIMIT 10;

-- Test Training Queries
EXPLAIN ANALYZE
SELECT * FROM training
WHERE is_active = true
ORDER BY created_at DESC;

-- Test Users Queries (Authentication)
EXPLAIN ANALYZE
SELECT id, email, password_hash, name, role, is_active
FROM users
WHERE email = 'test@example.com' AND is_active = true;

-- Test Session Queries
EXPLAIN ANALYZE
SELECT * FROM user_sessions
WHERE id = 'test-session-id'
AND expires_at > NOW();

-- Test Login Attempts (Security)
EXPLAIN ANALYZE
SELECT * FROM login_attempts
WHERE email = 'test@example.com'
AND success = false
AND attempted_at > NOW() - INTERVAL '15 minutes'
ORDER BY attempted_at DESC;

-- ============================================================================
-- 7. CACHE HIT RATIO
-- ============================================================================

SELECT
    'index hit rate' as name,
    CASE
        WHEN idx_blks_hit + idx_blks_read = 0 THEN 0
        ELSE (idx_blks_hit::float / (idx_blks_hit + idx_blks_read)::float) * 100
    END as ratio
FROM pg_statio_user_indexes
WHERE schemaname = 'public'
UNION ALL
SELECT
    'table hit rate' as name,
    CASE
        WHEN heap_blks_hit + heap_blks_read = 0 THEN 0
        ELSE (heap_blks_hit::float / (heap_blks_hit + heap_blks_read)::float) * 100
    END as ratio
FROM pg_statio_user_tables
WHERE schemaname = 'public';

-- ============================================================================
-- 8. SLOW QUERY IDENTIFICATION
-- ============================================================================

-- Enable pg_stat_statements extension first (if not already enabled)
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- View slowest queries (requires pg_stat_statements)
/*
SELECT
    substring(query, 1, 100) as short_query,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time,
    stddev_exec_time
FROM pg_stat_statements
WHERE query LIKE '%projects%' OR query LIKE '%shop%' OR query LIKE '%testimonies%'
OR query LIKE '%training%' OR query LIKE '%users%' OR query LIKE '%sessions%'
ORDER BY mean_exec_time DESC
LIMIT 20;
*/

-- ============================================================================
-- 9. MAINTENANCE RECOMMENDATIONS
-- ============================================================================

-- Check if tables need VACUUM
SELECT
    schemaname,
    tablename,
    n_dead_tup as dead_tuples,
    n_live_tup as live_tuples,
    CASE
        WHEN n_live_tup > 0 THEN (n_dead_tup::float / n_live_tup::float * 100)
        ELSE 0
    END as dead_tuple_percent,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
AND n_dead_tup > 1000  -- Only show tables with significant dead tuples
ORDER BY dead_tuple_percent DESC;

-- ============================================================================
-- 10. REINDEX RECOMMENDATION
-- ============================================================================

-- Check index bloat (simplified estimation)
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) as size,
    CASE
        WHEN idx_scan = 0 THEN 'CONSIDER DROPPING'
        WHEN pg_relation_size(indexrelid) > 10485760 THEN 'CONSIDER REINDEX'  -- > 10MB
        ELSE 'OK'
    END as recommendation
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
ORDER BY pg_relation_size(indexrelid) DESC;

-- ============================================================================
-- EXPECTED RESULTS AFTER MIGRATION
-- ============================================================================

/*
BEFORE INDEXES:
- Projects getActive(): Seq Scan, ~100-500ms
- Projects getBySlug(): Seq Scan, ~50-200ms
- Users login: Seq Scan, ~100-300ms
- Session validation: Seq Scan, ~50-150ms

AFTER INDEXES:
- Projects getActive(): Index Scan, ~5-20ms (90-95% improvement)
- Projects getBySlug(): Index Scan, ~2-10ms (95% improvement)
- Users login: Index Scan, ~5-15ms (90-95% improvement)
- Session validation: Index Scan, ~2-5ms (95% improvement)

MONITORING SCHEDULE:
- Daily: Check cache hit ratio (should be > 95%)
- Weekly: Review unused indexes
- Monthly: Check for index bloat and REINDEX if needed
- Quarterly: Analyze query patterns and adjust indexes
*/

-- ============================================================================
-- QUICK HEALTH CHECK (run this regularly)
-- ============================================================================

SELECT
    'Total Indexes' as metric,
    COUNT(*) as value
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('projects', 'shop_products', 'testimonies', 'training', 'users', 'user_sessions', 'login_attempts', 'contact')
UNION ALL
SELECT
    'Unused Indexes',
    COUNT(*)
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
AND idx_scan = 0
AND indexrelname NOT LIKE '%_pkey'
UNION ALL
SELECT
    'Tables Needing VACUUM',
    COUNT(*)
FROM pg_stat_user_tables
WHERE schemaname = 'public'
AND n_dead_tup > 1000
UNION ALL
SELECT
    'Average Cache Hit Rate',
    AVG(CASE
        WHEN idx_blks_hit + idx_blks_read = 0 THEN 0
        ELSE (idx_blks_hit::float / (idx_blks_hit + idx_blks_read)::float) * 100
    END)::numeric(5,2)
FROM pg_statio_user_indexes
WHERE schemaname = 'public';
