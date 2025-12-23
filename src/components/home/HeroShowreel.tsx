'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { BRAND } from '@/config/brand';

interface HeroShowreelProps {
  videoSrc?: string;
  posterSrc?: string;
}

export default function HeroShowreel({
  videoSrc = BRAND.video.manifesto,
  posterSrc,
}: HeroShowreelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hook de Scroll: Monitora o progresso de scroll DENTRO deste container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  // 2. Transformações Mapeadas (Physics-based feel)
  // Escala vai de 95% para 100% conforme scrolla
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1]);

  // O arredondamento das bordas some conforme o vídeo cresce (de 24px para 0px)
  const borderRadius = useTransform(scrollYProgress, [0, 0.6], [24, 0]);

  // Opacidade sutil no início para suavizar a entrada
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <div
      id="manifesto"
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center bg-[#050505] mt-12 mb-24"
    >
      <div className="w-full h-full max-w-[1920px] mx-auto overflow-hidden flex items-center justify-center">
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative w-full h-full overflow-hidden shadow-2xl origin-center will-change-transform"
        >
          {/* Overlay suave para profundidade */}
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

          <video
            className="w-full h-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* Badge Visual (Showreel) */}
          <div className="absolute bottom-8 left-8 z-20 hidden md:block">
            <span className="bg-white/10 backdrop-blur-md text-white/90 border border-white/10 px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.3em]">
              Showreel 2025
            </span>
          </div>

          {/* Scanlines sutis para o Ghost Theme */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-size-[100%_4px]" />
        </motion.div>
      </div>
    </div>
  );
}
