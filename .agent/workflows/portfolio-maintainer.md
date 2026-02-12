---
description: Master Protocol for project maintenance and health checks.
---

# Portfolio Maintainer

This consolidated workflow performs periodic checks on the health of the portfolio's critical layers: Storage, Rendering, and Deployment.

## Trigger

- "Run a health check on the project"
- "Audit the system"
- "Fix everything"

## Check 1: Supabase Connectivity & Policy (High Priority)

1. **Tool**: Run `supabase-fixer` protocol (phase 1: audit).
2. **Action**: Verify `supabase_realtime` and `storage.objects` permissions (RLS).
3. **Failure**: Create implementation plan for SQL fixes from artifact.

## Check 2: Firebase Environment Consistency (Medium Priority)

1. **Tool**: Use `firebase-devops-orchestrator` (phase 1: audit config).
2. **Action**: Check `package.json` vs `.firebaserc` (webframeworks enabled).
3. **Failure**: Update `firebase.json` or `package.json` engines.

## Check 3: WebGL Performance Smoke Test (Low Priority)

1. **Tool**: Run `r3f-visual-debugger` (phase 1: instrumentation).
2. **Action**: Check for `Stats` component presence and frame drops.
3. **Failure**: Flag high-draw-call scenes for optimization.

## Artifacts

- Maintenance Log
- SQL Migration Plan (if any)
- Performance Stats report (optional)

## Success Criteria

- All system checks pass (green).
- Detailed report generated with clear action items.
