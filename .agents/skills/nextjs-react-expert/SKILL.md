---
name: nextjs-react-expert
description: React and Next.js performance optimization from Vercel Engineering.
category: development
version: 4.1.0-fractal
layer: master-skill
---

# Next.js & React Performance Expert

> **From Vercel Engineering** - 57 optimization rules prioritized by impact
> **Philosophy:** Eliminate waterfalls first, optimize bundles second, then micro-optimize.

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check the content map below and load what you need.

> 🔴 **For performance reviews: Start with CRITICAL sections (1-2), then move to HIGH/MEDIUM.**

---

## 📑 Content Map

| File                                    | Impact             | Rules    | When to Read                                                    |
| --------------------------------------- | ------------------ | -------- | --------------------------------------------------------------- |
| `1-async-eliminating-waterfalls.md`     | 🔴 **CRITICAL**    | 5 rules  | Slow page loads, sequential API calls, data fetching waterfalls |
| `2-bundle-bundle-size-optimization.md`  | 🔴 **CRITICAL**    | 5 rules  | Large bundle size, slow Time to Interactive, First Load issues  |
| `3-server-server-side-performance.md`   | 🟠 **HIGH**        | 7 rules  | Slow SSR, API route optimization, server-side waterfalls        |
| `4-client-client-side-data-fetching.md` | 🟡 **MEDIUM-HIGH** | 4 rules  | Client data management, SWR patterns, deduplication             |
| `5-rerender-re-render-optimization.md`  | 🟡 **MEDIUM**      | 12 rules | Excessive re-renders, React performance, memoization            |
| `6-rendering-rendering-performance.md`  | 🟡 **MEDIUM**      | 9 rules  | Rendering bottlenecks, virtualization, image optimization       |
| `7-js-javascript-performance.md`        | ⚪ **LOW-MEDIUM**  | 12 rules | Micro-optimizations, caching, loop performance                  |
| `8-advanced-advanced-patterns.md`       | 🔵 **VARIABLE**    | 3 rules  | Advanced React patterns, useLatest, init-once                   |

**Total: 57 rules across 8 categories**

---

## 🚀 Quick Decision Tree

**What's your performance issue?**

```
🐌 Slow page loads / Long Time to Interactive
  → Read Section 1: Eliminating Waterfalls
  → Read Section 2: Bundle Size Optimization

📦 Large bundle size (> 200KB)
  → Read Section 2: Bundle Size Optimization
  → Check: Dynamic imports, barrel imports, tree-shaking

🖥️ Slow Server-Side Rendering
  → Read Section 3: Server-Side Performance
  → Check: Parallel data fetching, streaming

🔄 Too many re-renders / UI lag
  → Read Section 5: Re-render Optimization
  → Check: React.memo, useMemo, useCallback

🎨 Rendering performance issues
  → Read Section 6: Rendering Performance
  → Check: Virtualization, layout thrashing

🌐 Client-side data fetching problems
  → Read Section 4: Client-Side Data Fetching
  → Check: SWR deduplication, localStorage

✨ Need advanced patterns
  → Read Section 8: Advanced Patterns
```

---

## 📊 Impact Priority Guide

**Use this order when doing comprehensive optimization:**

```
1️⃣ CRITICAL (Biggest Gains - Do First):
   ├─ Section 1: Eliminating Waterfalls
   │  └─ Each waterfall adds full network latency (100-500ms+)
   └─ Section 2: Bundle Size Optimization
      └─ Affects Time to Interactive and Largest Contentful Paint

2️⃣ HIGH (Significant Impact - Do Second):
   └─ Section 3: Server-Side Performance
      └─ Eliminates server-side waterfalls, faster response times

3️⃣ MEDIUM (Moderate Gains - Do Third):
   ├─ Section 4: Client-Side Data Fetching
   ├─ Section 5: Re-render Optimization
   └─ Section 6: Rendering Performance

4️⃣ LOW (Polish - Do Last):
   ├─ Section 7: JavaScript Performance
   └─ Section 8: Advanced Patterns
```

---

## 🔗 Related Skills

| Need                    | Skill                             |
| ----------------------- | --------------------------------- |
| API design patterns     | `@[skills/api-patterns]`          |
| Database optimization   | `@[skills/database-design]`       |
| Testing strategies      | `@[skills/testing-patterns]`      |
| UI/UX design principles | `@[skills/frontend-design]`       |
| TypeScript patterns     | `@[skills/typescript-expert]`     |
| Deployment & DevOps     | `@[skills/deployment-procedures]` |

---

## ✅ Performance Review Checklist

Before shipping to production:

**Critical (Must Fix):**

- [ ] No sequential data fetching (waterfalls eliminated)
- [ ] Bundle size < 200KB for main bundle
- [ ] No barrel imports in app code
- [ ] Dynamic imports used for large components
- [ ] Parallel data fetching where possible

**High Priority:**

- [ ] Server components used where appropriate
- [ ] API routes optimized (no N+1 queries)
- [ ] Suspense boundaries for data fetching
- [ ] Static generation used where possible

**Medium Priority:**

- [ ] Expensive computations memoized
- [ ] List rendering virtualized (if > 100 items)
- [ ] Images optimized with next/image
- [ ] No unnecessary re-renders

**Low Priority (Polish):**

- [ ] Hot path loops optimized
- [ ] RegExp patterns hoisted
- [ ] Property access cached in loops

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Use sequential `await` for independent operations
- ❌ Import entire libraries when you need one function
- ❌ Use barrel exports (`index.ts` re-exports) in app code
- ❌ Skip dynamic imports for large components/libraries
- ❌ Fetch data in useEffect without deduplication
- ❌ Forget to memoize expensive computations
- ❌ Use client components when server components work

**DO:**

- ✅ Fetch data in parallel with `Promise.all()`
- ✅ Use dynamic imports: `const Comp = dynamic(() => import('./Heavy'))`
- ✅ Import directly: `import { specific } from 'library/specific'`
- ✅ Use Suspense boundaries for better UX
- ✅ Leverage React Server Components
- ✅ Measure performance before optimizing
- ✅ Use Next.js built-in optimizations (next/image, next/font)

---

## 🎯 How to Use This Skill

## 🧠 Knowledge Modules (Fractal Skills)

### 1. [For New Features:](./sub-skills/for-new-features.md)

### 2. [For Performance Reviews:](./sub-skills/for-performance-reviews.md)

### 3. [For Debugging Slow Performance:](./sub-skills/for-debugging-slow-performance.md)

### 4. [Section 1: Eliminating Waterfalls (CRITICAL)](./sub-skills/section-1-eliminating-waterfalls-critical.md)

### 5. [Section 2: Bundle Size Optimization (CRITICAL)](./sub-skills/section-2-bundle-size-optimization-critical.md)

### 6. [Section 3: Server-Side Performance (HIGH)](./sub-skills/section-3-server-side-performance-high.md)

### 7. [Section 4: Client-Side Data Fetching (MEDIUM-HIGH)](./sub-skills/section-4-client-side-data-fetching-medium-high.md)

### 8. [Section 5: Re-render Optimization (MEDIUM)](./sub-skills/section-5-re-render-optimization-medium.md)

### 9. [Section 6: Rendering Performance (MEDIUM)](./sub-skills/section-6-rendering-performance-medium.md)

### 10. [Section 7: JavaScript Performance (LOW-MEDIUM)](./sub-skills/section-7-javascript-performance-low-medium.md)

### 11. [Section 8: Advanced Patterns (VARIABLE)](./sub-skills/section-8-advanced-patterns-variable.md)
