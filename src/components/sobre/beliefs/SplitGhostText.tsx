'use client';

import { m, Variants } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';

type SplitGhostTextProps = {
  text: string;
  as?: 'h2' | 'h3' | 'p' | 'span' | 'div';
  splitType?: 'words' | 'lines';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  textAlign?: 'left' | 'center' | 'right';
  animate?: boolean;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function SplitGhostText({
  text,
  as = 'p',
  splitType = 'words',
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.055,
  textAlign = 'left',
  animate: animateProp,
}: SplitGhostTextProps) {
  const Tag = m[as as keyof typeof m] as typeof m.p;
  const segments = splitType === 'lines' ? text.split('\n') : text.split(' ');
  const controlled = animateProp !== undefined;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const animateState = controlled ? (animateProp ? 'visible' : 'hidden') : undefined;

  return (
    <Tag
      className={className}
      style={{ textAlign }}
      aria-label={text}
      initial="hidden"
      animate={animateState}
      whileInView={controlled ? undefined : 'visible'}
      viewport={controlled ? undefined : { once: false, amount: 0.35 }}
      variants={containerVariants}
    >
      {segments.map((segment, index) => (
        <m.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={itemVariants}
          transition={{ duration, ease: GHOST_EASE }}
        >
          {segment}
          {splitType === 'words' && index < segments.length - 1 ? ' ' : null}
        </m.span>
      ))}
    </Tag>
  );
}
