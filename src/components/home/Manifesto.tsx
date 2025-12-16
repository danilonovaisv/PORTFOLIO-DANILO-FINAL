'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/lib/constants';
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
        className="mx-auto w-full max-w-6xl"
      >
        <div className="relative w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
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
                aria-label="Vídeo Manifesto do Portfólio"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
                <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                <p className="font-medium">
                  Não foi possível carregar o vídeo.
                </p>
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
            {/* Video overlay with mute toggle */}
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => updateMute(!isMuted)}
              aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && updateMute(!isMuted)}
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-full p-4">
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6l-4 4H6a2 2 0 00-2 2v4a2 2 0 002 2h2l4 4V6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
