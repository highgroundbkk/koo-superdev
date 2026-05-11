# KOO-AGENT4.1 Setup Guide

> Enterprise-grade autonomous agent for KOO Superdev project
> **Status**: ✅ Active | **Version**: 4.1.0

## What is KOO-AGENT4.1?

KOO-AGENT4.1 (formerly GPT4.1) is an intelligent autonomous agent designed for complex, multi-step operations in the KOO Superdev project. It features:

- **Scope-Based Access Control**: Separate admin/user permission models
- **Auto-Workflow Engine**: Intelligent parallel execution with error recovery
- **Self-Tuning Optimization**: Learns from past executions to improve performance
- **Best Practices Framework**: Enforced code quality, security, performance standards
- **3-Tier Error Recovery**: Graceful fallback with checkpoint restoration

## Configuration Files

All agent configuration is organized in `.github/`:

```
.github/
├── agents/
│   └── koo-agent-4.1.agent.md          # Main agent specification
├── instructions/
│   ├── koo-scope-enforcement.instructions.md    # Scope/permission model
│   ├── koo-auto-workflow.instructions.md        # Execution engine
│   └── koo-best-practices.instructions.md       # Quality standards
└── hooks/
    └── koo-agent-4.1.hooks.json               # Automation hooks
```

Plus:
- `copilot-instructions.md` - Root-level agent configuration
- `agent.config.json` - Structured agent settings

## Quick Start

### For Users

```bash
# Single operation
koo-agent "build and test"

# Auto-optimize
koo-agent "/refine"

# Request admin access
koo-agent "deploy to production"  # Will guide through escalation
```

### For Admins

```bash
# Production deployment
KOO_SCOPE=admin koo-agent "deploy to production"

# Infrastructure automation
KOO_SCOPE=admin koo-agent "scale kubernetes cluster"

# Emergency incident response
KOO_SCOPE=admin koo-agent "debug production 500 error"
```

## Scope Model

### User Scope (Default)

```
✅ ALLOWED:
  • Read any file
  • Write to src/ and docs/
  • Terminal: npm, git, build, test
  • Dev/staging deployments
  • View non-sensitive documentation

❌ BLOCKED:
  • Modify configuration files
  • Production deployments
  • Access production secrets
  • Infrastructure changes
  • Database schema changes
```

### Admin Scope

```
✅ ALLOWED:
  • Full file system access
  • Any terminal command
  • Production deployments
  • Secret rotation
  • Infrastructure provisioning
  • Database schema changes
  • Emergency incident response
```

## Auto-Workflow Features

### Automatic Activation

The agent auto-activates when it detects:
- 3+ sequential operations (multi-step workflow)
- `/refine` command (optimization mode)
- Complex system optimization
- Team workflow coordination

### Execution Modes

```
Sequential Mode: Operations run 1→2→3→4→5
Parallel Mode: Independent operations run concurrently
Adaptive Mode: Auto-select based on system load
```

### Error Recovery (3-Tier)

```
Tier 1: Local Retry (1-2 attempts)
  → Network timeouts, transient errors
  → Backoff: 1s → 2s

Tier 2: Checkpoint Restore (1 attempt)
  → Partial failures, state issues
  → Restore from checkpoint + retry

Tier 3: Manual Escalation
  → Unrecoverable errors
  → Creates diagnostic report
  → Escalates to admin
```

## Best Practices Enforced

### Code Quality

- ✅ TypeScript strict mode
- ✅ Test coverage minimum (60% new code, 80% core)
- ✅ ESLint + Prettier formatting
- ✅ No `any` types or unhandled promises

### Security

- ✅ No hardcoded secrets
- ✅ Input validation on all endpoints
- ✅ RBAC enforced
- ✅ Secrets rotation (90-day cycle)
- ✅ HTTPS/TLS 1.2+ required

### Performance

- ✅ API response time < 100ms
- ✅ Bundle size < 500KB (gzipped)
- ✅ Page load < 1s
- ✅ Build time < 5min
- ✅ Query time < 100ms

### Reliability

- ✅ Circuit breaker pattern
- ✅ Exponential backoff for retries
- ✅ Health checks on deployment
- ✅ Monitoring and alerting
- ✅ Post-incident reviews

## Automation Hooks

The agent uses hooks to enforce best practices automatically:

```
Pre-Tool: Validate scope before execution
Pre-Tool: Require approval for production
Pre-Tool: Scan for secrets before commit
Post-Tool: Auto-format code after creation
Post-Tool: Run tests for coverage validation
Post-Tool: Check performance budget after build
```

See `.github/hooks/koo-agent-4.1.hooks.json` for full list.

## Common Workflows

### Workflow 1: Build & Test (User)

```bash
$ koo-agent "build and test the app"
✅ Auto-Workflow detected: 5-step sequence
  ├─ Type-check TypeScript
  ├─ Run unit tests
  ├─ Lint code
  ├─ Build production bundle
  └─ Validate performance

✅ All tests passed, coverage: 68%
✅ Build time: 3:45 (optimized)
✅ Checkpoints saved at each step
```

### Workflow 2: Optimize Pipeline (Admin)

```bash
$ KOO_SCOPE=admin koo-agent "/refine"
✅ Optimization mode activated
  ├─ Profile current deployment
  ├─ Identify bottlenecks
  ├─ Suggest parallelization
  ├─ Implement improvements
  └─ Validate zero-downtime

✅ Deployment improved: 5min → 3.2min (36% faster)
```

### Workflow 3: Incident Response (Admin)

```bash
$ KOO_SCOPE=admin koo-agent "debug production spike"
✅ Emergency mode activated
  ├─ Collect diagnostics
  ├─ Analyze error logs
  ├─ Identify root cause
  ├─ Execute mitigation
  └─ Document incident

✅ Incident resolved in 3 minutes
```

## Environment Variables

```bash
# Set scope (default: user)
export KOO_SCOPE=admin

# Disable auto-workflow for single operation
export KOO_AUTO_WORKFLOW=false

# Enable emergency mode
export KOO_EMERGENCY=true

# Set log level
export KOO_LOG_LEVEL=debug
```

## Monitoring & Metrics

View agent execution metrics:

```bash
# View ongoing operations
koo workflow --status

# View execution history
koo workflow --history --limit 10

# View optimization learnings
koo workflow --learn --task deploy

# View audit log
koo audit --agent koo-agent-4.1
```

## Troubleshooting

### Agent not auto-activating

```bash
# Check if disabled
echo $KOO_AUTO_WORKFLOW

# Re-enable
export KOO_AUTO_WORKFLOW=true

# Or explicitly invoke
koo-agent "your task" --auto-workflow=true
```

### Scope enforcement blocking operation

```bash
# Check current scope
echo $KOO_SCOPE

# Request admin access
koo-agent "operation" --request-scope=admin

# (Admin can approve escalation)
KOO_SCOPE=admin koo-agent "operation"
```

### Operation failed in Tier 2

```bash
# Check checkpoint status
koo workflow --checkpoints

# Restore from checkpoint
koo workflow --restore pre-deploy

# Or reset and retry
koo workflow --reset
```

## Best Practices for Team

### For All Team Members

1. **Read the Configuration**
   - Start with `copilot-instructions.md`
   - Review scope model in `.github/instructions/koo-scope-enforcement.instructions.md`

2. **Use Auto-Workflow**
   - Let the agent optimize multi-step operations
   - Use `/refine` for performance optimization

3. **Follow Standards**
   - Check `.github/instructions/koo-best-practices.instructions.md`
   - Run tests before pushing code
   - Use conventional commits

4. **Report Issues**
   - Create issues in GitHub
   - Include error logs and context
   - Tag with `agent` label

### For Admins

1. **Approve Scope Escalations**
   - Review escalation requests promptly
   - Document approvals in audit log

2. **Monitor Metrics**
   - Check weekly execution metrics
   - Review error patterns
   - Optimize based on learnings

3. **Update Configuration**
   - Review and update scope rules quarterly
   - Adjust performance targets as needed
   - Document changes in CHANGELOG

4. **Security**
   - Rotate secrets on schedule
   - Review audit logs monthly
   - Validate security best practices

## Support & Documentation

- **Main Config**: `copilot-instructions.md`
- **Scope Model**: `.github/instructions/koo-scope-enforcement.instructions.md`
- **Auto-Workflow**: `.github/instructions/koo-auto-workflow.instructions.md`
- **Best Practices**: `.github/instructions/koo-best-practices.instructions.md`
- **Hooks Config**: `.github/hooks/koo-agent-4.1.hooks.json`
- **Team Guidelines**: `CONTRIBUTING.md`
- **Security**: `SECURITY.md`

## Next Steps

1. ✅ Read `copilot-instructions.md`
2. ✅ Review your scope model (user vs admin)
3. ✅ Try a simple task: `koo-agent "npm run test"`
4. ✅ Try auto-optimization: `koo-agent "/refine"`
5. ✅ Read team guidelines in `CONTRIBUTING.md`

---

**Questions?** Create an issue in the repository and tag with `agent` label.

**Want to extend?** See agent configuration files for customization options.

**Last updated**: 2024-05-11
