export const FOUNDING_YEAR = 2018
// Computed at build time — refreshes on each deploy. Prefer "since 2018"
// phrasing in copy where possible; use this only where a number is needed.
export const YEARS_IN_BUSINESS = Math.max(1, new Date().getFullYear() - FOUNDING_YEAR)

// Canonical citation profiles. Single source for both the schema sameAs list
// and the footer's visible links, so a profile can't appear in one and not
// the other. Keep NAP identical on every one of these listings.
export const CITATION_PROFILES = [
  { name: 'Google', url: 'https://maps.google.com/?cid=12582642690419062828' },
  { name: 'Facebook', url: 'https://www.facebook.com/barkertreeservices' },
  { name: 'Yelp', url: 'https://www.yelp.com/biz/barker-tree-services-colfax' },
  { name: 'HomeAdvisor', url: 'https://www.homeadvisor.com/rated.BarkerTreeService.87252061.html' },
  // Live, correct NAP, but the slug is a leftover from a prior claim under
  // another business's name. Worth asking Nextdoor to re-slug it; until then
  // this is still the canonical Nextdoor profile and belongs in sameAs.
  { name: 'Nextdoor', url: 'https://nextdoor.com/pages/hollingsworth-tree-service-colfax-ca/' },
  // TODO: the BBB profile is filed under "not elsewhere classified" — ask BBB
  // to recategorize to a tree-service category, then update this URL.
  { name: 'BBB', url: 'https://www.bbb.org/us/ca/colfax/profile/not-elsewhere-classified/barker-tree-services-1156-90094954' }
]

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
  // Verified via CSLB public license lookup: C-49 (Tree and Palm) is
  // California's dedicated tree-service classification. Current & active.
  cslbClassification: 'C-49',
  cslbLookupUrl: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
  url: 'https://barkertreeservices.com',
  socialProfiles: CITATION_PROFILES.map(profile => profile.url)
}

// Google Business Profile — canonical Maps URL (stable CID form).
// rating/reviewCount are a manually verified snapshot; update them (and
// verifiedAt) when the live numbers change meaningfully.
export const GOOGLE_BUSINESS = {
  url: 'https://maps.google.com/?cid=12582642690419062828',
  rating: 5.0,
  reviewCount: 17,
  verifiedAt: '2026-07-11'
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

// Company credentials and certifications
export const COMPANY_CREDENTIALS = {
  founded: String(FOUNDING_YEAR),
  experience: `${YEARS_IN_BUSINESS} years in business since ${FOUNDING_YEAR}`,
  certifications: [
    'CSLB C-49 Licensed Contractor (Tree & Palm) #1085329',
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
