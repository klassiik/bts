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
          // Security Headers for Best Practices score
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // HSTS for HTTPS enforcement
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://f.clarity.ms https://h.clarity.ms https://b.clarity.ms; frame-ancestors 'self'; base-uri 'self'; form-action 'self';"
          },
          // Cross-Origin policies
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          // Cache control
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