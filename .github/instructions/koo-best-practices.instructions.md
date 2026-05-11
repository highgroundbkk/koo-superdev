---
name: "KOO Best Practices Framework"
description: "Enforce best practices for KOO Superdev development. WHEN: writing code, creating features, deploying, or managing infrastructure. Covers code quality, security, performance, reliability, and team collaboration standards."
applyTo: "**/*.ts,**/*.js,**/Dockerfile,**/*.json,**/*.yml,**/*.yaml"
---

# KOO Best Practices Framework

## Code Quality Standards

### TypeScript / JavaScript

#### ✅ ALWAYS DO

```typescript
// 1. Use strict TypeScript
//    ✅ Recommended: tsconfig.json
"strict": true,
"noImplicitAny": true,
"noImplicitThis": true,
"strictNullChecks": true,
"strictFunctionTypes": true

// 2. Type all function parameters and returns
✅ function processData(items: string[]): Promise<Result[]> { ... }
❌ function processData(items): any { ... }

// 3. Use const over let/var
✅ const config = { timeout: 5000 };
❌ let config = { timeout: 5000 };
❌ var config = { timeout: 5000 };

// 4. Arrow functions for consistency
✅ const handler = (event: Event) => { ... }
❌ const handler = function(event) { ... }

// 5. Template literals for string interpolation
✅ const msg = `User ${name} logged in at ${time}`;
❌ const msg = "User " + name + " logged in at " + time;

// 6. Async/await over .then()
✅ const data = await fetchData();
❌ fetchData().then(data => { ... });

// 7. Error handling with try/catch
✅ try { ... } catch (error) { log(error); }
❌ No error handling or silent failures
```

#### ❌ NEVER DO

```typescript
// 1. use 'any' type (breaks type safety)
❌ const data: any = response.json();
✅ interface ResponseData { ... }
✅ const data: ResponseData = response.json();

// 2. Floating promises
❌ fetchData(); // Promise not awaited
✅ await fetchData();
✅ void fetchData(); // Intentional fire-and-forget

// 3. Unhandled promise rejections
❌ fetchData().catch(() => {}); // Silent failure
✅ fetchData().catch(error => logger.error(error));

// 4. Logic in module top-level
❌ // In main.ts file scope
   const users = await db.query("SELECT * FROM users");

✅ // Wrapped in function
   async function loadUsers() { return db.query(...); }

// 5. Mutation of input parameters
❌ function addUser(list: User[]) { list.push(...); } // Mutates input
✅ function addUser(list: User[]): User[] { return [...list, ...]; } // Returns new
```

#### Code Review Checklist

- [ ] All functions have type annotations
- [ ] No `any` types used (except deliberate escape hatches)
- [ ] Error handling implemented (try/catch or .catch())
- [ ] No console.log in production code (use logger)
- [ ] Comments explain "why" not "what"
- [ ] Complexity < O(n²) or justified with comment
- [ ] Duplicate code < 3 instances (refactor to util)
- [ ] Tests added for new functionality

---

### Testing Standards

#### Test Coverage Minimums

```
- New code: 60% minimum
- Core modules: 80% minimum
- Critical paths: 95% minimum
- Infrastructure code: 100% required
```

#### Test Structure

```typescript
// ✅ Good: Clear describe/test structure
describe("UserService", () => {
  describe("createUser", () => {
    it("should create user with valid input", () => { ... });
    it("should reject user with invalid email", () => { ... });
    it("should hash password before storing", () => { ... });
  });
});

// ❌ Bad: Unclear test names
describe("Test", () => {
  it("test1", () => { ... });
  it("should work", () => { ... });
});
```

#### Test Types

```
Unit tests:
  - Pure functions
  - Logic with minimal dependencies
  - Target: 80% of tests

Integration tests:
  - Database operations
  - API endpoints
  - Service interactions
  - Target: 15% of tests

E2E tests:
  - User workflows
  - Critical business flows
  - Target: 5% of tests
```

---

## Security Standards

### 1. Secrets Management

#### ✅ ALWAYS DO

```
- Store secrets in environment variables (dev: .env.local)
- Use Key Vault for production secrets
- Rotate secrets every 90 days
- Never commit .env or secrets files
```

#### ❌ NEVER DO

```
❌ Hardcode API keys: const API_KEY = "sk-abc123...";
❌ Commit .env file to git
❌ Log sensitive data: console.log(token);
❌ Send secrets in URLs: https://api.com?token=secret
```

### 2. Input Validation

#### ✅ ALWAYS DO

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
  name: z.string().min(1).max(100),
});

// Validate input
const validateUser = (data: unknown) => {
  return UserSchema.parse(data); // Throws on invalid
};
```

#### ❌ NEVER DO

```typescript
❌ function createUser(data: any) { db.insert(data); }
✅ function createUser(data: User) { db.insert(data); }
```

### 3. Authentication & Authorization

- [ ] All endpoints require authentication
- [ ] JWT tokens have short expiry (15-60 min)
- [ ] Refresh tokens stored securely (httpOnly cookies)
- [ ] RBAC enforced at API level
- [ ] Scope validation on each request

### 4. SQL Injection Prevention

```typescript
// ✅ Use parameterized queries
const users = await db.query(
  'SELECT * FROM users WHERE email = ?',
  [email]
);

// ❌ NEVER string concatenation
const users = await db.query(
  `SELECT * FROM users WHERE email = '${email}'` // SQL injection!
);
```

### 5. HTTPS & TLS

- [ ] All communication over HTTPS (TLS 1.2+)
- [ ] HSTS header enabled
- [ ] Certificate validation enforced
- [ ] Cert renewal automated

---

## Performance Standards

### 1. Response Time Goals

| Operation | Target | Acceptable | Unacceptable |
|-----------|--------|------------|-------------|
| API response | < 100ms | < 500ms | > 1s |
| Page load | < 1s | < 3s | > 5s |
| Build time | < 5min | < 10min | > 15min |
| Test suite | < 1min | < 5min | > 10min |

### 2. Bundle Size Limits

```
- Main bundle: < 500 KB (gzipped)
- Vendor bundle: < 300 KB (gzipped)
- Total: < 1 MB (gzipped)
```

### 3. Memory Usage

```
- Node.js process: < 300 MB (dev), < 500 MB (prod)
- Docker image: < 200 MB (base) + code
- Heap: Monitor for leaks (steady state)
```

### 4. Database Performance

```
- Query time: < 100ms (p50), < 500ms (p99)
- Indexing: All WHERE clauses on indexed columns
- N+1 queries: Eliminated via JOIN or batching
- Connection pool: Sized for peak load + 20% headroom
```

### 5. Profiling Checklist

- [ ] Measure before optimizing (no premature optimization)
- [ ] Identify bottleneck (usually not where you think)
- [ ] Optimize one thing at a time
- [ ] Measure improvement (target: > 10% gain)
- [ ] Document optimization decisions
- [ ] Add performance test to prevent regression

---

## Reliability & Deployment

### 1. Error Handling

#### ✅ ALWAYS DO

```typescript
// 1. Catch all errors
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', { error, context });
  metrics.increment('operation.error');
  throw new CustomError('User-friendly message', { cause: error });
}

// 2. Distinguish error types
try {
  await dbQuery();
} catch (error) {
  if (error instanceof ValidationError) { /* user error */ }
  if (error instanceof DatabaseError) { /* retry */ }
  if (error instanceof AuthError) { /* escalate */ }
}

// 3. Implement circuit breaker
const circuitBreaker = new CircuitBreaker(async () => {
  return await externalService.call();
});
```

#### ❌ NEVER DO

```typescript
❌ Ignore errors: await operation(); // No error handling
❌ Silent failures: catch (e) {} // Swallow error
❌ Generic errors: throw new Error('Error');
```

### 2. Deployment Safety

- [ ] Feature flags for gradual rollout (5% → 25% → 100%)
- [ ] Blue-green deployment for zero downtime
- [ ] Rollback plan (keep previous version running)
- [ ] Health checks validate deployment success
- [ ] Monitoring active during and after deployment

### 3. Database Migrations

- [ ] Always backward compatible (deploy code first, migrate data)
- [ ] Test migration on prod data clone first
- [ ] Have rollback plan
- [ ] Zero-downtime migration technique
- [ ] Validate data integrity post-migration

### 4. Monitoring & Alerting

```
Metrics to track:
  - Error rate (target: < 0.1%)
  - Latency (p50, p95, p99)
  - Throughput (requests/sec)
  - CPU/Memory/Disk usage
  - Database connection pool
  
Alerts when:
  - Error rate > 1%
  - Latency p99 > 1s
  - CPU > 80%
  - Memory > 85%
  - Disk > 90%
```

---

## Team Collaboration

### 1. Code Review

- [ ] Every change requires at least 1 review
- [ ] Reviews within 24 hours (SLA)
- [ ] Reviewer checks: tests, security, perf, style
- [ ] Use GitHub PR templates
- [ ] Squash commits on merge (clean history)

### 2. Commit Messages

#### ✅ Good format

```
feat: add user authentication service

- Implement JWT token generation
- Add password hashing with bcrypt
- Add refresh token rotation
- Add integration tests for auth flow

Fixes #123
```

#### ❌ Bad format

```
❌ updated stuff
❌ fix bug
❌ wip
❌ asdf
```

### 3. Branch Strategy

```
- main: Production-ready code only
- staging: Pre-production testing
- dev: Development branch (integration point)
- feature/ISSUE-ID: Individual features
- hotfix/ISSUE-ID: Production fixes
```

### 4. Documentation

- [ ] README updated with any new setup steps
- [ ] CONTRIBUTING.md reflects current process
- [ ] API documented (OpenAPI/Swagger)
- [ ] Architecture documented (README → /docs)
- [ ] Runbooks for common ops tasks

---

## Automated Enforcement

### Pre-commit Hooks

```bash
# .husky/pre-commit
npm run type-check      # TypeScript compilation
npm run lint            # ESLint + Prettier
npm run test --bail     # Tests (stop on first failure)
```

### CI/CD Pipeline

```yaml
# GitHub Actions
on: [pull_request, push]

jobs:
  quality:
    - Run: npm run type-check
    - Run: npm run lint
    - Run: npm run test --coverage
    - Fail if: Coverage < 60%
    
  security:
    - Run: npm audit
    - Run: trivy scan Dockerfile
    - Fail if: Critical vulnerabilities
    
  performance:
    - Run: npm run build
    - Check: Bundle size < 500KB
    - Fail if: Size increased > 10%
```

### Manual Validation

```bash
# Before merge
npm run type-check      # ✅ No type errors
npm run lint            # ✅ No linting errors
npm run test            # ✅ All tests pass
npm run build           # ✅ Production build works
npm audit               # ✅ No vulnerabilities
```

---

## Improvement Cycle

### Weekly Review

```
Every Friday:
  1. Review metrics (errors, perf, uptime)
  2. Check for performance regressions
  3. Review security audit results
  4. Celebrate wins, plan improvements
  5. Update team docs
```

### Monthly Optimization

```
Every month:
  1. Profile production performance
  2. Analyze error logs for patterns
  3. Update dependencies
  4. Refactor bottlenecks (if > 10% gain possible)
  5. Plan for next month
```

---

**Status**: ✅ Active | **Version**: 4.1.0 | **Enforcement**: Automated + Manual
