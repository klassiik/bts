import Ajv from 'ajv'
import { generateLocalBusinessSchema, generateFAQSchema } from '../schema'

const ajv = new Ajv({ strict: false })

// Schema.org LocalBusiness JSON-LD schema (simplified validator)
const localBusinessSchema = {
  type: 'object',
  required: ['@context', '@type', 'name', 'url', 'telephone', 'address'],
  properties: {
    '@context': { type: 'string', const: 'https://schema.org' },
    '@type': {
      oneOf: [
        { type: 'string' },
        { type: 'array', items: { type: 'string' } }
      ]
    },
    '@id': { type: 'string' },
    name: { type: 'string' },
    alternateName: { type: 'string' },
    description: { type: 'string' },
    url: { type: 'string', format: 'uri' },
    telephone: { type: 'string' },
    email: { type: 'string', format: 'email' },
    image: { type: 'string' },
    logo: { type: 'string' },
    address: {
      type: 'object',
      required: ['@type', 'streetAddress', 'addressLocality', 'addressRegion', 'postalCode'],
      properties: {
        '@type': { type: 'string', const: 'PostalAddress' },
        streetAddress: { type: 'string' },
        addressLocality: { type: 'string' },
        addressRegion: { type: 'string' },
        postalCode: { type: 'string' },
        addressCountry: { type: 'string' }
      }
    },
    areaServed: {
      oneOf: [
        { type: 'array' },
        { type: 'object' }
      ]
    },
    aggregateRating: {
      type: 'object',
      properties: {
        '@type': { type: 'string', const: 'AggregateRating' },
        ratingValue: { type: 'number' },
        reviewCount: { type: 'number' }
      }
    },
    numberOfEmployees: {
      type: 'object',
      properties: {
        '@type': { type: 'string' },
        minValue: { type: 'number' },
        maxValue: { type: 'number' },
        value: { oneOf: [{ type: 'number' }, { type: 'string' }] }
      }
    },
    geo: {
      type: 'object',
      properties: {
        '@type': { type: 'string', const: 'GeoCoordinates' },
        latitude: { type: 'number' },
        longitude: { type: 'number' }
      }
    }
  }
}

// Schema.org FAQPage JSON-LD schema
const faqPageSchema = {
  type: 'object',
  required: ['@context', '@type', 'mainEntity'],
  properties: {
    '@context': { type: 'string', const: 'https://schema.org' },
    '@type': { type: 'string', const: 'FAQPage' },
    mainEntity: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['@type', 'name', 'acceptedAnswer'],
        properties: {
          '@type': { type: 'string', const: 'Question' },
          name: { type: 'string' },
          acceptedAnswer: {
            type: 'object',
            required: ['@type', 'text'],
            properties: {
              '@type': { type: 'string', const: 'Answer' },
              text: { type: 'string' }
            }
          }
        }
      }
    }
  }
}

describe('Schema.org JSON-LD Validation', () => {
  it('should generate valid LocalBusiness schema', () => {
    const schema = generateLocalBusinessSchema()
    const validateLocalBusiness = ajv.compile(localBusinessSchema)
    const valid = validateLocalBusiness(schema)

    if (!valid) {
      console.error('LocalBusiness validation errors:', validateLocalBusiness.errors)
    }
    expect(valid).toBe(true)
  })

  it('should have correct context and type for LocalBusiness', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(Array.isArray(schema['@type'])).toBe(true)
    expect(schema['@type']).toContain('LocalBusiness')
  })

  it('should have required contact fields', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.name).toBeDefined()
    expect(schema.telephone).toBeDefined()
    expect(schema.email).toBeDefined()
    expect(schema.url).toBeDefined()
  })

  it('should have proper address structure', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.address).toBeDefined()
    expect(schema.address['@type']).toBe('PostalAddress')
    expect(schema.address.streetAddress).toBeDefined()
    expect(schema.address.addressLocality).toBeDefined()
    expect(schema.address.postalCode).toBeDefined()
  })

  it('should have numeric aggregateRating values', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.aggregateRating).toBeDefined()
    expect(typeof schema.aggregateRating.ratingValue).toBe('number')
    expect(typeof schema.aggregateRating.reviewCount).toBe('number')
  })

  it('should have numeric geo coordinates', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.geo).toBeDefined()
    expect(typeof schema.geo.latitude).toBe('number')
    expect(typeof schema.geo.longitude).toBe('number')
  })

  it('should generate valid FAQ schema', () => {
    const schema = generateFAQSchema()
    const validateFAQ = ajv.compile(faqPageSchema)
    const valid = validateFAQ(schema)

    if (!valid) {
      console.error('FAQ validation errors:', validateFAQ.errors)
    }
    expect(valid).toBe(true)
  })

  it('should have at least 5 FAQ items', () => {
    const schema = generateFAQSchema()
    expect(Array.isArray(schema.mainEntity)).toBe(true)
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(5)
  })

  it('should have properly structured FAQ items', () => {
    const schema = generateFAQSchema()
    type FAQEntity = {
      '@type': 'Question'
      name: string
      acceptedAnswer: { '@type': 'Answer'; text: string }
    }
    (schema.mainEntity as FAQEntity[]).forEach((item) => {
      expect(item['@type']).toBe('Question')
      expect(item.name).toBeDefined()
      expect(typeof item.name).toBe('string')
      expect(item.acceptedAnswer).toBeDefined()
      expect(item.acceptedAnswer['@type']).toBe('Answer')
      expect(item.acceptedAnswer.text).toBeDefined()
      expect(typeof item.acceptedAnswer.text).toBe('string')
    })
  })

  it('should include all required service areas', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema.areaServed).toBeDefined()
    expect(Array.isArray(schema.areaServed)).toBe(true)
    expect(schema.areaServed.length).toBeGreaterThan(0)

    // Check that areas have proper structure
    type Area = { '@type': 'City'; name: string; addressCountry?: string; addressRegion?: string }
    (schema.areaServed as Area[]).forEach((area) => {
      expect(area['@type']).toBe('City')
      expect(area.name).toBeDefined()
      expect(area.addressCountry).toBe('US')
    })
  })
})
