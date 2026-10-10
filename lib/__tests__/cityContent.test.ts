import { CITY_DETAILS } from '../cityContent'
import { CITY_SERVICE_COMBOS } from '../cityServices'
import { SERVICE_AREAS } from '../config'
import { generateFAQSchema } from '../schema'
import { cityToSlug } from '../utils'

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

// County tree ordinances stop at the city limit. Placer County's Woodland
// Conservation ordinance (Article 19.50) and Nevada County's Sphere of
// Influence permit both govern unincorporated land only, so copy for an
// incorporated city that cites them, without saying the city's own rules
// apply inside its limits, is wrong for every in-town address. Auburn's
// permit FAQ shipped exactly that.
describe('permit jurisdiction', () => {
  // Every SERVICE_AREAS city must be classified here, so adding a city forces
  // the jurisdiction question before its permit copy is written.
  const INCORPORATED: Record<string, string> = {
    'Colfax': 'City of Colfax',
    'Grass Valley': 'City of Grass Valley',
    'Nevada City': 'City of Nevada City',
    'Loomis': 'Town of Loomis',
    'Rocklin': 'City of Rocklin',
    'Lincoln': 'City of Lincoln',
    'Auburn': 'City of Auburn',
  }
  const UNINCORPORATED = ['Rough and Ready', 'Smartville', 'Penryn']

  // Phrases that mark a county permit rule. Bare "Nevada County" is not one:
  // it appears in defensible-space copy that makes no permit claim.
  const COUNTY_RULE: Record<string, RegExp> = {
    Placer: /19\.50|Woodland Conservation|Minor Tree Permit/,
    Nevada: /Sphere of Influence|County Planning Director/,
  }

  function cityStrings(city: string): { where: string; text: string }[] {
    const detail = CITY_DETAILS[city]
    return [
      { where: 'regulations', text: detail.regulations },
      ...detail.faqs.flatMap((f, i) => [
        { where: `faqs[${i}].question`, text: f.question },
        { where: `faqs[${i}].answer`, text: f.answer },
      ]),
      ...CITY_SERVICE_COMBOS.filter((c) => c.citySlug === cityToSlug(city)).flatMap((c) => [
        { where: `${c.serviceId}.intro`, text: c.intro },
        ...c.body.map((text, j) => ({ where: `${c.serviceId}.body[${j}]`, text })),
        ...c.faqs.flatMap((f, j) => [
          { where: `${c.serviceId}.faqs[${j}].question`, text: f.question },
          { where: `${c.serviceId}.faqs[${j}].answer`, text: f.answer },
        ]),
      ]),
    ]
  }

  it('classifies every service area as incorporated or not', () => {
    const classified = [...Object.keys(INCORPORATED), ...UNINCORPORATED].sort()
    expect(classified).toEqual(SERVICE_AREAS.map((a) => a.city).sort())
  })

  it('names the city or town government in each incorporated city\'s permit FAQ', () => {
    for (const [city, government] of Object.entries(INCORPORATED)) {
      const permitFaqs = CITY_DETAILS[city].faqs.filter((f) => /permit/i.test(f.question))
      expect({ city, count: permitFaqs.length }).toEqual({ city, count: 1 })
      expect({ city, named: permitFaqs[0].answer.includes(government) }).toEqual({ city, named: true })
    }
  })

  it('never cites a county rule for an incorporated city without naming the city government', () => {
    const offenders: string[] = []
    for (const [city, government] of Object.entries(INCORPORATED)) {
      const countyRule = COUNTY_RULE[CITY_DETAILS[city].county]
      for (const { where, text } of cityStrings(city)) {
        if (countyRule?.test(text) && !text.includes(government)) offenders.push(`${city} ${where}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('actually checks county-rule citations (guards against a vacuous pass)', () => {
    const cited = Object.keys(INCORPORATED).filter((city) => {
      const countyRule = COUNTY_RULE[CITY_DETAILS[city].county]
      return cityStrings(city).some(({ text }) => countyRule?.test(text))
    })
    expect(cited).toEqual(expect.arrayContaining(['Auburn', 'Colfax']))
  })
})
