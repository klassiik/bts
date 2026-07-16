/* GEO: Services page component with comprehensive Service schema markers for AI discovery */
import Link from 'next/link'
import { SERVICES, BUSINESS_INFO, YEARS_IN_BUSINESS } from '@/lib/config'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import Video from '@/components/Video'
import { PhoneIcon, CheckCircleIcon, WrenchScrewdriverIcon, CalendarIcon, AcademicCapIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'
import { getVideoUrl } from '@/lib/media'

export default function ServicesContent() {
  return (
    <div className="bg-charcoal-950 min-h-screen">
      {/* GEO: Hero section optimized with location and service keywords for AI extraction */}
      <section className="relative py-20 px-4 overflow-hidden" aria-label="Hero - Expert tree services in Placer & Nevada Counties">
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <StaticChip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
            aria-label="Service category badge"
          >
            Professional Tree Care
          </StaticChip>
          {/* GEO: H1 optimized with service type keywords for AI understanding */}
          <h1 className="text-5xl font-bold mb-6 text-charcoal-50">
            Expert Tree Services
          </h1>
          <p className="text-xl text-charcoal-100 mb-8 max-w-3xl mx-auto leading-relaxed">
             Comprehensive tree care services backed by experienced professionals, professional equipment, and {YEARS_IN_BUSINESS} years of experience serving Grass Valley, Auburn, Nevada City, and communities across Placer & Nevada Counties.
           </p>
          <ButtonLink 
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg shadow-evergreen-900/20"
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            aria-label="Call for free tree service estimate"
          >
            Get Free Estimate
          </ButtonLink>
        </div>
      </section>

      {/* Video showcase section */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Our work in action">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-evergreen-300 mb-4">See Our Expertise in Action</h2>
            <p className="text-xl text-charcoal-100">Professional tree care with precision and safety</p>
          </div>
          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 overflow-hidden">
            <StaticCardBody className="p-0 relative">
              <Video
                src={getVideoUrl('553827505_24841983355418125_3276620820634142277_n')}
                className="w-full h-auto relative z-0"
                aria-label="Barker Tree Services professional tree care work demonstration"
              />
            </StaticCardBody>
          </StaticCard>
        </div>
      </section>

      {/* GEO: Services catalog with Service schema markers for AI extraction */}
      <section className="py-20 px-4" aria-label="Complete tree service catalog">
        <div className="max-w-6xl mx-auto space-y-16">
          {SERVICES.map((service, index) => (
            <article key={service.id} className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
              {/* Main Content */}
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <h2 className="text-4xl font-bold text-evergreen-300 mb-4">
                  <Link href={`/services/${service.id}`} className="hover:text-evergreen-200 transition-colors">
                    {service.title}
                  </Link>
                </h2>
                <p className="text-lg text-charcoal-100 mb-6 leading-relaxed">{service.description}</p>
                
                <StaticCard className="mb-6 bg-charcoal-900/50 border border-evergreen-900/20" role="region" aria-label="Service process details">
                  <StaticCardBody className="p-6">
                    <h3 className="text-xl font-semibold text-evergreen-300 mb-3">Our Process</h3>
                    <p className="text-charcoal-100 leading-relaxed">{service.process}</p>
                  </StaticCardBody>
                </StaticCard>

                <div className="grid md:grid-cols-2 gap-6">
                  <StaticCard className="bg-charcoal-900/30 border border-evergreen-900/10" role="region" aria-label="Service benefits">
                    <StaticCardBody className="p-5">
                      <h4 className="font-semibold text-evergreen-300 mb-3">Key Benefits</h4>
                      <ul className="text-sm text-charcoal-100 space-y-2" role="list" aria-label="Benefits of this service">
                        {service.benefits?.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-evergreen-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </StaticCardBody>
                  </StaticCard>
                  
                  <StaticCard className="bg-charcoal-900/30 border border-evergreen-900/10" role="region" aria-label="Service features">
                    <StaticCardBody className="p-5">
                      <h4 className="font-semibold text-evergreen-300 mb-3">Service Features</h4>
                      <ul className="text-sm text-charcoal-100 space-y-2" role="list" aria-label="Features included with this service">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-evergreen-500 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </StaticCardBody>
                  </StaticCard>
                </div>
              </div>

              {/* GEO: Service details with structured metadata */}
              <StaticCard className={`bg-charcoal-800/50 border border-evergreen-900/20 shadow-xl ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`} role="complementary" aria-label="Service details and contact">
                <StaticCardBody className="p-8 space-y-6">
                  <div>
                    <h4 className="font-semibold text-evergreen-300 mb-3 flex items-center gap-2">
                      <WrenchScrewdriverIcon className="w-5 h-5" aria-hidden="true" />
                      Equipment Used
                    </h4>
                    <p className="text-sm text-charcoal-100 leading-relaxed">{service.equipment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-evergreen-300 mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                      Best Timing
                    </h4>
                    <p className="text-sm text-charcoal-100 leading-relaxed">{service.seasonality}</p>
                  </div>

                  <div className="pt-4 border-t border-evergreen-900/20">
                    <ButtonLink 
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="w-full bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-semibold"
                      startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
                      aria-label={`Get quote for ${service.title} service`}
                    >
                      Get Quote for {service.title}
                    </ButtonLink>
                    <ButtonLink
                      href={`/services/${service.id}`}
                      variant="bordered"
                      className="w-full mt-3 border-evergreen-600/40 text-evergreen-300 font-semibold"
                      aria-label={`${service.title}: details, costs and FAQs`}
                    >
                      {service.title} Costs & FAQs
                    </ButtonLink>
                  </div>
                </StaticCardBody>
              </StaticCard>
            </article>
          ))}
        </div>
      </section>

      {/* GEO: Value propositions section with semantic list structure */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Why choose Barker Tree Services - Key differentiators">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-300 mb-12 text-center">Why Choose Our Tree Services?</h2>
          <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Service differentiators">
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <StaticCardBody className="text-center p-8">
                <AcademicCapIcon className="w-12 h-12 text-evergreen-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300 mb-3">Trained Experts</h3>
                <p className="text-charcoal-100">Experienced professionals with ongoing education and training</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <StaticCardBody className="text-center p-8">
                <ShieldCheckIcon className="w-12 h-12 text-evergreen-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300 mb-3">Fully Insured</h3>
                <p className="text-charcoal-100">Complete liability and workers&apos; compensation coverage</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <StaticCardBody className="text-center p-8">
                <BoltIcon className="w-12 h-12 text-evergreen-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300 mb-3">Emergency Ready</h3>
                <p className="text-charcoal-100">24/7 response for storm damage and urgent situations</p>
              </StaticCardBody>
            </StaticCard>
          </div>
        </div>
      </section>
    </div>
  )
}
