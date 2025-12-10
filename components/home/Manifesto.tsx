'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Lazy-load: só inicia carregamento quando seção está próxima da viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const playHandler = () => {
      setShouldLoad(true);
      setIsAudioEnabled(true);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        videoRef.current
          .play()
          .catch(() => {
            /* fail silently if autoplay disallows playback */
          });
      }
    };

    window.addEventListener('hero:playManifesto', playHandler);

    return () => {
      window.removeEventListener('hero:playManifesto', playHandler);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const audioObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAudioEnabled(entry.intersectionRatio > 0.55);
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1], rootMargin: '0px' }
    );

    audioObserver.observe(sectionRef.current);
    return () => audioObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isAudioEnabled;
    if (isAudioEnabled) {
      videoRef.current.volume = 0.7;
    }
  }, [isAudioEnabled]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-title"
      className="w-full bg-[#F4F5F7] px-6 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna de Texto */}
          <div className="flex flex-col gap-6 order-1">
            <h2
              id="manifesto-title"
              className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight"
            >
              Vídeo Manifesto
            </h2>
            <p className="text-lg text-[#111111]/80 leading-relaxed max-w-lg">
              Este vídeo apresenta meu manifesto em design. O áudio é ativado
              automaticamente quando visível em tela cheia.
            </p>
            {/* Mantendo o aviso sobre mobile, mas simplificado na UI */}
            <p className="text-sm text-[#111111]/60">
              Em dispositivos móveis o áudio permanece desativado para respeitar
              o ambiente do usuário.
            </p>
          </div>

          {/* Coluna de Vídeo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 w-full"
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#e5e7eb] shadow-xl aspect-video">
              {!hasError ? (
                shouldLoad ? (
                  <video
                    ref={videoRef}
                    src={ASSETS.videoManifesto}
                    className="w-full h-full object-cover"
                    muted // Padrão
                    loop
                    playsInline
                    controls // Controles Nativos
                    preload="metadata"
                    onError={() => setHasError(true)}
                    aria-label="Vídeo Manifesto do portfólio"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#0057FF]" />
                    <span className="sr-only">Carregando player...</span>
                  </div>
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
                  <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
                  <p className="font-medium">
                    Não foi possível carregar o vídeo.
                  </p>
                  <a
                    href={ASSETS.videoManifesto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[#0057FF] text-sm underline-offset-4 hover:underline"
                  >
                    Assistir diretamente
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
