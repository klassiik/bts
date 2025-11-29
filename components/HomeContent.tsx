'use client'

import { SERVICE_AREAS, BUSINESS_INFO, DETAILED_TESTIMONIALS, COMPANY_CREDENTIALS } from '@/lib/config'
import { Button, Card, CardBody, Chip } from '@heroui/react'
import { PhoneIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import FAQSection from '@/components/FAQSection'
import Video from '@/components/Video'

export default function HomeContent() {
  return (
    <>
      {/* GEO: Hero section with semantic article landmark for main business proposition */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 py-20 px-4 overflow-hidden" aria-label="Hero - Professional Tree Services in Colfax, CA">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-evergreen-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <Chip className="mb-4 bg-evergreen-950/40 border border-evergreen-600/30" variant="bordered" aria-label="Business experience badge">
              <span className="text-evergreen-400 font-semibold">15+ Years Experience</span>
            </Chip>
            {/* GEO: H1 optimized with location and service keywords for AI understanding */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-charcoal-50">
              Expert Tree Services in <span className="text-evergreen-400">Colfax, CA</span>
            </h1>
            <p className="text-xl text-charcoal-300 mb-8 leading-relaxed">
              Professional tree trimming, removal, and emergency services. Licensed, insured, and available 24/7.
            </p>
            <div className="flex gap-4 flex-wrap">
              {/* GEO: Primary CTA with semantic link relationship */}
              <Button
                as="a"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                color="primary"
                size="lg"
                variant="shadow"
                startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
                className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold shadow-lg shadow-evergreen-900/50"
                aria-label="Call Barker Tree Services now"
              >
                {BUSINESS_INFO.phone}
              </Button>
              <Button
                as="a"
                href="/services"
                size="lg"
                variant="bordered"
                className="border-evergreen-600 text-evergreen-400 hover:bg-evergreen-950/30 font-bold"
                aria-label="View our tree care services"
              >
                View Services
              </Button>
            </div>
          </div>
          
          {/* GEO: Service areas card with structured location data for geographic AI queries */}
          <Card className="bg-charcoal-800/50 border border-evergreen-900/30 backdrop-blur-sm" role="region" aria-label="Service coverage areas">
            <CardBody className="p-6">
              <h3 className="text-2xl font-bold text-evergreen-400 mb-4">Our Service Areas</h3>
              <ul className="grid grid-cols-2 gap-3" role="list" aria-label="Cities served by Barker Tree Services">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.city} className="flex items-center gap-2 text-charcoal-300">
                    <CheckCircleIcon className="w-5 h-5 text-evergreen-500 flex-shrink-0" aria-hidden="true" />
                    <span>{area.city}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* GEO: Value propositions section with semantic article structure */}
      <section className="py-20 px-4 bg-charcoal-950" aria-label="Why choose us - Key differentiators">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-12 text-center">Why Choose Barker Tree Services?</h2>
          <div className="grid md:grid-cols-4 gap-6" role="list">
            {/* GEO: Value proposition cards with list item roles for structured AI extraction */}
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Licensed and insured icon" role="img">🏆</div>
                <h3 className="text-lg font-bold text-evergreen-400 mb-2">Licensed & Insured</h3>
                <p className="text-charcoal-300 text-sm">CSLB #{BUSINESS_INFO.cslb}</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Expert training icon" role="img">🎓</div>
                <h3 className="text-lg font-bold text-evergreen-400 mb-2">Expert Training</h3>
                <p className="text-charcoal-300 text-sm">Ongoing education & training</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Expert team icon" role="img">👨‍💼</div>
                <h3 className="text-lg font-bold text-evergreen-400 mb-2">Expert Team</h3>
                <p className="text-charcoal-300 text-sm">{COMPANY_CREDENTIALS.experience}</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="24/7 emergency service icon" role="img">⚡</div>
                <h3 className="text-lg font-bold text-evergreen-400 mb-2">Emergency Ready</h3>
                <p className="text-charcoal-300 text-sm">24/7 storm response</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* GEO: Social proof section with Review schema markers for AI extraction */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Customer testimonials and reviews">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-4 text-center">What Our Customers Say</h2>
          <p className="text-charcoal-400 text-center mb-12">Real reviews from satisfied customers across our service areas</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" role="list" aria-label="Customer reviews">
            {DETAILED_TESTIMONIALS.slice(0, 6).map((testimonial, idx) => (
              <Card key={idx} className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem" itemScope itemType="https://schema.org/Review">
                <CardBody className="p-6">
                  <div className="flex items-center gap-1 mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-charcoal-300 mb-4 leading-relaxed text-sm" itemProp="reviewBody">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex justify-between items-center text-sm" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div>
                      <p className="font-semibold text-evergreen-400" itemProp="name">{testimonial.name}</p>
                      <p className="text-charcoal-500" itemProp="address">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <Chip size="sm" className="bg-evergreen-900/30 text-evergreen-400 border border-evergreen-700/30" variant="bordered">
                        {testimonial.service}
                      </Chip>
                      <p className="text-charcoal-500 text-xs mt-1">{testimonial.date}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-charcoal-400 mb-6">Join hundreds of satisfied customers in Colfax and surrounding areas</p>
            <Button
              as="a"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              size="lg"
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label="Call now for free estimate"
            >
              Get Your Free Estimate Today
            </Button>
          </div>
        </div>
      </section>

      {/* GEO: Services preview with structured offer catalog for AI extraction */}
      <section className="py-20 px-4 bg-charcoal-950" aria-label="Professional tree services preview">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-12 text-center">Our Professional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Tree care services offered">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree trimming service icon" role="img">✂️</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Trimming</h3>
                <p className="text-charcoal-400 text-sm">Professional pruning for health and beauty</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Tree removal service icon" role="img">🪓</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Removal</h3>
                <p className="text-charcoal-400 text-sm">Safe removal of hazardous trees</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Stump grinding service icon" role="img">🪚</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Stump Grinding</h3>
                <p className="text-charcoal-400 text-sm">Complete stump removal solutions</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all" role="listitem">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3" aria-label="Emergency tree service icon" role="img">⚡</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Emergency</h3>
                <p className="text-charcoal-400 text-sm">24/7 storm damage response</p>
              </CardBody>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button
              as="a"
              href="/services"
              size="lg"
              aria-label="View all tree care services"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-400 hover:bg-evergreen-950/30 font-bold"
            >
              View All Services →
            </Button>
          </div>
        </div>
      </section>

      {/* GEO: FAQ Section for featured snippets and voice search optimization */}
      <FAQSection />
    </>
  )
}
