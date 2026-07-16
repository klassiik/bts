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

// Two encode profiles, because the clips have two very different jobs.
// Originals are 7-18MB Instagram/Facebook exports; all are stripped of
// audio and held to 24fps for smooth motion.
//
// `backdrop`: full-bleed `absolute inset-0` loops sitting at 30-40%
// opacity behind hero text, aria-hidden, that nobody looks at directly.
// These were the single largest transfer on their pages (the homepage
// clip alone was 1.9MB and gates mobile LCP), so they get a lower
// bitrate ceiling and a 540px long edge - detail is invisible under the
// opacity layer anyway.
//
// `showcase`: clips rendered at full opacity inside a card for the
// visitor to actually watch. These stay at the original quality.
// `standard` is what every clip has always been encoded at, and what desktop
// still gets: at 1440px the hero fills the viewport, and desktop LCP already
// passes comfortably, so there is nothing to buy by degrading it.
//
// `backdropMobile` is an extra, much smaller encode emitted only for the
// backdrop clips and served only under 768px via <source media>. Mobile is
// where LCP fails, and the homepage clip alone was 1.9MB of it. Measured on
// the homepage (median of 5, mobile emulation): 1.9MB/720px = LCP 4.10s vs
// 0.6MB/540px = LCP 3.03s. An in-between 1.4MB/720px encode measured 4.11s —
// i.e. no benefit at all — so the size has to come down for LCP to move, and
// the resolution drop is only acceptable because these sit at 30-40% opacity
// behind hero text on a small screen.
const ENCODE_PROFILES = {
  standard: { crf: 32, maxrate: '500k', bufsize: '1000k', longEdge: 720 },
  backdropMobile: { crf: 36, maxrate: '200k', bufsize: '400k', longEdge: 540 },
};

const BACKDROP_CLIPS = new Set([
  '552252494_24763328253355339_8075536204197305204_n', // homepage hero
  '556677411_32055543104036746_2204476273704338762_n', // contact hero
  '555764101_25387785744161354_2365138505705379783_n', // emergency hero
]);

const videoFilterFor = ({ longEdge }) =>
  `scale='if(gt(iw,ih),min(${longEdge},iw),-2)':'if(gt(iw,ih),-2,min(${longEdge},ih))'`;

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

// The hash covers the source bytes AND every encode profile applied to them.
// Profiles have to be in there: /media/* is served `immutable` for a year, so
// if tuning an encode setting produced different bytes at the same URL, every
// client and CDN edge holding the old copy would keep serving it indefinitely.
async function hashFile(p, profiles) {
  const buf = await fs.readFile(p);
  return createHash('sha256')
    .update(buf)
    .update(JSON.stringify(profiles))
    .digest('hex')
    .slice(0, 8);
}

function encodeMp4(input, output, profile) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .videoCodec('libx264')
      .outputOptions([
        '-preset veryfast',
        `-crf ${profile.crf}`,
        `-maxrate ${profile.maxrate}`,
        `-bufsize ${profile.bufsize}`,
        '-r 24',
        '-movflags +faststart',
        `-vf ${videoFilterFor(profile)}`,
      ])
      .noAudio()
      .on('error', reject)
      .on('end', resolve)
      .save(output);
  });
}

// Poster frame so the browser has an immediate paint candidate
// (Video.tsx derives the poster URL from the mp4 URL).
function extractPoster(input, output, profile) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .seekInput(1)
      .outputOptions([
        '-frames:v 1',
        `-vf ${videoFilterFor(profile)}`,
        '-c:v libwebp',
        '-quality 75',
      ])
      .on('error', reject)
      .on('end', resolve)
      .save(output);
  });
}

// Content-hashed output filenames (like Next.js does for /_next/static/*):
// any re-encode gets a brand-new URL, so a CDN/browser that cached the old
// URL as `immutable` can never serve stale bytes for changed content.
// The hash is of the SOURCE file, not the ffmpeg output, so it's stable
// across re-runs even though video encoding isn't byte-for-byte deterministic.
async function processVideo(srcPath, baseName, manifest) {
  const isBackdrop = BACKDROP_CLIPS.has(baseName);
  const profiles = isBackdrop
    ? { standard: ENCODE_PROFILES.standard, mobile: ENCODE_PROFILES.backdropMobile }
    : { standard: ENCODE_PROFILES.standard };

  const hash = await hashFile(srcPath, profiles);
  const mp4Name = `${baseName}.${hash}.mp4`;
  const webpName = `${baseName}.${hash}.webp`;
  const mobileName = `${baseName}.${hash}.m.mp4`;
  const mp4Out = path.join(DEST_DIR, mp4Name);
  const posterOut = path.join(DEST_DIR, webpName);
  const mobileOut = path.join(DEST_DIR, mobileName);

  manifest[baseName] = {
    mp4: `/media/${mp4Name}`,
    webp: `/media/${webpName}`,
    ...(isBackdrop ? { mp4Mobile: `/media/${mobileName}` } : {}),
  };

  // Every output has to exist, not just the mp4: if poster extraction failed
  // after the mp4 was renamed into place, checking only the mp4 would make
  // every subsequent run skip the work while the manifest kept pointing at a
  // poster that isn't there — costing the <video> its LCP paint candidate.
  const built = async (f) => fs.stat(f).then((s) => s.size > 0).catch(() => false);
  const alreadyBuilt =
    (await built(mp4Out)) &&
    (await built(posterOut)) &&
    (!isBackdrop || (await built(mobileOut)));
  if (alreadyBuilt) {
    console.log(`Up to date: ${mp4Name}`);
    return;
  }

  // Clean up prior-hash outputs for this source so stale files don't
  // accumulate across repeated local dev runs.
  const dirEntries = await fs.readdir(DEST_DIR).catch(() => []);
  const stalePrefix = `${baseName}.`;
  const keep = new Set([mp4Name, webpName, ...(isBackdrop ? [mobileName] : [])]);
  await Promise.all(
    dirEntries
      .filter((f) => f.startsWith(stalePrefix) && !keep.has(f))
      .map((f) => fs.rm(path.join(DEST_DIR, f)).catch(() => {}))
  );

  const tmp = `${mp4Out}.tmp.mp4`;
  console.log(`Encoding: ${mp4Name}`);
  await encodeMp4(srcPath, tmp, profiles.standard);
  await fs.rename(tmp, mp4Out);
  await extractPoster(srcPath, posterOut, profiles.standard);

  const [inStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(mp4Out)]);
  let line = `  ${(inStat.size / 1e6).toFixed(1)}MB -> ${(outStat.size / 1e6).toFixed(1)}MB (+ poster)`;

  if (isBackdrop) {
    const mtmp = `${mobileOut}.tmp.mp4`;
    await encodeMp4(srcPath, mtmp, profiles.mobile);
    await fs.rename(mtmp, mobileOut);
    const mStat = await fs.stat(mobileOut);
    line += ` | mobile ${(mStat.size / 1e6).toFixed(1)}MB`;
  }
  console.log(line);
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
      await processVideo(srcPath, baseName, manifest);
    } else if (IMAGE_EXTS.includes(ext) || ext === '.webm') {
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
