import { BUSINESS_INFO, DETAILED_TESTIMONIALS, YEARS_IN_BUSINESS } from '@/lib/config'
import { getCityDetail } from '@/lib/cityContent'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, MapPinIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import Video from '@/components/Video'

interface CityServiceContentProps {
  city: string
  state: string
}

export default function CityServiceContent({ city, state }: CityServiceContentProps) {
  const detail = getCityDetail(city)

  // Prefer testimonials from this city; fall back to nearby communities
  // (honestly labeled) rather than rendering an empty social-proof section
  const cityTestimonials = DETAILED_TESTIMONIALS.filter(t => t.location.includes(city))
  const hasLocalTestimonials = cityTestimonials.length > 0
  const shownTestimonials = hasLocalTestimonials
    ? cityTestimonials.slice(0, 2)
    : DETAILED_TESTIMONIALS.slice(0, 2)

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
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <StaticCardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree trimming service icon" role="img">✂️</div>
                <h3 className="font-bold text-evergreen-300 mb-2">Tree Trimming</h3>
                <p className="text-charcoal-100 text-sm">Professional pruning for health and beauty</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <StaticCardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree removal service icon" role="img">🪓</div>
                <h3 className="font-bold text-evergreen-300 mb-2">Tree Removal</h3>
                <p className="text-charcoal-100 text-sm">Safe removal of hazardous trees</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <StaticCardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Stump grinding service icon" role="img">🪚</div>
                <h3 className="font-bold text-evergreen-300 mb-2">Stump Grinding</h3>
                <p className="text-charcoal-100 text-sm">Complete stump removal solutions</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-amber-900/20 hover:border-amber-600/40 hover:scale-105 transition-all">
              <StaticCardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Emergency tree service icon" role="img">⚡</div>
                <h3 className="font-bold text-amber-400 mb-2">Emergency</h3>
                <p className="text-charcoal-100 text-sm">24/7 storm damage response</p>
              </StaticCardBody>
            </StaticCard>
          </div>

          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <StaticCardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-6">
                Tree Care Specialists Serving {city}
              </h3>
              {/* Work clip (crew footage, not city-specific) */}
              <div className="mb-6 rounded-lg overflow-hidden relative">
                <Video
                  src="/media/554341283_24812556778411123_8495766478130270581_n.mp4"
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

          {/* Testimonials — city-specific when we have them, honestly labeled
              regional ones otherwise */}
          {shownTestimonials.length > 0 && (
            <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Customer reviews">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-evergreen-300 mb-8 text-center">
                  {hasLocalTestimonials
                    ? `What ${city} Customers Say`
                    : 'What Customers in Nearby Communities Say'}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-12" role="list">
                  {shownTestimonials.map((testimonial, idx) => (
                    <StaticCard key={idx} className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem">
                      <StaticCardBody className="p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5 text-amber-400" aria-hidden="true" />
                          ))}
                        </div>
                        <p className="text-charcoal-100 mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-semibold text-evergreen-300">{testimonial.name}</p>
                            <p className="text-charcoal-300">{testimonial.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-evergreen-300 font-medium">{testimonial.service}</p>
                            <p className="text-charcoal-300 text-xs">{testimonial.date}</p>
                          </div>
                        </div>
                      </StaticCardBody>
                    </StaticCard>
                  ))}
                </div>
              </div>
            </section>
          )}

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
