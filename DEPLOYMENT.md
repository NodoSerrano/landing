# Deployment Guide for Nodo Serrano

## Quick Deploy to Vercel

### Option 1: Deploy with Vercel Button (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `NodoSerrano/landing`
4. Configure environment variables:
   ```
   DATABASE_URL=your_neon_database_url
   ```
5. Click "Deploy"

### Option 2: Deploy via GitHub Integration

Since you have the GitHub Actions workflow set up, you need to:

1. Get your Vercel tokens:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token
   - Go to your project settings in Vercel to find:
     - Organization ID (in General settings)
     - Project ID (in General settings)

2. Add secrets to your GitHub repository:
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add these secrets:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

3. The deployment will trigger automatically on push to main branch

### Option 3: Manual CLI Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time - follow prompts)
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

Make sure to set these in Vercel:

- `DATABASE_URL` - Your Neon PostgreSQL connection string

## Database Setup

Create the subscribers table in your Neon database:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Post-Deployment Checklist

- [ ] Verify the site is live at your Vercel URL
- [ ] Test the email collection form
- [ ] Check that emails are being stored in the database
- [ ] Ensure all images and assets load properly
- [ ] Test on mobile devices

## Custom Domain

To add a custom domain (e.g., nodoserrano.org):

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain
4. Update your DNS records as instructed by Vercel