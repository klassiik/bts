/* Native <details>/<summary> accordion — no client JS.
 *
 * The previous version was a useState client component that only rendered an
 * answer once its item was open, so the answer prose never reached the served
 * HTML: crawlers and AI engines saw the questions and the FAQPage JSON-LD, but
 * none of the visible answer text. <details> keeps every answer in the DOM
 * (collapsed via the native disclosure widget), which is both citable and
 * free — it also drops @heroui/react + framer-motion from the homepage bundle,
 * and gives correct expand/collapse semantics without managing aria-expanded.
 */
import { ButtonLink, StaticCard, StaticChip } from '@/components/ui'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { FAQ_DATA } from '@/lib/faqData'

function getCategoryColor(category: string) {
  switch (category) {
    case 'general': return 'bg-evergreen-900/30 text-evergreen-300 border-evergreen-700/30'
    case 'services': return 'bg-sage-900/30 text-sage-300 border-sage-700/30'
    case 'pricing': return 'bg-amber-900/30 text-amber-300 border-amber-700/30'
    case 'emergency': return 'bg-red-900/30 text-red-300 border-red-700/30'
    default: return 'bg-charcoal-800/30 text-charcoal-300 border-charcoal-700/30'
  }
}

export default function FAQSection() {
  return (
    <section className="py-20 px-4 bg-charcoal-950" aria-label="Frequently asked questions about tree services">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <StaticChip
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
          >
            Tree Care FAQ
          </StaticChip>
          <h2 className="text-4xl font-bold text-evergreen-300 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-charcoal-100">
            Get answers to common questions about tree services in Colfax and surrounding areas
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item) => (
            <StaticCard
              key={item.id}
              className="bg-charcoal-800/50 border border-evergreen-900/20"
            >
              <details className="group">
                <summary className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-charcoal-700/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-evergreen-400 outline-none transition-colors [&::-webkit-details-marker]:hidden">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <StaticChip
                        size="sm"
                        variant="bordered"
                        className={getCategoryColor(item.category)}
                      >
                        {item.category}
                      </StaticChip>
                    </div>
                    {/* span, not h3: see CityServiceContent FAQ note */}
                    <span className="block text-lg font-semibold text-charcoal-50 pr-4">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className="w-5 h-5 flex-shrink-0 text-charcoal-300 transition-transform group-open:-rotate-180 group-open:text-evergreen-300"
                    aria-hidden="true"
                  />
                </summary>

                <div className="px-6 pb-4 pt-2 border-t border-evergreen-900/20">
                  <p className="text-charcoal-100 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            </StaticCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-charcoal-100 mb-6">
            Don&apos;t see your question answered? Contact us for personalized tree care guidance.
          </p>
          <ButtonLink
            href="/contact"
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white text-lg font-bold shadow-lg"
          >
            Ask Your Question
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
