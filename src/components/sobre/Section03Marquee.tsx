'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
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

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    // leading-[0.8] aperta muito as linhas (estilo poster)
    // py-3 dá uma margem segura para as letras não cortarem
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap leading-[0.5] py-1 bg-[#0048ff]">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            // TEXTO GIGANTE E APERTADO:
            // text-5xl a text-7xl para impacto visual
            // tracking-tighter para juntar as letras horizontalmente
            className={
              'block mr-6 text-purple-details text-4xl md:text-7xl font-bold uppercase tracking-tighter'
            }
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Section03Marquee() {
  return (
    <div
      // absolute bottom-0: Cola no fundo da secção pai
      // z-20: Garante que fica visível
      className="absolute bottom-0 left-0 w-full z-20"
    >
      {/* gap-0 colado */}
      <div className="flex flex-col gap-0 w-full">
        <ParallaxText baseVelocity={-1}>
          Direção Criativa・Design
          Estratégico・Identidades・Campanhas・Branding・Inteligência
          Artificial・Liderança Criativa・
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          Branding・Inteligência Artificial・Liderança Criativa・Direção
          Criativa・Design Estratégico・Identidades・Campanhas・
        </ParallaxText>
      </div>
    </div>
  );
}
