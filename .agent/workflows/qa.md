---
description: Quality Assurance Loop
---

# 🧪 Quality Assurance Loop (QA)

**Objective**: Ensure zero regressions and compliance with Performance/Security standards.

## 1. Inputs

- Completed Feature Branch
- `docs/PLAN-[ID].md` (Reference)

## 2. Process (The Loop)

### Phase A: Static Analysis

1. **Lint**: `npm run lint`
2. **Types**: `npm run type-check`
3. **Circular Deps**: `npx madge --circular src/`

### Phase B: Dynamic Analysis

1. **Unit Tests**: `npm run test`
2. **E2E Tests**: `npm run test:e2e` (if applicable)
3. **Build**: `npm run build` (Must be clean)

### Phase C: Audits (MCP)

1. **Perf**: Chrome DevTools MCP (Lighthouse)
2. **Security**: `npm audit`

## 3. Execution Layer Scripts

- `npm run test:ci`
- `npm run build:analyze`

## 4. Exit Criteria

- [ ] All Tests Pass.
- [ ] Build Pass.
- [ ] No High/Critical Vulnerabilities.

## 5. Artifacts

- `docs/QA-REPORT-[ID].md`

## 6. Logs

- QA Sign-off validation.
