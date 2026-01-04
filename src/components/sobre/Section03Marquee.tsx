'use client';

import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type LineProps = {
  text: string;
  baseVelocity: number;
};

function MarqueeLine({ text, baseVelocity }: LineProps) {
  const baseX = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-2, 0, 2]
  );

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    let moveBy = baseVelocity * (delta / 1000);
    moveBy += moveBy * velocityFactor.get();
    baseX.current += moveBy;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="flex gap-12" style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-white text-lg md:text-xl font-medium tracking-wide opacity-75"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Section03Marquee() {
  return (
    <div className="mt-16 md:mt-20 py-6 md:py-8" aria-hidden="true">
      <div className="flex flex-col gap-6">
        {/* Linha superior → esquerda */}
        <MarqueeLine text="Direção criativa" baseVelocity={-10} />

        {/* Linha inferior → direita */}
        <MarqueeLine text="Inteligência artificial" baseVelocity={10} />
      </div>
    </div>
  );
}
