/* GEO: Contact page with ContactPoint schema markers and semantic address structure */
import { BUSINESS_INFO, GOOGLE_BUSINESS } from '@/lib/config'
import ContactForm from '@/components/ContactForm'
import { StaticCard, StaticCardBody, StaticCardLink, StaticChip } from '@/components/ui'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import Video from '@/components/Video'
import { getVideoUrl, getVideoMobileUrl } from '@/lib/media'

// Card look carried over from the old HeroUI cards: 14px radius, soft shadow
// with a hairline inner highlight, light-grey default text colour.
const cardLook = 'rounded-[14px] shadow-[0px_0px_15px_0px_#0000000f,0px_2px_30px_0px_#00000038,inset_0px_0px_1px_0px_#ffffff26] text-[#e6e6e7]'
const cardBody = 'flex-row items-start gap-4 p-6 text-left'

export default function ContactContent() {
  return (
    <section className="relative py-20 px-4 bg-charcoal-950 min-h-[calc(100vh-200px)] overflow-hidden" aria-label="Contact Barker Tree Services">
      <Video
        src={getVideoUrl('556677411_32055543104036746_2204476273704338762_n')}
        mobileSrc={getVideoMobileUrl('556677411_32055543104036746_2204476273704338762_n')}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-12">
          <StaticChip
            className="mb-4 h-7 py-0 px-3 whitespace-nowrap bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            aria-label="Contact section label"
          >
            Get In Touch
          </StaticChip>
          {/* GEO: H1 optimized with location and contact keywords */}
          <h1 className="text-5xl font-bold text-charcoal-50 mb-4">Contact Us</h1>
          <p className="text-charcoal-100 text-lg">Ready to transform your property? Let&apos;s discuss your tree care needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* GEO: Contact information cards with ContactPoint schema markers */}
          <div className="space-y-6" role="list" aria-label="Contact methods">
            <StaticCardLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className={`bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all ${cardLook}`}
              role="listitem"
              aria-label="Phone contact card"
            >
              <StaticCardBody className={cardBody}>
                <PhoneIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h2 className="font-bold text-lg text-evergreen-300">Phone</h2>
                  <p className="text-evergreen-300 font-semibold">{BUSINESS_INFO.phone}</p>
                  <p className="text-charcoal-100 text-sm">Call for immediate assistance</p>
                </div>
              </StaticCardBody>
            </StaticCardLink>

            <StaticCardLink
              href={`mailto:${BUSINESS_INFO.email}`}
              className={`bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all ${cardLook}`}
              role="listitem"
              aria-label="Email contact card"
            >
              <StaticCardBody className={cardBody}>
                <EnvelopeIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h2 className="font-bold text-lg text-evergreen-300">Email</h2>
                  <p className="text-evergreen-300 font-semibold">{BUSINESS_INFO.email}</p>
                  <p className="text-charcoal-100 text-sm">Send us a message anytime</p>
                </div>
              </StaticCardBody>
            </StaticCardLink>

            <StaticCard className={`bg-charcoal-800/50 border border-evergreen-900/20 ${cardLook}`} role="listitem" aria-label="Address and Google Business Profile">
              <StaticCardBody className={cardBody}>
                <MapPinIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <address className="not-italic">
                  <h2 className="font-bold text-lg text-evergreen-300">Address</h2>
                  <p className="text-charcoal-100">{BUSINESS_INFO.address}</p>
                  <p className="text-charcoal-100 text-sm mt-1">Serving Placer &amp; Nevada Counties</p>
                  <a
                    href={GOOGLE_BUSINESS.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-evergreen-300 text-sm underline hover:text-evergreen-200 mt-1 inline-block"
                    aria-label={`Find Barker Tree Services on Google — rated ${GOOGLE_BUSINESS.rating} stars from ${GOOGLE_BUSINESS.reviewCount} reviews`}
                  >
                    Find us on Google — {GOOGLE_BUSINESS.rating.toFixed(1)} ★ ({GOOGLE_BUSINESS.reviewCount} reviews)
                  </a>
                </address>
              </StaticCardBody>
            </StaticCard>

            <StaticCard className={`bg-charcoal-800/50 border border-evergreen-900/20 ${cardLook}`} role="listitem" aria-label="Business hours information">
              <StaticCardBody className={cardBody}>
                <ClockIcon className="w-8 h-8 text-evergreen-500" aria-hidden="true" />
                <div>
                  <h2 className="font-bold text-lg text-evergreen-300">Business Hours</h2>
                  <p className="text-charcoal-100">{BUSINESS_INFO.hours}</p>
                  <StaticChip
                    className="mt-2 h-6 py-0 px-2 text-xs whitespace-nowrap bg-amber-900/30 border border-amber-600/30 text-amber-400"
                    aria-label="Emergency availability"
                  >
                    Emergency: Available 24/7
                  </StaticChip>
                </div>
              </StaticCardBody>
            </StaticCard>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
