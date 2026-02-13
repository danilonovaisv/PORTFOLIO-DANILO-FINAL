# 11-Point Post-Deploy Adjustment Plan

**Created:** 2026-02-10T00:02:00-03:00  
**Mode:** Orchestrated Multi-Agent Execution  
**Status:** Planning Phase  

---

## 🎯 MISSION OVERVIEW

Execute 11 specific post-deploy adjustments across UI, responsiveness, motion, navigation, and Design System compliance. All changes must maintain visual excellence, zero regressions, and full GHOST-DESIGN-SYSTEM compliance.

---

## 📋 ISSUE INVENTORY

### Category A: Design System & Typography (Global Impact)

1. **[DS-01] Mobile Typography Global Fix**
   - **Issue:** `font-body` too small on mobile
   - **Fix:** Replace with `font-h3 medium` globally
   - **Impact:** ALL pages mobile
   - **Priority:** CRITICAL (blocks other fixes)

### Category B: CTA & Component Behavior

2. **[CTA-01] Small vs Large CTA Inheritance**
   - **Issue:** Small CTAs (blue spheres) inheriting large CTA styles
   - **Location:** Portfolio Showcase (3 menus)
   - **Fix:** Correct CSS specificity/class rules
   - **Priority:** HIGH

2. **[CTA-02] Landing Page Final CTA**
    - **Issue:** Non-standard CTA at end of Landing Pages
    - **Fix:** Use official `<AntigravityCTA />` component
    - **Priority:** MEDIUM

### Category C: Layout & Responsiveness

3. **[LAYOUT-01] Contact Section Mobile Order**
   - **Issue:** Incorrect element order on mobile
   - **Correct Order:**
     1. Contato (heading)
     2. Lista de contato (contact list)
     3. Ícones de redes sociais (social icons)
     4. Formulário (form)
   - **Priority:** HIGH

2. **[LAYOUT-02] Hero Sobre Subtitle Mobile**
   - **Issue:** Subtitle too small on mobile
   - **Fix:** Apply DS-01 fix (inherit from Design System)
   - **Dependency:** DS-01
   - **Priority:** MEDIUM

3. **[LAYOUT-03] Portfolio Cards Section Responsiveness**
   - **Issue:** Cards work, but section has spacing issues
   - **Fix:** Adjust section height/padding, eliminate empty space
   - **Priority:** MEDIUM

### Category D: Motion & Animation Sync

5. **[MOTION-01] About Origens Entry Sequence**
   - **Issue:** Image and text enter simultaneously
   - **Fix:** Image first, then text (staggered)
   - **Tool:** MCP Motion
   - **Validation:** Ensure other text animations NOT broken
   - **Priority:** HIGH

### Category E: Z-Index & Layering

6. **[LAYER-01] About Believe 3D/Text Layering**
   - **Issue:** Text and 3D element behind background
   - **Fix:** Correct z-index per GHOST-DESIGN-SYSTEM
   - **Reference:** z-0 (Canvas), z-20 (Content)
   - **Priority:** HIGH

### Category F: Video & Media

8. **[VIDEO-01] About Closing Video (Mobile & Desktop)**
   - **Issue:** Wrong video, cropped/resized incorrectly
   - **Fix:**
     - Use mobile-specific video on mobile
     - Display at real size (no crop/force resize)
     - Full page respect for both desktop and mobile
   - **Priority:** CRITICAL

2. **[VIDEO-02] Card Video Popup**
   - **Issue:** Wrong video, no autoplay/sound
   - **Fix:**
     - Open correct video from data
     - Enable autoplay + sound
     - Ensure video exists and works always
   - **Priority:** HIGH

### Category G: Navigation & UX

10. **[NAV-01] Menu Mobile Contact Navigation**
    - **Issue:** Clicking "Contato" redirects to Home instead of scrolling
    - **Fix:** Always scroll to contact section of current page
    - **Priority:** CRITICAL

2. **[NAV-02] Landing Page Back Button**
    - **Issue:** No back button or wrong placement
    - **Fix:**
      - Add small CTA back button
      - Location: Footer of Hero section
      - Behavior: Return to previous page (Portfolio or other)
      - Never at top, never overlapping header
    - **Priority:** HIGH

---

## 🔄 DEPENDENCY GRAPH

```
DS-01 (Mobile Typography)
  ├─> LAYOUT-02 (Hero Sobre Subtitle)
  └─> (All other mobile text fixes inherit)

CTA-01 (Small CTA Fix)
  └─> NAV-02 (Landing Back Button uses small CTA)

Independent:
- LAYOUT-01 (Contact Order)
- MOTION-01 (About Origens)
- LAYER-01 (About Believe)
- VIDEO-01 (About Closing)
- VIDEO-02 (Card Popup)
- LAYOUT-03 (Portfolio Section)
- NAV-01 (Menu Mobile)
- CTA-02 (Landing Final CTA)
```

---

## 🎭 AGENT ASSIGNMENT

### Phase 1: Design System Foundation

**Agent:** `design-system-specialist`

- **Task:** DS-01 (Mobile Typography Global Fix)
- **Deliverable:** Updated GHOST-DESIGN-SYSTEM + global CSS

### Phase 2: Frontend Implementation (Parallel)

**Agent:** `frontend-specialist`

- **Tasks:**
  - CTA-01 (Small CTA Fix)
  - LAYOUT-01 (Contact Order)
  - LAYOUT-02 (Hero Sobre - after DS-01)
  - LAYOUT-03 (Portfolio Section)
  - VIDEO-01 (About Closing Video)
  - VIDEO-02 (Card Popup)
  - NAV-01 (Menu Mobile)
  - NAV-02 (Landing Back Button)
  - CTA-02 (Landing Final CTA)

### Phase 3: Motion Sync

**Agent:** `motion-choreographer` (MCP Motion)

- **Task:** MOTION-01 (About Origens Sequence)
- **Validation:** Ensure no regressions

### Phase 4: Layering Fix

**Agent:** `frontend-specialist` (or `3d-specialist` if available)

- **Task:** LAYER-01 (About Believe Z-Index)

### Phase 5: QA & Validation

**Agent:** `test-engineer`

- **Checklist:** All 11 points
- **Platforms:** Desktop + Mobile
- **Regression:** Zero tolerance

---

## 📊 EXECUTION ORDER

| Phase | Agent | Tasks | Parallel? |
|-------|-------|-------|-----------|
| 1 | design-system-specialist | DS-01 | NO (blocking) |
| 2 | frontend-specialist | CTA-01, LAYOUT-01, LAYOUT-03, NAV-01, VIDEO-01, VIDEO-02 | YES |
| 2 | frontend-specialist | LAYOUT-02 (after DS-01) | NO (depends on Phase 1) |
| 3 | motion-choreographer | MOTION-01 | NO (after Phase 2) |
| 4 | frontend-specialist | LAYER-01, NAV-02, CTA-02 | YES |
| 5 | test-engineer | Full QA | NO (final) |

---

## ✅ SUCCESS CRITERIA

### Per-Issue Validation

- [ ] DS-01: Mobile text readable, Design System updated
- [ ] CTA-01: Small CTAs independent, no inheritance
- [ ] LAYOUT-01: Contact order correct on mobile
- [ ] LAYOUT-02: Hero subtitle readable on mobile
- [ ] MOTION-01: Image enters first, text second, no regressions
- [ ] LAYER-01: Text/3D visible, correct z-index
- [ ] LAYOUT-03: Portfolio section spacing correct
- [ ] VIDEO-01: Correct video, real size, mobile + desktop
- [ ] VIDEO-02: Popup works, autoplay + sound
- [ ] NAV-01: Menu scrolls to contact, no redirect
- [ ] NAV-02: Back button in hero footer, small CTA
- [ ] CTA-02: Landing uses `<AntigravityCTA />`

### Global Validation

- [ ] Zero regressions on unaffected pages
- [ ] All animations still work
- [ ] GHOST-DESIGN-SYSTEM compliance 100%
- [ ] Desktop + Mobile tested
- [ ] TypeScript + ESLint passing

---

## 🚨 RISK ASSESSMENT

| Risk | Mitigation |
|------|------------|
| Breaking existing animations | Test MOTION-01 in isolation first |
| CTA inheritance cascade | Use CSS specificity audit |
| Video loading failures | Add fallback + error handling |
| Z-index conflicts | Follow GHOST-DESIGN-SYSTEM layers strictly |
| Mobile typography breaking desktop | Use responsive clamp() functions |

---

## 📁 FILES TO MODIFY (Estimated)

### Design System

- `docs/PORTFOLIO/GHOST-DESIGN-SYSTEM.md`
- `src/styles/globals.css` (or equivalent)

### Components

- `src/components/ui/AntigravityCTA.tsx` (verify)
- Small CTA component (locate and fix)
- Video popup component
- Navigation menu component

### Pages

- Contact section (mobile order)
- About/Sobre Hero
- About Origens
- About Believe
- About Closing
- Portfolio Showcase
- Landing Pages (all)

### Estimated Total: 15-20 files

---

## 🎯 NEXT STEP

**Awaiting User Approval to Execute**

Once approved, I will:

1. Invoke `design-system-specialist` for Phase 1
2. Wait for completion
3. Invoke `frontend-specialist` for Phase 2 (parallel tasks)
4. Invoke `motion-choreographer` for Phase 3
5. Invoke `test-engineer` for Phase 5
6. Generate final orchestration report

**Estimated Total Time:** 90-120 minutes

---

**Plan Status:** ✅ READY FOR EXECUTION  
**Approval Required:** YES
