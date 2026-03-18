# Ghost Blog Integration

This document explains the Ghost Blog integration in the Nodo Serrano landing page.

## Overview

The landing page now fetches blog posts directly from the Ghost CMS hosted at `https://blog.nodoserrano.org` using the Ghost Content API.

## Architecture

### Components

- **`GhostBlogSection`** (`/components/ghost-blog-section.tsx`): Main component that fetches and displays Ghost blog posts
  - Fetches posts from Ghost Content API
  - Displays a featured post (if available)
  - Shows latest posts in a grid layout
  - Links directly to the Ghost blog for full articles
  - Includes loading states and error handling

### API Configuration

The integration uses environment variables for configuration:

```bash
# Required
NEXT_PUBLIC_GHOST_URL=https://blog.nodoserrano.org
NEXT_PUBLIC_GHOST_CONTENT_API_KEY=de7096e144f4aed7ad1913220d

# Optional (for future write operations)
GHOST_ADMIN_API_KEY=6984c68f5d363f00013e3641:82bffcc921c271aa0bded33a3dd3df280346db4800a6daa5117828c8adb767be
```

These are stored in:
- `.env.local` (local development - not committed to git)
- Vercel environment variables (production)

### Ghost Content API

The component fetches posts using the Ghost Content API v5:

**Endpoint**: `GET /ghost/api/content/posts/`

**Query Parameters**:
- `key`: Content API key (required)
- `include`: Related data to include (`tags,authors`)
- `limit`: Number of posts to fetch (default: 5)
- `order`: Sort order (`published_at DESC`)

**Response**: JSON with posts array and metadata

## Features

### Featured Post Display
- Shows the first post marked as "featured" in Ghost
- Falls back to the latest post if no featured post exists
- Displays:
  - Feature image
  - Title
  - Excerpt
  - Publication date
  - Reading time
  - Author
  - Tags

### Latest Posts Grid
- Shows up to 4 latest posts (excluding featured)
- Card layout with thumbnails
- Responsive grid (2 columns on desktop, 1 on mobile)

### Loading States
- Skeleton loaders while fetching posts
- Matches the design system (neumorphism style)

### Error Handling
- Graceful degradation if API key is missing
- Error messages in Spanish
- Console logging for debugging
- Section hides if no posts are available

## Testing

### Test Endpoint

A test endpoint is available to verify the Ghost API connection:

```bash
GET /api/ghost/test
```

This endpoint:
- Verifies API key configuration
- Tests connection to Ghost instance
- Returns success status and post count
- Useful for debugging deployment issues

**Test in browser**: http://localhost:3000/api/ghost/test

Expected response:
```json
{
  "success": true,
  "message": "Ghost API connection successful",
  "ghostUrl": "https://blog.nodoserrano.org",
  "postsFound": 5,
  "samplePost": "Your First Blog Post Title"
}
```

## Migration Notes

### Changes from Previous Implementation

**Before**: 
- Used local Markdown files in `/content/blog/`
- Static generation at build time
- Posts served from `/blog/[slug]` routes

**After**:
- Fetches posts from Ghost CMS
- Dynamic fetching (can be optimized with ISR if needed)
- Links to `https://blog.nodoserrano.org/[slug]`

**Backward Compatibility**:
- Old `BlogSection` component is commented out in `app/page.tsx`
- Local blog system still exists and can be re-enabled if needed
- Simply uncomment `<BlogSection />` and comment out `<GhostBlogSection />`

## Deployment

### Vercel Configuration

1. Go to Vercel Dashboard → Project Settings → Environment Variables

2. Add the following variables:
   ```
   NEXT_PUBLIC_GHOST_URL=https://blog.nodoserrano.org
   NEXT_PUBLIC_GHOST_CONTENT_API_KEY=de7096e144f4aed7ad1913220d
   ```

3. Redeploy the project

### Important Notes

- The `NEXT_PUBLIC_` prefix makes these variables available in the browser
- Content API key is safe to expose (read-only access)
- Admin API key should be kept secret (not prefixed with `NEXT_PUBLIC_`)

## Ghost CMS Configuration

### API Keys

Generated in Ghost Admin:
1. Settings → Integrations
2. Add Custom Integration
3. Copy Content API Key

### Post Requirements

For best display on the landing page, ensure posts have:
- **Title**: Required
- **Excerpt**: Auto-generated or custom (for preview text)
- **Feature Image**: Recommended (displays in cards)
- **Featured**: Toggle to mark as featured post
- **Published**: Must be published to appear
- **Tags**: Optional (displays in post metadata)
- **Authors**: Optional (displays author name)

## Future Enhancements

Possible improvements:
- [ ] Implement ISR (Incremental Static Regeneration) for better performance
- [ ] Add pagination for viewing all posts
- [ ] Implement post search functionality
- [ ] Add category/tag filtering
- [ ] Cache API responses with SWR or React Query
- [ ] Add reading time calculation fallback
- [ ] Implement post preview/modal without leaving the landing page

## Troubleshooting

### Posts not loading?

1. Check environment variables are set correctly:
   ```bash
   # In your project directory
   echo $NEXT_PUBLIC_GHOST_URL
   echo $NEXT_PUBLIC_GHOST_CONTENT_API_KEY
   ```

2. Test the API connection:
   - Visit http://localhost:3000/api/ghost/test
   - Check the browser console for errors
   - Check the server logs in terminal

3. Verify Ghost CMS is accessible:
   ```bash
   curl https://blog.nodoserrano.org/ghost/api/content/posts/?key=YOUR_API_KEY&limit=1
   ```

4. Check Ghost API key:
   - Ensure you're using the **Content API Key** (not Admin API Key)
   - Key should be 26 characters long
   - Regenerate in Ghost Admin if necessary

### API errors?

- **404**: Check Ghost URL is correct
- **401/403**: API key is invalid or missing
- **CORS errors**: Ghost must allow your domain (should work by default)
- **Network errors**: Check Ghost instance is online

## Support

For Ghost-specific issues, refer to:
- [Ghost Content API Documentation](https://ghost.org/docs/content-api/)
- [Ghost Admin Panel](https://blog.nodoserrano.org/ghost)
