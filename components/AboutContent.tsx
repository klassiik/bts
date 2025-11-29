'use client'

/* GEO: About page with Organization schema markers and semantic article structure for AI extraction */
import { BUSINESS_INFO, COMPANY_CREDENTIALS } from '@/lib/config'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import Video from '@/components/Video'
import { PhoneIcon, EnvelopeIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import TreeCareGuides from '@/components/TreeCareGuides'

export default function AboutContent() {
  return (
    <div className="bg-charcoal-950 min-h-screen" itemScope itemType="https://schema.org/Organization">
      {/* GEO: Hero section with organization name and founding date for AI extraction */}
      <section className="relative py-20 px-4 overflow-hidden" aria-label="Hero - About Barker Tree Services">
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <Chip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
            aria-label="Company founding date"
          >
            <span itemProp="foundingDate">Since {COMPANY_CREDENTIALS.founded}</span>
          </Chip>
          {/* GEO: H1 with organization name for AI understanding */}
          <h1 className="text-5xl font-bold mb-6 text-charcoal-50" itemProp="name">About Barker Tree Services</h1>
          <p className="text-xl text-charcoal-300 max-w-3xl mx-auto" itemProp="description">
            Your trusted tree care professionals serving Colfax and surrounding communities
          </p>
        </div>
      </section>

      {/* GEO: Company story as semantic article for structured AI extraction */}
      <section className="py-20 px-4" aria-label="Company history and story">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <article itemProp="knowsAbout">
              <h2 className="text-4xl font-bold text-evergreen-400 mb-6">Our Story</h2>
              <div className="space-y-4 text-charcoal-300 leading-relaxed">
                <p>
                  Barker Tree Services was founded in {COMPANY_CREDENTIALS.founded} with a simple mission: to provide the highest quality tree care services while prioritizing safety, environmental stewardship, and customer satisfaction. What started as a small operation has grown into one of the most trusted tree service companies in the greater Colfax area.
                </p>
                <p>
                  Our founder, Jacob Barker, began his career in arboriculture over 15 years ago, developing expertise in everything from delicate pruning techniques to complex tree removals. His passion for trees and commitment to excellence laid the foundation for what Barker Tree Services represents today.
                </p>
                <p>
                  Today, we serve residential and commercial clients throughout Placer and Nevada counties, bringing together experienced tree care professionals, state-of-the-art equipment, and a deep understanding of local tree species and growing conditions.
                </p>
              </div>
            </article>

            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="complementary" aria-label="Company differentiators">
              <CardBody className="p-8">
                <div className="mb-6 rounded-lg overflow-hidden relative">
                  <Video
                    src="/media/554478983_25636593632607805_5041281570766047163_n.mp4"
                    className="w-full h-auto relative z-0"
                    aria-label="About Barker Tree Services"
                  />
                </div>
                <h3 className="text-2xl font-bold text-evergreen-400 mb-6">Why We&apos;re Different</h3>
                <ul className="space-y-4" role="list" aria-label="Key differentiators">
                  <li className="flex items-start gap-3">
                    <span className="text-4xl" aria-label="Education icon" role="img">🎓</span>
                    <div>
                      <strong className="text-evergreen-400">Education First</strong>
                      <p className="text-charcoal-300 text-sm">Continuous training in latest arboriculture techniques and safety protocols</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-4xl" aria-label="Environmental focus icon" role="img">🌱</span>
                    <div>
                      <strong className="text-evergreen-400">Environmental Focus</strong>
                      <p className="text-charcoal-300 text-sm">Sustainable practices that benefit both your property and the ecosystem</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-4xl" aria-label="Community commitment icon" role="img">🤝</span>
                    <div>
                      <strong className="text-evergreen-400">Community Commitment</strong>
                      <p className="text-charcoal-300 text-sm">Proud to support local community events and environmental initiatives</p>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* GEO: Credentials section with certification and equipment lists for AI extraction */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Professional credentials and equipment">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-12 text-center">Credentials & Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="region" aria-label="Professional certifications">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-evergreen-400 mb-6">Professional Certifications</h3>
                <ul className="space-y-3" role="list" aria-label="List of certifications" itemProp="hasCredential">
                  {COMPANY_CREDENTIALS.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-evergreen-500 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span className="text-charcoal-300">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="region" aria-label="Professional equipment">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-evergreen-400 mb-6">Professional Equipment</h3>
                <ul className="space-y-3" role="list" aria-label="Equipment used">
                  {COMPANY_CREDENTIALS.equipment.map((equipment, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-evergreen-500 mt-1 flex-shrink-0" aria-hidden="true">•</span>
                      <span className="text-charcoal-300">{equipment}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-evergreen-950/80 to-charcoal-900/80 border border-evergreen-900/30" role="region" aria-label="Core company values">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-evergreen-400">Our Core Values</h3>
              <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Company values">
                {COMPANY_CREDENTIALS.values.map((value, index) => (
                  <div key={index} className="text-center" role="listitem">
                    <Chip 
                      className="w-full bg-evergreen-900/50 border border-evergreen-700/30 text-evergreen-300 p-4 h-auto"
                      variant="bordered"
                      itemProp="knowsAbout"
                    >
                      {value}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* GEO: Mission and vision statements for organization understanding */}
      <section className="py-20 px-4" aria-label="Company mission and vision">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="article" aria-label="Mission statement">
              <CardBody className="p-8">
                <h3 className="text-3xl font-bold text-evergreen-400 mb-6">Our Mission</h3>
                <p className="text-charcoal-300 leading-relaxed mb-6" itemProp="slogan">
                  To provide expert, safe, and environmentally responsible tree care services that enhance the beauty, safety, and value of properties throughout our community while fostering long-term relationships built on trust and excellence.
                </p>
                <div className="flex items-center gap-3 text-evergreen-400">
                  <span className="text-3xl" aria-label="Service area icon" role="img">🎯</span>
                  <span className="font-semibold" itemProp="areaServed">Serving Colfax & Surrounding Areas</span>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30" role="article" aria-label="Vision statement">
              <CardBody className="p-8">
                <h3 className="text-3xl font-bold text-evergreen-300 mb-6">Our Vision</h3>
                <p className="text-evergreen-200 leading-relaxed mb-6">
                  To be the most trusted and respected tree care company in Northern California, known for our expertise, safety standards, environmental stewardship, and unwavering commitment to customer satisfaction.
                </p>
                <div className="flex items-center gap-3 text-evergreen-300">
                  <SparklesIcon className="w-8 h-8" aria-hidden="true" />
                  <span className="font-semibold">Excellence in Every Service</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* GEO: Educational content section with tree care guides */}
      <TreeCareGuides />

      {/* GEO: Contact call-to-action with contact information */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Contact call-to-action">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-evergreen-400 mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-charcoal-300 mb-8">
            Experience the Barker Tree Services difference. Contact us today for your free consultation and estimate.
          </p>
          <div className="flex gap-4 justify-center flex-wrap" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <meta itemProp="contactType" content="customer service" />
            <Button 
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              as="a"
              size="lg"
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label="Call Barker Tree Services"
              itemProp="telephone"
            >
              {BUSINESS_INFO.phone}
            </Button>
            <Button 
              href={`mailto:${BUSINESS_INFO.email}`}
              as="a"
              size="lg"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-400 hover:bg-evergreen-900/30 font-bold"
              startContent={<EnvelopeIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label="Email Barker Tree Services"
              itemProp="email"
            >
              Send Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
