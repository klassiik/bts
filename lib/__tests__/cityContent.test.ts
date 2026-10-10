import { CITY_DETAILS, type CityDetail } from '../cityContent'
import { CITY_SERVICE_COMBOS } from '../cityServices'
import { pageTitle } from '../seo'
import { SERVICE_AREAS } from '../config'
import { generateFAQSchema } from '../schema'

const cities = Object.entries(CITY_DETAILS)

describe('city FAQs', () => {
  it('covers every city in SERVICE_AREAS', () => {
    for (const area of SERVICE_AREAS) {
      expect(CITY_DETAILS[area.city]).toBeDefined()
      expect(CITY_DETAILS[area.city].faqs.length).toBeGreaterThanOrEqual(3)
    }
  })

  // The whole point of per-city FAQs is that they're answerable only for that
  // city. Reusing one across pages recreates the duplicate-content problem
  // these pages exist to avoid.
  it('shares no question or answer between two cities', () => {
    const seenQ = new Map<string, string>()
    const seenA = new Map<string, string>()
    for (const [city, detail] of cities) {
      for (const faq of detail.faqs) {
        expect(seenQ.get(faq.question) ?? city).toBe(city)
        expect(seenA.get(faq.answer) ?? city).toBe(city)
        seenQ.set(faq.question, city)
        seenA.set(faq.answer, city)
      }
    }
  })

  // lib/serviceContent.ts sets a deliberate no-dollar-figures policy so nothing
  // goes stale. A hardcoded range previously shipped inside FAQPage schema,
  // where an AI engine could quote it back as current pricing.
  it('never states a dollar figure', () => {
    for (const [city, detail] of cities) {
      for (const faq of detail.faqs) {
        const text = `${faq.question} ${faq.answer}`
        expect({ city, match: text.match(/\$\s?\d/) }).toEqual({ city, match: null })
      }
    }
  })

  it('names the city it belongs to in the question', () => {
    for (const [city, detail] of cities) {
      // At least one FAQ per city must be explicitly geo-qualified, otherwise
      // the set reads as generic content that happens to sit on a city page.
      const geoQualified = detail.faqs.some(f => f.question.includes(city))
      expect({ city, geoQualified }).toEqual({ city, geoQualified: true })
    }
  })

  it('produces valid FAQPage schema per city', () => {
    for (const [, detail] of cities) {
      const schema = generateFAQSchema(detail.faqs) as {
        '@type': string
        mainEntity: { '@type': string; name: string; acceptedAnswer: { text: string } }[]
      }
      expect(schema['@type']).toBe('FAQPage')
      expect(schema.mainEntity).toHaveLength(detail.faqs.length)
      for (const entity of schema.mainEntity) {
        expect(entity['@type']).toBe('Question')
        expect(entity.name.length).toBeGreaterThan(0)
        expect(entity.acceptedAnswer.text.length).toBeGreaterThan(0)
      }
    }
  })
})

describe('nearby city links', () => {
  const cityNames = new Set(SERVICE_AREAS.map((a) => a.city))

  it('every city links 2-3 real neighbors, never itself', () => {
    for (const [city, detail] of cities) {
      expect({ city, count: detail.nearby.length >= 2 && detail.nearby.length <= 3 }).toEqual({ city, count: true })
      for (const name of detail.nearby) {
        expect({ city, name, real: cityNames.has(name), self: name === city }).toEqual({ city, name, real: true, self: false })
      }
    }
  })

  // Otherwise a city can end up reachable only from the hub and footer,
  // which is the gap this section exists to close.
  it('every city is linked from at least one neighbor', () => {
    const linked = new Set(cities.flatMap(([, detail]) => detail.nearby))
    for (const area of SERVICE_AREAS) {
      expect({ city: area.city, linked: linked.has(area.city) }).toEqual({ city: area.city, linked: true })
    }
  })
})

describe('per-city overrides', () => {
  it('every title override fits the 60-char SERP budget once branded', () => {
    for (const [city, detail] of cities) {
      if (!detail.title) continue
      expect({ city, fits: pageTitle(detail.title).length <= 60 }).toEqual({ city, fits: true })
    }
  })

  it('every h1 override names its city', () => {
    for (const [city, detail] of cities) {
      if (!detail.h1) continue
      expect({ city, named: detail.h1.includes(city) }).toEqual({ city, named: true })
    }
  })

  it('every section is well formed, links internally, and states no dollar figure', () => {
    for (const [city, detail] of cities) {
      for (const section of detail.sections ?? []) {
        expect({ city, heading: section.heading.trim().length > 0 }).toEqual({ city, heading: true })
        expect(section.body.length).toBeGreaterThanOrEqual(1)
        for (const p of section.body) expect(p.trim().length).toBeGreaterThan(0)
        if (section.link) expect(section.link.href.startsWith('/')).toBe(true)
        const text = [section.heading, ...section.body, ...(section.steps ?? [])].join(' ')
        expect({ city, match: text.match(/\$\s?\d/) }).toEqual({ city, match: null })
      }
    }
  })
})

// Colfax is an incorporated city. Placer County's Woodland Conservation
// ordinance (Article 19.50) governs only the unincorporated area, so any copy
// that cites it must also say that City of Colfax limits follow the city's own
// rules. Citing the county ordinance alone is wrong for in-town addresses.
describe('Colfax permit jurisdiction', () => {
  const colfax: CityDetail = CITY_DETAILS['Colfax']
  const strings: { where: string; text: string }[] = [
    { where: 'regulations', text: colfax.regulations },
    ...colfax.faqs.flatMap((f, i) => [
      { where: `faqs[${i}].question`, text: f.question },
      { where: `faqs[${i}].answer`, text: f.answer },
    ]),
    ...(colfax.sections ?? []).flatMap((s, i) => [
      { where: `sections[${i}].heading`, text: s.heading },
      ...s.body.map((text, j) => ({ where: `sections[${i}].body[${j}]`, text })),
      ...(s.steps ?? []).map((text, j) => ({ where: `sections[${i}].steps[${j}]`, text })),
    ]),
    ...CITY_SERVICE_COMBOS.filter((c) => c.citySlug === 'colfax').flatMap((c) => [
      ...c.body.map((text, j) => ({ where: `${c.serviceId}.body[${j}]`, text })),
      ...c.faqs.flatMap((f, j) => [
        { where: `${c.serviceId}.faqs[${j}].question`, text: f.question },
        { where: `${c.serviceId}.faqs[${j}].answer`, text: f.answer },
      ]),
    ]),
  ]

  it('never cites the county ordinance without distinguishing City of Colfax', () => {
    const offenders = strings
      .filter(({ text }) => /19\.50|Woodland Conservation/.test(text) && !text.includes('City of Colfax'))
      .map(({ where }) => where)
    expect(offenders).toEqual([])
  })

  it('actually cites the ordinance somewhere (guards against a vacuous pass)', () => {
    expect(strings.some(({ text }) => /19\.50|Woodland Conservation/.test(text))).toBe(true)
  })
})

describe('Colfax hub page', () => {
  const colfax = CITY_DETAILS['Colfax']

  it('carries the overrides and sections that make it the hub for "tree service Colfax CA"', () => {
    expect(colfax.h1).toBe('Tree Service in Colfax, CA')
    expect(colfax.title).toBe('Colfax Tree Service & 24/7 Removal')
    expect(colfax.highlightsHeading).toBeTruthy()
    expect(colfax.sections).toHaveLength(4)
    expect(colfax.faqs).toHaveLength(3)
  })

  it('says plainly that it does not use cranes', () => {
    const text = (colfax.sections ?? []).flatMap((s) => [...s.body, ...(s.steps ?? [])]).join(' ')
    expect(text).toMatch(/don’t use cranes|don\'t use cranes/)
  })
})
