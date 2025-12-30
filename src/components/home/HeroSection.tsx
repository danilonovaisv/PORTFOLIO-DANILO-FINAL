// src/components/HeroSection.tsx
import { motion } from 'framer-motion';
import SpectralGhost from './SpectralGhost';
import { useSpectralGhost } from '../hooks/useSpectralGhost';

const HeroSection: React.FC = () => {
  const isGhostLoaded = useSpectralGhost();

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        <SpectralGhost onLoaded={() => console.log('Ghost loaded')} />
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

export default HeroSection;
