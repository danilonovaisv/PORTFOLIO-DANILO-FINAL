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
                className="w-full h-full object-contain cursor-pointer"
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
                onClick={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
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
            {/* Minimalist Mute Toggle (Bottom Right) */}
            <button
              className="absolute bottom-6 right-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={(e) => {
                e.stopPropagation();
                updateMute(!isMuted);
              }}
              aria-label={
                isMuted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'
              }
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
