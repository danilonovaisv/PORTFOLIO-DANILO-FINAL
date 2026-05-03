'use client';

import { cn } from '@/lib/utils';
import {
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import type { JSX, ReactNode, ComponentType } from 'react';
import {
  ghostEase,
  ghostDurations,
  ghostStagger,
  ghostBlur,
  ghostTranslate,
} from '@/lib/motion/tokens';

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
  const max = axis === 'y' ? ghostTranslate.yMax : ghostTranslate.xMax;
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const offset = sign * max;

  return {
    hidden: {
      opacity: 0,
      filter: ghostBlur.enter,
      [axis]: offset,
    },
    visible: {
      opacity: 1,
      filter: ghostBlur.rest,
      [axis]: 0,
      transition: { duration, ease: [...ghostEase] },
    },
  } as Variants;
};

const GhostScrollText = ({
  text,
  as = 'span',
  className,
  direction = 'up',
  mode = 'word',
  duration = ghostDurations.reveal,
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
      ? ghostStagger.letter
      : mode === 'line'
        ? ghostStagger.line
        : ghostStagger.word);

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
