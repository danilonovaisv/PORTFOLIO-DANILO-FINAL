'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

// Utilitário de wrap para o loop infinito
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface MarqueeLineProps {
  text: string;
  baseVelocity: number;
}

function MarqueeLine({ text, baseVelocity }: MarqueeLineProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Usamos o MotionValue baseX diretamente para o useTransform ser reativo
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((t, delta) => {
    if (prefersReducedMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Inverte direção baseado no scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap">
      <motion.div className="flex gap-2 text-nowrap" style={{ x }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="text-purple-details text-xl md:text-4xl font-black tracking-tight uppercase"
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
    <div className="mt-16 md:mt-24 w-full select-none pointer-events-none bg-primary py-1 md:py-0.5">
      <div className="flex flex-col gap-1 md:gap-1">
        <MarqueeLine
          text="DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ BRANDING ・ INTELIGÊNCIA ARTIFICIAL ・ LIDERANÇA CRIATIVA ・ "
          baseVelocity={-1}
        />
        <MarqueeLine
          text="BRANDING ・ INTELIGÊNCIA ARTIFICIAL ・ LIDERANÇA CRIATIVA ・ DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ "
          baseVelocity={1}
        />
      </div>
    </div>
  );
}
