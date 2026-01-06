'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { CTAButton } from '@/components/ui/CTAButton';
import { useGhostReveal } from '@/hooks/useGhostReveal';
import { BRAND } from '@/config/brand';

interface HeroCopyProps {
  startEntrance?: boolean;
  enable3D?: boolean;
  ghostRef?: React.RefObject<THREE.Group | null>;
}

export function HeroCopy({
  startEntrance = false,
  enable3D = true,
  ghostRef,
}: HeroCopyProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  // Hook para sincronizar o efeito de revelação com a posição do ghost 3D
  useGhostReveal(ghostRef, revealRef, enable3D);

  return (
    <div className="absolute inset-0 z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      <div
        className={
          BRAND.layout.container +
          ' h-full flex flex-col items-center justify-between'
        }
      >
        {/* TOPO: TAG [BRAND AWARENESS] */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={
            startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
          className="font-sans text-[12px] uppercase tracking-[0.2em] text-cyan-400 font-normal"
        >
          [BRAND AWARENESS]
        </motion.span>

        {/* MEIO: TEXTO + BOTÃO */}
        <div className="flex flex-col items-center justify-center flex-1 w-full relative">
          {/* Container do texto com efeito de revelação */}
          <div className="relative flex flex-col items-center justify-center text-center z-20">
            {/* Overlay de revelação */}
            {enable3D && (
              <div
                ref={revealRef}
                className="ghost-reveal-overlay"
                aria-hidden="true"
              />
            )}

            {/* H1: Texto principal com gradiente de revelação */}
            <h1 className="text-display-hero text-neutral-800 mix-blend-screen mb-6 relative hero-text text-center wrap-break-word hyphens-auto font-black tracking-tighter">
              Você não vê <br className="hidden md:block" /> o design.
            </h1>

            {/* H2: Subtítulo */}
            <h2 className="text-display-sub text-neutral-800 mix-blend-screen relative hero-text mb-8 md:mb-0 text-center wrap-break-word hyphens-auto font-black tracking-tighter">
              Mas ele vê você.
            </h2>
          </div>

          {/* Espaçador para o botão quando o texto é 3D (Desktop only) */}
          {enable3D && <div className="hidden md:block h-[15vh] w-full" />}

          {/* CTA Button Principal - Único */}
          <motion.div
            className="pointer-events-auto mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 4.2, duration: 0.8 }}
          >
            <CTAButton href="/sobre" variant="primary">
              step inside &rarr;
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroCopy;
