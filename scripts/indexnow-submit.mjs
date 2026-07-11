// Submits the site's canonical URLs to IndexNow (Bing, Yandex, DuckDuckGo,
// Naver — not Google). IndexNow needs no account or secret: the key file
// hosted at KEY_LOCATION is the ownership proof.
//
// URLs are read from the live sitemap.xml so this always matches what's
// actually deployed, with no coupling to the Next.js build. Run via the
// GitHub Action on push to main, or manually: `node scripts/indexnow-submit.mjs`.

const HOST = 'barkertreeservices.com'
const KEY = 'b24d4e716b6d93179d1c0d894d7a02af'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function getSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'indexnow-submit' } })
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim())
  if (urls.length === 0) throw new Error('No <loc> URLs found in sitemap')
  return urls
}

async function main() {
  const urlList = await getSitemapUrls()
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`)

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
  })

  // IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
  // 422 = URLs don't match host/key; 403 = key not found at keyLocation.
  const body = await res.text()
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted submission (HTTP ${res.status}).`)
  } else {
    console.error(`IndexNow rejected submission (HTTP ${res.status}): ${body || '(no body)'}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err.message)
  process.exit(1)
})
