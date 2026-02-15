# FIX_PLAN

Generated at: `2026-02-15T10:02:31+00:00`

## Auto-fix Eligible Findings

1. [firebase] `high` Missing required hosting header: Strict-Transport-Security
   - Category: `hosting_headers`
   - Recommendation: Add hosting header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
2. [firebase] `high` Missing required hosting header: X-Frame-Options
   - Category: `hosting_headers`
   - Recommendation: Add hosting header `X-Frame-Options: DENY`.
3. [firebase] `high` Missing required hosting header: X-Content-Type-Options
   - Category: `hosting_headers`
   - Recommendation: Add hosting header `X-Content-Type-Options: nosniff`.
4. [firebase] `high` Missing required hosting header: Referrer-Policy
   - Category: `hosting_headers`
   - Recommendation: Add hosting header `Referrer-Policy: strict-origin-when-cross-origin`.
5. [firebase] `medium` Missing cache-control policy for \_next/static
   - Category: `cache_control`
   - Recommendation: Add immutable long-term caching for `/_next/static/**`.
6. [firebase] `medium` Missing cache-control policy for 3D/media assets
   - Category: `cache_control`
   - Recommendation: Add bounded cache-control for 3D/media assets to avoid stale visual artifacts.
7. [firebase] `low` Missing explicit no-store cache policy for /api routes
   - Category: `cache_control`
   - Recommendation: Add `Cache-Control: no-store` for `/api/**` routes.

## Guardrails

- Never apply storage policy changes without backup artifact.
- Never modify `firebase.json` without diff preview.
- Always re-audit after mutation.
