import Link from 'next/link'
import { SERVICE_AREAS, BUSINESS_INFO, COMPANY_CREDENTIALS, YEARS_IN_BUSINESS, GOOGLE_BUSINESS, FOUNDING_YEAR } from '@/lib/config'
import { cityToSlug } from '@/lib/utils'
import { WORK_PHOTOS } from '@/lib/workGallery'
import WorkGallery from '@/components/WorkGallery'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, StarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BoltIcon,
  ClockIcon,
  ScissorsIcon,
  TruckIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import FAQSection from '@/components/FAQSection'
import Video from '@/components/Video'
import { getVideoUrl, getVideoHeroUrl, getVideoMobileUrl, getVideoPosterUrl } from '@/lib/media'

// Hero city line: a short, high-signal subset; the rest are one click away.
const HERO_CITIES = ['Colfax', 'Auburn', 'Grass Valley', 'Nevada City']
const heroAreas = HERO_CITIES.map((city) => SERVICE_AREAS.find((a) => a.city === city)).filter(
  (a): a is (typeof SERVICE_AREAS)[number] => a !== undefined
)
const moreCount = SERVICE_AREAS.length - heroAreas.length

export default function HomeContent() {
  return (
    <>
      {/* GEO: Hero section with semantic article landmark for main business proposition */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 py-20 px-4 overflow-hidden" aria-label="Hero - Professional Tree Services in Colfax, CA">
        <Video
          src={
            getVideoHeroUrl('553827505_24841983355418125_3276620820634142277_n') ??
            getVideoUrl('553827505_24841983355418125_3276620820634142277_n')
          }
          mobileSrc={getVideoMobileUrl('553827505_24841983355418125_3276620820634142277_n')}
          poster={getVideoPosterUrl('553827505_24841983355418125_3276620820634142277_n')}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal-950/50 via-charcoal-950/35 to-charcoal-950/25 md:bg-gradient-to-r md:from-charcoal-950/90 md:via-charcoal-950/60 md:to-charcoal-950/20 pointer-events-none"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" style={{ zIndex: 1 }}></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative" style={{ zIndex: 10 }}>
          <div>
            <StaticChip className="mb-4 bg-evergreen-950/40 border border-evergreen-600/30" variant="bordered" aria-label="Business experience badge">
              <span className="text-evergreen-300 font-semibold">{YEARS_IN_BUSINESS} Years Experience</span>
            </StaticChip>
            {/* GEO: H1 optimized with location and service keywords for AI understanding */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-charcoal-50">
              Expert Tree Services in <span className="text-evergreen-300">Colfax, CA</span>
            </h1>
            <p className="text-xl text-charcoal-100 mb-8 leading-relaxed">
               Professional tree trimming, removal, and emergency services. Licensed, insured, and available 24/7.
             </p>
            <div className="flex gap-4 flex-wrap">
              {/* GEO: Primary CTA with semantic link relationship */}
              <ButtonLink
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
                className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white text-lg font-bold shadow-lg shadow-evergreen-900/50"
                aria-label="Call Barker Tree Services now"
              >
                {BUSINESS_INFO.phone}
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="bordered"
                className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 text-lg font-bold"
                aria-label="View our tree care services"
              >
                View Services
              </ButtonLink>
            </div>

            {/* Trust line: verifiable proof (Google profile + CSLB lookup) next to the CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-charcoal-100">
              <a
                href={GOOGLE_BUSINESS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-evergreen-300"
                aria-label={`Rated ${GOOGLE_BUSINESS.rating.toFixed(1)} out of 5 from ${GOOGLE_BUSINESS.reviewCount} Google reviews (opens in a new tab)`}
              >
                <span className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </span>
                <span className="font-semibold text-charcoal-50">{GOOGLE_BUSINESS.rating.toFixed(1)}</span>
                · {GOOGLE_BUSINESS.reviewCount} Google reviews
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-charcoal-400">·</span>
              <a
                href={BUSINESS_INFO.cslbLookupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-evergreen-300"
                aria-label={`Verify CSLB license ${BUSINESS_INFO.cslbClassification} #${BUSINESS_INFO.cslb} (opens in a new tab)`}
              >
                CSLB {BUSINESS_INFO.cslbClassification} #<span className="font-semibold text-charcoal-50">{BUSINESS_INFO.cslb}</span>
              </a>
            </div>

            {/* GEO: Service-area links give crawlers and AI direct city-level paths */}
            <p className="mt-3 text-sm text-charcoal-200">
              Serving{' '}
              {heroAreas.map((area, i) => (
                <span key={area.city}>
                  {i > 0 && ', '}
                  <Link
                    href={`/service-areas/${cityToSlug(area.city)}`}
                    className="underline decoration-charcoal-500 underline-offset-2 hover:text-evergreen-300"
                  >
                    {area.city}
                  </Link>
                </span>
              ))}{' '}
              <span className="whitespace-nowrap">
                +{' '}
                <Link href="/service-areas" className="font-semibold text-evergreen-300 hover:text-evergreen-200">
                  {moreCount} more <span aria-hidden="true">→</span>
                </Link>
              </span>
            </p>
          </div>
          
          {/* Free-estimate card: primary conversion path, stacks under the copy on phones */}
          <StaticCard
            className="w-full md:max-w-sm md:justify-self-end bg-charcoal-900/80 border border-evergreen-800/40 backdrop-blur-sm shadow-xl"
            role="region"
            aria-label="Free estimate"
          >
            <StaticCardBody className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-evergreen-300">Free Estimates</h2>
              <p className="mt-2 text-charcoal-100">On-site assessment, detailed pricing, no obligation.</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-evergreen-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-charcoal-100">{BUSINESS_INFO.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <BoltIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-charcoal-50 font-semibold">24/7 emergency storm response</span>
                </li>
              </ul>
              <ButtonLink
                href="/contact"
                className="mt-6 w-full justify-center bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white text-lg font-bold shadow-lg shadow-evergreen-900/50"
                aria-label="Request a free estimate"
              >
                Request an Estimate <span aria-hidden="true">→</span>
              </ButtonLink>
              <p className="mt-4 text-center text-sm text-charcoal-100">
                or call{' '}
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-semibold text-evergreen-300 underline hover:text-evergreen-200">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
            </StaticCardBody>
          </StaticCard>
        </div>
      </section>

      {/* GEO: Value propositions section with semantic article structure */}
      <section className="py-20 px-4 bg-charcoal-950" aria-label="Why choose us - Key differentiators">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-300 mb-12 text-center">Why Choose Barker Tree Services?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* GEO: Value proposition cards with list item roles for structured AI extraction */}
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
              <StaticCardBody className="text-center p-6">
                <CheckBadgeIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Licensed & Insured</h3>
                <p className="text-charcoal-100 text-sm">CSLB #{BUSINESS_INFO.cslb}</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
              <StaticCardBody className="text-center p-6">
                <AcademicCapIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Expert Training</h3>
                <p className="text-charcoal-100 text-sm">Ongoing education & training</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
              <StaticCardBody className="text-center p-6">
                <UserGroupIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Expert Team</h3>
                <p className="text-charcoal-100 text-sm">{COMPANY_CREDENTIALS.experience}</p>
              </StaticCardBody>
            </StaticCard>
            <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20">
              <StaticCardBody className="text-center p-6">
                <BoltIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-evergreen-300 mb-2">Emergency Ready</h3>
                <p className="text-charcoal-100 text-sm">24/7 storm response</p>
              </StaticCardBody>
            </StaticCard>
          </div>
        </div>
      </section>

      {/* Social proof: the real, verifiable Google profile only. On-site
          testimonial copy was removed — unverifiable first-party quotes are
          "self-serving reviews" under Google's review-snippet policy, and the
          linked GBP rating is a stronger signal than any quote we host. */}
      <section className="py-20 px-4 bg-charcoal-900" aria-label="Customer reviews">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-evergreen-200 mb-4 text-center">Rated {GOOGLE_BUSINESS.rating.toFixed(1)} on Google</h2>

          <StaticCard className="max-w-2xl mx-auto mb-12 bg-charcoal-800/80 border border-evergreen-900/20">
            <StaticCardBody className="text-center p-8">
              <div className="flex justify-center items-center gap-1 mb-4" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-7 h-7 text-amber-400" />
                ))}
              </div>
              <p className="text-charcoal-100 mb-6">
                Based on {GOOGLE_BUSINESS.reviewCount} reviews on Google
              </p>
              <a
                href={GOOGLE_BUSINESS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-evergreen-300 underline hover:text-evergreen-200 font-semibold"
                aria-label={`Read all ${GOOGLE_BUSINESS.reviewCount} reviews on our Google Business Profile`}
              >
                Read every review on Google <span aria-hidden="true">→</span>
              </a>
            </StaticCardBody>
          </StaticCard>

          <div className="text-center">
            <p className="text-charcoal-50 mb-6">Licensed, insured, and serving Colfax and surrounding areas since {FOUNDING_YEAR}</p>
            <ButtonLink
              href="/contact"
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white text-lg font-bold shadow-lg"
              startContent={<ClipboardDocumentListIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label="Request a free estimate"
            >
              Get Your Free Estimate
            </ButtonLink>
            <p className="mt-4 text-charcoal-100">
              Prefer to talk?{' '}
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-semibold text-evergreen-300 underline hover:text-evergreen-200">
                Call {BUSINESS_INFO.phone}
              </a>
            </p>
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
            <Link
              href="/services/trimming"
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
            >
              <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all h-full">
                <StaticCardBody className="text-center p-6">
                  <ScissorsIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-evergreen-300 mb-2">Tree Trimming</h3>
                  <p className="text-charcoal-100 text-sm">Professional pruning for health and beauty</p>
                  <span className="mt-3 text-sm font-semibold text-evergreen-300 group-hover:text-evergreen-200">Learn more <span aria-hidden="true">→</span></span>
                </StaticCardBody>
              </StaticCard>
            </Link>
            <Link
              href="/services/removal"
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
            >
              <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all h-full">
                <StaticCardBody className="text-center p-6">
                  <TruckIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-evergreen-300 mb-2">Tree Removal</h3>
                  <p className="text-charcoal-100 text-sm">Safe removal of hazardous trees</p>
                  <span className="mt-3 text-sm font-semibold text-evergreen-300 group-hover:text-evergreen-200">Learn more <span aria-hidden="true">→</span></span>
                </StaticCardBody>
              </StaticCard>
            </Link>
            <Link
              href="/services/stump"
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
            >
              <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all h-full">
                <StaticCardBody className="text-center p-6">
                  <Cog6ToothIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-evergreen-300 mb-2">Stump Grinding</h3>
                  <p className="text-charcoal-100 text-sm">Complete stump removal solutions</p>
                  <span className="mt-3 text-sm font-semibold text-evergreen-300 group-hover:text-evergreen-200">Learn more <span aria-hidden="true">→</span></span>
                </StaticCardBody>
              </StaticCard>
            </Link>
            <Link
              href="/services/emergency"
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
            >
              <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20 hover:scale-105 hover:border-evergreen-600/40 transition-all h-full">
                <StaticCardBody className="text-center p-6">
                  <BoltIcon className="w-10 h-10 text-evergreen-400 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-evergreen-300 mb-2">Emergency</h3>
                  <p className="text-charcoal-100 text-sm">24/7 storm damage response</p>
                  <span className="mt-3 text-sm font-semibold text-evergreen-300 group-hover:text-evergreen-200">Learn more <span aria-hidden="true">→</span></span>
                </StaticCardBody>
              </StaticCard>
            </Link>
          </div>
          <div className="text-center mt-8">
            <ButtonLink
              href="/services"
              aria-label="View all tree care services"
              variant="bordered"
              className="border-evergreen-600 text-evergreen-300 hover:bg-evergreen-950/30 text-lg font-bold"
            >
              View All Services <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* GEO: FAQ Section for featured snippets and voice search optimization */}
      <FAQSection />
    </>
  )
}
