#!/usr/bin/env node

/**
 * Repository Structure Verification Script
 * Verifies that all required files are present for Vercel deployment
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Repository Structure for Vercel Deployment...\n');

// Required files for Vercel Next.js deployment
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'app/page.tsx',
  'app/layout.tsx'
];

const requiredDirectories = [
  'app',
  'components',
  'public',
  'lib'
];

let issues = [];
let warnings = [];

// Check required files
console.log('📁 Checking Required Files:');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    issues.push(`Missing required file: ${file}`);
    console.log(`  ❌ ${file} - MISSING`);
  }
});

// Check required directories
console.log('\n📂 Checking Required Directories:');
requiredDirectories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`  ✅ ${dir}/`);
  } else {
    issues.push(`Missing required directory: ${dir}`);
    console.log(`  ❌ ${dir}/ - MISSING`);
  }
});

// Check package.json content
console.log('\n📦 Checking package.json Configuration:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts?.build) {
    console.log('  ✅ Build script found');
  } else {
    issues.push('Missing build script in package.json');
    console.log('  ❌ Build script missing');
  }
  
  if (packageJson.dependencies?.next) {
    console.log('  ✅ Next.js dependency found');
  } else {
    issues.push('Next.js not found in dependencies');
    console.log('  ❌ Next.js dependency missing');
  }
} catch (error) {
  issues.push('Cannot read or parse package.json');
  console.log('  ❌ package.json read error');
}

// Check for deployment blockers
console.log('\n🚫 Checking for Deployment Blockers:');

const vercelJsonExists = fs.existsSync('vercel.json');
const vercelIgnoreExists = fs.existsSync('.vercelignore');

if (vercelJsonExists) {
  console.log('  ⚠️  vercel.json exists (check configuration)');
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    console.log(`     Build Command: ${vercelConfig.buildCommand || 'not specified'}`);
    console.log(`     Output Directory: ${vercelConfig.outputDirectory || 'not specified'}`);
  } catch (error) {
    warnings.push('vercel.json exists but cannot be parsed');
    console.log('     ⚠️  Invalid JSON format');
  }
} else {
  console.log('  ✅ No vercel.json (using defaults)');
}

if (vercelIgnoreExists) {
  console.log('  ⚠️  .vercelignore exists (check exclusions)');
  const ignoreContent = fs.readFileSync('.vercelignore', 'utf8');
  console.log(`     Content: ${ignoreContent.trim()}`);
} else {
  console.log('  ✅ No .vercelignore (no exclusions)');
}

// Git repository check
console.log('\n📍 Git Repository Status:');
try {
  const { execSync } = require('child_process');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('  ⚠️  Uncommitted changes detected');
    console.log('     Consider committing changes before deployment');
  } else {
    console.log('  ✅ Working directory clean');
  }
} catch (error) {
  console.log('  ⚠️  Not a git repository or git not available');
}

// Summary
console.log('\n📋 DEPLOYMENT VERIFICATION SUMMARY:');
console.log('=================================');

if (issues.length === 0) {
  console.log('✅ All checks passed! Repository is ready for Vercel deployment.');
  console.log('\n🚀 Recommended Actions:');
  console.log('   1. Commit and push all changes to GitHub');
  console.log('   2. Trigger a new deployment on Vercel');
  console.log('   3. Monitor deployment logs for any runtime issues');
} else {
  console.log('❌ Issues found that will prevent deployment:');
  issues.forEach(issue => console.log(`   • ${issue}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(warning => console.log(`   • ${warning}`));
}

console.log('\n🔗 GitHub Repository Check:');
console.log('   Ensure your GitHub repository (github.com/klassiik/bts) contains:');
console.log('   • package.json at the ROOT level');
console.log('   • All project files in correct locations');
console.log('   • No missing required files or directories');

process.exit(issues.length > 0 ? 1 : 0);