'use client'

import { BUSINESS_INFO, SERVICES } from '@/lib/config'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface CityServiceContentProps {
  city: string
  state: string
}

export default function CityServiceContent({ city, state }: CityServiceContentProps) {
  return (
    <div className="bg-charcoal-950 min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen-950/50 via-charcoal-950 to-charcoal-950" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-evergreen-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto">
          <Chip 
            className="mb-6 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
            startContent={<MapPinIcon className="w-4 h-4" />}
          >
            Service Area
          </Chip>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-50">
            Tree Services in {city}, {state}
          </h1>
          <p className="text-xl text-charcoal-300 mb-8 max-w-2xl">
            Professional tree trimming, removal, and emergency services. Licensed & insured with 15+ years of experience serving your community.
          </p>
          <Button
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            as="a"
            size="lg"
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
            startContent={<PhoneIcon className="w-5 h-5" />}
          >
            Call {BUSINESS_INFO.phone}
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-evergreen-400 mb-8 text-center">
            Professional Tree Services in {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3">✂️</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Trimming</h3>
                <p className="text-charcoal-400 text-sm">Professional pruning for health and beauty</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3">🪓</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Tree Removal</h3>
                <p className="text-charcoal-400 text-sm">Safe removal of hazardous trees</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-evergreen-900/20 hover:border-evergreen-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3">🪚</div>
                <h3 className="font-bold text-evergreen-400 mb-2">Stump Grinding</h3>
                <p className="text-charcoal-400 text-sm">Complete stump removal solutions</p>
              </CardBody>
            </Card>
            <Card className="bg-charcoal-800/50 border border-amber-900/20 hover:border-amber-600/40 hover:scale-105 transition-all">
              <CardBody className="text-center p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-amber-400 mb-2">Emergency</h3>
                <p className="text-charcoal-400 text-sm">24/7 storm damage response</p>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-charcoal-800/50 border border-evergreen-900/20 mb-12">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-evergreen-400 mb-4">
                Why Choose Barker Tree Services in {city}?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Local Expertise</h4>
                  <p className="text-charcoal-300 text-sm">
                    We understand the unique tree species and conditions in {city} and the surrounding area.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Licensed & Insured</h4>
                  <p className="text-charcoal-300 text-sm">
                    CSLB #{BUSINESS_INFO.cslb} with full liability and workers&apos; compensation coverage.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-evergreen-400 mb-2">Fast Response</h4>
                  <p className="text-charcoal-300 text-sm">
                    Quick response times for both scheduled services and emergency tree situations.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30">
            <CardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold text-evergreen-300 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-evergreen-200 mb-6">
                Contact us today for a free estimate on your tree service needs in {city}.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  as="a"
                  size="lg"
                  className="bg-charcoal-50 text-evergreen-900 font-bold shadow-lg hover:bg-white"
                  startContent={<PhoneIcon className="w-5 h-5" />}
                >
                  Call Now
                </Button>
                <Button
                  href="/services"
                  as="a"
                  size="lg"
                  variant="bordered"
                  className="border-evergreen-300 text-evergreen-300 hover:bg-evergreen-900/30 font-bold"
                >
                  View All Services
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
