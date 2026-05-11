---
name: "KOO Scope Enforcement"
description: "Enforce admin vs user scope restrictions for KOO-AGENT4.1. WHEN: executing any operation in koo-superdev, check user scope before allowing file mutations, terminal access, deployment, or security operations."
applyTo: "**"
---

# KOO Scope Enforcement Rules

## Quick Reference

| Operation | Admin | User | Action |
|-----------|-------|------|--------|
| Read files | ✅ Any | ✅ Any | Allow |
| Write files | ✅ Any | ✅ src/**/*.ts only | Restrict |
| Terminal | ✅ Any | ✅ npm run / git / build | Restrict |
| Deploy | ✅ Prod/Staging | ✅ Staging/Dev only | Restrict |
| Security | ✅ Any | ❌ None | Block |
| Git Force | ✅ Any branch | ❌ main only | Block |

## Scope Detection

Before executing any potentially restricted operation, ask: **"What is the current user scope?"**

### Auto-Detect Scope From:

1. **Environment Variable**: `$KOO_SCOPE` = `admin` | `user` (default: `user`)
2. **Git Config**: `git config koo.scope` = `admin` | `user`
3. **Prompt Context**: User explicitly states "I'm an admin" or "user access"
4. **Default**: When unknown, assume `user` (principle of least privilege)

### Force Scope Change

Users can explicitly request scope escalation:

```
User: "I need admin scope to deploy to production"
  ↓ Agent: "Understood. Operations require admin scope."
  ↓ Agent: "Set environment: export KOO_SCOPE=admin"
  ✅ Agent: Proceeds with admin operations
```

## File Operation Rules

### USER Scope - File Write Restrictions

**ALLOWED**:
- `/src/**/*.ts` - Application source code
- `/tests/**/*` - Test files
- `/docs/**/*.md` - Documentation
- `/scripts/**/*.sh` - Scripts (non-destructive)
- `.env.local` - Local environment file

**BLOCKED**:
- `/dist/**` - Compiled output (auto-generated)
- `/node_modules/**` - Dependencies
- `package.json` - Dependencies manifest
- `.npmrc` - NPM configuration
- `/.github/**` - CI/CD workflows
- `/agent.config.json` - Agent configuration
- Any root-level `.` files (`.gitignore`, `.env`, etc.)

### ADMIN Scope - File Write Permissions

**ALLOWED**:
- ✅ All files, all directories, no restrictions
- ✅ Configuration files, scripts, CI/CD
- ✅ Deployment automation

## Terminal Operation Rules

### USER Scope - Command Restrictions

**ALLOWED** (Run these safely):
```bash
npm run build          # ✅ Build TypeScript
npm run test           # ✅ Run tests
npm run dev            # ✅ Dev server
git status             # ✅ Check status
git commit -m "msg"    # ✅ Commit work
git push origin        # ✅ Push to feature branch
git checkout -b feat   # ✅ Create branch
```

**BLOCKED** (Require admin):
```bash
npm publish            # ❌ Release to registry
rm -rf                 # ❌ Destructive delete
DROP TABLE             # ❌ Database mutation
git reset --hard       # ❌ Destructive git
git push --force       # ❌ Force push
kubectl delete         # ❌ Cluster mutation
az deployment create   # ❌ Infrastructure change
```

### ADMIN Scope - Command Permissions

**ALLOWED**:
- ✅ Any shell command
- ✅ npm publish, yarn publish
- ✅ Destructive operations (with confirmation)
- ✅ Infrastructure deployments
- ✅ Database schema changes
- ✅ Kubernetes cluster operations

## Deployment Rules

### USER Scope - Environment Restrictions

**ALLOWED**:
- ✅ Dev environment deployments
- ✅ Staging deployments (read-only verification)
- ✅ PR preview deployments

**BLOCKED**:
- ❌ Production deployments
- ❌ Production secret access
- ❌ Production database mutations
- ❌ Production infrastructure scaling

### ADMIN Scope - Deployment Permissions

**ALLOWED**:
- ✅ Any environment (dev, staging, prod)
- ✅ Emergency hotfixes
- ✅ Production scaling and configuration
- ✅ Infrastructure provisioning
- ✅ Secret rotation

**Safeguards**:
- ⚠️ Production changes require explicit confirmation
- ⚠️ Audit log created for all prod operations
- ⚠️ Canary deployment mandatory (5% → 25% → 100%)

## Security Operation Rules

### USER Scope - Security (View-Only)

**ALLOWED**:
- ✅ Read security policies
- ✅ View audit logs (non-sensitive)
- ✅ Read SECURITY.md
- ✅ View compliance documentation

**BLOCKED**:
- ❌ Rotate secrets
- ❌ Create/delete API keys
- ❌ Modify RBAC roles
- ❌ Access Key Vault
- ❌ Create signed artifacts
- ❌ Manage certificates

### ADMIN Scope - Security (Full Control)

**ALLOWED**:
- ✅ Rotate all secrets
- ✅ Create/revoke API keys
- ✅ Modify RBAC assignments
- ✅ Access Key Vault
- ✅ Sign releases
- ✅ Manage TLS certificates
- ✅ Emergency access control

## Git Operation Rules

### USER Scope - Git Restrictions

**ALLOWED**:
- ✅ `git checkout -b feature/name` - Create feature branch
- ✅ `git commit -m "msg"` - Commit work
- ✅ `git push origin feature/name` - Push to feature branch
- ✅ `git pull origin main` - Update from main
- ✅ `git rebase main` - Rebase on main (no force)

**BLOCKED**:
- ❌ `git push -f` - Force push anywhere
- ❌ `git push origin main` - Push directly to main
- ❌ `git reset --hard` - Destructive reset
- ❌ `git branch -D` - Force delete branch
- ❌ `git tag` - Create tags

### ADMIN Scope - Git Permissions

**ALLOWED**:
- ✅ Any git operation
- ✅ Force push (with confirmation)
- ✅ Direct main branch commits (release only)
- ✅ Tag creation and management
- ✅ Branch deletion and force operations

## Enforcement Mechanism

### Pre-Operation Check

Before executing any restricted operation:

```typescript
// Pseudocode
function checkScope(operation: string, scope: "admin" | "user") {
  const restrictions = SCOPE_RULES[operation];
  
  if (scope === "user" && !restrictions.allowUser) {
    throw new Error(`❌ Operation '${operation}' requires admin scope`);
  }
  
  return true; // ✅ Operation allowed
}
```

### Violation Handling

When user tries restricted operation:

1. **Detect**: Agent detects scope violation
2. **Block**: Prevent operation from executing
3. **Inform**: "Operation X requires admin scope"
4. **Suggest**: "Request admin access via [escalation process]"
5. **Alternative**: Offer read-only equivalent if available

### Escalation Process

User can request scope escalation:

```
User: "I need to deploy to production"
  ↓ Agent detects: Operation requires admin scope
  ↓ Agent responds: "This requires admin scope escalation"
  ↓ Agent offers: "Contact admin via [channel]"
  ↓ Admin can: koo-agent --scope admin [operation]
```

## Scope Override (Emergency Only)

**Temporary admin access** available for critical incidents:

```bash
# One-time admin operation
KOO_SCOPE=admin KOO_EMERGENCY=true koo-agent "fix critical bug in prod"

# Requires confirmation
# - Admin must be contacted
# - Incident must be documented
# - Post-incident review required
```

## Monitoring & Audit

All scope enforcement logged:

- `ALLOW`: User operation within allowed scope
- `BLOCK`: Attempted violation (logged with context)
- `ESCALATE`: User requested scope elevation
- `OVERRIDE`: Emergency admin access used

Query audit log:

```bash
koo audit --agent koo-agent-4.1 --scope user
koo audit --agent koo-agent-4.1 --violations-only
```

---

**Status**: ✅ Active | **Version**: 4.1.0 | **Enforcement**: Strict
