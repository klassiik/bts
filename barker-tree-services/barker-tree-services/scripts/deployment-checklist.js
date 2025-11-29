#!/usr/bin/env node

/**
 * Vercel Deployment Checklist Generator
 * Provides step-by-step instructions for fixing deployment issues
 */

const fs = require('fs');
const path = require('path');

console.log('📋 VERCEL DEPLOYMENT CHECKLIST');
console.log('================================\n');

console.log('🔍 SOLUTION 1: Verify Repository Structure');
console.log('-------------------------------------------');
console.log('1. Go to: https://github.com/klassiik/bts');
console.log('2. Check that these files exist at the ROOT level:');
console.log('   ✅ package.json');
console.log('   ✅ next.config.ts');
console.log('   ✅ app/page.tsx');
console.log('   ✅ app/layout.tsx');
console.log('3. Verify NO files are missing or in wrong locations\n');

console.log('🔧 SOLUTION 2: Fix Project Path Issues');
console.log('--------------------------------------');
console.log('If your project files are in a subdirectory:');
console.log('1. Create/update vercel.json in repository root:');
console.log('   {');
console.log('     "buildCommand": "cd subdirectory && npm run build",');
console.log('     "outputDirectory": "subdirectory/.next"');
console.log('   }');
console.log('2. OR move all files to repository root\n');

console.log('🚀 SOLUTION 3: Redeploy Process');
console.log('-------------------------------');
console.log('1. Commit all changes to GitHub');
console.log('2. Go to Vercel Dashboard');
console.log('3. Find your project: barker-tree-services');
console.log('4. Click "Redeploy" or "Deploy"');
console.log('5. Monitor build logs for success\n');

console.log('🔍 LOCAL VERIFICATION');
console.log('--------------------');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Local package.json found`);
  console.log(`   Name: ${packageJson.name}`);
  console.log(`   Next.js: ${packageJson.dependencies?.next || 'Not found'}`);
} catch (error) {
  console.log('❌ Local package.json missing or invalid');
}

if (fs.existsSync('vercel.json')) {
  console.log('✅ vercel.json configuration present');
} else {
  console.log('⚠️  No vercel.json (using defaults)');
}

console.log('\n🌐 GITHUB REPOSITORY STATUS');
console.log('---------------------------');
console.log('Repository: github.com/klassiik/bts');
console.log('Expected files at root:');
console.log('• package.json (main dependency file)');
console.log('• next.config.ts (Next.js configuration)');
console.log('• app/ (Next.js App Router directory)');
console.log('• components/ (React components)');
console.log('• public/ (static assets)\n');

console.log('⚡ QUICK FIXES TO TRY:');
console.log('---------------------');
console.log('1. If files are missing: Push local changes to GitHub');
console.log('2. If in wrong location: Move files to repository root');
console.log('3. If build fails: Check Node.js version compatibility');
console.log('4. If 404 errors: Verify routing structure\n');

console.log('🎯 SUCCESS CRITERIA:');
console.log('-------------------');
console.log('✅ GitHub repository has package.json at root');
console.log('✅ All project files are accessible');
console.log('✅ Vercel can find and read package.json');
console.log('✅ Build completes without errors');
console.log('✅ Deployment URL loads successfully\n');

console.log('Run this script again after making changes to verify fixes.');