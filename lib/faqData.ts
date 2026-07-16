// Single source of truth for FAQ content: FAQSection renders these visibly
// and generateFAQSchema() emits the same items as FAQPage JSON-LD, so the
// structured data can never drift out of sync with what users see.
export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'services' | 'pricing' | 'emergency'
}

import { YEARS_IN_BUSINESS, FOUNDING_YEAR } from '@/lib/config'

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'experience',
    question: 'How much experience does Barker Tree Services have?',
    answer: `Barker Tree Services has ${YEARS_IN_BUSINESS} years of experience in arboriculture and tree care, serving Northern California communities since ${FOUNDING_YEAR}.`,
    category: 'general'
  },
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
    answer: 'Tree trimming cost depends on the tree\'s size and species, how close it is to structures or power lines, how much access the crew has, and how much debris needs hauling. Rather than quote a range that would go stale, we give a free on-site estimate for every job.',
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
