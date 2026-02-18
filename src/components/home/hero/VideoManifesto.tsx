'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { useMediaQuery } from '@/hooks/useMediaQuery';
// import { cn } from '@/lib/utils';

// --- CONFIGURAÇÃO ---
const SPRING_CONFIG = { stiffness: 200, damping: 25, mass: 0.5 };

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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estados
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hooks do Sistema
  const shouldReduceMotion = useMotionGate();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Scroll Progress para controlar a expansão baseada em scroll (se desejado futuramente)
  // Por enquanto, a especificação pede Floating → Fullscreen via clique, mas também menciona "Scroll Driven: scale 0.3 -> 1"
  // Vamos implementar a lógica:
  // 1. Inicialmente Floating (Bottom-Right)
  // 2. Ao clicar -> Expande para Fullscreen Modal
  // 3. A parte "Scroll Driven" geralmente se refere a transição do Hero para o conteúdo.
  //    Neste caso, vamos manter o vídeo fixo no canto até o usuário interagir OU chegar numa seção específica.

  // Pela descrição da FASE 1: "Scroll Driven (Framer Motion): useScroll + useTransform scale: 0.3 -> 1"
  // Isso sugere que conforme o usuário scrolla a página, o vídeo cresce? Ou o contrário (Hero -> Thumb)?
  // "Estado Inicial: Vídeo como thumbnail flutuante... Scroll Driven: scale 0.3 -> 1 ... translate para center"
  // Isso soa como: Começa pequeno no canto (enquanto no Hero?), e scrollando ELE CRESCE para tomar a tela?
  // OU: Começa Fullscreen (Hero Background) e encolhe para thumb?
  // LEITURA DO PEDIDO: "Estado Inicial: Vídeo como thumbnail flutuante... Scroll Driven... scale: 0.3 -> 1"
  // OK, vamos assumir que ele COMEÇA como thumbnail flutuante no canto inferior direito.
  // E conforme o usuário scrolla (saindo do Hero?), ele se expande? Ou é uma seção dedicada?
  // O contexto "VídeoManifesto" geralmente é abaixo do Hero.
  // Vamos implementar com "Scroll Trigger" container.

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Transformações baseadas no scroll (apenas Desktop)
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const x = useTransform(scrollYProgress, [0, 1], ['35vw', '0vw']); // De canto direito para centro
  const y = useTransform(scrollYProgress, [0, 1], ['40vh', '0vh']); // De baixo para centro

  // Spring suave para o movimento
  const smoothScale = useSpring(scale, SPRING_CONFIG);
  const smoothX = useSpring(x, SPRING_CONFIG);
  const smoothY = useSpring(y, SPRING_CONFIG);
  const smoothRadius = useSpring(borderRadius, SPRING_CONFIG);

  // Resolver Source do Vídeo
  const baseSrc = isLikelyVideoUrl(asset?.publicUrl)
    ? (asset?.publicUrl as string)
    : src;
  const [currentSrc, setCurrentSrc] = useState(baseSrc);

  useEffect(() => {
    setCurrentSrc(baseSrc);
  }, [baseSrc]);

  // Handler de clique para expandir/recolher manual
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false); // Unmute ao expandir pela primeira vez
    }
  }, [hasInteracted]);

  // Acessibilidade: Teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  if (shouldReduceMotion || !isDesktop) {
    // Fallback Mobile / Reduced Motion: Renderização padrão estática (sem floating complexo)
    return (
      <section className="relative w-full py-12 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden ring-1 ring-white/10">
            <video
              src={currentSrc}
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[200vh] mt-[-100vh] z-20 pointer-events-none">
      {/* 
        O containerRef tem altura extra (200vh) para criar track de scroll.
        Margin negativa puxa ele para cima para começar a "trackear" desde o Hero, se necessário.
        Mas dado que é um componente "VideoManifesto" abaixo do Hero, vamos ajustar.
      */}

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative origin-center shadow-2xl cursor-pointer pointer-events-auto"
          style={{
            width: '100vw',
            height: '100vh',
            scale: isExpanded ? 1 : smoothScale,
            x: isExpanded ? 0 : smoothX,
            y: isExpanded ? 0 : smoothY,
            borderRadius: isExpanded ? 0 : smoothRadius,
          }}
          onClick={toggleExpand}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={isExpanded ? "Minimizar vídeo manifesto" : "Expandir vídeo manifesto"}
          aria-expanded={isExpanded}
        >
          <div className="relative w-full h-full bg-black overflow-hidden">
            <motion.video
              ref={videoRef}
              src={currentSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />

            {/* Overlay Gradient (apenas quando pequeno para legibilidade se tiver texto sobre, ou estético) */}
            <motion.div
              className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-500"
              style={{ opacity: isExpanded ? 0 : 1 }}
            />

            {/* Mute toggle button (sempre visível) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-8 right-8 z-50 p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary"
              aria-label={isMuted ? "Ativar som" : "Mudo"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" x2="1" y1="9" y2="15" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              )}
            </button>

            {/* Expanded Close Button */}
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // console.log('Close clicked'); // Debug
                    setIsExpanded(false);
                  }}
                  className="absolute top-8 right-8 z-50 p-4 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20"
                  aria-label="Fechar vídeo fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </motion.button>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
