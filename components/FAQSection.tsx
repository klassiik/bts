'use client'

import { useState } from 'react'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

import { FAQ_DATA } from '@/lib/faqData'

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
      case 'general': return 'bg-evergreen-900/30 text-evergreen-300 border-evergreen-700/30'
      case 'services': return 'bg-sage-900/30 text-sage-300 border-sage-700/30'
      case 'pricing': return 'bg-amber-900/30 text-amber-300 border-amber-700/30'
      case 'emergency': return 'bg-red-900/30 text-red-300 border-red-700/30'
      default: return 'bg-charcoal-800/30 text-charcoal-300 border-charcoal-700/30'
    }
  }

  return (
    <section className="py-20 px-4 bg-charcoal-950" aria-label="Frequently asked questions about tree services">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Chip 
            className="mb-4 bg-evergreen-900/30 border border-evergreen-500/20 text-evergreen-300"
            variant="bordered"
          >
            Tree Care FAQ
          </Chip>
          <h2 className="text-4xl font-bold text-evergreen-300 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-charcoal-100">
             Get answers to common questions about tree services in Colfax and surrounding areas
           </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item) => (
            <Card 
              key={item.id} 
              className="bg-charcoal-800/50 border border-evergreen-900/20"
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
                    >
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.has(item.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-evergreen-300" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-charcoal-300" aria-hidden="true" />
                    )}
                  </div>
                </button>
                
                {openItems.has(item.id) && (
                  <div 
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-4 pt-2 border-t border-evergreen-900/20"
                  >
                    <p className="text-charcoal-100 leading-relaxed">
                       {item.answer}
                     </p>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-charcoal-100 mb-6">
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