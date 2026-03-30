# Raphael Mission Backend API

Express.js backend API server for the Raphael Mission website. This server handles all database operations, authentication, and business logic with JWT tokens and Redis caching.

## Features

- **Express.js** REST API server
- **PostgreSQL** database on VPS
- **Redis** caching layer
- **JWT** authentication with secure crypto-based tokens
- **Rate limiting** for DDoS protection
- **Helmet** security headers
- **Winston** logging
- **Joi** request validation
- **PM2** process management

## Prerequisites

- Node.js 20.x or higher
- Redis 6.x or higher
- PostgreSQL 15+ on VPS

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Neon PostgreSQL connection
│   │   ├── redis.js     # Redis client setup
│   │   └── cors.js      # CORS configuration
│   ├── middleware/      # Express middleware
│   │   ├── auth.js      # JWT verification
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validateRequest.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── projects.routes.js
│   │   ├── shop.routes.js
│   │   ├── testimonies.routes.js
│   │   ├── training.routes.js
│   │   ├── contact.routes.js
│   │   └── index.js
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   │   ├── database/    # Database services
│   │   └── cache.service.js
│   ├── utils/           # Utilities
│   │   ├── jwt.js
│   │   ├── logger.js
│   │   ├── errors.js
│   │   └── validators.js
│   ├── app.js           # Express setup
│   └── server.js        # Entry point
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Template for .env
├── ecosystem.config.js  # PM2 configuration
└── package.json
```

## Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Server
NODE_ENV=production
PORT=5000

# Database (PostgreSQL on VPS)
DATABASE_URL=postgresql://raphael_user:your_secure_password@localhost:5432/raphael_db

# JWT (IMPORTANT: Generate a random 32+ character secret)
JWT_SECRET=your-super-secret-key-min-32-chars-change-this-in-production
JWT_EXPIRES_IN=24h

# Redis
REDIS_URL=redis://localhost:6379

# CORS
ALLOWED_ORIGINS=http://localhost:4028,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION_MS=900000

# Cache
CACHE_TTL_MS=300000

# Logging
LOG_LEVEL=info
```

### 3. Generate JWT Secret

Generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

## Development

Start the development server with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

## Production Deployment

### Option 1: VPS Deployment (Ubuntu/Debian)

#### 1. Install Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Install PostgreSQL 15

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

Create database and user:

```bash
sudo -u postgres psql

# In PostgreSQL console:
CREATE DATABASE raphael_db;
CREATE USER raphael_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;
\q
```

Configure PostgreSQL for remote connections (if needed):

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/15/main/postgresql.conf
# Change: listen_addresses = '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

sudo systemctl restart postgresql
```

#### 3. Install Redis

```bash
sudo apt install redis-server -y
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### 4. Install PM2

```bash
sudo npm install -g pm2
```

#### 5. Migrate Data from Neon to VPS PostgreSQL

**Export data from Neon:**

```bash
# On your local machine with access to Neon
# Replace with your Neon connection string
export NEON_URL="postgresql://neondb_owner:npg_XXX@ep-fragrant-grass-XXX-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Export schema and data separately
pg_dump "$NEON_URL" --schema-only > schema.sql
pg_dump "$NEON_URL" --data-only > data.sql
```

**Import to VPS PostgreSQL:**

```bash
# Copy files to VPS
scp schema.sql data.sql user@your-vps-ip:/tmp/

# On VPS, import schema and data
psql -U raphael_user -d raphael_db -f /tmp/schema.sql
psql -U raphael_user -d raphael_db -f /tmp/data.sql

# Verify data
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM projects;"
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM users;"

# Clean up
rm /tmp/schema.sql /tmp/data.sql
```

**Alternative: Direct migration (requires VPS to access Neon):**

```bash
pg_dump "$NEON_URL" | psql "postgresql://raphael_user:password@localhost/raphael_db"
```

#### 6. Clone and Setup Application

```bash
cd /var/www
git clone <your-repo-url> raphael-mission
cd raphael-mission/server
npm install --production
```

#### 7. Configure Environment

```bash
cp .env.example .env
nano .env  # Fill in production values
```

#### 8. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the instructions
```

#### 9. Setup Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/raphael-backend
```

Add:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/raphael-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 10. Setup SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

### Option 2: Docker Deployment

Create `Dockerfile` (if needed):

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

Build and run:

```bash
docker build -t raphael-backend .
docker run -p 5000:5000 --env-file .env raphael-backend
```

## API Endpoints

### Authentication

- `POST /api/auth/signin` - Sign in (returns JWT)
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session (protected)
- `GET /api/auth/user` - Get current user (protected)
- `PUT /api/auth/password` - Update password (protected)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/active` - Get active projects
- `GET /api/projects/random?limit=3` - Get random projects
- `GET /api/projects/first?limit=3` - Get first N projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/slug/:slug` - Get project by slug
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Shop

- `GET /api/shop` - Get all products
- `GET /api/shop/active` - Get active products
- `GET /api/shop/:id` - Get product by ID
- `POST /api/shop` - Create product (admin)
- `PUT /api/shop/:id` - Update product (admin)
- `DELETE /api/shop/:id` - Delete product (admin)

### Testimonies

- `GET /api/testimonies/approved` - Get approved testimonies
- `GET /api/testimonies/random?limit=3` - Get random testimonies
- `POST /api/testimonies` - Create testimony (public, requires approval)
- `GET /api/testimonies` - Get all testimonies (admin)
- `GET /api/testimonies/:id` - Get testimony by ID (admin)
- `PUT /api/testimonies/:id` - Update testimony (admin)
- `PATCH /api/testimonies/:id/approve` - Approve testimony (admin)
- `DELETE /api/testimonies/:id` - Delete testimony (admin)

### Training

- `GET /api/training` - Get all training
- `GET /api/training/active` - Get active training
- `GET /api/training/:id` - Get training by ID
- `POST /api/training` - Create training (admin)
- `PUT /api/training/:id` - Update training (admin)
- `DELETE /api/training/:id` - Delete training (admin)

### Contact

- `GET /api/contact` - Get contact info
- `PUT /api/contact` - Update contact info (admin)
- `DELETE /api/contact` - Clear contact info (admin)

## Testing

### Health Check

```bash
curl http://localhost:5000/health
```

### Test Authentication

```bash
# Sign in
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'

# Use the returned token
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Get user
curl http://localhost:5000/api/auth/user \
  -H "Authorization: Bearer $TOKEN"
```

### Test Public Endpoints

```bash
# Get active projects
curl http://localhost:5000/api/projects/active

# Get approved testimonies
curl http://localhost:5000/api/testimonies/approved
```

## PM2 Commands

```bash
# Start
pm2 start ecosystem.config.js

# Stop
pm2 stop raphael-backend

# Restart
pm2 restart raphael-backend

# View logs
pm2 logs raphael-backend

# Monitor
pm2 monit

# Show status
pm2 status
```

## Monitoring

Logs are stored in:
- `logs/out.log` - Standard output
- `logs/err.log` - Error output
- `logs/combined.log` - All logs (production)
- `logs/error.log` - Errors only (production)

View logs:

```bash
# PM2 logs
pm2 logs raphael-backend

# File logs
tail -f logs/combined.log
```

## Security Considerations

1. **JWT Secret**: Use a strong random secret (32+ characters)
2. **HTTPS**: Always use HTTPS in production
3. **Environment Variables**: Never commit `.env` file
4. **Rate Limiting**: Configured by default
5. **CORS**: Configure allowed origins properly
6. **Database Credentials**: Use environment variables only

## Troubleshooting

### Redis Connection Issues

Check if Redis is running:

```bash
redis-cli ping
# Should return: PONG
```

### Database Connection Issues

Test connection:

```bash
psql "$DATABASE_URL"
```

### Port Already in Use

Change the PORT in `.env` or kill the process:

```bash
lsof -ti:5000 | xargs kill -9
```

### PM2 Not Starting

Check logs:

```bash
pm2 logs raphael-backend --err
```

## License

MIT
