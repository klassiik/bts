'use client'

/* GEO: Services page component with comprehensive Service schema markers for AI discovery */
import { SERVICES, BUSINESS_INFO } from '@/lib/config'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import Video from '@/components/Video'
import { PhoneIcon, CheckCircleIcon, WrenchScrewdriverIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function ServicesContent() {
  return (
    <div className="bg-charcoal-950 min-h-screen">
      {/* GEO: Hero section optimized with location and service keywords for AI extraction */}
      <section className="relative py-20 px-4 overflow-hidden" aria-label="Hero - Expert tree services in Colfax, CA">
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <Chip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
            aria-label="Service category badge"
          >
            Professional Tree Care
          </Chip>
          {/* GEO: H1 optimized with service type keywords for AI understanding */}
          <h1 className="text-5xl font-bold mb-6 text-charcoal-50">
            Expert Tree Services
          </h1>
          <p className="text-xl text-charcoal-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tree care services backed by experienced professionals, professional equipment, and 15+ years of experience serving Colfax and surrounding communities.
          </p>
          <Button 
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            as="a"
            size="lg"
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg shadow-evergreen-900/20"
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            aria-label="Call for free tree service estimate"
          >
            Get Free Estimate
          </Button>
        </div>
      </section>

      {/* Video showcase section */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Our work in action">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-evergreen-400 mb-4">See Our Expertise in Action</h2>
            <p className="text-xl text-charcoal-300">Professional tree care with precision and safety</p>
          </div>
          <Card className="bg-charcoal-800/50 border border-evergreen-900/20 overflow-hidden">
            <CardBody className="p-0 relative">
              <Video
                src="/media/553827505_24841983355418125_3276620820634142277_n.mp4"
                className="w-full h-auto relative z-0"
                aria-label="Barker Tree Services professional tree care work demonstration"
              />
            </CardBody>
          </Card>
        </div>
      </section>

      {/* GEO: Services catalog with Service schema markers for AI extraction */}
      <section className="py-20 px-4" aria-label="Complete tree service catalog">
        <div className="max-w-6xl mx-auto space-y-16">
          {SERVICES.map((service, index) => (
            <article key={service.id} className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`} itemScope itemType="https://schema.org/Service">
              {/* Main Content */}
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <h2 className="text-4xl font-bold text-evergreen-400 mb-4" itemProp="name">{service.title}</h2>
                <p className="text-lg text-charcoal-300 mb-6 leading-relaxed" itemProp="description">{service.description}</p>
                
                <Card className="mb-6 bg-charcoal-900/50 border border-evergreen-900/20" role="region" aria-label="Service process details">
                  <CardBody className="p-6">
                    <h3 className="text-xl font-semibold text-evergreen-400 mb-3">Our Process</h3>
                    <p className="text-charcoal-300 leading-relaxed" itemProp="serviceOutput">{service.process}</p>
                  </CardBody>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-charcoal-900/30 border border-evergreen-900/10" role="region" aria-label="Service benefits">
                    <CardBody className="p-5">
                      <h4 className="font-semibold text-evergreen-400 mb-3">Key Benefits</h4>
                      <ul className="text-sm text-charcoal-300 space-y-2" role="list" aria-label="Benefits of this service">
                        {service.benefits?.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-evergreen-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                  
                  <Card className="bg-charcoal-900/30 border border-evergreen-900/10" role="region" aria-label="Service features">
                    <CardBody className="p-5">
                      <h4 className="font-semibold text-evergreen-400 mb-3">Service Features</h4>
                      <ul className="text-sm text-charcoal-300 space-y-2" role="list" aria-label="Features included with this service">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-evergreen-500 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* GEO: Service details with structured metadata */}
              <Card className={`bg-charcoal-800/50 border border-evergreen-900/20 shadow-xl ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`} role="complementary" aria-label="Service details and contact">
                <CardBody className="p-8 space-y-6">
                  <div>
                    <h4 className="font-semibold text-evergreen-400 mb-3 flex items-center gap-2">
                      <WrenchScrewdriverIcon className="w-5 h-5" aria-hidden="true" />
                      Equipment Used
                    </h4>
                    <p className="text-sm text-charcoal-300 leading-relaxed">{service.equipment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-evergreen-400 mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                      Best Timing
                    </h4>
                    <p className="text-sm text-charcoal-300 leading-relaxed" itemProp="serviceType">{service.seasonality}</p>
                  </div>

                  <div className="pt-4 border-t border-evergreen-900/20">
                    <Button 
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      as="a"
                      className="w-full bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-semibold"
                      startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
                      aria-label={`Get quote for ${service.title} service`}
                    >
                      Get Quote for {service.title}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </article>
          ))}
        </div>
      </section>

      {/* GEO: Value propositions section with semantic list structure */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Why choose Barker Tree Services - Key differentiators">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-12 text-center">Why Choose Our Tree Services?</h2>
          <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Service differentiators">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-8">
                <div className="text-5xl mb-4" aria-label="Trained experts icon" role="img">🎓</div>
                <h3 className="text-xl font-bold text-evergreen-400 mb-3">Trained Experts</h3>
                <p className="text-charcoal-300">Experienced professionals with ongoing education and training</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-8">
                <div className="text-5xl mb-4" aria-label="Fully insured icon" role="img">🛡️</div>
                <h3 className="text-xl font-bold text-evergreen-400 mb-3">Fully Insured</h3>
                <p className="text-charcoal-300">Complete liability and workers&apos; compensation coverage</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-8">
                <div className="text-5xl mb-4" aria-label="24/7 emergency service icon" role="img">⚡</div>
                <h3 className="text-xl font-bold text-evergreen-400 mb-3">Emergency Ready</h3>
                <p className="text-charcoal-300">24/7 response for storm damage and urgent situations</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
