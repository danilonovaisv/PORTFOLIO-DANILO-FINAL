'use client';
import { useEffect, useRef } from 'react';

export default function ManifestoThumb() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!thumbRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportHeight);

      // Calculo do Scale para cobrir a tela (estimado) ou fixo
      // Base: 280px width. Target: window.innerWidth.
      // Mas para manter simples seguindo o workflow:
      const scale = 1 + progress * 10; // Aumentei para garantir cobertura maior (280 * 11 = ~3000px)
      const radius = Math.max(0, 16 - progress * 16);

      // Ajuste de translation para centralizar se necessário,
      // mas mantendo origin-bottom-right ele cresce para a esquerda/cima.

      requestAnimationFrame(() => {
        if (thumbRef.current) {
          thumbRef.current.style.transform = `scale(${scale})`;
          thumbRef.current.style.borderRadius = `${radius}px`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={thumbRef}
      className="hidden lg:block absolute bottom-8 right-8 z-30 w-[280px] aspect-video overflow-hidden shadow-2xl origin-bottom-right cursor-pointer transition-shadow duration-300 bg-black"
      role="button"
      aria-label="Expandir vídeo manifesto"
      onClick={() => {
        // Scrollar para o ponto de fullscreen (100vh)
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Overlay Icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xs font-mono uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
          Expand
        </span>
      </div>
    </div>
  );
}
