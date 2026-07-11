import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { getCityDetail } from '@/lib/cityContent'
import { notFound } from 'next/navigation'
import CityServiceContent from '@/components/CityServiceContent'
import { generateServiceSchema, generateBreadcrumbSchema, toSafeJsonLd } from '@/lib/schema'
import { cityToSlug } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    city: string
  }>
}

function getCityFromSlug(slug: string) {
  return SERVICE_AREAS.find((area) =>
    cityToSlug(area.city) === slug
  )
}

export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({
    city: cityToSlug(area.city)
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { city } = await params
  const cityData = getCityFromSlug(city)
  if (!cityData) return {}

  const detail = getCityDetail(cityData.city)
  const title = `Tree Services in ${cityData.city}, ${cityData.state}`
  // Lead with the city-specific hook so each city page has a unique description
  const description = detail
    ? `Tree trimming, removal, stump grinding & 24/7 emergency service in ${cityData.city}, CA. ${detail.highlights[0]}. Licensed CSLB #1085329. Call ${BUSINESS_INFO.phone}`
    : `Expert tree trimming, removal, stump grinding & emergency services in ${cityData.city}, CA. Licensed (CSLB #1085329), insured. Call ${BUSINESS_INFO.phone}`

  return generatePageMetadata({
    title,
    description,
    path: `/service-areas/${city}`,
  })
}

export default async function CityServicePage({ params }: PageProps) {
  const { city } = await params
  const cityData = getCityFromSlug(city)
  if (!cityData) notFound()

  const cityServiceSchema = generateServiceSchema({
    name: `Tree Services in ${cityData.city}, ${cityData.state}`,
    description: `Tree trimming, removal, stump grinding, and 24/7 emergency tree services for homes and businesses in ${cityData.city}, ${cityData.state}.`,
    path: `/service-areas/${city}`,
    areaServed: [{ city: cityData.city, state: cityData.state }]
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: cityData.city, path: `/service-areas/${city}` }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(cityServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <CityServiceContent city={cityData.city} state={cityData.state} />
    </>
  )
}
