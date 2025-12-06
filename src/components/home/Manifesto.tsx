'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [forceMute, setForceMute] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mantém o áudio desativado em mobile
  useEffect(() => {
    const updateAudioPreference = () => {
      const isMobile = window.innerWidth < 768;
      setForceMute(isMobile);
      if (isMobile && videoRef.current) {
        videoRef.current.muted = true;
      }
    };

    updateAudioPreference();
    window.addEventListener('resize', updateAudioPreference);
    return () => window.removeEventListener('resize', updateAudioPreference);
  }, []);

  // Lazy-load: só inicia carregamento quando metade da seção está visível
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Controla áudio quando 100% do vídeo está visível
  useEffect(() => {
    if (!shouldLoad) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (forceMute) {
          videoRef.current.muted = true;
          videoRef.current.pause();
          return;
        }

        if (entry.intersectionRatio >= 0.999) {
          videoRef.current.muted = false;
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => null);
          }
        } else {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }
      },
      { threshold: [0, 1] }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [forceMute, shouldLoad]);

  // Ao sair da sessão (mesmo parcialmente), silencia e pausa o vídeo
  useEffect(() => {
    if (!shouldLoad) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (!entry.isIntersecting) {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [shouldLoad]);

  // Pausa/muta quando a aba não está visível
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="video-manifesto-title"
      aria-describedby="video-manifesto-description"
      className="w-full bg-[#F4F5F7] px-6 py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div>
          <h2
            id="video-manifesto-title"
            className="text-2xl font-semibold text-[#111111]"
          >
            Vídeo Manifesto
          </h2>
          <p
            id="video-manifesto-description"
            className="text-base text-[#111111]/80"
          >
            Este vídeo apresenta meu manifesto em design. O áudio é ativado
            automaticamente quando visível em tela cheia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
        >
          {!hasError ? (
            shouldLoad ? (
              <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                className="aspect-video h-full w-full max-w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                controls
                // @ts-expect-error - atributo experimental ainda sem tipagem
                loading="lazy"
                onError={() => setHasError(true)}
                aria-label="Vídeo Manifesto do portfólio"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#e4ebff] to-[#f5f8ff] text-sm text-[#5b6b7f]">
                Preparando manifesto...
              </div>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
              <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
              <p className="font-medium">Não foi possível carregar o vídeo.</p>
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
        </motion.div>

        {forceMute && (
          <p className="text-sm text-[#111111]/60">
            Em dispositivos móveis o áudio permanece desativado para respeitar o
            ambiente do usuário.
          </p>
        )}
      </div>
    </section>
  );
};

export default Manifesto;
