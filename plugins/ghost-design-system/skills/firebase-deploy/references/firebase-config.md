# Firebase Hosting Configuration Files

## firebase.json — Static Export (Next.js `output: 'export'`)

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "trailingSlash": true,
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp|avif|svg|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=86400, stale-while-revalidate=604800"
          }
        ]
      },
      {
        "source": "**/*.@(woff|woff2|ttf|otf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          },
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      },
      {
        "source": "**/*.@(glb|gltf)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "Permissions-Policy",
            "value": "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ]
  }
}
```

## firebase.json — SSR with Cloud Run (App Router + API Routes)

```json
{
  "hosting": {
    "public": ".firebase/hosting",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": false,
    "rewrites": [
      {
        "source": "/_next/static/**",
        "destination": "/_next/static/**"
      },
      {
        "source": "/images/**",
        "destination": "/images/**"
      },
      {
        "source": "/fonts/**",
        "destination": "/fonts/**"
      },
      {
        "source": "/models/**",
        "destination": "/models/**"
      },
      {
        "source": "**",
        "run": {
          "serviceId": "nextjs-app",
          "region": "us-central1"
        }
      }
    ],
    "headers": [
      {
        "source": "/_next/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "/fonts/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "/models/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

## .firebaserc

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  },
  "targets": {},
  "etags": {}
}
```

## lib/firebase/config.ts — Firebase Client SDK

```typescript
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Singleton pattern — prevents re-initialization in Next.js hot reload
let app: FirebaseApp;
let analytics: Analytics | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

function getFirebaseAnalytics(): Analytics | undefined {
  if (typeof window === 'undefined') return undefined;
  if (!analytics) {
    analytics = getAnalytics(getFirebaseApp());
  }
  return analytics;
}

export { getFirebaseApp, getFirebaseAnalytics };
```

## Deployment Scripts (package.json additions)

```json
{
  "scripts": {
    "deploy:preview": "npm run build && firebase hosting:channel:deploy preview-$(date +%s) --expires 7d",
    "deploy:production": "npm run build && firebase deploy --only hosting",
    "firebase:emulate": "firebase emulators:start --only hosting",
    "firebase:serve": "npm run build && firebase serve --only hosting"
  }
}
```

## GitHub Actions CI/CD — firebase-deploy.yml

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
        run: npm run build

      - name: Deploy to Firebase Hosting (Preview)
        if: github.event_name == 'pull_request'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          channelId: preview-pr-${{ github.event.pull_request.number }}
          expires: 7d

      - name: Deploy to Firebase Hosting (Production)
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          channelId: live
```

## next.config.ts for Static Export

```typescript
// Use this when deploying to Firebase Hosting as pure static site
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export — handle optimization at CDN level
  },
  // Still transpile R3F packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
```
