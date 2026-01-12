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

// Função utilitária para o loop infinito suave
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

  /**
   * Ajuste do range de wrap:
   * Dependendo do comprimento do texto, pode ser necessário ajustar o -20 e -45.
   * Estes valores definem quando o texto "salta" de volta para criar a ilusão infinita.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((t, delta) => {
    if (prefersReducedMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Inverte a direção baseado na velocidade do scroll (efeito parallax)
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
      <motion.div className="flex gap-8 text-nowrap" style={{ x }}>
        {/* Aumentei para 8 repetições para garantir cobertura em telas largas */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            // Classes atualizadas conforme o HTML de referência:
            // text-[#8705f2]: Cor roxa exata do HTML
            // font-black: Peso 800/900
            // uppercase: Letras maiúsculas
            className="text-[#8705f2] text-2xl lg:text-5xl font-black uppercase tracking-widest flex items-center gap-8"
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
    // bg-[#0048ff]: Cor de fundo azul exata do HTML (--card-bg)
    // py-6: Padding vertical similar aos 20px do CSS original
    <div className="w-full select-none pointer-events-none bg-[#0048ff] py-6 overflow-hidden mt-20 lg:mt-24">
      <div className="flex flex-col gap-0">
        <MarqueeLine
          // Adicionei o separador dentro da string para manter consistência
          text="DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ BRANDING ・ IA ・ LIDERANÇA CRIATIVA ・ "
          baseVelocity={-2} // Velocidade base ajustada
        />
        <MarqueeLine
          text="BRANDING ・ IA ・ LIDERANÇA CRIATIVA ・ DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ "
          baseVelocity={2} // Velocidade positiva para inverter direção
        />
      </div>
    </div>
  );
}
