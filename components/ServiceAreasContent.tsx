/* GEO: Service areas page with geographic schema markers and semantic navigation */
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/config'
import { ButtonLink, StaticCard, StaticCardBody, StaticChip } from '@/components/ui'
import { PhoneIcon, CheckCircleIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { BoltIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getCityDetail } from '@/lib/cityContent'
import { cityToSlug } from '@/lib/utils'

// One paragraph per county, drawn from the per-city copy in
// lib/cityContent.ts. Keep it to what those pages already state.
const COUNTY_NOTES: Record<string, ReactNode> = {
  Placer: (
    <>
      From Colfax down through Auburn to the valley edge at Rocklin and Lincoln: conifer slopes up high, oak
      woodland and growing subdivisions below. Native oaks are protected in several places here (Rocklin, Loomis
      and the Penryn area each have their own rules), so each town page explains what applies before an oak
      comes down.
    </>
  ),
  Nevada: (
    <>
      Mixed conifer and oak-pine foothill country. Grass Valley and Nevada City sit largely in Very High Fire
      Hazard Severity Zones, where Nevada County enforces 100-foot defensible space, so much of the work is
      thinning, limbing up and hazard-tree removal to that standard. Our{' '}
      <Link href="/guides/defensible-space" className="text-evergreen-300 underline hover:text-evergreen-200">
        defensible space guide
      </Link>{' '}
      covers the zones.
    </>
  ),
  Yuba: (
    <>
      Just over the county line on Highway 20: open blue oak and gray pine ranchland, where the work is mostly
      deadwood, mistletoe and old homestead shade trees.
    </>
  ),
}

// Counties in first-seen SERVICE_AREAS order, each with its cities
const COUNTIES = SERVICE_AREAS.reduce<{ county: string; cities: { city: string; highlight: string }[] }[]>(
  (groups, { city }) => {
    const detail = getCityDetail(city)!
    const group = groups.find((g) => g.county === detail.county)
    const entry = { city, highlight: detail.highlights[0] }
    if (group) group.cities.push(entry)
    else groups.push({ county: detail.county, cities: [entry] })
    return groups
  },
  []
)

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
          <p className="text-xl text-charcoal-100 max-w-3xl mx-auto">
            We&apos;re based in Colfax and work across {SERVICE_AREAS.length} foothill communities in{' '}
            {COUNTIES.map((c) => c.county).join(', ').replace(/, ([^,]*)$/, ' and $1')} Counties. Each town page
            covers the local trees, terrain, and the permit and fire-safety rules we work within there.
          </p>
        </div>

        <nav className="space-y-10 mb-12" aria-label="Service area cities">
          {COUNTIES.map(({ county, cities }) => (
            <section key={county} aria-labelledby={`county-${county}`}>
              <h2 id={`county-${county}`} className="text-2xl font-bold text-evergreen-300 mb-3">
                {county} County
              </h2>
              <p className="text-charcoal-100 mb-5 max-w-3xl">{COUNTY_NOTES[county]}</p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
                {cities.map(({ city, highlight }) => (
                  <li key={city}>
                    <Link
                      href={`/service-areas/${cityToSlug(city)}`}
                      className="flex h-full items-start gap-3 p-4 bg-charcoal-900/50 rounded-lg hover:bg-evergreen-950/40 border border-evergreen-900/20 hover:border-evergreen-600/40 transition-all group"
                    >
                      <CheckCircleIcon className="w-5 h-5 mt-0.5 shrink-0 text-evergreen-500 group-hover:text-evergreen-300 transition-colors" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-charcoal-100 group-hover:text-evergreen-300 transition-colors">
                          Tree services in {city}
                        </span>
                        <span className="block text-sm text-charcoal-300 mt-1">{highlight}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="mb-12">
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
