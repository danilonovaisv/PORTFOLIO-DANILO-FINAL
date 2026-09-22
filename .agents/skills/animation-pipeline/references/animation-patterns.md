# Framer Motion Animation Patterns — Complete Implementations

## hooks/useScrollProgress.ts

```typescript
'use client';

import {
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { useEffect } from 'react';

/** Returns a smoothed scroll progress value between 0 and 1 */
export function useScrollProgress(): MotionValue<number> {
  const raw = useMotionValue(0);
  const smoothed = useSpring(raw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      raw.set(total > 0 ? scrolled / total : 0);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [raw]);

  return smoothed;
}

/** Returns scroll Y position as a motion value */
export function useScrollY(): MotionValue<number> {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    function update() {
      scrollY.set(window.scrollY);
    }
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scrollY]);

  return scrollY;
}
```

## hooks/useIntersection.ts

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersection<T extends HTMLElement>(
  options: IntersectionOptions = {}
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { once = true, threshold = 0.1, rootMargin = '0px', ...rest } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin, ...rest }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, isIntersecting];
}
```

## components/providers/Providers.tsx (with Lenis)

```typescript
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return; // Don't init smooth scroll for reduced-motion users

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
```

## Standard Framer Motion Variant Library

```typescript
// lib/motion-variants.ts
import { Variants } from 'framer-motion';

export const EASING = {
  spring: [0.16, 1, 0.3, 1],
  smooth: [0.4, 0, 0.2, 1],
  reveal: [0.25, 1, 0.5, 1],
} as const;

/** Fade in from opacity 0 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASING.smooth } },
};

/** Slide up with fade */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING.spring },
  },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASING.spring },
  },
};

/** Scale in from slightly smaller */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASING.spring },
  },
};

/** Stagger container — wraps items that use slideUp/fadeIn */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/** Page transition — use with AnimatePresence */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: EASING.smooth },
  },
};
```

## Reusable AnimatedSection Component

```typescript
'use client';

// components/ui/AnimatedSection.tsx
import { useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  delay?: number;
  margin?: string;
}

export function AnimatedSection({
  children,
  className,
  variants = slideUp,
  stagger = false,
  delay = 0,
  margin = '-80px',
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

## Page Transition Template (app/(marketing)/layout.tsx)

```typescript
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransition } from '@/lib/motion-variants';
import { useReducedMotion } from 'framer-motion';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={prefersReduced ? {} : pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Magnetic Button with Gesture

```typescript
'use client';

// components/ui/MagneticButton.tsx
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={prefersReduced ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={prefersReduced ? {} : { scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
```

## Scroll-Driven Parallax

```typescript
'use client';

// components/ui/Parallax.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // negative = moves up faster than scroll, positive = slower
  className?: string;
}

export function Parallax({ children, speed = -0.2, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```
