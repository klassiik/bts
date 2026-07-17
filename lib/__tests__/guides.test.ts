import { GUIDES, getGuide } from '../guides'
import { generateArticleSchema, generateFAQSchema } from '../schema'

describe('guides', () => {
  it('has unique, url-safe slugs', () => {
    const slugs = GUIDES.map((g) => g.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('every related slug resolves to a real guide', () => {
    for (const guide of GUIDES) {
      for (const slug of guide.related ?? []) {
        expect(getGuide(slug)).toBeDefined()
      }
    }
  })

  it('has content in every section', () => {
    for (const guide of GUIDES) {
      expect(guide.sections.length).toBeGreaterThan(0)
      for (const section of guide.sections) {
        expect(section.heading.length).toBeGreaterThan(0)
        expect(section.body.length).toBeGreaterThan(0)
        expect(section.body.every((p) => p.length > 0)).toBe(true)
      }
    }
  })

  it('uses ISO updated dates', () => {
    for (const guide of GUIDES) {
      expect(guide.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(guide.updated))).toBe(false)
    }
  })

  // Same no-dollar-figures policy as service and city content.
  it('states no dollar figures', () => {
    for (const guide of GUIDES) {
      const text = [
        guide.intro,
        ...guide.sections.flatMap((s) => [...s.body, ...(s.bullets ?? [])]),
        ...(guide.faqs ?? []).flatMap((f) => [f.question, f.answer]),
      ].join(' ')
      expect({ slug: guide.slug, match: text.match(/\$\s?\d/) }).toEqual({ slug: guide.slug, match: null })
    }
  })

  // Accuracy guard: Zone 0 is still proposed. If the guide ever describes it
  // as currently required, this should fail until the regulation is actually
  // adopted and the wording is deliberately updated.
  it('does not claim Zone 0 is currently required', () => {
    const guide = getGuide('defensible-space')!
    const text = [
      guide.intro,
      ...guide.sections.flatMap((s) => [...s.body, ...(s.bullets ?? [])]),
      ...(guide.faqs ?? []).flatMap((f) => [f.question, f.answer]),
    ].join(' ').toLowerCase()
    expect(text).toContain('proposed')
    expect(/zone 0[^.]{0,40}\b(is|are|now)\b[^.]{0,20}\brequired\b/.test(text)).toBe(false)
  })

  it('produces valid Article and FAQ schema', () => {
    for (const guide of GUIDES) {
      const article = generateArticleSchema({
        headline: guide.title,
        description: guide.description,
        path: `/guides/${guide.slug}`,
        updated: guide.updated,
      }) as Record<string, unknown>
      expect(article['@type']).toBe('Article')
      expect(article.datePublished).toBe(guide.updated)

      if (guide.faqs?.length) {
        const faq = generateFAQSchema(guide.faqs) as { mainEntity: unknown[] }
        expect(faq.mainEntity).toHaveLength(guide.faqs.length)
      }
    }
  })
})
