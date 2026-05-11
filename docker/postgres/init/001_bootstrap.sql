\echo 'Applying migrations for Raphael Mission...'
\i /docker-entrypoint-initdb.d/migrations/000_create_tables.sql
\i /docker-entrypoint-initdb.d/migrations/001_add_indexes.sql
\i /docker-entrypoint-initdb.d/migrations/003_insert_sample_data.sql
\i /docker-entrypoint-initdb.d/migrations/004_update_testimonies_schema.sql
\echo 'Migrations applied.'
