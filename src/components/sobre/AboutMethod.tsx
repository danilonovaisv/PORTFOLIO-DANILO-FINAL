'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const cardRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

// Conteúdo oficial do protótipo interativo
const METHOD_CONTENT = {
  video:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/VideoAboutMethod.mp4',
  title: 'Criatividade com método.',
  titleHighlight: 'método.',
  subtitle: 'Impacto sem ruído.',
  intro: [
    'Antes da estética, existe intenção.',
    'Antes do layout, existe lógica.',
    'Antes do impacto, existe silêncio.',
  ],
  steps: [
    'Briefings bem construídos para decisões claras',
    'Estratégia como base de qualquer criação',
    'Design com propósito, não só beleza',
    'Revisões inteligentes, sem ruído desnecessário',
    'IA e automações para escalar com qualidade',
    'Métricas criativas: engajamento, retenção e resultado',
  ],
};

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax sutil no vídeo de fundo - apenas desktop
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 flex flex-col justify-center overflow-hidden bg-[#040013]"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video com parallax (desktop only) */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-0 z-0 h-[110%] -top-[5%] hidden md:block"
      >
        <video
          src={METHOD_CONTENT.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-50"
          aria-hidden="true"
        />
        {/* Overlay gradiente para legibilidade */}
        <div className="absolute inset-0 bg-linear-to-r from-[#040013] via-[#040013]/80 to-transparent" />
      </motion.div>

      {/* Mobile: Video poster estático para performance */}
      <div className="absolute inset-0 z-0 block md:hidden bg-linear-to-br from-[#040013] to-[#06071f]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-[560px]">
          {/* Títulos */}
          <motion.div
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#fcffff] tracking-tighter leading-none mb-2">
              Criatividade com{' '}
              <span className="ghost-accent">
                {METHOD_CONTENT.titleHighlight}
              </span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#fcffff] tracking-tighter leading-none">
              {METHOD_CONTENT.subtitle}
            </p>
          </motion.div>

          {/* Texto introdutório */}
          <motion.div
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-[#a1a3a3] font-light leading-relaxed space-y-2 mb-10 md:mb-16"
          >
            {METHOD_CONTENT.intro.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </motion.div>

          {/* Steps List */}
          <div className="space-y-6">
            {METHOD_CONTENT.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={cardRise}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 border-t border-white/10 pt-5"
              >
                <span className="font-mono text-[#0048ff] text-sm font-bold shrink-0">
                  0{i + 1}
                </span>
                <p className="text-base md:text-lg text-[#a1a3a3] font-light">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
