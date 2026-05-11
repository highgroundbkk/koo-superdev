# 🚀 KOO Superdev - Installation Guide

Complete setup instructions for the KOO CLI.

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Git**: For cloning and version control

## Quick Setup

### 1️⃣ Automatic Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/koo/koo-superdev.git
cd koo-superdev

# Run the setup script
bash scripts/setup.sh
```

The setup script will:
- ✅ Verify Node.js and npm
- 📦 Install dependencies
- 🔨 Build TypeScript
- 📝 Create `.env` configuration
- 📁 Create necessary directories
- 🔗 Optionally link CLI globally

### 2️⃣ Manual Setup

```bash
# Clone and navigate
git clone https://github.com/koo/koo-superdev.git
cd koo-superdev

# Install dependencies
npm install

# Build the project
npm run build

# Create environment file
cp .env.example .env

# Create directories
mkdir -p ~/.koo-sessions
mkdir -p ~/.koo-config

# (Optional) Link globally
npm link
```

## Configuration

### Setting API Keys

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your API keys:**
   ```bash
   # .env
   OPENROUTER_API_KEY=your-key-here
   ANTHROPIC_API_KEY=your-key-here
   OPENAI_API_KEY=your-key-here
   ```

3. **Verify configuration:**
   ```bash
   echo "Configuration ready!" && npm run test
   ```

### Getting API Keys

**OpenRouter** (recommended - multi-model support):
- Visit: https://openrouter.ai
- Sign up and get your API key
- Supports Claude, GPT-4, and 300+ models

**Anthropic** (Claude/Sonnet direct):
- Visit: https://console.anthropic.com
- Create API key

**OpenAI** (GPT-4 via OpenRouter):
- Visit: https://platform.openai.com
- Create API key

## Running the CLI

### Direct Execution

```bash
# Default agent (agent4.1)
node dist/koo-cli.js

# With arguments
node dist/koo-cli.js "your question here"

# Help system
node dist/koo-cli.js --help
```

### Global Command (after `npm link`)

```bash
koo
koo sharp
koo builder
koo tui
koo cli --help
```

## Available Commands

| Command | Description |
|---------|-------------|
| `koo` | Start default agent |
| `koo sharp` | KOO-SHARP agent |
| `koo builder` | KOO-BUILDER agent |
| `koo cli` | CLI mode |
| `koo tui` | Terminal UI mode |
| `--help` | Show help |
| `--version` | Show version |

## Development

### Scripts

```bash
npm run build      # Build TypeScript
npm run watch      # Watch and rebuild
npm run dev        # Alias for watch
npm run test       # Run tests
npm run clean      # Remove build files
npm run cli        # Run CLI directly
npm run tui        # Run TUI directly
```

### Building from Source

```bash
# Start watch mode
npm run watch

# In another terminal, test changes
npm run cli -- --help

# Build once
npm run build
```

## Troubleshooting

### Node.js Not Found
```bash
# Check your Node.js installation
node --version   # Should be v18+
npm --version    # Should be v8+

# Install Node.js from https://nodejs.org/
```

### Build Errors
```bash
# Clean and rebuild
npm run clean
npm run build

# Or reset everything
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Permission Denied (scripts)
```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### API Key Not Working
```bash
# Verify .env file is correct
cat .env

# Test API key:
grep OPENROUTER_API_KEY .env
```

## Community Packs

After setup, install community packs:

```bash
koo cli
# Then use: /refine list
```

Available packs:
- `debug` - KOO-DEBUG 4.1
- `safe` - KOO-SAFE 4.1
- `fast` - KOO-FAST 4.1
- `deep` - KOO-DEEP 4.1
- `review` - KOO-REVIEW 4.1
- `publish` - KOO-PUBLISH 4.1
- `secure` - KOO-SECURE 4.1

## Support

- 📖 Check [README.md](./README.md) for usage
- 💬 Contribute: [CONTRIBUTING.md](./CONTRIBUTING.md)
- 🐛 Report issues
- 💡 Suggest features

---

**Happy coding with KOO Superdev! 🎉**
