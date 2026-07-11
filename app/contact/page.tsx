import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateServiceSchema, toSafeJsonLd } from '@/lib/schema'
import { BUSINESS_INFO } from '@/lib/config'
import ContactContent from '@/components/ContactContent'

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: `Contact Barker Tree Services for free estimates. Call ${BUSINESS_INFO.phone} or email ${BUSINESS_INFO.email}`,
  path: '/contact'
})

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      <ContactContent />
    </>
  )
}
