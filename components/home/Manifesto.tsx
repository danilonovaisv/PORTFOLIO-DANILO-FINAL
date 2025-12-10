'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, type Easing } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/constants';
import HeroShowreel from './HeroShowreel';
import { AlertCircle, Pause, Play } from 'lucide-react';

const MANIFESTO_EASE: Easing = 'easeOut';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const manifestoMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: MANIFESTO_EASE },
      };
  const videoLoadingFallback = (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#0057FF]" />
      <span className="sr-only">Carregando player...</span>
    </div>
  );

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

  // Garante autoplay (muted) quando carregar
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(!videoRef.current?.paused))
        .catch(() => setIsPlaying(false));
    }
  }, [shouldLoad]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const playHandler = () => {
      setShouldLoad(true);
      setIsAudioEnabled(true);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        videoRef.current.play().catch(() => {
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
    const video = videoRef.current;
    video.muted = !isAudioEnabled;
    if (isAudioEnabled) {
      video.volume = 0.7;
    }
    video
      .play()
      .then(() => setIsPlaying(!video.paused))
      .catch(() => setIsPlaying(false));
  }, [isAudioEnabled, shouldLoad]);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="w-full bg-[#F4F5F7] px-0 pb-10 pt-14 md:pb-20 md:pt-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 md:gap-6 md:px-10">
        <motion.div {...manifestoMotionProps} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full border border-[#0057FF]/30 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0057FF] shadow-sm">
              [ Brand Awareness ]
            </span>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              manifesto • motion design • estratégia
            </p>
          </div>
        </motion.div>
      </div>

      <HeroShowreel
        videoSrc={ASSETS.videoManifesto}
        posterSrc={ASSETS.manifestoPoster}
        videoRef={videoRef}
        shouldLoad={shouldLoad}
        hasError={hasError}
        onError={() => setHasError(true)}
        loadingFallback={videoLoadingFallback}
        errorFallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 text-center text-gray-600">
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
        }
        overlayContent={
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#0f172a] shadow-md ring-1 ring-black/5">
              strategy
            </div>
            <div className="absolute inset-0 flex items-end justify-start px-6 pb-6">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={
                  isPlaying
                    ? 'Pausar manifesto em vídeo'
                    : 'Reproduzir manifesto em vídeo'
                }
                disabled={!shouldLoad || hasError}
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-sm ring-1 ring-black/10 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span className="sr-only">Controle do manifesto</span>
              </button>
            </div>
          </>
        }
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
};

export default Manifesto;
