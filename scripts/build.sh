#!/bin/bash
# KOO Superdev - Development Build Script
# Builds the project and watches for changes during development

echo "🔨 Building KOO Superdev..."
npx tsc

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📍 Available entrypoints:"
    echo "   - koo (default agent)"
    echo "   - koo sharp"
    echo "   - koo builder"
    echo "   - koo cli"
    echo "   - koo tui"
    echo ""
    echo "🚀 Try running:"
    echo "   node dist/koo-cli.js --help"
else
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
