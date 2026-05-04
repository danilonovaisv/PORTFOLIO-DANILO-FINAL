# Project Context: portfoliodanilo.com

## Architecture Map

- **Framework:** Next.js (App Router, `src/app`)
- **Language:** React + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (currently lacking `LazyMotion` optimization)
- **3D/WebGL:** React Three Fiber + @react-three/drei + Three.js
  - Canvas elements are located in `src/components/canvas/`. Home specific items at `src/components/canvas/home/hero/`.
- **Storage/Backend:** Supabase Storage, Firebase Hosting

## Routing

- `/` - Public Homepage with WebGL components, manifesto, portfolio showcase, etc.
- `/admin` - Protected Admin area

## State Management & Interactions

- High reliance on Framer Motion for scroll reveals, sticky elements, and transitions.
- WebGL interactions driven via `useFrame` in R3F, though optimization is required.

## Backend Integration

- **Supabase:** Used for asset management (images/videos) via CDN.
- **Firebase:** App Hosting edge caching mechanisms in play.

## Current Performance Issues

- **LCP:** Highly delayed (~15.5s on Homepage, ~5.2s on Admin).
- **TBT:** Massive blocking time on the homepage (152,780ms) suggesting unoptimized JavaScript execution (likely Three.js/React rendering loops or lack of code splitting).
