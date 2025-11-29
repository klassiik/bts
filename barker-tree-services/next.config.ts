import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Debug: Log the current directory to help diagnose Vercel issues
  eslint: {
    ignoreDuringBuilds: false
  },
  
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  async redirects() {
    return [
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true }
    ]
  }
};

export default nextConfig;