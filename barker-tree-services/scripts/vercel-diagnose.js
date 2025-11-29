#!/usr/bin/env node

console.log('=== Vercel Diagnostic Script ===');
console.log('Current working directory:', process.cwd());
console.log('Node.js version:', process.version);

import fs from 'fs';
import path from 'path';

console.log('\n=== Checking for package.json ===');
try {
  const packagePath = path.join(process.cwd(), 'package.json');
  console.log('Looking for package.json at:', packagePath);
  
  if (fs.existsSync(packagePath)) {
    console.log('✅ package.json found!');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    console.log('Package.json content (first 500 chars):');
    console.log(packageContent.substring(0, 500));
    
    const packageData = JSON.parse(packageContent);
    console.log('\n=== Dependencies ===');
    console.log('next:', packageData.dependencies?.next || 'NOT FOUND');
    console.log('react:', packageData.dependencies?.react || 'NOT FOUND');
  } else {
    console.log('❌ package.json NOT FOUND!');
  }
} catch (error) {
  console.error('Error reading package.json:', error.message);
}

console.log('\n=== Directory contents ===');
try {
  const contents = fs.readdirSync(process.cwd());
  console.log('Files in current directory:', contents);
} catch (error) {
  console.error('Error reading directory:', error.message);
}