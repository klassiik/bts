'use client'

import { BUSINESS_INFO, DETAILED_TESTIMONIALS } from '@/lib/config'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { PhoneIcon, MapPinIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import Video from '@/components/Video'

interface CityServiceContentProps {
  city: string
  state: string
}

export default function CityServiceContent({ city, state }: CityServiceContentProps) {
  // Get local testimonials for this city
  const localTestimonials = DETAILED_TESTIMONIALS.filter(t => t.location.includes(city))
  
  // Local service highlights based on city
  const getLocalHighlights = (cityName: string) => {
    const highlights: Record<string, string[]> = {
      'Colfax': [
        'Serving Placer Hills area since 2018',
        'Expert knowledge of local oak and pine species',
        'Fast response times for mountain weather emergencies'
      ],
      'Grass Valley': [
        'Gold Country region specialists',
        'Experience with historic property tree care',
        'Professional grounds maintenance for businesses'
      ],
      'Nevada City': [
        'Victorian architecture tree preservation',
        'Narrow access emergency tree removal',
        'Historic district compliance expertise'
      ],
      'Auburn': [
        'Placer County licensed contractors',
        'Highway 49 corridor emergency services',
        'Commercial property maintenance'
      ]
    }
    return highlights[cityName] || [
      'Local area specialists since 2018',
      'Quick response times for emergency services',
      'Fully licensed and insured operations'
    ]
  }

  const localHighlights = getLocalHighlights(city)

  return (
    <div className="bg-charcoal-950 min-h-screen" itemScope itemType="https://schema.org/LocalBusiness">
      <section className="relative py-20 px-4 overflow-hidden" aria-label={`Tree services in ${city}, ${state}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto">
          <Chip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
            startContent={<MapPinIcon className="w-4 h-4" />}
            aria-label={`Serving ${city}, ${state}`}
          >
            Serving {city}, {state}
          </Chip>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-50">
            Expert Tree Services in {city}, {state}
          </h1>
          <p className="text-xl text-charcoal-300 mb-8 max-w-3xl">
            Professional tree trimming, removal, stump grinding, and emergency services in {city}. Licensed tree care specialists with 15+ years of experience serving {city} and surrounding communities.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              as="a"
              size="lg"
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" />}
              aria-label={`Call Barker Tree Services for ${city} tree services`}
            >
              Call {BUSINESS_INFO.phone}
            </Button>
            <Button
              href="/contact"
              as="a"
              size="lg"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-400 hover:bg-evergreen-950/30 font-bold"
              aria-label={`Request free estimate for ${city} tree services`}
            >
              Free Estimate
            </Button>
          </div>
        </div>
      </section>

      {/* Local Service Highlights */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label={`Why choose tree services in ${city}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-400 mb-8 text-center">
            Why Choose Tree Services in {city}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" role="list">
            {localHighlights.map((highlight, index) => (
              <Card key={index} className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem">
                <CardBody className="text-center p-6">
                  <CheckCircleIcon className="w-8 h-8 text-evergreen-500 mx-auto mb-3" aria-hidden="true" />
                  <p className="text-charcoal-300 font-medium">{highlight}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4" aria-label={`Tree care services available in ${city}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-400 mb-8 text-center">
            Tree Services in {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree trimming service icon" role="img">✂️</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Trimming</h3>
                <p className="text-charcoal-400 text-sm">Professional pruning for health and beauty</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree removal service icon" role="img">🪓</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Removal</h3>
                <p className="text-charcoal-400 text-sm">Safe removal of hazardous trees</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Stump grinding service icon" role="img">🪚</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Stump Grinding</h3>
                <p className="text-charcoal-400 text-sm">Complete stump removal solutions</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-amber-900/20 hover:border-amber-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Emergency tree service icon" role="img">⚡</div>
                <h3 className="font-bold text-amber-400 mb-2">Emergency</h3>
                <p className="text-charcoal-400 text-sm">24/7 storm damage response</p>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-400 mb-6">
                Tree Care Specialists Serving {city}
              </h3>
              {/* Local work clip */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <Video
                  src="/media/554341283_24812556778411123_8495766478130270581_n.mp4"
                  className="w-full h-auto"
                  aria-label={`Local tree work in ${city}`}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Local Expertise</h4>
                  <p className="text-charcoal-300 text-sm">
                    We understand the unique tree species and growing conditions specific to {city} and the surrounding Placer and Nevada County areas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Licensed & Insured</h4>
                  <p className="text-charcoal-300 text-sm">
                    CSLB #{BUSINESS_INFO.cslb} licensed contractor with full liability and workers&apos; compensation insurance for your protection.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Fast Response</h4>
                  <p className="text-charcoal-300 text-sm">
                    Quick response times for both scheduled services and emergency tree situations throughout the {city} area.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-400 mb-4">
                Why Choose Barker Tree Services in {city}?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Local Expertise</h4>
                  <p className="text-charcoal-300 text-sm">
                    We understand the unique tree species and conditions in {city} and the surrounding area.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Licensed & Insured</h4>
                  <p className="text-charcoal-300 text-sm">
                    CSLB #{BUSINESS_INFO.cslb} with full liability and workers&apos; compensation coverage.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Fast Response</h4>
                  <p className="text-charcoal-300 text-sm">
                    Quick response times for both scheduled services and emergency tree situations.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Local Testimonials */}
          {localTestimonials.length > 0 && (
            <section className="py-20 px-4 bg-charcoal-900/30" aria-label={`Customer reviews from ${city}`}>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-evergreen-400 mb-8 text-center">
                  What {city} Customers Say
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-12" role="list">
                  {localTestimonials.slice(0, 2).map((testimonial, idx) => (
                    <Card key={idx} className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem">
                      <CardBody className="p-6">
                        <div className="flex items-center gap-1 mb-3" itemProp="reviewRating">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5 text-amber-400" aria-hidden="true" />
                          ))}
                        </div>
                        <p className="text-charcoal-300 mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-semibold text-evergreen-400">{testimonial.name}</p>
                            <p className="text-charcoal-500">{testimonial.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-evergreen-400 font-medium">{testimonial.service}</p>
                            <p className="text-charcoal-500 text-xs">{testimonial.date}</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Call to Action */}
          <Card className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30">
            <CardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-4">
                Ready for Tree Services in {city}?
              </h3>
              <p className="text-evergreen-200 mb-6 max-w-2xl mx-auto">
                Contact Barker Tree Services today for your free estimate on tree trimming, removal, stump grinding, or emergency services in {city} and surrounding areas.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  as="a"
                  size="lg"
                  className="bg-charcoal-50 text-evergreen-900 font-bold shadow-lg hover:bg-white"
                  startContent={<PhoneIcon className="w-5 h-5" />}
                  aria-label={`Call now for tree services in ${city}`}
                >
                  Call Now
                </Button>
                <Button
                  href="/services"
                  as="a"
                  size="lg"
                  variant="bordered"
                  className="border-evergreen-300 text-evergreen-300 hover:bg-evergreen-900/30 font-bold"
                  aria-label="View all tree services"
                >
                  View All Services
                </Button>
              </div>
              <p className="text-evergreen-300 text-sm mt-4">
                Licensed & Insured • CSLB #1085329 • 15+ Years Experience
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
