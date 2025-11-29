import { Metadata } from 'next'
import { BUSINESS_INFO } from '@/lib/config'

interface PageSeoProps {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
}

/* GEO: Enhanced metadata generator with comprehensive AI search optimization */
export function generateMetadata({ title, description, path, keywords }: PageSeoProps): Metadata {
  const url = `${BUSINESS_INFO.url}${path}`
  const fullTitle = `${title} | Barker Tree Services - Colfax, CA`
  
  /* GEO: Base keywords enriched with location and service intent modifiers */
  const enhancedKeywords = [
    'tree services Colfax CA',
    'tree trimming',
    'tree removal',
    'stump removal',
    'arborist Northern California',
    'licensed tree care',
    'emergency tree service',
    'tree pruning',
    'hazardous tree removal',
    'CSLB 1085329',
    ...keywords || []
  ]
  
  return {
    title: fullTitle,
    description,
    keywords: enhancedKeywords,
    /* GEO: Author attribution for content authority */
    authors: [{ name: BUSINESS_INFO.name, url: BUSINESS_INFO.url }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    /* GEO: Enhanced Open Graph for social AI and rich snippets */
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'website',
      siteName: BUSINESS_INFO.name,
      locale: 'en_US',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: `${BUSINESS_INFO.name} - ${title}`,
        },
      ],
    },
    /* GEO: Twitter/X metadata for social AI parsing */
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: '@barkertreeservices',
      creator: '@barkertreeservices',
      images: ['/logo.png'],
    },
    /* GEO: Canonical URL for duplicate content prevention */
    alternates: {
      canonical: url
    },
    /* GEO: Comprehensive robots directives for AI crawler optimization */
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    /* GEO: Category for topical clustering in AI understanding */
    category: 'Tree Services',
  }
}
