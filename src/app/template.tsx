'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GHOST_EASE } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';

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
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.95,
        ease: GHOST_EASE,
      }}
      className="w-full flex-col flex grow"
    >
      {children}
    </motion.div>
  );
}
