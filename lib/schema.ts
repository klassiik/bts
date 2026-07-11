import { z } from 'zod'
import { BUSINESS_INFO, SERVICE_AREAS, FOUNDING_YEAR } from '@/lib/config'
import { FAQ_DATA } from '@/lib/faqData'

type ServiceArea = { city: string; state: string }

// One canonical identity for the business entity. Every schema block on
// every page must reference this same @id — page-specific ids make Google
// and AI knowledge graphs see 10+ "different" businesses that merely share
// a name and phone number.
export const BUSINESS_ID = `${BUSINESS_INFO.url}/#business`

// Zod schema for contact form validation
export const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().max(25, 'Phone number is too long').refine((val) => val.replace(/\D/g, '').length >= 10, 'Phone number must include at least 10 digits'),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(150, 'Email is too long'),
  service: z.string().min(1, 'Please select a service').max(50, 'Service value is too long'),
  details: z.string().trim().max(2000, 'Details are too long').optional(),
  honeypot: z.string().trim().max(0, 'Invalid submission').optional()
})

export function toSafeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/<\/script>/gi, '<\\/script>')
}

function formatAreaServed(areas: ServiceArea[]) {
  return areas.map(area => ({
    '@type': 'City',
    name: area.city,
    addressRegion: area.state,
    addressCountry: 'US'
  }))
}

/* The single sitewide LocalBusiness entity — rendered once from the root
 * layout so every page inherits it. Do not create per-page variants. */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    // HomeAndConstructionBusiness already inherits LocalBusiness;
    // ProfessionalService was a mismatched sibling type for a field trade.
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS_INFO.name,
    alternateName: 'Barker Tree Service',
    description: `Professional tree trimming, removal, stump grinding, and 24/7 emergency tree services in Grass Valley, Auburn, Nevada City, and across Placer & Nevada Counties. Licensed (CSLB #${BUSINESS_INFO.cslb}), insured, and serving Northern California since ${FOUNDING_YEAR}.`,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.phoneRaw,
    email: BUSINESS_INFO.email,
    image: `${BUSINESS_INFO.url}/logo.webp`,
    logo: `${BUSINESS_INFO.url}/logo.webp`,
    sameAs: BUSINESS_INFO.socialProfiles,
    slogan: 'Expert Tree Care, Trusted Service',
    foundingDate: String(FOUNDING_YEAR),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 10
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address,
      addressLocality: BUSINESS_INFO.city,
      addressRegion: BUSINESS_INFO.state,
      postalCode: BUSINESS_INFO.zip,
      addressCountry: 'US'
    },
    areaServed: formatAreaServed(SERVICE_AREAS),
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
            provider: { '@id': BUSINESS_ID }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tree Removal',
            description: 'Safe and efficient removal of hazardous, diseased, or unwanted trees',
            provider: { '@id': BUSINESS_ID }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stump Grinding',
            description: 'Complete stump removal and grinding services',
            provider: { '@id': BUSINESS_ID }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Tree Services',
            description: '24/7 emergency response for storm damage and hazardous tree situations',
            provider: { '@id': BUSINESS_ID }
          }
        }
      ]
    },
    priceRange: '$$',
    // Regular business hours only — the 24/7 emergency availability lives on
    // the emergency ContactPoint below, so validators don't see two
    // conflicting hour specs for the same days.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.phoneRaw,
        contactType: 'customer service',
        email: BUSINESS_INFO.email,
        availableLanguage: 'English',
        areaServed: 'US-CA'
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.phoneRaw,
        contactType: 'emergency',
        availableLanguage: 'English',
        areaServed: 'US-CA',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      }
    ],
    knowsAbout: ['Tree Care', 'Arboriculture', 'Tree Removal', 'Emergency Tree Services', 'Stump Grinding'],
    // Verified CSLB public record: C-49 (Tree and Palm), current & active
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `CSLB ${BUSINESS_INFO.cslbClassification} (Tree and Palm) Contractor License #${BUSINESS_INFO.cslb}`,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'California Contractors State License Board',
        url: 'https://www.cslb.ca.gov'
      }
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.1003,
      longitude: -120.9530
    }
  }
}

/* WebSite entity linking the site to the business for knowledge-graph
 * completeness. Rendered once from the root layout. */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS_INFO.url}/#website`,
    url: BUSINESS_INFO.url,
    name: BUSINESS_INFO.name,
    publisher: { '@id': BUSINESS_ID }
  }
}

/* Service schema that references the canonical business via @id instead of
 * re-declaring a nested provider copy on every page. */
export function generateServiceSchema(options: {
  name: string
  description: string
  path: string
  areaServed?: ServiceArea[]
  available24x7?: boolean
}) {
  const { name, description, path, areaServed, available24x7 } = options
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS_INFO.url}${path}#service`,
    name,
    description,
    serviceType: name,
    url: `${BUSINESS_INFO.url}${path}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: formatAreaServed(areaServed ?? SERVICE_AREAS),
    ...(available24x7
      ? {
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59'
          }
        }
      : {})
  }
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? BUSINESS_INFO.url : `${BUSINESS_INFO.url}${item.path}`
    }))
  }
}

/* FAQPage schema. Defaults to the homepage FAQ_DATA the visible FAQSection
 * renders (so JSON-LD and on-page content cannot drift), but any page can
 * pass its own {question, answer} items — e.g. the per-service FAQs.
 * Note: Google retired FAQ rich results (May 2026); this markup is kept for
 * its AI/LLM citation and entity-resolution value. */
export function generateFAQSchema(items: { question: string; answer: string }[] = FAQ_DATA) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}
