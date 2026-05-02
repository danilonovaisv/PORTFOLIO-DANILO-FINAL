# Walkthrough — Sobre Media Reliability

**Date:** 2026-05-02  
**Scope:** header logos, Section 06, Section 07, media fallbacks  
**Deploy:** not executed

## Confirmed

- `/sobre` renders `AboutBeliefs` before `AboutClosing`.
- Header logo source uses `SiteHeader` + `useSiteAssetUrl` + `SITE_ASSET_KEYS.logos`.
- Header logo click target remains `/`.
- Section 06 active files live under `src/components/sobre/sections/beliefs/**`.
- Section 07 active file is `src/components/sobre/sections/AboutClosing.tsx`.
- Supabase/public media used in validation:
  - `global.logo_header_light.svg` returned `200` in browser.
  - `about/closing/video.closing.desk.mp4` returned `206`.
  - `about/closing/video.closing.mobile.mp4` returned `206`.
  - `3d/ghost-v1.glb` returned `200`.

## Corrected

- Header local logo fallbacks now point to tracked files:
  - `/site.assets/global/logos/LogoLight.svg`
  - `/site.assets/global/logos/LogoDark.svg`
- `src/config/site-assets.json` was aligned for the same logo paths and `ghost-v1.glb` to avoid stale generated-contract drift.
- `SITE_ASSET_KEYS.logos.headerLight/headerDark` now target the active Supabase keys:
  - `global.logo_header_light`
  - `global.logo_header_dark`
- Closing video keys now use lowercase, active keys:
  - `video.closing.desk`
  - `video.closing.mobile`
- `useSiteAssetUrl` now accepts fallbacks already normalized as `/site.assets/...` without duplicating the prefix.
- Section 07 no longer preloads missing manifesto poster `.webp` files from `/sobre`.
- Section 07 uses `DEFAULT_VIDEO_POSTER` and a stable video frame.
- Section 07 video uses `object-contain` to avoid cropping.
- Section 07 resets error state on source change and reloads when `activeVideo` changes.
- Section 06 phrase content now comes from `ABOUT_CONTENT.beliefs`, removing the divergent hardcoded five-phrase set.
- Section 06 mobile phrase motion now uses short `translateX`; desktop uses `translateY`.
- Ghost static fallback images use `unoptimized` to avoid optimizer failures in constrained runtimes.

## Maintained

- No API, schema, or deploy changes.
- No switch to `about/beliefs/ghost-transformed.glb`; that template asset remains unverified.
- `frameloop="demand"` is preserved for Ghost 3D.
- `muted`, `playsInline`, `loop`, and `preload="metadata"` are preserved for Section 07 video.
- Ghost System colors and easing policy remain intact for the touched files.

## Validation Evidence

- `pnpm run typecheck` — passed.
- `pnpm run lint` — passed with 20 warnings outside this scope.
- `pnpm run build` — passed; `/sobre` prerendered as static.
- Browser validation against local build:
  - desktop screenshot: `/tmp/sobre-desktop-media-reliability.png`
  - mobile screenshot: `/tmp/sobre-mobile-media-reliability.png`
  - no `badResponses` for touched assets in the final browser pass.
  - mobile isolated rerun showed no `>=400` responses.

## Notes

- The existing dev server on port `3000` was already running but not responding to `/sobre`; it was not killed.
- Local validation used a separate production-style server after `pnpm run build`.
- The repo has unrelated dirty files and untracked folders outside this task; they were not reverted.
- `.context/DOCS-PORTFOLIO-PAGES` was updated because active Section 06 paths, Section 07 media contracts, and validation evidence changed.
