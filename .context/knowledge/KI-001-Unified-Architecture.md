# KI-001: Unified Utility Architecture & Single Source of Truth

**Date:** 2026-02-08
**Context:** Master Audit Phase 4
**Decision:** Consolidate utilities into `src/lib/utils.ts`.

## 🧠 The Problem

The project had fragmented utility functions spread across:

- `src/utils/` (Legacy)
- `src/lib/utils/` (Newer pattern)
- `src/lib/utils.ts` (Attempt at unification)

This caused confusion about where to import `cn()`, `formatDate()`, or asset helpers from, leading to duplicate code and inconsistent behavior.

## 💡 The Solution

We adopted a **Single Source of Truth** pattern for core utilities.

1. **Canonical File:** `src/lib/utils.ts` is now the ONLY place for general-purpose helpers.
2. **Migration:**
   - `math.ts` (lerp, clamp) -> Moved inside `src/lib/utils.ts`.
   - `assets.ts` (getAssetUrl) -> Moved inside `src/lib/utils.ts`.
3. **Strict Import Rule:**
   - ✅ `import { cn, getAssetUrl } from '@/lib/utils'`
   - ❌ `import ... from '@/utils/...'` (Folder deleted)

## ⚠️ Pitfalls Avoided

- **Circular Dependencies:** By keeping `utils.ts` pure (no complex component imports), we avoid cycles.
- **Ghost Imports:** Automating the refactor with `sed` prevented leaving broken imports in obscure files.
