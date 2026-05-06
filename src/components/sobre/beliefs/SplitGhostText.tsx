'use client';

import { m, type Transition } from 'motion/react';
import { GHOST_EASE } from '@/config/motion';

type SplitGhostTextProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitType?: 'words' | 'lines';
  className?: string;
  delay?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
};

export function SplitGhostText({
  text,
  as = 'p',
  splitType = 'words',
  className,
  delay = 0.055,
  duration = 0.8,
  textAlign = 'left',
}: SplitGhostTextProps) {
  const Tag = m[as as keyof typeof m] as React.ElementType;
  const segments = splitType === 'lines' ? text.split('\n') : text.split(' ');

  const transition: Transition = {
    duration,
    ease: GHOST_EASE,
  };

  return (
    <Tag className={className} style={{ textAlign }} aria-label={text}>
      {segments.map((segment, index) => (
        <m.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35, margin: '-100px' }}
          transition={{ ...transition, delay: index * delay }}
        >
          {segment}
          {splitType === 'words' ? '\u00A0' : null}
        </m.span>
      ))}
    </Tag>
  );
}
