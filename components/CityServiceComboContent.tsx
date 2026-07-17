import Link from 'next/link'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, ChevronDownIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'
import type { CityServiceCombo } from '@/lib/cityServices'

interface Props {
  combo: CityServiceCombo
  cityName: string
  serviceTitle: string
  serviceId: string
}

export default function CityServiceComboContent({ combo, cityName, serviceTitle, serviceId }: Props) {
  return (
    <div className="bg-charcoal-950 min-h-screen">
      <section className="relative py-16 px-4 overflow-hidden" aria-label={combo.h1}>
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="relative max-w-3xl mx-auto">
          <StaticChip
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
            startContent={<MapPinIcon className="w-4 h-4" />}
          >
            Serving {cityName}, CA
          </StaticChip>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-50">{combo.h1}</h1>
          <p className="text-xl text-charcoal-100 mb-8 leading-relaxed">{combo.intro}</p>
          <div className="flex gap-4 flex-wrap">
            <ButtonLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" />}
              aria-label={`Call ${BUSINESS_INFO.name} about ${serviceTitle.toLowerCase()} in ${cityName}`}
            >
              Call {BUSINESS_INFO.phone}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
              aria-label={`Request a free estimate for ${serviceTitle.toLowerCase()} in ${cityName}`}
            >
              Free Estimate
            </ButtonLink>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-5">
          {combo.body.map((para, i) => (
            <p key={i} className="text-charcoal-100 leading-relaxed">{para}</p>
          ))}
        </div>

        <section className="mt-14" aria-label={`Frequently asked questions about ${serviceTitle.toLowerCase()} in ${cityName}`}>
          <h2 className="text-2xl font-bold text-evergreen-300 mb-6">
            {serviceTitle} in {cityName}: Common Questions
          </h2>
          <div className="space-y-4">
            {combo.faqs.map((faq) => (
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

        {/* Cross-links up to the parent city hub and the parent service page —
            gives the combo page real internal links in both directions. */}
        <nav className="mt-14 grid sm:grid-cols-2 gap-4" aria-label="Related pages">
          <Link href={`/service-areas/${combo.citySlug}`} className="block">
            <StaticCard className="h-full bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 transition-all">
              <StaticCardBody className="p-5">
                <p className="text-sm text-charcoal-300 mb-1">All services in</p>
                <p className="font-bold text-evergreen-300">{cityName}, CA →</p>
              </StaticCardBody>
            </StaticCard>
          </Link>
          <Link href={`/services/${serviceId}`} className="block">
            <StaticCard className="h-full bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 transition-all">
              <StaticCardBody className="p-5">
                <p className="text-sm text-charcoal-300 mb-1">More about</p>
                <p className="font-bold text-evergreen-300">{serviceTitle} →</p>
              </StaticCardBody>
            </StaticCard>
          </Link>
        </nav>
      </article>
    </div>
  )
}
