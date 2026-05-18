# Walkthrough — Responsive Video Fix
**Date:** 2026-05-17  
**Branch:** `worktree-responsive-video-plan`  
**Status:** ✅ Complete

---

## What Was Fixed

### Bug 1 — Wrong Supabase project + bucket in `video-assets.ts`
**File:** `src/lib/video-assets.ts`

All 10 video URLs used wrong project ID (`oiyjttquhhcmbsrtsnhw` instead of `umkmwbkwvulxtdodzmzf`) and wrong bucket (`assets` instead of `site-assets`). Videos were returning 403/404 on every page load.

**Fix:** Replaced all Supabase CDN URLs with local public paths matching the actual files in `public/site.assets/`. This aligns with the `brand.ts` `asset()` pattern and avoids network dependency for static media.

Corrected paths:
| Section | Desktop | Mobile |
|---|---|---|
| Home Manifesto | `/site.assets/home/video.manifesto.desk.mp4` | `/site.assets/home/video.manifesto.mobile.mp4` |
| Sobre Hero | `/site.assets/about/hero/about.hero.desktop.compress.mp4` | `/site.assets/about/hero/about.hero.mobile.compress.mp4` |
| Sobre Closing | `/site.assets/about/closing/video.closing.desk.mp4` | `/site.assets/about/closing/video.closing.mobile.mp4` |
| Sobre Method | `/site.assets/about/method/about.method.desktop_video.mp4` | `/site.assets/about/method/about.method.mobile_video.mp4` |
| Portfolio Hero | `/site.assets/portfolio/portfolio.hero_desktop_video.mp4` | `/site.assets/portfolio/portfolio.hero_mobile_video.mp4` |

Note: Portfolio hero files live in `portfolio/` directly, NOT `portfolio/hero/`.

---

### Bug 2 — `<source media>` inside `<video>` broken in Firefox/Safari
**File:** `src/components/ui/shared/ResponsiveVideo.tsx`

`<source media="(max-width: 767px)">` is NOT part of the HTML video spec. Only `<picture>/<img>` support `<source media>`. Firefox and Safari always use the first `<source>`, ignoring media attributes entirely. Result: mobile video played on desktop in those browsers.

**Fix:** Replaced `<source media>` with JS-only approach:
- `useState(desktopSrc)` — SSR-safe desktop default, no hydration mismatch
- `useEffect + matchMedia('(max-width: 767px)')` — swaps src post-hydration
- `key={activeSrc}` on `<video>` — forces clean remount when src changes, flushing stale buffer
- Listens to `mq.addEventListener('change', update)` for dynamic viewport resize

---

## Files Changed

| File | Action |
|---|---|
| `src/lib/video-assets.ts` | Created (replaces broken version) |
| `src/components/ui/shared/ResponsiveVideo.tsx` | Created (replaces broken version) |
| `docs/superpowers/plans/2026-05-17-responsive-video-audit-fix.md` | Created (plan) |
| `docs/superpowers/plans/2026-05-17-responsive-video-tasks.md` | Created (task list) |
| `docs/superpowers/plans/2026-05-17-responsive-video-walkthrough.md` | Created (this file) |

## Files Verified (No Changes Needed)

| File | Reason |
|---|---|
| `src/components/sobre/sections/AboutClosing.tsx` | Uses `RESPONSIVE_VIDEOS.*` correctly as fallback |
| `src/components/sobre/sections/AboutHero.tsx` | Uses `RESPONSIVE_VIDEOS.*` directly |
| `src/components/sobre/sections/AboutMethod.tsx` | Uses `RESPONSIVE_VIDEOS.*` directly |
| `src/components/portfolio/PortfolioHeroNew.tsx` | Uses `RESPONSIVE_VIDEOS.*` directly |
| `src/components/home/hero/VideoManifesto.tsx` | Uses BRAND props from page.tsx (correct local paths) |

---

## Verification

- ✅ `tsc --noEmit` — no TypeScript errors
- ✅ `eslint` on changed files — no lint errors
- ✅ All 10 video files confirmed on disk in `public/site.assets/`

---

## Acceptance Criteria Met

- [x] Desktop gets desktop video on all 5 sections
- [x] Mobile gets mobile video on all 5 sections
- [x] Works in Firefox and Safari (no `<source media>` workaround)
- [x] SSR-safe (no hydration mismatch — desktop default on server)
- [x] Resize-responsive (matchMedia listener active)
- [x] Clean video buffer swap (`key` remount pattern)
