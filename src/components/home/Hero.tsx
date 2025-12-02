
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants, useMotionValueEvent } from 'framer-motion';
import HeroGlassCanvas from '../../3d/HeroGlassCanvas';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

// Componente para animar texto letra por letra (efeito "digitação/reveal")
const AnimatedTextLine: React.FC<{ 
  text: string; 
  className?: string; 
  delay?: number;
  colorClass?: string;
}> = ({ text, className, delay = 0, colorClass = "text-[#111111]" }) => {
  // Separa o texto em caracteres
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    },
  };

  const child: Variants = {
    hidden: {
      y: "100%", // Começa "embaixo" (máscara)
      opacity: 0, 
    },
    visible: {
      y: 0,
      opacity: 1,
      // Curva personalizada para simular o efeito líquido da referência
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`} // overflow-hidden é crucial para o efeito de máscara
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          className={`block ${colorClass} leading-[0.9]`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Controle de Scroll para a animação da timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Monitora o progresso do scroll para controlar o áudio do vídeo
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current) {
      // Se o scroll passar de 1% (início da expansão), retira o mudo.
      // Caso contrário, mantém mudo (importante para quando o usuário volta ao topo).
      if (latest > 0.01) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // 1. O Texto e o 3D desaparecem mais rápido (0 -> 15% do scroll)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // 2. Animação do Vídeo Thumb -> Full Screen (0 -> 25%)
  // A animação completa em 25% do scroll total da seção.
  // Nos 75% restantes, o vídeo fica estático em fullscreen, simulando a pausa solicitada.
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  // Ajuste fino para começar no canto inferior direito, similar ao layout anterior
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']); 
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]); // Começa arredondado e fica quadrado

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
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[80vh] h-full pt-24 md:pt-0">
            
            {/* ESQUERDA: Texto Principal */}
            <div className="flex flex-col justify-center items-start relative z-20 order-2 md:order-1 mt-12 md:mt-0 pointer-events-auto">
              
              {/* Título Principal */}
              <div className="text-[4.5rem] md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-6 md:mb-10 font-sans flex flex-col items-start gap-1">
                 {/* Mobile: Fade In Simples */}
                 <div className="md:hidden flex flex-col leading-[0.9]">
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="text-[#0057FF]"
                    >
                      Design,
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="text-[#111111]"
                    >
                      não é só
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                      className="text-[#111111]"
                    >
                      estética.
                    </motion.span>
                 </div>

                 {/* Desktop: Animação Letra por Letra */}
                 <div className="hidden md:flex flex-col items-start gap-0">
                    <AnimatedTextLine text="Design," delay={0.2} colorClass="text-[#0057FF]" />
                    <AnimatedTextLine text="não é só" delay={0.6} colorClass="text-[#111111]" />
                    <AnimatedTextLine text="estética." delay={1.0} colorClass="text-[#111111]" />
                 </div>
              </div>
              
              {/* Subtítulo */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 1.6 }}
                className="mb-10 md:mb-14"
              >
                <p className="text-[#0057FF] text-lg md:text-xl font-medium tracking-wide">
                  [ É intenção, é estratégia, é experiência. ]
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.a 
                href="/sobre" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0, 87, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg shadow-xl shadow-[#0057FF]/20 transition-all"
              >
                get to know me better
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </motion.a>
            </div>

            {/* DIREITA: 3D, Tag */}
            <div className="relative h-[50vh] md:h-full w-full flex items-center justify-center order-1 md:order-2">
              
              {/* Tag Brand Awareness */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 z-20 pointer-events-none"
              >
                 <span className="text-[#0057FF] text-xl font-medium tracking-wide">
                   [ BRAND AWARENESS ]
                 </span>
              </motion.div>

              {/* Globo Iridescente 3D */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full relative z-10"
              >
                 <HeroGlassCanvas />
              </motion.div>

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
           <div className="relative w-full h-full block group">
              <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                autoPlay
                muted // Começa mudo para permitir autoplay, mas é alterado pelo hook acima
                loop
                playsInline
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {/* Overlay de Play removido conforme solicitado */}
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
