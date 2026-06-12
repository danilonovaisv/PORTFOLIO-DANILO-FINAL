'use client';

import React from 'react';
import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { titleLineVariants, staggerContainer } from '@/lib/motion';
import { MOTION_TOKENS } from '@/config/motion';

interface SplitTextProps {
  /** The text lines to render and animate */
  lines: string[];
  /** HTML tag for the wrapper (e.g. h1, h2, p) */
  as?: React.ElementType;
  /** Class name for the outer wrapper container */
  className?: string;
  /** Class name for each line span */
  lineClassName?: string;
  /** Stagger delay between lines. Defaults to MOTION_TOKENS.stagger.normal (0.08s) */
  staggerDelay?: number;
}

/**
 * SplitText Component
 * Segmenta um array de strings em linhas independentes animadas por staggers.
 * Trata acessibilidade (aria-label + aria-hidden) e desativa movimentos se Reduced Motion ativo.
 */
export function SplitText({
  lines,
  as: Tag = 'div',
  className = '',
  lineClassName = '',
  staggerDelay = MOTION_TOKENS.stagger.normal,
}: SplitTextProps) {
  const shouldReduceMotion = useMotionGate();
  const fullText = lines.join(' ');

  // ♿ Reduced Motion / SSR Fallback
  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={lineClassName}>{line}</span>
            {idx < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={fullText}>
      <m.span
        variants={staggerContainer(staggerDelay, 0.1)}
        initial="hidden"
        animate="visible"
        className="inline-block w-full"
        aria-hidden="true"
      >
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className="inline-block overflow-hidden vertical-align-bottom">
              <m.span
                variants={titleLineVariants}
                className={`inline-block ${lineClassName}`}
              >
                {line}
              </m.span>
            </span>
            {idx < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </m.span>
    </Tag>
  );
}
