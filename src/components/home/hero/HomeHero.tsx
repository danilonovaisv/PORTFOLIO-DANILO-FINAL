// src/components/home/HomeHero.tsx
'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GhostCanvas from '@/components/canvas/hero/GhostCanvas';
import ManifestoThumb from './ManifestoThumb';
import ManifestoSection from './ManifestoSection';

// Variantes de Animação para Texto (Ghostly Reveal)
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const HomeHero = () => {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-[#06071f] flex items-center justify-center">
        {/* CANVAS 3D DO GHOST - Camada Superior (z-20 no componente) */}
        <GhostCanvas />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="flex flex-col items-center"
          >
            {/* TAG: BRAND AWARENESS (Apenas esta em caixa alta) */}
            <span className="font-mono text-[14px] text-[#d9dade] opacity-50 mb-12 tracking-[0.3em] uppercase">
              [BRAND AWARENESS]
            </span>

            {/* H1: Responsive Design - Sem Uppercase forçado */}
            <h1 className="text-[#d9dade] font-black leading-[0.85] tracking-tight text-center flex flex-col items-center">
              {/* Desktop / Tablet: 2 linhas */}
              <span className="hidden sm:block text-[clamp(6rem,10vw,9rem)]">
                Você não vê
              </span>
              <span className="hidden sm:block text-[clamp(6rem,10vw,9rem)]">
                o design.
              </span>

              {/* Mobile: 3 linhas (Ajustado para caber em telas pequenas) */}
              <span className="block sm:hidden text-[clamp(3.5rem,15vw,6rem)]">
                Você não
              </span>
              <span className="block sm:hidden text-[clamp(3.5rem,15vw,6rem)]">
                vê o
              </span>
              <span className="block sm:hidden text-[clamp(3.5rem,15vw,6rem)]">
                design.
              </span>
            </h1>

            {/* H2: Highlighted message - Sem Uppercase */}
            <h2 className="text-[#d9dade]/80 text-lg sm:text-2xl mt-12 font-medium tracking-widest">
              Mas ele vê você.
            </h2>

            {/* CTA: Step Inside (Antigravity 'Compound Fusion' Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20"
            >
              <Link
                href="/sobre"
                className="
                group
                relative
                flex items-stretch
                h-[64px]
                cursor-pointer
                transition-transform duration-200 ease-out
                hover:-translate-y-px
                pointer-events-auto
              "
                aria-label="Step inside to learn more"
              >
                {/* NÓ 1: CÁPSULA DE TEXTO (Esquerda) */}
                <div
                  className="
                  flex items-center justify-center
                  h-full
                  pl-8 pr-6
                  bg-[rgb(0,88,255)]
                  group-hover:bg-[rgb(50,120,255)]
                  text-white
                  rounded-l-full
                  transition-colors duration-300
                "
                >
                  <span className="text-sm font-medium tracking-[0.2em] uppercase whitespace-nowrap">
                    step inside
                  </span>
                </div>

                {/* NÓ 2: ESFERA DO ÍCONE (Direita) */}
                <div
                  className="
                  flex items-center justify-center
                  h-full aspect-square
                  bg-[rgb(0,88,255)]
                  group-hover:bg-[rgb(50,120,255)]
                  text-white
                  rounded-r-full
                  border-l border-white/10
                  transition-colors duration-300
                "
                >
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.5}
                    className="group-hover:rotate-45 transition-transform duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* MANIFESTO VIDEO (Desktop Thumbnail) - Z-30 */}
        <ManifestoThumb />
      </section>

      {/* MANIFESTO SECTION (Mobile only - Below Hero fold) */}
      <ManifestoSection />
    </>
  );
};

export default HomeHero;
