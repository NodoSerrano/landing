# Nodo Serrano

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://nodoserrano.org)

## Overview

Nodo Serrano is a community initiative focused on Ethereum research and education in Tandil, Argentina. This landing page serves as the main entry point for our community, featuring newsletter subscription and information about upcoming events and activities.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Neon PostgreSQL
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Code Quality
pnpm lint          # Run ESLint
pnpm lint:fix      # Run ESLint with auto-fix
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting

# Build for production
pnpm build

# Run production build
pnpm start
```

### Code Quality Tools

This project uses:
- **ESLint** for JavaScript/TypeScript linting with Next.js rules and built-in formatting rules
- **Prettier** for consistent code formatting (requires installation)

**Current Setup:**
- ESLint is fully configured and working with formatting rules
- Prettier configuration is ready (packages need to be installed)

**VSCode Extensions Recommended:**
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

**To enable full Prettier-ESLint integration:**
```bash
pnpm install  # Install all dependencies including prettier packages
```

Once installed, Prettier will work alongside ESLint for comprehensive code formatting and linting.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📧 Newsletter subscription with email notifications
- 🌐 Fully internationalized (Spanish)
- 🔒 Server-side form validation
- 📱 Mobile-first approach

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL=your_neon_database_url
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@nodoserrano.org
WEBHOOK_URL=optional_webhook_url
```

## Deployment

### Automatic Deployment with GitHub Actions

This project includes a GitHub Actions workflow for automatic deployment to Vercel. To set it up:

1. Go to your GitHub repository settings
2. Add the following secrets:
   - `VERCEL_TOKEN` - Your Vercel personal access token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

### First-time Setup

For the first deployment, run:
```bash
vercel
```

Follow the prompts to:
- Link to your Vercel account
- Set up the project
- Configure build settings (already set in vercel.json)