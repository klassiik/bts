import { MetadataRoute } from 'next'
import { SERVICE_AREAS } from '@/lib/config'
import { GUIDES } from '@/lib/guides'
import { CITY_SERVICE_COMBOS } from '@/lib/cityServices'
import { CITY_DETAILS } from '@/lib/cityContent'
import { cityToSlug } from '@/lib/utils'

// <lastmod> must be the date the page's content last really changed, never the
// build time: Google ignores lastmod once it learns a site's values move
// without the content moving. Data-driven pages read the `updated` field on
// their record; the hand-built pages below are dated here. Bump an entry when
// that page's copy changes, not for sitewide chrome (header, footer, styling).
const PAGE_UPDATED: Record<string, string> = {
  '/': '2026-10-09',
  '/services': '2026-10-08',
  '/service-areas': '2026-10-09',
  '/emergency': '2026-10-08',
  '/about': '2026-10-08',
  '/contact': '2026-10-08',
  '/guides': '2026-07-16',
  '/services/trimming': '2026-10-08',
  '/services/removal': '2026-10-08',
  '/services/stump': '2026-10-08',
  '/services/emergency': '2026-10-08',
}

const day = (date: string) => new Date(`${date}T00:00:00Z`)

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://barkertreeservices.com'

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: day(PAGE_UPDATED['/']),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: day(PAGE_UPDATED['/services']),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: day(PAGE_UPDATED['/service-areas']),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emergency`,
      lastModified: day(PAGE_UPDATED['/emergency']),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: day(PAGE_UPDATED['/about']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: day(PAGE_UPDATED['/contact']),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: day(PAGE_UPDATED['/guides']),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Guide article pages generated from the GUIDES data
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: day(guide.updated),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // Individual service pages
  const servicePages: MetadataRoute.Sitemap = ['trimming', 'removal', 'stump', 'emergency'].map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: day(PAGE_UPDATED[`/services/${id}`]),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Dynamic city pages generated from SERVICE_AREAS config
  const cityPages: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => ({
    url: `${baseUrl}/service-areas/${cityToSlug(area.city)}`,
    lastModified: day(CITY_DETAILS[area.city].updated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Pilot city×service combo pages (only the ones that actually exist)
  const cityServicePages: MetadataRoute.Sitemap = CITY_SERVICE_COMBOS.map((combo) => ({
    url: `${baseUrl}/service-areas/${combo.citySlug}/${combo.serviceId}`,
    lastModified: day(combo.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...cityPages, ...cityServicePages, ...guidePages]
}
