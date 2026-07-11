import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateFAQSchema, toSafeJsonLd } from '@/lib/schema'
import HomeContent from '@/components/HomeContent'

/* GEO: Enhanced homepage metadata with comprehensive service and location keywords */
export const metadata = generatePageMetadata({
  title: 'Professional Tree Care & Emergency Services',
  description: 'Licensed tree removal, trimming & 24/7 emergency services in Colfax, CA. CSLB #1085329. Serving Northern California since 2018. Free estimates.',
  path: '/',
  keywords: [
    'tree services Colfax',
    'tree removal Colfax CA',
    'tree trimming Grass Valley',
    'emergency tree service Northern California',
    'licensed arborist Colfax',
    'stump grinding Nevada City',
    'tree care Auburn CA'
  ]
})

export default function Home() {
  const faqSchema = generateFAQSchema()

  return (
    <>
      {/* FAQ schema for question-answer extraction by LLMs */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(faqSchema) }} />
      <HomeContent />
    </>
  )
}
