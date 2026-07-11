// Per-service depth for /services/[service]: cost-factor explainers and
// FAQs. These deepen thin service pages (~300 words -> ~700) and feed a
// per-service FAQPage JSON-LD for AI citation.
//
// Pricing is intentionally described by what drives cost + a free on-site
// estimate rather than dollar figures, so nothing goes stale and no quote
// is implied sight-unseen. FAQ answers reflect Barker's actual services and
// the real local rules already researched in lib/cityContent.ts.

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceExtra {
  /** Intro line for the "What affects the cost" section */
  costIntro: string
  costFactors: string[]
  faqs: ServiceFAQ[]
}

export const SERVICE_CONTENT: Record<string, ServiceExtra> = {
  trimming: {
    costIntro:
      'Every tree and property is different, so we quote trimming after seeing the job. The main things that affect the price:',
    costFactors: [
      'Tree size and species — a mature ponderosa pine takes more rigging than a backyard fruit tree',
      'How much of the canopy needs work, and how reachable it is from the ground vs. a climb',
      'Proximity to your roof, fences, and power lines, which dictates whether limbs can drop or must be rigged down',
      'Cleanup and hauling — whether chips and brush stay on site or leave with us'
    ],
    faqs: [
      {
        question: 'When is the best time to trim my trees?',
        answer:
          'Most trees in our area are best pruned in the dormant season (late fall through winter), when there is less stress on the tree and disease risk is lower. Dead, broken, or hazardous limbs can safely be removed any time of year. For fruit trees and certain species we may recommend specific timing during your estimate.'
      },
      {
        question: 'How much of a tree can you safely trim at once?',
        answer:
          'As a rule we avoid removing more than about 25% of a mature tree’s canopy in a single season — taking too much stresses the tree and can trigger weak, excessive regrowth. We prune to the branch collar with proper cuts and never top trees, which is a damaging practice that leads to decay and hazardous regrowth.'
      },
      {
        question: 'Will trimming hurt my tree?',
        answer:
          'Done correctly, professional pruning improves a tree’s health, structure, and safety. We make clean cuts at the right points to promote healing, remove deadwood and crossing limbs, and improve light and air flow. Poor cuts and topping are what harm trees — which is exactly what proper arborist technique avoids.'
      },
      {
        question: 'Do you clean up afterward?',
        answer:
          'Yes. Standard trimming includes hauling away the brush and limbs we remove and leaving your property clean. If you’d like the chips left as mulch, just let us know and we’ll leave them for you.'
      }
    ]
  },
  removal: {
    costIntro:
      'Removals vary widely, so we give a firm price after an on-site look. What moves the number the most:',
    costFactors: [
      'Height and trunk diameter of the tree — a tall pine is a bigger job than a small ornamental',
      'Proximity to your house, outbuildings, and power lines, and whether the tree must come down in rigged sections rather than felled',
      'Access for our equipment, and slope or canyon-edge conditions common on foothill lots',
      'Stump grinding and debris hauling if you want the site left clear and ready to replant'
    ],
    faqs: [
      {
        question: 'Do I need a permit to remove a tree?',
        answer:
          'Sometimes — it depends on your city and the tree. Rocklin requires a permit for native oaks 6 inches or larger, the Town of Loomis and unincorporated Placer County protect native oaks, and Penryn sits in Placer County’s Woodland Conservation area. Dead or genuinely hazardous trees are usually exempt or expedited. We assess whether your tree is protected and handle the documentation.'
      },
      {
        question: 'Will you grind the stump and haul away the debris?',
        answer:
          'We can. Stump grinding is a separate step we’ll usually bundle with a removal so you’re left with usable ground instead of a stump. Debris and wood can be hauled away, or we can leave rounds or chips on site if you want them — just tell us during the estimate.'
      },
      {
        question: 'How do you remove a large tree near my house?',
        answer:
          'When a tree is too close to a structure to fell in one piece, we take it down in sections — a climber removes limbs and lowers the trunk in controlled pieces using rigging, rather than dropping it. This is how we remove trees leaning over roofs, decks, and canyon edges without damage to the property below.'
      },
      {
        question: 'Is storm-damage tree removal covered by insurance?',
        answer:
          'Often, especially when a tree has hit a structure. We provide the written assessment and photo documentation homeowners need for a claim, and we can work with your adjuster. Coverage varies by policy, so confirm with your insurer — but we make the documentation side straightforward.'
      }
    ]
  },
  stump: {
    costIntro:
      'Stump grinding is usually priced by the size and situation of the stump. The main factors:',
    costFactors: [
      'Stump diameter measured across the grain — the single biggest driver of grinding time',
      'How many stumps, and whether they’re clustered or spread across the property',
      'Root flare and surface roots you want ground out, not just the main stump',
      'Access for the grinder — open yards are quick; tight side-yard gates need a smaller track machine'
    ],
    faqs: [
      {
        question: 'How deep do you grind a stump?',
        answer:
          'We typically grind 6 to 12 inches below ground level, deeper if you plan to replant or lay sod over the spot. We can also grind out major surface roots on request so the area is genuinely usable rather than just cut flush.'
      },
      {
        question: 'What happens to the wood chips and the hole?',
        answer:
          'Grinding produces a pile of wood chips mixed with soil. We can rake it back into the hole and mound it slightly to settle, leave the chips as mulch, or haul them away and backfill with soil — your choice. The ground can then be leveled for grass or new planting.'
      },
      {
        question: 'Can I plant a new tree where the old stump was?',
        answer:
          'Yes, once the stump and major roots are ground out and the leftover chips are removed or amended. Fresh grindings are high in carbon and can temporarily rob the soil of nitrogen, so for replanting we recommend clearing the chips and backfilling with soil — we’ll advise on the spot.'
      },
      {
        question: 'Why grind the stump instead of leaving it?',
        answer:
          'Leftover stumps are trip hazards, attract termites and other pests, can sprout new shoots, and get in the way of mowing and landscaping. Grinding reclaims the space and gives you a clean, plantable area.'
      }
    ]
  },
  emergency: {
    costIntro:
      'Emergency work is quoted on site once the situation is safe to assess. What affects the cost:',
    costFactors: [
      'The immediate hazard — a tree on a structure or power line takes more careful rigging than one down in the yard',
      'Time and crew size needed to make the area safe quickly',
      'Access and conditions, which storms and darkness can complicate',
      'Whether full cleanup and hauling follow the initial make-safe work'
    ],
    faqs: [
      {
        question: 'How quickly can you respond to a tree emergency?',
        answer:
          'We typically reach emergencies within 2–4 hours during business hours and within 24 hours after hours. During major storms, when many properties are hit at once, response times can stretch — we prioritize the most dangerous, life-safety situations first.'
      },
      {
        question: 'What should I do if a tree falls on my house or a power line?',
        answer:
          'Keep everyone well clear and assume any downed line is live — call 911 and your utility for power lines, and get out of a struck building until it’s cleared. Don’t try to move large limbs yourself. From a safe distance, take photos for insurance, then call us to secure and remove the hazard.'
      },
      {
        question: 'Do you help with insurance claims after storm damage?',
        answer:
          'Yes. We provide professional damage assessments, written reports, and photo documentation to support your claim, and we can coordinate with your insurance adjuster to keep the process moving.'
      },
      {
        question: 'Is emergency tree work more expensive than scheduled work?',
        answer:
          'Emergency jobs can cost more because they require rapid response, extra crew, and more complex rigging around damaged structures. We’re transparent about it — you’ll get a clear price before we begin the full removal, once the area is safe to assess.'
      }
    ]
  }
}

export function getServiceContent(serviceId: string): ServiceExtra | undefined {
  return SERVICE_CONTENT[serviceId]
}
