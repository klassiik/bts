import { promises as fs } from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('media');
const DEST_DIR = path.resolve('public', 'media');

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyFile(srcPath, destPath) {
  await ensureDir(path.dirname(destPath));
  await fs.copyFile(srcPath, destPath);
}

async function copyDir(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.mp4', '.webm', '.jpg', '.jpeg', '.png'].includes(ext)) {
        await copyFile(srcPath, destPath);
        console.log(`Copied ${path.relative(process.cwd(), srcPath)} -> ${path.relative(process.cwd(), destPath)}`);
      }
    }
  }
}

async function main() {
  const srcStat = await fs.stat(SRC_DIR).catch(() => null);
  if (!srcStat) {
    console.log('No media/ directory found, skipping sync.');
    return;
  }
  await ensureDir(DEST_DIR);
  await copyDir(SRC_DIR, DEST_DIR);
  console.log('Media sync complete. Files available under /media/* via public/.');
}

main().catch((err) => {
  console.error('Media sync failed:', err);
  process.exit(1);
});
