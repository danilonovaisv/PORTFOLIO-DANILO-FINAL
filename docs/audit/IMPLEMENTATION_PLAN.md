# IMPLEMENTATION PLAN: GHOST SYSTEM MASTER AUDIT

**Target**: `PORTFOLIO-DANILO-FINAL`
**Executor**: Ghost Commander (@antigravity)
**Risk Level**: Medium (File movements involved)

---

## 1. DOCUMENTATION & RULES ALIGNMENT

- [ ] **Archive Legacy Docs**: Move all `AUDIT_*.md`, `PLAN.md` (legacy), `STRATEGY.md` to `docs/archive/`.
- [ ] **Resolve Identity Crisis**: Update `AGENT.md` to define `#0048ff` (Deep Blue) as Primary, per User Instruction.
- [ ] **Update Manifest**: Ensure `.context/project-manifest.md` reflects the current directory structure.

## 2. STRUCTURE SANITIZATION

- [ ] **Eliminate Redundant Utils**:
  - Compare `src/utils/` and `src/lib/utils/`.
  - MERGE into `src/lib/utils/`.
  - DELETE `src/utils/`.
  - Update imports (Global Find/Replace).
- [ ] **Remove Dead Weight**:
  - DELETE `src/components/backup/`.
  - REVIEW `src/components/effects/` -> Move to `src/components/canvas/effects/` if valid.

## 3. CODE OPTIMIZATION

- [ ] **Global CSS**: Audit `src/styles/globals.css` for non-Tailwind bloat.
- [ ] **Console Cleanup**: Remove `console.log` from production code.

## 4. DATA INTEGRITY

- [ ] **Schema Check**: Verify `portfolio_projects` JSON usage (ensure types are strict).

---

## EXECUTION ORDER

1. **Docs Cleanup** (Low Risk)
2. **Identity Update** (Low Risk)
3. **Component/Structure Move** (Medium Risk - potential import breaks)
4. **Utils Merge** (High Risk - widespread import breaks)
5. **Final Validation**

## ROLLBACK STRATEGY

- If `Utils Merge` fails build: Revert file moves, restore `src/utils`.
- If `Identity Update` conflicts: Revert to Red (#mm), notify user.
