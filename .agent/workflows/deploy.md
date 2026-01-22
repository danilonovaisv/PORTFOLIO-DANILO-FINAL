---
description: Build and Deploy to Firebase Hosting - Combined with testing workflow
---

1. Run the deploy script (includes testing)
   // turbo
2. npm run deploy

Note: This now runs `npm test` (with eslint, typecheck, and jest), followed by `next build`, and then `firebase deploy`. See RUN_TEST_AND_DEPLOY.md for complete instructions. The process ensures all tests pass before deployment occurs.