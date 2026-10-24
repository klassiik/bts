import manifest from './generated/media-manifest.json'

type ManifestEntry = { webp: string }
const typedManifest = manifest as Record<string, ManifestEntry>

// Poster stills are extracted from the source clips in media/ and
// content-hashed by scripts/sync-media.mjs (predev/prebuild), so a changed
// source always gets a brand-new URL — a CDN edge cache that treated the old
// URL as `immutable` can never serve stale bytes. Throws at build time on a
// bad key rather than silently serving a 404.
export function getVideoPosterUrl(key: string): string {
  const entry = typedManifest[key]
  if (!entry) {
    throw new Error(
      `getVideoPosterUrl: no media manifest entry for "${key}". Run the media sync ` +
        `(npm run predev / prebuild -> scripts/sync-media.mjs) or check the key.`
    )
  }
  return entry.webp
}
