---
description: Lightweight system health check (Supabase, Firebase, WebGL).
---

# Health Check Workflow

A fast, diagnostic-only workflow to quickly assess the status of key services without performing deep fixes. Useful for CI/CD pipelines or quick sanity checks.

## Phase 1: Connectivity (Supabase)

1. **Action**: Check if Supabase client connects and can fetch `auth.users` (if admin) or public data.
2. **Success**: HTTP 200 OK or valid JSON response.
3. **Failure**: Network error or Bad API Key.

## Phase 2: Configuration (Firebase/Next.js)

1. **Action**: Validate `next.config.mjs` exists and is valid JS.
2. **Action**: Validate `firebase.json` syntax.
3. **Success**: Files exist and are parsable.

## Phase 3: Assets (Storage)

1. **Action**: Verify accessibility of a critical asset (e.g., logo, hero model) via public URL.
2. **Success**: HTTP 200 OK on asset fetch.

## Output

- **Status Report**:
  - Supabase: [OK/FAIL]
  - Firebase Config: [OK/FAIL]
  - Assets: [OK/FAIL]
