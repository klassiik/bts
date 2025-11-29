'use client'

import { useState } from 'react'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'services' | 'pricing' | 'emergency'
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'service-areas',
    question: 'What areas does Barker Tree Services serve?',
    answer: 'Barker Tree Services serves Colfax, Grass Valley, Nevada City, Auburn, Lincoln, Rocklin, Loomis, Penryn, Smartville, and Rough and Ready in Northern California. We provide professional tree care services throughout Placer and Nevada counties.',
    category: 'general'
  },
  {
    id: 'licensed-insured',
    question: 'Is Barker Tree Services licensed and insured?',
    answer: 'Yes, Barker Tree Services is fully licensed (CSLB #1085329) and insured with complete liability and workers compensation coverage. We maintain all required certifications for safe tree care operations in California.',
    category: 'general'
  },
  {
    id: 'emergency-services',
    question: 'Do you offer emergency tree services?',
    answer: 'Yes, we provide 24/7 emergency tree services for storm damage, fallen trees, and hazardous tree situations throughout our service area. Our rapid response team is equipped to handle urgent tree emergencies that threaten property or safety.',
    category: 'emergency'
  },
  {
    id: 'tree-trimming-cost',
    question: 'How much does tree trimming cost?',
    answer: 'Tree trimming costs vary based on tree size, location, and complexity. Generally, basic trimming ranges from $300-$800, while complex or emergency work may cost more. We provide free estimates for all tree services.',
    category: 'pricing'
  },
  {
    id: 'tree-removal-when',
    question: 'When should I remove a tree?',
    answer: 'Trees should be removed when they are dead, diseased, damaged by storms, or pose safety hazards. Signs include dead branches, trunk decay, root damage, or proximity to structures. We provide free assessments to determine if removal is necessary.',
    category: 'services'
  },
  {
    id: 'stump-grinding-benefits',
    question: 'Why should I grind my tree stump?',
    answer: 'Stump grinding eliminates trip hazards, prevents pest infestations, stops unwanted sprouting, and creates usable yard space. It also improves lawn mowing efficiency and enhances property appearance.',
    category: 'services'
  },
  {
    id: 'emergency-response-time',
    question: 'How quickly can you respond to emergency tree situations?',
    answer: 'We typically respond to emergency tree situations within 2-4 hours during business hours, and within 24 hours for after-hours emergencies. During major storms, response times may vary based on demand and safety conditions.',
    category: 'emergency'
  },
  {
    id: 'tree-pruning-timing',
    question: 'When is the best time to prune trees?',
    answer: 'Most trees are best pruned during the dormant season (winter) to minimize stress and disease risk. However, dead or hazardous branches can be removed year-round. We can advise on optimal timing for your specific tree species.',
    category: 'services'
  },
  {
    id: 'free-estimates',
    question: 'Do you provide free estimates?',
    answer: 'Yes, we provide free estimates for all tree services. Our team will assess your trees, discuss your needs, and provide detailed pricing with no obligation. Contact us at (530) 802-1271 to schedule your free estimate.',
    category: 'pricing'
  },
  {
    id: 'equipment-used',
    question: 'What equipment do you use for tree services?',
    answer: 'We use professional-grade equipment including chainsaws, pole saws, climbing gear, aerial lifts, stump grinders, chippers, and cranes when needed. All equipment is regularly maintained for safety and efficiency.',
    category: 'services'
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-evergreen-900/30 text-evergreen-400 border-evergreen-700/30'
      case 'services': return 'bg-sage-900/30 text-sage-400 border-sage-700/30'
      case 'pricing': return 'bg-amber-900/30 text-amber-400 border-amber-700/30'
      case 'emergency': return 'bg-red-900/30 text-red-400 border-red-700/30'
      default: return 'bg-charcoal-800/30 text-charcoal-400 border-charcoal-700/30'
    }
  }

  return (
    <section className="py-20 px-4 bg-charcoal-950" aria-label="Frequently asked questions about tree services">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Chip 
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-400"
            variant="bordered"
          >
            Tree Care FAQ
          </Chip>
          <h2 className="text-4xl font-bold text-evergreen-400 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-charcoal-300">
            Get answers to common questions about tree services in Colfax and surrounding areas
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item) => (
            <Card 
              key={item.id} 
              className="bg-charcoal-800/50 border border-evergreen-900/20"
              itemScope 
              itemType="https://schema.org/Question"
            >
              <CardBody className="p-0">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-charcoal-700/30 transition-colors focus:outline-none focus:bg-charcoal-700/30"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.has(item.id)}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Chip 
                        size="sm" 
                        variant="bordered" 
                        className={getCategoryColor(item.category)}
                      >
                        {item.category}
                      </Chip>
                    </div>
                    <h3 
                      className="text-lg font-semibold text-charcoal-50 pr-4"
                      itemProp="name"
                    >
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.has(item.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-evergreen-400" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-charcoal-400" aria-hidden="true" />
                    )}
                  </div>
                </button>
                
                {openItems.has(item.id) && (
                  <div 
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-4 pt-2 border-t border-evergreen-900/20"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-charcoal-300 leading-relaxed" itemProp="text">
                      {item.answer}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-charcoal-400 mb-6">
            Don&apos;t see your question answered? Contact us for personalized tree care guidance.
          </p>
          <Button
            href="/contact"
            as="a"
            size="lg"
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 text-white font-bold shadow-lg"
          >
            Ask Your Question
          </Button>
        </div>
      </div>
    </section>
  )
}