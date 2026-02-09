# Implementation Plan: CTA Standardization

**Objective:** Standardize all Call-to-Action (CTA) buttons across the Ghost Portfolio using the `AntigravityCTA` component, enforcing consistent minimum widths and "Blue default / Purple hover" behavior.

## 1. Design Token Definition

We need to define specific minimum widths to ensure uniformity regardless of text length.

**Proposed Tokens (`tailwind.config.ts`):**

* `min-w-cta-mobile`: `180px` (Estimated for accessibility and presence)
* `min-w-cta-tablet`: `200px`
* `min-w-cta-desktop`: `220px`

These will be added to `theme.extend.minWidth`.

## 2. Documentation Updates (`GHOST-DESIGN-SYSTEM.md`)

**New Section: 3.3 CTA Components**

* **Mandate:** All primary actions must use `<AntigravityCTA />`.
* **Rule:** CTAs must have a fixed minimum width to maintain visual rhythm.
* **Behavior:**
  * **Idle:** Blue (`#0048ff`) pill + Icon.
  * **Hover:** Purple (`#8705f2`) fill for Icon Circle. Pille remains Blue (or Purple? User said "Arrow Icon Circle - Blue default, Purple on hover").
  * *Correction:* `AntigravityCTA` code currently changes BOTH pill and icon bg to `#8705f2` on hover. The user request says "Arrow Icon Circle... Purple on hover". I will align the code to the specific request if needed, but `AntigravityCTA` seems to handle both. I'll document the *intended* behavior.

## 3. Component Refactoring

**Target Components:**

1. **`src/components/ui/AntigravityCTA.tsx`**:
    * Ensure it actually uses the `min-w` classes (it currently has them but they are undefined).
    * Verify color logic matches "Blue default, Purple on hover".

2. **`src/components/home/featured-projects/FeaturedProjectCard.tsx`**:
    * Replace any local button with `AntigravityCTA`.

3. **`src/components/home/contact/ContactSection.tsx`**:
    * Standardize the "Say Hello" or similar buttons.

4. **Legacy Cleanup**:
    * Identify usages of `CTAButton.tsx` and `PrimaryButton.tsx`.
    * Replace them one by one.

## 4. Verification Plan

### Automated

* `npm run build`: Ensure no type errors.
* `npm run lint`: Ensure clean code.

### Manual (Visual)

* Render `Home` and `Portfolio Showcase`.
* Hover over CTAs. Verify:
    1. Width is consistent (not shrinking for short text).
    2. Icon circle turns Purple on hover.
    3. Animation is smooth (Ghost physics).

## 5. Agent Roles

* **`frontend-specialist`**: Implement Tailwind config changes and Component refactors.
* **`documentation-writer`**: Update Design System docs.
