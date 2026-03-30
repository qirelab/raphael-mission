#!/bin/bash
# Quick Redis startup script for Linux/macOS/Git Bash
# Requires Docker to be installed and running

set -e

echo "========================================"
echo "Starting Redis for Raphael Mission"
echo "========================================"
echo ""

# Check if Docker is running
if ! docker ps >/dev/null 2>&1; then
    echo "[ERROR] Docker is not running!"
    echo "Please start Docker first."
    exit 1
fi

echo "[OK] Docker is running"
echo ""

# Check if redis container already exists
if docker ps -a --filter "name=raphael-redis" --format "{{.Names}}" | grep -q "raphael-redis"; then
    echo "[INFO] Redis container already exists"
    echo ""

    # Check if it's running
    if docker ps --filter "name=raphael-redis" --format "{{.Names}}" | grep -q "raphael-redis"; then
        echo "[OK] Redis is already running!"
    else
        echo "[INFO] Starting existing Redis container..."
        docker start raphael-redis
        echo "[OK] Redis started successfully!"
    fi
else
    echo "[INFO] Creating new Redis container..."
    docker run -d --name raphael-redis -p 6379:6379 --restart=always redis:7-alpine
    echo "[OK] Redis container created and started!"
fi

echo ""
echo "Testing Redis connection..."
sleep 2
if docker exec raphael-redis redis-cli ping | grep -q "PONG"; then
    echo "[OK] Redis is responding (PONG)"
else
    echo "[ERROR] Redis is not responding to PING"
    exit 1
fi

echo ""
echo "========================================"
echo "Redis is ready!"
echo "URL: redis://localhost:6379"
echo "========================================"
echo ""
echo "Useful commands:"
echo "  - Stop Redis:    docker stop raphael-redis"
echo "  - Start Redis:   docker start raphael-redis"
echo "  - View logs:     docker logs raphael-redis"
echo "  - Redis CLI:     docker exec -it raphael-redis redis-cli"
echo ""
