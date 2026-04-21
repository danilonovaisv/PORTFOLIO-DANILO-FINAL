# Beliefs Animation Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `BeliefBackground` and `BeliefScrollText` to use scroll-triggered animations (`inView` and `animate` from `motion`) instead of scroll-linked `MotionValue`s, resolving Next.js serialization errors and adhering to the official tutorial.

**Architecture:** 
- Remove `scrollProgress` props entirely from both components to fix SSR boundary serialization errors.
- Change the text layout from stacked `position: absolute` elements to sequential DOM sections (`h-[80vh]` or `h-screen`) so they naturally scroll into the viewport.
- Use the vanilla DOM `inView()` API from `motion` inside `useEffect` to trigger both text entry/exit animations and background color transitions.

**Tech Stack:** React, Next.js, Motion (vanilla `inView` and `animate`), Tailwind CSS.

---

### Task 1: Refactor `BeliefBackground.tsx` to use `inView`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`

- [ ] **Step 1: Rewrite component to remove `scrollProgress` and use vanilla `motion`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';

const COLOR_STOPS = [
  '#040013', // Deep Void — intro
  '#0048ff', // bluePrimary — frase 1
  '#8705f2', // purpleDetails — frase 2
  '#f501d3', // pinkDetails — frase 3
  '#0048ff', // bluePrimary — frase 4
  '#8705f2', // purpleDetails — frase 5
  '#f501d3', // pinkDetails — frase 6
  '#040013', // Deep Void — clímax/saída
] as const;

export const BeliefBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect elements with the class 'scroll-section' entering the viewport
    const stop = inView('.scroll-section', (info) => {
      const indexAttr = info.target.getAttribute('data-index');
      if (indexAttr === null) return;
      
      const index = parseInt(indexAttr, 10);
      const targetColor = COLOR_STOPS[index + 1] || COLOR_STOPS[0];

      if (bgRef.current) {
        animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
        );
      }
    });

    return () => stop();
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: COLOR_STOPS[0] }}
      aria-hidden="true"
    />
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefBackground.tsx
git commit -m "refactor: convert BeliefBackground to scroll-triggered animation via inView"
```

### Task 2: Refactor `BeliefScrollText.tsx` layout and animation

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefScrollText.tsx`

- [ ] **Step 1: Replace implementation with sequential sections and `inView`**

```tsx
'use client';

import { useEffect } from 'react';
import { animate, inView } from 'motion';

interface BeliefScrollTextProps {
  phrases: readonly string[];
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

export const BeliefScrollText = ({
  phrases,
  isMobile = false,
  prefersReducedMotion = false,
}: BeliefScrollTextProps) => {

  useEffect(() => {
    if (prefersReducedMotion) return;

    const stop = inView(".scroll-section p", (element) => {
      animate(
        element,
        { opacity: 1, y: [18, 0], filter: ['blur(6px)', 'blur(0px)'] },
        { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
      );
      
      return () => {
        animate(
          element, 
          { opacity: 0, y: -18, filter: ['blur(0px)', 'blur(6px)'] },
          { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        );
      };
    });

    return () => stop();
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full z-40" aria-label={phrases.join(' ')}>
      {phrases.map((phrase, index) => (
        <section 
          key={index} 
          className={`scroll-section h-[80vh] flex w-full ${
            isMobile 
              ? 'items-end justify-center pb-[20vh]' 
              : 'items-center justify-start'
          }`}
          data-index={index}
        >
          <p
            className={`font-h1 font-bold text-[#4fe6ff] leading-[1.05] ${
              isMobile 
                ? 'text-center px-6' 
                : 'left-6 md:left-16 lg:left-24 relative max-w-[38vw] lg:max-w-[34vw]'
            }`}
            style={{ 
              fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.8rem, 5.8vw, 6.3rem)',
              opacity: prefersReducedMotion ? 1 : 0 
            }}
            aria-hidden="true"
          >
            {phrase}
          </p>
        </section>
      ))}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefScrollText.tsx
git commit -m "refactor: convert BeliefScrollText to sequential sections using inView animation"
```

### Task 3: Update Parent Component

**Files:**
- Modify: `src/components/sobre/beliefs/[ParentFile].tsx`

- [ ] **Step 1: Check the parent file for `scrollProgress` and remove it**

Note: You need to find where `BeliefBackground` and `BeliefScrollText` are imported.
Run: `grep -r "BeliefBackground" src/components/sobre/beliefs`

- [ ] **Step 2: Update the parent file to remove `scrollProgress` creation**

Edit the parent component:
1. Remove `const { scrollYProgress } = useScroll(...)`
2. Remove `scrollProgress={scrollYProgress}` from the props of `<BeliefBackground />` and `<BeliefScrollText />`.
3. Fix the container layout: Since `BeliefScrollText` now renders `h-[80vh]` sections sequentially, the parent wrapper no longer needs a forced `height` (e.g. `h-[400vh]`) to allow scrolling. Ensure the parent acts as a normal document flow wrapper, while `BeliefBackground` should ideally be placed in a `sticky top-0 h-screen w-full -z-10` container so it stays fixed behind the scrolling text.

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/beliefs
git commit -m "refactor: remove scrollProgress prop from Beliefs parent component"
```
