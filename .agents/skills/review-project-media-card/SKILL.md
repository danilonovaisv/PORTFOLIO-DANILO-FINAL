---
name: review-project-media-card
description: Evaluate and improve a portfolio card that can display image, video, or HTML-based preview media, ensuring geometry sharing and mobile/touch resilience.
---

# Review Project Media Card

## Purpose
Evaluate and improve a portfolio card that can display image, video, or HTML-based preview media.

## Use When
Changing Home/Portfolio cards, media previews, hover/touch behavior, crop, loading, or animation.

## Do Not Use When
Working on unrelated Admin CRUD or database schema.

## Required Context
ProjectCard/MediaCard implementation, media resolver, relevant page layout, representative project data.

## Inputs
Card route/component and desired behavior.

## Procedure
1. Identify supported media types.
2. Map default/loading/preview/error/reduced-motion states.
3. Inspect desktop pointer behavior.
4. Inspect touch/mobile behavior without assuming hover.
5. Confirm shared frame geometry and crop rules.
6. Confirm video autoplay constraints: muted, playsInline, loop only when intended.
7. Check preload/lazy/in-view policy.
8. Check HTML preview lifecycle, pointer events and isolation.
9. Verify off-screen media stops unnecessary work.
10. Test fallback when dynamic media fails.
11. Verify mobile/tablet/desktop.

## Output
Findings, delta changes, state matrix, verification evidence.

## Validation
No layout jump, usable touch behavior, fallback works, reduced motion respected, regressions absent.

## Security
Treat embedded HTML and remote asset URLs as untrusted input; preserve existing sanitization/sandbox boundaries.
