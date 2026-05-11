---
name: "KOO-AGENT4.1"
description: "Enterprise autonomous agent for KOO Superdev project. Advanced features: scope-based access control (admin/user), auto-workflow execution, error recovery, self-tuning optimization. USE WHEN: complex multi-step automation, infrastructure provisioning, security operations, performance optimization, deployment workflows, incident response."
---

# KOO-AGENT4.1 - Comprehensive Configuration

> **Status**: ✅ Active | **Version**: 4.1.0 (formerly GPT4.1)
> **Location**: Production-ready autonomous agent for koo-superdev
> **Scope**: Enterprise team collaboration with admin/user differentiation

## Quick Start

### For Users

```bash
# Single-step task
koo-agent "build the app"

# Multi-step autonomous workflow
koo-agent "/refine"         # Auto-optimize current task

# Request scope escalation
koo-agent "deploy to production"  # Will prompt for admin access
```

### For Admins

```bash
# Unrestricted admin operations
KOO_SCOPE=admin koo-agent "emergency production fix"

# Deploy with full permissions
KOO_SCOPE=admin koo-agent "scale kubernetes cluster"

# Infrastructure automation
KOO_SCOPE=admin koo-agent "migrate database schema"
```

## Configuration Files

All agent configuration organized in `.github/` for repository consistency:

### 1. **Agent Definition** 
- File: `.github/agents/koo-agent-4.1.agent.md`
- Purpose: Primary agent specification
- Contains: Model config, lifecycle, scope definitions, tool restrictions
- Status: ✅ Core configuration

### 2. **Scope Enforcement**
- File: `.github/instructions/koo-scope-enforcement.instructions.md`
- Purpose: Admin/user permission model
- Contains: File access rules, terminal restrictions, deployment rules
- Status: ✅ Permission model

### 3. **Auto-Workflow Engine**
- File: `.github/instructions/koo-auto-workflow.instructions.md`
- Purpose: Multi-step execution, recovery, optimization
- Contains: Execution modes, error recovery tiers, checkpointing, learning system
- Status: ✅ Execution engine

### 4. **Best Practices**
- File: `.github/instructions/koo-best-practices.instructions.md`
- Purpose: Code quality, security, performance, reliability
- Contains: TypeScript standards, testing, security, deployment safety
- Status: ✅ Quality framework

## Feature Summary

### 1. Scope-Based Access Control

```
┌─────────────────────────────────────────────────────────┐
│ User Scope (Limited)         Admin Scope (Full)         │
├─────────────────────────────────────────────────────────┤
│ ✅ Read any file             ✅ Modify any file         │
│ ✅ Write to src/             ✅ Delete files            │
│ ✅ Terminal: npm/git         ✅ Terminal: Any command   │
│ ✅ Dev deployments           ✅ Production deployments  │
│ ❌ Modify config             ✅ Modify config           │
│ ❌ Production secrets        ✅ Rotate all secrets      │
│ ❌ Infrastructure            ✅ Infrastructure access   │
└─────────────────────────────────────────────────────────┘
```

### 2. Auto-Workflow Engine

- ✅ **Automatic activation**: Detects multi-step operations
- ✅ **Parallel execution**: Runs independent tasks concurrently
- ✅ **Error recovery**: 3-tier fallback strategy
- ✅ **Checkpointing**: Saves state at each step
- ✅ **Self-learning**: Optimizes performance over time
- ✅ **Smart sequencing**: DAG-based dependency resolution

### 3. Error Recovery

```
Tier 1: Local Retry (1-2 attempts)
  → Transient errors (network, timeout)
  → Backoff: 1s → 2s

Tier 2: Checkpoint Restore (1 attempt)
  → Partial failures
  → Restore + retry strategy

Tier 3: Manual Escalation
  → Unrecoverable errors
  → Diagnostic report + admin notification
```

### 4. Best Practices Framework

- ✅ TypeScript strict mode enforcement
- ✅ Test coverage tracking (60% baseline, 80% core)
- ✅ Security scanning (secrets, dependencies, OWASP)
- ✅ Performance profiling (response time, bundle size)
- ✅ Reliability patterns (circuit breaker, backoff, monitoring)
- ✅ Team collaboration (code review, commit standards)

## Common Workflows

### Workflow 1: Feature Development (User)

```
User: "build and test my new feature"
  ↓ Auto-Workflow detects: 5-step sequence
  ├─ Step 1: Type-check TypeScript
  ├─ Step 2: Run unit tests (with coverage check)
  ├─ Step 3: Lint code
  ├─ Step 4: Build production bundle
  └─ Step 5: Validate performance budget
  
  ✅ All steps parallel where possible (2min total)
  ✅ Checkpoint saved after each step
  ✅ Coverage report: 68% ✓ (exceeds 60% minimum)
```

### Workflow 2: Deployment (Admin)

```
Admin: "/refine" (optimize current deployment)
  ↓ Auto-Workflow enters optimization mode
  ├─ Profile current deployment (15 metrics)
  ├─ Identify bottlenecks (blue-green lag + health check wait)
  ├─ Suggest parallelization (5 min → 3.2 min possible)
  ├─ Implement suggestions
  ├─ Validate zero-downtime achieved
  └─ Report improvements
  
  ✅ Deployment time reduced: 5min → 3.2min (36% faster)
```

### Workflow 3: Incident Response (Admin)

```
Admin: "debug production spike in 500 errors"
  ↓ Agent scope: admin (unrestricted)
  ├─ Check AppLens diagnostics
  ├─ Analyze logs for error pattern
  ├─ Identify root cause (memory leak detected)
  ├─ Suggest: Scale up + apply patch
  ├─ Request: Admin confirmation
  └─ Execute: Auto-scaling + pod restart
  
  ✅ Incident resolved in 3 minutes
```

## Integration Points

### GitHub Integration

```yaml
# Auto-load on GitHub operations
Triggers:
  - Pull request created → Load scope enforcement
  - Push to main → Load best practices validation
  - Issue created → Load workflow suggestions
  - Deployment started → Load safety checks
```

### CI/CD Integration

```yaml
# GitHub Actions
- Type checking: npm run type-check
- Linting: npm run lint
- Testing: npm run test --coverage
- Build: npm run build
- Performance: Check bundle size
- Security: npm audit + trivy
```

### Monitoring Integration

```yaml
# Real-time telemetry
Metrics collected:
  - Execution time per operation
  - Success/failure rates
  - Error patterns (recovery effectiveness)
  - User vs admin scope distribution
  - Tool usage frequency
  - Performance trends
```

## Configuration Tuning

### For Different Team Sizes

```yaml
# Small team (1-3 people)
maxConcurrentTasks: 2
requireApprovalForProduction: false
enableLearning: true
checkpointRetention: 7 days

# Medium team (4-10 people)
maxConcurrentTasks: 4
requireApprovalForProduction: true
enableLearning: true
checkpointRetention: 14 days

# Large team (10+ people)
maxConcurrentTasks: 8
requireApprovalForProduction: true
enableLearning: true
checkpointRetention: 30 days
requireCodeReview: true
```

### For Different Project Types

```yaml
# Microservices
parallelizeWhenPossible: true
maxExecutionTimeMs: 600000
enableAdaptiveExecution: true

# Monolith
parallelizeWhenPossible: false
maxExecutionTimeMs: 300000
enableAdaptiveExecution: false

# Data Pipeline
maxExecutionTimeMs: 1800000
enableCheckpoints: true
enableRecovery: true
```

## Troubleshooting

### Agent Not Activating

```bash
# Check if KOO_AUTO_WORKFLOW is disabled
echo $KOO_AUTO_WORKFLOW

# Re-enable if needed
export KOO_AUTO_WORKFLOW=true

# Or explicitly invoke
koo-agent "your task" --auto-workflow=true
```

### Scope Enforcement Blocking Operation

```bash
# Check current scope
echo $KOO_SCOPE   # Should be 'user' or 'admin'

# Request admin access
koo-agent "operation" --request-scope=admin

# Or set explicitly (if authorized)
export KOO_SCOPE=admin
```

### Auto-Workflow Failure in Tier 2

```bash
# Check checkpoint status
koo workflow --checkpoints

# Manually restore from specific checkpoint
koo workflow --restore pre-deploy

# Or start fresh
koo workflow --reset
```

## Performance Metrics

### Baseline Performance (Initial Run)

| Operation | Time | Success | Status |
|-----------|------|---------|--------|
| Build | 5:30 | 90% | Acceptable |
| Test | 3:15 | 95% | Good |
| Deploy | 8:45 | 85% | Baseline set |

### After Auto-Optimization (5+ runs)

| Operation | Time | Success | Improvement |
|-----------|------|---------|-------------|
| Build | 4:10 | 100% | -23% (npm ci) |
| Test | 1:50 | 100% | -43% (parallel) |
| Deploy | 6:20 | 100% | -28% (cache) |

**Total improvement: -31% faster, 100% success rate** ✅

## Security & Compliance

### Audit Logging

Every operation creates audit log entry:

```
Operation: File modification
Scope: user
File: src/app.ts
Timestamp: 2024-05-11T14:30:45Z
Approved: true
```

### Compliance Checklist

- ✅ RBAC enforced (admin/user scopes)
- ✅ Audit logging enabled (all operations)
- ✅ Secrets rotation configured (90-day cycle)
- ✅ Dependency scanning automated (weekly)
- ✅ Security testing in CI/CD (every commit)

## Next Steps

1. **Read Configuration**:
   - `.github/agents/koo-agent-4.1.agent.md` (main spec)
   - `.github/instructions/koo-scope-enforcement.instructions.md` (permissions)

2. **Understand Auto-Workflow**:
   - `.github/instructions/koo-auto-workflow.instructions.md` (execution)

3. **Learn Best Practices**:
   - `.github/instructions/koo-best-practices.instructions.md` (quality)

4. **Start Using**:
   ```bash
   koo-agent "build and test"          # Basic task
   koo-agent "/refine"                 # Optimize
   KOO_SCOPE=admin koo-agent "deploy"  # Admin operation
   ```

---

**For more details**: See individual configuration files in `.github/agents/` and `.github/instructions/`

**Questions?** Check `SECURITY.md` for incident response, `CONTRIBUTING.md` for team guidelines, or create an issue in the repository.

**Status**: ✅ Production-ready | **Version**: 4.1.0 | **Updated**: 2569-05-11
