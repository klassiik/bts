// City×service combo pages: /service-areas/[city]/[service].
//
// These target the highest-intent long-tail queries ("tree removal grass
// valley ca", "stump grinding nevada city") that competitors rank for with
// thin, city-name-swapped template pages. The whole point of doing it here is
// to NOT do that: each combo below is written to be answerable only for that
// specific city AND that specific service — if the prose would read the same
// for another city or another service, it's filler and doesn't belong.
//
// This is a deliberate PILOT of 5, not the full 10×4 = 40 grid. The route
// sets dynamicParams = false and builds only these, so every other
// combination 404s rather than generating doorway pages. The audit's own
// location-page quality gate warns at 30 pages and hard-stops at 50; 40
// near-duplicates would trip it and is exactly the pattern Google treats as
// doorway spam. Expand only after these measurably rank.
//
// Same content rules as cityContent/guides: no dollar figures (cost is
// described by what drives it + a free estimate), and any permit claim must
// match the real jurisdiction.

export interface CityServiceCombo {
  citySlug: string
  serviceId: string
  /** <h1> and the base for titles/schema names, e.g. "Tree Removal in Grass Valley, CA" */
  h1: string
  /** ~150-char meta description, geo + service qualified */
  metaDescription: string
  /** One-paragraph lede specific to this city+service. */
  intro: string
  /** 2-4 body paragraphs weaving the city's terrain/rules with this service. */
  body: string[]
  faqs: { question: string; answer: string }[]
}

export const CITY_SERVICE_COMBOS: CityServiceCombo[] = [
  {
    citySlug: 'colfax',
    serviceId: 'removal',
    h1: 'Tree Removal in Colfax, CA',
    metaDescription:
      'Tree removal in Colfax, CA from a local crew on Placer Hills Road. Sloped, wooded parcels a bucket truck can’t reach are our everyday work. CSLB #1085329.',
    intro:
      'Colfax is our home base — Barker Tree Services works out of Placer Hills Road — so removals here get our fastest response of anywhere we serve, and the sloped, wooded parcels that make tree removal difficult in this town are exactly the ground we work on every day.',
    body: [
      'Most Colfax removals are not straight fells. Ponderosa pine, incense cedar, and Douglas-fir grow tall and heavy close to homes on parcels that a bucket truck often cannot reach, so the tree comes down in sections — climbed, rigged, and lowered piece by piece over the roof, the deck, and the PG&E service drop rather than dropped in one go. That is the difference between a tree that ends up in our truck and one that goes through your porch.',
      'The trees we are called to remove here follow a pattern: shallow-rooted pines that let go in saturated winter ground, conifers snapped or split by snow and ice off the Sierra crest, and beetle-killed pines standing dead after a drought summer. Removing a dead pine before it fails on its own is both a fire-safety and a falling-hazard decision, and it is a large share of what we do within a few miles of the shop.',
      'On permits, most Colfax homeowners are in the clear: Placer County’s Woodland Conservation ordinance (Article 19.50) generally exempts developed single-family lots that cannot be subdivided, and its permit trigger is aimed at larger clearing, not a hazard tree or two. We tell you which side of that line your property is on before we quote, and confirm with Placer County Planning when it is close.',
    ],
    faqs: [
      {
        question: 'Why does tree removal in Colfax often need climbing instead of a bucket truck?',
        answer:
          'Because of the terrain. Many Colfax parcels are sloped and wooded, with the tree tucked among other trees or close to the house, so there is nowhere to set up a bucket truck or drop a full-height trunk. On those sites we climb the tree and remove it in rigged sections, lowering each piece under control. It is slower than a straight fell, and it is what keeps the removal from damaging what is underneath.',
      },
      {
        question: 'Do I need a permit to remove a tree in Colfax?',
        answer:
          'For most Colfax homeowners, no. Placer County’s Woodland Conservation ordinance generally exempts developed single-family lots that cannot be subdivided; its permit trigger targets larger clearing (more than half of a parcel’s native trees six inches or greater in diameter, with oaks stricter at five). Undeveloped or subdividable parcels are where a Minor Tree Permit comes in, filed at least 30 days ahead. We confirm before we cut.',
      },
      {
        question: 'How fast can you remove a hazardous tree in Colfax?',
        answer:
          'Faster than anywhere else we serve — Colfax is our home base on Placer Hills Road, and most of our storm work starts within a few miles of it. We run emergency removal 24/7, which matters here because saturated winter ground and snow-loaded conifers bring trees down overnight.',
      },
    ],
  },
  {
    citySlug: 'grass-valley',
    serviceId: 'removal',
    h1: 'Tree Removal in Grass Valley, CA',
    metaDescription:
      'Tree removal in Grass Valley, CA — mature Empire Mine-era trees over roofs and drought-killed conifers, to Nevada County standards. CSLB #1085329.',
    intro:
      'Grass Valley grew up around the Empire Mine, and its older neighborhoods still carry the mature trees to prove it — which is exactly why removal here is rarely simple. Big conifers and century-old hardwoods overhang roofs, fences, and neighboring lots, and taking one out safely is a rigging problem, not a chainsaw problem.',
    body: [
      'Two kinds of removal dominate here. In town, it is mature ponderosa, cedar, and black oak — plus planted maples and elms from the mining era — that have outgrown their space and now lean over structures or lines. On the rural edges toward Penn Valley and Rough and Ready, it is drought-stressed, bark-beetle-killed pine out of crowded, never-thinned stands. That second kind is the removal we are called for most, because a faded pine is both a fire hazard and a tree that will come down on its own schedule if left.',
      'Because Grass Valley and the surrounding county sit largely in Very High Fire Hazard Severity Zones, removal is usually part of a bigger defensible-space picture. We plan the work so the property meets the 100-foot standard Nevada County enforces, and coordinate with the chipping and clearing programs the Fire Safe Council of Nevada County runs rather than have you pay us to haul what they will chip for free.',
      'On permits, unincorporated Nevada County is generally permissive: most private-property removal needs no permit unless the parcel is in a specific overlay zone. The notable exception is property inside the Nevada City Sphere of Influence, which does require one. Inside Grass Valley city limits, street and landmark trees have their own rules. We flag anything that looks like an overlay issue before starting.',
    ],
    faqs: [
      {
        question: 'Why are so many pines being removed around Grass Valley?',
        answer:
          'Drought stress followed by bark beetles, concentrated in crowded stands. A lot of Grass Valley property carries never-thinned ponderosa growing too close together; they compete for limited water, and a weakened pine can’t push enough pitch to force out attacking beetles. Once the crown fades from green to yellow-red the tree is dead and becomes a falling hazard, so it comes out. Thinning the stand beforehand is what saves the trees worth keeping.',
      },
      {
        question: 'Do I need a permit to remove a tree in Grass Valley?',
        answer:
          'In unincorporated Nevada County, usually not — most private-property removal needs no permit unless the parcel is in a specific overlay zone, the exception being property inside the Nevada City Sphere of Influence. Inside Grass Valley city limits, check with the city before removing street or landmark trees. Defensible-space obligations apply either way.',
      },
      {
        question: 'Can you handle a large tree hanging over my roof in an older Grass Valley neighborhood?',
        answer:
          'Yes — that is the common case here. Empire Mine-era neighborhoods are full of mature conifers and hardwoods that now overhang roofs and lines on tight in-town lots. We remove them in rigged sections, lowering each piece over the structure rather than felling, and clean up completely afterward.',
      },
    ],
  },
  {
    citySlug: 'nevada-city',
    serviceId: 'stump',
    h1: 'Stump Grinding in Nevada City, CA',
    metaDescription:
      'Stump grinding in Nevada City, CA — track machines that fit tight historic-district lots and steep Deer Creek slopes. CSLB #1085329.',
    intro:
      'Stump grinding in Nevada City is defined by the same thing that makes every other kind of tree work here hard: access. The historic district’s narrow streets, tight lot lines, steep driveways, and slopes down toward Deer Creek mean the challenge usually is not the stump itself but getting a grinder to it.',
    body: [
      'Nevada City’s big ponderosa, Douglas-fir, and incense cedar leave big stumps, often in back corners of Victorian-era lots reached only through a side gate or down a grade. We run compact, track-mounted grinders for exactly these sites — machines narrow enough to fit through a standard gate and stable enough to work on a slope — so the stump comes out without tearing up the garden or the driveway to reach it.',
      'Grinding is usually the finish of a removal rather than a standalone job here, and on these lots it is worth doing properly: we grind well below grade and through the major surface roots, then leave the chips as backfill or haul them, so the spot can be replanted or leveled. On the steeper Deer Creek-side parcels we are deliberate about how much root mass we take out, because on a slope those roots are also holding soil in place.',
      'Nevada City is the one part of our service area where removal permits are common — property inside the Nevada City Sphere of Influence needs a permit from the County Planning Director before a tree comes down. Grinding an existing stump is a different matter, but if the stump is from a tree that still needs to come out, we confirm the permit position with the county first.',
    ],
    faqs: [
      {
        question: 'Can you get a stump grinder into a tight Nevada City backyard?',
        answer:
          'Usually yes. We run compact, track-mounted grinders sized to fit through a standard side gate and to work safely on the slopes and tight lot lines common in the historic district. Access is the first thing we assess on a Nevada City stump job, because it is almost always the deciding factor — the stump itself is rarely the hard part.',
      },
      {
        question: 'How far down do you grind a stump?',
        answer:
          'Well below grade — typically six to twelve inches down — and through the major surface roots, so the area can be replanted, leveled, or turned back into lawn. We either leave the grindings as backfill for the hole or haul them off, whichever you prefer. On steep Deer Creek-side lots we’re measured about how much root mass we remove, since those roots also hold the slope.',
      },
      {
        question: 'Do I need a permit for stump grinding in Nevada City?',
        answer:
          'Grinding an existing stump is generally not the permitted action — it’s tree removal that triggers a permit, and Nevada City is stricter than most of the county: property inside the Nevada City Sphere of Influence needs County Planning Director approval before a tree comes down. If your stump is from a tree that still needs removing, we confirm that with the county before scheduling.',
      },
    ],
  },
  {
    citySlug: 'auburn',
    serviceId: 'emergency',
    h1: 'Emergency Tree Service in Auburn, CA',
    metaDescription:
      '24/7 emergency tree service in Auburn, CA. Positioned at the I-80/Highway 49 crossroads for fast storm response, including canyon-rim failures. CSLB #1085329.',
    intro:
      'Auburn sits at the crossroads of I-80 and Highway 49, which is why it anchors our emergency coverage — storm calls along both corridors route through it, and we position for fast response on either. When a tree comes down here at 2 a.m., we answer the phone.',
    body: [
      'Auburn’s tree emergencies come in a wide range because the town stacks three environments together: the Old Town core, established neighborhoods at around 1,200 feet, and the steep American River canyon rim where backyards drop away to the Western States Trail. A storm call can be a single limb on a roof in town or a full tree failure over the canyon edge — and the canyon-rim failures are the ones many companies won’t touch. We do, using rigging to bring the tree back uphill under control rather than letting it go into the ravine.',
      'The species mix adds to it. Auburn is the transition from foothill oak and gray pine into the lower edge of ponderosa country, so a property can carry live oak, blue oak, black oak, and big pines all at once — each of which fails differently under wind, saturated ground, or snow load. Knowing which is which on arrival, in the dark, is part of doing this safely.',
      'In an emergency, the first job is making the scene safe: assume any line the tree is touching is live and keep clear, watch for limbs still hung up in the canopy, and understand that a fallen tree can be under enormous spring tension that releases violently when the wrong piece is cut. That last point is why storm cutting is dangerous and why it is worth waiting for a crew with rigging rather than starting in with a chainsaw.',
    ],
    faqs: [
      {
        question: 'How fast can you respond to a tree emergency in Auburn?',
        answer:
          'Auburn is central to our coverage — it’s the Placer County seat at the I-80 and Highway 49 crossroads, and we position for fast response on both corridors. We run emergency service 24/7. Call (530) 802-1271 and you reach us, not an answering service.',
      },
      {
        question: 'Can you remove a tree that’s failed over the American River canyon?',
        answer:
          'Yes — canyon-rim work is something we take on that a lot of companies pass on. Lots along the Western States Trail rim and the ravines have trees leaning over the drop with no equipment access and erosion concerns, so we rig them and bring the pieces back uphill under control rather than dropping them into the canyon.',
      },
      {
        question: 'A tree fell on my house in Auburn during a storm — what should I do first?',
        answer:
          'Get everyone clear and treat any line the tree is touching as live — call the utility for lines, not us. Don’t start cutting: a downed tree can be under spring tension that releases dangerously. Photograph the damage from a few angles for insurance, then call us. We’ll secure the scene and remove the tree safely, and can tarp a roof opening to stop further water damage.',
      },
    ],
  },
  {
    citySlug: 'rocklin',
    serviceId: 'trimming',
    h1: 'Tree Trimming in Rocklin, CA',
    metaDescription:
      'Tree trimming in Rocklin, CA — structural pruning for native oaks and aging ornamentals. Pruning usually avoids the city oak permit. CSLB #1085329.',
    intro:
      'Rocklin’s neighborhoods were largely built around their native oaks rather than clearing them, so from Stanford Ranch to Whitney Ranch you get 200-year-old oaks over 20-year-old roofs. Trimming those oaks well — and there is a right and a wrong way — is most of what we do in this city.',
    body: [
      'There’s a real advantage to pruning over removal in Rocklin, and it is worth knowing: the City of Rocklin requires a permit to remove a native oak six inches or larger in trunk diameter, but routine pruning to maintain a healthy oak generally does not trigger that permit. So when the goal is clearance over a roof, weight reduction on a heavy limb, or deadwood removal, structural pruning often solves the problem without the permit process a removal would require — and keeps the tree the neighborhood was designed around.',
      'The one thing we will not do is top a tree. Topping an oak back to stubs removes the foliage it lives on, opens wounds that decay, and forces weak, dense regrowth that is more failure-prone than the original limbs — the opposite of making it safer. In a city whose native oaks are its defining landscape feature, that matters. Proper structural pruning reduces weight at correct cuts and preserves the tree’s form.',
      'It is not only the oaks. The ornamental pears, ashes, and maples planted when these subdivisions went in are now reaching the age of included bark, storm splits, and roots heaving sidewalks. Corrective pruning on those — before a wet winter or a windstorm finds the weak union — is far cheaper than the removal and cleanup that a failure turns into.',
    ],
    faqs: [
      {
        question: 'Do I need a permit to trim an oak in Rocklin?',
        answer:
          'Generally no. The City of Rocklin’s permit requirement applies to removing a native oak six inches or larger in diameter — routine pruning to maintain a healthy oak typically doesn’t trigger it. That’s part of why trimming is often the better path for a protected oak: you get the clearance or weight reduction you need without the removal permit process. If a job edges toward major limb removal, we’ll tell you.',
      },
      {
        question: 'Do you top trees to reduce their height?',
        answer:
          'No. Topping — cutting a tree back to stubs — removes the foliage it lives on, opens large wounds to decay, and forces weak regrowth that fails more easily than the original limbs. It makes a tree more hazardous, not less, and it’s especially damaging to the native oaks Rocklin is built around. When a tree carries too much weight in the wrong place, the answer is structural reduction at proper cuts.',
      },
      {
        question: 'My ornamental pear is getting big and splitting — can trimming help?',
        answer:
          'Often, yes. The ornamental pears, ashes, and maples planted across Rocklin’s subdivisions are reaching the age where included bark and storm splits appear. If the structure is still sound, corrective pruning to reduce weight and clear failure-prone limbs can extend the tree’s safe life considerably. If the trunk has already failed at an included-bark union, we’ll tell you honestly that removal is the sounder call.',
      },
    ],
  },
]

export function getCityServiceCombo(citySlug: string, serviceId: string): CityServiceCombo | undefined {
  return CITY_SERVICE_COMBOS.find((c) => c.citySlug === citySlug && c.serviceId === serviceId)
}

export function getCombosForCity(citySlug: string): CityServiceCombo[] {
  return CITY_SERVICE_COMBOS.filter((c) => c.citySlug === citySlug)
}
