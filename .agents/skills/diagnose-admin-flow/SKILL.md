---
name: diagnose-admin-flow
description: Find the root cause of an ADMIN malfunction before applying a fix. Covers login, session continuity, protected routes, mutations, publishing, and uploads.
---

# Diagnose Admin Flow

## Purpose
Find the root cause of an ADMIN malfunction before applying a fix.

## Use When
Login, session, protected route, form mutation, publishing, upload, or Admin refresh behavior is broken.

## Do Not Use When
The issue is purely public-page styling.

## Required Context
Affected Admin route, expected behavior, reproduction steps, relevant auth/data/storage files.

## Inputs
Route, action, expected result, observed result, logs/network evidence if available.

## Procedure
1. Reproduce the issue.
2. Record browser-visible error, console, network status, and server error where available.
3. Identify server/client boundary.
4. Trace authenticated session and protected-route behavior.
5. Trace request/mutation payload.
6. If Supabase is involved, identify whether failure is auth, RLS, query, storage, or URL consistency.
7. Compare with a known-good neighboring Admin flow.
8. State root-cause evidence.
9. Apply the smallest safe fix.
10. Add or update a regression test.
11. Re-run the exact reproduction.

## Tools
Browser automation, repository tools, project tests; Supabase tools only if configured.

## Output
Root cause, fix, changed paths, tests, validation.

## Validation
Failure reproduces before fix and no longer reproduces after fix; relevant regression checks pass.

## Failure Conditions
Cannot reproduce, missing environment, permission denied, or destructive schema/policy change required.

## Security
Never log or reveal secrets. Never bypass RLS as a shortcut.
