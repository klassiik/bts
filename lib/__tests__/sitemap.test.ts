import sitemap from '../../app/sitemap'
import { CITY_DETAILS } from '../cityContent'
import { CITY_SERVICE_COMBOS } from '../cityServices'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function isRealPastDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`)
  return ISO_DATE.test(date) && !Number.isNaN(parsed.getTime()) && parsed.getTime() <= Date.now()
}

describe('sitemap lastmod', () => {
  // A lastmod that is just the build time tells Google nothing, and once it
  // notices the dates move without the content moving it ignores them sitewide.
  it('never stamps the build time', () => {
    const before = Date.now()
    const entries = sitemap()
    for (const entry of entries) {
      const ts = new Date(entry.lastModified as Date).getTime()
      expect({ url: entry.url, valid: !Number.isNaN(ts) }).toEqual({ url: entry.url, valid: true })
      // Every date is a whole UTC day, set from content data, not "now".
      expect({ url: entry.url, midnight: ts % 86_400_000 === 0 }).toEqual({ url: entry.url, midnight: true })
      expect(ts).toBeLessThanOrEqual(before)
    }
  })

  it('every city record has a real updated date', () => {
    for (const [city, detail] of Object.entries(CITY_DETAILS)) {
      expect({ city, ok: isRealPastDate(detail.updated) }).toEqual({ city, ok: true })
    }
  })

  it('every combo record has a real updated date', () => {
    for (const combo of CITY_SERVICE_COMBOS) {
      const key = `${combo.citySlug}/${combo.serviceId}`
      expect({ key, ok: isRealPastDate(combo.updated) }).toEqual({ key, ok: true })
    }
  })
})
