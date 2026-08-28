/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    // Client-side route transitions (e.g. header nav links) don't reload the
    // document, so whichever page's CSP loaded first keeps governing the tab.
    // Applying one policy to the whole site (rather than just /blog) avoids
    // that mismatch and covers features used on both blog and non-blog pages
    // (Ghost API fetch, Google Maps + Luma iframes).
    const connectSrc = [
      "'self'",
      'https://blog.nodoserrano.org',
      ...(process.env.NODE_ENV !== 'production' ? ['ws://localhost:*', 'ws://127.0.0.1:*'] : []),
    ].join(' ')

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src ${connectSrc}; frame-src 'self' https://www.google.com https://luma.com; frame-ancestors 'none';`,
          },
        ],
      },
    ]
  },
}

export default nextConfig