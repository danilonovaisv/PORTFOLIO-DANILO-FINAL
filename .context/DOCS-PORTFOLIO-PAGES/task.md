# Task List — Media Card System

## Phase 1 — Audit

- [x] Identify project card media consumers.
- [x] Map current media fallback order.
- [x] Confirm existing grid/card sizing constraints.

## Phase 2 — Data Layer

- [x] Add `MediaFormat`, `MediaKind`, `MediaFit`, and `ProjectMedia`.
- [x] Add optional format metadata fields to `PortfolioProject`.
- [x] Keep `getCardMediaCandidates()` compatible for legacy string callers.
- [x] Add `resolveProjectMedia()` for typed card media.

## Phase 3 — Component

- [x] Create `MediaCard.tsx`.
- [x] Apply `aspect-square` and `aspect-video` by metadata.
- [x] Render both image and video with shared sizing behavior.
- [x] Default videos to `object-contain`.

## Phase 4 — Grid Integration

- [x] Replace duplicated image/video rendering in `ProjectCard`.
- [x] Replace duplicated image/video rendering in `FeaturedProjectCardFrame`.
- [x] Keep desktop/mobile media fallback behavior.
- [x] Preserve hover video behavior.

## Phase 5 — Validation

- [x] Add resolver tests.
- [x] Add `MediaCard` component tests.
- [x] Run existing `ProjectCard` tests.
- [x] Run typecheck.
- [x] Run lint.
- [x] Run production build with placeholder public env values.
- [x] Run local browser validation on `/portfolio` desktop/mobile.

## Remaining Follow-Up

- Replace inferred formats with explicit CMS/project metadata for every portfolio item.
- Decide whether image cards should also support `fit: 'contain'` for no-crop project thumbnails where visual inspection is more important than uniform fill.
