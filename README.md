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

# Build for production
pnpm build

# Run production build
pnpm start
```

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

This project is configured for automatic deployment on Vercel. Push to the main branch to trigger a new deployment.