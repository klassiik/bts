import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { SERVICES } from '@/lib/config'
import { getServiceContent } from '@/lib/serviceContent'
import { notFound } from 'next/navigation'
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema, toSafeJsonLd } from '@/lib/schema'
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

/* Hand-written to stay within Google's ~155-char display budget; the previous
 * assembled string only truncated its middle clause and ran 238-250 chars. */
const SERVICE_META_DESCRIPTIONS: Record<string, string> = {
  trimming:
    'Professional tree trimming & pruning in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. Licensed CSLB #1085329. Free estimates.',
  removal:
    'Safe, insured tree removal in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. Licensed CSLB #1085329. Free estimates.',
  stump:
    'Stump removal & grinding in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. Licensed CSLB #1085329. Free estimates.',
  emergency:
    '24/7 emergency tree service in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. Fast storm damage response. CSLB #1085329.'
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
  const description =
    SERVICE_META_DESCRIPTIONS[serviceData.id] ??
    truncateAtWordBoundary(
      `Professional ${serviceData.title.toLowerCase()} in Placer & Nevada Counties. ${serviceData.description} Licensed CSLB #1085329. Free estimates.`,
      155
    )

  return generatePageMetadata({
    title: `${serviceData.title} in Placer & Nevada Counties, CA`,
    description,
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

  const serviceExtra = getServiceContent(serviceData.id)
  const faqSchema = serviceExtra ? generateFAQSchema(serviceExtra.faqs) : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(faqSchema) }} />
      )}
      <ServiceDetailContent
        service={{
          ...serviceData,
          location: 'Placer & Nevada Counties',
        }}
      />
    </>
  )
}
