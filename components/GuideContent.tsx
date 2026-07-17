import Link from 'next/link'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, ChevronDownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'
import { getGuide, type Guide } from '@/lib/guides'

const CATEGORY_LABEL: Record<Guide['category'], string> = {
  'fire-safety': 'Fire Safety',
  seasonal: 'Seasonal Care',
  safety: 'Tree Safety',
  maintenance: 'Maintenance',
  emergency: 'Emergency',
}

function formatUpdated(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function GuideContent({ guide }: { guide: Guide }) {
  const related = (guide.related ?? [])
    .map(getGuide)
    .filter((g): g is Guide => Boolean(g))

  return (
    <div className="bg-charcoal-950 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-evergreen-300 hover:text-evergreen-200 text-sm mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
          All guides
        </Link>

        <header className="mb-10">
          <StaticChip className="mb-4 bg-sage-900/30 border border-sage-500/20 text-sage-400" variant="bordered">
            {CATEGORY_LABEL[guide.category]}
          </StaticChip>
          <h1 className="text-4xl font-bold text-charcoal-50 mb-4">{guide.title}</h1>
          <p className="text-xl text-charcoal-100 leading-relaxed mb-4">{guide.intro}</p>
          <p className="text-sm text-charcoal-300">
            {guide.readTime} · Updated <time dateTime={guide.updated}>{formatUpdated(guide.updated)}</time>
          </p>
        </header>

        <div className="space-y-10">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-evergreen-300 mb-4">{section.heading}</h2>
              {section.body.map((para, i) => (
                <p key={i} className="text-charcoal-100 leading-relaxed mb-4">{para}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 mt-2">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal-100">
                      <span className="text-evergreen-500 mt-1.5 flex-shrink-0" aria-hidden="true">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {guide.faqs && guide.faqs.length > 0 && (
          <section className="mt-14" aria-label={`Frequently asked questions: ${guide.title}`}>
            <h2 className="text-2xl font-bold text-evergreen-300 mb-6">Common questions</h2>
            <div className="space-y-4">
              {guide.faqs.map((faq) => (
                <StaticCard key={faq.question} className="bg-charcoal-800/50 border border-evergreen-900/20">
                  <details className="group">
                    <summary className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-charcoal-700/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-evergreen-400 outline-none transition-colors [&::-webkit-details-marker]:hidden">
                      <span className="text-lg font-semibold text-charcoal-50">{faq.question}</span>
                      <ChevronDownIcon
                        className="w-5 h-5 flex-shrink-0 text-charcoal-300 transition-transform group-open:-rotate-180 group-open:text-evergreen-300"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-6 pb-4 pt-2 border-t border-evergreen-900/20">
                      <p className="text-charcoal-100 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </StaticCard>
              ))}
            </div>
          </section>
        )}

        <StaticCard className="mt-14 bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30">
          <StaticCardBody className="p-8 text-center">
            <h2 className="text-2xl font-bold text-evergreen-300 mb-3">Want a professional to take a look?</h2>
            <p className="text-evergreen-100 mb-6 max-w-xl mx-auto">
              Guides only go so far. For a real assessment of your trees, {BUSINESS_INFO.name} offers free on-site
              estimates across Placer and Nevada Counties.
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

        {related.length > 0 && (
          <section className="mt-14" aria-label="Related guides">
            <h2 className="text-xl font-bold text-evergreen-300 mb-4">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="block">
                  <StaticCard className="h-full bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-[1.02] transition-all">
                    <StaticCardBody className="p-5">
                      <h3 className="font-bold text-charcoal-50 mb-1">{g.title}</h3>
                      <p className="text-charcoal-200 text-sm">{g.description}</p>
                    </StaticCardBody>
                  </StaticCard>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
