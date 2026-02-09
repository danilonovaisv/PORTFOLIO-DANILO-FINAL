# MASTER AUDIT PLAN & SYSTEMIC EXECUTION (GHOST SYSTEM v3)

**Status**: Phase 1 in Progress
**Date**: 2026-02-08
**Owner**: Ghost Commander (@antigravity)

---

## 🎯 OBJECTIVE

Sanitize, reorganize, and optimize the entire project ecosystem. Eliminate duplication, inconsistencies, and technical debt. Align with `AGENT.md` (Ghost System Protocol).

---

## FASE 1 — GLOBAL AUDIT

### 1.1 Folder Structure Audit

| Path | Function | Observed Issues | Suggested Action |
| :--- | :--- | :--- | :--- |
| `/src/app` | Next.js App Router | Contains route groups and pages. | Verify `admin` security middleware. Check `auth` vs `supabase` auth handling. |
| `/src/components` | UI Components | Grouped by feature (`admin`, `canvas`, `home`, `sobre`, `ui`). | Potential duplication between `ui` and `layout`. Check for "ghost" components in `canvas`. |
| `/src/lib` | Utilities | Logic and helpers. | Check for duplicate helpers or overlap with `utils` folder. |
| `/docs` | Documentation | **HEAVY CLUTTER**. Many `AUDIT_*` files, legacy plans (`PLAN.md`, `STRATEGY.md`). | **CRITICAL**: Archive old audits. Consolidate into `docs/archive` or delete. Keep only active sources of truth. |
| `.context` | Agent Memory | Agent rules, logs, manifest. | Ensure `project-manifest.md` is up to date. |
| `/src/store` | State Management | Zustand stores. | Verify if stores are too granular or monolithic. |
| `/src/styles` | Global Styles | CSS/Tailwind. | Verify `globals.css` purity and design tokens. |

### 1.2 Code Audit (Planned)

- [ ] **Hooks**: Identify duplicate fetches and `useEffect` cleanup issues.
- [ ] **Components**: Identify "God Components" (>200 lines) and break them down.
- [ ] **Performance**: Check for heavy computations outside `useMemo`.
- [ ] **Ghost System**: Verify `GhostCanvas` integration and performance (FPS).

### 1.3 Data Audit (Planned)

- [ ] **Supabase**: Audit Tables, RLS Policies, and Realtime cost.
- [ ] **Firebase**: Check Functions configuration and `firebase.json` alignment.

---

## FASE 2 — ALIGNMENT (AGENT.md)

*To be populated after Audit*

- **Color Conflict**: `AGENT.md` states Primary Red (`#E50914`), but Memory/Prompt states Primary Blue (`#0048ff`). **Decision Required**: Confirm `00-global-identity.md` override.

---

## FASE 3 — IMPLEMENTATION PLAN

*To be populated after full Audit*

---

## DOCUMENT HISTORY

- **2026-02-08**: Initial Creation. Mapped folder structure.
