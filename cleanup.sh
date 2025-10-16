#!/bin/bash

# Car Wash Clean - Project Cleanup Script
# This removes unnecessary development files and cleans up the project

echo "🧹 Starting project cleanup..."
echo ""

# Navigate to project root (assumes script is run from project root)
PROJECT_ROOT="."

# Function to safely remove files/folders
safe_remove() {
    if [ -e "$1" ]; then
        echo "🗑️  Removing: $1"
        rm -rf "$1"
    else
        echo "⏭️  Skipping (not found): $1"
    fi
}

echo "📁 Cleaning up editor-specific files..."
safe_remove "$PROJECT_ROOT/.vscode"
safe_remove "$PROJECT_ROOT/.idea"
safe_remove "$PROJECT_ROOT/*.code-workspace"

echo ""
echo "📁 Cleaning up system files..."
safe_remove "$PROJECT_ROOT/.DS_Store"
safe_remove "$PROJECT_ROOT/**/.DS_Store"
safe_remove "$PROJECT_ROOT/Thumbs.db"
safe_remove "$PROJECT_ROOT/**/Thumbs.db"

echo ""
echo "📁 Cleaning up test/coverage files (if not testing)..."
safe_remove "$PROJECT_ROOT/coverage"
safe_remove "$PROJECT_ROOT/.nyc_output"
safe_remove "$PROJECT_ROOT/__tests__"
safe_remove "$PROJECT_ROOT/tests"
safe_remove "$PROJECT_ROOT/jest.config.js"
safe_remove "$PROJECT_ROOT/jest.config.ts"

echo ""
echo "📁 Cleaning up optional linting files (keep if you want)..."
# Uncomment these if you don't use ESLint/Prettier
# safe_remove "$PROJECT_ROOT/.eslintrc.json"
# safe_remove "$PROJECT_ROOT/.eslintrc.js"
# safe_remove "$PROJECT_ROOT/.prettierrc"
# safe_remove "$PROJECT_ROOT/.prettierrc.json"

echo ""
echo "📁 Cleaning up build artifacts (will regenerate)..."
safe_remove "$PROJECT_ROOT/.next"
safe_remove "$PROJECT_ROOT/out"
safe_remove "$PROJECT_ROOT/dist"
safe_remove "$PROJECT_ROOT/build"

echo ""
echo "📁 Cleaning up old dependencies (will reinstall)..."
safe_remove "$PROJECT_ROOT/node_modules"

echo ""
echo "📁 Cleaning up log files..."
safe_remove "$PROJECT_ROOT/*.log"
safe_remove "$PROJECT_ROOT/npm-debug.log*"
safe_remove "$PROJECT_ROOT/yarn-debug.log*"
safe_remove "$PROJECT_ROOT/yarn-error.log*"

echo ""
echo "📁 Cleaning up temporary files..."
safe_remove "$PROJECT_ROOT/.tmp"
safe_remove "$PROJECT_ROOT/tmp"
safe_remove "$PROJECT_ROOT/.cache"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📦 Now reinstalling dependencies..."
npm install

echo ""
echo "🏗️  Building project..."
npm run build

echo ""
echo "🎉 All done! Your project is cleaned and rebuilt!"
echo ""
echo "📊 Disk space saved:"
du -sh $PROJECT_ROOT
