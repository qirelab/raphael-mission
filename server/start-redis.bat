@echo off
REM Quick Redis startup script for Windows
REM Requires Docker Desktop to be installed and running

echo ========================================
echo Starting Redis for Raphael Mission
echo ========================================
echo.

REM Check if Docker is running
docker ps >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop first.
    echo.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Check if redis container already exists
docker ps -a --filter "name=raphael-redis" --format "{{.Names}}" | findstr /C:"raphael-redis" >nul
if not errorlevel 1 (
    echo [INFO] Redis container already exists
    echo.

    REM Check if it's running
    docker ps --filter "name=raphael-redis" --format "{{.Names}}" | findstr /C:"raphael-redis" >nul
    if not errorlevel 1 (
        echo [OK] Redis is already running!
    ) else (
        echo [INFO] Starting existing Redis container...
        docker start raphael-redis
        if errorlevel 1 (
            echo [ERROR] Failed to start Redis container
            pause
            exit /b 1
        )
        echo [OK] Redis started successfully!
    )
) else (
    echo [INFO] Creating new Redis container...
    docker run -d --name raphael-redis -p 6379:6379 --restart=always redis:7-alpine
    if errorlevel 1 (
        echo [ERROR] Failed to create Redis container
        pause
        exit /b 1
    )
    echo [OK] Redis container created and started!
)

echo.
echo Testing Redis connection...
timeout /t 2 /nobreak >nul
docker exec raphael-redis redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Redis is not responding to PING
    pause
    exit /b 1
)

echo [OK] Redis is responding (PONG)
echo.
echo ========================================
echo Redis is ready!
echo URL: redis://localhost:6379
echo ========================================
echo.
echo Useful commands:
echo   - Stop Redis:    docker stop raphael-redis
echo   - Start Redis:   docker start raphael-redis
echo   - View logs:     docker logs raphael-redis
echo   - Redis CLI:     docker exec -it raphael-redis redis-cli
echo.
pause
