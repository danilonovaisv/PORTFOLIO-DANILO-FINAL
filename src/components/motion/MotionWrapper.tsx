'use client';

import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

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
      initial={{ opacity: 0, y: MOTION_TOKENS.offset.standard }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION_TOKENS.duration.textIn,
        ease: GHOST_EASE,
      }}
      className="w-full flex-col flex grow"
    >
      {children}
    </m.div>
  );
}
