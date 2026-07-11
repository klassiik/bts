import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateServiceSchema, toSafeJsonLd } from '@/lib/schema'
import AboutContent from '@/components/AboutContent'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Barker Tree Services, our mission, values, and commitment to expert tree care. Licensed arborists serving Colfax & Northern California since 2018.',
  path: '/about'
})

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <AboutContent />
    </>
  )
}
