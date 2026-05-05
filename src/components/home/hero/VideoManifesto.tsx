'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { GHOST_EASE, viewportConfig, MOTION_TOKENS } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';

import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { getAssetUrl } from '@/lib/utils';

interface VideoManifestoProps {
  src: string;
  srcMobile?: string;
  posterDesk?: string;
  posterMobile?: string;
  assetKey?: string;
  assetKeyMobile?: string;
}

const VIDEO_EXTENSIONS_REGEX = /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i;

const isLikelyVideoUrl = (url?: string | null) => {
  if (!url) return false;
  if (url.startsWith('blob:') || url.startsWith('data:video/')) return true;
  return VIDEO_EXTENSIONS_REGEX.test(url);
};

/** SSR-safe breakpoint hook — returns true when viewport is ≤ 767px (mobile) */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export function VideoManifesto({
  src,
  srcMobile,
  posterDesk,
  posterMobile,
  assetKey,
  assetKeyMobile,
}: VideoManifestoProps) {
  const { asset } = useRealtimeAsset(assetKey || '');
  const { asset: assetMobile } = useRealtimeAsset(assetKeyMobile || '');
  const [muted, setMuted] = useState(true);
  const [videoQuality, setVideoQuality] = useState<'hd' | 'sd'>('hd');
  const shouldReduceMotion = useMotionGate();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const deskBR = useTransform(scrollYProgress, [0.6, 1], ['16px', '0px']);

  const [hasPlayedHold, setHasPlayedHold] = useState(false);

  useEffect(() => {
    if (isMobile || hasPlayedHold || shouldReduceMotion) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Quando o video atingir 99% a 100% da viewport (start top)
      if (latest >= 0.99 && !hasPlayedHold) {
        setHasPlayedHold(true);

        // Unmute automático e tentar tocar áudio se não estiver
        setMuted(false);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Se autoplay foi bloqueado pelo browser
          });
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasPlayedHold, isMobile, shouldReduceMotion]);

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

  // ── Resolução da fonte de vídeo (desktop) ──────────────────────────────────
  const baseSrcDesk =
    mounted && isLikelyVideoUrl(asset?.publicUrl)
      ? (asset?.publicUrl as string)
      : src;

  // ── Resolução da fonte de vídeo (mobile) ──────────────────────────────────
  const baseSrcMobile =
    mounted && isLikelyVideoUrl(assetMobile?.publicUrl)
      ? (assetMobile?.publicUrl as string)
      : (srcMobile ?? src);

  // Escolhe a fonte correta para o dispositivo atual
  const activeSrc = isMobile ? baseSrcMobile : baseSrcDesk;
  const [currentSrc, setCurrentSrc] = useState(activeSrc);

  useEffect(() => {
    setCurrentSrc(activeSrc);
  }, [activeSrc]);

  // Usa SD somente se existir um variant explícito em metadata; evita 404 silencioso.
  const sdVariant = (
    asset?.metadata as { variants?: { sd?: string } } | undefined
  )?.variants?.sd;
  const variantSrc =
    mounted && videoQuality === 'sd' && isLikelyVideoUrl(sdVariant)
      ? (sdVariant as string)
      : currentSrc;
  const videoSrc = variantSrc;

  const rawPoster = isMobile
    ? (posterMobile ?? posterDesk ?? DEFAULT_VIDEO_POSTER)
    : (posterDesk ?? DEFAULT_VIDEO_POSTER);

  const activePoster = getAssetUrl(rawPoster, { width: 1920, quality: 60 });

  return (
    <m.section
      ref={sectionRef}
      aria-labelledby="video-manifesto-heading"
      className="video-manifesto w-full overflow-hidden rounded-[2px]"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: MOTION_TOKENS.duration.fast }
          : { duration: MOTION_TOKENS.duration.ghostIn, ease: GHOST_EASE }
      }
      viewport={viewportConfig}
    >
      <h2 id="video-manifesto-heading" className="sr-only">
        Video manifesto
      </h2>
      <m.div
        ref={wrapperRef}
        // Change aspect ratio handling to allow natural height on mobile without cutting
        className="video-wrapper relative w-full bg-black/5"
        style={
          !isMobile && !shouldReduceMotion
            ? {
                borderRadius: deskBR,
                transformOrigin: 'bottom right',
              }
            : {}
        }
      >
        <video
          ref={videoRef}
          className="w-full h-auto sm:aspect-video sm:object-cover block"
          src={videoSrc}
          poster={activePoster}
          autoPlay={!shouldReduceMotion}
          loop={!shouldReduceMotion}
          muted={muted}
          playsInline
          // Let the browser handle preloading metadata
          preload="metadata"
          onError={() => {
            if (videoSrc !== src) {
              setCurrentSrc(src);
            }
          }}
          aria-label="Vídeo showreel demonstrando projetos de design gráfico"
        >
          <ResponsiveCaptionTrack src="/captions/ambient.vtt" />
        </video>

        {/* Overlay Ghost System */}
        <div
          className="absolute inset-0 bg-background/15 pointer-events-none"
          aria-hidden="true"
        />

        {/* Toggle som */}
        <button
          type="button"
          className="toggle-sound absolute top-3 right-3 h-14 w-14 sm:h-12 sm:w-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#0048ff] focus-visible:outline-offset-2"
          onClick={() => setMuted((m: boolean) => !m)}
          aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
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
      </m.div>
    </m.section>
  );
}
