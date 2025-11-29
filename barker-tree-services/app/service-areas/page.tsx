import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { BUSINESS_INFO } from '@/lib/config'
import ServiceAreasContent from '@/components/ServiceAreasContent'

export const metadata = generatePageMetadata({
  title: 'Service Areas',
  description: `Tree services in Colfax, Grass Valley, Nevada City and surrounding areas. Call ${BUSINESS_INFO.phone}`,
  path: '/service-areas',
})

export default function ServiceAreasPage() {
  return <ServiceAreasContent />
}
