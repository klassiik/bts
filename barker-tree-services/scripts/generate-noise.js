import { createCanvas } from 'canvas';
import fs from 'fs';

// Create 128x128 canvas
const canvas = createCanvas(128, 128);
const ctx = canvas.getContext('2d');

// Generate noise texture
const imageData = ctx.createImageData(128, 128);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
  const value = Math.floor(Math.random() * 56) + 200; // Light gray values (200-255)
  data[i] = value;     // R
  data[i + 1] = value; // G
  data[i + 2] = value; // B
  data[i + 3] = 255;   // A
}

ctx.putImageData(imageData, 0, 0);

// Save as PNG
const out = fs.createWriteStream('public/noise.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('Generated noise.png'));