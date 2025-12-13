import path from 'path';
import { promises as fs } from 'fs';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath);

const MEDIA_DIR = path.resolve('public', 'media');

async function optimizeMp4(inputPath, outputPath) {
  console.log(`Optimizing MP4: ${path.basename(inputPath)}`);
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec('libx264')
      .outputOptions([
        '-preset veryfast',
        '-crf 23',
        '-movflags +faststart',
        "-vf scale='min(1920,iw)':-2"
      ])
      .noAudio() // remove audio track to ensure muted and reduce size
      .on('error', reject)
      .on('end', resolve)
      .save(outputPath);
  });
}

async function createWebm(inputPath, webmPath) {
  console.log(`Creating WebM: ${path.basename(webmPath)}`);
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec('libvpx-vp9')
      .outputOptions([
        '-b:v 0',
        '-crf 31',
        "-vf scale='min(1920,iw)':-2"
      ])
      .noAudio()
      .on('error', reject)
      .on('end', resolve)
      .save(webmPath);
  });
}

async function main() {
  const stat = await fs.stat(MEDIA_DIR).catch(() => null);
  if (!stat) {
    console.log('No public/media directory found; run sync step first.');
    return;
  }
  const files = await fs.readdir(MEDIA_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.mp4') {
      const input = path.join(MEDIA_DIR, file);
      const tempOut = path.join(MEDIA_DIR, file.replace(/\.mp4$/i, '.opt.mp4'));
      await optimizeMp4(input, tempOut);
      // Replace original with optimized
      await fs.rename(tempOut, input);
      const webmOut = path.join(MEDIA_DIR, file.replace(/\.mp4$/i, '.webm'));
      await createWebm(input, webmOut);
    }
  }
  console.log('Video optimization complete.');
}

main().catch((err) => {
  console.error('Video optimization failed:', err);
  process.exit(1);
});
