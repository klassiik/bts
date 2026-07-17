import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICE_AREAS, SERVICES } from '@/lib/config'
import { CITY_SERVICE_COMBOS, getCityServiceCombo } from '@/lib/cityServices'
import { cityToSlug } from '@/lib/utils'
import { notFound } from 'next/navigation'
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  toSafeJsonLd,
} from '@/lib/schema'
import CityServiceComboContent from '@/components/CityServiceComboContent'

// Only the pilot combos exist. dynamicParams = false makes every other
// city/service combination 404 instead of generating a doorway page — the
// guardrail against the 10×4 = 40-page bloat the audit's quality gate warns
// against. Expand generateStaticParams only after these measurably rank.
export const dynamicParams = false

interface PageProps {
  params: Promise<{ city: string; service: string }>
}

export function generateStaticParams() {
  return CITY_SERVICE_COMBOS.map((combo) => ({
    city: combo.citySlug,
    service: combo.serviceId,
  }))
}

function lookups(citySlug: string, serviceId: string) {
  const cityData = SERVICE_AREAS.find((area) => cityToSlug(area.city) === citySlug)
  const serviceData = SERVICES.find((s) => s.id === serviceId)
  const combo = getCityServiceCombo(citySlug, serviceId)
  return { cityData, serviceData, combo }
}

export async function generateMetadata({ params }: PageProps) {
  const { city, service } = await params
  const { cityData, serviceData, combo } = lookups(city, service)
  if (!cityData || !serviceData || !combo) return {}

  return generatePageMetadata({
    title: `${combo.h1.replace(/, CA$/, '')} | ${serviceData.title}`,
    description: combo.metaDescription,
    path: `/service-areas/${city}/${service}`,
  })
}

export default async function CityServicePage({ params }: PageProps) {
  const { city, service } = await params
  const { cityData, serviceData, combo } = lookups(city, service)
  if (!cityData || !serviceData || !combo) notFound()

  const serviceSchema = generateServiceSchema({
    name: combo.h1,
    description: combo.metaDescription,
    path: `/service-areas/${city}/${service}`,
    areaServed: [{ city: cityData.city, state: cityData.state }],
    available24x7: serviceData.id === 'emergency',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: cityData.city, path: `/service-areas/${city}` },
    { name: serviceData.title, path: `/service-areas/${city}/${service}` },
  ])

  const faqSchema = generateFAQSchema(combo.faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(faqSchema) }} />
      <CityServiceComboContent
        combo={combo}
        cityName={cityData.city}
        serviceTitle={serviceData.title}
        serviceId={serviceData.id}
      />
    </>
  )
}
