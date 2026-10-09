import { cityMetaDescription } from '../seo'
import { getCityDetail } from '../cityContent'
import { SERVICE_AREAS } from '../config'

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
