'use client';

import { m } from 'framer-motion';
import type { ElementType } from 'react';
import { beliefMotion } from '@/config/beliefTokens';

type SplitTextMotionProps<T extends ElementType = 'span'> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  active?: boolean;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  text,
  as,
  mode = 'words',
  active = true,
  className,
  stagger = beliefMotion.wordStagger,
  delay = 0,
}: SplitTextMotionProps<T>) {
  const Component = (as ?? 'span') as ElementType;
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component
      className={className}
      aria-label={text}
    >
      {units.map((unit, index) => (
        <m.span
          key={`${unit}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 12,
          }}
          transition={{
            duration: 0.42,
            delay: delay + index * stagger,
            ease: beliefMotion.softEase,
          }}
        >
          {unit === ' ' ? '\u00A0' : unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </m.span>
      ))}
    </Component>
  );
}
