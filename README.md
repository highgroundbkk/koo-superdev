# 🚀 KOO Superdev - Premium Agentic AI CLI

<div align="center">

**A beautiful, evolving agentic AI CLI for developers and power users.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)

[Quick Start](#-quick-start) • [Features](#-features) • [Installation](./INSTALL.md) • [Usage](#-usage) • [Contributing](./CONTRIBUTING.md)

</div>

---

## ✨ Features

### 🎨 Premium CLI Experience
- **Animated colorful banner** with branding
- **Agent profiles** with diverse personas
- **Community packs** for specialized workflows
- **Slash command system** for interactive workflows
- **Session persistence** across sessions

### 🧠 Agent Presets
- **KOO-AGENT4.1**: Default all-purpose agent
- **KOO-SHARP 4.1**: Focused, concise execution
- **KOO-BUILDER 4.1**: Construction and setup focused

### 📦 Community Packs
Install specialized packs for specific workflows:

| Pack | Version | Purpose |
|------|---------|---------|
| **debug** | KOO-DEBUG 4.1 | Root-cause debugging |
| **safe** | KOO-SAFE 4.1 | Conservative execution |
| **fast** | KOO-FAST 4.1 | Quick decisions |
| **deep** | KOO-DEEP 4.1 | Thorough exploration |
| **review** | KOO-REVIEW 4.1 | Code reviews |
| **publish** | KOO-PUBLISH 4.1 | Pre-release checks |
| **secure** | KOO-SECURE 4.1 | Security focused |
| **superpowers** | KOO-SUPERDEV 4.1 | Full capabilities |
| **supergstack** | KOO-SUPERGSTACK 4.1 | Browser automation |
| **graphify** | KOO-GRAPHIFY 4.1 | Knowledge mapping |
| **memory** | KOO-MEMORY 4.1 | Context retention |

### 🎯 Slash Commands
```
/help              - Show available commands
/agent <name>      - Switch agent
/refine list       - List installed packs
/refine remove     - Uninstall packs
/model <name>      - Switch model
/command <name>    - Run specific command
```

### 🔐 Security & Privacy
- ✅ No hardcoded secrets
- ✅ Opt-in community packs
- ✅ Local session storage
- ✅ Environment-based configuration
- ✅ No data sent to third parties

---

## 🚀 Quick Start

### Package Name (Scoped)

- npm package: **@koo/superdev**
- install command: `npm i -g @koo/superdev`
- executable: `koo`
- release tag: `v1.0.0`

### One-Line Setup (Recommended)

```bash
git clone https://github.com/koo/koo-superdev.git && cd koo-superdev && bash scripts/setup.sh
```

### Manual Setup

```bash
# Clone repository
git clone https://github.com/koo/koo-superdev.git
cd koo-superdev

# Install dependencies
npm install

# Build the project
npm run build

# Configure API keys
cp .env.example .env
# Edit .env with your API keys

# Run the CLI
node dist/koo-cli.js
```

### Full Installation Guide

See [INSTALL.md](./INSTALL.md) for detailed setup instructions.

---

## 📖 Usage

### Command Line

```bash
# Run default agent
koo

# Run with preset
koo sharp
koo builder

# Run with input
koo "What is TypeScript?"

# Get help
koo --help
koo --version
```

### Interactive CLI Mode

```bash
# Start CLI mode
node dist/koo-cli.js

# Available commands:
/help              Show this help
/agent sharp       Switch to sharp agent
/refine list       List community packs
/refine add debug  Install debug pack
/refine remove     Uninstall packs
/model gpt4        Switch model
```

### Terminal UI Mode

```bash
# Start TUI with interactive interface
node dist/koo-tui.js
```

---

## 🛠️ Configuration

### Environment Variables

Create `.env` file with:

```bash
# API Keys (choose at least one)
OPENROUTER_API_KEY=sk-...      # Recommended (multi-model)
ANTHROPIC_API_KEY=sk-ant-...   # Claude/Sonnet direct
OPENAI_API_KEY=sk-...          # GPT-4 via OpenRouter

# Optional settings
DEBUG=false                      # Enable debug logs
VERBOSE=false                    # Verbose output
DEFAULT_AGENT=superpowers       # Default agent preset
```

### Agent Profiles

Customize agent behavior in `src/agent-presets.ts`:

```typescript
{
  key: 'custom',
  title: 'KOO-CUSTOM 4.1',
  description: 'Your custom agent',
  profile: {
    name: 'KOO-CUSTOM 4.1',
    model: 'anthropic/claude-sonnet-4',
    maxSteps: 25,
    maxCost: 2.0,
    systemPrompt: 'Your custom system prompt...',
  },
}
```

### Community Packs

Manage packs with `/refine` command:

```bash
# List available packs
/refine list

# Install pack
/refine add debug

# Remove pack
/refine remove debug

# Install multiple
/refine add safe fast deep
```

---

## 📚 API Reference

### Core Modules

#### `src/agent.ts`
Main agent orchestration logic.

#### `src/banner.ts`
Animated CLI banner rendering with agent branding.

#### `src/commands.ts`
Slash command parser and executor.

#### `src/config.ts`
Configuration management and persistence.

#### `src/agent-presets.ts`
Agent profiles and community pack definitions.

#### `src/shell.ts`
Shell command execution and utilities.

---

## 🔧 Development

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start watching TypeScript
npm run watch

# In another terminal, test
npm run test
```

### Available Scripts

```bash
npm run build       # Build TypeScript
npm run watch       # Watch and rebuild
npm run dev         # Alias for watch
npm run test        # Run test suite
npm run clean       # Remove build output
npm run cli         # Run CLI directly
npm run setup       # Initial setup
```

### Project Structure

```
koo-superdev/
├── src/
│   ├── agent.ts              # Main agent
│   ├── banner.ts             # CLI banner
│   ├── commands.ts           # Slash commands
│   ├── config.ts             # Configuration
│   ├── agent-presets.ts      # Presets & packs
│   ├── shell.ts              # Shell utilities
│   ├── file-*.ts             # File operations
│   └── tools/                # Additional tools
├── scripts/
│   ├── setup.sh              # Setup script
│   ├── build.sh              # Build script
│   ├── watch.sh              # Watch script
│   └── test.sh               # Test script
├── dist/                     # Built output
├── .env.example              # Environment template
├── README.md                 # This file
├── INSTALL.md                # Installation guide
├── CONTRIBUTING.md           # Contributing guide
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

---

## 🐛 Troubleshooting

### "Command not found: koo"
```bash
# Ensure global link is set up
npm link
# Or use full path
node dist/koo-cli.js
```

### "API key not working"
```bash
# Verify .env file exists and has correct format
cat .env
# Check API key is valid at the provider's website
```

### "Build failed"
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### "Permission denied" on scripts
```bash
# Make scripts executable
chmod +x scripts/*.sh
```

See [INSTALL.md](./INSTALL.md) for more troubleshooting.

---

## 📦 Getting API Keys

### OpenRouter (Recommended)
1. Visit https://openrouter.ai
2. Sign up and go to API Keys
3. Copy your key to `.env`

### Anthropic
1. Visit https://console.anthropic.com
2. Create an API key
3. Copy to `.env`

### OpenAI
1. Visit https://platform.openai.com
2. Create an API key
3. Copy to `.env`

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- Adding features
- Fixing bugs
- Improving documentation
- Creating community packs
- Reporting issues

### Quick Contribution Steps

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Build and test: `npm run build && npm run test`
5. Commit: `git commit -m "feat: my new feature"`
6. Push and create pull request

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with:
- **TypeScript** - Type safety
- **Node.js** - Runtime
- **OpenRouter** - Multi-model access
- **Anthropic** - Claude models

---

## 💬 Support & Feedback

- 📖 **Documentation**: [INSTALL.md](./INSTALL.md) | [CONTRIBUTING.md](./CONTRIBUTING.md)
- 🐛 **Issues**: [Report a bug](https://github.com/koo/koo-superdev/issues)
- 💡 **Ideas**: [Request a feature](https://github.com/koo/koo-superdev/discussions)
- 💬 **Discussions**: [Join the community](https://github.com/koo/koo-superdev/discussions)

---

<div align="center">

**Made with ❤️ by the KOO Team**

[⬆ Back to Top](#-koo-superdev---premium-agentic-ai-cli)

</div>
