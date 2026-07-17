import Link from 'next/link'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, LightBulbIcon } from '@heroicons/react/24/outline'
import { BUSINESS_INFO, YEARS_IN_BUSINESS } from '@/lib/config'
import { GUIDES, type Guide } from '@/lib/guides'

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

export default function GuidesIndexContent() {
  return (
    <div className="bg-charcoal-950 min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden" aria-label="Tree care guides">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-950/40 via-charcoal-950 to-charcoal-950" />
        <div className="relative max-w-4xl mx-auto text-center">
          <StaticChip
            className="mb-4 bg-sage-900/30 border border-sage-500/20 text-sage-400"
            variant="bordered"
            startContent={<LightBulbIcon className="w-4 h-4" />}
          >
            Tree Care Education
          </StaticChip>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-50 mb-4">Tree Care Guides</h1>
          <p className="text-xl text-charcoal-100 max-w-2xl mx-auto">
            Practical guidance from {YEARS_IN_BUSINESS} years of tree work in the Sierra foothills — fire safety,
            seasonal timing, spotting hazards, and what to do when a tree comes down.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16" aria-label="All guides">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
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
                  <h2 className="text-xl font-bold text-charcoal-50 mb-2">{guide.title}</h2>
                  <p className="text-charcoal-100 text-sm leading-relaxed">{guide.description}</p>
                </StaticCardBody>
              </StaticCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20" aria-label="Contact">
        <StaticCard className="max-w-4xl mx-auto bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30">
          <StaticCardBody className="p-8 text-center">
            <h2 className="text-2xl font-bold text-evergreen-300 mb-3">Need more than a guide?</h2>
            <p className="text-evergreen-100 mb-6 max-w-xl mx-auto">
              For a real assessment of your trees, {BUSINESS_INFO.name} offers free on-site estimates across Placer
              and Nevada Counties.
            </p>
            <ButtonLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label={`Call ${BUSINESS_INFO.name} for a free estimate`}
            >
              Call {BUSINESS_INFO.phone}
            </ButtonLink>
          </StaticCardBody>
        </StaticCard>
      </section>
    </div>
  )
}
