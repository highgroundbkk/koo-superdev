# 🤝 Contributing to KOO Superdev

We love contributions! Here's how you can help improve KOO Superdev.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/koo/koo-superdev.git
   cd koo-superdev
   ```

2. **Set up development environment**
   ```bash
   npm install
   npm run watch    # Watch mode for development
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- **Language**: TypeScript (ESM)
- **Formatting**: Use existing code patterns
- **Imports**: Use explicit file extensions (`.ts`, `.js`)
- **Naming**: camelCase for functions/variables, PascalCase for types

### Project Structure

```
src/
├── agent.ts           # Main agent logic
├── banner.ts          # CLI banner rendering
├── commands.ts        # Slash command system
├── config.ts          # Configuration management
├── agent-presets.ts   # Agent profiles & community packs
├── shell.ts           # Shell execution
├── file-*.ts          # File operations
└── tools/             # Additional tools
```

### Building & Testing

```bash
# Build
npm run build

# Watch mode during development
npm run watch

# Test the CLI
npm run test
node dist/koo-cli.js --help
node dist/koo-cli.js /help
node dist/koo-cli.js /refine list
```

## Adding Features

### 1. New Command

Edit `src/commands.ts`:

```typescript
if (command === '/mycommand') {
  return {
    success: true,
    output: 'My command output',
  };
}
```

### 2. New Agent Pack

Edit `src/agent-presets.ts`:

```typescript
{
  key: 'mypack',
  title: 'KOO-MYPACK 4.1',
  description: 'Description of my pack',
  profile: {
    name: 'KOO-MYPACK 4.1',
    model: 'anthropic/claude-sonnet-4',
    systemPrompt: `You are KOO-MYPACK...`,
  },
}
```

### 3. New Tool

Create `src/my-tool.ts`:

```typescript
export function myTool(input: string): Promise<string> {
  // Implementation
  return Promise.resolve(output);
}
```

Import in `src/agent.ts`:

```typescript
import { myTool } from './my-tool.js';
```

## Commit Guidelines

- Use clear, descriptive commit messages
- Format: `[type]: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Build/tooling

Examples:
```bash
git commit -m "feat: add new debug pack"
git commit -m "fix: correct banner rendering"
git commit -m "docs: update README with examples"
```

## Pull Request Process

1. **Before submitting:**
   ```bash
   npm run build      # Verify build succeeds
   npm run test       # Run tests
   ```

2. **Create PR with:**
   - Clear title and description
   - Reference any related issues
   - Screenshots/demos if applicable
   - List of changes

3. **PR will be reviewed for:**
   - Code quality
   - Functionality
   - Documentation
   - Breaking changes

## Reporting Issues

**Bug Report Template:**
```markdown
### Description
Brief description of the bug

### Steps to Reproduce
1. Run command X
2. ...

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Environment
- Node version: v18.x
- npm version: v9.x
- OS: macOS/Linux/Windows
```

## Feature Requests

**Feature Request Template:**
```markdown
### Description
What would you like to add?

### Use Case
Why is this needed?

### Proposed Solution
How should it work?

### Alternatives
Any alternatives considered?
```

## Code Review Process

All contributions go through peer review:

- ✅ Code passes linting
- ✅ All tests pass
- ✅ Documentation updated
- ✅ No breaking changes (or documented)
- ✅ Commit messages are clear

## Development Tips

### Debugging

```bash
# Run with verbose output
DEBUG=true node dist/koo-cli.js

# Check what agents are available
node dist/koo-cli.js /agent list

# Test command parsing
node dist/koo-cli.js /command test
```

### Adding Logs

```typescript
if (process.env.DEBUG === 'true') {
  console.log('[DEBUG]', message);
}
```

## Community Standards

- Be respectful and inclusive
- Provide constructive feedback
- Help others when possible
- Share knowledge and learnings
- Celebrate wins and iterate on feedback

## Need Help?

- 📖 Read the [README.md](./README.md)
- 🚀 Check [INSTALL.md](./INSTALL.md)
- 💬 Open an issue for questions
- 🤝 Ask in discussions

---

**Thank you for contributing to KOO Superdev! 🙏**
