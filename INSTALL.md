# Raphael Mission - Admin Panel Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Setup PostgreSQL Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE raphael_mission;
```

### 3. Configure Environment Variables

Copy the example config file and update it:

```bash
cd server
cp config.env.example .env
```

Edit `.env` and set your database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=raphael_mission
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_random_secret_key_here
PORT=5000
ADMIN_DEFAULT_PASSWORD=raphaelmission12345
```

### 4. Initialize Database

Run the database initialization script:

```bash
cd server
npm run init-db
```

This will:

- Create all necessary tables
- Set up indexes and triggers
- Create default admin user with credentials:
  - Username: `admin`
  - Password: `raphaelmission12345`
  - Email: `admin@raphaelmission.org`

### 5. Start Backend Server

```bash
cd server
npm run dev
```

The API will be available at `http://localhost:5000/api`

### 6. Configure Frontend

In the main project directory, create/update `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### 7. Install Frontend Dependencies

```bash
npm install
```

### 8. Start Frontend Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:4028`

## Accessing Admin Panel

1. Navigate to `http://localhost:4028/admin/login`
2. Login with:
   - Username: `admin`
   - Password: `raphaelmission12345`
3. Change password immediately in Settings

## Admin Panel Features

### Available Sections:

1. **Dashboard** - Overview of all data statistics
2. **Projects** - Manage mission projects (CRUD)
3. **Testimonies** - Manage testimonies (CRUD)
4. **Training Programs** - Manage training programs (CRUD)
5. **Shop Products** - Manage shop inventory (CRUD)
6. **Contact Info** - Update contact information
7. **Settings** - Change admin password

### API Endpoints

All admin endpoints require Bearer token authentication.

**Auth:**

- POST `/api/auth/login` - Login
- POST `/api/auth/change-password` - Change password
- GET `/api/auth/verify` - Verify token

**Projects:**

- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get project by ID
- GET `/api/projects/slug/:slug` - Get project by slug
- POST `/api/projects` - Create project (auth required)
- PUT `/api/projects/:id` - Update project (auth required)
- DELETE `/api/projects/:id` - Delete project (auth required)

**Testimonies:**

- GET `/api/testimonies` - Get all testimonies
- GET `/api/testimonies/:id` - Get testimony by ID
- POST `/api/testimonies` - Create testimony (auth required)
- PUT `/api/testimonies/:id` - Update testimony (auth required)
- DELETE `/api/testimonies/:id` - Delete testimony (auth required)

**Training Programs:**

- GET `/api/training` - Get all programs
- GET `/api/training/:id` - Get program by ID
- POST `/api/training` - Create program (auth required)
- PUT `/api/training/:id` - Update program (auth required)
- DELETE `/api/training/:id` - Delete program (auth required)

**Shop Products:**

- GET `/api/shop` - Get all products
- GET `/api/shop/:id` - Get product by ID
- POST `/api/shop` - Create product (auth required)
- PUT `/api/shop/:id` - Update product (auth required)
- DELETE `/api/shop/:id` - Delete product (auth required)

**Contact Info:**

- GET `/api/contact` - Get contact information
- PUT `/api/contact` - Update contact information (auth required)

## Troubleshooting

### Database Connection Issues

If you get connection errors:

1. Check PostgreSQL is running: `pg_isready`
2. Verify credentials in `.env`
3. Ensure database exists: `psql -l | grep raphael_mission`

### Port Already in Use

If port 5000 is in use:

1. Change PORT in `server/.env`
2. Update VITE_API_URL in main `.env` to match

### CORS Issues

If you encounter CORS errors:

1. Check the backend server is running
2. Verify VITE_API_URL matches backend URL

## Security Notes

⚠️ **IMPORTANT:**

1. Change the default admin password immediately after first login
2. Use a strong JWT_SECRET in production
3. Never commit `.env` files to version control
4. Use HTTPS in production
5. Regularly backup your database

## Next Steps

After setup, you need to:

1. ✅ Login to admin panel
2. ✅ Change default password
3. 🔨 Add CRUD interfaces for Projects, Testimonies, etc. (in progress)
4. 🔨 Integrate API with frontend pages
5. 🔨 Test all functionality


