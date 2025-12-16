## 2024-05-23 - Internal Navigation Optimization

**Learning:** High-fidelity animations using `motion.a` can inadvertently bypass client-side routing, causing full page reloads.
**Action:** Use `motion.create(Link)` or `motion(Link)` to preserve SPA behavior while maintaining complex exit/enter animations.
