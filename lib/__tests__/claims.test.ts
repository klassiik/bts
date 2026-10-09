import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative } from 'path'

// Owner-verified facts (PR #45): CSLB C-49 license and "fully insured" only.
// No coverage types, no ISA/TRAQ/OSHA certification, no hour-specific
// response promises. PR #45 fixed most copy by hand and still missed two
// "workers' compensation" lines, so scan every source file instead.
const ROOT = join(__dirname, '..', '..')
const SCANNED = ['app', 'components', 'lib', join('public', 'llms.txt')]

const BANNED: { claim: string; pattern: RegExp }[] = [
  // .{0,8} tolerates JSX entities such as workers&apos; compensation
  { claim: "workers' compensation", pattern: /workers.{0,8}comp/i },
  { claim: 'named liability coverage', pattern: /liability\s+(insurance|coverage)/i },
  { claim: 'TRAQ', pattern: /\bTRAQ\b/ },
  { claim: 'OSHA certification', pattern: /\bOSHA\b/ },
  { claim: 'certified / licensed arborist', pattern: /(certified|licensed)\s+arborists?/i },
  { claim: 'ISA certification', pattern: /\bISA[\s-]+certifi/i },
  { claim: 'hour-specific response time', pattern: /\d\s*[-–]\s*\d\s*hours?/i },
]

function sourceFiles(path: string): string[] {
  const full = join(ROOT, path)
  if (statSync(full).isFile()) return [full]
  return readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '__tests__' || entry.name === 'generated') return []
    const child = join(path, entry.name)
    if (entry.isDirectory()) return sourceFiles(child)
    return /\.(tsx?|txt)$/.test(entry.name) ? [join(ROOT, child)] : []
  })
}

describe('verified business claims', () => {
  const files = SCANNED.flatMap(sourceFiles)

  it('scans the site source', () => {
    expect(files.length).toBeGreaterThan(20)
  })

  it('makes no claim outside the owner-verified facts', () => {
    const hits: string[] = []
    for (const file of files) {
      const lines = readFileSync(file, 'utf8').split('\n')
      lines.forEach((line, i) => {
        for (const { claim, pattern } of BANNED) {
          if (pattern.test(line)) hits.push(`${relative(ROOT, file)}:${i + 1} (${claim})`)
        }
      })
    }
    expect(hits).toEqual([])
  })
})
