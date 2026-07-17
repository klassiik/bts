import Link from 'next/link'
import { BUSINESS_INFO, GOOGLE_BUSINESS, YEARS_IN_BUSINESS } from '@/lib/config'
import { getCityDetail } from '@/lib/cityContent'
import { getCityServiceCombo } from '@/lib/cityServices'
import { cityToSlug } from '@/lib/utils'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, MapPinIcon, CheckCircleIcon, StarIcon, ScissorsIcon, TruckIcon, Cog6ToothIcon, BoltIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Video from '@/components/Video'
import { getVideoUrl } from '@/lib/media'

interface CityServiceContentProps {
  city: string
  state: string
}

const SERVICE_CARDS = [
  { id: 'trimming', icon: ScissorsIcon, title: 'Tree Trimming', blurb: 'Professional pruning for health and beauty', accent: 'evergreen' },
  { id: 'removal', icon: TruckIcon, title: 'Tree Removal', blurb: 'Safe removal of hazardous trees', accent: 'evergreen' },
  { id: 'stump', icon: Cog6ToothIcon, title: 'Stump Grinding', blurb: 'Complete stump removal solutions', accent: 'evergreen' },
  { id: 'emergency', icon: BoltIcon, title: 'Emergency', blurb: '24/7 storm damage response', accent: 'amber' },
] as const

export default function CityServiceContent({ city, state }: CityServiceContentProps) {
  const detail = getCityDetail(city)
  const citySlug = cityToSlug(city)

  const localHighlights = detail?.highlights ?? [
    'Local area specialists since 2018',
    'Quick response times for emergency services',
    'Fully licensed and insured operations'
  ]

  return (
    <div className="bg-charcoal-950 min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden" aria-label={`Tree services in ${city}, ${state}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto">
          <StaticChip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
            startContent={<MapPinIcon className="w-4 h-4" />}
            aria-label={`Serving ${city}, ${state}`}
          >
            Serving {city}, {state}
          </StaticChip>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-50">
            Expert Tree Services in {city}, {state}
          </h1>
          <p className="text-xl text-charcoal-100 mb-8 max-w-3xl">
            {detail?.intro ??
              `Professional tree trimming, removal, stump grinding, and emergency services in ${city}. Licensed tree care specialists serving ${city} and surrounding communities since 2018.`}
          </p>
          <div className="flex gap-4 flex-wrap">
            <ButtonLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" />}
              aria-label={`Call Barker Tree Services for ${city} tree services`}
            >
              Call {BUSINESS_INFO.phone}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
              aria-label={`Request free estimate for ${city} tree services`}
            >
              Free Estimate
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Local Service Highlights */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label={`Why choose tree services in ${city}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-8 text-center">
            Why Choose Tree Services in {city}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" role="list">
            {localHighlights.map((highlight, index) => (
              <StaticCard key={index} className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem">
                <StaticCardBody className="text-center p-6">
                  <CheckCircleIcon className="w-8 h-8 text-evergreen-500 mx-auto mb-3" aria-hidden="true" />
                  <p className="text-charcoal-100 font-medium">{highlight}</p>
                </StaticCardBody>
              </StaticCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4" aria-label={`Tree care services available in ${city}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-8 text-center">
            Tree Services in {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICE_CARDS.map(({ id, icon: Icon, title, blurb, accent }) => {
              // Point at the city-specific combo page when one exists (the more
              // specific, better-targeted page); otherwise the generic service.
              const hasCombo = Boolean(getCityServiceCombo(citySlug, id))
              const href = hasCombo ? `/service-areas/${citySlug}/${id}` : `/services/${id}`
              const isAmber = accent === 'amber'
              return (
                <Link
                  key={id}
                  href={href}
                  className="block"
                  aria-label={`${title} in ${city}: details, costs and FAQs`}
                >
                  <StaticCard className={`h-full bg-charcoal-800/50 border ${isAmber ? 'border-amber-900/20 hover:border-amber-600/40' : 'border-evergreen-900/20 hover:border-evergreen-600/40'} hover:scale-105 transition-all`}>
                    <StaticCardBody className="text-center p-6">
                      <Icon className={`w-10 h-10 mx-auto mb-3 ${isAmber ? 'text-amber-400' : 'text-evergreen-400'}`} aria-hidden="true" />
                      <h3 className={`font-bold mb-2 ${isAmber ? 'text-amber-400' : 'text-evergreen-300'}`}>{title}</h3>
                      <p className="text-charcoal-100 text-sm">{blurb}</p>
                    </StaticCardBody>
                  </StaticCard>
                </Link>
              )
            })}
          </div>

          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <StaticCardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-6">
                Tree Care Specialists Serving {city}
              </h3>
              {/* Work clip (crew footage, not city-specific) */}
              <div className="mb-6 rounded-lg overflow-hidden relative">
                <Video
                  src={getVideoUrl('554341283_24812556778411123_8495766478130270581_n')}
                  className="w-full h-auto aspect-[9/16] relative z-0"
                  aria-label="Barker Tree Services crew at work"
                />
              </div>
              {detail ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-evergreen-300 mb-2">
                      Trees &amp; Terrain in {city}
                    </h4>
                    <p className="text-charcoal-100 text-sm leading-relaxed">{detail.landscape}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-evergreen-300 mb-2">
                      Permits, Fire Safety &amp; Local Rules
                    </h4>
                    <p className="text-charcoal-100 text-sm leading-relaxed">{detail.regulations}</p>
                  </div>
                </div>
              ) : (
                <p className="text-charcoal-100 text-sm">
                  We understand the unique tree species and growing conditions specific to {city} and
                  the surrounding Placer and Nevada County areas.
                </p>
              )}
            </StaticCardBody>
          </StaticCard>

          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <StaticCardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-4">
                Why Choose Barker Tree Services in {city}?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-evergreen-300 mb-2">Local Expertise</h4>
                  <p className="text-charcoal-100 text-sm">
                     Working in {detail ? `${city} and across ${detail.county} County` : `${city} and the surrounding area`} means knowing its trees, terrain, and weather — not just its zip code.
                   </p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-evergreen-300 mb-2">Licensed & Insured</h4>
                   <p className="text-charcoal-100 text-sm">
                     CSLB #{BUSINESS_INFO.cslb} with full liability and workers&apos; compensation coverage.
                   </p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-evergreen-300 mb-2">Fast Response</h4>
                   <p className="text-charcoal-100 text-sm">
                     Quick response times for both scheduled services and emergency tree situations.
                   </p>
                </div>
              </div>
            </StaticCardBody>
          </StaticCard>

          {/* City-specific FAQs. Native <details> for the same reasons as
              FAQSection: zero client JS, and every answer stays in the DOM so
              crawlers and AI engines can read it without hydrating first. */}
          {detail && detail.faqs.length > 0 && (
            <section className="py-20 px-4" aria-label={`Frequently asked questions about tree services in ${city}`}>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-evergreen-300 mb-8 text-center">
                  Tree Service Questions from {city} Homeowners
                </h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq) => (
                    <StaticCard key={faq.question} className="bg-charcoal-800/50 border border-evergreen-900/20">
                      <details className="group">
                        <summary className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-charcoal-700/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-evergreen-400 outline-none transition-colors [&::-webkit-details-marker]:hidden">
                          {/* span, not h3: some screen readers treat <summary>
                              as a button and drop a nested heading from the
                              outline anyway; the FAQPage schema carries the
                              question semantics that matter. */}
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
              </div>
            </section>
          )}

          {/* Social proof: the linked Google profile only. Hosted testimonial
              copy was removed sitewide — see HomeContent.tsx for rationale. */}
          <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Customer reviews">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center items-center gap-1 mb-4" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-amber-400" />
                ))}
              </div>
              <p className="text-xl font-bold text-evergreen-300 mb-2">
                {GOOGLE_BUSINESS.rating.toFixed(1)} out of 5 on Google
              </p>
              <p className="text-charcoal-100 mb-4">
                Based on {GOOGLE_BUSINESS.reviewCount} reviews on Google from across Placer &amp; Nevada Counties
              </p>
              <a
                href={GOOGLE_BUSINESS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-evergreen-300 underline hover:text-evergreen-200 font-semibold"
                aria-label={`Read all ${GOOGLE_BUSINESS.reviewCount} reviews on our Google Business Profile`}
              >
                Read every review on Google →
              </a>
            </div>
          </section>

          {/* Call to Action */}
          <StaticCard className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30">
            <StaticCardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-4">
                Ready for Tree Services in {city}?
              </h3>
              <p className="text-evergreen-200 mb-6 max-w-2xl mx-auto">
                Contact Barker Tree Services today for your free estimate on tree trimming, removal, stump grinding, or emergency services in {city} and surrounding areas.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <ButtonLink
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="bg-charcoal-50 text-evergreen-900 font-bold shadow-lg hover:bg-white"
                  startContent={<PhoneIcon className="w-5 h-5" />}
                  aria-label={`Call now for tree services in ${city}`}
                >
                  Call Now
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="bordered"
                  className="border-evergreen-300 text-evergreen-300 hover:bg-evergreen-900/30 font-bold"
                  aria-label="View all tree services"
                >
                  View All Services
                </ButtonLink>
              </div>
              <p className="text-evergreen-300 text-sm mt-4">
                Licensed & Insured • CSLB #1085329 • {YEARS_IN_BUSINESS} Years Experience
              </p>
            </StaticCardBody>
          </StaticCard>
        </div>
      </section>
    </div>
  )
}
