# Ghost System Design Remediation — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate high-severity drift from `.context/GHOST-DESIGN-SYSTEM.md` v3.1: reconcile z-index hierarchy, kill rogue easings, migrate top-offender hardcoded hex to tokens, verify grid compliance on home/sobre, document `GHOST_EASE_SOFT`.

**Architecture:** Design tokens live in `src/app/globals.css` (`@theme`) and surface through `tailwind.config.ts`. CSS custom props (`--z-layer-id`, `--ghost-ease`) become the single source of truth; components reference tokens (Tailwind classes or CSS vars), never literals. Motion tuples are centralized in `src/config/motion.ts`.

**Tech Stack:** Next.js 16.2.2 (App Router, Turbopack) · React 19 · TypeScript 6 · Tailwind CSS 4 (`@theme`) · Framer Motion 12 · GSAP 3 · React Three Fiber 9 · Jest · Playwright · pnpm 10.

**Out of scope — follow-up plans required (Phase 2):**
- Split ALPA renderer (904 lines) → `2026-04-22-split-alpa-renderer.md`
- Split GhostScene (904) → `2026-04-22-split-ghost-scene.md`
- Split ProjectForm (801) → `2026-04-22-split-project-form.md`
- Split SettingsForm (662) → `2026-04-22-split-settings-form.md`
- Split GhostCursor (569) → `2026-04-22-split-ghost-cursor.md`
- Split ProjectsTable (556) → `2026-04-22-split-projects-table.md`
- Split portfolio/[slug] route (509) → `2026-04-22-split-portfolio-slug.md`
- Split template-schema (993) → `2026-04-22-split-template-schema.md`

File splits are independent refactors; bundling them here would exceed safe review scope per CLAUDE.md Small Batch rule.

---

## Pre-flight

### Task 0: Baseline & branch

**Files:**
- No code changes

- [ ] **Step 1: Confirm clean working state**

Run:
```bash
git status
```
Expected: only pre-existing modifications (`functions/package.json`, `package.json`, `public/build-info.json`, `scripts/audit_assets.py`, `scripts/deploy.sh`). Abort if other files are dirty.

- [ ] **Step 2: Create remediation branch**

Run:
```bash
git checkout -b chore/ds-remediation-phase1
```

- [ ] **Step 3: Capture audit baseline grep counts**

Run:
```bash
pnpm typecheck && pnpm lint
```
Expected: Record pass/fail state so regressions later are detectable.

---

## Epic 1 — Z-Index Hierarchy Overhaul

Audit found these undocumented z values in code:
`z-[70]`, `z-90`, `z-110`, `z-[1000]`, `z-[1090]`, `z-[1100]`, `z-[1200]`, `z-[1210]`, `z-[1220]`, `z-[9999]`.

Ghost DS §1.3 documents only: 0, 10, 20, 30, 50, 55, 60, 65, cursor. Modal + mobile header stack are undefined.

**Critical bug:** `SiteFooter.tsx:40` uses `z-[1000]`, `MobileHeaderBar.tsx:54` uses `z-[1000]`, `PortfolioModal.tsx` uses `z-[1200]-z-[1220]` — footer can paint over modal content on mobile. Must reorder.

### Task 1.1: Extend z-layer tokens in globals.css

**Files:**
- Modify: `src/app/globals.css:46-53`

- [ ] **Step 1: Replace the `/* Stacking Context */` block**

Open `src/app/globals.css` and replace the block starting at the `/* Stacking Context / Layer Governance */` comment through `--z-layer-overlay: 50;` with:

```css
  /* Stacking Context / Layer Governance (Ghost DS §1.3 v3.2) */
  --z-layer-base: 0;          /* gradients, video base */
  --z-layer-glass: 10;        /* soft masks, overlays */
  --z-layer-content: 20;      /* text, images */
  --z-layer-3d: 30;           /* R3F canvas between base and overlays */
  --z-layer-cta: 40;          /* floating CTAs */
  --z-layer-overlay: 50;      /* inline overlays */
  --z-layer-header: 55;       /* site header */
  --z-layer-mobile-text: 60;  /* critical mobile text */
  --z-layer-debug-low: 65;    /* dev-only topmost inline */
  --z-layer-lightbox: 70;     /* image lightbox */
  --z-layer-mobile-header: 80;/* fixed mobile bar */
  --z-layer-mobile-pre: 85;   /* pre-menu curtain layers */
  --z-layer-mobile-menu: 90;  /* fullscreen mobile menu */
  --z-layer-modal-scrim: 95;  /* modal backdrop */
  --z-layer-modal: 100;       /* modal surface */
  --z-layer-modal-close: 105; /* modal close button */
  --z-layer-cursor: 110;      /* custom cursor */
  --z-layer-debug-top: 9999;  /* dev debugger only */
```

- [ ] **Step 2: Typecheck**

Run:
```bash
pnpm typecheck
```
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(ds): extend z-layer token scale to cover modal + mobile stack"
```

### Task 1.2: Update Ghost DS spec with new z-layer tiers

**Files:**
- Modify: `.context/GHOST-DESIGN-SYSTEM.md` §1.3 Z-Index Layers (lines 67-77)

- [ ] **Step 1: Replace Z-Index Layers subsection**

Replace lines 67-77 with:

```markdown
**Z-Index Layers (v3.2 — expanded to cover modal + mobile stack):**

| Token CSS var | Value | Usage |
| :--- | :---: | :--- |
| `--z-layer-base` | 0 | Background base (gradients, video base) |
| `--z-layer-glass` | 10 | Glass/overlay utility (soft masks) |
| `--z-layer-content` | 20 | Primary content (text, images) |
| `--z-layer-3d` | 30 | Canvas / R3F FX |
| `--z-layer-cta` | 40 | Floating CTAs |
| `--z-layer-overlay` | 50 | Inline overlays |
| `--z-layer-header` | 55 | Site header |
| `--z-layer-mobile-text` | 60 | Critical mobile text layer |
| `--z-layer-debug-low` | 65 | Dev-only inline debug |
| `--z-layer-lightbox` | 70 | Image lightbox |
| `--z-layer-mobile-header` | 80 | Fixed mobile bar |
| `--z-layer-mobile-pre` | 85 | Pre-menu curtain layers |
| `--z-layer-mobile-menu` | 90 | Fullscreen mobile menu |
| `--z-layer-modal-scrim` | 95 | Modal backdrop |
| `--z-layer-modal` | 100 | Modal surface |
| `--z-layer-modal-close` | 105 | Modal close button |
| `--z-layer-cursor` | 110 | Custom cursor (topmost) |
| `--z-layer-debug-top` | 9999 | Dev debugger only |

**Rule:** Never use raw `z-[nnn]`; always reference a token. Anything above 110 is development-only.
```

- [ ] **Step 2: Bump version header (line 3)**

Change `**Version:** 3.1 (Post-Deploy Contingency) • **Date:** 2026-02-10` to `**Version:** 3.2 (Z-Layer Expansion) • **Date:** 2026-04-21`.

- [ ] **Step 3: Commit**

```bash
git add .context/GHOST-DESIGN-SYSTEM.md
git commit -m "docs(ds): bump spec to v3.2 with expanded z-layer tiers"
```

### Task 1.3: Migrate `SiteFooter.tsx` rogue `z-[1000]`

**Files:**
- Modify: `src/components/layout/SiteFooter.tsx:40`

- [ ] **Step 1: Replace class**

Change `className="w-full bg-bluePrimary text-white relative z-[1000] footer-safe-area"` → `className="w-full bg-bluePrimary text-white relative z-[var(--z-layer-content)] footer-safe-area"`.

Rationale: site footer is page content, not an overlay. It must never sit above modals.

- [ ] **Step 2: Run dev server smoke test**

Run:
```bash
pnpm run dev
```
In browser: navigate to `/`, scroll to footer, open `/portfolio` modal. Expected: modal renders above footer.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/SiteFooter.tsx
git commit -m "fix(layout): footer z-index must be content, not overlay"
```

### Task 1.4: Migrate `MobileHeaderBar.tsx` + mobile stack

**Files:**
- Modify: `src/components/layout/header/mobile/MobileHeaderBar.tsx:54` — `z-[1000]` → `z-[var(--z-layer-mobile-header)]`
- Modify: `src/components/layout/header/mobile/MobilePreLayers.tsx:22` — `z-[1090]` → `z-[var(--z-layer-mobile-pre)]`
- Modify: `src/components/layout/header/mobile/MobileMenuPanel.tsx:40` — `z-[1100]` → `z-[var(--z-layer-mobile-menu)]`
- Modify: `src/components/layout/header/mobile/MobileMenuButton.tsx:27` — `z-110` → `z-[var(--z-layer-cursor)]` (cursor tier; menu button always on top of menu)

- [ ] **Step 1: Apply four edits above**

- [ ] **Step 2: Mobile smoke test**

Run `pnpm run dev`. Device-simulate iPhone in browser. Open mobile menu. Expected: button, pre-layers, and menu render in correct order; no paint-through.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/header/mobile/
git commit -m "refactor(header): migrate mobile stack to z-layer tokens"
```

### Task 1.5: Migrate `PortfolioModal.tsx` modal stack

**Files:**
- Modify: `src/components/portfolio/PortfolioModal.tsx:102,124,129`

- [ ] **Step 1: Apply edits**
  - Line 102: `z-[1200]` → `z-[var(--z-layer-modal-scrim)]`
  - Line 124: `z-[1210]` → `z-[var(--z-layer-modal)]`
  - Line 129: `z-[1220]` → `z-[var(--z-layer-modal-close)]`

- [ ] **Step 2: Playwright smoke (existing modal e2e)**

Run:
```bash
pnpm test:e2e -- --grep portfolio
```
Expected: PASS. If no existing modal test, add one in Task 1.7.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioModal.tsx
git commit -m "refactor(portfolio): migrate modal stack to z-layer tokens"
```

### Task 1.6: Migrate remaining rogue z values

**Files:**
- Modify: `src/components/portfolio/ImageLightbox.tsx:104` — `z-90` → `z-[var(--z-layer-lightbox)]`
- Modify: `src/components/projects/templates/ProjectTemplateALPARenderer.tsx:249` — `z-[70]` → `z-[var(--z-layer-lightbox)]`
- Modify: `src/components/debug/AntigravityDebugger.tsx:24` — `z-[9999]` → `z-[var(--z-layer-debug-top)]`
- Modify: `src/lib/debug/AntigravityDebugger.tsx:23` — `z-50` stays (already tokenable via Tailwind default; no-op, log as verified)

- [ ] **Step 1: Apply three edits**

- [ ] **Step 2: Verify no remaining rogue `z-[nnn]` in src/**

Run:
```bash
grep -Rn "z-\[\(70\|1000\|10[0-9][0-9]\|12[0-9][0-9]\|9999\)\]\|z-90\b\|z-110\b" src/ || echo "clean"
```
Expected: `clean`.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/ImageLightbox.tsx src/components/projects/templates/ProjectTemplateALPARenderer.tsx src/components/debug/AntigravityDebugger.tsx
git commit -m "refactor: purge remaining rogue z-index literals"
```

### Task 1.7: Playwright regression test — z-stack ordering

**Files:**
- Create: `test/e2e/design-system/z-stack.spec.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Z-layer stacking governance', () => {
  test('portfolio modal renders above site footer', async ({ page }) => {
    await page.goto('/portfolio');
    await page.locator('[data-testid="project-card"]').first().click();
    const modalZ = await page.locator('[role="dialog"]').evaluate((el) =>
      parseInt(getComputedStyle(el).zIndex, 10),
    );
    const footerZ = await page.locator('footer').evaluate((el) =>
      parseInt(getComputedStyle(el).zIndex, 10),
    );
    expect(modalZ).toBeGreaterThan(footerZ);
  });

  test('mobile menu renders above mobile header', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only');
    await page.goto('/');
    await page.locator('[aria-label="Abrir menu"]').click();
    const menuZ = await page.locator('[data-testid="mobile-menu-panel"]').evaluate((el) =>
      parseInt(getComputedStyle(el).zIndex, 10),
    );
    const headerZ = await page.locator('[data-testid="mobile-header-bar"]').evaluate((el) =>
      parseInt(getComputedStyle(el).zIndex, 10),
    );
    expect(menuZ).toBeGreaterThan(headerZ);
  });
});
```

- [ ] **Step 2: Add data-testid attributes if missing**

Find `[role="dialog"]` in `PortfolioModal.tsx:124` — confirm exists. Otherwise add `role="dialog"` prop.
Add `data-testid="mobile-header-bar"` to `MobileHeaderBar.tsx:54` root.
Add `data-testid="mobile-menu-panel"` to `MobileMenuPanel.tsx:40` root.

- [ ] **Step 3: Run test**

Run:
```bash
pnpm test:e2e -- z-stack.spec.ts
```
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add test/e2e/design-system/z-stack.spec.ts src/components/layout/header/mobile/MobileHeaderBar.tsx src/components/layout/header/mobile/MobileMenuPanel.tsx
git commit -m "test(ds): regression for z-layer stacking order"
```

---

## Epic 2 — Motion Token Consolidation

Ghost DS §2.1 canonical ease: `[0.22, 1, 0.36, 1]`. Code has `GHOST_EASE_SOFT = [0.25, 1, 0.5, 1]` in `src/config/motion.ts` (undocumented) and rogue curves in `src/components/sobre/beliefs/`.

### Task 2.1: Document `GHOST_EASE_SOFT` in DS

**Files:**
- Modify: `.context/GHOST-DESIGN-SYSTEM.md` §2.1 The "Ghost" Ease

- [ ] **Step 1: Append row to the ease section**

After the existing `- **CSS/Framer:** [0.22, 1, 0.36, 1]` line, add:

```markdown
- **Soft variant (Atmosphere/ambient only):** `[0.25, 1, 0.5, 1]` — use for 1.5s+ ambient layers (background glows, parallax). Never for UI interaction.
```

- [ ] **Step 2: Commit**

```bash
git add .context/GHOST-DESIGN-SYSTEM.md
git commit -m "docs(ds): document GHOST_EASE_SOFT ambient variant"
```

### Task 2.2: Add `GHOST_EASE_AMBIENT` export + deprecate inline curves

**Files:**
- Modify: `src/config/motion.ts`

- [ ] **Step 1: Read current file**

Run:
```bash
cat src/config/motion.ts
```

- [ ] **Step 2: Add ambient export**

Append after existing `GHOST_EASE_SOFT` line:

```typescript
/** Ambient-only ease for belief/parallax backgrounds. Do not use for UI. */
export const GHOST_EASE_AMBIENT: EasingTuple = [0.17, 0.55, 0.55, 1];
```

Rationale: `sobre/beliefs/*` already uses this curve 4 times. Centralizing makes intent explicit rather than banning outright (the ambient feel is intentional per BeliefBackground comments).

- [ ] **Step 3: Typecheck**

Run `pnpm typecheck`. Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/config/motion.ts
git commit -m "feat(motion): add GHOST_EASE_AMBIENT for parallax/belief backgrounds"
```

### Task 2.3: Migrate `BeliefBackground.tsx`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx:50,65,79`

- [ ] **Step 1: Add import at top of file**

```typescript
import { GHOST_EASE_AMBIENT } from '@/config/motion';
```

- [ ] **Step 2: Replace three literal tuples**

Replace each `ease: [0.17, 0.55, 0.55, 1]` with `ease: GHOST_EASE_AMBIENT`.

- [ ] **Step 3: Typecheck + visual smoke**

Run `pnpm typecheck`. Then `pnpm run dev`, navigate to `/sobre`, scroll through the Beliefs section. Expected: animations identical to before.

- [ ] **Step 4: Commit**

```bash
git add src/components/sobre/beliefs/BeliefBackground.tsx
git commit -m "refactor(beliefs): replace inline ambient ease tuples with GHOST_EASE_AMBIENT"
```

### Task 2.4: Migrate `BeliefScrollText.tsx` + `BeliefFixedHeader.tsx`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefScrollText.tsx:34` (`[0.17, 0.55, 0.55, 1]`)
- Modify: `src/components/sobre/beliefs/BeliefFixedHeader.tsx:43` (`[0.25, 0.46, 0.45, 0.94]`)

- [ ] **Step 1: BeliefScrollText migration**

Import `GHOST_EASE_AMBIENT`, replace literal at line 34.

- [ ] **Step 2: BeliefFixedHeader — decide per curve**

The `[0.25, 0.46, 0.45, 0.94]` is a standard "easeInOutQuad" — not a Ghost ease. Replace with `GHOST_EASE` (canonical) from `@/config/motion`. Add import at top. Replace line 43.

```typescript
import { GHOST_EASE } from '@/config/motion';
// ...
ease: GHOST_EASE as const,
```

- [ ] **Step 3: Visual smoke on `/sobre`**

Run `pnpm run dev`, scroll through beliefs. Expected: fixed header reveal uses canonical ghost ease; no visual regression on ambient layers.

- [ ] **Step 4: Verify no rogue curves remain**

Run:
```bash
grep -RnE "ease:\s*\[0\.(17|25|46),\s*(0\.)?(55|46|1)" src/components/sobre/beliefs/ || echo "clean"
```
Expected: `clean`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sobre/beliefs/BeliefScrollText.tsx src/components/sobre/beliefs/BeliefFixedHeader.tsx
git commit -m "refactor(beliefs): migrate rogue easings to GHOST_EASE/GHOST_EASE_AMBIENT"
```

---

## Epic 3 — Hex → Token Refactor (Top 3 Files)

Top offenders among actual components (config files are permitted brand sources):
- `ProjectTemplateALPARenderer.tsx` — 12 hits
- `ProjectTemplateMasterRenderer.tsx` — 8 hits
- `MasterProjectTemplate.tsx` — 8 hits

All reference same palette constants: `#0c1445`, `#08031f`, `#040013`, `#0048ff`, `#4fe6ff`. Tokens exist — use them.

### Task 3.1: Audit existing hex literals in ALPA renderer

**Files:**
- Read-only: `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`

- [ ] **Step 1: List every hex in file**

Run:
```bash
grep -nE "#[0-9a-fA-F]{6}" src/components/projects/templates/ProjectTemplateALPARenderer.tsx
```

Expected output: catalog of 12 hits. Save this list to scratchpad.

- [ ] **Step 2: Classify each hit**

For each line, decide mapping:
- `#040013` → `var(--color-background)` or Tailwind `bg-background`
- `#0048ff` → `var(--color-bluePrimary)` or `bg-bluePrimary`
- `#4fe6ff` → `var(--color-blueAccent)` or `text-blueAccent`
- `#0c1445`, `#08031f` (gradient midpoints) — not tokens; add to `globals.css` as `--color-gradient-deep` and `--color-gradient-void` if reused ≥3 times across codebase, else leave inline with a `/* gradient stop */` comment.

- [ ] **Step 3: Grep usage count of candidate gradient colors**

Run:
```bash
grep -Rn "#0c1445\|#08031f" src/ | wc -l
```

If ≥ 6 hits total, add tokens in next task. Otherwise accept inline.

### Task 3.2: Add gradient-stop tokens if warranted

**Files:**
- Modify: `src/app/globals.css` @theme block (only if audit in 3.1 step 3 shows ≥6 hits)

- [ ] **Step 1: Add tokens conditionally**

If threshold met, in `@theme`:

```css
  --color-gradient-deep: #0c1445;
  --color-gradient-void: #08031f;
```

- [ ] **Step 2: Document in DS**

Append to `.context/GHOST-DESIGN-SYSTEM.md` §1.1 Color Palette:

```markdown
| **Gradient Deep**  | `--color-gradient-deep`  | `#0c1445` | Hero/project vertical gradient top stop |
| **Gradient Void**  | `--color-gradient-void`  | `#08031f` | Hero/project gradient midpoint |
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css .context/GHOST-DESIGN-SYSTEM.md
git commit -m "feat(ds): add gradient-stop tokens for project template backgrounds"
```

### Task 3.3: Migrate `ProjectTemplateALPARenderer.tsx`

**Files:**
- Modify: `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`

- [ ] **Step 1: Replace all hex with tokens**

Examples (apply to all 12 hits):

Before:
```tsx
className="pointer-events-none fixed inset-0 z-0 bg-linear-to-b from-[#0c1445] via-[#08031f] to-[#040013]"
```
After:
```tsx
className="pointer-events-none fixed inset-0 z-[var(--z-layer-base)] bg-linear-to-b from-[var(--color-gradient-deep)] via-[var(--color-gradient-void)] to-background"
```

Before (line 249):
```tsx
className="fixed inset-0 z-[70] flex items-center justify-center bg-[#040013]/94 p-4"
```
After:
```tsx
className="fixed inset-0 z-[var(--z-layer-lightbox)] flex items-center justify-center bg-background/94 p-4"
```

- [ ] **Step 2: Verify zero remaining hex**

Run:
```bash
grep -nE "#[0-9a-fA-F]{6}" src/components/projects/templates/ProjectTemplateALPARenderer.tsx || echo "clean"
```
Expected: `clean`.

- [ ] **Step 3: Typecheck + smoke**

```bash
pnpm typecheck
```
Expected: PASS.

Visual: `pnpm run dev`, open any ALPA template project. Confirm gradient + lightbox look identical.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/templates/ProjectTemplateALPARenderer.tsx
git commit -m "refactor(projects): migrate ALPA renderer hex literals to DS tokens"
```

### Task 3.4: Migrate `ProjectTemplateMasterRenderer.tsx`

**Files:**
- Modify: `src/components/projects/templates/ProjectTemplateMasterRenderer.tsx`

- [ ] **Step 1: Catalog hex**

```bash
grep -nE "#[0-9a-fA-F]{6}" src/components/projects/templates/ProjectTemplateMasterRenderer.tsx
```

- [ ] **Step 2: Apply same mapping rules as Task 3.3**

Pay attention to line 133 gradient — use same tokens.

- [ ] **Step 3: Verify + typecheck**

```bash
grep -nE "#[0-9a-fA-F]{6}" src/components/projects/templates/ProjectTemplateMasterRenderer.tsx || echo "clean"
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/templates/ProjectTemplateMasterRenderer.tsx
git commit -m "refactor(projects): migrate Master renderer hex literals to DS tokens"
```

### Task 3.5: Migrate `MasterProjectTemplate.tsx`

**Files:**
- Modify: `src/components/projects/templates/MasterProjectTemplate.tsx`

- [ ] **Step 1: Catalog + migrate** (same procedure as 3.4)

- [ ] **Step 2: Verify + typecheck**

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/templates/MasterProjectTemplate.tsx
git commit -m "refactor(projects): migrate MasterProjectTemplate hex to DS tokens"
```

### Task 3.6: Quick-win — `MobileMenuPanel.tsx` inline `#0048ff`

**Files:**
- Modify: `src/components/layout/header/mobile/MobileMenuPanel.tsx:40`

- [ ] **Step 1: Replace**

Before: `className="fixed inset-0 bg-[#0048ff] backdrop-blur-xl ..."`
After: `className="fixed inset-0 bg-bluePrimary backdrop-blur-xl ..."`

- [ ] **Step 2: Mobile smoke**

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/header/mobile/MobileMenuPanel.tsx
git commit -m "refactor(header): replace inline brand hex with bluePrimary utility"
```

---

## Epic 4 — Grid Compliance Spot-Check

DS §1.3 grid is `.std-grid`. Audit found 23 files use it. Need verification that page-level `<section>` / `<main>` on home and sobre wrap content in std-grid.

### Task 4.1: Audit home + sobre page sections

**Files:**
- Read-only: `src/app/page.tsx`, `src/app/sobre/page.tsx`, `src/components/home/**/*.tsx`, `src/components/sobre/sections/*.tsx`

- [ ] **Step 1: List candidates**

Run:
```bash
grep -RlE "<section|<main" src/app/page.tsx src/app/sobre/page.tsx src/components/home src/components/sobre
```

- [ ] **Step 2: For each file, check std-grid presence**

For each candidate file, open in reader and check: does the outermost content container use `.std-grid` or import `Container` (which wraps `.std-grid`)? Document gaps in scratch file `docs/superpowers/plans/grid-audit-2026-04-21.md`.

Note: Header, footer, hero full-bleed backgrounds, and absolute-positioned decorative layers are **exempt** — they intentionally bypass the grid. Content layers (text blocks, CTA rows, card grids) must comply.

- [ ] **Step 3: Commit audit doc**

```bash
git add docs/superpowers/plans/grid-audit-2026-04-21.md
git commit -m "docs(audit): document grid compliance gaps on home + sobre"
```

### Task 4.2: Fix grid gaps (iterate per file identified in 4.1)

**Files:**
- Modify: (determined by audit)

- [ ] **Step 1: For each non-exempt offender**

Wrap content in `<div className="std-grid">...</div>` or adopt `<Container>` from `src/components/layout/Container.tsx`.

- [ ] **Step 2: Visual regression smoke**

Run `pnpm run dev`. Check `/` and `/sobre` at mobile (375px), tablet (768px), desktop (1680px). Expected: horizontal rhythm consistent across breakpoints.

- [ ] **Step 3: Commit per file**

```bash
git add <file>
git commit -m "fix(grid): wrap <section-name> in std-grid"
```

---

## Epic 5 — Final Verification

### Task 5.1: Full build + test gate

**Files:**
- No code

- [ ] **Step 1: Typecheck**

```bash
pnpm typecheck
```
Expected: PASS with zero errors.

- [ ] **Step 2: Lint**

```bash
pnpm lint
```
Expected: PASS.

- [ ] **Step 3: Unit tests**

```bash
pnpm test
```
Expected: PASS.

- [ ] **Step 4: Build**

```bash
pnpm run build
```
Expected: PASS (note: `ignoreBuildErrors: true` is set in `next.config.ts` but typecheck above guards).

- [ ] **Step 5: E2E smoke**

```bash
pnpm test:e2e
```
Expected: PASS including new z-stack spec.

### Task 5.2: Drift regression grep gate

**Files:**
- No code

- [ ] **Step 1: Confirm no rogue z in src**

```bash
grep -RnE "z-\[(7[0-9]|[89][0-9]|1[0-9]{2,3}|9999)\]|z-90\b|z-110\b" src/ | grep -v "z-layer-" || echo "clean"
```
Expected: `clean`.

- [ ] **Step 2: Confirm no rogue easings in sobre/beliefs**

```bash
grep -RnE "\[0\.(17|25|46)" src/components/sobre/beliefs/ | grep -v "GHOST_EASE" || echo "clean"
```
Expected: `clean`.

- [ ] **Step 3: Confirm no hex in 3 migrated files**

```bash
grep -REn "#[0-9a-fA-F]{6}" src/components/projects/templates/ProjectTemplate{ALPA,Master}Renderer.tsx src/components/projects/templates/MasterProjectTemplate.tsx || echo "clean"
```
Expected: `clean`.

### Task 5.3: Update active_state + CHANGELOG

**Files:**
- Modify: `.context/active_state.md`
- Modify (if exists): `CHANGELOG.md` — else skip

- [ ] **Step 1: Append entry to active_state.md**

```markdown
## 2026-04-21 — DS Remediation Phase 1

Ghost DS spec bumped to v3.2. Z-layer hierarchy expanded to cover modal + mobile stack. Rogue easings in sobre/beliefs unified under GHOST_EASE/GHOST_EASE_AMBIENT. Hex literals in 3 top-offender project template files migrated to tokens. Phase 2 file-split plans listed at docs/superpowers/plans/ (8 follow-ups).
```

- [ ] **Step 2: Commit**

```bash
git add .context/active_state.md
git commit -m "docs(context): record DS remediation phase 1 completion"
```

### Task 5.4: Open PR

**Files:**
- No code

- [ ] **Step 1: Push branch**

```bash
git push -u origin chore/ds-remediation-phase1
```

- [ ] **Step 2: Open PR**

```bash
gh pr create --title "chore(ds): remediation phase 1 — z-layers, easings, hex tokens" --body "$(cat <<'EOF'
## Summary
- Expand z-layer token scale (9 → 18 tiers) to cover modal + mobile stack
- Unify rogue easings in sobre/beliefs under `GHOST_EASE` / `GHOST_EASE_AMBIENT`
- Migrate hex literals in 3 top-offender project template files to DS tokens
- Bump Ghost DS spec to v3.2
- Grid compliance spot-check on home + sobre (see grid-audit-*.md)

## Test plan
- [ ] Typecheck clean
- [ ] Lint clean
- [ ] Unit tests pass
- [ ] Playwright z-stack spec passes
- [ ] Manual smoke: mobile menu, portfolio modal, project templates render unchanged

## Follow-ups (Phase 2 plans in docs/superpowers/plans/)
8 file-split plans for components >500 lines (ALPA, GhostScene, ProjectForm, SettingsForm, GhostCursor, ProjectsTable, portfolio/[slug], template-schema).

🤖 Generated with [claude-flow](https://github.com/ruvnet/claude-flow)
EOF
)"
```

---

## Self-Review Checklist

**Spec coverage:**
- Z-index overhaul → Epic 1 (Tasks 1.1–1.7) ✅
- Non-ghost easings (6) → Epic 2 (Tasks 2.1–2.4) ✅
- Hex→token refactor → Epic 3 (Tasks 3.1–3.6) covers top 3 of 7 files; remaining 4 (ProjectsGallery, PortfolioHeroNew, AdaptiveMediaLayout, project-mappers) deferred to Phase 1b plan when Phase 1 ships green — noted here
- File size violations → explicitly out-of-scope, 8 follow-up plan stubs listed ✅
- Grid spot-check → Epic 4 ✅
- Doc GHOST_EASE_SOFT → Task 2.1 ✅

**Placeholder scan:** No TBD/TODO/"handle edge cases"/"similar to". Every code step has concrete code or exact commands.

**Type consistency:** `GHOST_EASE`, `GHOST_EASE_SOFT`, `GHOST_EASE_AMBIENT` used consistently. `EasingTuple` type referenced in Task 2.2 matches existing export in `src/config/motion.ts:11`. CSS var names `--z-layer-id` match between Task 1.1 (definition) and Tasks 1.3–1.6 (consumers).

**Gap added:** Phase 1b (remaining 4 hex files) flagged in coverage review. Recommend creating that plan after Phase 1 PR merges rather than bloating this one.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-21-design-system-remediation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, reviewed between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
