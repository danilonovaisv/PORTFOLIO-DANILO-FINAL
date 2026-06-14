'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';

// =============================================================================
// TextReveal — Ghost System
// Scroll-driven word reveal (opacity + blur). Referência: Magic UI Text Reveal,
// adaptado aos tokens Ghost. Movimento permitido apenas: opacity, blur.
// Preserva frase-âncora (highlight) em bluePrimary. Sem layout jump, sem 200vh.
// =============================================================================

type RevealTag = 'p' | 'h2' | 'h3';

const MOTION_TAG = {
  p: m.p,
  h2: m.h2,
  h3: m.h3,
} as const;

interface TextRevealProps {
  text: string;
  /** Frase já presente em `text`, destacada em bluePrimary. */
  highlight?: string;
  as?: RevealTag;
  className?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlighted: boolean;
}

function Word({ children, progress, range, highlighted }: WordProps) {
  // Começa esmaecido (0.15), nunca invisível — evita salto de layout/leitura.
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blurPx = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <m.span
      style={{ opacity, filter }}
      className={cn('inline', highlighted && 'text-bluePrimary')}
    >
      {children}
    </m.span>
  );
}

/** Render plano (reduced-motion): texto 100% visível, highlight preservado. */
function renderPlain(text: string, highlight?: string) {
  if (!highlight) return text;
  const idx = text.indexOf(highlight);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-bluePrimary">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export function TextReveal({
  text,
  highlight,
  as = 'p',
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useMotionGate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });

  const Comp = MOTION_TAG[as];

  if (reduce) {
    return (
      <Comp ref={ref} className={cn('whitespace-pre-line', className)}>
        {renderPlain(text, highlight)}
      </Comp>
    );
  }

  // Tokeniza preservando separadores (espaços e \n) p/ whitespace-pre-line.
  const tokens = text.split(/(\s+)/);
  const totalWords = tokens.filter((t) => t.trim().length > 0).length || 1;
  const hiStart = highlight ? text.indexOf(highlight) : -1;
  const hiEnd = highlight ? hiStart + highlight.length : -1;

  let charOffset = 0;
  let wordIndex = 0;

  return (
    <Comp ref={ref} className={cn('whitespace-pre-line', className)}>
      {tokens.map((token, i) => {
        const start = charOffset;
        charOffset += token.length;

        // Separadores: render plano (preserva quebras).
        if (token.trim().length === 0) {
          return <span key={i}>{token}</span>;
        }

        const k = wordIndex++;
        const range: [number, number] = [
          k / totalWords,
          (k + 1) / totalWords,
        ];
        const highlighted =
          hiStart !== -1 && start >= hiStart && start < hiEnd;

        return (
          <Word key={i} progress={scrollYProgress} range={range} highlighted={highlighted}>
            {token}
          </Word>
        );
      })}
    </Comp>
  );
}
