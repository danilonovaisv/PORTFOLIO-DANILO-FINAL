'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GHOST_EASE, viewportConfig } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';

interface VideoManifestoProps {
  src: string;
  assetKey?: string;
}

const VIDEO_EXTENSIONS_REGEX = /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i;

const isLikelyVideoUrl = (url?: string | null) => {
  if (!url) return false;
  if (url.startsWith('blob:') || url.startsWith('data:video/')) return true;
  return VIDEO_EXTENSIONS_REGEX.test(url);
};

export function VideoManifesto({ src, assetKey }: VideoManifestoProps) {
  const { asset } = useRealtimeAsset(assetKey || '');
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'hd' | 'sd'>('hd');
  const shouldReduceMotion = useMotionGate();

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy loading
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Mutar sempre por padrão; som só habilita via ação explícita do usuário (botão)
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setMuted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Detectar qualidade de conexão
  useEffect(() => {
    // Definir interface mínima para conexão
    interface NetworkInformation extends EventTarget {
      readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | '5g';
      readonly saveData: boolean;
    }

    const nav = navigator as Navigator & { connection?: NetworkInformation };

    if (nav.connection) {
      if (
        nav.connection.effectiveType === '4g' ||
        nav.connection.effectiveType === '5g'
      ) {
        setVideoQuality('hd');
      } else {
        setVideoQuality('sd');
      }
    }
  }, []);

  // Aplicar mute
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
  }, [muted]);

  const baseSrc = isLikelyVideoUrl(asset?.publicUrl)
    ? (asset?.publicUrl as string)
    : src;
  const [currentSrc, setCurrentSrc] = useState(baseSrc);

  useEffect(() => {
    setCurrentSrc(baseSrc);
  }, [baseSrc]);

  // Usa SD somente se existir um variant explícito em metadata; evita 404 silencioso.
  const sdVariant = (
    asset?.metadata as { variants?: { sd?: string } } | undefined
  )?.variants?.sd;
  const variantSrc =
    videoQuality === 'sd' && isLikelyVideoUrl(sdVariant)
      ? (sdVariant as string)
      : currentSrc;
  const videoSrc = variantSrc;

  const posterSrc = videoSrc.replace('.mp4', '-poster.jpg');

  return (
    <motion.section
      ref={sectionRef}
      className="video-manifesto w-full overflow-hidden rounded-[2px]"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : { duration: 1.2, ease: GHOST_EASE }
      }
      viewport={viewportConfig}
    >
      <div
        ref={wrapperRef}
        className="video-wrapper relative w-full aspect-video"
      >
        {shouldLoad ? (
          <>
            <motion.video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay={!shouldReduceMotion}
              loop={!shouldReduceMotion}
              muted={muted}
              playsInline
              preload="metadata"
              onError={() => {
                if (videoSrc !== src) {
                  setCurrentSrc(src);
                }
              }}
              aria-label="Vídeo showreel demonstrando projetos de design gráfico"
            ></motion.video>

            {/* Metadados */}

            {/* Toggle som */}
            <button
              type="button"
              className="toggle-sound absolute top-3 right-3 h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#4fe6ff] focus-visible:outline-offset-2"
              onClick={() => setMuted((m: boolean) => !m)}
              aria-label={
                muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'
              }
              aria-pressed={!muted}
            >
              {muted ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </>
        ) : (
          // Placeholder
          <div className="w-full h-full bg-linear-to-br from-neutral-900 to-neutral-800 animate-pulse" />
        )}
      </div>
    </motion.section>
  );
}
