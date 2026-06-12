'use client';

import { m } from 'motion/react';
import { pageTransitionVariants } from '@/lib/motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  pathname: string;
}

/**
 * MotionWrapper — isolated framer-motion boundary.
 * Loaded via next/dynamic from template.tsx so Turbopack tracks
 * the framer-motion module graph separately. This prevents the
 * "proxy.mjs module factory is not available" HMR crash.
 */
export default function MotionWrapper({
  children,
  pathname,
}: MotionWrapperProps) {
  return (
    <m.div
      key={pathname}
      initial="initial"
      animate="animate"
      variants={pageTransitionVariants}
      className="w-full flex-col flex grow"
    >
      {children}
    </m.div>
  );
}
