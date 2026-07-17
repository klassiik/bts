/* GEO: Footer with semantic contentinfo landmark, navigation, and contact information */
import Link from 'next/link'
import { BUSINESS_INFO, SERVICE_AREAS, GOOGLE_BUSINESS, CITATION_PROFILES } from '@/lib/config'
import { cityToSlug } from '@/lib/utils'
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-950 border-t border-evergreen-900/20 py-12 px-4" role="contentinfo" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 pb-8 border-b border-charcoal-800/50">
          <div>
            <h3 className="font-bold text-evergreen-300 mb-4 text-lg">Barker Tree Services</h3>
            <p className="text-sm text-charcoal-100 leading-relaxed">Expert tree care serving Colfax and surrounding areas. Licensed & insured.</p>
            <div className="mt-4 inline-block px-3 py-1.5 bg-evergreen-950/40 border border-evergreen-900/30 rounded-lg">
              <p className="text-xs text-evergreen-300 font-semibold">CSLB License #{BUSINESS_INFO.cslb}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-bold text-evergreen-300 mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="list-none">
                <Link href="/" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to home page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Home
                </Link>
              </li>
              <li className="list-none">
                <Link href="/services" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to services page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Services
                </Link>
              </li>
              <li className="list-none">
                <Link href="/service-areas" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to service areas page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Service Areas
                </Link>
              </li>
              <li className="list-none">
                <Link href="/about" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to about page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  About
                </Link>
              </li>
              <li className="list-none">
                <Link href="/guides" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to tree care guides">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Guides
                </Link>
              </li>
              <li className="list-none">
                <Link href="/contact" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to contact page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Contact
                </Link>
              </li>
              <li className="list-none">
                <Link href="/emergency" className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group" aria-label="Navigate to emergency services page">
                  <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                  Emergency
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Service areas navigation">
            <h3 className="font-bold text-evergreen-300 mb-4 text-lg">Service Areas</h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_AREAS.map((area) => (
                <li key={`${area.city}-${area.state}-${cityToSlug(area.city)}`} className="list-none">
                  <Link
                    href={`/service-areas/${cityToSlug(area.city)}`}
                    className="text-charcoal-100 hover:text-evergreen-300 transition-colors flex items-center gap-2 group"
                    aria-label={`Tree services in ${area.city}, ${area.state}`}
                  >
                    <span className="w-1.5 h-1.5 bg-sage-500 rounded-full group-hover:bg-evergreen-400 transition-colors" aria-hidden="true"></span>
                    {area.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h3 className="font-bold text-evergreen-300 mb-4 text-lg">Contact</h3>
            <div className="space-y-3">
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="flex items-center gap-2 text-sm text-charcoal-100 hover:text-evergreen-300 transition-colors group" aria-label="Call Barker Tree Services">
                <PhoneIcon className="w-5 h-5 text-sage-400 group-hover:text-evergreen-400 transition-colors" aria-hidden="true" />
                {BUSINESS_INFO.phone}
              </a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-sm text-charcoal-100 hover:text-evergreen-300 transition-colors group" aria-label="Email Barker Tree Services">
                <EnvelopeIcon className="w-5 h-5 text-sage-400 group-hover:text-evergreen-400 transition-colors" aria-hidden="true" />
                {BUSINESS_INFO.email}
              </a>
              <a
                href={GOOGLE_BUSINESS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-charcoal-100 hover:text-evergreen-300 transition-colors group"
                aria-label={`Barker Tree Services on Google — rated ${GOOGLE_BUSINESS.rating} stars`}
              >
                <span className="text-amber-400" aria-hidden="true">★</span>
                {GOOGLE_BUSINESS.rating.toFixed(1)} on Google ({GOOGLE_BUSINESS.reviewCount} reviews)
              </a>
            </div>

            {/* Citation profiles. These were previously only in JSON-LD
                sameAs — as visible links they double as trust signals. */}
            <div className="mt-4 pt-4 border-t border-evergreen-900/20">
              <p className="text-xs text-charcoal-200 mb-2">Find us on</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {CITATION_PROFILES.filter(profile => profile.name !== 'Google').map(profile => (
                  <a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center py-2 text-sm text-charcoal-100 hover:text-evergreen-300 transition-colors"
                    aria-label={`Barker Tree Services on ${profile.name}`}
                  >
                    {profile.name}
                  </a>
                ))}
                <a
                  href={BUSINESS_INFO.cslbLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center py-2 text-sm text-charcoal-100 hover:text-evergreen-300 transition-colors"
                  aria-label={`Verify CSLB license number ${BUSINESS_INFO.cslb} on the California Contractors State License Board site`}
                >
                  Verify our CSLB license →
                </a>
              </div>
            </div>
          </address>

          <div>
            <h3 className="font-bold text-evergreen-300 mb-4 text-lg">Hours</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <ClockIcon className="w-5 h-5 text-sage-400 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-charcoal-100">{BUSINESS_INFO.hours}</p>
                </div>
              </div>
              <div className="mt-3 inline-block px-3 py-1.5 bg-amber-950/40 border border-amber-900/30 rounded-lg">
                <p className="text-sm text-amber-300 font-semibold" aria-label="24/7 emergency service availability">Emergency: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-charcoal-100">
           <p>&copy; {currentYear} Barker Tree Services. All rights reserved.</p>
         </div>
      </div>
    </footer>
  )
}
