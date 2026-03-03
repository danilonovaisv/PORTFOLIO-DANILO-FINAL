---
description: Workflow for debugging Firebase Hosting + Next.js App Router
---

# Firebase DevOps Orchestrator

This protocol addresses build and deployment issues for Next.js 14+ on Firebase Hosting, particularly related to SSR/Cloud Functions ("Error 500" or build failures).

## Trigger

- "Firebase deploy failed with 404"
- "Functions failed with UNKNOWN error"
- "Infinite redirect loop on dynamic routes"

## Phase 1: Audit Configuration (firebase.json)

1. **Wait for webframeworks**:
   - Check if `experiments: { webframeworks: true }` is enabled or implicitly active (e.g., via `firebase experiments:enable webframeworks`).
   - Validate `next.config.mjs` has correct output settings (avoid `export` if SSR is needed).

2. **Wait for Secrets**:
   - Verify if `firebase-functions` dependencies are correctly present (`firebase-admin`, etc.).
   - Check if `engines` field in `package.json` matches Firebase runtime (e.g., `node: "18"` or `node: "20"`).

## Phase 2: Build Simulation & Secret Injection

1. **Pre-Deploy Check**:
   - Run `firebase emulators:start` to simulate production environment locally.
   - Run `firebase deploy --only hosting --dry-run` if applicable, or verify `npm run build` connects to required services (Supabase) via injected secrets.

2. **Secrets Handling**:
   - Ensure environment variables needed at build time (`generateStaticParams`, API calls) are available.
   - Use `firebase-functions:config:set` or `.env` file management strategies (avoid committing secrets).

## Phase 3: Route Handling (Rewrites)

1. **SPA Routing**:
   - Check `rewrites` in `firebase.json`:

     ```json
     "rewrites": [
       { "source": "**", "function": "server" }
     ]
     ```

   - Verify that dynamic routes are not accidentally treated as static assets.

2. **Preview Deployment**:
   - Deploy to a preview channel before merging to production.
   - `firebase hosting:channel:deploy preview_name`
   - Validate dynamic route loading (e.g., `/project/[slug]`).

## Success Criteria

- Deployment completes with exit code 0.
- Dynamic routes load correctly in preview URL.
- No `INTERNAL` errors in Cloud Functions logs.
