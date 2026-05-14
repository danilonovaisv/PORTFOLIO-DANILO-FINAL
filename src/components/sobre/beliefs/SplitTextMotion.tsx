'use client';

import type { ElementType } from 'react';
import { m } from 'motion/react';

type SplitTextMotionProps<T extends ElementType = 'span'> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  className?: string;
  itemClassName?: string;
  variants?: any;
  custom?: any;
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  text,
  as,
  mode = 'words',
  className,
  itemClassName,
  variants,
  custom,
}: SplitTextMotionProps<T>) {
  const Component = (as ?? 'span') as any;
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component className={className} aria-label={text} data-split-text>
      {units.map((unit, index) => (
        <m.span
          key={`${unit}-${index}`}
          aria-hidden="true"
          data-split-item
          className={itemClassName ?? 'inline-block will-change-transform'}
          variants={variants}
          custom={custom}
        >
          {unit === ' ' ? '\u00A0' : unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </m.span>
      ))}
    </Component>
  );
}
