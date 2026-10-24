import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath);

const SRC_DIR = path.resolve('media');
const DEST_DIR = path.resolve('public', 'media');
const MANIFEST_PATH = path.resolve('lib', 'generated', 'media-manifest.json');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

// The site no longer plays any video: background clips were replaced by the
// SVG HeroBackdrop, and in-page job clips by a still frame from each clip.
// So the only output per source .mp4 is a WebP poster (1s in, 720px long
// edge), served via getVideoPosterUrl. No video is encoded or published.
const POSTER_PROFILE = { seekSeconds: 1, longEdge: 720, quality: 75 };

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

// The hash covers the source bytes AND the poster profile. The profile has to
// be in there: /media/* is served `immutable` for a year, so if tuning it
// produced different bytes at the same URL, every client and CDN edge holding
// the old copy would keep serving it indefinitely.
async function hashFile(p, profile) {
  const buf = await fs.readFile(p);
  return createHash('sha256')
    .update(buf)
    .update(JSON.stringify(profile))
    .digest('hex')
    .slice(0, 8);
}

function extractPoster(input, output, { seekSeconds, longEdge, quality }) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .seekInput(seekSeconds)
      .outputOptions([
        '-frames:v 1',
        `-vf scale='if(gt(iw,ih),min(${longEdge},iw),-2)':'if(gt(iw,ih),-2,min(${longEdge},ih))'`,
        '-c:v libwebp',
        `-quality ${quality}`,
      ])
      .on('error', reject)
      .on('end', resolve)
      .save(output);
  });
}

// Content-hashed output filenames (like Next.js does for /_next/static/*):
// a changed source gets a brand-new URL, so a CDN/browser that cached the old
// URL as `immutable` can never serve stale bytes for changed content.
async function processPoster(srcPath, baseName, manifest) {
  const hash = await hashFile(srcPath, POSTER_PROFILE);
  const webpName = `${baseName}.${hash}.webp`;
  const posterOut = path.join(DEST_DIR, webpName);

  manifest[baseName] = { webp: `/media/${webpName}` };

  // Remove prior-hash outputs for this source, including the .mp4/.m.mp4/.h.mp4
  // encodes older versions of this script emitted, so they don't linger in
  // public/media (and get deployed) on machines that ran the old pipeline.
  const dirEntries = await fs.readdir(DEST_DIR).catch(() => []);
  await Promise.all(
    dirEntries
      .filter((f) => f.startsWith(`${baseName}.`) && f !== webpName)
      .map((f) => fs.rm(path.join(DEST_DIR, f)).catch(() => {}))
  );

  const built = await fs.stat(posterOut).then((s) => s.size > 0).catch(() => false);
  if (built) {
    console.log(`Up to date: ${webpName}`);
    return;
  }

  // Write to a temp name and rename, so an interrupted run never leaves a
  // truncated poster that the next run would mistake for a finished one.
  const tmp = `${posterOut}.tmp.webp`;
  console.log(`Extracting poster: ${webpName}`);
  await extractPoster(srcPath, tmp, POSTER_PROFILE);
  await fs.rename(tmp, posterOut);
}

async function main() {
  const srcStat = await fs.stat(SRC_DIR).catch(() => null);
  if (!srcStat) {
    console.log('No media/ directory found, skipping sync.');
    return;
  }
  await ensureDir(DEST_DIR);
  await ensureDir(path.dirname(MANIFEST_PATH));

  const manifest = {};
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    const srcPath = path.join(SRC_DIR, entry.name);

    if (ext === '.mp4') {
      const baseName = entry.name.slice(0, -ext.length);
      await processPoster(srcPath, baseName, manifest);
    } else if (IMAGE_EXTS.includes(ext)) {
      const destPath = path.join(DEST_DIR, entry.name);
      const [src, out] = await Promise.all([
        fs.stat(srcPath),
        fs.stat(destPath).catch(() => null),
      ]);
      if (out && out.size > 0 && out.mtimeMs >= src.mtimeMs) continue;
      await fs.copyFile(srcPath, destPath);
      console.log(`Copied ${entry.name}`);
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote media manifest: ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  console.log('Media sync complete. Optimized files available under /media/* via public/.');
}

main().catch((err) => {
  console.error('Media sync failed:', err);
  process.exit(1);
});
