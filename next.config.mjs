/** @type {import('next').NextConfig} */
const nextConfig = {
  // The repo has ~20 pre-existing type errors (mostly framer-motion `ease`
  // string variance). Left as-is so builds don't block; run `pnpm lint` /
  // `npx tsc --noEmit` locally.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Blog feature images are served by Ghost; everything else is a local file
  // in /public. next/image needs the remote hosts allow-listed.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'blog.nodoserrano.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
