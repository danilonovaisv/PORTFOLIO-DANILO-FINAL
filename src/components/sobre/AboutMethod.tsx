'use client';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import { fadeGhost } from '@/lib/motionTokens';

const VIDEO_BG =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE%20-%20FRASE.mp4';

const processList = [
  'Briefings bem construídos para decisões claras',
  'Estratégia como base de qualquer criação',
  'Design com propósito, não só beleza',
  'Revisões inteligentes, sem ruído desnecessário',
  'IA e automações para escalar com qualidade',
  'Métricas criativas: engajamento, retenção e resultado',
];

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] py-32 flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Como Eu Trabalho"
    >
      {/* Background - Full bleed video with parallax */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%]"
      >
        <video
          src={VIDEO_BG}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale" // Adjusted opacity/grayscale for 'tech/lab' feel
        />
        <div className="absolute inset-0 bg-black/80" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="max-w-4xl">
          <motion.div
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ amount: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
              Criatividade com método.
              <br />
              <span className="text-white/40">Impacto sem ruído.</span>
            </h2>
            <div className="text-xl md:text-2xl text-[#4fe6ff] font-mono leading-relaxed space-y-2">
              <p>Antes da estética, existe intenção.</p>
              <p>Antes do layout, existe lógica.</p>
              <p>Antes do impacto, existe silêncio.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {processList.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                custom={i * 0.1}
                className="flex items-start gap-4 border-t border-white/20 pt-6"
              >
                <span className="font-mono text-[#0057FF] text-base font-bold">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl text-white/90 font-light">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
