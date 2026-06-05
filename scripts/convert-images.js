import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convertToWebp(inputPath) {
  try {
    const outputPath = inputPath.replace(/\.(png|jpe?g)$/, '.webp');
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to ${outputPath}`);
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err);
  }
};

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  const promises = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      promises.push(processDirectory(filePath));
    } else if (/\.(png|jpe?g)$/i.test(file) && !/\.(svg|webp)$/i.test(file)) {
      promises.push(convertToWebp(filePath));
    }
  }

  await Promise.all(promises);
};

// Process public directory
processDirectory('public')
  .then(() => console.log('Conversion complete'))
  .catch(err => console.error('Error processing directory:', err));
