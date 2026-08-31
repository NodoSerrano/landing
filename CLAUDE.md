# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

**IMPORTANT**: Never commit to `main`. Work on an integration/feature branch and open a Pull Request to `main`.

- `main` → Production (auto-deploys to nodoserrano.org via Vercel; region `gru1`)
- `develop-juan` → current integration branch (most active; the earlier `develop` branch has diverged)
- `refactor/*` and other feature branches → branched off the integration branch, merged back via PR/merge commits

Remote: `https://github.com/NodoSerrano/landing.git`

```bash
git checkout develop-juan
git pull origin develop-juan
git checkout -b feature/your-feature-name   # optional
# open PR to main when ready
```

## Project Overview

Nodo Serrano is a Next.js landing page for an Ethereum community in Tandil. Single-page marketing site (hero, community, "somos", events, blog teaser, sponsors, newsletter) plus a Ghost-backed blog at `/blog`, and a newsletter email-collection flow backed by Neon Postgres.

The site is in Spanish. Design tokens are derived from a Figma file ("web-nodo-final-a-produccion"); a local Figma MCP server is configured in `.mcp.json` (`http://127.0.0.1:3845/mcp`) and must be running for Figma tooling.

## Key Commands

```bash
pnpm dev            # Dev server (Next 16, Turbopack)
pnpm build          # Production build
pnpm start          # Serve production build
pnpm lint           # eslint .
pnpm lint:fix       # eslint . --fix
pnpm format         # prettier --write .
pnpm format:check   # prettier --check .

pnpm install        # Install dependencies (pnpm; see pnpm-lock.yaml)

# Database (newsletter subscribers)
node database/test-connection.js   # Test Neon connection
./setup-database.sh                # Initialise schema (database/schema.sql)
```

## Architecture

### Tech Stack
- **Framework**: Next.js **16.1.6** (App Router, Turbopack) + React 19
- **Styling**: Tailwind CSS **v4** (CSS-first config — no `tailwind.config.*`; theme lives in `app/globals.css` via `@theme` / `@theme static`). `@tailwindcss/typography` for article bodies. A few shadcn/ui primitives (`components/ui/*`), `class-variance-authority`, `tailwind-merge`, `clsx`.
- **Animation**: Framer Motion (`components/motion/fade-in.tsx` and inline `motion.*` in sections)
- **Fonts** (`next/font/google`, wired in `app/layout.tsx`): Inter, Space Grotesk, Work Sans (new redesign); Spline Sans (legacy, still used by some sections)
- **Blog CMS**: Ghost Content API v5 (https://blog.nodoserrano.org)
- **Database**: Neon PostgreSQL (serverless) — `@neondatabase/serverless`
- **Email**: Nodemailer · **Validation**: Zod · **Package Manager**: pnpm

### Color scheme
Not a dark cyan/blue theme. The redesign mixes **light and dark sections** (no theme toggle) on a warm off-white base (`--color-bg-light: #f8f4ed`). Brand gradient stops: `--color-brand-mint/blue/violet`. Warm gradient stops: `--color-warm-yellow/red/violet`. Reference tokens by CSS var (e.g. `text-(--color-warm-violet)`); check `app/globals.css` before introducing a new color.

### Project Structure
- `/app` — App Router
  - `layout.tsx` — root layout, fonts, metadata
  - `page.tsx` — `"use client"` landing page composing `components/sections/*`
  - `actions.ts` — `subscribeToNewsletter` server action (writes via `lib/db.ts`)
  - `blog/page.tsx` — blog index (server component, `getGhostPosts`, `?page=` pagination)
  - `blog/[slug]/page.tsx` — article page (`getGhostPostBySlug`, `generateMetadata`)
  - `blog/error.tsx` — error boundary for the blog routes
  - `/api` — `subscribers`, `health`, `admin/subscribers`
- `/components`
  - `/sections` — one file per landing-page section (`hero`, `community`, `somos`, `events`, `blog`, `sponsors`, `newsletter`, …)
  - `/blog` — `post-card`, `article-body`, `breadcrumb`, `pagination-controls`
  - `/layout/header.tsx` — sticky header + scroll-spy nav (mobile menu lives inline in this file)
  - `/ui` — one shadcn primitive left (`container`)
  - `/svgs` — inline SVG icon components
  - `/motion/fade-in.tsx` — shared scroll-reveal wrapper
- `/lib`
  - `ghost.ts` — Ghost Content API client (`getGhostPosts`, `getGhostPostBySlug`)
  - `db.ts` — Neon operations (`addSubscriber`, …)
  - `use-scroll-hash.ts`, `labs-data.ts`, `utils.ts` (`cn`)
- `/database` — `schema.sql`, `test-connection.js`
- `/public` — images, logos, favicons

### Key Features
1. **Newsletter**: client form (`components/sections/newsletter.tsx`) → `subscribeToNewsletter` server action (`app/actions.ts`) → `addSubscriber` (`lib/db.ts`) → `subscribers` table. Duplicate emails are treated as success. No email/webhook notification is sent (that layer was removed).
2. **Ghost blog**: index + article pages under `/app/blog`; homepage teaser in `components/sections/blog.tsx` fetches Ghost **client-side** (hence the CSP `connect-src` allowance — see below).
3. **Events**: `components/sections/events.tsx` embeds a Luma calendar iframe (`https://luma.com/embed/calendar/...`).
4. **Responsive, mostly server-rendered** landing + blog; Framer Motion reveals.

## Ghost Blog Integration

- Client: `lib/ghost.ts` — plain `fetch` against `${NEXT_PUBLIC_GHOST_URL}/ghost/api/content/...` with `?key=NEXT_PUBLIC_GHOST_CONTENT_API_KEY`, `next: { revalidate: 60 }`.
- **Graceful degradation**: both functions catch non-OK responses and network errors. Missing/invalid key → empty list on `/blog`, `null` → `notFound()` on an article. They no longer throw (previously any Ghost 401/429/5xx surfaced as an unhandled 500).
- `components/blog/article-body.tsx` sanitises Ghost HTML with `isomorphic-dompurify`. That pulls in `jsdom`; `next.config.mjs` sets `serverExternalPackages: ['isomorphic-dompurify']` so it isn't bundled into the serverless function (bundling breaks its dynamic requires → 500 on article pages).

## Environment Variables

`.env*` is gitignored. Local dev uses `.env.local`; deployed values come from the **Vercel dashboard, scoped per environment (Production / Preview / Development)**.

- `NEXT_PUBLIC_GHOST_URL` — defaults to `https://blog.nodoserrano.org` if unset
- `NEXT_PUBLIC_GHOST_CONTENT_API_KEY` — Ghost Content API key
- `GHOST_ADMIN_API_KEY` — optional, for future write operations
- `DATABASE_URL` — Neon connection string (newsletter; API routes fail loudly without it)
- `ADMIN_API_KEY` — optional, guards `/api/admin/*`

**`NEXT_PUBLIC_*` gotcha**: these are inlined at **build time**. Changing one in Vercel requires a **redeploy** of that branch to take effect, and a stale/wrong key in the **Preview** scope is the known cause of blog failures on branch deployments even when Production is fine.

## Build & Config Notes

- **`next.config.mjs`**:
  - `eslint.ignoreDuringBuilds` + `typescript.ignoreBuildErrors` — builds do **not** fail on lint/type errors. Run `pnpm lint` yourself. (Next 16 logs a warning that the `eslint` key is no longer supported here; harmless for now.)
  - `images: { unoptimized: true }` — `next/image` serves originals, so remote Ghost/Luma image URLs work without `remotePatterns`.
  - `serverExternalPackages: ['isomorphic-dompurify']` — see Ghost section.
  - `headers()` applies a site-wide CSP. `connect-src` allows `https://blog.nodoserrano.org` (client-side Ghost fetch in the homepage teaser); `frame-src` allows Google Maps + `luma.com`. Adding an external fetch target or iframe means updating this.
- **Path alias**: `@/*` → project root (`tsconfig.json`).
- **Deploy**: `vercel.json` sets `pnpm build`, framework `nextjs`, region `gru1`. Pushes to `main` auto-deploy to production; other branches get Preview deployments (behind Vercel SSO / deployment protection).

## Important Notes

- **Co-authorship**: NEVER add "Co-Authored-By: Claude" or any similar attribution to commits.
- **Never commit to `main`**; PR into it.
- **Database**: the `subscribers` table (email, name, status, created_at) must exist before newsletter writes work; `./setup-database.sh` creates it. Verify with `/api/health`.
- **Styling**: follow existing Tailwind v4 patterns and reference design tokens from `app/globals.css` by CSS var; don't add a `tailwind.config` file.
- **Legacy docs**: `DATABASE_SETUP.md` and `DEPLOYMENT.md` are still broadly accurate. `.cursorrules` exists for Cursor users. (The earlier `BLOG_GUIDE.md`, `NOTION_INTEGRATION.md`, and `GHOST_INTEGRATION.md` describing a since-replaced Notion/markdown blog have been removed.)
