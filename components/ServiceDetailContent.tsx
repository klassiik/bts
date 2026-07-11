import { BUSINESS_INFO, SERVICE_AREAS } from '@/lib/config'
import { getWorkPhotosForService } from '@/lib/workGallery'
import { getServiceContent } from '@/lib/serviceContent'
import { cityToSlug } from '@/lib/utils'
import { ButtonLink, StaticCard, StaticCardBody } from '@/components/ui'
import { PhoneIcon, CheckCircleIcon, WrenchScrewdriverIcon, CalendarDaysIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Video from '@/components/Video'
import WorkGallery from '@/components/WorkGallery'

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
  const workPhotos = getWorkPhotosForService(service.id)
  const extra = getServiceContent(service.id)

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
          <ButtonLink
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold shadow-lg shadow-evergreen-900/50"
            aria-label="Call for a free estimate"
          >
            Call {BUSINESS_INFO.phone} for Free Estimate
          </ButtonLink>
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
          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
            <StaticCardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <WrenchScrewdriverIcon className="w-6 h-6 text-evergreen-400" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300">Equipment Used</h3>
              </div>
              <p className="text-charcoal-100">{service.equipment}</p>
            </StaticCardBody>
          </StaticCard>
          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
            <StaticCardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDaysIcon className="w-6 h-6 text-evergreen-400" aria-hidden="true" />
                <h3 className="text-xl font-bold text-evergreen-300">Best Time of Year</h3>
              </div>
              <p className="text-charcoal-100">{service.seasonality}</p>
            </StaticCardBody>
          </StaticCard>
        </div>
      </section>

      {/* Recent work — real photos/footage from jobs matching this service */}
      {(workPhotos.length > 0 || service.id === 'removal') && (
        <section className="py-16 px-4 bg-charcoal-900" aria-label={`Recent ${service.title} work`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-evergreen-300 mb-8 text-center">
              Recent {service.title} Work
            </h2>
            {service.id === 'removal' && (
              <div className="mb-8 rounded-lg overflow-hidden max-w-md mx-auto">
                <Video
                  src="/media/tree-removal-limbing.mp4"
                  className="w-full h-auto aspect-[9/16]"
                  aria-label="Barker climber limbing a tall pine during a sectional removal"
                />
              </div>
            )}
            <WorkGallery photos={workPhotos} />
          </div>
        </section>
      )}

      {/* Service Areas for this service */}
      <section className="py-16 px-4 bg-charcoal-950" aria-label="Service areas">
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

      {/* What affects the cost */}
      {extra && (
        <section className="py-16 px-4 bg-charcoal-950" aria-label={`What affects the cost of ${service.title.toLowerCase()}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CurrencyDollarIcon className="w-7 h-7 text-evergreen-400" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-evergreen-300">
                What Affects the Cost of {service.title}?
              </h2>
            </div>
            <p className="text-charcoal-100 mb-6 leading-relaxed">{extra.costIntro}</p>
            <ul className="space-y-3 mb-8">
              {extra.costFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-3 text-charcoal-100">
                  <CheckCircleIcon className="w-5 h-5 text-evergreen-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
            <p className="text-charcoal-100 leading-relaxed">
              Rather than quote a number sight-unseen, we give you a{' '}
              <span className="text-evergreen-300 font-semibold">free on-site estimate</span> with an
              exact price before any work begins — no obligation. Call{' '}
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-evergreen-300 underline hover:text-evergreen-200">
                {BUSINESS_INFO.phone}
              </a>{' '}to schedule.
            </p>
          </div>
        </section>
      )}

      {/* Service FAQ */}
      {extra && (
        <section className="py-16 px-4 bg-charcoal-900" aria-label={`${service.title} frequently asked questions`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <QuestionMarkCircleIcon className="w-7 h-7 text-evergreen-400" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-evergreen-300">
                {service.title} Questions, Answered
              </h2>
            </div>
            <div className="space-y-6">
              {extra.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-evergreen-300 mb-2">{faq.question}</h3>
                  <p className="text-charcoal-100 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-charcoal-950" aria-label="Contact us">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-evergreen-300 mb-4">Ready to Get Started?</h2>
          <p className="text-charcoal-100 mb-4 text-lg">
            Contact Barker Tree Services today for a free {service.title.toLowerCase()} estimate.
          </p>
          <p className="text-charcoal-200 mb-8 text-sm">
            California licensed &amp; insured — CSLB {BUSINESS_INFO.cslbClassification} (Tree &amp; Palm) #{BUSINESS_INFO.cslb}.{' '}
            <a
              href={BUSINESS_INFO.cslbLookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-evergreen-300 underline hover:text-evergreen-200"
            >
              Verify our license at CSLB
            </a>
            .
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <ButtonLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              aria-label="Call for a free estimate"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold shadow-lg shadow-evergreen-900/50"
            >
              {BUSINESS_INFO.phone}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
            >
              Request Free Estimate
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
