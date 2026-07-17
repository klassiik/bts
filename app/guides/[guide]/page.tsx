import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import { GUIDES, getGuide } from '@/lib/guides'
import { notFound } from 'next/navigation'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  toSafeJsonLd,
} from '@/lib/schema'
import GuideContent from '@/components/GuideContent'

interface PageProps {
  params: Promise<{ guide: string }>
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ guide: guide.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { guide: slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}

  return generatePageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  })
}

export default async function GuidePage({ params }: PageProps) {
  const { guide: slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const articleSchema = generateArticleSchema({
    headline: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    updated: guide.updated,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ])

  const faqSchema = guide.faqs?.length ? generateFAQSchema(guide.faqs) : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJsonLd(faqSchema) }} />
      )}
      <GuideContent guide={guide} />
    </>
  )
}
