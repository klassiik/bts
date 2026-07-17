import { MetadataRoute } from 'next'
import { SERVICE_AREAS } from '@/lib/config'
import { GUIDES } from '@/lib/guides'
import { cityToSlug } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://barkertreeservices.com'
  const now = new Date()

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emergency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Guide article pages generated from the GUIDES data
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(`${guide.updated}T00:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // Individual service pages
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/services/trimming`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/removal`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/stump`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/emergency`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
  ]

  // Dynamic city pages generated from SERVICE_AREAS config
  const cityPages: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => ({
    url: `${baseUrl}/service-areas/${cityToSlug(area.city)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...cityPages, ...guidePages]
}
