import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Debug: Log the current directory to help diagnose Vercel issues
  eslint: {
    ignoreDuringBuilds: false
  },
  // Ensures Next's output tracing root is the project directory so Next
  // doesn't accidentally infer a parent directory as the workspace root
  // (fixes Vercel/CI builds that detect the wrong root when lockfiles
  // exist in parent folders).
  outputFileTracingRoot: path.resolve(__dirname),
  
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
          },
          {
            key: 'X-Canonical-URL',
            value: 'https://barkertreeservices.com'
          }
        ]
      }
    ]
  },

  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.barkertreeservices.com',
          },
        ],
        destination: 'https://barkertreeservices.com/:path*',
        permanent: true,
      },
      // Other legacy redirects
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true }
    ]
  }
};

export default nextConfig;