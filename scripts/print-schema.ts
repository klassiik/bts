import { generateLocalBusinessSchema, generateFAQSchema } from '../lib/schema'

// Prints JSON-LD for quick validation (Rich Results Test / Linter)
function main() {
  const business = generateLocalBusinessSchema()
  const faq = generateFAQSchema()

  const output = {
    business,
    faq
  }

  // Pretty-print for readability
  console.log(JSON.stringify(output, null, 2))
}

main()
