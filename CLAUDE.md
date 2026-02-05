# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

**IMPORTANT**: Always work on the `develop` branch and create Pull Requests to `main`.

- `main` branch → Production (auto-deploys to nodoserrano.org via Vercel)
- `develop` branch → Development work
- Feature branches → Specific features (branch from `develop`)

### Git Workflow
```bash
# Always start from develop
git checkout develop
git pull origin develop

# Create feature branch (optional)
git checkout -b feature/your-feature-name

# When ready, create PR to main
# Never commit directly to main
```

## Project Overview

Nodo Serrano is a Next.js 15 landing page for an Ethereum community in Tandil with email collection functionality.

## Key Commands

```bash
# Development
pnpm dev        # Run development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint

# Package management
pnpm install    # Install dependencies

# Database
node database/test-connection.js  # Test database connection
./setup-database.sh              # Set up database schema
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **UI**: React 19 + Framer Motion animations
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Neon PostgreSQL (serverless)
- **Email**: Nodemailer
- **Validation**: Zod
- **Package Manager**: pnpm

### Project Structure
- `/app` - Next.js app router pages and API routes
  - `page.tsx` - Main landing page with newsletter signup
  - `actions.ts` - Server actions for form handling
  - `/api` - API endpoints for subscribers, email, and debugging
- `/components` - Reusable React components
  - `/ui` - shadcn/ui base components
  - Custom components: newsletter form, mobile menu, notifications
- `/lib` - Core utilities
  - `db.ts` - Database operations with Neon
  - `email.ts` - Email sending with Nodemailer
  - `notification-service.ts` - Webhook and email notifications

### Key Features
1. **Newsletter Subscription**: Server action + database storage + email notifications
2. **Ghost Blog Integration**: Dynamic blog posts fetched from Ghost CMS (https://blog.nodoserrano.org)
3. **Responsive Design**: Mobile-first with animated components
4. **Database**: PostgreSQL with `subscribers` table (email, name, status, created_at)
5. **Environment Variables**: DATABASE_URL, EMAIL_*, WEBHOOK_URL, GHOST_*

## Development Environment

### Environment Variables
- **Local Development**: Use `.env.local` with development database
- **Production**: Set in Vercel dashboard with production database
- **Required Variables**:
 - `DATABASE_URL` - Neon PostgreSQL connection string
 - `NEXT_PUBLIC_GHOST_URL` - Ghost blog URL (https://blog.nodoserrano.org)
 - `NEXT_PUBLIC_GHOST_CONTENT_API_KEY` - Ghost Content API key
 - `ADMIN_API_KEY` - Optional, for admin endpoints
 - `GHOST_ADMIN_API_KEY` - Optional, for Ghost write operations

### Database Setup
- Development and production use separate Neon databases
- Run `./setup-database.sh` to initialize schema
- Use `/api/health` to verify database connection

## Important Notes

- **Co-authorship**: NEVER include Claude as a co-author in git commits. Do not add "Co-Authored-By: Claude" or any similar attribution.
- **Git Workflow**: Always work on `develop` branch, create PRs to `main`
- **Build Configuration**: ESLint and TypeScript errors are ignored during builds (see next.config.mjs)
- **Path Aliases**: Use `@/` for imports (maps to project root)
- **Database**: Requires `subscribers` table to be created before use
- **Ghost Blog**: Uses Ghost Content API to fetch posts dynamically. See `GHOST_INTEGRATION.md` for details.
- **Styling**: Follow existing Tailwind patterns and color scheme (cyan/blue gradients on dark background)

## Ghost Blog Integration

The landing page integrates with Ghost CMS for blog content:
- **Component**: `GhostBlogSection` (replaces old `BlogSection`)
- **API**: Ghost Content API v5
- **URL**: https://blog.nodoserrano.org
- **Test Endpoint**: `/api/ghost/test` - Verify Ghost API connection
- **Documentation**: See `GHOST_INTEGRATION.md` for complete details