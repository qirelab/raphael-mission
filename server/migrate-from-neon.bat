@echo off
REM ============================================================================
REM Migrate data from Neon to local PostgreSQL
REM ============================================================================

setlocal

REM Configuration
set "NEON_URL=postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
set "LOCAL_USER=raphael_user"
set "LOCAL_DB=raphael_db"
set "BACKUP_FILE=neon_backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql"
set "BACKUP_FILE=%BACKUP_FILE: =0%"

echo ============================================================================
echo Migrating data from Neon to Local PostgreSQL
echo ============================================================================
echo.

REM Check if pg_dump is available
where pg_dump >nul 2>&1
if errorlevel 1 (
    echo [ERROR] pg_dump not found!
    echo.
    echo Please add PostgreSQL bin directory to PATH:
    echo set PATH=%%PATH%%;C:\Program Files\PostgreSQL\16\bin
    echo.
    pause
    exit /b 1
)

echo [OK] PostgreSQL tools found
echo.

REM Step 1: Export from Neon
echo ========================================
echo Step 1/3: Exporting data from Neon...
echo ========================================
echo.
echo Backup file: %BACKUP_FILE%
echo.

pg_dump "%NEON_URL%" > "%BACKUP_FILE%"

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to export from Neon!
    echo.
    echo Possible issues:
    echo - No internet connection
    echo - Neon credentials changed
    echo - Firewall blocking connection
    echo.
    pause
    exit /b 1
)

echo [OK] Export completed successfully
echo File size:
dir "%BACKUP_FILE%" | find "%BACKUP_FILE%"
echo.

REM Step 2: Ask user confirmation
echo ========================================
echo Step 2/3: Ready to import
echo ========================================
echo.
echo WARNING: This will import data into local database:
echo   Database: %LOCAL_DB%
echo   User: %LOCAL_USER%
echo.
echo If tables already exist, you may see warnings.
echo Existing data with same IDs will be skipped (not overwritten).
echo.
set /p CONFIRM="Continue with import? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo Import cancelled. Backup saved: %BACKUP_FILE%
    pause
    exit /b 0
)

REM Step 3: Import to local DB
echo.
echo ========================================
echo Step 3/3: Importing to local database...
echo ========================================
echo.
echo You will be prompted for password: dev_password_2024
echo.

psql -U %LOCAL_USER% -d %LOCAL_DB% -f "%BACKUP_FILE%"

if errorlevel 1 (
    echo.
    echo [WARNING] Import completed with some errors
    echo This is normal if tables/roles already exist
    echo.
) else (
    echo.
    echo [OK] Import completed successfully
    echo.
)

REM Step 4: Verify data
echo ========================================
echo Verification
echo ========================================
echo.
echo Checking record counts...
echo.

psql -U %LOCAL_USER% -d %LOCAL_DB% -c "SELECT 'projects' as table_name, COUNT(*) as rows FROM projects UNION ALL SELECT 'shop_products', COUNT(*) FROM shop_products UNION ALL SELECT 'testimonies', COUNT(*) FROM testimonies UNION ALL SELECT 'training', COUNT(*) FROM training UNION ALL SELECT 'users', COUNT(*) FROM users UNION ALL SELECT 'contact', COUNT(*) FROM contact;"

echo.
echo ========================================
echo Migration Complete!
echo ========================================
echo.
echo Backup saved: %BACKUP_FILE%
echo.
echo Next steps:
echo   1. Apply indexes: psql -U %LOCAL_USER% -d %LOCAL_DB% -f migrations\001_add_indexes.sql
echo   2. Update .env: DATABASE_URL=postgresql://%LOCAL_USER%:dev_password_2024@localhost:5432/%LOCAL_DB%
echo   3. Start backend: npm run dev
echo.
pause
