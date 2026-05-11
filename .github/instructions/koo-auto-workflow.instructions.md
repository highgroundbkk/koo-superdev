---
name: "KOO Auto-Workflow Configuration"
description: "Enable autonomous workflow execution for KOO-AGENT4.1. WHEN: multi-step operations detected, critical path optimization requested (/refine), or team workflows coordinated. Enables self-tuning, error recovery, and performance optimization."
applyTo: "**"
---

# KOO Auto-Workflow Configuration

## Overview

Auto-Workflow mode enables **autonomous, self-optimizing execution** for complex multi-step operations. The agent:

- 🎯 **Plans** multi-step sequences intelligently
- 🔄 **Executes** with automatic error recovery (3-tier fallback)
- 📊 **Learns** from past executions and improves
- 🚀 **Optimizes** performance based on execution patterns
- 📝 **Tracks** state across failures with checkpoints

## Activation Conditions

Auto-workflow activates automatically when ANY of these triggers fire:

### Trigger 1: Multi-Step Operation Detected

```
User: "Build, test, and deploy the app"
  ↓ Agent detects: 3+ sequential operations
  ✅ Auto-workflow activates
  ✅ Creates execution plan (6 steps)
  ✅ Executes with recovery checkpoints
```

### Trigger 2: /refine Command

```
User: "/refine"
  ↓ Agent: "Analyze current task"
  ✅ Auto-workflow: Optimization mode
  ✅ Explores faster variants
  ✅ Reports improvements
```

### Trigger 3: Critical Path Optimization

```
User: "optimize the CI/CD pipeline"
  ↓ Agent detects: Complex system optimization
  ✅ Auto-workflow: Profiling mode
  ✅ Measures 15+ metrics
  ✅ Recommends parallelization
```

### Trigger 4: Team Workflow Coordination

```
Multiple operations on shared resources:
  - Merge conflicts detected
  - Multiple branch updates
  - Concurrent deployments
  ↓ Agent detects: Coordination needed
  ✅ Auto-workflow: Serialization mode
  ✅ Locks resources
  ✅ Sequences operations safely
```

## Execution Flow

```
Start: User Request
  ↓
[PLAN PHASE]
  ├─ Parse request into operations
  ├─ Detect dependencies
  ├─ Identify parallelizable steps
  ├─ Create execution plan (DAG)
  └─ Estimate duration
  ↓
[CHECKPOINT PHASE]
  ├─ Save initial state
  ├─ Create recovery snapshots
  ├─ Lock shared resources
  └─ Ready recovery system
  ↓
[EXECUTION PHASE]
  ├─ Execute step 1 → checkpoint
  ├─ Execute step 2 → checkpoint
  ├─ Execute step 3 → checkpoint
  └─ ... repeat for all steps
  ↓
[RECOVERY PHASE - on failure]
  ├─ Tier 1: Retry current step (1-2 attempts)
  ├─ Tier 2: Restore from checkpoint + retry
  ├─ Tier 3: Escalate to admin
  └─ Report diagnostics
  ↓
[OPTIMIZATION PHASE]
  ├─ Measure execution metrics
  ├─ Compare vs. baseline
  ├─ Identify slowdowns
  ├─ Suggest parallelization
  └─ Save learnings
  ↓
Complete: Report Results
```

## Execution Modes

### Mode 1: Sequential Execution

**Use case**: Operations with strong dependencies or state mutations

```
Operations:
  1. Clone repository
  2. Install dependencies
  3. Run tests
  4. Build application
  5. Deploy

Execution: 1 → 2 → 3 → 4 → 5 (strictly sequential)
Estimated time: 15 minutes
Recovery: After each step checkpoint
```

### Mode 2: Parallel Execution

**Use case**: Independent operations without conflicts

```
Operations:
  1. Build Docker image
  2. Run security scan
  3. Generate documentation
  4. Run unit tests
  5. Run integration tests

Execution:
  [1, 2, 3] run in parallel
  [4, 5] run in parallel after [1]
  
Parallelism: 3 concurrent tasks
Estimated time: 8 minutes (vs 15 sequential)
Speedup: 1.875x faster ✅
```

### Mode 3: Smart Sequencing

**Use case**: Mixed dependencies with some parallelization

```
Operations:
  1. Setup environment
  2. Install npm deps
  3. Build TypeScript + Run linter (parallel)
  4. Unit tests + Integration tests (parallel)
  5. Generate coverage report

Graph:
  1 → 2 → [3a, 3b] → [4a, 4b] → 5

Estimated time: 10 minutes (vs 15 sequential)
Efficiency: ~33% faster than sequential
```

### Mode 4: Adaptive Execution

**Use case**: Dynamic mode selection based on system load

```
System state check:
  - CPU: 40% utilization → OK for parallel
  - Memory: 60% available → Can run 2 concurrent tasks
  - Disk I/O: Normal → No throttling needed
  
Auto-select: Parallel mode (2 concurrent tasks)
Adjust: Monitor and throttle if needed
```

## Error Recovery Strategy

### Tier 1: Local Retry (Fast)

**When**: Transient failures that might recover

```
Error: "ENOTFOUND registry.npmjs.org"
  ↓ Classification: Network transient
  ✅ Action: Retry immediately (backoff: 1s)
  ✅ Attempt 2: Success → Continue
  
Recovery time: < 5 seconds
Success rate: 75%
```

**Applies to**:
- Network timeouts / connection refused
- DNS resolution failures
- Rate limit (429 Too Many Requests)
- Port already in use (EADDRINUSE)
- Temporary lock conflicts

### Tier 2: Checkpoint Restoration (Medium)

**When**: Tier 1 fails or state corruption suspected

```
Error: "npm ERR! code ERESOLVE dependency conflict"
  ↓ Classification: Partial failure (deps installed, some broken)
  ↓ Action 1: Save current package-lock.json
  ↓ Action 2: Restore from last clean checkpoint
  ↓ Action 3: Retry with different strategy
  ✅ Attempt 2: Clean install + upgrade → Success
  
Recovery time: 30-60 seconds
Success rate: 60%
```

**Applies to**:
- Dependency resolution conflicts
- Partial build failures
- Git merge conflicts
- Configuration parsing errors
- Schema validation failures

### Tier 3: Escalation (Manual)

**When**: Tier 1 and 2 both fail (unrecoverable)

```
Error: "EACCES permission denied /var/www/app"
  ↓ Classification: Unrecoverable (permission issue)
  ✅ Action 1: Collect diagnostics
  ✅ Action 2: Create incident report
  ✅ Action 3: Escalate to admin
  
Report includes:
  - Error message + stack trace
  - Last successful state
  - Failed operation details
  - Suggested solutions
  - Escalation path
```

**Applies to**:
- Permission denied (EACCES, EPERM)
- Authentication failures
- Authorization failures (forbidden)
- Unrecoverable system state
- Manual decision required

## Checkpoint System

### Automatic Checkpoints

Agent creates checkpoints at these points:

```
Before: [Risky Operation]
  ├─ Save file system state
  ├─ Save environment variables
  ├─ Save process state
  ├─ Create timestamp snapshot
  └─ Compute checksum

After: [Risky Operation] ✅ Success
  ├─ Mark checkpoint as "clean"
  ├─ Keep for 24 hours
  └─ Enable recovery within 24h

On Failure:
  ├─ Stop execution immediately
  ├─ Mark checkpoint as "dirty"
  ├─ Revert to clean checkpoint
  └─ Retry from checkpoint
```

### Manual Checkpoint Save

User can explicitly create checkpoints:

```
User: "/checkpoint save --name pre-deploy"
  ↓ Agent: Creates named checkpoint
  ✓ Checkpoint saved as: pre-deploy
  ✓ Size: 2.4 MB
  ✓ TTL: 7 days
```

### Checkpoint Storage

```
Location: ~/.koo/checkpoints/
Naming: {operation}_{timestamp}_{checksum}

Example:
  deploy_1715402456_a3f9e2.tar.gz    (2.4 MB)
  build_1715401234_e8c2d1.tar.gz     (1.8 MB)
  test_1715400012_b7f4c3.tar.gz      (900 KB)

Retention: 5 most recent per operation
Max storage: 50 MB total
```

## Self-Tuning / Learning System

### Baseline Collection (First Run)

```
First execution of task X:
  ├─ Measure: Execution time (12:34 minutes)
  ├─ Measure: Success rate (80% - 1 failure out of 5 steps)
  ├─ Measure: Peak memory (2.4 GB)
  ├─ Measure: Tool usage (npm: 8 calls, git: 3 calls)
  └─ Save as: Baseline for task X
```

### Learning Iteration (Sessions 2-5)

```
Session 1: Baseline = 12:34 minutes, 80% success
Session 2: Observed = 11:22 minutes, 100% success (+9% faster)
  └─ Diff: Skipped redundant npm cache clear
Session 3: Observed = 10:45 minutes, 100% success (+15% faster)
  └─ Diff: Parallelized independent test suites
Session 4: Observed = 10:45 minutes, 100% success (plateau)
  └─ Status: No further improvements found
Session 5: Continue monitoring for regressions
```

### Optimization Suggestions

Agent suggests optimizations:

```
After 5+ executions, agent reports:

"Task 'deploy' performance analysis:"
  Current baseline: 10:45 minutes
  Success rate: 100% (5/5 runs)
  Bottlenecks found:
    1. npm install: 5:30 (51%) → consider npm ci + cache
    2. Tests: 3:15 (30%) → parallelizable
    3. Build: 1:45 (16%) → OK
  
  Optimization opportunities:
    • Use npm ci instead of npm install (-45 sec)
    • Parallelize test suites (-1:20 min)
    • Cache node_modules in CI (-2:00 min)
    
  Estimated improvement: -3:40 minutes (36% faster)
  Would optimize to: ~7:00 minutes
```

## Configuration Parameters

### Timing

```yaml
# Task execution timeout
maxExecutionTimeMs: 300000          # 5 minutes (default)
maxExecutionTimeMs: 600000          # 10 minutes (CI/CD)

# Checkpoint management
checkpointIntervalMs: 60000         # Save checkpoint every 1 min
checkpointMaxRetentionMs: 86400000  # Keep for 24 hours
checkpointMaxSize: 52428800         # 50 MB max storage
```

### Retry Strategy

```yaml
# Tier 1 - Local Retry
tier1_maxRetries: 2                 # Retry up to 2 times
tier1_backoffMs: 1000               # Initial: 1 second
tier1_backoffMultiplier: 2          # Exponential: 1s → 2s

# Tier 2 - Checkpoint Restore
tier2_maxRetries: 1                 # Try once with checkpoint
tier2_backoffMs: 3000               # Wait 3s before restore
tier2_backoffMultiplier: 1          # No exponential for tier 2

# Tier 3 - Escalation
tier3_timeout: 300000               # Wait 5 min for admin response
```

### Parallelization

```yaml
# Auto-parallelization
enableParallelization: true         # Auto-detect parallelizable steps
maxConcurrentTasks: 4               # Run up to 4 tasks in parallel
parallelizeThreshold: 3             # Need 3+ independent ops to parallelize

# Adaptive parallelization
adaptiveMode: true                  # Adjust based on system load
cpuThreshold: 70%                   # Don't parallelize if CPU > 70%
memoryThreshold: 80%                # Don't parallelize if memory > 80%
```

### Optimization

```yaml
# Self-tuning
enableLearning: true                # Auto-learn from executions
baselineThreshold: 5                # Need 5 runs to establish baseline
optimizationThreshold: 10%          # Only optimize if > 10% improvement found

# Profiling
enableProfiling: true               # Collect detailed metrics
profilingInterval: 100ms            # Sample every 100ms
metricsRetention: 30d               # Keep metrics for 30 days
```

## Disable Auto-Workflow

For manual execution, disable auto-workflow:

```bash
# Disable for single operation
KOO_AUTO_WORKFLOW=false koo-agent "build and test"

# Disable temporarily in session
export KOO_AUTO_WORKFLOW=false

# Disable indefinitely
koo config set auto-workflow disabled
```

## Monitoring Auto-Workflow

```bash
# View ongoing auto-workflow
koo workflow --status

# View execution history
koo workflow --history --limit 10

# View optimization learnings
koo workflow --learn --task deploy

# View checkpoint status
koo workflow --checkpoints
```

---

**Status**: ✅ Active | **Version**: 4.1.0 | **Mode**: Adaptive
