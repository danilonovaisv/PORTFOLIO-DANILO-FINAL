# FIX_PLAN

Generated at: `2026-02-16T15:04:15+00:00`

## Auto-fix Eligible Findings

1. [firebase] `low` Missing explicit no-store cache policy for /api routes
   - Category: `cache_control`
   - Recommendation: Add `Cache-Control: no-store` for `/api/**` routes.

## Guardrails

- Never apply storage policy changes without backup artifact.
- Never modify `firebase.json` without diff preview.
- Always re-audit after mutation.
