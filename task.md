# Firebase Supabase Asset Parity Task List

## Task 1 — Governance And Source Map

- [ ] Read `AGENTS.md`.
- [ ] Read `.antigravity/rules.md` if present.
- [ ] Read `.context/DOCS-PORTFOLIO-PAGES/` files relevant to Home, Sobre, Portfolio, and media/assets.
- [ ] Record constraints that affect deploy, asset URLs, Supabase Storage, and documentation sync.
- [ ] Do not edit code.

## Task 2 — Workflow Env Audit

- [ ] Read `.github/workflows/firebase-deploy.yml`.
- [ ] List every step that can run app code or `next build`.
- [ ] For each step, map available env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS`
  - `FIREBASE_PROJECT_ID`
- [ ] Identify steps where public Supabase vars are missing.
- [ ] Identify any step that could print secrets.

## Task 3 — Firebase Config Audit

- [ ] Read `firebase.json`.
- [ ] Read `.firebaserc`.
- [ ] Read `scripts/firebase-preflight.sh`.
- [ ] Read `scripts/deploy.sh`.
- [ ] Confirm workflow Firebase project equals `.firebaserc` default.
- [ ] Confirm deploy target should remain `--only hosting`.
- [ ] Confirm no explicit `--debug`.

## Task 4 — Next Config And Env Audit

- [ ] Read `next.config.mjs` and any other `next.config.*`.
- [ ] Read `.env.example`.
- [ ] Read `package.json` build/prebuild/postinstall scripts.
- [ ] Identify env vars evaluated during:
  - postinstall
  - validate-env
  - build-check
  - build
  - Firebase webframeworks deploy rebuild
- [ ] Confirm no static export mode changes URL handling unexpectedly.

## Task 5 — Supabase Client Audit

- [ ] Read Supabase client/server files under `src/lib/supabase/**`.
- [ ] Identify browser client creation.
- [ ] Identify server/admin client creation.
- [ ] Confirm browser client only uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` stays server-only.

## Task 6 — Asset Resolver Audit

- [ ] Locate asset URL resolver utilities.
- [ ] Locate asset data sources:
  - `assets.json`
  - `site-assets.ts`
  - Supabase asset tables if referenced
- [ ] Trace URL resolution for absolute Supabase URLs.
- [ ] Trace URL resolution for relative storage paths.
- [ ] Trace fallback URL handling.
- [ ] Identify where malformed URLs can become production media `src`.

## Task 7 — Root Cause Decision

- [ ] Classify failure as one or more:
  - missing GitHub secret
  - wrong secret name
  - env injected after build
  - wrong Firebase target
  - private bucket/public URL mismatch
  - resolver bug with relative paths
  - malformed stored asset records
- [ ] Pick minimum fix.
- [ ] Confirm fix does not require exposing service role key.

## Task 8 — Workflow Patch

- [ ] Patch `.github/workflows/firebase-deploy.yml`.
- [ ] Add safe env validation step before build.
- [ ] Ensure public Supabase env vars are present in install/build/preflight/deploy steps as required.
- [ ] Ensure service role is only present where server-side code requires it.
- [ ] Keep deploy command `pnpm dlx firebase-tools deploy --only hosting --project "${{ env.FIREBASE_PROJECT_ID }}"`.
- [ ] Keep logs secret-safe.

## Task 9 — Resolver Patch If Needed

- [ ] Patch existing asset URL resolver only if investigation proves app-side issue.
- [ ] Preserve absolute URLs.
- [ ] Use Supabase `getPublicUrl()` for public bucket object paths.
- [ ] Add fallback for empty/malformed media path.
- [ ] Do not create duplicate resolver.

## Task 10 — Verification

- [ ] Run YAML parse validation.
- [ ] Run `CI=true pnpm install --frozen-lockfile --ignore-scripts`.
- [ ] Run `pnpm run build-check`.
- [ ] Run `pnpm run firebase:preflight`.
- [ ] Run `pnpm run build`.
- [ ] Run Firebase deploy dry run if available; otherwise run non-debug deploy only after approval.
- [ ] Verify no service role key appears in client bundle/logs.

## Task 11 — Production Smoke

- [ ] Dispatch or observe GitHub `Firebase Deploy`.
- [ ] Confirm deploy succeeds.
- [ ] Open production pages using Supabase assets.
- [ ] Check representative image/video URLs.
- [ ] Verify URLs are absolute and not `undefined`, accidental relative, wrong bucket, or wrong project.
- [ ] Verify asset HTTP status `200`.

## Task 12 — Walkthrough

- [ ] Create `walkthrough.md`.
- [ ] Include before symptoms.
- [ ] Include root cause.
- [ ] Include exact files changed.
- [ ] Include validation commands/results.
- [ ] Include production smoke evidence.
- [ ] Include remaining risks and next improvements.
