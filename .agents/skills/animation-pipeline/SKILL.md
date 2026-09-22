---
name: animation-pipeline
description: >
  This skill should be used when the user asks to "add animations", "implement scroll animations",
  "create entrance animations", "add Framer Motion", "implement gesture interactions",
  "create stagger effects", "animate on scroll", "implement page transitions",
  "add micro-interactions", "create loading animations", "implement parallax effects",
  "set up smooth scroll with Lenis", or any request involving Framer Motion, scroll-driven
  animations, gesture handling, or motion design in a Next.js/React project.
metadata:
  version: '0.1.0'
  author: 'Danilo Novais'
---

# Animation Pipeline — Framer Motion + Scroll

## Core Animation Rules

### 1. Always Check Reduced Motion First

Every animated component must respect `prefers-reduced-motion`. Use Framer Motion's hook:

```typescript
const prefersReduced = useReducedMotion();
const variants = prefersReduced ? {} : myAnimationVariants;
```

### 2. Motion Values for Performance

For scroll-driven animations, use `useMotionValue` + `useTransform` — these bypass React re-renders:

```typescript
const scrollY = useMotionValue(0);
const opacity = useTransform(scrollY, [0, 300], [1, 0]);
```

### 3. Variants for Composition

Define animation states as `variants` objects — they compose naturally with `staggerChildren`:

```typescript
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### 4. Exit Animations with AnimatePresence

Wrap conditional renders with `AnimatePresence` to enable exit animations:

```typescript
<AnimatePresence mode="wait">
  {isOpen && <Modal key="modal" />}
</AnimatePresence>
```

### 5. Scroll-Triggered with `whileInView`

Use `whileInView` for intersection-based animations — simpler than IntersectionObserver:

```typescript
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
/>
```

## Standard Easing Curves

Use these throughout the project for visual consistency:

```typescript
export const EASING = {
  // Spring-like, snappy — use for UI interactions
  spring: [0.16, 1, 0.3, 1],
  // Smooth deceleration — use for page transitions
  smooth: [0.4, 0, 0.2, 1],
  // Quick in, slow out — use for content reveals
  reveal: [0.25, 1, 0.5, 1],
  // Standard Material Design curve
  standard: [0.4, 0, 0.6, 1],
} as const;
```

## Lenis Smooth Scroll Setup

Initialize Lenis in a client Provider and sync with Framer Motion's scroll:

```typescript
// providers/LenisProvider.tsx
const lenis = new Lenis();
useEffect(() => {
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  const id = requestAnimationFrame(raf);
  return () => cancelAnimationFrame(id);
}, []);
```

## Reference Files

Load for complete implementations:

- `references/animation-patterns.md` — Full variants, scroll hooks, page transitions, gesture components
