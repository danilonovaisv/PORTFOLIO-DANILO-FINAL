---
name: firebase-deploy
description: >
  This skill should be used when the user asks to "deploy to Firebase", "configure Firebase Hosting",
  "set up firebase.json for Next.js", "create .firebaserc", "configure Firebase rewrites",
  "deploy a Next.js app to Firebase", "set up Firebase caching headers", "configure Firebase
  for SSR", "set up Firebase Hosting with Next.js App Router", "run firebase deploy",
  "configure firebase hosting rewrites", or any request related to deploying a Next.js
  project to Firebase Hosting.
metadata:
  version: "0.1.0"
  author: "Danilo Novais"
---

# Firebase Hosting — Next.js Deployment

## Deployment Strategy

Firebase Hosting supports two approaches for Next.js — choose based on requirements:

### Option A: Static Export (Pure CDN, no SSR)
Best for: Portfolios, marketing sites, content that doesn't need server-side rendering.

```javascript
// next.config.ts
const nextConfig = {
  output: 'export',        // Generates static HTML
  trailingSlash: true,     // Required for Firebase SPA routing
  images: { unoptimized: true }, // next/image needs this for static export
};
```

### Option B: SSR with Firebase Cloud Functions (Recommended)
Best for: Dynamic content, API routes, ISR (Incremental Static Regeneration).

Uses the `@apphosting/adapter-nextjs` or manual Cloud Functions setup.

## Critical Rules

1. **Never commit `.env.local`** — use Firebase environment config instead
2. **Always set cache headers** on static assets — Firebase won't do this automatically
3. **Rewrites must be ordered**: specific routes before catch-all `**`
4. **`trailingSlash: true`** is required in `next.config.ts` for Firebase SPA routing
5. **Run `next build` before `firebase deploy`** — Firebase deploys the built output

## File Checklist

Every Firebase deployment needs:
- [ ] `firebase.json` — hosting config, rewrites, headers
- [ ] `.firebaserc` — project ID binding
- [ ] `next.config.ts` — correct `output` setting
- [ ] `.env.production` variables configured in Firebase Console
- [ ] Firebase CLI authenticated: `firebase login`

## Terminal Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
firebase init hosting

# Build Next.js
npm run build

# Deploy
firebase deploy --only hosting

# Deploy with message
firebase deploy --only hosting -m "feat: initial deploy"

# Preview channel (for PRs/staging)
firebase hosting:channel:deploy preview-branch --expires 7d
```

## Reference Files

Load for complete file implementations:
- `references/firebase-config.md` — firebase.json, .firebaserc, full deployment configs for both static and SSR modes
