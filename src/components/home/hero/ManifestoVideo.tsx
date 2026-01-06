'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValueEvent, MotionValue } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react'; // Ícones de som

interface ManifestoVideoProps {
  progress: MotionValue<number>; // Recebe o progresso do scroll do pai
  style?: any;
}

export default function ManifestoVideo({
  progress,
  style,
}: ManifestoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Monitora o scroll para ativar o som automaticamente ou expandir
  useMotionValueEvent(progress, 'change', (latest) => {
    // Se passou de 60% do scroll, considera expandido
    const expanded = latest > 0.6;
    if (expanded !== isExpanded) {
      setIsExpanded(expanded);
    }
  });

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 overflow-hidden shadow-2xl origin-bottom-right"
      style={{
        width: '100vw',
        height: '100vh',
        ...style,
      }}
    >
      {/* Container Wrapper Animado será feito no HomeHero para facilitar. 
          Aqui focamos no conteúdo do vídeo. */}

      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/manifesto.mp4" // Coloque seu vídeo aqui
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        {/* Overlay de Controle (Só aparece quando pequeno ou hover) */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors z-50"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Texto "Manifesto" que some ao expandir */}
        {!isExpanded && (
          <div className="absolute top-4 left-4 text-xs font-mono text-white/80 bg-black/30 px-2 py-1 rounded">
            INITIALIZING_MANIFESTO_PROTOCOL
          </div>
        )}
      </div>
    </motion.div>
  );
}
