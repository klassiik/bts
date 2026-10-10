import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateServiceSchema, toSafeJsonLd } from '@/lib/schema'
import { BUSINESS_INFO } from '@/lib/config'
import ServiceAreasContent from '@/components/ServiceAreasContent'

export const metadata = generatePageMetadata({
  title: 'Service Areas',
  description: `Tree services in Colfax, Grass Valley, Nevada City, Auburn, Rocklin, Lincoln & nearby foothill towns. Licensed & insured. Call ${BUSINESS_INFO.phone}.`,
  path: '/service-areas',
})

export default function ServiceAreasPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <ServiceAreasContent />
    </>
  )
}
