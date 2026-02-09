---
description: Master Protocol for production deployment. Unifies safe-deploy, deploy-guard, and standard deploy.
---

# 🚀 Master Deploy Protocol

**"The Launchpad"**
Secure, guarded, and automated deployment process for Next.js + Firebase.

## Pre-Flight Checks (MANDATORY)

// turbo

1. **Type Safety**: `npm run type-check`
// turbo
2. **Linting**: `npm run lint`
3. **Build Verification**: `npm run build`
   - *STOP* if any of these fail.

## SSR Guardrail

1. **Firebase Check**:
   - Verify `firebase.json` points to the correct destination.
   - Ensure `package.json` engines match Firebase Runtime (Node 18/20).
   - Check `src/` for hardcoded secrets.

## Deployment Execution

1. **Deploy Command**:
   - `firebase deploy --only hosting,functions` (or specific targets).
   - Watch the output stream for "SSR Failed" warning.

## Post-Launch Verification

1. **Live Check**:
   - Visit the production URL.
   - Verify Critical Paths:
     - Home Page (Hero Render).
     - Admin Login.
     - Projects Gallery.
2. **Rollback Plan**:
   - If critical failure: `firebase hosting:channel:deploy rollback_preview` (or specific rollback command if set up).

## Logging

- Update `.context/logs/deployment_log.md` with version and status.
