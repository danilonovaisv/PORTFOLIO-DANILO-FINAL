---
name: review-project-case-page
description: Improve /projects/[slug] as an editorial case-study experience, balancing rich vs. sparse content and separating text vs. media widths.
---

# Review Project Case Page

## Purpose
Improve `/projects/[slug]` as an editorial case-study experience.

## Use When
Changing project landing pages, case blocks, full-bleed media, credits, related/next navigation.

## Required Context
Project route, data model, current renderer, project-content components, representative published cases.

## Inputs
Case page route, slug, observed layout, editorial requirements.

## Procedure
1. Trace slug -> data fetch -> renderer.
2. Inventory existing content blocks.
3. Separate text width from media width.
4. Check hierarchy: hero, context, work/process, result, credits, next navigation as supported by content.
5. Preserve sparse projects: do not force empty sections.
6. Define responsive behavior for every block.
7. Verify media aspect ratios and loading.
8. Verify direct URL, refresh, internal navigation and missing-slug behavior.
9. Check semantic headings and keyboard/accessibility basics.
10. Add visual/regression checks for representative cases.

## Output
Delta spec, affected blocks, responsive behavior, validation results.

## Validation
Representative sparse and rich projects render correctly across viewport sizes.

## Security
Do not render arbitrary unsanitized HTML unless the project already has an explicit trusted/sandboxed mechanism.
