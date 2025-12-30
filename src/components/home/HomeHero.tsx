// src/components/home/HomeHero.tsx

'use client';

import { motion } from 'framer-motion';
import SpectralGhost from './SpectralGhost';
import { useSpectralGhost } from '@/hooks/useSpectralGhost';
import ManifestoThumb from './ManifestoThumb';
import HeroCopy from './HeroCopy'; // Importando o HeroCopy com o texto

const HomeHero = () => {
  const isGhostLoaded = useSpectralGhost();

  return (
    <section className="relative min-h-screen md:min-h-[200vh] overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#0b0d3a_0%,#06071f_55%,#06071f_100%)]">
      {/* Preloader - Este é o preloader do seu SpectralGhost */}
      {/* O conteúdo do SpectralGhost já inclui o preloader. */}

      {/* Camada WebGL - Ghost 3D */}
      <div className="absolute inset-0 z-20">
        <SpectralGhost onLoaded={() => { }} />
      </div>

      {/* Texto Editorial sobreposto ao canvas 3D */}
      {isGhostLoaded && (
        <div className="hero-text-overlay absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <HeroCopy />
        </div>
      )}

      {/* Vídeo Manifesto - Desktop - Sobreposto ao texto e ao ghost */}
      {isGhostLoaded && (
        <motion.div
          className="absolute bottom-8 right-8 z-30 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg hidden md:block"
        >
          <ManifestoThumb />
        </motion.div>
      )}
    </section>
  );
};

export default HomeHero;