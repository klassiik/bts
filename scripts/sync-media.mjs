import { promises as fs } from 'fs';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath);

const SRC_DIR = path.resolve('media');
const DEST_DIR = path.resolve('public', 'media');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

// These clips render as ~40%-opacity background loops behind hero text,
// so they tolerate aggressive compression: cap the LONG edge at 720
// (sources are portrait 720x1280 and landscape 1280x720), strip audio,
// 24fps, and a bitrate ceiling so even the 64s homepage clip stays small.
// Originals are 7-18MB Instagram/Facebook exports.
const VIDEO_FILTER =
  "scale='if(gt(iw,ih),min(720,iw),-2)':'if(gt(iw,ih),-2,min(720,ih))'";

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function isUpToDate(srcPath, outPath) {
  const [src, out] = await Promise.all([
    fs.stat(srcPath),
    fs.stat(outPath).catch(() => null),
  ]);
  return out !== null && out.size > 0 && out.mtimeMs >= src.mtimeMs;
}

function encodeMp4(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .videoCodec('libx264')
      .outputOptions([
        '-preset veryfast',
        '-crf 32',
        '-maxrate 500k',
        '-bufsize 1000k',
        '-r 24',
        '-movflags +faststart',
        `-vf ${VIDEO_FILTER}`,
      ])
      .noAudio()
      .on('error', reject)
      .on('end', resolve)
      .save(output);
  });
}

// Poster frame so the browser has an immediate paint candidate
// (Video.tsx derives the poster URL from the mp4 URL).
function extractPoster(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .seekInput(1)
      .outputOptions([
        '-frames:v 1',
        `-vf ${VIDEO_FILTER}`,
        '-c:v libwebp',
        '-quality 75',
      ])
      .on('error', reject)
      .on('end', resolve)
      .save(output);
  });
}

async function processVideo(srcPath, name) {
  const mp4Out = path.join(DEST_DIR, name);
  const posterOut = path.join(DEST_DIR, name.replace(/\.mp4$/i, '.webp'));

  if ((await isUpToDate(srcPath, mp4Out)) && (await isUpToDate(srcPath, posterOut))) {
    console.log(`Up to date: ${name}`);
    return;
  }

  const tmp = `${mp4Out}.tmp.mp4`;
  console.log(`Encoding: ${name}`);
  await encodeMp4(srcPath, tmp);
  await fs.rename(tmp, mp4Out);
  await extractPoster(srcPath, posterOut);

  const [inStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(mp4Out)]);
  console.log(
    `  ${(inStat.size / 1e6).toFixed(1)}MB -> ${(outStat.size / 1e6).toFixed(1)}MB (+ poster)`
  );
}

async function main() {
  const srcStat = await fs.stat(SRC_DIR).catch(() => null);
  if (!srcStat) {
    console.log('No media/ directory found, skipping sync.');
    return;
  }
  await ensureDir(DEST_DIR);

  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    const srcPath = path.join(SRC_DIR, entry.name);

    if (ext === '.mp4') {
      await processVideo(srcPath, entry.name);
    } else if (IMAGE_EXTS.includes(ext) || ext === '.webm') {
      const destPath = path.join(DEST_DIR, entry.name);
      if (await isUpToDate(srcPath, destPath)) continue;
      await fs.copyFile(srcPath, destPath);
      console.log(`Copied ${entry.name}`);
    }
  }
  console.log('Media sync complete. Optimized files available under /media/* via public/.');
}

main().catch((err) => {
  console.error('Media sync failed:', err);
  process.exit(1);
});
