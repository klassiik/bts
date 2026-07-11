import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { getCityDetail } from '@/lib/cityContent'
import { notFound } from 'next/navigation'
import CityServiceContent from '@/components/CityServiceContent'
import { generateLocalBusinessSchema } from '@/lib/schema'
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

  const citySchema = generateLocalBusinessSchema({
    city: cityData.city,
    state: cityData.state,
    path: `/service-areas/${city}`,
    id: `${BUSINESS_INFO.url}/service-areas/${city}#business`,
    name: `${BUSINESS_INFO.name} - ${cityData.city}`,
    description: `Professional tree trimming, removal, stump grinding, and 24/7 emergency tree services in ${cityData.city}, CA. Licensed (CSLB #${BUSINESS_INFO.cslb}), insured, and serving Northern California since 2018.`,
    areaServed: [{ city: cityData.city, state: cityData.state }]
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <CityServiceContent city={cityData.city} state={cityData.state} />
    </>
  )
}
