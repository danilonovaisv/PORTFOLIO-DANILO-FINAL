'use client';

import { motion } from 'framer-motion';
import type { RefObject } from 'react';
import { useBeliefScroll } from '@/hooks/useBeliefScroll';

export function BeliefBackground({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { backgroundColor } = useBeliefScroll(containerRef);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ backgroundColor }}
    />
  );
}
