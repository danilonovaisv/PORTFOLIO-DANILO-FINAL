'use client';

import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- BeliefSection ---

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst: boolean;
}

export function BeliefSection({
  text,
  bgColor,
  isFirst: _isFirst,
}: BeliefSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Basic fade in animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full min-h-screen flex items-center justify-center p-8 transition-colors duration-700 overflow-hidden'
      )}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="relative z-10 max-w-4xl w-full text-center"
        style={{ opacity, scale }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white whitespace-pre-line leading-tight tracking-tight drop-shadow-lg">
          {text}
        </h2>
      </motion.div>

      {/* Optional decorative element */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}

// --- BeliefMobileTextLayer ---

interface BeliefMobileTextLayerProps {
  phrases: string[];
  scrollYProgress: MotionValue<number>;
}

export function BeliefMobileTextLayer({
  phrases: _phrases,
  scrollYProgress: _scrollYProgress,
}: BeliefMobileTextLayerProps) {
  // A simplified mobile layer that observes scroll
  // Since we don't have the original logic, we hide it to prevent errors,
  // or we could show a static overlay.
  // The previous implementation usage implies it handles mobile text overlays.

  return (
    <div className="fixed bottom-0 left-0 w-full p-6 pb-12 pointer-events-none z-50 lg:hidden flex justify-center bg-linear-to-t from-black/80 to-transparent">
      {/* Component Logic Restored / Placeholder */}
    </div>
  );
}
