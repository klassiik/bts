# Vercel Deployment Troubleshooting Guide

## Issue: "No Next.js version detected"

Even though `next@15.5.4` is clearly defined in `package.json`, Vercel cannot detect it.

## Manual Vercel Dashboard Checks Required

### 1. Root Directory Setting
- Go to your Vercel project dashboard
- Click on **Settings** → **General**
- Under **Root Directory**, ensure it's set to `/` (root)
- If there's a subdirectory listed, change it to `/`

### 2. Framework Preset
- In **Settings** → **General**
- Under **Framework Preset**, select **Next.js** from the dropdown
- This explicitly tells Vercel this is a Next.js project

### 3. Build Command
- In **Settings** → **Builds and Output Settings**
- Under **Build Command**, ensure it shows: `npm run vercel-build`
- If empty or different, update it to: `npm run vercel-build`

### 4. Output Directory
- Under **Output Directory**, ensure it shows: `.next`
- If different, change it to: `.next`

### 5. Install Command
- Under **Install Command**, ensure it shows: `npm install`
- If different, change it to: `npm install`

## Diagnostic Information

The diagnostic script will run during build and show:
- Current working directory
- Whether package.json is found
- Next.js version detection
- Directory contents

## If Still Failing

1. **Delete and recreate the Vercel project**
2. **Check repository structure** - ensure package.json is at the repository root
3. **Verify git repository** - make sure the correct repository is connected
4. **Check Vercel logs** - the diagnostic output will show exactly what Vercel sees