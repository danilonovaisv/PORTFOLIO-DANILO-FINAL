# Token Consolidation Report (Ghost System)

**Date:** 2026-02-09
**Auditor:** Ghost Commander (@antigravity)

## 1. Overview

This report documents the findings from the Structural and Visual Audit of the `PORTFOLIO-DANILO-FINAL` codebase. It serves as the justification for the decisions made in the accompanying `GHOST-DESIGN-SYSTEM.md`.

## 2. Structural Findings

### 2.1 Colors

* **Source of Truth:** `src/app/globals.css` define the core palette using both CSS Variables (`--color-bluePrimary`) and Tailwind v4 Theme (`--primary`, `--background`).
* **Inconsistency:** Duplicate definitions. `globals.css` has `--color-bluePrimary: #0048ff` AND `--primary: oklch(0.205 0 0)` (which is dark) in root, but then overrides `--primary` in `.dark` mode to `oklch(0.922 0 0)` (light). This suggests a confusion between "Semantic Primary" (the brand color) and "UI Primary" (the foreground text color in Shadcn convention).
* **Decision:**
  * **Brand Primary** (`#0048ff`) will be codified as `Blue 500` / `Brand Pure`.
  * **UI Primary** (Shadcn) will remain for component logic but mapped clearly.
  * **Void Black** (`#040013`) is consistent as the background.

### 2.2 Typography

* **Source of Truth:** `globals.css` uses `clamp()` for fluid typography (`--font-display`, `--font-h1`).
* **Fonts:** `TT Norms Pro`, `PPSupplyMono`, `Outfit` are correctly variables.
* **Anti-pattern:** Found usages of `text-[14px]` (inferred) via global scan.
* **Decision:** Enforce usage of semantic classes (`.text-display`, `.text-body`) or Tailwind classes (`text-sm`) mapped to the fluid scale where possible.

### 2.3 Spacing & Layout

* **Source of Truth:** `.std-grid` in `globals.css` manages container padding responsively (`1.5rem` -> `6rem`).
* **Anti-pattern:** Arbitrary padding values found in individual components (e.g., `pt-[120px]`).
* **Decision:** Standardize section spacing to a "Rhythm" scale (e.g., `section-padding`).

## 3. Visual Verification (Browser Audit)

* **Home:** Confirmed "Ghost" aesthetic. Deep blue glow is central.
* **Admin:** Uses the standard card/input tokens. Consistent.
* **Showcase:** Minimalist.

## 4. Implicit Tokens (To be explicit)

The following were found hardcoded and will be tokenized:

* **Transition Duration:** `duration-700` (common for smooth reveals).
* **Z-Index:** High values found (`z-[99999]`). Will be mapped to a Z-Index scale (`z-toast`, `z-cursor`).
* **Glow opacity:** Often `0.5` or `0.8`. Will be tokenized as `opacity-glow`.

## 5. Consolidated Action Plan

1. Resulting `GHOST-DESIGN-SYSTEM.md` will effectively "lock" these decisions.
2. Future refactors should replace `text-[...]` and `z-[...]` with the new tokens.
