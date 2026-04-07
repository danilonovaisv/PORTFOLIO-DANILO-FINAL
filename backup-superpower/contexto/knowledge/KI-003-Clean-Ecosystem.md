# KI-003: Clean Ecosystem Protocols (Dead Code Zero Tolerance)

**Date:** 2026-02-08
**Context:** Master Audit Phase 5 (Cleanup)
**Decision:** Aggressive removal of unused code and artifacts.

## 🧠 The Problem

The project accumulated:

- `doc/AUDIT_*.md` (Stale reports).
- `src/components/backup/` (Fear-based hoarding).
- `src/styles/about-origin.css` (Orphaned styles).

This increased cognitive load and made it hard to find the "real" code.

## 💡 The Solution

We established a **Zero Tolerance Policy** for dead code.

1. **Archive Strategy:**
   - Old docs -> `docs/archive/`.
   - Old code -> Git History (NOT `backup/` folders).
2. **Deletion Protocol:**
   - "If it's not imported, it's gone."
   - We verified usage with `grep` before `rm`.

## ⚠️ Pitfalls Avoided

- **"Just in Case" Hoarding:** Using version control (Git) is the correct way to backup. Keeping folders named `backup` in `src` is an anti-pattern that breaks IDE search and refactoring tools.
