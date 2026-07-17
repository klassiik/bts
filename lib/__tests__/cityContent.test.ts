import { CITY_DETAILS } from '../cityContent'
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
