# 🎭 Code Quality Refactor - Loki Execution Plan

**Created:** 2026-02-09T23:31:46-03:00  
**Mode:** Loki (Autonomous)  
**Agent:** Ghost Commander  
**Objective:** Comprehensive code quality improvements and refactoring

---

## 🎯 MISSION OVERVIEW

Execute a systematic code quality refactor covering:

1. **Type Safety** - Eliminate `any` types
2. **Component Decomposition** - Split large files (>250 lines)
3. **Dependency Cleanup** - Remove unused packages
4. **Import Optimization** - Clean and organize imports

---

## 📊 CURRENT STATE ANALYSIS

### Large Files (>250 lines)

| File | Lines | Priority | Action |
|------|-------|----------|--------|
| `LiquidEther.tsx` | 1,330 | HIGH | Split into modules |
| `LandingPageForm.tsx` | 1,223 | HIGH | Decompose form sections |
| `MasterProjectTemplateV3Editor.tsx` | 1,037 | HIGH | Extract sub-editors |
| `template-schema.ts` | 889 | MEDIUM | Split schemas |
| `MasterProjectTemplateV2Editor.tsx` | 887 | MEDIUM | Consolidate with V3 |
| `GhostScene.tsx` | 873 | HIGH | Extract sub-scenes |
| `MasterProjectTemplateEditor.tsx` | 774 | MEDIUM | Deprecate (use V3) |
| `sidebar.tsx` | 743 | LOW | Extract menu items |

### `any` Type Usage

**Total Instances:** 33 occurrences

**By File:**

- `LiquidEther.tsx`: 28 instances (WebGL simulation props)
- `useRealtimeAssets.ts`: 1 instance (Supabase payload)
- `trabalhos/actions.ts`: 2 instances (error handling)
- `chart.tsx`: 2 instances (chart library types)

### Unused Dependencies

**Production:** 15 packages (~50MB)
**Development:** 17 packages (~120MB)

---

## 🗺️ EXECUTION ROADMAP

### PHASE 1: Type Safety (Priority: HIGH)

**Estimated Time:** 2-3 hours  
**Risk:** Low (non-breaking)

#### Task 1.1: Fix Error Handling Types

**Files:**

- `src/app/admin/(protected)/trabalhos/actions.ts`

**Change:**

```typescript
// Before
} catch (error: any) {

// After
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
```

#### Task 1.2: Type Supabase Realtime Payloads

**Files:**

- `src/hooks/useRealtimeAssets.ts`

**Change:**

```typescript
// Before
(payload: any) => {

// After
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
(payload: RealtimePostgresChangesPayload<DbAsset>) => {
```

#### Task 1.3: Type Chart Library Props

**Files:**

- `src/components/ui/chart.tsx`

**Change:**

```typescript
// Before
[key: string]: any;

// After
[key: string]: string | number | boolean | undefined;
```

#### Task 1.4: Type LiquidEther Simulation Props

**Files:**

- `src/components/projects/templates/LiquidEther.tsx`

**Strategy:** Create proper interfaces for WebGL simulation props

```typescript
interface SimulationProps {
  iterations?: number;
  dt?: number;
  // ... other props
}

interface FBOPair {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
}
```

**Status:** DEFERRED (Complex WebGL refactor - separate task)

---

### PHASE 2: Component Decomposition (Priority: HIGH)

**Estimated Time:** 4-6 hours  
**Risk:** Medium (requires testing)

#### Task 2.1: Decompose GhostScene.tsx (873 lines)

**Target:** < 400 lines per file

**New Structure:**

```
src/components/canvas/home/hero/
├── GhostScene.tsx (main orchestrator, ~300 lines)
├── ghost-parts/
│   ├── GhostBody.tsx
│   ├── GhostEyes.tsx
│   ├── GhostParticles.tsx
│   └── GhostFireflies.tsx
└── ghost-effects/
    ├── AnalogDecayPass.tsx
    └── AtmosphericVeil.tsx
```

**Verification:**

- ✅ Visual regression test
- ✅ Performance benchmark (maintain 60FPS)
- ✅ Type check passes

#### Task 2.2: Decompose LandingPageForm.tsx (1,223 lines)

**Target:** < 300 lines per file

**New Structure:**

```
src/components/admin/landing-page-form/
├── LandingPageForm.tsx (main, ~200 lines)
├── sections/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
└── fields/
    ├── BlockEditor.tsx
    └── MediaUploader.tsx
```

#### Task 2.3: Consolidate Template Editors

**Files to Merge:**

- `MasterProjectTemplateEditor.tsx` (774 lines) → DEPRECATE
- `MasterProjectTemplateV2Editor.tsx` (887 lines) → DEPRECATE
- `MasterProjectTemplateV3Editor.tsx` (1,037 lines) → KEEP & REFACTOR

**Strategy:**

1. Verify V3 has all features from V1/V2
2. Mark V1/V2 as deprecated
3. Add migration guide
4. Remove in next major version

---

### PHASE 3: Dependency Cleanup (Priority: MEDIUM)

**Estimated Time:** 1-2 hours  
**Risk:** Low (verify imports first)

#### Task 3.1: Verify Unused Dependencies

**Safe to Remove (Confirmed Unused):**

```json
{
  "dependencies": {
    "statsig-js": "Feature flags not implemented",
    "motion-studio-mcp": "Development tool, should be devDep",
    "lightningcss": "Using Tailwind instead"
  },
  "devDependencies": {
    "autoprefixer": "Tailwind 4 has built-in",
    "styled-jsx": "Not using CSS-in-JS",
    "serve": "Using Next.js dev server",
    "shadcn": "CLI tool, not needed in deps",
    "which": "Unused utility"
  }
}
```

**Verify Before Removing:**

```json
{
  "dependencies": {
    "@dataconnect/admin-generated": "Check Firebase Data Connect usage",
    "@genkit-ai/google-genai": "Check AI features",
    "firebase-admin": "Server-side Firebase (likely used)",
    "postprocessing": "WebGL post-processing (verify R3F usage)"
  }
}
```

#### Task 3.2: Cleanup Script

```bash
# Safe removals
pnpm remove statsig-js lightningcss
pnpm remove -D autoprefixer styled-jsx serve shadcn which

# Verify build still works
pnpm run build
```

---

### PHASE 4: Import Optimization (Priority: LOW)

**Estimated Time:** 1 hour  
**Risk:** Very Low

#### Task 4.1: Auto-fix with ESLint

```bash
pnpm run lint:fix
```

#### Task 4.2: Sort Imports

Use `eslint-plugin-import` rules:

- External packages first
- Internal `@/` imports second
- Relative imports last
- Alphabetically sorted within groups

---

## 🎯 SUCCESS CRITERIA

### Must Pass (Blocking)

- ✅ All tests pass (`pnpm test`)
- ✅ Type check passes (`pnpm run typecheck`)
- ✅ Lint passes (`pnpm run lint`)
- ✅ Build succeeds (`pnpm run build`)

### Performance (Non-Blocking)

- ✅ Ghost Scene maintains 60FPS
- ✅ Bundle size doesn't increase
- ✅ First Load JS < 300kB

### Code Quality

- ✅ `any` types reduced by >80%
- ✅ No files >500 lines (except generated)
- ✅ Unused deps removed

---

## ⚠️ RISKS & MITIGATION

### Risk 1: Breaking WebGL Components

**Probability:** Medium  
**Impact:** High  

**Mitigation:**

1. Create visual regression tests BEFORE refactoring
2. Refactor in isolated branch
3. Test on multiple devices (desktop, mobile)

### Risk 2: Dependency Removal Breaks Build

**Probability:** Low  
**Impact:** High  

**Mitigation:**

1. Verify each dependency with `grep -r "package-name" src/`
2. Remove one at a time
3. Run build after each removal

### Risk 3: Type Changes Break Existing Code

**Probability:** Low  
**Impact:** Medium  

**Mitigation:**

1. TypeScript strict mode already enabled
2. Incremental changes with type check after each
3. Rollback plan (git revert)

---

## 📋 EXECUTION ORDER

### Immediate (Auto-Run Approved)

1. ✅ **Task 1.1:** Fix error handling types (Low risk)
2. ✅ **Task 1.2:** Type Supabase payloads (Low risk)
3. ✅ **Task 1.3:** Type chart props (Low risk)
4. ✅ **Task 4.1:** Auto-fix imports (Very low risk)

### Requires User Approval

1. ⏸️ **Task 2.1:** Decompose GhostScene (Medium risk - WebGL)
2. ⏸️ **Task 2.2:** Decompose LandingPageForm (Medium risk - Admin)
3. ⏸️ **Task 3.1-3.2:** Dependency cleanup (Low risk - verify first)

### Deferred (Separate Task)

1. 🔄 **Task 1.4:** Type LiquidEther (Complex - needs dedicated session)
2. 🔄 **Task 2.3:** Consolidate Template Editors (Breaking change)

---

## 🚀 LOKI MODE EXECUTION PLAN

### Auto-Execute (Phase 1 - Type Safety)

```
1. Fix error handling types → Verify → Commit
2. Type Supabase payloads → Verify → Commit
3. Type chart props → Verify → Commit
4. Run lint:fix → Verify → Commit
```

### Request Approval (Phase 2 - Decomposition)

```
Present plan for:
- GhostScene decomposition
- LandingPageForm decomposition
- Template editor consolidation

Wait for user confirmation before proceeding.
```

---

## 📊 EXPECTED OUTCOMES

### Code Quality Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| `any` types | 33 | <7 | 79% reduction |
| Files >500 lines | 8 | 2 | 75% reduction |
| Unused deps | 32 | <5 | 84% reduction |
| Bundle size | TBD | -5MB | Target |

### Time Investment

- **Phase 1:** 2-3 hours (Auto)
- **Phase 2:** 4-6 hours (Manual)
- **Phase 3:** 1-2 hours (Semi-auto)
- **Phase 4:** 1 hour (Auto)

**Total:** 8-12 hours

---

## 🎭 LOKI AUTHORIZATION

**Auto-Run Approved for:**

- ✅ Type safety fixes (Phase 1)
- ✅ Import optimization (Phase 4)

**User Approval Required for:**

- ⏸️ Component decomposition (Phase 2)
- ⏸️ Dependency removal (Phase 3)

**Deferred to Future:**

- 🔄 LiquidEther refactor (Complex WebGL)
- 🔄 Template editor consolidation (Breaking)

---

**Status:** READY FOR EXECUTION  
**Next Action:** Begin Phase 1 (Auto-Execute)

---

*"Precision, not chaos. Quality, not quantity."* - Loki Protocol
