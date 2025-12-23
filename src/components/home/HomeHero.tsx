// src/components/home/HomeHero.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';
import { ScrollProvider } from '@/contexts/ScrollContext';

/**
 * HomeHero (Ghost Atmosphere Orchestrator)
 * Hierarquia de Camadas (Master Sync):
 * z-0: WebGL Canvas (GhostStage)
 * z-10: Gradient Overlay (opcional)
 * z-20: Conteúdo Editorial (HeroCopy + ManifestoThumb)
 * z-50: Preloader
 */
export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <ScrollProvider value={{ scrollYProgress }}>
      <section
        ref={containerRef}
        className="relative w-full h-[150vh] bg-[#050505]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 1. Preloader (z-50) */}
          <HeroPreloader />

          {/* 2. WebGL Atmosfera (z-0) */}
          <GhostStage />

          {/* 3. Overlay Radial de Integração (z-10) */}
          <div
            className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(11,13,58,0.2)_0%,#050505_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* 4. Conteúdo Editorial (z-20) */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1.5 }}
            >
              <HeroCopy />
            </motion.div>
          </div>

          {/* 5. Manifesto Thumb (z-20) - Positioned bottom right as per reference */}
          <div className="absolute bottom-10 right-10 z-20">
            <ManifestoThumb />
          </div>

          {/* 6. Analog Decay Overlay Global (Scanlines/Noise) */}
          <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>
      </section>
    </ScrollProvider>
  );
}
