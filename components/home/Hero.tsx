'use client';

import React, { useCallback, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Play } from 'lucide-react';
import HeroGlassCanvas from '@/components/three/HeroGlassCanvas';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/constants';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Ajuste das transformações do vídeo para melhor comportamento responsivo
  // Mobile: Começa maior e centralizado em baixo. Desktop: Canto direito.
  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.35],
    ['280px', '100vw']
  );
  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.35],
    ['160px', '100vh']
  );

  // Desktop positions (calculado em % para fluidez)
  const desktopX = useTransform(scrollYProgress, [0, 0.35], ['35vw', '0vw']);
  const desktopY = useTransform(scrollYProgress, [0, 0.35], ['30vh', '0vh']);

  const videoRadius = useTransform(scrollYProgress, [0, 0.35], ['16px', '0px']);

  const handleVideoExpand = useCallback(() => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[250vh] w-full bg-[#F4F4F7]" // Aumentado altura de scroll
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Camada 3D - Z-index baixo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroGlassCanvas
            className="w-full h-full"
            eventSource={sectionRef}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Camada de Conteúdo - Z-index médio */}
        <div className="relative z-10 h-full w-full pointer-events-none">
          {/* Container principal */}
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 lg:px-12">
            <motion.div
              style={{ opacity: textOpacity, scale: textScale }}
              className="pointer-events-auto max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/50 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0057FF] backdrop-blur-md">
                <span>[ brand awareness ]</span>
              </div>

              <h1 className="font-sans text-5xl font-extrabold leading-[0.95] tracking-tight text-[#111111] sm:text-7xl md:text-[5.5rem] lg:text-[7rem]">
                <span className="block text-[#0057FF]">Design,</span>
                <span className="block">não é só</span>
                <span className="block">estética.</span>
              </h1>

              <div className="mt-8 max-w-lg rounded-lg bg-white/40 p-4 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                <p className="text-lg font-medium leading-relaxed text-[#111111]/80 md:text-xl">
                  [É intenção, é estratégia, é experiência.]
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  href="/sobre"
                  className="uppercase tracking-widest text-xs py-4 px-8"
                >
                  get to know me better →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Camada do Vídeo Thumb - Z-index alto */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.button
            type="button"
            onClick={handleVideoExpand}
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoRadius,
              x: desktopX, // Aplicar lógica condicional para mobile via CSS classes se necessário ou useMediaQuery hook
              y: desktopY,
            }}
            className="pointer-events-auto absolute flex cursor-pointer overflow-hidden shadow-2xl origin-center"
          >
            <div className="relative h-full w-full bg-black">
              <video
                src={ASSETS.videoManifesto}
                className="h-full w-full object-cover opacity-90"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10">
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 backdrop-blur-md border border-white/20">
                  <Play className="w-3 h-3 text-white fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Manifesto
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
