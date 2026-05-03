# Workflow: Fix Performance and UI/WebGL Bottlenecks

**Objective:** Address the massive Total Blocking Time (TBT) and Largest Contentful Paint (LCP) issues identified in the audit.

## Step 1: Implement `LazyMotion` for Framer Motion
- Locate all instances where `framer-motion`'s `motion` component is used, particularly in global layouts or heavy components.
- Refactor to use `<LazyMotion features={domAnimation}>` and `m.div` instead of `motion.div` to reduce the initial JavaScript payload.

## Step 2: Optimize WebGL and React Three Fiber (R3F)
- Open `src/components/canvas/home/hero/GhostScene.tsx`.
- **Review `useFrame`:** Ensure there are *no* React state updates (`setState`) inside the `useFrame` hook. Mutate refs directly for animations.
- **Instancing:** If geometry is repeated, use `InstancedMesh`.
- **Throttling/Culling:** Ensure the Canvas is configured not to render when out of the viewport. Ensure `pointer-events-none` is properly applied if the canvas is purely atmospheric, preventing interference with UI interactions.
- Ensure the Canvas component is loaded via `next/dynamic` (`ssr: false`) in its parent wrapper.

## Step 3: Audit Supabase Storage and Asset Loading
- Ensure all images/videos loaded from `*.supabase.co` use Next.js's `<Image>` component with a custom loader or are preloaded effectively.
- For videos (like the manifesto), verify that `preload="metadata"` is set and a static `poster` image is provided to improve LCP.

## Step 4: Refactor Server vs. Client Components
- Review `src/app` page files. Ensure `"use client"` is pushed down the component tree as far as possible. Pages themselves should generally be Server Components unless they require global client state.

## Step 5: Test and Validate
- Re-run Lighthouse locally (`npx lighthouse <url>`) to verify that TBT is reduced to acceptable levels (< 300ms) and LCP is < 2.5s.
