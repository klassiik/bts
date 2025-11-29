import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { notFound } from 'next/navigation'
import CityServiceContent from '@/components/CityServiceContent'

interface PageProps {
  params: Promise<{
    city: string
  }>
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
  const { city } = await params
  const cityData = getCityFromSlug(city)
  if (!cityData) return {}

  const title = `Tree Services in ${cityData.city}, ${cityData.state}`
  const description = `Professional tree trimming, removal & stump removal in ${cityData.city}. Call ${BUSINESS_INFO.phone}`

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

  return <CityServiceContent city={cityData.city} state={cityData.state} />
}
