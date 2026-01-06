// HomeHero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GhostCanvas from '../canvas/home/ghost/GhostCanvas';
import HeroPreloader from '../canvas/home/ghost/HeroPreloader';

const HomeHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simula o carregamento para o preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Tempo do preloader

    return () => clearTimeout(timer);
  }, []);

  // Variantes de Animação para Texto
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* CANVAS 3D DO GHOST */}
      <GhostCanvas />

      {/* PRELOADER */}
      {!isLoaded && <HeroPreloader />}

      {/* CONTEÚDO DA HERO - Agora está sobreposto ao Canvas */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 text-center ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Design, não é</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              só estética.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={subtitleVariants}
          className="max-w-2xl mx-auto mt-4"
        >
          <p className="text-lg sm:text-xl text-gray-300 font-light">
            É intenção, é estratégia, é experiência.
          </p>
        </motion.div>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Saiba Mais
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
