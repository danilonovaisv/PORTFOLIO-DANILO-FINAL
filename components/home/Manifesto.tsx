'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manifestRef = useRef<HTMLDivElement>(null);

  const updateMute = useCallback((mute: boolean) => {
    setIsMuted(mute);
    if (videoRef.current) {
      videoRef.current.muted = mute;
      if (!mute) {
        // Tentar definir volume apenas se estiver desmutando
        videoRef.current.volume = 1;
      }
    }
  }, []);

  const toggleMuteManual = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    updateMute(!isMuted);
  }, [isMuted, updateMute]);

  useEffect(() => {
    if (!manifestRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Auto-unmute apenas quando >55% visível
        const shouldPlayWithSound =
          entry.isIntersecting && entry.intersectionRatio >= 0.55;

        // Atualiza estado de mute baseado na visibilidade
        updateMute(!shouldPlayWithSound);
      },
      { threshold: [0.55] }
    );

    observer.observe(manifestRef.current);

    return () => {
      observer.disconnect();
    };
  }, [updateMute]);

  return (
    <section
      id="manifesto"
      className="w-full bg-[#F4F5F7] px-4 py-16 sm:px-6 sm:py-24"
    >
      <motion.div
        ref={manifestRef}
        initial={{ opacity: 0.6, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mx-auto w-full max-w-6xl flex flex-col gap-4"
      >
        <div 
          className="relative w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm cursor-pointer group" 
          onClick={toggleMuteManual}
        >
          <div className="w-full aspect-video relative bg-black">
            {!hasError ? (
              <motion.video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                className="w-full h-full object-contain"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                controls={false}
                onError={() => setHasError(true)}
                aria-label="Vídeo Manifesto do Portfólio. Clique para ligar/desligar o som."
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
                <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                <p className="font-medium">Não foi possível carregar o vídeo.</p>
                <a
                  href={ASSETS.videoManifesto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-primary text-sm hover:underline underline-offset-4"
                >
                  Assistir diretamente
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Controls / Status Below Video */}
        <div className="flex items-center justify-between px-2 text-sm font-medium text-gray-500">
           <span>Manifesto</span>
           <button 
             onClick={toggleMuteManual}
             className="flex items-center gap-2 hover:text-[#0057FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded px-2 py-1"
             aria-label={isMuted ? "Ligar som" : "Desligar som"}
           >
             <span className={`w-2 h-2 rounded-full ${isMuted ? 'bg-gray-400' : 'bg-[#0057FF] animate-pulse'}`} />
             {isMuted ? 'Som desligado' : 'Som ligado'}
           </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
