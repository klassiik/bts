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
  /**
   * 3 city-specific Q&As, rendered on the page and emitted as FAQPage schema.
   *
   * Rules for these, learned the hard way:
   * - They must be answerable ONLY for this city. A question whose answer
   *   would read identically for another city is template filler and belongs
   *   in the sitewide FAQ instead.
   * - Never state a dollar figure. Per lib/serviceContent.ts, cost is
   *   described by what drives it plus a free on-site estimate, so nothing
   *   goes stale — a hardcoded range previously shipped in FAQ schema where
   *   an AI engine could quote it as current pricing.
   * - Permit answers must match the actual jurisdiction (note Smartville is
   *   Yuba County, not Nevada) and should point at the authority rather than
   *   promise an outcome, because these ordinances change.
   */
  faqs: { question: string; answer: string }[]
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Colfax?',
        answer:
          'For most Colfax homeowners, no. Placer County\'s Woodland Conservation ordinance (Article 19.50) generally exempts developed single-family lots that cannot be subdivided, and its permit trigger is aimed at larger clearing: removing more than half of a parcel\'s native trees six inches in diameter or greater, with native oaks held to a stricter five-inch standard. Undeveloped or subdividable parcels are where a Minor Tree Permit usually comes in, and those are filed at least 30 days ahead. We tell you which side of that line your property falls on before we quote, and confirm with Placer County Planning when it is close.',
      },
      {
        question: 'How much does tree removal cost in Colfax?',
        answer:
          'We do not publish a price list, because the same species at the same height can differ several-fold in cost. In Colfax the real drivers are slope and access: sloped, wooded parcels off Placer Hills Road often cannot take a bucket truck, which turns a removal into a technical climb with sectional rigging. After that it is proximity to the house, outbuildings, and PG&E lines, the size of the conifer, and how far debris has to be dragged. We look at the tree and give you a firm number for free.',
      },
      {
        question: 'How fast can you respond to a fallen tree in Colfax?',
        answer:
          'Colfax is our home base. We operate out of Placer Hills Road, so Colfax properties get our fastest response of anywhere we serve, and most of our storm work starts within a few miles of the shop. We run emergency service 24/7, which matters here because winter storms coming over the Sierra crest load ponderosa and cedar with snow and ice, and saturated ground drops shallow-rooted pines overnight.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Grass Valley?',
        answer:
          'In unincorporated Nevada County, most tree removal on private property does not require a permit unless the parcel sits in a specific overlay zone, the notable exception being properties inside the Nevada City Sphere of Influence, which do need a permit from the County Planning Director. Inside Grass Valley city limits, check with the city before removing street or landmark trees. Defensible-space obligations apply whether or not a permit does, and we flag anything that looks like an overlay issue before starting.',
      },
      {
        question: 'Why are so many pines dying around Grass Valley?',
        answer:
          'It is usually drought stress followed by bark beetles, and crowded stands are hit first. A lot of Grass Valley property carries never-thinned ponderosa growing far too close together: they compete for limited water, and a weakened pine cannot push enough pitch to force out attacking beetles. The tell is fading needles going green to yellow-red across the crown, often with pitch tubes on the trunk. Once a pine is fully faded it is dead and becomes a falling hazard, so thinning the stand before that point is what protects the trees worth keeping.',
      },
      {
        question: 'Can you work to the Fire Safe Council\'s defensible space standards?',
        answer:
          'Yes. Grass Valley and the surrounding county sit largely in Very High Fire Hazard Severity Zones, and Nevada County actively enforces the 100-foot defensible space requirement under PRC 4291. We plan thinning, limbing, and removal to those standards so inspections go smoothly, and coordinate with the chipping and clearing programs the Fire Safe Council of Nevada County runs rather than duplicating work you can get help with.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Nevada City?',
        answer:
          'Quite possibly. Nevada City is the exception to Nevada County\'s generally permissive rules: properties within the Nevada City Sphere of Influence require a tree removal permit from the County Planning Director before removal, with limited exceptions, and work near landmark structures in the historic district warrants extra care. We confirm the permit position with the county on Nevada City jobs before scheduling rather than have you find out afterward.',
      },
      {
        question: 'Can you remove a large tree in the historic district\'s narrow streets?',
        answer:
          'That is most of what we do here. Nevada City\'s ponderosa, Douglas-fir, and incense cedar routinely exceed 100 feet over Victorian homes on tight lot lines with steep driveways and overhead lines, where a crane often cannot reach and a straight fell is not an option. We take these down in sections, climbing and lowering each piece under control over the roof or garden below. It is slower than felling, and it is the reason the tree ends up in the truck instead of through the porch.',
      },
      {
        question: 'Will fire-safety clearing ruin the canopy that makes Nevada City look like Nevada City?',
        answer:
          'It should not, and that is the balance we aim for. Defensible space is about interrupting the path fire takes to a structure: raising canopies, cutting ladder fuels, and removing the specific trunks and limbs that threaten the house, not clear-cutting a lot. On the Deer Creek slopes we keep root systems in place where erosion is a concern. Plenty of properties here meet the 100-foot standard and still sit under big trees.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Rough and Ready?',
        answer:
          'Usually not. Rough and Ready is unincorporated western Nevada County, where most private-property removals do not require a permit unless the parcel falls in a specific overlay zone, unlike the Nevada City Sphere of Influence nearby, which does. What does apply out here is defensible space: 100 feet around structures under PRC 4291, and Nevada County enforces it. We confirm your parcel\'s status before removing anything protected.',
      },
      {
        question: 'Why do gray pines drop such big limbs?',
        answer:
          'Gray pine is built in a way that works against it: heavy, wide-spreading limbs, often multiple leaning trunks from a single base, and wood that splits rather than bends in wind. Around Rough and Ready they grow on dry, rocky ground at the oak-conifer transition, which adds drought stress to the load. They shed large limbs without much warning and split in storms. Weight reduction and removing failure-prone leaders costs far less than what a dropped limb does to a roof or a truck.',
      },
      {
        question: 'Can you clear a long private driveway so a fire engine can get in?',
        answer:
          'Yes, and on rural parcels here it is one of the most valuable things we do. Homes off Rough and Ready Highway sit at the end of long private drives, and CAL FIRE standards call for both vertical and horizontal clearance so an engine can physically reach the house. If it cannot, you may not get defended. We clear the access corridor, reduce ladder fuels along it, and take out hazard trees leaning over the drive.',
      },
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
    faqs: [
      {
        question: 'What makes fire risk different in Smartville than up the hill?',
        answer:
          'Elevation changes the whole problem. At around 670 feet, Smartville sits in open, rolling grassland rather than dense conifer forest, so the threat is a fast-moving grass fire racing through cured annual grasses, not a crown fire moving tree to tree. That fire climbs into untrimmed oaks and pines near your buildings and uses them as a ladder. Raising canopies, pulling deadwood, and holding 100 feet of defensible space around structures materially changes how that fire behaves when it reaches your fence line.',
      },
      {
        question: 'Do I need a permit to remove a tree in Smartville?',
        answer:
          'Smartville sits in Yuba County, not Nevada County, so its rules differ from most of our service area, and requirements vary by parcel. Before removing anything protected we confirm the current position with Yuba County directly rather than assume. We would rather make one phone call than cost you a violation.',
      },
      {
        question: 'Can you take down hazard trees around barns, wells, and outbuildings?',
        answer:
          'Yes, and on ranch parcels that is usually the real job. The infrastructure a property runs on, including wells, pumps, barns, and fence lines, tends to sit right where the old homestead shade trees were planted, and those are often the biggest and most neglected trees on the place. We drop and buck away from what you cannot afford to have crushed, and deal with the deadwood and mistletoe that legacy blue oaks accumulate over decades.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove an oak in Penryn?',
        answer:
          'Often, yes. Penryn sits inside Placer County\'s Woodland Conservation area under the Horseshoe Bar/Penryn plan, where removing native oaks five inches in diameter or larger can require a county tree permit. That five-inch threshold for oaks is stricter than the six-inch standard applied to other native trees. Permits are generally filed at least 30 days ahead, and a significant scope can trigger a request for an arborist\'s report. We help document the hazard and disease conditions that support removal, and take the pruning-first approach the ordinance encourages.',
      },
      {
        question: 'Why do the oaks here lean and split so much?',
        answer:
          'Granite. Penryn was built on it, and shallow, rocky soils and decomposed-granite slopes limit how deep oak roots can go. Trees that cannot anchor deeply lean, and interior live oaks in particular develop co-dominant trunks that split at the union under wet-winter load. It is a structural problem, so the fix is structural: reduce end weight on the heavy side, and cable or remove failure-prone leaders before a wet winter finds them.',
      },
      {
        question: 'How much does tree work cost in Penryn?',
        answer:
          'We quote per job on site rather than publish figures, because on Penryn parcels the variables swamp any list price. Heritage-size oaks on granite slopes with orchard rows and outbuildings nearby mean equipment access and rigging drive cost more than the tree\'s height does. Whether the work is a permitted removal or the clearance pruning the ordinance prefers changes the picture entirely as well. Estimates are free.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Loomis?',
        answer:
          'Generally yes, for protected natives. The Town of Loomis Tree Conservation ordinance (Chapter 13.54) protects native trees and states preservation as its first priority, so removals of protected trees typically require a town permit. In practice the town wants to see that pruning or another alternative was genuinely considered. We work inside this ordinance routinely: assessing whether a tree qualifies as hazardous, documenting it the way the town expects, and pursuing the preservation route where it is viable.',
      },
      {
        question: 'Are oak limbs actually dangerous to horses?',
        answer:
          'They are worth taking seriously on a horse property. Falling limbs are the obvious hazard around paddocks and arena edges, but wilted or fallen oak material is also a genuine concern for stock, which is why clean paddock trees matter more here than on a typical residential lot. We prune for clearance and canopy health over pasture and arena areas, and clear deadfall rather than leaving it where animals get at it.',
      },
      {
        question: 'Do you top trees?',
        answer:
          'No, because topping ruins an oak. Cutting a mature tree back to stubs removes the foliage it lives on, opens large wounds that decay, and forces weak regrowth that is more failure-prone than what you started with, not less. In a town whose ordinance exists to preserve these trees, topping is also the fastest way to turn a healthy protected oak into a hazard. When a tree genuinely carries too much weight in the wrong place, the answer is structural reduction at proper cuts.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove an oak in Rocklin?',
        answer:
          'Yes, if it is a native oak six inches or larger in trunk diameter: the City of Rocklin requires a permit before removal. The useful details are that the permit itself is free, mitigation such as replanting or an in-lieu fee can apply, and dead or hazardous oaks are typically exempt from that mitigation. That exemption is why an honest assessment matters. We prepare the documentation the city looks for, which keeps a straightforward hazard removal from stalling for weeks.',
      },
      {
        question: 'There is a 200-year-old oak over my roof. Does it have to come out?',
        answer:
          'Usually not. Many Rocklin subdivisions were built around their native oaks rather than clearing them, so mature oaks over newer roofs are the normal condition here, not an emergency. The question is whether the tree has an actual defect such as included bark, a split union, deadwood over the target, or root damage from construction, or whether it is simply large. Large is not the same as hazardous. We tell you which one you have, and preservation pruning is often the whole answer.',
      },
      {
        question: 'My ornamental pear split in a storm. Can it be saved?',
        answer:
          'Sometimes, and it is a common call in Rocklin. The ornamental pears, ashes, and maples planted when these neighborhoods went in are now hitting the age where included bark and storm splits show up, along with roots heaving sidewalks. If the split is a single limb and the union is sound, corrective pruning works. If the trunk itself has failed at an included-bark union, the tree is structurally compromised and removal is the honest answer, because patching it usually just defers a bigger failure.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove an oak in Lincoln?',
        answer:
          'It depends on the parcel, and it is worth asking first. Lincoln\'s policy is to preserve oaks wherever possible, largely through its development review process, so protections often attach to heritage trees that survived construction on newer lots. Rural acreage toward Sheridan sits under different considerations again. We check the specific parcel with the city rather than guess, because the answer here varies more than it does in Rocklin or Loomis.',
      },
      {
        question: 'My subdivision trees are young. Is there anything to do now?',
        answer:
          'Yes, and this is the highest-return tree work there is. Structural pruning in the first years establishes a single dominant leader and removes the co-dominant stems and weak attachments that become expensive failures around year twenty. A few cuts now on a young tree in Sun City or Twelve Bridges prevents the split trunk that later costs a crane removal and a new roof. It is cheap, fast, and almost nobody does it.',
      },
      {
        question: 'Why does everything have mistletoe out here?',
        answer:
          'Heat and stress on the valley floor. Lincoln\'s summers push irrigation-stressed trees hard, and weakened valley oaks and blue oaks are exactly what mistletoe establishes in: birds spread it, and it takes hold where the canopy is already thin. It is a parasite drawing water from a tree that is short on it, so heavy infestations accelerate decline. Pruning out infested wood and getting irrigation right around mature oaks does more than treating the mistletoe itself.',
      },
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
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Auburn?',
        answer:
          'For most developed residential lots in the Auburn area, no. Placer County\'s Woodland Conservation ordinance generally exempts developed single-family parcels that cannot be subdivided, and its permit trigger targets larger clearing: more than half of a parcel\'s native trees six inches or greater in diameter, with native oaks held to a stricter five-inch standard. Undeveloped or subdividable land is a different conversation, and a Minor Tree Permit is filed at least 30 days ahead. Inside city limits, street and landmark trees have their own rules. We confirm before we cut.',
      },
      {
        question: 'Can you remove a tree hanging over the American River canyon?',
        answer:
          'Yes, and canyon-rim work is something we take on that a lot of companies pass on. Lots along the Western States Trail rim and the ravines have trees leaning over the drop with no equipment access and real erosion concerns, which argue for leaving root systems in place rather than grinding everything out. These are sectional removals with rigging, done from the tree, with pieces brought back uphill under control rather than dropped into the canyon.',
      },
      {
        question: 'How fast can you get to a storm call in Auburn?',
        answer:
          'Auburn is central to our emergency coverage. It is the Placer County seat and the Highway 49 crossroads, and storm-damage calls along the I-80 and Highway 49 corridors route through it, so we position for fast response on both. We are on call 24/7. Auburn\'s mix of live oak, blue oak, black oak, and big pines means storm damage here can be anything from a shed limb to a full canyon-side failure, and we come equipped for either.',
      },
    ],
  },
}

export function getCityDetail(city: string): CityDetail | undefined {
  return CITY_DETAILS[city]
}
