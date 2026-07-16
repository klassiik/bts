import manifest from './generated/media-manifest.json'

type ManifestEntry = { mp4: string; webp: string; mp4Mobile?: string }
const typedManifest = manifest as Record<string, ManifestEntry>

function getEntry(key: string): ManifestEntry {
  const entry = typedManifest[key]
  if (!entry) {
    throw new Error(
      `getVideoUrl: no media manifest entry for "${key}". Run the media sync ` +
        `(npm run predev / prebuild -> scripts/sync-media.mjs) or check the key.`
    )
  }
  return entry
}

// Video URLs are content-hashed by scripts/sync-media.mjs (predev/prebuild),
// so a re-encode always gets a brand-new URL — a CDN edge cache that treated
// the old URL as `immutable` can never serve stale bytes for changed content.
// Throws at build time on a bad key rather than silently serving a 404.
export function getVideoUrl(key: string): string {
  return getEntry(key).mp4
}

// Only the decorative backdrop clips get a second, much smaller encode (see
// BACKDROP_CLIPS in scripts/sync-media.mjs). Pass it to <Video mobileSrc> so
// phones fetch that instead of the full-size file.
export function getVideoMobileUrl(key: string): string | undefined {
  return getEntry(key).mp4Mobile
}
