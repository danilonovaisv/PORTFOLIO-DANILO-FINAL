'use client';

import React, { useRef } from 'react';
import { motion, useInView, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE } from '@/config/motion';

interface GhostTextProps extends HTMLMotionProps<'span'> {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  type?: 'blur' | 'fadeUp' | 'scramble';
  stagger?: number;
}

const VARIANTS = {
  blur: {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 5 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: GHOST_EASE },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: GHOST_EASE } as any,
    },
  },
  scramble: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: GHOST_EASE } as any,
    },
  },
};

export function GhostText({
  text,
  as: Component = 'span',
  className,
  delay = 0,
  type = 'blur',
  stagger = 0.03,
  ...props
}: GhostTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const isReducedMotion = useMotionGate();
  const shouldAnimate = !isReducedMotion;

  if (!shouldAnimate) {
    return (
      <Component className={cn('inline-block', className)} {...props}>
        {text}
      </Component>
    );
  }

  const words = text.split(' ');

  return (
    <Component ref={ref} className={cn('inline-block', className)} {...props}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={VARIANTS[type] as any}
          transition={{
            delay: delay + i * stagger,
            ...VARIANTS[type].visible.transition,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
