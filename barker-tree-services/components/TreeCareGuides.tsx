'use client'

import { Card, CardBody, Button, Chip } from '@heroui/react'
import { 
  CalendarIcon, 
  ExclamationTriangleIcon, 
  LightBulbIcon, 
  WrenchScrewdriverIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'

interface TreeCareGuide {
  id: string
  title: string
  description: string
  icon: React.ElementType
  category: 'seasonal' | 'safety' | 'maintenance' | 'emergency'
  readTime: string
  content: {
    overview: string
    keyPoints: string[]
    seasonalTips?: {
      spring?: string[]
      summer?: string[]
      fall?: string[]
      winter?: string[]
    }
    warningSigns?: string[]
  }
}

const TREE_CARE_GUIDES: TreeCareGuide[] = [
  {
    id: 'seasonal-tree-care',
    title: 'Seasonal Tree Care Guide',
    description: 'Year-round tree maintenance calendar for Northern California climates',
    icon: CalendarIcon,
    category: 'seasonal',
    readTime: '8 min read',
    content: {
      overview: 'Proper seasonal care ensures your trees remain healthy and beautiful year-round. In Northern California, our unique climate requires specific timing for different tree care activities.',
      keyPoints: [
        'Different seasons require different tree care approaches',
        'Timing is crucial for disease prevention and tree health',
        'Local climate affects when specific tasks should be performed',
        'Proper seasonal care can prevent costly emergency services'
      ],
      seasonalTips: {
        spring: [
          'Inspect trees for winter damage and storm injury',
          'Apply dormant oil sprays before new growth begins',
          'Begin regular watering schedules as rains decrease',
          'Prune dead, diseased, or damaged branches',
          'Plant new trees during the early spring window'
        ],
        summer: [
          'Monitor soil moisture and increase watering during heat waves',
          'Watch for signs of insect damage and disease',
          'Avoid heavy pruning during peak summer heat',
          'Provide support for young or newly planted trees',
          'Mulch to retain moisture and regulate soil temperature'
        ],
        fall: [
          'Continue watering until the first hard frost',
          'Begin preparing trees for winter weather',
          'Remove fallen leaves and debris from tree bases',
          'Consider structural pruning before winter storms',
          'Plant deciduous trees during fall dormancy period'
        ],
        winter: [
          'Minimal watering during winter dormancy',
          'Inspect for storm damage after heavy winds or ice',
          'Plan next year\'s tree care activities',
          'Protect young trees from frost damage',
          'Schedule professional tree assessments'
        ]
      }
    }
  },
  {
    id: 'tree-safety-assessment',
    title: 'Tree Safety Assessment Guide',
    description: 'How to identify potential hazards and assess tree safety',
    icon: ExclamationTriangleIcon,
    category: 'safety',
    readTime: '6 min read',
    content: {
      overview: 'Regular safety assessments can prevent property damage and personal injury. Learn to identify warning signs that indicate a tree may be hazardous and when to call professionals.',
      keyPoints: [
        'Regular visual inspections can identify safety issues early',
        'Some hazards require professional assessment',
        'Weather events can create sudden safety concerns',
        'Early intervention prevents costly emergency situations'
      ],
      warningSigns: [
        'Dead or dying branches in the crown',
        'Cracks or splits in the trunk or major limbs',
        'Fungal growth on bark or around tree base',
        'Leaning trees, especially if recently developed',
        'Roots that are damaged, rotted, or exposed',
        'Hollow or decayed areas in trunk',
        'Bore holes or insect activity',
        'Electrical wire contact or proximity'
      ]
    }
  },
  {
    id: 'tree-maintenance-basics',
    title: 'Basic Tree Maintenance',
    description: 'Essential tree care practices every property owner should know',
    icon: WrenchScrewdriverIcon,
    category: 'maintenance',
    readTime: '7 min read',
    content: {
      overview: 'Proper tree maintenance extends tree life, improves appearance, and prevents problems. While some tasks require professional arborists, homeowners can safely perform many basic maintenance activities.',
      keyPoints: [
        'Proper watering is the foundation of tree health',
        'Mulching provides multiple benefits for tree growth',
        'Pruning techniques vary by tree species and goal',
        'Fertilization needs depend on soil conditions and tree species',
        'Regular maintenance is more cost-effective than emergency care'
      ]
    }
  },
  {
    id: 'emergency-response-guide',
    title: 'Tree Emergency Response Guide',
    description: 'What to do when storms damage trees or create urgent situations',
    icon: ExclamationTriangleIcon,
    category: 'emergency',
    readTime: '5 min read',
    content: {
      overview: 'Storm damage and tree emergencies require quick thinking and safe action. This guide helps you assess situations and know when to call professionals for immediate assistance.',
      keyPoints: [
        'Safety first - assess risks before approaching damaged trees',
        'Contact professionals for any tree near power lines',
        'Document damage with photos for insurance purposes',
        'Temporary measures can prevent further damage',
        'Professional assessment prevents future hazards'
      ]
    }
  }
]

export default function TreeCareGuides() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seasonal': return 'bg-evergreen-900/30 text-evergreen-400 border-evergreen-700/30'
      case 'safety': return 'bg-red-900/30 text-red-400 border-red-700/30'
      case 'maintenance': return 'bg-sage-900/30 text-sage-400 border-sage-700/30'
      case 'emergency': return 'bg-amber-900/30 text-amber-400 border-amber-700/30'
      default: return 'bg-charcoal-800/30 text-charcoal-400 border-charcoal-700/30'
    }
  }

  return (
    <section className="py-20 px-4 bg-charcoal-950" aria-label="Educational tree care guides">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Chip 
            className="mb-4 bg-sage-900/30 border border-sage-500/20 text-sage-400"
            variant="bordered"
            startContent={<LightBulbIcon className="w-4 h-4" />}
          >
            Tree Care Education
          </Chip>
          <h2 className="text-4xl font-bold text-sage-400 mb-4">
            Expert Tree Care Guides
          </h2>
          <p className="text-xl text-charcoal-300 max-w-3xl mx-auto">
            Learn from our 15+ years of experience with comprehensive guides to tree care, safety, and maintenance in Northern California
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {TREE_CARE_GUIDES.map((guide) => {
            const Icon = guide.icon
            return (
              <Card 
                key={guide.id} 
                className="bg-charcoal-800/50 border border-charcoal-700/20 hover:border-sage-600/40 hover:scale-105 transition-all"
              >
                <CardBody className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-sage-900/30 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-sage-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Chip 
                          size="sm" 
                          variant="bordered" 
                          className={getCategoryColor(guide.category)}
                        >
                          {guide.category}
                        </Chip>
                        <span className="text-charcoal-500 text-sm">{guide.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-50 mb-2">{guide.title}</h3>
                      <p className="text-charcoal-300 mb-4">{guide.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sage-400 mb-2">Overview</h4>
                      <p className="text-charcoal-300 text-sm leading-relaxed">{guide.content.overview}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sage-400 mb-2">Key Points</h4>
                      <ul className="text-charcoal-300 text-sm space-y-1">
                        {guide.content.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-sage-500 mt-1 flex-shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {guide.content.seasonalTips && (
                      <div>
                        <h4 className="font-semibold text-sage-400 mb-2">Seasonal Tips</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {Object.entries(guide.content.seasonalTips).map(([season, tips]) => (
                            <div key={season} className="bg-charcoal-900/30 p-3 rounded">
                              <h5 className="font-medium text-charcoal-200 mb-2 capitalize">{season}</h5>
                              <ul className="text-charcoal-400 space-y-1">
                                {tips.map((tip, idx) => (
                                  <li key={idx} className="text-xs">• {tip}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {guide.content.warningSigns && (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">Warning Signs to Watch For</h4>
                        <ul className="text-charcoal-300 text-sm space-y-1">
                          {guide.content.warningSigns.map((sign, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1 flex-shrink-0">!</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-br from-sage-950/80 to-sage-900/50 border border-sage-700/30">
          <CardBody className="p-8 text-center">
            <h3 className="text-2xl font-bold text-sage-300 mb-4">
              Need Professional Tree Care Assistance?
            </h3>
            <p className="text-sage-200 mb-6 max-w-2xl mx-auto">
              While these guides provide valuable information, professional assessment and care ensure the safety and health of your trees. 
              Contact our certified arborists for expert advice and service.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                as="a"
                size="lg"
                className="bg-sage-600 hover:bg-sage-500 text-white font-bold shadow-lg"
                startContent={<PhoneIcon className="w-5 h-5" />}
                aria-label="Call Barker Tree Services for professional assistance"
              >
                Call {BUSINESS_INFO.phone}
              </Button>
              <Button
                href="/contact"
                as="a"
                size="lg"
                variant="bordered"
                className="border-sage-300 text-sage-300 hover:bg-sage-900/30 font-bold"
                aria-label="Request professional tree care consultation"
              >
                Get Free Consultation
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}