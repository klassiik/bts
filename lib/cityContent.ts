// Per-city local content for /service-areas/[city] pages.
//
// Every city MUST have an entry here — unique intro, landscape, regulations,
// and highlights — before it is added to SERVICE_AREAS in lib/config.ts.
// Templated city pages with only the city name swapped are treated as
// doorway pages by Google; this file is what keeps each page genuinely local.
//
// Facts (elevations, species zones, ordinances, fire-severity context) were
// researched against county/city sources; verify before editing:
// - Placer County Woodland Conservation (Article 19.50) covers the
//   Horseshoe Bar/Penryn plan area: native oaks >=5" dbh
// - Town of Loomis Tree Conservation (Ch. 13.54)
// - City of Rocklin oak removal permit: native oaks >=6" dbh
// - Nevada County Fire Hazard Severity Zones / PRC 4291 defensible space

export interface CityDetail {
  county: string
  /** 2-3 sentence city-specific hero paragraph */
  intro: string
  /** Trees & terrain: species, soils, growth conditions */
  landscape: string
  /** Permits, fire safety, and local rules */
  regulations: string
  /** 4 short city-specific selling points */
  highlights: string[]
}

export const CITY_DETAILS: Record<string, CityDetail> = {
  'Colfax': {
    county: 'Placer',
    intro:
      'Colfax is our home base — Barker Tree Services operates from Placer Hills Road, so crews reach most Colfax properties faster than anywhere else we serve. At roughly 2,400 feet on the I-80 corridor, this historic railroad town sits squarely in mixed-conifer country, and we work in it every day.',
    landscape:
      'Properties around Colfax, Weimar, and Applegate carry ponderosa pine, incense cedar, Douglas-fir, and California black oak — tall, heavy timber growing close to homes on sloped, wooded parcels. Winter storms coming over the Sierra crest load these conifers with snow and ice, and saturated soils bring down shallow-rooted pines; summer drought stress invites bark beetles into weakened trees. Much of our storm-response work starts within a few miles of the shop.',
    regulations:
      'Most of the Colfax area falls in a Very High Fire Hazard Severity Zone, so maintaining 100 feet of defensible space around structures is a legal requirement, not just good practice. We thin ladder fuels, limb up conifers, and remove beetle-killed pines to help properties meet CAL FIRE defensible-space standards — and we know how PG&E powerline clearance work interacts with what remains on the homeowner to maintain.',
    highlights: [
      'Our home base — fastest response times in our service area',
      'Daily experience with ponderosa, cedar, fir, and black oak',
      'Defensible-space thinning for Very High fire severity zones',
      'Snow-load and storm-damage response on the I-80 corridor',
    ],
  },
  'Grass Valley': {
    county: 'Nevada',
    intro:
      'Grass Valley grew up around the Empire Mine, and its older neighborhoods still carry the mature landscape trees to prove it. At about 2,400 feet in the western Nevada County foothills, the town mixes big conifers with century-old hardwoods — beautiful, and demanding to maintain safely.',
    landscape:
      'In-town lots hold mature ponderosa pine, cedar, and black oak alongside planted maples, elms, and fruit trees from the mining era, often overhanging roofs, fences, and neighboring properties. On the rural edges toward Penn Valley and Rough and Ready, the forest opens into oak and gray pine on dry, rocky slopes. Crowded, never-thinned conifer stands are common here, and they are exactly what drought and bark beetles hit first.',
    regulations:
      'Grass Valley and the surrounding unincorporated county sit largely in Very High Fire Hazard Severity Zones, and Nevada County actively enforces 100-foot defensible space. The Fire Safe Council of Nevada County runs local chipping and clearing programs; we coordinate our thinning, limbing, and removal work to those same standards so inspections go smoothly.',
    highlights: [
      'Mature-tree care in the historic Empire Mine neighborhoods',
      'Conifer thinning to defensible-space standards',
      'Bark-beetle and drought-stress assessment for pine stands',
      'Grounds maintenance for Gold Country commercial properties',
    ],
  },
  'Nevada City': {
    county: 'Nevada',
    intro:
      'Nevada City packs towering conifers, Victorian architecture, and some of the narrowest streets in the Sierra foothills into one historic district — which makes tree work here a rigging problem as much as a cutting problem. We bring trees down in sections over rooftops and gardens that a crane often cannot reach.',
    landscape:
      "At around 2,500 feet along Deer Creek, Nevada City's ponderosa pines, Douglas-firs, and incense cedars grow well over 100 feet, shading — and threatening — homes that are older than the trees. Tight lot lines, steep driveways, overhead lines, and slope down to the creek leave little room for error, so most removals here are technical climbs with careful lowering rather than straight fells.",
    regulations:
      'The historic district means work near landmark structures needs extra care, and the city sits in Very High Fire Hazard Severity terrain where 100-foot defensible space applies. We plan removals and pruning to preserve the tree canopy that defines the town while eliminating the specific trunks and limbs that put historic structures at risk.',
    highlights: [
      'Sectional removals over Victorian-era homes and gardens',
      'Narrow-access rigging for historic district streets',
      'Canopy preservation balanced with fire-safety clearing',
      'Steep-slope work along the Deer Creek corridor',
    ],
  },
  'Rough and Ready': {
    county: 'Nevada',
    intro:
      'Rough and Ready — the Gold Rush camp that famously declared itself its own republic in 1850 — is today a community of rural parcels off Rough and Ready Highway, where homes sit among the trees at the end of long private drives. That setting is exactly where a leaning pine or a dead oak goes from scenery to liability.',
    landscape:
      'At about 2,000 feet, Rough and Ready sits in the transition band where blue oak and gray pine woodland climbs into ponderosa pine and black oak. Parcels here often carry both: drought-hardy oaks on the dry, rocky ground and taller conifers in the draws. Gray pines are notorious for shedding massive limbs and splitting in wind, and unmanaged oaks around older homesteads accumulate deadwood over decades.',
    regulations:
      'Like most of western Nevada County, the area carries high fire-severity ratings, and 100-foot defensible space applies around structures. Long driveways matter too — CAL FIRE standards call for vertical and horizontal clearance so engines can reach the house. We handle driveway corridor clearing, ladder-fuel reduction, and hazard-tree removal on rural acreage.',
    highlights: [
      'Rural-acreage hazard trees at the oak-conifer transition',
      'Gray pine limb-failure and windthrow prevention',
      'Driveway and access-corridor clearance to CAL FIRE standards',
      'Deadwood cleanup on legacy homestead oaks',
    ],
  },
  'Smartville': {
    county: 'Yuba',
    intro:
      'Smartville sits on the Highway 20 corridor where Nevada County meets Yuba County — Gold Rush hydraulic-mining country that is now open, rolling ranchland at about 670 feet. Out here the trees cluster around homes, barns, and fence lines, and summer turns the surrounding grassland bone-dry.',
    landscape:
      'This is classic blue oak and gray pine woodland — the same habitat protected next door at the Spenceville Wildlife Area. Blue oaks are tough, slow-growing, and drought-adapted, but decades of deadwood build-up and mistletoe take a toll, and gray pines drop heavy cones and limbs without warning. Homestead shade trees planted generations ago are often the largest — and most neglected — trees on the property.',
    regulations:
      'Fast-moving grass fires are the defining risk at this elevation: flames race through cured annual grasses and climb into untrimmed oaks and pines near structures. Keeping canopies raised, deadwood out, and 100 feet of defensible space around buildings materially changes how a grass fire behaves when it reaches your fence line. We also drop and buck hazard trees away from wells, pumps, and outbuildings that ranch properties depend on.',
    highlights: [
      'Blue oak and gray pine care on rolling ranch parcels',
      'Grass-fire defensible space for homes, barns, and outbuildings',
      'Deadwood and mistletoe management in legacy oaks',
      'Highway 20 corridor service between Penn Valley and Marysville',
    ],
  },
  'Penryn': {
    county: 'Placer',
    intro:
      'Penryn was built on granite — a Welsh quarryman founded the town around his 1864 quarry, and Griffith Quarry Park still anchors it today. That same granite is why tree work here is different: oaks grow on shallow, rocky soils and decomposed-granite slopes among the mandarin orchards that made this stretch of Placer County famous.',
    landscape:
      'Interior live oak, blue oak, and valley oak dominate Penryn parcels, many of them heritage-size trees that predate the houses beneath them. Shallow granite soils limit root depth, so mature oaks here lean, split at co-dominant trunks, and drop large limbs in wet winters. Around orchard properties, we prune for clearance and sunlight without compromising the oaks that give these parcels their character and value.',
    regulations:
      "Penryn falls inside Placer County's Woodland Conservation area (the Horseshoe Bar/Penryn plan), where removing native oaks five inches in diameter or larger can require a county tree permit. We help homeowners document hazard and disease conditions that qualify for removal, and handle the pruning-first approach the ordinance encourages.",
    highlights: [
      'Heritage oak care on granite soils and quarry-country slopes',
      'Placer County tree-permit guidance for protected native oaks',
      'Clearance pruning around mandarin orchards and outbuildings',
      'Structural pruning for split-prone live oaks',
    ],
  },
  'Loomis': {
    county: 'Placer',
    intro:
      'Loomis has deliberately kept its small-town, horse-property character — and its tree canopy is a big part of that. The town takes its oaks seriously enough to protect them by ordinance, and so do the homeowners who bought here for exactly that landscape.',
    landscape:
      'Valley oak, interior live oak, and blue oak spread across large residential lots, pastures, and arena edges throughout Loomis. These are long-lived trees that need structural pruning young and weight management when mature; horse owners also need clean, safe paddock trees, since fallen oak limbs and certain deadfall are genuine hazards to stock. We prune for canopy health, clearance, and safety without the topping cuts that ruin oaks.',
    regulations:
      "The Town of Loomis Tree Conservation ordinance (Chapter 13.54) protects native trees, and its stated first priority is preserving them — removals of protected trees generally require a town permit. We work within the ordinance routinely: assessing whether a tree qualifies as hazardous, documenting it properly, and pursuing pruning alternatives where the town expects preservation.",
    highlights: [
      'Heritage valley oak preservation on horse properties',
      'Town of Loomis tree-ordinance permits handled routinely',
      'Paddock and pasture tree safety for livestock owners',
      'Structural pruning that avoids destructive topping',
    ],
  },
  'Rocklin': {
    county: 'Placer',
    intro:
      "Rocklin's granite-quarry history still shows at Quarry Park, but today it is an established suburban city where native oaks share space with maturing landscape trees in neighborhoods from Stanford Ranch to Whitney Ranch. Both kinds of trees are now old enough to need real care.",
    landscape:
      'Native interior live oaks and blue oaks were built around, not removed, in many Rocklin subdivisions — so 200-year-old oaks now overhang 20-year-old roofs. Meanwhile the ornamental pears, ashes, and maples planted when these neighborhoods went in are reaching the age of included bark, storm splits, and root-heaved sidewalks. We handle both: preservation pruning for protected oaks and corrective work or removal for failing landscape trees.',
    regulations:
      'The City of Rocklin requires a permit before removing any native oak six inches or larger in trunk diameter — the permit itself is free, but mitigation (replanting or an in-lieu fee) can apply, and dead or hazardous oaks are typically exempt from mitigation. We prepare the assessment and documentation the city looks for, which keeps straightforward hazard removals from stalling.',
    highlights: [
      'City oak-permit process handled start to finish',
      'Mature native oaks over homes in established subdivisions',
      'Aging ornamental and landscape tree correction or removal',
      'HOA and commercial grounds maintenance',
    ],
  },
  'Lincoln': {
    county: 'Placer',
    intro:
      'Lincoln has been one of the fastest-growing cities in California, but it is still the town where Gladding McBean has fired clay since 1875 — new subdivisions on the valley floor ringed by ranchland and heritage oaks. The tree work here splits the same way: young landscape trees in the newer neighborhoods, big legacy oaks on the edges.',
    landscape:
      'In Sun City, Twelve Bridges, and the newer developments, the priority is getting young trees structurally sound — early pruning that prevents the co-dominant stems and weak attachments that become expensive failures at year twenty. On rural properties toward Sheridan and the west, mature valley oaks and blue oaks need deadwood management, weight reduction, and honest risk assessment. Summer heat on the valley floor also makes irrigation stress and mistletoe constant themes.',
    regulations:
      "Lincoln's city policy is to preserve oaks wherever possible through its development review process, and defensible-space rules apply as neighborhoods push into the grassland-oak interface on the city's edges. We advise on which oaks are worth engineering around and keep new-lot landscaping compatible with the heritage trees that survived construction.",
    highlights: [
      'Young-tree structural pruning in newer subdivisions',
      'Heritage valley oak care on rural Lincoln acreage',
      'Mistletoe and heat-stress management on the valley floor',
      'Builder and HOA tree programs for growing communities',
    ],
  },
  'Auburn': {
    county: 'Placer',
    intro:
      'Auburn stacks three tree environments into one town: the historic Old Town core, established neighborhoods at 1,200 feet, and the steep American River canyon rim where the Western States Trail drops away below backyards. We work all three — including the canyon-edge removals most companies pass on.',
    landscape:
      'Auburn sits in the transition from foothill oak and gray pine into the lower edge of ponderosa country, so properties can carry live oak, blue oak, black oak, and big pines all at once. Canyon-rim and ravine lots add steep-slope complications: trees leaning over the drop, limited equipment access, and erosion concerns that argue for leaving root systems in place. Sectional removal with rigging — not felling — is the default on these lots.',
    regulations:
      'Fire severity climbs quickly on Auburn\'s canyon sides and eastern edges, and defensible-space enforcement follows. As Placer County\'s seat and the Highway 49 crossroads, Auburn is also central to our emergency coverage — storm-damage calls along the I-80 and Highway 49 corridors route through it, and we position for fast response on both.',
    highlights: [
      'Steep-slope and canyon-rim removals over the American River',
      'Highway 49 corridor emergency response positioning',
      'Oak-to-pine transition species expertise',
      'Old Town commercial property maintenance',
    ],
  },
}

export function getCityDetail(city: string): CityDetail | undefined {
  return CITY_DETAILS[city]
}
