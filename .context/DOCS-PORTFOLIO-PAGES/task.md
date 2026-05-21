# Task List — Media Rendering + Ghost Hero + Firebase Assets

## Task 1 — Clean Planning Artifacts

- Replace `.context/DOCS-PORTFOLIO-PAGES/implementation_plan.md`.
- Replace `.context/DOCS-PORTFOLIO-PAGES/task.md`.
- Confirm no conflict markers remain in `.context`, `src`, `scripts`, `public`, `package.json`, or `firebase.json`.

Expected command:

```bash
rg -n "^(<<<<<<<|=======$|>>>>>>>)" .context src scripts public package.json firebase.json
```

Expected result: no output.

## Task 2 — Enforce Responsive Video Contract

- Keep native `<source media>` in `ResponsiveVideo`.
- Add `fitPolicy?: 'contain' | 'cover'`.
- Default to `contain`.
- Preserve existing props and `forwardRef`.
- Do not reintroduce `useMediaQuery`, mounted flags, or JS source swapping.

Expected checks:

```bash
pnpm run typecheck
pnpm run lint
```

## Task 3 — Add Video Metadata

- Extend `src/lib/video-assets.ts` with:
  - `desktopAspect`
  - `mobileAspect`
  - `fitPolicy`
- Keep Supabase public URLs as SSOT.
- Export `CRITICAL_VIDEO_URLS` for deployment verification or future tooling.

Measured asset aspects:

- Home manifesto: desktop `752 / 423`, mobile `1 / 1`.
- About hero: desktop `16 / 9`, mobile `9 / 16`.
- About closing: desktop `16 / 9`, mobile `10 / 9`.
- About method: desktop `16 / 9`, mobile `1 / 1`.
- Portfolio hero: desktop `16 / 9`, mobile `4 / 5`.

## Task 4 — Remove Crop From Critical Consumers

- Replace critical `object-cover` video usage with `object-contain`.
- Align wrappers to measured mobile/desktop aspect where the layout is not full-screen.
- Keep overlays, captions, motion gates, accessibility labels, and source URLs unchanged.

Primary surfaces:

- `VideoManifesto`
- `AboutHero`
- `AboutMethod`
- `AboutClosing`
- `PortfolioHeroNew`
- `FeaturedProjectCardFrame`

## Task 5 — Harden Firebase Asset Preflight

- Update `scripts/verify-supabase-assets.mjs` to parse all Supabase MP4 URLs from `src/lib/video-assets.ts`.
- Fail if the list is empty.
- Fail on any failed `HEAD` request.
- Keep `SKIP_ASSET_VERIFY=1` bypass for controlled emergency use.

Expected command:

```bash
pnpm run verify:assets
```

Expected result: all critical videos return OK.

## Task 6 — Validate Build + Deploy Readiness

Run:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run verify:assets
plugins/ghost-firebase-deploy/scripts/deploy.sh preflight
```

Do not run production deploy unless explicitly requested.

## Acceptance Criteria

- No merge markers remain.
- TypeScript passes.
- Lint passes.
- Production build passes.
- Supabase asset verification passes.
- Firebase preflight passes.
- Critical videos render without crop and without distortion.
- Ghost Hero glow remains stable with no visible flicker regression.
