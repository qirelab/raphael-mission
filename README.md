# Raphael Mission Website

A modern React-based multilingual website for Raphael Mission, featuring content management, e-commerce, donations, and AI-powered chat support.

## 🚀 Features

- **React 18** - Modern React with concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with custom design
- **React Router** - Client-side routing
- **Dual Database Support** - Neon PostgreSQL or Supabase
- **Multi-language Support** - English, Russian, Polish
- **Admin Panel** - Full CMS for managing content
- **E-commerce** - Shop functionality for products
- **Payment Integration** - Stripe, PayPal, and Fondy
- **AI Chat Bot** - OpenRouter-powered assistant
- **Responsive Design** - Mobile-first approach
- **Cookie Consent** - GDPR compliance

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Database account (Neon or Supabase)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project supports both Neon and Supabase databases. Choose one:

#### Option A: Neon Database (Recommended)

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Set `VITE_DATABASE_PROVIDER=neon` in your `.env` file

#### Option B: Supabase Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Set `VITE_DATABASE_PROVIDER=supabase` in your `.env` file

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
VITE_DATABASE_PROVIDER=neon
VITE_NEON_URL=postgresql://username:password@hostname/database
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Payment Providers
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_FONDY_MERCHANT_ID=your_fondy_merchant_id
VITE_FONDY_SECRET_KEY=your_fondy_secret_key

# AI Chat Bot
VITE_OPENROUTER_API_KEY=sk-or-v1-...

# Email Service
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Database Migration

Run database migrations to set up tables:

```bash
# Test connection
npm run migrate:test-neon
# or
npm run migrate:test-supabase

# Run migrations
npm run migrate:run
```

### 5. Start Development Server

```bash
npm start
```

Visit `http://localhost:4028`

## 📁 Project Structure

```
/
├── public/              # Static assets (images, icons, manifest)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Header, Footer, LanguageSwitcher
│   │   ├── payment/     # Payment integration components
│   │   ├── skeletons/   # Loading skeleton components
│   │   └── ui/          # Base UI components
│   ├── pages/           # Page components
│   │   ├── Admin/       # Admin panel pages
│   │   ├── Home/        # Homepage
│   │   ├── Projects/    # Projects listing and details
│   │   ├── Shop/        # E-commerce pages
│   │   ├── Testimonies/ # Testimonials page
│   │   ├── Training/    # Training programs
│   │   └── ...          # Other pages
│   ├── services/        # Service layer
│   │   ├── neon*.js     # Neon database services
│   │   ├── *Service.js  # Business logic services
│   │   ├── openRouterService.js # AI chat service
│   │   └── authService.js
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── locales/         # Translation files
│   ├── styles/          # Global styles and Tailwind config
│   ├── config/          # Database configuration
│   ├── App.jsx          # Main app component
│   ├── Main.jsx         # Entry point
│   └── Routes.jsx       # Route definitions
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── postcss.config.js    # PostCSS configuration
```

## 🧩 Key Features

### Multi-language Support

- English, Russian, and Polish translations
- Dynamic language switching
- Context-based language management

### Payment Integration

- **Stripe** - Credit card payments
- **PayPal** - PayPal and credit card payments
- **Fondy** - European payment gateway
- Unified payment selector component

### AI Chat Bot

- OpenRouter API integration
- GPT-4o-mini model
- Contextual responses about the mission
- Fallback responses for offline scenarios

### Admin Panel

- Content management for all sections
- Project management
- Testimonies management
- Shop product management
- Training program management
- Contact information management

### Database Support

- **Neon PostgreSQL** (recommended)
- **Supabase** (alternative)
- Migration system for database setup
- Service layer abstraction

## 🎨 Styling

This project uses Tailwind CSS with custom configuration:

- Utility-first approach
- Custom color scheme (global-1, global-2, etc.)
- Responsive design utilities
- PostCSS and Autoprefixer integration
- Component-specific styles

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run format     # Format code with Prettier
npm run migrate:test-neon    # Test Neon connection
npm run migrate:test-supabase # Test Supabase connection
npm run migrate:run          # Run database migrations
npm run migrate:help         # Show migration help
```

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The build output will be in the `build` directory.

## 🔧 Configuration

### Vite Configuration

- Custom port: 4028
- Path aliases for cleaner imports
- Component tagging support
- Build optimization

### Database Migration

The project includes a migration system that supports both Neon and Supabase:

```bash
# Test your database connection
npm run migrate:test-neon
npm run migrate:test-supabase

# Run migrations to set up database tables
npm run migrate:run
```

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React 18 and Vite
- Styled with Tailwind CSS
- Database support by Neon and Supabase
- AI integration by OpenRouter

Built with ❤️ for Raphael Mission
