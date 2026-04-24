'use client';

import { motion, type MotionValue } from 'motion/react';
import { useEffect, useState } from 'react';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

const interpolate = (
  value: number,
  input: readonly number[],
  output: readonly number[]
) => {
  if (input.length !== output.length || input.length === 0)
    return output[0] ?? 0;
  if (value <= input[0]) return output[0];

  for (let index = 1; index < input.length; index += 1) {
    const start = input[index - 1];
    const end = input[index];

    if (value <= end) {
      const progress = (value - start) / (end - start || 1);
      const from = output[index - 1];
      const to = output[index];
      return from + (to - from) * progress;
    }
  }

  return output[output.length - 1];
};

export const BeliefManifesto = ({
  scrollProgress,
  prefersReducedMotion = false,
}: BeliefManifestoProps) => {
  const [isActive, setIsActive] = useState(prefersReducedMotion);
  const [opacity, setOpacity] = useState(prefersReducedMotion ? 1 : 0);
  const [offsetY, setOffsetY] = useState(prefersReducedMotion ? 0 : 18);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(true);
      setOpacity(1);
      setOffsetY(0);
      return;
    }

    const unsubscribe = scrollProgress.on('change', (value) => {
      setIsActive(value >= 0.56 && value <= 0.9);
      setOpacity(interpolate(value, [0.56, 0.68, 0.88, 0.94], [0, 1, 1, 0]));
      setOffsetY(interpolate(value, [0.56, 0.72, 0.88, 0.94], [18, 0, 0, -18]));
    });

    return () => unsubscribe();
  }, [prefersReducedMotion, scrollProgress]);

  return (
    <motion.div
      data-testid="beliefs-manifesto"
      className="fixed inset-0 z-[var(--z-layer-overlay)] h-full w-full
                 flex items-center justify-center
                 pointer-events-none"
      style={{ opacity, y: offsetY }}
      aria-live={isActive ? 'polite' : undefined}
      aria-atomic={isActive ? 'true' : undefined}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 text-center md:px-6 lg:px-16 xl:px-24">
        <p
          className="font-display font-black text-white
                     tracking-[0.03em] leading-[0.82]"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
        >
          ISSO É
          <br />
          GHOST
          <br />
          DESIGN
        </p>
      </div>
    </motion.div>
  );
};
