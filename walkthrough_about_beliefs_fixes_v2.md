# Walkthrough: About Beliefs Refinement v2

## Overview

This update refines the "About Beliefs" section based on explicit user feedback regarding layer order, specific animation directions, and mobile layout constraints.

## Changes Implemented

### 1. **Layer Order & Z-Index Strategy** (`AboutBeliefs.tsx`)

- **Objective:** Ensure the 3D Ghost model sits *above* textual elements for immersion, while maintaining usability.
- **New Hierarchy:**
  - **Z-70:** Final Reveal Overlay ("ISSO É GHOST DESIGN").
  - **Z-60:** Ghost 3D Scene (Now sits above standard text).
  - **Z-55:** Sticky Header ("ACREDITO NO...").
  - **Z-50:** Mobile Text Layer (Footer).
  - **Z-20:** Scrolling Content Sections.
  - **Z-0:** Global Background.

### 2. **Animation Directions** (`BeliefMobileTextLayer.tsx`)

- **Objective:** Match the textual description "Entra pela esquerda".
- **Fix:** Inverted the animation flow:
  - **Entry:** From Left (`-24px`) to Center (`0px`).
  - **Exit:** From Center (`0px`) to Right (`24px`).
  - **Position:** Adjusted to `bottom-[20%]` to better align with "rodapé" (footer) request.

### 3. **Header Positioning** (`BeliefFixedHeader.tsx`)

- **Objective:** Align header to "sticky top-24" on desktop instead of screen center.
- **Fix:** Changed layout container from `items-center` (center) to `items-start` with `pt-24` (desktop) and `pt-32` (mobile).

### 4. **Ghost Interaction & Alignment** (`GhostModel.tsx`, `GhostScene.tsx`)

- **Objective:** Ensure mouse interactions work despite `pointer-events-none` layering, and refine final alignment.
- **Fixes:**
  - Added `eventSource={document.body}` to `<Canvas>` to enable global mouse tracking for the tilt effect.
  - Updated `GhostModel` final phase to force `targetY = 0` (Screen Center) instead of maintaining the initial offset.

## Verification Checklist

1. **Mobile Text:** Confirm text slides in from the **Left**.
2. **Layering:** Confirm Ghost passes *over* the "Acredito no..." header text if they intersect.
3. **Final Reveal:** Confirm "ISSO É..." appears cleanly on top of everything at the end.
4. **Desktop Header:** Confirm it sticks to the top area (not middle) and fades out before the end.
