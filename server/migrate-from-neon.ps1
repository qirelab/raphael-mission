# ============================================================================
# Migrate data from Neon to local PostgreSQL (PowerShell version)
# ============================================================================

$ErrorActionPreference = "Stop"

# Configuration
$NEON_URL = "postgresql://neondb_owner:npg_C3bKt8IyDAaB@ep-fragrant-grass-adgxfeeo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
$LOCAL_USER = "raphael_user"
$LOCAL_DB = "raphael_db"
$BACKUP_FILE = "neon_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"

Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host "Migrating data from Neon to Local PostgreSQL" -ForegroundColor Cyan
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if pg_dump is available
try {
    $null = Get-Command pg_dump -ErrorAction Stop
    Write-Host "[OK] PostgreSQL tools found" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] pg_dump not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please add PostgreSQL bin directory to PATH:" -ForegroundColor Yellow
    Write-Host '$env:Path += ";C:\Program Files\PostgreSQL\16\bin"' -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Step 1: Export from Neon
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1/3: Exporting data from Neon..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backup file: $BACKUP_FILE" -ForegroundColor Yellow
Write-Host ""

try {
    & pg_dump $NEON_URL | Out-File -Encoding UTF8 $BACKUP_FILE
    Write-Host "[OK] Export completed successfully" -ForegroundColor Green

    $fileSize = (Get-Item $BACKUP_FILE).Length / 1KB
    Write-Host "File size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Gray
} catch {
    Write-Host ""
    Write-Host "[ERROR] Failed to export from Neon!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "- No internet connection" -ForegroundColor Yellow
    Write-Host "- Neon credentials changed" -ForegroundColor Yellow
    Write-Host "- Firewall blocking connection" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Error details: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Step 2: Ask user confirmation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2/3: Ready to import" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "WARNING: This will import data into local database:" -ForegroundColor Yellow
Write-Host "  Database: $LOCAL_DB" -ForegroundColor Yellow
Write-Host "  User: $LOCAL_USER" -ForegroundColor Yellow
Write-Host ""
Write-Host "If tables already exist, you may see warnings." -ForegroundColor Gray
Write-Host "Existing data with same IDs will be skipped (not overwritten)." -ForegroundColor Gray
Write-Host ""

$confirmation = Read-Host "Continue with import? (Y/N)"
if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
    Write-Host ""
    Write-Host "Import cancelled. Backup saved: $BACKUP_FILE" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 0
}

# Step 3: Import to local DB
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3/3: Importing to local database..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You will be prompted for password: dev_password_2024" -ForegroundColor Yellow
Write-Host ""

try {
    & psql -U $LOCAL_USER -d $LOCAL_DB -f $BACKUP_FILE 2>&1 | Write-Host
    Write-Host ""
    Write-Host "[OK] Import completed" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "[WARNING] Import completed with some errors" -ForegroundColor Yellow
    Write-Host "This is normal if tables/roles already exist" -ForegroundColor Gray
    Write-Host ""
}

# Step 4: Verify data
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Checking record counts..." -ForegroundColor Gray
Write-Host ""

$verifyQuery = @"
SELECT 'projects' as table_name, COUNT(*) as rows FROM projects
UNION ALL SELECT 'shop_products', COUNT(*) FROM shop_products
UNION ALL SELECT 'testimonies', COUNT(*) FROM testimonies
UNION ALL SELECT 'training', COUNT(*) FROM training
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'contact', COUNT(*) FROM contact;
"@

& psql -U $LOCAL_USER -d $LOCAL_DB -c $verifyQuery

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backup saved: $BACKUP_FILE" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Apply indexes: psql -U $LOCAL_USER -d $LOCAL_DB -f migrations\001_add_indexes.sql" -ForegroundColor Gray
Write-Host "  2. Update .env: DATABASE_URL=postgresql://${LOCAL_USER}:dev_password_2024@localhost:5432/$LOCAL_DB" -ForegroundColor Gray
Write-Host "  3. Start backend: npm run dev" -ForegroundColor Gray
Write-Host ""

Read-Host "Press Enter to exit"
