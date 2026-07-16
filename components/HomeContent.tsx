'use client'

import { SERVICE_AREAS, BUSINESS_INFO, COMPANY_CREDENTIALS, YEARS_IN_BUSINESS, GOOGLE_BUSINESS, FOUNDING_YEAR } from '@/lib/config'
import { WORK_PHOTOS } from '@/lib/workGallery'
import WorkGallery from '@/components/WorkGallery'
import { Button, Card, CardBody, Chip } from '@heroui/react'
import { PhoneIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BoltIcon,
  ScissorsIcon,
  TruckIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import Video from '@/components/Video'
import { getVideoUrl } from '@/lib/media'

// Lazy load below-the-fold components for better initial load performance
const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => (
    <div className="py-20 px-4 bg-charcoal-900/30 flex items-center justify-center">
      <div className="animate-pulse text-evergreen-300">Loading FAQ...</div>
    </div>
  ),
  ssr: true // Keep SSR for SEO
})

export default function HomeContent() {
  return (
    <>
      {/* GEO: Hero section with semantic article landmark for main business proposition */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 py-20 px-4 overflow-hidden" aria-label="Hero - Professional Tree Services in Colfax, CA">
        <Video
          src={getVideoUrl('552252494_24763328253355339_8075536204197305204_n')}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" style={{ zIndex: 1 }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-evergreen-600/10 rounded-full blur-3xl" style={{ zIndex: 1 }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" style={{ zIndex: 1 }}></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative" style={{ zIndex: 10 }}>
          <div>
            <Chip className="mb-4 bg-evergreen-950/40 border border-evergreen-600/30" variant="bordered" aria-label="Business experience badge">
              <span className="text-evergreen-300 font-semibold">{YEARS_IN_BUSINESS} Years Experience</span>
            </Chip>
            {/* GEO: H1 optimized with location and service keywords for AI understanding */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-charcoal-50">
              Expert Tree Services in <span className="text-evergreen-300">Colfax, CA</span>
            </h1>
            <p className="text-xl text-charcoal-100 mb-8 leading-relaxed">
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
                className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
                aria-label="View our tree care services"
              >
                View Services
              </Button>
            </div>
          </div>
          
          {/* GEO: Service areas card with structured location data for geographic AI queries */}
          <Card className="bg-charcoal-800/50 border border-evergreen-900/30 backdrop-blur-sm" role="region" aria-label="Service coverage areas">
             <CardBody className="p-6">
               <h2 className="text-2xl font-bold text-evergreen-300 mb-4">Our Service Areas</h2>
               <ul className="grid grid-cols-2 gap-3" aria-label="Cities served by Barker Tree Services">
                 {SERVICE_AREAS.map((area) => (
                   <li key={area.city} className="flex items-center gap-2 text-charcoal-100">
                     <CheckCircleIcon className="w-5 h-5 text-evergreen-400 flex-shrink-0" aria-hidden="true" />
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
          <h2 className="text-4xl font-bold text-evergreen-300 mb-12 text-center">Why Choose Barker Tree Services?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* GEO: Value proposition cards with list item roles for structured AI extraction */}
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <CheckBadgeIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Licensed & Insured</h3>
                <p className="text-charcoal-100 text-sm">CSLB #{BUSINESS_INFO.cslb}</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <AcademicCapIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Expert Training</h3>
                <p className="text-charcoal-100 text-sm">Ongoing education & training</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <UserGroupIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Expert Team</h3>
                <p className="text-charcoal-100 text-sm">{COMPANY_CREDENTIALS.experience}</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <BoltIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Emergency Ready</h3>
                <p className="text-charcoal-100 text-sm">24/7 storm response</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Social proof: the real, verifiable Google profile only. On-site
          testimonial copy was removed — unverifiable first-party quotes are
          "self-serving reviews" under Google's review-snippet policy, and the
          linked GBP rating is a stronger signal than any quote we host. */}
      <section className="py-20 px-4 bg-charcoal-900" aria-label="Customer reviews">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-200 mb-4 text-center">What Our Customers Say</h2>

          <Card className="max-w-2xl mx-auto mb-12 bg-charcoal-800/80 border border-evergreen-900/20">
            <CardBody className="text-center p-8">
              <div className="flex justify-center items-center gap-1 mb-4" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-7 h-7 text-amber-400" />
                ))}
              </div>
              <p className="text-2xl font-bold text-evergreen-200 mb-2">
                {GOOGLE_BUSINESS.rating.toFixed(1)} out of 5 on Google
              </p>
              <p className="text-charcoal-100 mb-6">
                Based on {GOOGLE_BUSINESS.reviewCount} verified customer reviews
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
            </CardBody>
          </Card>

          <div className="text-center">
            <p className="text-charcoal-50 mb-6">Licensed, insured, and serving Colfax and surrounding areas since {FOUNDING_YEAR}</p>
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

      {/* Recent work — real job-site photos (visual proof of work) */}
      <section className="py-20 px-4 bg-charcoal-950" aria-label="Photos of recent tree work">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-300 mb-4 text-center">Recent Work</h2>
          <p className="text-charcoal-50 text-center mb-12">
            Real jobs from around Placer &amp; Nevada Counties — sectional removals, rigging, and cleanup
          </p>
          <WorkGallery photos={WORK_PHOTOS} />
        </div>
      </section>

      {/* GEO: Services preview with structured offer catalog for AI extraction */}
      <section className="py-20 px-4 bg-charcoal-950" aria-label="Professional tree services preview">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-300 mb-12 text-center">Our Professional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Tree care services offered">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all">
              <CardBody className="text-center p-6">
                <ScissorsIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold text-evergreen-300 mb-2">Tree Trimming</h3>
                <p className="text-charcoal-100 text-sm">Professional pruning for health and beauty</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all">
              <CardBody className="text-center p-6">
                <TruckIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold text-evergreen-300 mb-2">Tree Removal</h3>
                <p className="text-charcoal-100 text-sm">Safe removal of hazardous trees</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all">
              <CardBody className="text-center p-6">
                <Cog6ToothIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold text-evergreen-300 mb-2">Stump Grinding</h3>
                <p className="text-charcoal-100 text-sm">Complete stump removal solutions</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all">
              <CardBody className="text-center p-6">
                <BoltIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold text-evergreen-300 mb-2">Emergency</h3>
                <p className="text-charcoal-100 text-sm">24/7 storm damage response</p>
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
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 font-bold"
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
