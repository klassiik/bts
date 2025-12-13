'use client'

import { Card, CardBody, Button, Chip } from '@heroui/react'
import { 
  PhoneIcon, 
  ExclamationTriangleIcon, 
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'
import Video from '@/components/Video'

export default function EmergencyResponseContent() {
  const emergencyScenarios = [
    {
      icon: ExclamationTriangleIcon,
      title: 'Storm Damage Cleanup',
      description: 'Fallen trees blocking roads, driveways, or threatening structures after severe weather',
      urgency: 'Immediate',
      color: 'text-red-400'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Hazardous Tree Removal',
      description: 'Dead, diseased, or damaged trees posing immediate safety risks to people or property',
      urgency: 'Same Day',
      color: 'text-amber-400'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Emergency Pruning',
      description: 'Immediate removal of dangerous branches that could fall and cause injury or damage',
      urgency: 'Within 24 Hours',
      color: 'text-orange-400'
    }
  ]

  const responseProcess = [
    {
      step: '1',
      title: 'Call Immediately',
      description: 'Call our emergency line for immediate assistance and safety assessment',
      action: `Call ${BUSINESS_INFO.phone}`
    },
    {
      step: '2', 
      title: 'Safety Assessment',
      description: 'Our team evaluates the situation and prioritizes safety concerns',
      action: 'On-site evaluation'
    },
    {
      step: '3',
      title: 'Emergency Mitigation',
      description: 'Immediate action to eliminate hazards and secure the area',
      action: 'Hazard removal'
    },
    {
      step: '4',
      title: 'Complete Cleanup',
      description: 'Full debris removal and site restoration to safe conditions',
      action: 'Final cleanup'
    }
  ]

  return (
    <div className="bg-charcoal-950 min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-900/80 border-b border-red-700/30 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-red-100">
            <ExclamationTriangleIcon className="w-5 h-5" aria-hidden="true" />
            <span className="font-semibold">24/7 Emergency Tree Services Available Now</span>
            <ExclamationTriangleIcon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-red-950/30 via-charcoal-950 to-charcoal-950">
        <Video
          src="/media/555764101_25387785744161354_2365138505705379783_n.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" style={{ zIndex: 1 }} />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <Chip 
            className="mb-6 bg-red-900/30 border border-red-500/20 text-red-400 animate-pulse"
            variant="bordered"
            startContent={<ClockIcon className="w-4 h-4" />}
          >
            Available 24/7
          </Chip>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-charcoal-50">
            Emergency Tree Services
          </h1>
          
          <p className="text-2xl text-red-300 mb-4 font-semibold">
            Storm Damage? Fallen Trees? Immediate Response Available
          </p>
          
          <p className="text-xl text-charcoal-300 mb-8 max-w-3xl mx-auto">
            Professional emergency tree services throughout Colfax and surrounding areas. 
            Licensed, insured, and ready to respond to your tree emergencies 24/7.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              as="a"
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold shadow-xl shadow-red-900/50 text-lg px-8 py-4"
              startContent={<PhoneIcon className="w-6 h-6" />}
              aria-label="Call emergency tree services now"
            >
              <div className="text-center">
                <div className="text-xl font-bold">CALL NOW</div>
                <div className="text-sm opacity-90">{BUSINESS_INFO.phone}</div>
              </div>
            </Button>
            
            <Button
              href="mailto:emergency@barkertreeservices.com"
              as="a"
              size="lg"
              variant="bordered"
              className="border-red-600 text-red-400 hover:bg-red-950/30 font-bold text-lg px-8 py-4"
              aria-label="Email for emergency tree services"
            >
              Emergency Email
            </Button>
          </div>

          <div className="mt-6 text-red-300 font-semibold">
            ⚡ Average Response Time: 2-4 Hours ⚡
          </div>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="py-20 px-4" aria-label="Emergency tree service scenarios">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-400 mb-12 text-center">
            When to Call for Emergency Tree Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {emergencyScenarios.map((scenario, index) => {
              const Icon = scenario.icon
              return (
                <Card key={index} className="bg-charcoal-800/50 border border-red-900/20 hover:border-red-600/40 transition-all">
                  <CardBody className="p-8 text-center">
                    <div className="bg-red-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                      <Icon className={`w-8 h-8 ${scenario.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-50 mb-3">{scenario.title}</h3>
                    <p className="text-charcoal-300 mb-4 leading-relaxed">{scenario.description}</p>
                    <Chip 
                      size="sm" 
                      className="bg-red-900/30 text-red-400 border-red-700/30"
                      variant="bordered"
                    >
                      {scenario.urgency}
                    </Chip>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Emergency response process">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-400 mb-12 text-center">
            Our Emergency Response Process
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseProcess.map((process, index) => (
              <Card key={index} className="bg-charcoal-800/50 border border-red-900/20 relative">
                <CardBody className="p-6">
                  <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-red-400 mb-3 mt-2">{process.title}</h3>
                  <p className="text-charcoal-300 text-sm leading-relaxed mb-4">{process.description}</p>
                  <div className="text-red-300 font-semibold text-sm">{process.action}</div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Information */}
      <section className="py-20 px-4" aria-label="Emergency safety guidelines">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-amber-950/80 to-charcoal-900/80 border border-amber-900/30">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ExclamationTriangleIcon className="w-8 h-8 text-amber-400" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-amber-400">Important Safety Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-charcoal-300">
                <div>
                  <h4 className="font-bold text-amber-400 mb-2">DO:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Stay away from downed power lines</li>
                    <li>• Call 911 for immediate life-threatening situations</li>
                    <li>• Take photos of damage for insurance purposes</li>
                    <li>• Clear debris only if it&apos;s safe to do so</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-400 mb-2">DON&apos;T:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Attempt to remove large trees yourself</li>
                    <li>• Go near trees that have fallen on structures</li>
                    <li>• Touch downed electrical wires or branches</li>
                    <li>• Enter damaged buildings until cleared</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Insurance and Documentation */}
      <section className="py-20 px-4 bg-charcoal-900/30" aria-label="Insurance and documentation assistance">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-red-400 mb-8 text-center">
            Insurance & Documentation Assistance
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-charcoal-800/50 border border-red-900/20">
              <CardBody className="p-8">
                <DocumentTextIcon className="w-10 h-10 text-red-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-red-400 mb-4">We Help with Insurance Claims</h3>
                <p className="text-charcoal-300 mb-4">
                  Our team provides detailed documentation and assessments to support your insurance claims. 
                  We work directly with insurance adjusters to streamline the process.
                </p>
                <ul className="text-charcoal-300 text-sm space-y-1">
                  <li>• Professional damage assessments</li>
                  <li>• Detailed written reports</li>
                  <li>• Photo documentation</li>
                  <li>• Insurance liaison services</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-charcoal-800/50 border border-red-900/20">
              <CardBody className="p-8">
                <ShieldCheckIcon className="w-10 h-10 text-red-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-red-400 mb-4">Licensed & Insured Protection</h3>
                <p className="text-charcoal-300 mb-4">
                  Work with confidence knowing you&apos;re protected. Our comprehensive insurance 
                  and licensing provides peace of mind during emergency situations.
                </p>
                <ul className="text-charcoal-300 text-sm space-y-1">
                  <li>• CSLB #1085329 Licensed</li>
                  <li>• Full liability insurance</li>
                  <li>• Workers compensation coverage</li>
                  <li>• Emergency bond protection</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4" aria-label="Emergency contact call-to-action">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-red-950/80 to-charcoal-900/80 border border-red-700/30">
            <CardBody className="p-12">
              <h2 className="text-4xl font-bold text-red-400 mb-6">
                Don&apos;t Wait - Call Now
              </h2>
              <p className="text-xl text-charcoal-300 mb-8 max-w-2xl mx-auto">
                Tree emergencies don&apos;t wait for convenient timing. Neither do we. 
                Our emergency response team is standing by to help restore safety to your property.
              </p>
              
              <div className="flex gap-6 justify-center flex-wrap mb-6">
                <Button
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  as="a"
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold shadow-xl text-xl px-12 py-6"
                  startContent={<PhoneIcon className="w-6 h-6" />}
                  aria-label="Call emergency tree services immediately"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">CALL NOW</div>
                    <div className="text-lg opacity-90">{BUSINESS_INFO.phone}</div>
                  </div>
                </Button>
              </div>

              <div className="text-red-300 space-y-1">
                <div className="font-semibold">Available 24/7 • Same-Day Response • Licensed & Insured</div>
                <div className="text-sm">Serving Colfax, Grass Valley, Nevada City & Surrounding Areas</div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}