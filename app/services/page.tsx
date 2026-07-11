import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateServiceSchema, toSafeJsonLd } from '@/lib/schema'
import ServicesContent from '@/components/ServicesContent'

export const metadata = generatePageMetadata({
  title: 'Tree Services',
  description: 'Professional tree trimming, removal, stump grinding & 24/7 emergency services in Grass Valley, Auburn, Nevada City & across Placer & Nevada Counties. Licensed (CSLB #1085329), insured. Free estimates.',
  path: '/services',
  keywords: ['tree trimming', 'tree removal', 'stump removal']
})

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <ServicesContent />
    </>
  )
}
