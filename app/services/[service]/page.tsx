import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICES, BUSINESS_INFO } from '@/lib/config'
import { notFound } from 'next/navigation'
import { generateServiceSchema, generateBreadcrumbSchema, toSafeJsonLd } from '@/lib/schema'
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

  const serviceSchema = generateServiceSchema({
    name: serviceData.title,
    description: serviceData.description,
    path: `/services/${service}`,
    available24x7: serviceData.id === 'emergency'
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: serviceData.title, path: `/services/${service}` }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <ServiceDetailContent
        service={{
          ...serviceData,
          location: 'Placer & Nevada Counties',
        }}
      />
    </>
  )
}
