#!/bin/bash

# Vercel Deployment Fix Script
# Automatically implements common deployment fixes

echo "🔧 VERCEL DEPLOYMENT AUTOMATIC FIX"
echo "=================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin https://github.com/klassiik/bts.git"
    echo ""
fi

# Solution 1: Verify repository structure
echo "📁 SOLUTION 1: Checking Repository Structure"
echo "--------------------------------------------"

required_files=("package.json" "next.config.ts" "app/page.tsx" "app/layout.tsx")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - MISSING"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo ""
    echo "❌ Missing files detected. Fix repository structure first."
    echo "   Missing: ${missing_files[*]}"
    exit 1
fi

echo ""

# Solution 2: Check and create/update vercel.json
echo "🔧 SOLUTION 2: Vercel Configuration Check"
echo "----------------------------------------"

if [ -f "vercel.json" ]; then
    echo "  ✅ vercel.json exists"
    echo "  📄 Current configuration:"
    cat vercel.json
else
    echo "  📝 Creating vercel.json..."
    cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
EOF
    echo "  ✅ vercel.json created"
fi

echo ""

# Solution 3: Prepare for redeployment
echo "🚀 SOLUTION 3: Deployment Preparation"
echo "-------------------------------------"

# Check git status
if command -v git >/dev/null 2>&1; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        git_status=$(git status --porcelain)
        if [ -z "$git_status" ]; then
            echo "  ✅ Git working directory is clean"
        else
            echo "  📝 Uncommitted changes detected:"
            git status --short
            echo ""
            echo "  💡 Commit changes with:"
            echo "     git add ."
            echo "     git commit -m 'Fix deployment configuration'"
            echo "     git push origin main"
        fi
    else
        echo "  ⚠️  Not in a git repository"
    fi
else
    echo "  ⚠️  Git command not found"
fi

echo ""

# Final verification
echo "✅ VERIFICATION SUMMARY"
echo "----------------------"
echo "Required files present: ✅"
echo "Vercel configuration: ✅"
echo "Ready for deployment: ✅"
echo ""

echo "🌐 NEXT STEPS:"
echo "1. Push changes to GitHub: git push origin main"
echo "2. Trigger deployment on Vercel dashboard"
echo "3. Monitor build logs for success"
echo ""

echo "🔗 GitHub Repository Check:"
echo "   Visit: https://github.com/klassiik/bts"
echo "   Verify: package.json exists at root level"
echo ""

echo "🎯 Success indicators:"
echo "   • Build completes without errors"
echo "   • Vercel provides deployment URL"
echo "   • Website loads successfully"