'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import GhostStage from './GhostStage';
import HeroCopy from './HeroCopy';
import HeroPreloader from './HeroPreloader';
import ManifestoThumb from './ManifestoThumb';

// --- SUB-COMPONENTE COM LÓGICA DE SCROLL SEGURA ---
// Este componente só é montado quando o browser está pronto, evitando o erro de "ref not hydrated"
function HomeHeroContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Scroll progress relativo APENAS à Hero
  // Agora é seguro porque heroRef estará sempre ligado ao <section> retornado
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'], // 0 → 1 ao longo da Hero
  });

  useEffect(() => {
    // Deteção de mobile dentro do componente montado
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["16px", "0px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[200vh] overflow-hidden bg-[#06071f]"
    >
      {/* Layer 0 — Background */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)]"
        aria-hidden
      />

      {/* Layer 20 — WebGL Ghost (Atmosphere) */}
      <div className="absolute inset-0 z-20">
        <GhostStage enabled={isDesktop} />
      </div>

      {/* Layer 10 — Conteúdo estático */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <HeroCopy />
      </motion.div>

      {/* Layer 30 — Manifesto Thumb (Desktop only) */}
      {isDesktop && (
        <motion.div
          style={{
            scale: scaleVideo,
            y: posYVideo,
            borderRadius: borderRadius
          }}
          className="absolute bottom-10 right-10 z-30 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg"
        >
          <ManifestoThumb />
        </motion.div>
      )}
    </section>
  );
}

// --- COMPONENTE PRINCIPAL (WRAPPER) ---
export default function HomeHero() {
  return (
    <>
      <HeroPreloader />
      <HomeHeroContent />
    </>
  );
}
