# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nodo Serrano is a Next.js 15 landing page for an Ethereum community in Tandil. It's a v0.dev project that syncs with GitHub and deploys to Vercel.

## Key Commands

```bash
# Development
pnpm dev        # Run development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint

# Package management
pnpm install    # Install dependencies
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
2. **Responsive Design**: Mobile-first with animated components
3. **Database**: PostgreSQL with `subscribers` table (email, name, status, created_at)
4. **Environment Variables**: DATABASE_URL, EMAIL_*, WEBHOOK_URL

## Important Notes

- **Co-authorship**: NEVER include Claude as a co-author in git commits. Do not add "Co-Authored-By: Claude" or any similar attribution.
- **Build Configuration**: ESLint and TypeScript errors are ignored during builds (see next.config.mjs)
- **Path Aliases**: Use `@/` for imports (maps to project root)
- **Database**: Requires `subscribers` table to be created before use
- **Styling**: Follow existing Tailwind patterns and color scheme (cyan/blue gradients on dark background)