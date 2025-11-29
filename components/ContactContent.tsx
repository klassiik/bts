'use client'

/* GEO: Contact page with ContactPoint schema markers and semantic address structure */
import { BUSINESS_INFO } from '@/lib/config'
import ContactForm from '@/components/ContactForm'
import { Card, CardBody, Chip } from '@heroui/react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import Video from '@/components/Video'

export default function ContactContent() {
  return (
    <section className="relative py-20 px-4 bg-charcoal-950 min-h-[calc(100vh-200px)] overflow-hidden" aria-label="Contact Barker Tree Services" itemScope itemType="https://schema.org/ContactPage">
      <Video
        src="/media/556677411_32055543104036746_2204476273704338762_n.mp4"
        className="absolute inset-0 -z-10 w-full h-full object-cover opacity-30"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Chip 
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
            aria-label="Contact section label"
          >
            Get In Touch
          </Chip>
          {/* GEO: H1 optimized with location and contact keywords */}
          <h1 className="text-5xl font-bold text-charcoal-50 mb-4">Contact Us</h1>
          <p className="text-charcoal-300 text-lg">Ready to transform your property? Let&apos;s discuss your tree care needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* GEO: Contact information cards with ContactPoint schema markers */}
          <div className="space-y-6" role="list" aria-label="Contact methods" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <meta itemProp="contactType" content="customer service" />
            <Card 
              as="a"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              isPressable
              className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all"
              role="listitem"
              aria-label="Phone contact card"
            >
              <CardBody className="flex flex-row items-start gap-4 p-6">
                <PhoneIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-lg text-evergreen-400">Phone</h3>
                  <p className="text-evergreen-300 font-semibold" itemProp="telephone">{BUSINESS_INFO.phone}</p>
                  <p className="text-charcoal-400 text-sm">Call for immediate assistance</p>
                </div>
              </CardBody>
            </Card>

            <Card 
              as="a"
              href={`mailto:${BUSINESS_INFO.email}`}
              isPressable
              className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all"
              role="listitem"
              aria-label="Email contact card"
            >
              <CardBody className="flex flex-row items-start gap-4 p-6">
                <EnvelopeIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-lg text-evergreen-400">Email</h3>
                  <p className="text-evergreen-300 font-semibold" itemProp="email">{BUSINESS_INFO.email}</p>
                  <p className="text-charcoal-400 text-sm">Send us a message anytime</p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem" aria-label="Service area information">
              <CardBody className="flex flex-row items-start gap-4 p-6">
                <MapPinIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <h3 className="font-bold text-lg text-evergreen-400">Service Area</h3>
                  <p className="text-charcoal-300" itemProp="streetAddress">{BUSINESS_INFO.address}</p>
                  <p className="text-charcoal-400 text-sm mt-1" itemProp="areaServed">Serving Placer & Nevada Counties</p>
                </address>
              </CardBody>
            </Card>

            <Card className="bg-charcoal-800/50 border border-evergreen-900/20" role="listitem" aria-label="Business hours information">
              <CardBody className="flex flex-row items-start gap-4 p-6">
                <ClockIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-lg text-evergreen-400">Business Hours</h3>
                  <p className="text-charcoal-300" itemProp="hoursAvailable">{BUSINESS_INFO.hours}</p>
                  <Chip 
                    className="mt-2 bg-amber-900/30 border border-amber-600/30 text-amber-400"
                    size="sm"
                    variant="bordered"
                    aria-label="Emergency availability"
                  >
                    Emergency: Available 24/7
                  </Chip>
                </div>
              </CardBody>
            </Card>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
