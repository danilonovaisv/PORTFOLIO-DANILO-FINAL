'use client';

import type { ElementType } from 'react';

type SplitTextMotionProps<T extends ElementType = 'span'> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  className?: string;
  itemClassName?: string;
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  text,
  as,
  mode = 'words',
  className,
  itemClassName,
}: SplitTextMotionProps<T>) {
  const Component = (as ?? 'span') as ElementType;
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component className={className} aria-label={text} data-split-text>
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          aria-hidden="true"
          data-split-item
          className={itemClassName ?? 'inline-block will-change-transform'}
        >
          {unit === ' ' ? '\u00A0' : unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Component>
  );
}
