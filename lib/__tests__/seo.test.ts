import { cityMetaDescription, pageTitle, MAX_BRANDED_TITLE_LENGTH } from '../seo'
import { GUIDES } from '../guides'
import { getCityDetail } from '../cityContent'
import { SERVICE_AREAS, SERVICES } from '../config'

const descriptions = SERVICE_AREAS.map((area) => ({
  city: area.city,
  highlight: getCityDetail(area.city)!.highlights[0],
  text: cityMetaDescription(area.city, getCityDetail(area.city)!.highlights[0]),
}))

describe('city meta descriptions', () => {
  // Google truncates around 155-160 characters; past that the end of the
  // description (the city name in the service line) is cut.
  it('fit in 155 characters', () => {
    for (const { city, text } of descriptions) {
      expect({ city, length: text.length, ok: text.length <= 155 }).toMatchObject({ city, ok: true })
    }
  })

  it('lead with the city-specific hook', () => {
    for (const { city, highlight, text } of descriptions) {
      expect({ city, leads: text.startsWith(highlight) }).toEqual({ city, leads: true })
    }
  })

  // The visible start of the snippet is what differentiates one city result
  // from another; a shared opening is the templated pattern this replaced.
  it('share no opening 40 characters between cities', () => {
    const openings = new Map<string, string>()
    for (const { city, text } of descriptions) {
      const opening = text.slice(0, 40)
      expect(openings.get(opening) ?? city).toBe(city)
      openings.set(opening, city)
    }
  })

  it('name the city', () => {
    for (const { city, text } of descriptions) {
      expect(text).toContain(`${city}, CA`)
    }
  })
})

describe('page titles', () => {
  it('keep the brand suffix when it fits', () => {
    expect(pageTitle('About Us')).toBe('About Us | Barker Tree Services')
    expect(pageTitle('Professional Tree Care & Emergency Services')).toBe(
      'Professional Tree Care & Emergency Services | Barker Tree Services'
    )
  })

  // Same title strings app/services/[service] and app/guides/[guide] pass in
  it('stay within the truncation limit on service and guide pages', () => {
    const titles = [
      ...SERVICES.map((s) => `${s.title} in Placer & Nevada Counties, CA`),
      ...GUIDES.map((g) => g.title),
    ]
    for (const title of titles) {
      const full = pageTitle(title)
      expect({ full, ok: full.length <= MAX_BRANDED_TITLE_LENGTH }).toEqual({ full, ok: true })
    }
  })
})
