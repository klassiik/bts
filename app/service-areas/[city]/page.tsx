import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { notFound } from 'next/navigation'
import CityServiceContent from '@/components/CityServiceContent'
import { generateLocalBusinessSchema } from '@/lib/schema'

interface PageProps {
  params: {
    city: string
  }
}

function getCityFromSlug(slug: string) {
  return SERVICE_AREAS.find(area => 
    area.city.toLowerCase().replace(/\s+/g, '-') === slug
  )
}

export async function generateStaticParams() {
  return SERVICE_AREAS.map(area => ({
    city: area.city.toLowerCase().replace(/\s+/g, '-')
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { city } = params
  const cityData = getCityFromSlug(city)
  if (!cityData) return {}

  const title = `Tree Services in ${cityData.city}, ${cityData.state}`
  const description = `Expert tree trimming, removal, stump grinding & emergency services in ${cityData.city}, CA. Licensed (CSLB #1085329), insured, 6 years experience. Call ${BUSINESS_INFO.phone}`

  return generatePageMetadata({
    title,
    description,
    path: `/service-areas/${city}`,
  })
}

export default function CityServicePage({ params }: PageProps) {
  const { city } = params
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
