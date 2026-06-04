# 🕊️ Raphael Mission - Full Stack Application

Modern full-stack web application for Raphael Mission with separate Backend API and Frontend.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)

---

## 🏗️ Architecture

```
Frontend (React + Vite)  ←→  Backend API (Express.js)  ←→  PostgreSQL + Redis
     Port 4028                    Port 6388                  Localhost
```

**Key Features:**
- 🔐 **JWT Authentication** - Secure token-based auth
- 🚀 **Redis Caching** - 90-95% faster queries
- 📊 **PostgreSQL** - Optimized with 24 indexes
- 🌐 **RESTful API** - Clean separation of concerns
- 🔒 **Security** - Rate limiting, CORS, Helmet, input validation
- 📝 **Logging** - Winston for comprehensive logging
- ⚡ **Performance** - PM2 clustering, Nginx reverse proxy

---

## 📚 Documentation

### Quick Start:
- 🚀 **[SETUP.md](SETUP.md)** - Full setup guide (local + production)
- ✅ **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Quick deployment checklist
- 🔧 **[COMMANDS.md](COMMANDS.md)** - Useful commands cheat sheet

### Detailed Guides:
- 📖 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete VPS deployment (step-by-step)
- 🔒 **[SECURITY_AUDIT.md](SECURITY_AUDIT.md)** - Security audit report (9.0/10)
- 🔄 **[FRONTEND_MIGRATION.md](FRONTEND_MIGRATION.md)** - Frontend API integration
- 📊 **[server/migrations/README.md](server/migrations/README.md)** - Database indexes guide
- 🔴 **[server/REDIS_SETUP.md](server/REDIS_SETUP.md)** - Redis setup (Windows/Linux)
- ✉️ **[docs/FEEDBACK_EMAIL_SETUP.md](docs/FEEDBACK_EMAIL_SETUP.md)** - Contact form email (EmailJS)

### Completed Stages:
- ✅ **Stage 1:** Backend API Server - [COMPLETED]
- ✅ **Stage 2:** Frontend API Integration - [COMPLETED]
- ✅ **Stage 3:** Security Audit & Fixes - [COMPLETED]
- ✅ **Stage 4:** Database Optimization (24 indexes) - [COMPLETED]

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x+
- **PostgreSQL** 15+
- **Redis** (optional, falls back to node-cache)
- **Git**

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/your-username/raphael-mission.git
cd raphael-mission

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 2. Setup Database

```bash
# Create PostgreSQL database
sudo -u postgres psql
CREATE DATABASE raphael_db;
CREATE USER raphael_user WITH PASSWORD 'dev_password_2024';
GRANT ALL PRIVILEGES ON DATABASE raphael_db TO raphael_user;
\c raphael_db
GRANT ALL ON SCHEMA public TO raphael_user;
\q

# Create tables and load sample data
psql -U raphael_user -d raphael_db -f server/migrations/000_create_tables.sql
psql -U raphael_user -d raphael_db -f server/migrations/003_insert_sample_data.sql
psql -U raphael_user -d raphael_db -f server/migrations/001_add_indexes.sql
```

> **Note:** On startup the backend automatically applies any *pending* SQL
> migrations from `server/migrations/` (see `server/src/utils/runMigrations.js`).
> On an existing database with the core tables already present, migrations
> `000–012` are treated as a baseline and are **not** re-run. The sample-data
> migration (`003`) is never auto-run.

### 3. Configure Environment

**Backend** (`server/.env`):

```env
NODE_ENV=development
PORT=6388
DATABASE_URL=postgresql://raphael_user:dev_password_2024@localhost:5432/raphael_db
JWT_SECRET=your-32-char-secret-here
REDIS_URL=redis://localhost:6379  # Optional
ALLOWED_ORIGINS=http://localhost:4028
```

**Frontend** (`.env`):

```env
VITE_API_URL=http://localhost:6388/api

# Contact form email delivery (EmailJS) — see docs/FEEDBACK_EMAIL_SETUP.md
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> The contact form on the site sends messages via **EmailJS**. The recipient
> address is configured in the EmailJS template (field **To Email**), not in code.
> For the client-facing setup steps see **[docs/FEEDBACK_EMAIL_SETUP.md](docs/FEEDBACK_EMAIL_SETUP.md)**.

### 4. Run Application

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

**Access:**
- Frontend: http://localhost:4028
- Backend API: http://localhost:6388/api
- Health Check: http://localhost:6388/health

---

## 🔐 Default Credentials

**Admin User:**
- Email: `admin@raphael.com`
- Password: `Raphael$2026!Secure#Admin*Pass`

**Regular User:**
- Email: `user@raphael.com`
- Password: `User123!`

---

## 📦 Project Structure

```
raphael-mission/
├── src/                        # Frontend source
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   ├── context/                # React Context
│   └── hooks/                  # Custom hooks
├── server/                     # Backend source
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   │   └── database/       # Database services
│   │   └── utils/              # Utilities
│   ├── migrations/             # SQL migrations
│   └── .env                    # Backend environment
├── public/                     # Static assets
├── dist/                       # Production build
├── DEPLOYMENT_GUIDE.md         # Full deployment guide
├── SETUP.md                    # Setup instructions
└── README.md                   # This file
```

---

## 🛠️ Tech Stack

### Frontend:
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **i18next** - Internationalization (EN, RU, PL)

### Backend:
- **Express.js** - Web framework
- **PostgreSQL** - Database (pg library)
- **Redis** - Caching
- **node-cache** - Fallback cache
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Validation
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### DevOps:
- **PM2** - Process management
- **Nginx** - Reverse proxy
- **Certbot** - SSL certificates
- **Docker** - Redis container (optional)

---

## 📊 Performance

With Stage 4 optimizations (24 database indexes):

| Operation | Before | After | Improvement |
|-----------|--------|-------|-------------|
| `getActive()` | 100-500ms | **5-20ms** | **90-95%** ✅ |
| `getBySlug()` | 50-200ms | **2-10ms** | **95%** ✅ |
| `login` | 100-300ms | **5-15ms** | **90-95%** ✅ |
| `validateSession()` | 50-150ms | **2-5ms** | **95%** ✅ |

**Cache Hit Ratio:** > 95%
**Total Indexes:** 24 (2 UNIQUE, 7 COMPOSITE, 2 PARTIAL, 13 SIMPLE)

---

## 🔒 Security

**Rating:** 9.0/10 (See [SECURITY_AUDIT.md](SECURITY_AUDIT.md))

- ✅ **SQL Injection:** Protected (parameterized queries)
- ✅ **XSS:** Protected (React auto-escaping)
- ✅ **CSRF:** Protected (JWT tokens)
- ✅ **Authentication:** JWT with crypto-secure tokens
- ✅ **Authorization:** Role-based access control
- ✅ **Rate Limiting:** Configured for all endpoints
- ✅ **Input Validation:** Joi schemas
- ✅ **Password Security:** bcrypt with 12 rounds
- ✅ **Account Lockout:** 5 failed attempts = 15min lockout

---

## 🚢 Deployment

### Quick Deploy to VPS:

```bash
# On VPS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql redis-server nginx certbot
sudo npm install -g pm2

# Setup (see DEPLOYMENT_GUIDE.md for details)
cd /var/www
git clone <your-repo>
cd raphael-mission/server
npm install --production
cp .env.example .env
# Edit .env with production values

# Start
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Nginx + SSL
sudo certbot --nginx -d yourdomain.com
```

**Full guide:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🧪 Testing

### Backend:

```bash
cd server

# Health check
curl http://localhost:6388/health

# Test API
curl http://localhost:6388/api/projects
curl http://localhost:6388/api/testimonies/approved
curl http://localhost:6388/api/contact

# Login test
curl -X POST http://localhost:6388/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raphael.com","password":"Raphael$2026!Secure#Admin*Pass"}'
```

### Database:

```bash
# Verify indexes (should return >= 23)
psql -U raphael_user -d raphael_db -c "SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';"

# Performance test
psql -U raphael_user -d raphael_db -f server/migrations/002_verify_indexes.sql
```

---

## 📝 Available Scripts

### Frontend:

```bash
npm run dev         # Start dev server (port 4028)
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # Lint code
```

### Backend:

```bash
npm run dev         # Start with nodemon
npm start           # Start production
pm2:start           # Start with PM2
pm2:stop            # Stop PM2
pm2:restart         # Restart PM2
pm2:logs            # View PM2 logs
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🆘 Support

**Issues?** Check these guides:
- [SETUP.md](SETUP.md) - Setup problems
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment issues
- [COMMANDS.md](COMMANDS.md) - Useful commands
- [server/migrations/README.md](server/migrations/README.md) - Database issues

**Common Issues:**

| Problem | Solution |
|---------|----------|
| Backend won't start | Check `.env` and `DATABASE_URL` |
| Frontend can't connect | Verify `VITE_API_URL` in `.env` |
| Database errors | Ensure PostgreSQL is running and tables exist |
| Redis errors | Redis is optional, will fallback to node-cache |
| 401 Unauthorized | Token expired, login again |

---

## 📞 Contact

**Project:** Raphael Mission
**Tech Stack:** React + Express + PostgreSQL + Redis
**Security Rating:** 9.0/10
**Performance:** 90-95% faster with indexes

---

**Created:** 2024
**Last Updated:** 2026-06-04
**Version:** 2.1 (Backend API Architecture + EmailJS contact form)
