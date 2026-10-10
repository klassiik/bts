import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateServiceSchema, toSafeJsonLd } from '@/lib/schema'
import AboutContent from '@/components/AboutContent'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Family-owned tree care from a multi-generational Colfax family, serving Placer & Nevada Counties since 2018. Licensed CSLB #1085329, fully insured.',
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
