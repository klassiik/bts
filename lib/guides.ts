// Educational guide content for /guides and /guides/[guide].
//
// These were previously rendered inline on /about with no dedicated URLs, so
// the content couldn't rank for informational queries and wasn't in the
// sitemap. Each guide now has its own page; /about links to them.
//
// Accuracy rules, same spirit as lib/cityContent.ts:
// - Regulatory claims must be verifiable and dated. In particular, Zone 0
//   (the 0-5 ft ember-resistant zone) is still PROPOSED as of this writing:
//   the Board of Forestry missed its Dec 31 2025 rulemaking deadline (EO
//   N-18-25) and paused into 2026. Do NOT describe Zone 0 as "required."
//   PRC 4291's 100 ft defensible space, by contrast, IS current law.
// - No dollar figures (see lib/serviceContent.ts).
// - `updated` drives the Article schema dateModified and the on-page date;
//   bump it when the body meaningfully changes.

export interface GuideSection {
  heading: string
  body: string[]
  bullets?: string[]
}

export interface Guide {
  slug: string
  title: string
  /** Meta description + index-card blurb. Keep ~150 chars. */
  description: string
  category: 'fire-safety' | 'seasonal' | 'safety' | 'maintenance' | 'emergency'
  readTime: string
  /** ISO date; shown on page and used as Article dateModified. */
  updated: string
  /** One-paragraph lede under the H1. */
  intro: string
  sections: GuideSection[]
  faqs?: { question: string; answer: string }[]
  /** slugs of related guides for cross-linking */
  related?: string[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'defensible-space',
    title: 'Defensible Space in Placer & Nevada County: A Homeowner’s Guide',
    description:
      'How defensible space and the proposed Zone 0 ember-resistant zone work for foothill properties, and how tree work fits the 100-foot standard.',
    category: 'fire-safety',
    readTime: '9 min read',
    updated: '2026-07-16',
    intro:
      'Most of the foothill country we work in — Colfax, Auburn, Grass Valley, Nevada City and the parcels around them — sits in a Very High Fire Hazard Severity Zone, where maintaining defensible space around structures is state law, not just good practice. Defensible space is largely a tree and vegetation problem, so here is how it actually works, what is current law versus what is still being written, and where a tree crew fits in.',
    sections: [
      {
        heading: 'What defensible space actually means',
        body: [
          'California Public Resources Code section 4291 requires 100 feet of defensible space around structures in these zones (or to the property line, whichever is closer). The goal is not a moonscape — it is to interrupt the path a fire takes to your house, both the flames moving along the ground and the embers landing on and around the building.',
          'The state describes this as a series of zones working outward from the structure. Each zone has a different job, and the trees in each are treated differently.',
        ],
        bullets: [
          'Zone 0 (0–5 ft): the ember-resistant zone immediately around the structure — see the note below, this one is still proposed.',
          'Zone 1 (5–30 ft): the "lean, clean and green" zone — remove dead plants, keep tree limbs at least 10 feet from other trees and from the chimney, clear needles and leaves.',
          'Zone 2 (30–100 ft): the reduced-fuel zone — thin the canopy, cut ladder fuels that let a ground fire climb into the crowns, and keep grass short.',
        ],
      },
      {
        heading: 'Zone 0: important, and not yet required',
        body: [
          'Zone 0 is the newest and, on paper, the strictest part — the first five feet around a structure, kept free of anything that catches embers: no woodpiles, no combustible bark mulch, no dead needles in the gutters or against the siding, and firewood moved well back from the house.',
          'It is worth doing now because that five-foot band is where most homes ignite in a wildfire. But it is important to be accurate about its legal status: as of mid-2026, Zone 0 is still a proposed regulation, not an adopted one. The Board of Forestry and Fire Protection missed the December 31, 2025 rulemaking deadline set by the Governor’s executive order, paused work in early 2026, and the latest drafts emphasize education and outreach rather than penalties. Treat Zone 0 as strongly recommended and very likely coming — not as a current legal requirement.',
        ],
      },
      {
        heading: 'Where tree work fits',
        body: [
          'Most of what makes a foothill property defensible is tree work, and it is the part homeowners are least equipped to do safely themselves. On the parcels we serve that usually means a few specific jobs.',
        ],
        bullets: [
          'Limbing up conifers so the lowest branches are well off the ground, breaking the ladder a grass fire would climb.',
          'Thinning crowded, never-thinned pine stands so crowns do not touch — the same overcrowding that invites bark beetles.',
          'Removing dead and beetle-killed trees, which are both a fire hazard and a falling hazard.',
          'Clearing branches back from the chimney and from the roofline, and keeping the roof and gutters free of needle litter.',
          'Opening up long private driveways so a fire engine can physically reach the house — access clearance is part of the standard, not an afterthought.',
        ],
      },
      {
        heading: 'Defensible space and tree-removal permits',
        body: [
          'A common worry is that permit rules will stop you from doing required fire work. In practice the two are usually compatible, but they differ by jurisdiction, so it is worth knowing which county you are in.',
          'In Placer County, the Woodland Conservation ordinance generally exempts developed single-family lots that cannot be subdivided, and its permit trigger targets larger clearing rather than routine defensible-space work. In unincorporated Nevada County, most private-property removal needs no permit unless the parcel is in a specific overlay zone — the notable exception being properties inside the Nevada City Sphere of Influence, which do require a permit. Incorporated cities like Rocklin and the Town of Loomis protect native oaks by ordinance regardless of fire zone. We check the specific parcel before removing anything protected, and defensible-space obligations apply either way.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Zone 0 required in California yet?',
        answer:
          'Not as of mid-2026. Zone 0, the 0-to-5-foot ember-resistant zone, is still a proposed regulation. The Board of Forestry and Fire Protection missed the December 31, 2025 rulemaking deadline and paused work into 2026, with the latest drafts emphasizing education over penalties. The 100-foot defensible space requirement under PRC 4291, however, is current law in high fire-hazard zones.',
      },
      {
        question: 'Does defensible space mean cutting down all my trees?',
        answer:
          'No. Defensible space is about interrupting the path fire takes to a structure — raising canopies, thinning crowded stands, cutting ladder fuels, and removing dead trees — not clearing a lot. Plenty of foothill properties meet the 100-foot standard and still sit under mature trees. On steep slopes we specifically keep root systems in place where erosion is a concern.',
      },
      {
        question: 'Do I need a permit to remove a tree for fire safety?',
        answer:
          'It depends on your jurisdiction. Most developed single-family lots in Placer County are exempt, and most of unincorporated Nevada County needs no permit outside overlay zones and the Nevada City Sphere of Influence. Cities like Rocklin and the Town of Loomis protect native oaks by ordinance. We confirm the specific parcel before removing anything protected.',
      },
    ],
    related: ['tree-safety-assessment', 'seasonal-tree-care'],
  },
  {
    slug: 'seasonal-tree-care',
    title: 'Seasonal Tree Care Calendar for the Sierra Foothills',
    description:
      'A month-to-month guide to what your trees need through Northern California’s wet winters and dry summers, and when to time each task.',
    category: 'seasonal',
    readTime: '8 min read',
    updated: '2026-07-16',
    intro:
      'Northern California’s foothill climate — wet winters, long dry summers, and real fire and storm seasons — means tree care is a matter of timing as much as technique. Doing the right task in the wrong season can spread disease or stress a tree; doing it at the right time prevents most of the emergencies we get called out for.',
    sections: [
      {
        heading: 'Spring',
        body: ['As the rains taper off and growth begins, spring is for assessment and cleanup after winter.'],
        bullets: [
          'Inspect trees for winter storm damage and hanging or broken limbs.',
          'Prune dead, diseased, or damaged branches before the growth flush.',
          'Begin regular watering as the rains decrease.',
          'Plant new trees during the early spring window while soil is still moist.',
        ],
      },
      {
        heading: 'Summer',
        body: ['Summer is about keeping trees hydrated and watching for stress, not heavy pruning.'],
        bullets: [
          'Monitor soil moisture and increase watering during heat waves.',
          'Watch for insect damage and disease, especially bark beetles in stressed pines.',
          'Avoid heavy pruning during peak heat — it stresses the tree and invites pests.',
          'Mulch to retain moisture and regulate soil temperature.',
        ],
      },
      {
        heading: 'Fall',
        body: ['Fall is the time to get ahead of winter storms and complete defensible-space work.'],
        bullets: [
          'Continue watering until the first hard frost.',
          'Consider structural pruning before winter storms load the canopy.',
          'Remove fallen leaves and debris from tree bases.',
          'Plant deciduous trees during fall dormancy.',
        ],
      },
      {
        heading: 'Winter',
        body: ['Dormancy is the ideal window for major pruning and removals on most species, and storm season is when hazards show themselves.'],
        bullets: [
          'Schedule structural pruning and removals while deciduous trees are dormant.',
          'Inspect for storm damage after heavy winds, snow, or ice.',
          'Protect young trees from frost.',
          'Minimal watering during dormancy.',
        ],
      },
    ],
    related: ['tree-maintenance-basics', 'tree-safety-assessment'],
  },
  {
    slug: 'tree-safety-assessment',
    title: 'How to Spot a Hazardous Tree',
    description:
      'The warning signs that a tree may be a risk to your home or family, and which ones mean it is time to call a professional.',
    category: 'safety',
    readTime: '6 min read',
    updated: '2026-07-16',
    intro:
      'A regular walk around your property, looking at your trees with the right things in mind, catches most serious problems long before they become an emergency. Here is what to look for, and where the line is between something you can monitor and something that needs a professional assessment.',
    sections: [
      {
        heading: 'Warning signs worth a closer look',
        body: [
          'None of these on their own means a tree must come out, but each is a reason to look harder — and several together, or any near a target like a house or driveway, is a reason to call.',
        ],
        bullets: [
          'Dead or dying branches in the crown, or a thinning canopy.',
          'Cracks or splits in the trunk or major limbs.',
          'Fungal growth (conks or mushrooms) on the bark or around the base.',
          'A lean that is new, or soil heaving on one side of the base.',
          'Roots that are damaged, rotted, or cut — often from nearby construction.',
          'Hollows, cavities, or soft decayed areas in the trunk.',
          'Bore holes, sawdust, or pitch tubes indicating insect activity.',
          'Any branch touching or near a power line — do not approach this yourself.',
        ],
      },
      {
        heading: 'When to call a professional',
        body: [
          'Anything involving power lines, a tree leaning over a structure, visible trunk decay, or a recent change in lean warrants a professional assessment rather than a wait-and-see. So does storm damage that has left a limb hung up in the canopy. These are exactly the situations where a tree that looks stable fails without much more warning, and where the cost of being wrong is high.',
        ],
      },
    ],
    related: ['defensible-space', 'emergency-response'],
  },
  {
    slug: 'tree-maintenance-basics',
    title: 'Tree Maintenance Basics Every Property Owner Should Know',
    description:
      'The handful of fundamentals — watering, mulching, and knowing what not to do — that keep trees healthy and out of trouble.',
    category: 'maintenance',
    readTime: '7 min read',
    updated: '2026-07-16',
    intro:
      'Most tree problems are cheaper to prevent than to fix, and a few fundamentals prevent most of them. Some tree work genuinely needs a professional, but the basics below are things any property owner can get right — and one common practice to avoid entirely.',
    sections: [
      {
        heading: 'Water and mulch',
        body: [
          'Proper watering is the foundation of tree health, especially through our long dry summers. Established trees need deep, infrequent watering out at the drip line rather than frequent shallow watering at the trunk. A ring of mulch — kept a few inches back from the trunk, not piled against it — retains moisture, moderates soil temperature, and keeps mowers and string trimmers away from the bark.',
        ],
      },
      {
        heading: 'Pruning, done right',
        body: [
          'Pruning technique varies by species and goal, but two rules hold generally: make clean cuts just outside the branch collar rather than flush to the trunk, and never remove more than about a quarter of a tree’s live canopy in one season. Young trees benefit most — a little structural pruning in the first years prevents the co-dominant stems and weak attachments that become expensive failures decades later.',
        ],
      },
      {
        heading: 'Do not top your trees',
        body: [
          'The single most damaging thing done to trees in this area is topping — cutting a mature tree back to stubs. It removes the foliage the tree lives on, opens large wounds that decay, and forces weak, dense regrowth that is more failure-prone than the original limbs, not less. It does not make a tree safer; it makes it a future hazard. When a tree genuinely carries too much weight in the wrong place, the answer is structural reduction at proper cuts, not topping.',
        ],
      },
    ],
    related: ['seasonal-tree-care', 'tree-safety-assessment'],
  },
  {
    slug: 'emergency-response',
    title: 'What to Do When a Tree Comes Down',
    description:
      'A calm, safety-first checklist for storm damage and fallen trees — what to handle, what to leave alone, and when to call for help.',
    category: 'emergency',
    readTime: '5 min read',
    updated: '2026-07-16',
    intro:
      'When a tree fails onto a house, a car, or across a driveway, the instinct is to start dealing with it immediately. The most important thing is to slow down for a moment and assess, because the hazards in a tree-failure scene are not always the obvious ones.',
    sections: [
      {
        heading: 'First: make it safe',
        body: [
          'Before anyone approaches a downed tree, look for what could still hurt someone.',
        ],
        bullets: [
          'Assume any line the tree is touching is live, and keep everyone well clear — call the utility, not us, for lines.',
          'Look up for hung-up limbs and broken branches still in the canopy that could drop.',
          'A fallen tree can be under enormous spring tension — cutting the wrong piece can release it violently. This is why storm cutting is dangerous.',
          'Get people and pets away from the tree and anything it is leaning on.',
        ],
      },
      {
        heading: 'Then: document and call',
        body: [
          'Once everyone is safe, photograph the damage from several angles before anything is moved — it makes the insurance claim far easier. Then call a professional for anything involving a structure, a vehicle, tension in the wood, or height. Temporary measures like tarping a roof opening can prevent further water damage, but the tree itself is a job for a crew with rigging.',
          'We run emergency service 24/7 for exactly these situations. Storm season in the foothills means saturated soil dropping shallow-rooted pines and snow-loaded conifers failing overnight, and a fast response limits the secondary damage.',
        ],
      },
    ],
    related: ['tree-safety-assessment', 'defensible-space'],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug)
}
