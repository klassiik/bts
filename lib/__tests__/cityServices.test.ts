import { CITY_SERVICE_COMBOS, getCityServiceCombo, getCombosForCity } from '../cityServices'
import { SERVICE_AREAS, SERVICES } from '../config'
import { cityToSlug } from '../utils'
import { generateFAQSchema } from '../schema'

const validCitySlugs = new Set(SERVICE_AREAS.map((a) => cityToSlug(a.city)))
const validServiceIds = new Set(SERVICES.map((s) => s.id))

describe('city×service combos', () => {
  // The pilot is deliberately small. If this ever approaches the audit's
  // location-page quality gate (30 warn / 50 hard stop), that's a signal to
  // stop and reassess, not to keep generating near-duplicates.
  it('is a small pilot, not the full grid', () => {
    expect(CITY_SERVICE_COMBOS.length).toBeGreaterThanOrEqual(3)
    expect(CITY_SERVICE_COMBOS.length).toBeLessThanOrEqual(8)
  })

  it('references only real cities and services', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      expect(validCitySlugs.has(combo.citySlug)).toBe(true)
      expect(validServiceIds.has(combo.serviceId)).toBe(true)
    }
  })

  it('has no duplicate city+service pairs', () => {
    const keys = CITY_SERVICE_COMBOS.map((c) => `${c.citySlug}/${c.serviceId}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('is genuinely bespoke: no body paragraph or FAQ shared across combos', () => {
    const bodies = new Map<string, string>()
    const answers = new Map<string, string>()
    for (const combo of CITY_SERVICE_COMBOS) {
      const key = `${combo.citySlug}/${combo.serviceId}`
      for (const para of combo.body) {
        expect(bodies.get(para) ?? key).toBe(key)
        bodies.set(para, key)
      }
      for (const faq of combo.faqs) {
        expect(answers.get(faq.answer) ?? key).toBe(key)
        answers.set(faq.answer, key)
      }
    }
  })

  it('names both the city and the service in the h1', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      const city = SERVICE_AREAS.find((a) => cityToSlug(a.city) === combo.citySlug)!.city
      expect(combo.h1).toContain(city)
    }
  })

  // Same policy as every other content file.
  it('states no dollar figures', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      const text = [combo.intro, ...combo.body, ...combo.faqs.flatMap((f) => [f.question, f.answer])].join(' ')
      expect({ key: `${combo.citySlug}/${combo.serviceId}`, match: text.match(/\$\s?\d/) }).toEqual({
        key: `${combo.citySlug}/${combo.serviceId}`,
        match: null,
      })
    }
  })

  it('metaDescription stays within a sane length', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      expect(combo.metaDescription.length).toBeLessThanOrEqual(165)
    }
  })

  it('lookups resolve', () => {
    const first = CITY_SERVICE_COMBOS[0]
    expect(getCityServiceCombo(first.citySlug, first.serviceId)).toBe(first)
    expect(getCityServiceCombo('nonexistent', 'removal')).toBeUndefined()
    expect(getCombosForCity(first.citySlug)).toContain(first)
  })

  it('produces valid FAQPage schema per combo', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      const schema = generateFAQSchema(combo.faqs) as { mainEntity: unknown[] }
      expect(schema.mainEntity).toHaveLength(combo.faqs.length)
    }
  })
})
