
# Implementation Plan — Auditoria Multipágina Portfólio Danilo

**Projeto:** `danilo-novais-portfolio`  
**Domínio:** `https://portfoliodanilo.com`  
**Data:** 2026-05-02  
**Status:** Aprovado para execução  

---

## Executive Summary

Este plano consolida a auditoria das páginas **Home**, **Sobre** e **Portfólio** do portfólio Ghost System, com foco em:

- Acessibilidade semântica e operacional (WCAG 2.1 AA)
- Performance técnica e percebida (Lighthouse ≥96)
- SEO técnico (metadata, headings, JSON-LD)
- Ghost Design System compliance (tokens, z-index, motion)
- Arquitetura Next.js moderna (App Router, TypeScript strict)

**Task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items.** This plan structures 27 findings across 3 pages into prioritized execution tracks.

---

## Phase 0: Preparation & Context Loading

### Duration: 0.5 dias

### Tasks

| ID | Task | Owner | Output |
|----|------|-------|--------|
| P0-001 | Load canonical docs (.context/, AGENTS.md, rules.md) | ghost_architect | Context manifest |
| P0-002 | Activate Context7 MCP for Next.js/R3F/Framer decisions | all_agents | MCP activation log |
| P0-003 | Map file structure vs prototype specs | audit_sentinel | Structure map |

### Dependencies
- None

### Exit Criteria
- All agents loaded with context
- Context7 MCP verified available
- File mapping complete

---

## Phase 1: P0 Critical Fixes (SEO + A11y Blockers)

### Duration: 1-2 dias

### Scope
- **H-01/S-01/P-01**: Heading hierarchy broken / Metadata incomplete
- **T-01**: Invalid JSON-LD Organization
- **T-02**: Duplicate titles embedding brand

### Execution Track

#### Track 1A: Headings & Semantic Structure

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Audit H1-H6 on `/`, `/sobre`, `/portfolio` | `page.tsx` each | axe-core |
| 2 | Fix heading order (single H1 per page) | Components | Search Console |
| 3 | Add `aria-label` to sections | All sections | WAVE tool |

#### Track 1B: Metadata API & JSON-LD

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Implement `generateMetadata` per route | `page.tsx` | Rich Results Test |
| 2 | Fix `Organization.logo` shape | `JsonLd.tsx` | Schema validator |
| 3 | Normalize titles (no brand duplication) | `seo.ts` | Manual review |

### Dependencies
- Phase 0 complete
- Context7 MCP active

### Exit Criteria
- Zero heading violations
- JSON-LD valid
- Metadata unique per page

---

## Phase 2: P1 Structural Fixes (Motion + Architecture)

### Duration: 3-5 dias

### Scope
- **T-04**: Easing tokens drift (~20 files)
- **T-05**: Components >500 lines (6 critical)
- **T-06**: Hard-coded hover colors
- **S-02**: Z-index Beliefs Section
- **P-02**: Missing loading states

### Execution Track

#### Track 2A: Motion Standardization

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Audit easing usage across codebase | Grep `ease*` | Token compliance |
| 2 | Replace with `GHOST_EASE` token | ~20 files | typecheck |
| 3 | Centralize `reducedMotion` config | `motion.ts` | E2E reduced motion |

#### Track 2B: Component Refactoring

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Identify components >500 lines | ESLint | Report |
| 2 | Extract sub-components (6 critical) | Hero, Beliefs, Gallery | build pass |
| 3 | Add unit tests for extracted logic | `__tests__/` | jest pass |

#### Track 2C: Design System Tokens

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Audit hard-coded colors | Grep `#[0-9a-fA-F]` | Token report |
| 2 | Replace with CSS variables | Components | visual test |
| 3 | Fix z-index layers (Beliefs) | `BeliefsSection.tsx` | layer check |

#### Track 2D: Loading States

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Map async flows (Supabase, R3F) | Routes | Flow diagram |
| 2 | Implement skeleton loaders | Components | UX review |
| 3 | Add error boundaries | Shared | Error simulation |

### Dependencies
- Phase 1 complete
- Ghost Design System tokens loaded

### Exit Criteria
- 100% easing token compliance
- No component >500 lines
- All colors via tokens
- Loading states on all async flows

---

## Phase 3: P2 Polish & Responsiveness

### Duration: 2-3 dias

### Scope
- **H-05**: Video aspect ratio mobile
- **H-04**: Bento grid unequal heights
- **S-04**: Nested grid redundancy
- **T-07**: 3D asset versioning
- **P-04**: Variable hero contrast

### Execution Track

#### Track 3A: Mobile Responsiveness

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Audit video containers mobile | Home | Device lab |
| 2 | Fix aspect ratios (`aspect-video`) | Components | Visual test |
| 3 | Validate bento grid alignment | Home | Layout check |

#### Track 3B: Performance Optimization

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Version 3D assets (hash query) | R3F components | Cache bust |
| 2 | Optimize GLB compression | Assets folder | Size check |
| 3 | Audit hero contrast ratios | Portfolio | WCAG AA |

### Dependencies
- Phase 2 complete
- Lighthouse baseline captured

### Exit Criteria
- Mobile layout parity
- 3D assets versioned
- Contrast ≥4.5:1

---

## Phase 4: Transversal & Governance

### Duration: Parallel (1-2 dias)

### Scope
- **T-03**: Reduced motion not centralized
- Documentation updates
- Validation checklist completion

### Execution Track

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| 1 | Centralize `useReducedMotion` hook | `hooks/` | Hook usage |
| 2 | Update `.context/GHOST-DESIGN-SYSTEM.md` | Docs | Version bump |
| 3 | Run full validation checklist | All | Checklist sign-off |

### Dependencies
- Phases 1-3 in progress

### Exit Criteria
- Single source of truth for motion
- Documentation current
- All validations passed

---

## Approval Gate

**Before proceeding to implementation:**

- [ ] Human approval received (`Aprovado` or `Proceed`)
- [ ] All artifacts reviewed
- [ ] Risk assessment acknowledged

**After approval:**

1. Execute Phase 0 (context loading)
2. Proceed sequentially through phases
3. Report after each phase completion
4. Block on any P0 regression

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | ≥96 | Lighthouse CI |
| Accessibility Score | 100 | axe-core |
| SEO Score | 100 | Search Console |
| Bundle Size | <500KB initial | webpack-bundle-analyzer |
| FPS (WebGL) | >50 | R3F devtools |
| Component Max Lines | <500 | ESLint |
| Token Compliance | 100% | Grep audit |

---

## Rollback Plan

If any phase introduces regression:

1. **Immediate halt** on all tracks
2. **Git revert** to last stable commit
3. **Root cause analysis** in `docs/incident_report.md`
4. **Fix forward** only after human approval

---

## Artifact Index

| File | Purpose | Location |
|------|---------|----------|
| `implementation_plan.md` | This document | `/workspace/` |
| `task.md` | Detailed task breakdown | `/workspace/` |
| `risk_assessment.md` | Risk matrix & mitigation | `/workspace/` |
| `orchestrated_fix_prompt.md` | Prompt for execution agents | `/workspace/docs/` |
| `audit_consolidated_report.md` | Full audit findings | `/workspace/docs/` |

---

**Next Step:** Await human approval before executing Phase 0.
