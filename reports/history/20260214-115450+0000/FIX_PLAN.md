# FIX_PLAN

Generated at: `2026-02-14T11:54:50+00:00`

## Auto-fix Eligible Findings

1. [supabase] `medium` Supabase Storage CORS baseline file is missing
   - Category: `storage_cors`
   - Recommendation: Create and version a restrictive CORS baseline for storage API calls.
2. [firebase] `medium` HSTS header present without preload
   - Category: `hosting_headers`
   - Recommendation: Upgrade HSTS to include preload for stricter browser enforcement.
3. [firebase] `high` Missing required hosting header: Referrer-Policy
   - Category: `hosting_headers`
   - Recommendation: Add hosting header `Referrer-Policy: strict-origin-when-cross-origin`.
4. [firebase] `medium` Missing cache-control policy for \_next/static
   - Category: `cache_control`
   - Recommendation: Add immutable long-term caching for `/_next/static/**`.
5. [firebase] `medium` Missing cache-control policy for 3D/media assets
   - Category: `cache_control`
   - Recommendation: Add bounded cache-control for 3D/media assets to avoid stale visual artifacts.
6. [firebase] `low` Missing explicit no-store cache policy for /api routes
   - Category: `cache_control`
   - Recommendation: Add `Cache-Control: no-store` for `/api/**` routes.

## Guardrails

- Never apply storage policy changes without backup artifact.
- Never modify `firebase.json` without diff preview.
- Always re-audit after mutation.
