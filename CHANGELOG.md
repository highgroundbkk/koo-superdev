# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-05-11

### 🔧 Changed

- Switched npm package scope to `@mapii.cloud/superdev` for publish permissions
- Updated project `.npmrc` defaults to `scope=@mapii.cloud`
- Synced install and release docs with the deployable package name
- Added `postbuild` script to preserve executable permissions for CLI bin files

## [1.0.0] - 2024-05-11

### 🚀 Added

#### Core Features
- **Animated CLI Banner** - Colorful, dynamic banner with agent branding
- **Agent Profiles** - Premium agent presets (KOO-AGENT4.1, KOO-SHARP 4.1, KOO-BUILDER 4.1)
- **Community Packs System** - 11 opt-in specialized packs:
  - `debug` - KOO-DEBUG 4.1: Root-cause debugging
  - `safe` - KOO-SAFE 4.1: Conservative execution
  - `fast` - KOO-FAST 4.1: Quick decisions
  - `deep` - KOO-DEEP 4.1: Thorough exploration
  - `review` - KOO-REVIEW 4.1: Code reviews
  - `publish` - KOO-PUBLISH 4.1: Pre-release checks
  - `secure` - KOO-SECURE 4.1: Security focused
  - `superpowers` - KOO-SUPERDEV 4.1: Full capabilities
  - `supergstack` - KOO-SUPERGSTACK 4.1: Browser automation
  - `graphify` - KOO-GRAPHIFY 4.1: Knowledge mapping
  - `memory` - KOO-MEMORY 4.1: Context retention

#### Slash Commands
- `/help` - Display available commands
- `/agent <name>` - Switch agent profile
- `/model <name>` - Switch AI model
- `/refine list` - List installed community packs
- `/refine add <pack>` - Install community pack
- `/refine remove <pack>` - Uninstall community pack
- `/command <name>` - Run specific command

#### Configuration & Persistence
- Environment-based configuration (`.env`)
- Persistent agent configuration (`agent.config.json`)
- Session storage directory (`~/.koo-sessions`)
- Config storage directory (`~/.koo-config`)

#### Development & Installation
- Automated setup script (`scripts/setup.sh`)
- Build script (`scripts/build.sh`)
- Watch mode for development (`scripts/watch.sh`)
- Test suite (`scripts/test.sh`)
- npm scripts: `build`, `watch`, `dev`, `test`, `cli`, `setup`, `clean`

#### Documentation
- Comprehensive README.md
- Installation guide (INSTALL.md)
- Contributing guidelines (CONTRIBUTING.md)
- Security & copyright policy (SECURITY.md)
- MIT License

#### Security & Best Practices
- No hardcoded secrets or API keys
- Opt-in community pack system
- Local-only session and config storage
- Environment-based configuration
- `.gitignore` for safe repository structure
- Copyright protection and attribution guidelines

### 🔧 Technical Details

- **Language**: TypeScript (ESM)
- **Runtime**: Node.js v18+
- **Build**: tsc (TypeScript Compiler)
- **Architecture**: Modular, extensible design
- **Type Safety**: Strict TypeScript configuration

### 📦 File Structure

```
koo-superdev/
├── src/
│   ├── agent.ts              # Main agent orchestration
│   ├── banner.ts             # CLI banner rendering
│   ├── commands.ts           # Slash command system
│   ├── config.ts             # Configuration management
│   ├── agent-presets.ts      # Agent profiles & packs
│   ├── shell.ts              # Shell utilities
│   ├── file-*.ts             # File operations
│   └── tools/                # Additional tools
├── scripts/
│   ├── setup.sh              # Setup automation
│   ├── build.sh              # Build script
│   ├── watch.sh              # Watch mode
│   └── test.sh               # Test suite
├── dist/                     # Built output
├── .env.example              # Configuration template
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── INSTALL.md                # Installation guide
├── CONTRIBUTING.md           # Contribution guidelines
├── SECURITY.md               # Security & copyright policy
├── LICENSE                   # MIT License
├── CHANGELOG.md              # This file
├── package.json              # Dependencies & scripts
└── tsconfig.json             # TypeScript configuration
```

### ✅ Testing

All features tested and verified:
- ✅ CLI modes: default, sharp, builder, cli, tui
- ✅ Help system and command parsing
- ✅ Community pack installation/removal
- ✅ Agent profile switching
- ✅ Environment configuration
- ✅ Session persistence

### 🎯 Ready for

- ✅ Production use
- ✅ Community contributions
- ✅ npm publishing
- ✅ Open source collaboration
- ✅ Enterprise deployment

---

## Future Roadmap (Planned)

- [ ] Web UI dashboard
- [ ] Advanced analytics
- [ ] Plugin system for custom agents
- [ ] Multi-language support
- [ ] Commercial license option
- [ ] Cloud sync for sessions
- [ ] Team collaboration features

---

## [Unreleased]

### Planned Features
- (To be announced)

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backwards-compatible)
- **PATCH** version for bug fixes

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Adding features
- Fixing bugs
- Improving documentation
- Creating community packs
- Reporting issues

---

## License

MIT License - See [LICENSE](./LICENSE) for full details.

---

## Acknowledgments

- Built with TypeScript, Node.js
- Models from Anthropic (Claude) and OpenRouter
- Community feedback and contributions

---

**KOO Superdev Team** | [GitHub](https://github.com/koo/koo-superdev) | [Issues](https://github.com/koo/koo-superdev/issues)
