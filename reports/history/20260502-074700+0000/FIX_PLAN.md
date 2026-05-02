# FIX_PLAN

Generated at: `2026-05-02T07:47:00+00:00`

## Auto-fix Eligible Findings
1. [firebase] `medium` Missing cache-control policy for _next/static
   - Category: `cache_control`
   - Recommendation: Add immutable long-term caching for `/_next/static/**`.

## Guardrails
- Never apply storage policy changes without backup artifact.
- Never modify `firebase.json` without diff preview.
- Always re-audit after mutation.
