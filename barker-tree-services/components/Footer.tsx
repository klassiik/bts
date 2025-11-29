/* GEO: Footer with semantic contentinfo landmark, navigation, and contact information */
import Link from 'next/link'
import { BUSINESS_INFO } from '@/lib/config'
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-950 border-t border-evergreen-900/20 py-12 px-4" role="contentinfo" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-charcoal-800/50">
          <div itemScope itemType="https://schema.org/LocalBusiness">
            <h3 className="font-bold text-evergreen-400 mb-4 text-lg" itemProp="name">Barker Tree Services</h3>
            <p className="text-sm text-charcoal-300 leading-relaxed" itemProp="description">Expert tree care serving Colfax and surrounding areas. Licensed & insured.</p>
            <div className="mt-4 inline-block px-3 py-1.5 bg-evergreen-950/40 border border-evergreen-900/30 rounded-lg">
              <p className="text-xs text-evergreen-400 font-semibold">CSLB License #{BUSINESS_INFO.cslb}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-bold text-evergreen-400 mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2.5 text-sm" role="list">
              <li><Link href="/" className="text-charcoal-300 hover:text-evergreen-400 transition-colors flex items-center gap-2 group" aria-label="Navigate to home page">
                <span className="w-1.5 h-1.5 bg-sage-600 rounded-full group-hover:bg-evergreen-500 transition-colors" aria-hidden="true"></span>
                Home
              </Link></li>
              <li><Link href="/services" className="text-charcoal-300 hover:text-evergreen-400 transition-colors flex items-center gap-2 group" aria-label="Navigate to services page">
                <span className="w-1.5 h-1.5 bg-sage-600 rounded-full group-hover:bg-evergreen-500 transition-colors" aria-hidden="true"></span>
                Services
              </Link></li>
              <li><Link href="/service-areas" className="text-charcoal-300 hover:text-evergreen-400 transition-colors flex items-center gap-2 group" aria-label="Navigate to service areas page">
                <span className="w-1.5 h-1.5 bg-sage-600 rounded-full group-hover:bg-evergreen-500 transition-colors" aria-hidden="true"></span>
                Service Areas
              </Link></li>
              <li><Link href="/about" className="text-charcoal-300 hover:text-evergreen-400 transition-colors flex items-center gap-2 group" aria-label="Navigate to about page">
                <span className="w-1.5 h-1.5 bg-sage-600 rounded-full group-hover:bg-evergreen-500 transition-colors" aria-hidden="true"></span>
                About
              </Link></li>
              <li><Link href="/contact" className="text-charcoal-300 hover:text-evergreen-400 transition-colors flex items-center gap-2 group" aria-label="Navigate to contact page">
                <span className="w-1.5 h-1.5 bg-sage-600 rounded-full group-hover:bg-evergreen-500 transition-colors" aria-hidden="true"></span>
                Contact
              </Link></li>
            </ul>
          </nav>

          <address className="not-italic" itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="font-bold text-evergreen-400 mb-4 text-lg">Contact</h3>
            <div className="space-y-3">
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-evergreen-400 transition-colors group" aria-label="Call Barker Tree Services" itemProp="telephone">
                <PhoneIcon className="w-5 h-5 text-sage-500 group-hover:text-evergreen-500 transition-colors" aria-hidden="true" />
                {BUSINESS_INFO.phone}
              </a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-evergreen-400 transition-colors group" aria-label="Email Barker Tree Services" itemProp="email">
                <EnvelopeIcon className="w-5 h-5 text-sage-500 group-hover:text-evergreen-500 transition-colors" aria-hidden="true" />
                {BUSINESS_INFO.email}
              </a>
            </div>
          </address>

          <div>
            <h3 className="font-bold text-evergreen-400 mb-4 text-lg">Hours</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <ClockIcon className="w-5 h-5 text-sage-500 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-charcoal-300">{BUSINESS_INFO.hours}</p>
                </div>
              </div>
              <div className="mt-3 inline-block px-3 py-1.5 bg-amber-950/40 border border-amber-900/30 rounded-lg">
                <p className="text-sm text-amber-400 font-semibold" aria-label="24/7 emergency service availability">Emergency: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-charcoal-400">
          <p>&copy; {currentYear} Barker Tree Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
