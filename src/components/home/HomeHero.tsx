// src/components/home/HomeHero.tsx

'use client';

import { motion } from 'framer-motion';
import SpectralGhost from './SpectralGhost'; // Caminho correto no mesmo diretório
import { useSpectralGhost } from '@/hooks/useSpectralGhost'; // Caminho para o hook

const HomeHero = () => {
  const isGhostLoaded = useSpectralGhost();

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        {/* O SpectralGhost será o fundo interativo */}
        <SpectralGhost onLoaded={() => {}} />

        {/* Os textos e botão serão sobrepostos ao canvas 3D */}
        {isGhostLoaded && (
          <div className="hero-text-overlay">
            <h1 className="hero-title">Design, não é só estética.</h1>
            <p className="hero-subtitle">
              [É intenção, é estratégia, é experiência.]
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="cta-button"
            >
              get to know me better →
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;
