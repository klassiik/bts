import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/schema'
import HomeContent from '@/components/HomeContent'

/* GEO: Enhanced homepage metadata with comprehensive service and location keywords */
export const metadata = generatePageMetadata({
  title: 'Professional Tree Care & Emergency Services',
  description: 'Licensed tree trimming, removal, stump grinding & 24/7 emergency services in Colfax, CA. CSLB #1085329. Serving Grass Valley, Nevada City, Auburn & Northern California. 15+ years experience. Free estimates.',
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
  /* GEO: Multiple schema types for comprehensive AI understanding */
  const businessSchema = generateLocalBusinessSchema()
  const faqSchema = generateFAQSchema()

  return (
    <>
      {/* GEO: LocalBusiness schema for business entity recognition by AI */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      {/* GEO: FAQ schema for question-answer extraction by LLMs */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeContent />
    </>
  )
}
