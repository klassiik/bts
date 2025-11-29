import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { BUSINESS_INFO } from '@/lib/config'
import ContactContent from '@/components/ContactContent'

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: `Contact Barker Tree Services for free estimates. Call ${BUSINESS_INFO.phone} or email ${BUSINESS_INFO.email}`,
  path: '/contact'
})

export default function ContactPage() {
  return <ContactContent />
}
