"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import HeroGlassCanvas from '../../3d/HeroGlassCanvas';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Controle de Scroll para efeitos de paralaxe sutis
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Animações baseadas no scroll (Opcional: Sair suavemente ao rolar)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Variantes de Animação de Entrada (Fade In / Slide Up)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } // Ease-out suave
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[110vh] w-full bg-[#F4F5F7] overflow-hidden"
    >
      {/* Container Principal */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 h-screen flex flex-col justify-center">

        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center h-full pt-20"
        >

          {/* ESQUERDA: Texto e CTA */}
          <motion.div
            className="flex flex-col justify-center items-start relative z-20 pointer-events-auto order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tighter mb-8 text-[#111111] font-sans">
              <motion.div variants={itemVariants} className="overflow-hidden">
                <span className="block text-[#0057FF]">Design,</span>
              </motion.div>
              <motion.div variants={itemVariants} className="overflow-hidden">
                <span className="block">não é só</span>
              </motion.div>
              <motion.div variants={itemVariants} className="overflow-hidden">
                <span className="block">estética.</span>
              </motion.div>
            </h1>

            {/* Subtítulo / Manifesto */}
            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-[#0057FF] text-lg md:text-xl font-medium tracking-wide bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block shadow-sm border border-white/40">
                [ É intenção, é estratégia, é experiência. ]
              </p>
            </motion.div>

            {/* Botão CTA */}
            <motion.div variants={itemVariants}>
              <a
                href="/sobre"
                className="group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-bold text-base md:text-lg hover:bg-[#0047cc] transition-all shadow-xl shadow-[#0057FF]/20 hover:shadow-[#0057FF]/40 transform hover:-translate-y-1"
              >
                get to know me better
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* DIREITA: Elemento 3D (Torus) */}
          <div className="relative w-full h-[50vh] lg:h-full flex items-center justify-center lg:justify-end z-10 order-1 lg:order-2">

            {/* Tag Flutuante (Brand Awareness) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute right-0 top-10 lg:top-1/2 lg:-translate-y-1/2 z-0 hidden md:block pointer-events-none"
            >
              <span className="text-gray-300/80 font-bold text-xs md:text-sm tracking-[0.3em] uppercase lg:rotate-90 lg:origin-right lg:translate-x-12 whitespace-nowrap">
                [ Brand Awareness ]
              </span>
            </motion.div>

            {/* Canvas 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full lg:scale-125 xl:scale-150 origin-center lg:origin-right"
            >
              <HeroGlassCanvas />
            </motion.div>

          </div>

        </motion.div>
      </div>

      {/* Indicador de Scroll (Opcional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;