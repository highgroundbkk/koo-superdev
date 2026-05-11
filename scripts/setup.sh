#!/bin/bash
# KOO Superdev - Quick Setup Script
# This script sets up the KOO CLI with all dependencies and configuration

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 KOO Superdev - Setup Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "   Please install Node.js v18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm $NPM_VERSION detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Build TypeScript
echo "🔨 Building TypeScript..."
npx tsc
echo "✅ Build complete (dist/)"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Setting up environment file..."
    cp .env.example .env
    echo "✅ Created .env (please edit with your API keys)"
else
    echo "✅ .env file already exists"
fi
echo ""

# Create directories
echo "📁 Creating necessary directories..."
mkdir -p ~/.koo-sessions
mkdir -p ~/.koo-config
echo "✅ Directories created"
echo ""

# Link globally (optional)
echo "🔗 Link CLI globally? (y/n)"
read -r LINK_GLOBAL
if [ "$LINK_GLOBAL" = "y" ] || [ "$LINK_GLOBAL" = "Y" ]; then
    npm link
    echo "✅ CLI linked globally - you can now run 'koo' from anywhere"
else
    echo "ℹ️  Skipped global linking. Run: npm link"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Next steps:"
echo "   1. Edit .env with your API keys"
echo "   2. Run: koo --help  (or: node dist/koo-cli.js --help)"
echo "   3. Try: koo sharp"
echo "   4. Explore: koo cli"
echo ""
