import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import HeroGlassTorus from './HeroGlassTorus';
import { ArrowRight, Play } from 'lucide-react';
import { ASSETS } from '../constants';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Controle de Scroll para a animação da timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // 1. O Texto e o 3D desaparecem mais rápido (0 -> 15% do scroll)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // 2. Animação do Vídeo Thumb -> Full Screen (0 -> 25%)
  // A animação completa em 25% do scroll total da seção.
  // Nos 75% restantes, o vídeo fica estático em fullscreen, simulando a pausa solicitada.
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [32, 0]);

  // Variantes de Entrada (Initial Load)
  const flipContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const flipItem: Variants = {
    hidden: { rotateX: -80, y: 40, opacity: 0 },
    visible: { 
        rotateX: 0, 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.6 } }
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative h-[450vh] w-full bg-[#F4F5F7]" // Altura aumentada para criar o tempo de "pausa"
    >
      {/* Container Sticky para manter o conteúdo visível durante o scroll da seção */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Camada de Conteúdo (Texto + 3D) - Fica por trás do vídeo expandido */}
        <motion.div 
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-12 md:gap-0">
            
            {/* ESQUERDA: Texto */}
            <div className="flex flex-col justify-center items-start relative z-20 order-2 md:order-1 pointer-events-auto">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 text-[#111111]"
                variants={flipContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span variants={flipItem} className="block text-[#0057FF]">Design,</motion.span>
                <motion.span variants={flipItem} className="block">não é só</motion.span>
                <motion.span variants={flipItem} className="block">estética.</motion.span>
              </motion.h1>
              
              <motion.div 
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-10"
              >
                <p className="text-[#0057FF] text-lg md:text-xl font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                  [É intenção, é estratégia, é experiência.]
                </p>
              </motion.div>

              <motion.a 
                href="/sobre" 
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-[#0057FF] text-white rounded-full px-8 py-4 flex items-center gap-3 font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-[#0057FF]/40"
              >
                get to know me better
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* DIREITA: 3D + Tag */}
            <div className="relative h-[50vh] md:h-screen w-full flex items-center justify-center order-1 md:order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-0 right-0 md:top-1/4 md:right-10 z-30 pointer-events-auto"
              >
                 <span className="text-[#0057FF] font-bold tracking-[0.2em] text-xs md:text-sm uppercase bg-white/80 backdrop-blur px-3 py-1 rounded-sm shadow-sm">
                   [ Brand Awareness ]
                 </span>
              </motion.div>

              <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
                 <HeroGlassTorus />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Camada do Vídeo (Foreground) - Animação de Scroll */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black"
        >
           <div
              className="relative w-full h-full block group"
           >
              <video
                src={ASSETS.videoManifesto}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Elementos sobre o vídeo */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 transition-opacity duration-300">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-none hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-4 h-4 text-[#0057FF] ml-1 fill-current" />
                 </div>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;