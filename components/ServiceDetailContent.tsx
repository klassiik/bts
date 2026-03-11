'use client'

import { BUSINESS_INFO, SERVICE_AREAS } from '@/lib/config'
import { cityToSlug } from '@/lib/utils'
import { Button, Card, CardBody } from '@heroui/react'
import { PhoneIcon, CheckCircleIcon, WrenchScrewdriverIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface ServiceData {
  id: string
  title: string
  location?: string
  description: string
  features?: string[]
  process: string
  benefits?: string[]
  equipment: string
  seasonality: string
}

export default function ServiceDetailContent({ service }: { service: ServiceData }) {
  const features = service.features ?? []
  const benefits = service.benefits ?? []
  const serviceLocation = service.location?.trim() || 'Northern California'

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 py-20 px-4" aria-label={`${service.title} services`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/services" className="text-evergreen-400 hover:text-evergreen-300 text-sm mb-4 inline-block">← All Services</Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal-50">
            Professional {service.title} in <span className="text-evergreen-300">{serviceLocation}</span>
          </h1>
          <p className="text-xl text-charcoal-100 mb-8 leading-relaxed">{service.description}</p>
          <Button
            as="a"
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            color="primary"
            size="lg"
            variant="shadow"
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold shadow-lg shadow-evergreen-900/50"
            aria-label="Call for a free estimate"
          >
            Call {BUSINESS_INFO.phone} for Free Estimate
          </Button>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 px-4 bg-charcoal-950" aria-label="Service features and benefits">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-evergreen-300 mb-6">What We Offer</h2>
            <ul className="space-y-3">
              {features.length > 0 ? (
                features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-charcoal-100">
                    <CheckCircleIcon className="w-5 h-5 text-evergreen-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <li className="text-charcoal-300">Service feature details will be shared during your estimate.</li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-evergreen-300 mb-6">Benefits</h2>
            <ul className="space-y-3">
              {benefits.length > 0 ? (
                benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-charcoal-100">
                    <CheckCircleIcon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))
              ) : (
                <li className="text-charcoal-300">Service benefit details will be shared during your estimate.</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 px-4 bg-charcoal-900" aria-label="Our process">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-6">Our Process</h2>
          <p className="text-charcoal-100 leading-relaxed text-lg">{service.process}</p>
        </div>
      </section>

      {/* Equipment & Seasonality */}
      <section className="py-16 px-4 bg-charcoal-950" aria-label="Equipment and timing">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="bg-charcoal-800/50 border border-evergreen-900/20">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <WrenchScrewdriverIcon className="w-6 h-6 text-evergreen-400" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300">Equipment Used</h3>
              </div>
              <p className="text-charcoal-100">{service.equipment}</p>
            </CardBody>
          </Card>
          <Card className="bg-charcoal-800/50 border border-evergreen-900/20">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDaysIcon className="w-6 h-6 text-evergreen-400" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300">Best Time of Year</h3>
              </div>
              <p className="text-charcoal-100">{service.seasonality}</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Service Areas for this service */}
      <section className="py-16 px-4 bg-charcoal-900" aria-label="Service areas">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-6">
            We Offer {service.title} Throughout Northern California
          </h2>
          <p className="text-charcoal-100 mb-8">
            Our {service.title.toLowerCase()} services are available in the following areas:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={`${area.city}-${area.state}`}
                href={`/service-areas/${cityToSlug(area.city)}`}
                className="px-4 py-2 bg-charcoal-800/50 border border-evergreen-900/30 rounded-lg text-evergreen-300 hover:bg-evergreen-950/30 hover:border-evergreen-600/40 transition-all text-sm"
              >
                {area.city}, {area.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-charcoal-950" aria-label="Contact us">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-4">Ready to Get Started?</h2>
          <p className="text-charcoal-100 mb-8 text-lg">
            Contact Barker Tree Services today for a free {service.title.toLowerCase()} estimate. Licensed (CSLB #{BUSINESS_INFO.cslb}) and fully insured.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              as="a"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              aria-label="Call for a free estimate"
              color="primary"
              size="lg"
              variant="shadow"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold shadow-lg shadow-evergreen-900/50"
            >
              {BUSINESS_INFO.phone}
            </Button>
            <Button
              as="a"
              href="/contact"
              size="lg"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
            >
              Request Free Estimate
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
