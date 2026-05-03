# Web Ecosystem Audit Report: portfoliodanilo.com

## 1. Homepage Audit (`/`)
### Lighthouse Metrics (Mobile/Headless)
- **Performance Score:** 34
- **Accessibility Score:** 100
- **Best Practices Score:** 100
- **SEO Score:** 100
- **LCP (Largest Contentful Paint):** 15.5s
- **CLS (Cumulative Layout Shift):** 0
- **TBT (Total Blocking Time):** ~152.7s
- **Diagnostic Issues:** High number of requests (130) and Main thread tasks (7360 total, with 59 over 100ms, and 49 over 500ms).

### WebGL & Render Analysis
- Massive Total Blocking Time is a direct result of unoptimized WebGL initialization, excessive Javascript execution on the main thread, and lack of dynamic imports.
- `GhostScene.tsx` is highly complex (30KB+) and likely performs expensive operations, potentially utilizing `setState` inside `useFrame`, or failing to throttle background updates when off-screen.
- The use of `Framer Motion` is synchronous (no `LazyMotion`), injecting the full animation payload into the initial bundle, delaying interaction.

## 2. Admin Area Audit (`/admin`)
### Lighthouse Metrics (Mobile/Headless)
- **Performance Score:** 69
- **LCP:** 5.2s
- **CLS:** 0.002
- **TBT:** 440ms

### Analysis
- Performance is significantly better than the homepage, but LCP is still poor. This suggests that shared layouts or core client-side bundles (e.g., Supabase SDK initialization or global contexts) are delaying initial paint.
- Hydration issues or slow Next.js Server Actions could be a factor in dynamic route loading.
