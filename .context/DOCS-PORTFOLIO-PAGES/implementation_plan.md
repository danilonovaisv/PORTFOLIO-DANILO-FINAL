# Implementation Plan — Media Rendering + Ghost Hero + Firebase Assets

## Summary

Definitive fix for three systemic failures:

1. Responsive videos must render without crop and without distortion.
2. Ghost Hero glow must stay stable under animation and resize.
3. Firebase deploy must not ship broken Supabase media URLs.

Decisions locked:

- Use Supabase Storage public URLs as the single source of truth for critical media.
- Use native `<source media>` for video source selection.
- Use adaptive aspect containers plus `object-contain` for critical videos.
- Firebase validates media availability before deploy; it does not mirror heavy media.

## Current State

- `ResponsiveVideo` already uses native `<source media>`, which avoids JS-driven source swaps and hydration remounts.
- The remaining crop risk came from consumers using fixed wrappers plus `object-cover`.
- `src/lib/video-assets.ts` contains hardcoded Supabase public MP4 URLs but did not expose metadata for layout decisions.
- `scripts/verify-supabase-assets.mjs` checked only a subset of critical videos.
- Ghost Hero glow parameters already use capped DPR, high bloom threshold, emissive lerp, and uniform eye-glow speed.
- These planning files previously contained merge conflict markers and must remain fully replaced, not manually merged.

## Architecture

### Responsive Video Contract

`src/lib/video-assets.ts` owns the critical video catalog:

- `desktop`
- `mobile`
- `desktopAspect`
- `mobileAspect`
- `fitPolicy: 'contain'`

Consumers must use the catalog metadata to size the video frame. Critical video surfaces must not use `object-cover`; use `object-contain` to guarantee no crop and no distortion.

`ResponsiveVideo` keeps the public API and adds one explicit prop:

```ts
fitPolicy?: 'contain' | 'cover'
```

Default: `contain`.

### Ghost Hero Glow Contract

Keep the current stable implementation:

- DPR capped at `1.5`.
- Bloom threshold high enough to avoid full-frame bloom.
- Emissive intensity updated via lerp, not direct sine assignment.
- Eye glow uses a single transition speed in both movement states.
- WebGL remains atmosphere only, aligned with Ghost Design System rules.

### Firebase + Supabase Asset Contract

Firebase deploy must fail before publishing if a critical Supabase asset is unreachable.

`scripts/verify-supabase-assets.mjs` must read `src/lib/video-assets.ts`, extract every Supabase MP4 URL, and `HEAD` check each URL. Any 4xx, 5xx, network failure, or empty URL list exits non-zero.

Deploy path remains:

```bash
plugins/ghost-firebase-deploy/scripts/deploy.sh preflight
plugins/ghost-firebase-deploy/scripts/deploy.sh preview [channel-id] [expires]
plugins/ghost-firebase-deploy/scripts/deploy.sh live
```

Production deploy requires explicit approval.

## Implementation Changes

- Update `ResponsiveVideo` to default to `object-contain` and support `fitPolicy`.
- Expand `RESPONSIVE_VIDEOS` with aspect metadata and `CRITICAL_VIDEO_URLS`.
- Change critical consumers to use `object-contain` and adaptive aspect wrappers:
  - Home manifesto
  - About hero
  - About method
  - About closing
  - Portfolio hero
  - Featured project cards
- Replace both `.context/DOCS-PORTFOLIO-PAGES` planning files to remove merge markers.
- Expand asset verification from three hardcoded URLs to every Supabase MP4 in the video catalog.

## Validation Plan

Run:

```bash
rg -n "^(<<<<<<<|=======$|>>>>>>>)" .context src scripts public package.json firebase.json
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run verify:assets
plugins/ghost-firebase-deploy/scripts/deploy.sh preflight
```

Manual/browser checks:

- Home manifesto video: no crop, no distortion, correct mobile/desktop source.
- `/sobre` hero, method, and closing videos: no crop, no distortion.
- `/portfolio` hero video: no crop, no distortion.
- Featured project cards: video thumbnails preserve full frame.
- Ghost Hero glow: no visible flicker, no full-frame bloom flash, stable after resize.

## Risks

- `object-contain` can show background bands when a video aspect differs from the viewport. This is intentional and preferred over crop/distortion.
- Existing visual compositions that depended on cover-style cropping may reveal more of the source frame.
- Supabase Storage availability is now a deployment gate; broken URLs block deploy instead of shipping silently.
