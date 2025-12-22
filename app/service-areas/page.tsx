import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { BUSINESS_INFO } from '@/lib/config'
import ServiceAreasContent from '@/components/ServiceAreasContent'

export const metadata = generatePageMetadata({
  title: 'Service Areas',
  description: `Expert tree services throughout Colfax, Grass Valley, Nevada City, Auburn, Lincoln, Rocklin & surrounding Northern California areas. Licensed & insured. Call ${BUSINESS_INFO.phone}`,
  path: '/service-areas',
})

export default function ServiceAreasPage() {
  return <ServiceAreasContent />
}
