'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HeroMachineProps {
  videoSrc: string;
}

export default function HeroMachine({ videoSrc }: HeroMachineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Monitoramento do Scroll para a Seção (300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 2. Suavização para feeling cinematográfico
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 3. Mapeamento de Estados (Transformações)
  // Escala: Começa pequena (Thumb), fica Full, cresce na saída (Exit)
  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.7, 1],
    [0.8, 1, 1, 1.2]
  );

  // Opacidade: Fade out na saída
  const opacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  // Arredondamento: Perde o border-radius conforme entra
  const borderRadius = useTransform(smoothProgress, [0, 0.15], ['40px', '0px']);

  // 4. Máquina de Estados de Áudio
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (!videoRef.current) return;

      // Estado FULL (Áudio ON apenas entre 25% e 70% do scroll)
      if (latest > 0.25 && latest < 0.7) {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
        }
      } else {
        if (!videoRef.current.muted) {
          videoRef.current.muted = true;
        }
      }
    });
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      {/* Container "Pinned" via Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
          }}
          className="relative w-full h-full overflow-hidden will-change-transform origin-center"
        >
          {/* O Vídeo - Único Protagonista */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted // Essencial para o autoplay inicial do browser
            playsInline
            className="w-full h-full object-cover"
            preload="auto"
          />

          {/* Analog Grain Sutil (Fiel ao Ghost Theme) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

          {/* Vinheta Cinematográfica */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </motion.div>
      </div>

      {/* Acessibilidade: Indica ao leitor de tela o propósito da seção silenciosa */}
      <span className="sr-only">
        Vídeo manifesto cinematográfico de Danilo Novais
      </span>
    </div>
  );
}
