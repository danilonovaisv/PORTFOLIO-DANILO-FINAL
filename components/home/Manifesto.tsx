'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, type Easing, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/constants';
import { AlertCircle, Pause, Play } from 'lucide-react';

const ManifestoVideo = dynamic(() => import('./ManifestoVideo'), {
  ssr: false,
});

const MANIFESTO_EASE: Easing = 'easeOut';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const videoScale = prefersReducedMotion
    ? undefined
    : useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 0.96]);
  const videoTranslateY = prefersReducedMotion
    ? undefined
    : useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);
  const manifestoMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: MANIFESTO_EASE },
      };
  const videoLoadingFallback = (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#0057FF]" />
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
      className="w-full bg-[#F4F5F7] px-0 py-10 md:py-16"
    >
      <div className="w-full">
        <motion.div {...manifestoMotionProps} className="w-full">
          <motion.div
            style={{ scale: videoScale, y: videoTranslateY }}
            className="relative w-full overflow-hidden rounded-3xl bg-[#e5e7eb] shadow-xl aspect-[21/10] max-w-7xl mx-auto"
          >
            {hasError ? (
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
            ) : shouldLoad ? (
              <Suspense fallback={videoLoadingFallback}>
                <ManifestoVideo videoRef={videoRef} onError={() => setHasError(true)} />
              </Suspense>
            ) : (
              videoLoadingFallback
            )}

            <div className="pointer-events-none absolute inset-0" />

            <div className="absolute inset-0 flex items-end justify-start p-6">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar manifesto em vídeo' : 'Reproduzir manifesto em vídeo'}
                className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm ring-1 ring-white/30 transition hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span className="sr-only">Controle do manifesto</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
