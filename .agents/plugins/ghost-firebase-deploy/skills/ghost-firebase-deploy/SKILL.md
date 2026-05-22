---
name: ghost-firebase-deploy
description: Run Firebase Hosting deploy workflows for the Ghost System portfolio. Use when the user asks to preflight, preview, or deploy this project to Firebase.
---

# Ghost Firebase Deploy

Use this skill for `/Users/danilonovais/PORTFOLIO-DANILO-FINAL`.

## Commands

Run from the project root:

```bash
plugins/ghost-firebase-deploy/scripts/deploy.sh preflight
plugins/ghost-firebase-deploy/scripts/deploy.sh preview [channel-id] [expires]
plugins/ghost-firebase-deploy/scripts/deploy.sh live
```

## Behavior

- `preflight` runs the repository Firebase deploy checks without deploying.
- `preview` runs preflight, builds the Next.js app, prepares Hosting assets when the repository script exists, and deploys a Firebase Hosting preview channel.
- `live` delegates to the repository's canonical `pnpm run deploy`, which includes preflight, build, Hosting preparation, cache cleanup, and Firebase deploy for Hosting plus Functions.

## Safety

- Do not deploy production unless the user explicitly asks for live/production deploy.
- Prefer `preview` for validation before production.
- Never print or commit `.env` values, Firebase tokens, or service account files.
- Read command output and confirm success before reporting completion.
