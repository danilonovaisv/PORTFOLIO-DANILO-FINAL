# Asset Pipeline Repair Implementation Plan

## Goal

Make landing page media deterministic from Admin input to public rendering.

## Architecture

- `src/lib/media/asset-contract.ts` is the single media contract.
- Admin save normalizes uploads and URLs before writing `landing_pages`.
- Frontend parsing/rendering still accepts legacy paths and broken mixed formats, but resolves through the same contract before render.

## Before

```txt
Admin input -> mixed path/url/youtube string -> landing_pages.content -> renderer guesses type -> broken media
```

## After

```txt
Admin input -> asset contract -> public Supabase URL or YouTube embed URL -> landing_pages.content
Legacy DB value -> parser/renderer contract -> resolved asset or fallback UI
```

## Files Affected

- `src/lib/media/asset-contract.ts`: central `Asset`, `ResolvedAsset`, Supabase URL resolution, YouTube normalization.
- `src/lib/admin/services/landing-page-save.ts`: upload and save normalization.
- `src/lib/projects/template-schema.ts`: legacy read normalization.
- `src/components/admin/templates/MediaAssetField.tsx`: field-level validation.
- `src/components/projects/**`: resilient renderers for legacy, ALPA, and Master V2.
- `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/07-LANDING-PAGES.md`: admin docs.

## Risk Controls

- No DB migration. Existing rows remain readable.
- Public bucket strategy only. Signed URL strategy remains out of scope.
- Invalid legacy data renders fallback instead of raw broken media.
- YouTube autoplay still depends on browser policy, but embed URL is normalized.

## Validation

- Unit tests cover YouTube formats, Supabase paths, public URLs, invalid URLs, and empty legacy values.
- Typecheck/lint/build verify SSR-safe imports and render boundaries.
