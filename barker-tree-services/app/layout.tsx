import type { Metadata } from 'next'
import { Providers } from './providers'
import dynamic from 'next/dynamic'
import '@/styles/globals.css'

// Lazy load components
const Header = dynamic(() => import('@/components/Header'))
const Footer = dynamic(() => import('@/components/Footer'))
const FloatingContactButton = dynamic(() => import('@/components/FloatingContactButton'))

/* GEO: Enhanced root metadata for AI search engines with comprehensive business context */
export const metadata: Metadata = {
  metadataBase: new URL('https://barkertreeservices.com'),
  title: 'Barker Tree Services - Professional Tree Care in Colfax, CA',
  description: 'Expert tree trimming, removal, and emergency services in Colfax and surrounding areas. Licensed & Insured. 24/7 service.',
  /* GEO: Additional metadata for LLM context extraction */
  keywords: ['tree services Colfax CA', 'tree trimming', 'tree removal', 'stump grinding', 'arborist', 'emergency tree service', 'licensed tree care', 'CSLB 1085329'],
  authors: [{ name: 'Barker Tree Services' }],
  creator: 'Barker Tree Services',
  publisher: 'Barker Tree Services',
  /* GEO: Open Graph for social AI agents and rich previews */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://barkertreeservices.com',
    siteName: 'Barker Tree Services',
    title: 'Professional Tree Care Services in Colfax, CA | Licensed Arborists',
    description: 'Licensed tree removal, trimming, and emergency services serving Colfax, Grass Valley, Nevada City, and surrounding Northern California communities since 2018.',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Barker Tree Services - Professional Tree Care',
      },
    ],
  },
  /* GEO: Twitter/X metadata for AI social media parsing */
  twitter: {
    card: 'summary_large_image',
    title: 'Barker Tree Services - Expert Tree Care in Colfax, CA',
    description: 'Licensed & insured tree services. 15+ years experience. 24/7 emergency response.',
    images: ['/logo.webp'],
  },
  /* GEO: Robots configuration for optimal AI crawler access */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  /* GEO: Verification and canonical for authority signals */
  verification: {
    google: '',
    yandex: '',
  },
  /* GEO: Favicon configuration for brand recognition across devices */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

/* GEO: Semantic HTML structure for AI content understanding */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal-950 text-charcoal-50">
        <Providers>
          {/* GEO: Header wrapped in semantic nav for site navigation context */}
          <Header />
          {/* GEO: Main landmark for primary content identification by AI parsers */}
          <main role="main" id="main-content">{children}</main>
          {/* GEO: Footer as contentinfo landmark for business details extraction */}
          <Footer />
          {/* GEO: Floating contact button for mobile click-to-call enhancement */}
          <FloatingContactButton />
        </Providers>
      </body>
    </html>
  )
}