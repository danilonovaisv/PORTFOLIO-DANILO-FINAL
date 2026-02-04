
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AboutBeliefsFinal.module.css';

interface FinalSectionProps {
  bgColor: string;
}

const FinalSection: React.FC<FinalSectionProps> = ({ bgColor }) => {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = React.useState(0);

  const phrases = [
    "Um vídeo que respira.",
    "Uma marca que se reconhece.",
    "Um detalhe que fica.",
    "Crio para gerar presença.",
    "Mesmo quando não estou ali.",
    "Mesmo quando ninguém percebe o esforço."
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [phrases.length]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--final-section-bg', bgColor);
    }
  }, [bgColor]);

  return (
    <section
      ref={ref}
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${styles.section}`}
    >
      <motion.div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw] z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="text-[16vw] md:text-[14rem] tracking-tighter">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter text-[#0048ff] md:text-white mix-blend-overlay opacity-30 select-none">
          GHOST
        </div>

        {/* Camada de Manifesto (Frases Rotativas) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none mix-blend-plus-lighter">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold font-h1 text-accent text-center px-4 max-w-4xl"
            >
              {phrases[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-[24vw] md:text-[19rem] tracking-tighter mt-4">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

export default FinalSection;
