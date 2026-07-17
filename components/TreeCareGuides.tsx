import Link from 'next/link'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { LightBulbIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { YEARS_IN_BUSINESS } from '@/lib/config'
import { GUIDES, type Guide } from '@/lib/guides'

// This section used to render four guides' full content inline on /about,
// with no dedicated URLs — so none of it could rank and it wasn't in the
// sitemap. The guides now live at /guides/[slug]; this is a teaser hub that
// links to them, keeping /about as a discovery path into the guide content.

const CATEGORY_LABEL: Record<Guide['category'], string> = {
  'fire-safety': 'Fire Safety',
  seasonal: 'Seasonal Care',
  safety: 'Tree Safety',
  maintenance: 'Maintenance',
  emergency: 'Emergency',
}

const CATEGORY_STYLE: Record<Guide['category'], string> = {
  'fire-safety': 'bg-red-900/30 text-red-400 border-red-700/30',
  seasonal: 'bg-evergreen-900/30 text-evergreen-300 border-evergreen-700/30',
  safety: 'bg-amber-900/30 text-amber-400 border-amber-700/30',
  maintenance: 'bg-sage-900/30 text-sage-400 border-sage-700/30',
  emergency: 'bg-amber-900/30 text-amber-400 border-amber-700/30',
}

export default function TreeCareGuides() {
  return (
    <section className="py-20 px-4 bg-charcoal-950" aria-label="Tree care guides">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <StaticChip
            className="mb-4 bg-sage-900/30 border border-sage-500/20 text-sage-400"
            variant="bordered"
            startContent={<LightBulbIcon className="w-4 h-4" />}
          >
            Tree Care Education
          </StaticChip>
          <h2 className="text-4xl font-bold text-sage-400 mb-4">Expert Tree Care Guides</h2>
          <p className="text-xl text-charcoal-100 max-w-3xl mx-auto">
            {YEARS_IN_BUSINESS} years of foothill tree work, written up as practical guides on fire safety, seasonal
            timing, spotting hazards, and storm response.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {GUIDES.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block">
              <StaticCard className="h-full bg-charcoal-800/50 border border-charcoal-700/20 hover:border-sage-600/40 hover:scale-[1.02] transition-all">
                <StaticCardBody className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <StaticChip size="sm" variant="bordered" className={CATEGORY_STYLE[guide.category]}>
                      {CATEGORY_LABEL[guide.category]}
                    </StaticChip>
                    <span className="text-charcoal-300 text-sm">{guide.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-50 mb-2">{guide.title}</h3>
                  <p className="text-charcoal-100 text-sm leading-relaxed">{guide.description}</p>
                </StaticCardBody>
              </StaticCard>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <ButtonLink
            href="/guides"
            variant="bordered"
            className="border-sage-300 text-sage-300 hover:bg-sage-900/30 font-bold"
            aria-label="Browse all tree care guides"
          >
            Browse all guides
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
