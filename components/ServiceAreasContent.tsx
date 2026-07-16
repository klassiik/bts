/* GEO: Service areas page with geographic schema markers and semantic navigation */
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, CheckCircleIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { BoltIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function ServiceAreasContent() {
  return (
    <section className="py-20 px-4 bg-charcoal-950 min-h-[calc(100vh-200px)]" aria-label="Service areas coverage">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <StaticChip 
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
            aria-label="Service region badge"
          >
            Serving Northern California
          </StaticChip>
          {/* GEO: H1 optimized with geographic keywords for AI discovery */}
          <h1 className="text-5xl font-bold text-charcoal-50 mb-4">Service Areas</h1>
          <p className="text-xl text-charcoal-100">Proudly serving Colfax and all surrounding communities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20" role="navigation" aria-label="Cities served navigation">
            <StaticCardBody className="p-8">
              <h2 className="text-2xl font-bold text-evergreen-300 mb-6">Cities We Serve</h2>
              <nav className="grid grid-cols-2 gap-4" aria-label="Service area cities">
                {SERVICE_AREAS.map(area => (
                  <Link
                    key={area.city}
                    href={`/service-areas/${area.city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-3 p-3 bg-charcoal-900/50 rounded-lg hover:bg-evergreen-950/40 border border-evergreen-900/20 hover:border-evergreen-600/40 transition-all group"
                    aria-label={`View tree services in ${area.city}`}
                  >
                    <CheckCircleIcon className="w-5 h-5 text-evergreen-500 group-hover:text-evergreen-300 transition-colors" aria-hidden="true" />
                    <span className="font-semibold text-charcoal-100 group-hover:text-evergreen-300 transition-colors">{area.city}</span>
                  </Link>
                ))}
              </nav>
            </StaticCardBody>
          </StaticCard>

          <StaticCard className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30" role="region" aria-label="Service coverage types">
            <StaticCardBody className="p-8">
              <h2 className="text-2xl font-bold text-evergreen-300 mb-6">Service Coverage</h2>
              <ul className="space-y-6" role="list" aria-label="Types of properties serviced">
                <li className="flex items-start gap-4">
                  <div className="bg-evergreen-900/50 p-3 rounded-lg">
                    <HomeIcon className="w-6 h-6 text-evergreen-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-evergreen-300 text-lg">Residential</p>
                    <p className="text-evergreen-200 text-sm">Homes & landscapes throughout the region</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-evergreen-900/50 p-3 rounded-lg">
                    <BuildingOfficeIcon className="w-6 h-6 text-evergreen-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-evergreen-300 text-lg">Commercial</p>
                    <p className="text-evergreen-200 text-sm">Businesses, parks & municipalities</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-amber-900/50 p-3 rounded-lg">
                    <BoltIcon className="w-6 h-6 text-amber-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-300 text-lg">Emergency</p>
                    <p className="text-evergreen-200 text-sm">24/7 storm damage response</p>
                  </div>
                </li>
              </ul>
            </StaticCardBody>
          </StaticCard>
        </div>

        <StaticCard className="bg-charcoal-800/50 border border-evergreen-900/20" role="region" aria-label="Contact for unlisted areas">
          <StaticCardBody className="p-8 text-center">
            <h3 className="text-2xl font-bold text-evergreen-300 mb-4">Not seeing your area?</h3>
            <p className="text-charcoal-100 mb-6">We may still be able to help! Give us a call to discuss your location.</p>
            <ButtonLink
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
              startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              aria-label="Call to inquire about service in your area"
            >
              Call {BUSINESS_INFO.phone}
            </ButtonLink>
          </StaticCardBody>
        </StaticCard>
      </div>
    </section>
  )
}
