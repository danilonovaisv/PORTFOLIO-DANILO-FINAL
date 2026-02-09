# Audit Report: Admin Configuration + Asset Sync

**Date:** 2026-02-09  
**Scope:** `/admin`, Supabase Auth/Storage/Realtime wiring, asset sync pipeline (`scripts/*`)  
**Method:** `ai-prompting` (context-first + phased validation), `subagent-driven-development` (task gates), `supabase-auth-storage-realtime-core` (Auth+Storage+Realtime consistency)

## Executive Summary

Current status is **ACTION REQUIRED** for Admin reliability.  
The main recurring-risk cluster is **asset synchronization drift** caused by:

1. runtime/config fallback inconsistency (hardcoded project URLs + env key mismatch),
2. partial bypass of server actions in Admin media operations,
3. incomplete realtime strategy (single-load provider + static API fallback),
4. brittle pre-deploy scripts that can validate against the wrong project.

---

## Findings (ordered by severity)

## P0 - Critical

1. **Cross-environment drift from hardcoded Supabase project URLs**
   - Impact: Assets can resolve to the wrong Supabase project, causing broken previews, stale media, and "sync worked in admin but not on site".
   - Evidence:
     - `src/lib/supabase/urls.ts:2`
     - `src/config/brand.ts:6`
     - `src/contexts/site-assets.tsx:98`
     - `src/components/sobre/sections/AboutClosing.tsx:17`
     - `src/components/sobre/sections/AboutClosing.tsx:21`
     - `src/components/sobre/3d/GhostModel.tsx:27`
     - `src/styles/fonts.css:63`
     - `src/lib/supabase/image-loader.ts:7`
     - `src/lib/supabase/supabase-image-loader.js:2`
   - Additional signal: `rg` found 137 hardcoded project-ref URL occurrences across `src/` and `scripts/`.

2. **Admin media mutations partially bypass server action/audit path**
   - Impact: Upload/toggle actions can skip standardized server-side normalization, audit consistency, and route invalidation rules; this increases "it changed in DB but UI did not sync".
   - Evidence:
     - direct client update of `file_path`: `src/components/admin/AssetCard.tsx:44`
     - direct client toggle of `is_active`: `src/components/admin/AssetCard.tsx:73`
     - canonical audited path exists in server action: `src/app/admin/(protected)/midia/actions.ts:29`

## P1 - High

1. **Wrong route invalidation target for About page**
   - Impact: Media updates may not refresh `/sobre` caches because invalidation currently targets a non-existent route (`/about`).
   - Evidence:
     - `src/app/admin/(protected)/midia/actions.ts:164`
     - `src/app/about` does not exist in current app routing.

2. **Asset API fallback is static-cached for 1 hour**
   - Impact: Any path using `/api/site-assets` fallback can stay stale for up to 3600s after Admin updates.
   - Evidence:
     - `src/app/api/site-assets/route.ts:6`
     - `src/app/api/site-assets/route.ts:7`
     - Fallback usage in layout loader: `src/components/layout/AssetLoaderWrapper.tsx:33`

3. **Realtime subscription setup is incomplete for broadcast private-channel best practice**
   - Impact: Silent channel failures or intermittent updates (especially with stricter Realtime auth/policies).
   - Evidence:
     - no `private: true` or `realtime.setAuth()` in asset channel:
       - `src/hooks/useRealtimeAssets.ts:56`
     - no `private: true` in projects channel:
       - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx:68`
     - project docs require broadcast-first model:
       - `supabase/schemas/03_realtime.sql:3`

4. **Conflicting Realtime strategy definitions in SQL sources**
   - Impact: Team operational confusion during migrations and incident response.
   - Evidence:
     - "NOT using publication" comment:
       - `supabase/schemas/03_realtime.sql:3`
     - publication changes still present:
       - `supabase/schema.sql:298`

5. **Env contract inconsistency for publishable key name**
   - Impact: Runtime may unexpectedly fall back to anon key or fail under environments using only one variant.
   - Evidence:
     - code expects `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`:
       - `src/lib/supabase/server.ts:14`
       - `src/lib/supabase/client.ts:38`
       - `src/lib/supabase/middleware.ts:8`
     - production file uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`:
       - `.env.production:2`
     - legacy proxy file also references `PUBLISHABLE_KEY`:
       - `src/lib/supabase/proxy.ts:11`

## P2 - Medium

1. **`admin:prepare` pipeline chains mutating scripts before deploy with no safety gate**
   - Impact: accidental data rewrites during prep, especially in production-like shells.
   - Evidence:
     - `package.json:34`
     - scripts include repair/update DB operations.

2. **Storage check script validates against a different hardcoded project**
   - Impact: false negatives/positives in link checks and wrong corrective decisions.
   - Evidence:
     - `scripts/check-storage-links.ts:48`

3. **Environment validation is non-blocking even when required keys are missing**
   - Impact: deploy proceeds with broken config and causes runtime sync failures.
   - Evidence:
     - `scripts/validate-env.cjs:53`

4. **Duplicate `useSiteAssetUrl` exports in different modules**
   - Impact: import confusion and inconsistent URL behavior.
   - Evidence:
     - `src/contexts/site-assets.tsx:68`
     - `src/hooks/useSiteAssetUrl.ts:23`

---

## Correction + Improvement Plan (approval gate)

## Phase 1 - Stabilize (quick wins, low risk)

1. Fix route invalidation target `/about` -> `/sobre`.
2. Remove all hardcoded Supabase project URLs from runtime code paths and use a single resolver (`getSupabaseBaseUrl`).
3. Normalize env contract to one publishable variable family and support explicit migration fallback with deprecation warning.
4. Make `validate-env` fail fast in CI/production mode.

## Phase 2 - Admin write path hardening

1. Move all Admin media writes (upload path update / active toggle) into server actions.
2. Enforce audit logging for every media mutation path.
3. Keep client components UI-only; no direct table mutation from browser components.

## Phase 3 - Realtime reliability

1. Standardize Realtime channel config for broadcast:
   - authenticated channel setup,
   - explicit error/status handling,
   - fallback polling policy.
2. Replace one-shot `AssetLoaderWrapper` behavior with managed refresh/subscription strategy.
3. Revisit `/api/site-assets` cache policy for operational fallbacks (short TTL or dynamic with tag revalidation).

## Phase 4 - Script pipeline safety

1. Split mutating scripts from verification scripts (`admin:prepare:verify` vs `admin:prepare:mutate`).
2. Add `--dry-run` default for repair/update scripts.
3. Remove wrong-project hardcoded URL from `check-storage-links.ts`.

## Phase 5 - Verification + deploy gate

1. Run verification:
   - `pnpm run lint`
   - `pnpm run typecheck`
   - `pnpm run test`
   - targeted Admin media flow smoke test
   - realtime sync scenario (admin tab + anonymous tab, no refresh)
2. Run deploy only after all gates pass.

---

## Proposed Execution Tasks (subagent-driven style)

1. Task A: Env contract + URL resolver unification.
2. Task B: Admin media server-action-only mutations + audit enforcement.
3. Task C: Realtime channel hardening and fallback behavior.
4. Task D: Script safety refactor (`dry-run`, verify/mutate split).
5. Task E: Full verification and deploy.

For each task: implementation -> spec compliance review -> code quality review -> next task.
