'use client';

import { m, useTransform } from 'framer-motion';
import {
  BELIEF_MANIFESTO_LINES,
  BELIEF_SCROLL_THRESHOLDS,
  beliefLayers,
} from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { MOTION_TOKENS } from '@/config/motion';

function ManifestoLine({ line, index }: { line: string, index: number }) {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();
  const words = line.split(' ');

  const lineStart = BELIEF_SCROLL_THRESHOLDS.climaxStart + 0.04 + index * 0.03;
  const lineEnd = lineStart + 0.06;

  // Each word staggers slightly
  return (
    <div
      data-manifesto-line
      style={{ opacity: prefersReducedMotion ? 1 : undefined }}
      className="block font-extrabold uppercase leading-[0.88] text-white"
    >
      {words.map((word, wordIndex) => {
        const stagger = 0.02 * wordIndex;
        const wordStart = lineStart + stagger;
        const wordEnd = lineEnd + stagger;

        const opacity = useTransform(scrollYProgress, [0, wordStart, wordEnd], [0, 0, 1]);
        const x = useTransform(scrollYProgress, [0, wordStart, wordEnd], [-18, -18, 0]);
        const filter = useTransform(scrollYProgress, [0, wordStart, wordEnd], ['blur(8px)', 'blur(8px)', 'blur(0px)']);

        return (
          <m.span
            key={wordIndex}
            className="inline-block will-change-[transform,opacity,filter]"
            style={prefersReducedMotion ? { opacity: 1 } : { opacity, x, filter }}
            aria-hidden="true"
          >
            {word}&nbsp;
          </m.span>
        );
      })}
    </div>
  );
}

export function BeliefManifesto() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  // Manifesto container appears after phrases
  const containerOpacity = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.climaxStart - 0.05,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
    ],
    [0, 0, 1]
  );
  
  const containerY = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.climaxStart - 0.05,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
    ],
    [MOTION_TOKENS.offset.standard, MOTION_TOKENS.offset.standard, 0]
  );
  
  const containerBlur = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.climaxStart - 0.05,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
    ],
    ['blur(10px)', 'blur(10px)', 'blur(0px)']
  );

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
      aria-label="ISSO É GHOST DESIGN"
      style={{
        opacity: prefersReducedMotion ? 1 : containerOpacity,
        y: prefersReducedMotion ? 0 : containerY,
        filter: prefersReducedMotion ? 'blur(0px)' : containerBlur,
        zIndex: beliefLayers.manifesto,
      }}
    >
      <blockquote className="mx-auto w-full max-w-[1680px] text-center" aria-hidden="true">
        {BELIEF_MANIFESTO_LINES.map((line, index) => (
          <ManifestoLine key={line} line={line} index={index} />
        ))}
      </blockquote>
    </m.div>
  );
}
