# Raphael Mission Website

A modern React-based multilingual website for Raphael Mission, featuring content management, e-commerce, and testimonials.

## 🚀 Features

- **React 18** - Modern React with concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with custom design
- **React Router** - Client-side routing
- **Supabase** - Backend-as-a-Service (PostgreSQL database, authentication, real-time)
- **Multi-language Support** - English, Russian, Polish
- **Admin Panel** - Full CMS for managing content
- **E-commerce** - Shop functionality for products
- **Responsive Design** - Mobile-first approach

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Supabase account (free tier available)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

Quick steps:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env` file from `ENV_TEMPLATE.txt`
4. Run the database schema in Supabase SQL Editor
5. Create an admin user in Supabase Authentication

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

See `ENV_TEMPLATE.txt` for complete template.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
/
├── public/              # Static assets (images, icons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   │   ├── Admin/       # Admin panel pages
│   │   ├── Home/        # Homepage
│   │   ├── Projects/    # Projects listing and details
│   │   ├── Shop/        # E-commerce pages
│   │   ├── Testimonies/ # Testimonials page
│   │   └── ...          # Other pages
│   ├── services/        # Supabase service layer
│   │   ├── supabase.js  # Supabase client
│   │   ├── projectsService.js
│   │   ├── testimoniesService.js
│   │   ├── shopService.js
│   │   ├── trainingService.js
│   │   ├── contactService.js
│   │   └── authService.js
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── locales/         # Translation files
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── Routes.jsx       # Route definitions
├── SUPABASE_SETUP.md    # Detailed Supabase setup guide
├── ENV_TEMPLATE.txt     # Environment variables template
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new

# raphael-mission
