'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMotionGate } from '@/hooks/useMotionGate';

// Dynamically import the motion wrapper to prevent Turbopack HMR proxy.mjs crash.
// This isolates the framer-motion module boundary so the HMR graph does not
// lose the factory reference when sibling modules change.
const MotionWrapper = dynamic(() => import('@/components/layout/MotionWrapper'), {
  ssr: false,
  loading: () => null,
});

/**
 * Ghost Era Page Template
 * Handles entry transitions for all pages.
 * Rules:
 * - Fade in (opacity 0 -> 1)
 * - Subtle slide up (y: 15 -> 0)
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1)
 * - Respects prefers-reduced-motion (no animation)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useMotionGate();

  useEffect(() => {
    // Reset scroll to top on path change (Lenis handles smooth, but we make sure)
    window.scrollTo(0, 0);
  }, [pathname]);

  // ♿ Reduced motion: render without transition wrapper
  if (shouldReduceMotion) {
    return (
      <div className="w-full flex-col flex grow" key={pathname}>
        {children}
      </div>
    );
  }

  return (
    <MotionWrapper pathname={pathname}>
      {children}
    </MotionWrapper>
  );
}
