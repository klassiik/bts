import { z } from 'zod'
import { BUSINESS_INFO, SERVICE_AREAS } from '@/lib/config'

// Zod schema for contact form validation
export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  details: z.string().optional()
})

/* GEO: Enhanced LocalBusiness schema for comprehensive AI understanding */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'ProfessionalService'],
    '@id': `${BUSINESS_INFO.url}#business`,
    name: BUSINESS_INFO.name,
    alternateName: 'Barker Tree Service',
    description: 'Professional tree trimming, removal, stump grinding, and 24/7 emergency tree services in Colfax, CA. Licensed (CSLB #1085329), insured, and serving Northern California since 2018.',
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.phoneRaw,
    email: BUSINESS_INFO.email,
    image: `${BUSINESS_INFO.url}/logo.webp`,
    logo: `${BUSINESS_INFO.url}/logo.webp`,
    /* GEO: Credentials for authority and trust signals */
    slogan: 'Expert Tree Care, Trusted Service',
    foundingDate: '2018',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '5-10'
    },
    /* GEO: Complete address for local search AI */
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address,
      addressLocality: BUSINESS_INFO.city,
      addressRegion: BUSINESS_INFO.state,
      postalCode: BUSINESS_INFO.zip,
      addressCountry: 'US'
    },
    /* GEO: Geographic coverage for location-based AI queries */
    areaServed: SERVICE_AREAS.map(area => ({
      '@type': 'City',
      name: area.city,
      addressRegion: area.state,
      addressCountry: 'US'
    })),
    /* GEO: Service categories for intent matching */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tree Care Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tree Trimming & Pruning',
            description: 'Professional tree trimming and pruning for health, safety, and aesthetics',
            provider: {
              '@type': 'LocalBusiness',
              name: BUSINESS_INFO.name
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tree Removal',
            description: 'Safe and efficient removal of hazardous, diseased, or unwanted trees',
            provider: {
              '@type': 'LocalBusiness',
              name: BUSINESS_INFO.name
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stump Grinding',
            description: 'Complete stump removal and grinding services',
            provider: {
              '@type': 'LocalBusiness',
              name: BUSINESS_INFO.name
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Tree Services',
            description: '24/7 emergency response for storm damage and hazardous tree situations',
            provider: {
              '@type': 'LocalBusiness',
              name: BUSINESS_INFO.name
            }
          }
        }
      ]
    },
    priceRange: '$$',
    /* GEO: Business hours for availability queries */
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00'
      }
    ],
    /* GEO: Contact point for direct communication queries */
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phoneRaw,
      contactType: 'customer service',
      email: BUSINESS_INFO.email,
      availableLanguage: 'English',
      areaServed: 'US-CA'
    },
    /* GEO: Credentials and certifications for trust */
    award: 'Licensed Tree Care Provider',
    knowsAbout: ['Tree Care', 'Arboriculture', 'Tree Removal', 'Emergency Tree Services', 'Stump Grinding'],
    /* GEO: Service area radius for proximity-based AI queries */
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '39.1003',
      longitude: '-120.9530'
    },
    /* GEO: Social proof signals */
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50'
    }
  }
}

/* GEO: FAQ Schema for common tree service questions - optimized for LLM extraction */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What areas does Barker Tree Services serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Barker Tree Services serves Colfax, Grass Valley, Nevada City, Auburn, Lincoln, Rocklin, Loomis, Penryn, Smartville, and Rough and Ready in Northern California.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Barker Tree Services licensed and insured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Barker Tree Services is fully licensed (CSLB #1085329) and insured with complete liability and workers\' compensation coverage.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer emergency tree services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide 24/7 emergency tree services for storm damage, fallen trees, and hazardous tree situations throughout our service area.'
        }
      },
      {
        '@type': 'Question',
        name: 'What tree services does Barker Tree Services offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer professional tree trimming and pruning, tree removal, stump grinding, emergency tree services, hazard assessment, and debris cleanup.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much experience does Barker Tree Services have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Barker Tree Services has over 15 years of experience in arboriculture and tree care, serving Northern California communities since 2018.'
        }
      }
    ]
  }
}
