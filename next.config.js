/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    // Turbopack handles video files natively, no config needed
  },
}

module.exports = nextConfig

