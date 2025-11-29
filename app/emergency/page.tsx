import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { BUSINESS_INFO } from '@/lib/config'
import EmergencyResponseContent from '@/components/EmergencyResponseContent'

export const metadata = generatePageMetadata({
  title: 'Emergency Tree Services | 24/7 Storm Damage Response',
  description: `24/7 emergency tree services in Colfax, CA. Storm damage cleanup, fallen tree removal, hazardous tree mitigation. Call ${BUSINESS_INFO.phone} now for immediate assistance.`,
  path: '/emergency',
  keywords: [
    'emergency tree service',
    'storm damage tree removal',
    'fallen tree cleanup',
    'hazardous tree removal',
    '24/7 tree service',
    'tree emergency response'
  ]
})

export default function EmergencyPage() {
  return <EmergencyResponseContent />
}