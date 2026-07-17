import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, toSafeJsonLd } from '@/lib/schema'
import { BUSINESS_INFO } from '@/lib/config'
import { GUIDES } from '@/lib/guides'
import GuidesIndexContent from '@/components/GuidesIndexContent'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Tree Care Guides for the Sierra Foothills',
    description:
      'Practical tree care guides for Placer & Nevada County homeowners: defensible space, seasonal timing, spotting hazardous trees, and storm response.',
    path: '/guides',
  })
}

export default function GuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ])

  // ItemList of the guides so the index is machine-readable as a collection,
  // not just a page of links.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: GUIDES.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `${BUSINESS_INFO.url}/guides/${guide.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(itemListSchema) }} />
      <GuidesIndexContent />
    </>
  )
}
