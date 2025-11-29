export const BUSINESS_INFO = {
  name: 'Barker Tree Services',
  phone: '(530) 802-1271',
  phoneRaw: '+15308021271',
  email: 'jacob@barkertreeservices.com',
  address: '22215 Placer Hills Rd, Colfax, CA 95713',
  city: 'Colfax',
  state: 'CA',
  zip: '95713',
  hours: 'Mon-Fri: 7:00 AM - 7:00 PM',
  cslb: '1085329',
  url: 'https://barkertreeservices.com'
}

export const SERVICE_AREAS = [
  { city: 'Colfax', state: 'CA' },
  { city: 'Grass Valley', state: 'CA' },
  { city: 'Nevada City', state: 'CA' },
  { city: 'Rough and Ready', state: 'CA' },
  { city: 'Smartville', state: 'CA' },
  { city: 'Penryn', state: 'CA' },
  { city: 'Loomis', state: 'CA' },
  { city: 'Rocklin', state: 'CA' },
  { city: 'Lincoln', state: 'CA' },
  { city: 'Auburn', state: 'CA' }
]

export const SERVICES = [
  {
    id: 'trimming',
    title: 'Tree Trimming & Pruning',
    description: 'Professional tree trimming and pruning services to maintain the health, safety, and beauty of your trees. Our experienced team uses industry-leading techniques to ensure your trees thrive for years to come.',
    features: ['Crown thinning for light penetration', 'Crown raising for clearance', 'Deadwood removal for safety', 'Health assessment and diagnosis', 'Selective pruning for shape', 'Weight reduction for stability'],
    process: 'Our experienced professionals begin with a comprehensive tree assessment, identifying health issues, structural concerns, and growth patterns. We then develop a customized pruning plan that promotes healthy growth while maintaining the tree\'s natural form. All cuts are made using proper techniques to prevent disease and encourage healing.',
    benefits: ['Improved tree health and longevity', 'Enhanced property aesthetics', 'Increased safety by removing hazards', 'Better sunlight penetration to landscape', 'Reduced risk of storm damage', 'Proper clearance from structures'],
    equipment: 'Professional-grade chainsaws, pole saws, climbing gear, and aerial lift equipment when needed',
    seasonality: 'Best performed during dormant season (winter) for most species, though dead/hazardous branches can be removed year-round'
  },
  {
    id: 'removal',
    title: 'Tree Removal',
    description: 'Safe, efficient tree removal services for hazardous, diseased, or unwanted trees. Our expert team handles trees of all sizes with precise techniques that protect your property and surrounding landscape.',
    features: ['Emergency removal service', 'Large and complex tree removal', 'Hazard assessment and mitigation', 'Complete debris cleanup', 'Stump grinding option', 'Property protection measures'],
    process: 'We start with a thorough site assessment to identify potential hazards and plan the safest removal method. Our team uses advanced rigging techniques, cranes when necessary, and strategic sectional removal to bring down trees without damage to surrounding property. All debris is removed and the site is left clean.',
    benefits: ['Eliminates safety hazards', 'Prevents property damage', 'Creates space for new landscaping', 'Removes diseased/pest-infested trees', 'Improves views and sunlight', 'Increases property value'],
    equipment: 'Chainsaws, rigging equipment, cranes for large removals, chippers, and specialized climbing gear',
    seasonality: 'Available year-round, with emergency services for storm damage. Winter removal is often preferred for deciduous trees.'
  },
  {
    id: 'stump',
    title: 'Stump Removal & Grinding',
    description: 'Complete stump removal and grinding services to eliminate unsightly stumps and reclaim your valuable yard space. We use professional equipment to grind stumps below ground level.',
    features: ['Stump grinding to 6-12 inches below grade', 'Root system grinding', 'Wood chip disposal or recycling', 'Site cleanup and restoration', 'Soil amendment options', 'Replanting consultation'],
    process: 'Using professional stump grinding equipment, we grind the stump and major root system to well below ground level. The resulting wood chips can be removed or left as mulch. We then fill the area with soil and can prepare it for new plantings or sod installation.',
    benefits: ['Eliminates trip hazards', 'Prevents pest infestations', 'Stops unwanted sprouting', 'Creates usable yard space', 'Improves lawn mowing efficiency', 'Enhances property appearance'],
    equipment: 'Self-propelled stump grinders, track units for tight access, and hand tools for precision work',
    seasonality: 'Available year-round, though spring preparation is ideal for immediate replanting'
  },
  {
    id: 'emergency',
    title: 'Emergency Tree Services',
    description: '24/7 emergency response for storm damage, fallen trees, and hazardous situations. Our rapid response team is equipped to handle urgent tree emergencies that threaten property or safety.',
    features: ['24/7 emergency response', 'Storm damage cleanup', 'Hazardous tree removal', 'Property damage assessment', 'Insurance claim assistance', 'Temporary stabilization'],
    process: 'Upon emergency call, our team responds quickly to assess the situation and prioritize safety. We secure the area, remove immediate hazards, and develop a plan for complete cleanup. Our team works efficiently to restore safety while minimizing further property damage.',
    benefits: ['Immediate safety restoration', 'Prevents additional damage', 'Insurance claim support', 'Professional damage assessment', 'Quick property access restoration', 'Peace of mind during crisis'],
    equipment: 'Emergency response vehicles, portable lighting, chainsaws, rigging equipment, and safety barriers',
    seasonality: 'Available 24/7 year-round, with increased demand during winter storms and summer thunderstorms'
  }
]

// Enhanced testimonials with more detail and variety
export const DETAILED_TESTIMONIALS = [
  {
    name: 'John Mitchell',
    location: 'Colfax, CA',
    service: 'Tree Trimming',
    text: 'Barker Tree Services completely transformed our backyard! They trimmed our massive oak tree that was blocking all sunlight to our garden. The crew was professional, cleaned up everything, and our tree looks healthier than ever. The garden is thriving now with the improved light.',
    rating: 5,
    date: 'September 2024'
  },
  {
    name: 'Sarah Coleman',
    location: 'Auburn, CA',
    service: 'Emergency Removal',
    text: 'When a huge pine tree fell across our driveway during the winter storm, Barker Tree Services responded within 2 hours! They safely removed the tree and cleared the debris so we could get to work. Best emergency service in the area - highly skilled and reliable.',
    rating: 5,
    date: 'January 2024'
  },
  {
    name: 'Michael Torres',
    location: 'Grass Valley, CA',
    service: 'Stump Removal',
    text: 'Had three old stumps that were eyesores in our front yard. The team ground them all down and left the area perfectly clean. They even helped us plan new landscaping for the space. Excellent attention to detail and fair pricing.',
    rating: 5,
    date: 'May 2024'
  },
  {
    name: 'Lisa Thompson',
    location: 'Nevada City, CA',
    service: 'Tree Removal',
    text: 'We had a diseased maple tree very close to our house that needed removal. The crew used amazing rigging techniques to take it down piece by piece without any damage to our roof or garden. True professionals who know what they\'re doing.',
    rating: 5,
    date: 'August 2024'
  },
  {
    name: 'Robert Chen',
    location: 'Loomis, CA',
    service: 'Tree Trimming',
    text: 'Our fruit trees hadn\'t been properly pruned in years. Jacob and his team did an incredible job bringing them back to health. They explained everything they were doing and why. This season we had the best fruit harvest in a decade!',
    rating: 5,
    date: 'March 2024'
  },
  {
    name: 'Jennifer Walsh',
    location: 'Rocklin, CA',
    service: 'Emergency Services',
    text: 'During the last big windstorm, a large branch crashed into our power lines. Barker Tree Services coordinated with PG&E and safely removed the hazard. They went above and beyond to make sure our family was safe. Cannot recommend them enough.',
    rating: 5,
    date: 'February 2024'
  }
]

// Company credentials and certifications
export const COMPANY_CREDENTIALS = {
  founded: '2018',
  experience: '15+ years combined team experience',
  certifications: [
    'CSLB Licensed Contractor #1085329',
    'Tree Risk Assessment Qualified (TRAQ)',
    'OSHA Safety Certified',
    'Fully Insured (General Liability & Workers Comp)'
  ],
  equipment: [
    'Professional climbing gear',
    'Aerial lift equipment',
    'Commercial-grade chainsaws',
    'Stump grinding machines',
    'Wood chippers',
    'Crane services (when needed)'
  ],
  values: [
    'Safety first in every operation',
    'Environmental stewardship',
    'Honest, transparent pricing',
    'Superior customer service',
    'Continuous education and training',
    'Community involvement'
  ]
}
