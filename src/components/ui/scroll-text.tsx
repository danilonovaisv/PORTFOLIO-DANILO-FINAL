'use client';

import { cn } from '@/lib/utils';
import {
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import type { JSX, ReactNode, ComponentType } from 'react';
import { MOTION_TOKENS, GHOST_EASE } from '@/config/motion';

export type GhostScrollTextDirection = 'up' | 'down' | 'left' | 'right';
export type GhostScrollTextMode = 'word' | 'letter' | 'line';

export interface GhostScrollTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  direction?: GhostScrollTextDirection;
  mode?: GhostScrollTextMode;
  duration?: number;
  stagger?: number;
  viewport?: { amount?: number; margin?: string; once?: boolean };
  uppercase?: boolean;
  ariaLabel?: string;
}

const buildVariants = (
  direction: GhostScrollTextDirection,
  duration: number,
  reduced: boolean
): Variants => {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const max = MOTION_TOKENS.offset.standard;
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const offset = sign * max;

  return {
    hidden: {
      opacity: 0,
      filter: MOTION_TOKENS.blur.hidden,
      [axis]: offset,
    },
    visible: {
      opacity: 1,
      filter: MOTION_TOKENS.blur.visible,
      [axis]: 0,
      transition: { duration, ease: GHOST_EASE },
    },
  } as Variants;
};

const GhostScrollText = ({
  text,
  as = 'span',
  className,
  direction = 'up',
  mode = 'word',
  duration = MOTION_TOKENS.duration.normal,
  stagger,
  viewport = { amount: 0.3, once: true },
  uppercase = false,
  ariaLabel,
}: GhostScrollTextProps) => {
  const reduced = useReducedMotion() ?? false;
  const itemVariants = buildVariants(direction, duration, reduced);
  const effectiveStagger =
    stagger ??
    (mode === 'letter'
      ? MOTION_TOKENS.stagger.tight
      : mode === 'line'
        ? MOTION_TOKENS.stagger.relaxed
        : MOTION_TOKENS.stagger.normal);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : effectiveStagger },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as ComponentType<
    HTMLMotionProps<'span'>
  >;

  const renderLine = (): ReactNode => (
    <motion.span className="inline-block" variants={itemVariants}>
      {text}
    </motion.span>
  );

  const renderWords = (): ReactNode =>
    text.split(' ').map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        className="inline-block"
        variants={mode === 'letter' ? undefined : itemVariants}
      >
        {mode === 'letter' ? (
          <>
            {word.split('').map((letter, li) => (
              <motion.span
                key={li}
                className="inline-block"
                variants={itemVariants}
              >
                {letter}
              </motion.span>
            ))}
            &nbsp;
          </>
        ) : (
          <>{word}&nbsp;</>
        )}
      </motion.span>
    ));

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={viewport}
      aria-label={ariaLabel ?? text}
      className={cn(
        'inline-block text-text',
        uppercase && 'uppercase tracking-tight',
        className
      )}
    >
      <span aria-hidden="true">
        {mode === 'line' ? renderLine() : renderWords()}
      </span>
    </MotionTag>
  );
};

export default GhostScrollText;
