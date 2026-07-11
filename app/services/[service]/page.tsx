import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICES, BUSINESS_INFO } from '@/lib/config'
import { notFound } from 'next/navigation'
import { generateLocalBusinessSchema } from '@/lib/schema'
import ServiceDetailContent from '@/components/ServiceDetailContent'

interface PageProps {
  params: Promise<{
    service: string
  }>
}

function getServiceFromSlug(slug: string) {
  return SERVICES.find(s => s.id === slug)
}

function truncateAtWordBoundary(text: string, maxLength: number) {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  return lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated
}

function toSafeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/<\/script>/gi, '<\\/script>')
}

export async function generateStaticParams() {
  return SERVICES.map(service => ({
    service: service.id
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { service } = await params
  const serviceData = getServiceFromSlug(service)
  if (!serviceData) return {}
  const truncatedDescription = truncateAtWordBoundary(serviceData.description, 100)

  return generatePageMetadata({
    title: `${serviceData.title} in Placer & Nevada Counties, CA`,
    description: `Professional ${serviceData.title.toLowerCase()} in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. ${truncatedDescription}... Licensed CSLB #1085329. Free estimates.`,
    path: `/services/${service}`,
    keywords: [
      `${serviceData.title.toLowerCase()} Grass Valley CA`,
      `${serviceData.title.toLowerCase()} Auburn CA`,
      `${serviceData.title.toLowerCase()} near me`,
      `${serviceData.title.toLowerCase()} Placer County`,
      `${serviceData.title.toLowerCase()} Nevada County CA`,
      ...serviceData.features.slice(0, 3).map(f => f.toLowerCase())
    ]
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service } = await params
  const serviceData = getServiceFromSlug(service)
  if (!serviceData) notFound()

  const serviceSchema = generateLocalBusinessSchema({
    path: `/services/${service}`,
    id: `${BUSINESS_INFO.url}/services/${service}#business`,
    description: serviceData.description
  })

  // Service-specific schema
  const serviceItemSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.title,
    description: serviceData.description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phoneRaw,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS_INFO.address,
        addressLocality: BUSINESS_INFO.city,
        addressRegion: BUSINESS_INFO.state,
        postalCode: BUSINESS_INFO.zip,
        addressCountry: 'US'
      }
    },
    areaServed: {
      '@type': 'State',
      name: 'California'
    },
    serviceType: serviceData.title
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(serviceItemSchema) }} />
      <ServiceDetailContent
        service={{
          ...serviceData,
          location: 'Placer & Nevada Counties',
        }}
      />
    </>
  )
}
