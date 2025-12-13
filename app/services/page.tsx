import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import ServicesContent from '@/components/ServicesContent'

export const metadata = generatePageMetadata({
  title: 'Tree Services',
  description: 'Professional tree trimming, removal, stump removal & emergency services in Colfax, CA',
  path: '/services',
  keywords: ['tree trimming', 'tree removal', 'stump removal']
})

export default function ServicesPage() {
  return <ServicesContent />
}
