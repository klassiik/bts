import manifest from './generated/media-manifest.json'

type ManifestEntry = { mp4: string; webp: string }
const typedManifest = manifest as Record<string, ManifestEntry>

// Video URLs are content-hashed by scripts/sync-media.mjs (predev/prebuild),
// so a re-encode always gets a brand-new URL — a CDN edge cache that treated
// the old URL as `immutable` can never serve stale bytes for changed content.
// Throws at build time on a bad key rather than silently serving a 404.
export function getVideoUrl(key: string): string {
  const entry = typedManifest[key]
  if (!entry) {
    throw new Error(
      `getVideoUrl: no media manifest entry for "${key}". Run the media sync ` +
        `(npm run predev / prebuild -> scripts/sync-media.mjs) or check the key.`
    )
  }
  return entry.mp4
}
