'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import {
  ORIGIN_CHAPTERS,
  ORIGIN_INTRO,
  ORIGIN_BRIDGE,
} from '@/components/sobre/origin/data';
import {
  OriginMask,
  CinemaReelStageFrame,
  CinemaReelRightRail,
  DetailsPanel,
  CinemaReelEntrance,
  type ResolvedOriginChapter,
} from '@/components/sobre/origin/OriginComponents';
import { useOriginAnimations } from '@/components/sobre/origin/useOriginAnimations';
import { useMotionGate } from '@/hooks/useMotionGate';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function AboutOrigin() {
  const containerRef = useRef<HTMLElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeDrawerChapter, setActiveDrawerChapter] =
    useState<ResolvedOriginChapter | null>(null);

  const prefersReducedMotion = useMotionGate();

  // Asset dynamic resolution with Supabase Storage origin2 canonical URL and local WebP fallback
  const imgUrl1 = useSiteAssetUrl(ORIGIN_CHAPTERS[0].imageId);
  const imgUrl2 = useSiteAssetUrl(ORIGIN_CHAPTERS[1].imageId);
  const imgUrl3 = useSiteAssetUrl(ORIGIN_CHAPTERS[2].imageId);
  const imgUrl4 = useSiteAssetUrl(ORIGIN_CHAPTERS[3].imageId);

  const resolvedChapters: ResolvedOriginChapter[] = useMemo(() => {
    const urls = [imgUrl1, imgUrl2, imgUrl3, imgUrl4];
    return ORIGIN_CHAPTERS.map((chap, idx) => ({
      ...chap,
      // Prioridade: Contexto dinâmico de assets -> fallback local -> URL remota do Supabase
      img: urls[idx] || chap.fallback || chap.supabaseUrl,
      priority: idx === 0,
    }));
  }, [imgUrl1, imgUrl2, imgUrl3, imgUrl4]);

  // Hook GSAP ScrollTrigger com física e curvas refinadas
  const { entranceComplete } = useOriginAnimations({
    isClient: true,
    stageWrapRef,
    containerRef,
    contentCount: resolvedChapters.length,
    prefersReducedMotion,
    onActiveSceneChange: (newIndex) => {
      setActiveSceneIndex(newIndex);
    },
  });

  const handlePipClick = (index: number) => {
    if (typeof window !== 'undefined') {
      const st = ScrollTrigger.getById('origin-reel-trigger');
      if (st && st.end > st.start) {
        const total = resolvedChapters.length;
        const progress = total > 1 ? index / (total - 1) : 0;
        const targetScroll = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        return;
      }
    }

    if (!stageWrapRef.current) return;
    const frames = stageWrapRef.current.querySelectorAll<HTMLElement>(
      '[data-origin-frame]'
    );
    if (frames[index]) {
      frames[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenExplore = (block: ResolvedOriginChapter) => {
    setActiveDrawerChapter(block);
  };

  const handleCloseExplore = () => {
    setActiveDrawerChapter(null);
  };

  return (
    <section
      ref={containerRef}
      id="origem-criativa"
      className="relative w-full bg-background text-text overflow-hidden selection:bg-bluePrimary selection:text-white"
    >
      {/* Halo Ambiental Cinematográfico Reativo aos Capítulos (Ghost Atmospheric Glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      >
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70vw] max-w-[1200px] h-[50vh] rounded-full bg-bluePrimary/12 blur-[140px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate(-50%, ${activeSceneIndex * 12}%)`,
          }}
        />
        <div
          className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vh] rounded-full bg-blueAccent/5 blur-[130px] transition-opacity duration-700"
          style={{
            opacity: activeSceneIndex % 2 === 1 ? 0.85 : 0.35,
          }}
        />
      </div>

      <OriginMask />

      {/* Cinema Reel Entrance Overlay — 3-loop auto-scroll with motion blur & scanlines */}
      <CinemaReelEntrance
        isPlaying={!entranceComplete}
        onComplete={() => {}}
      />

      {/* CABEÇALHO EDITORIAL: Alinhamento central e hierarquia visual rigorosa */}
      <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-8 pt-[10dvh] pb-[4dvh] md:pb-[5dvh] text-center select-none">
        <div className="inline-flex items-center gap-2.5 mb-3.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]"
          />
          <span
            id="origin-eyebrow"
            className="font-mono text-xs uppercase tracking-[0.28em] font-semibold text-bluePrimary"
          >
            {ORIGIN_INTRO.eyebrow}
          </span>
        </div>

        <h2
          id="origin-heading"
          className="font-sans text-h1 font-semibold leading-[1.04] text-bluePrimary tracking-tight mb-4"
        >
          <span className="sr-only">ORIGEM — </span>
          {ORIGIN_INTRO.headline}
        </h2>

        <p className="font-sans text-body text-textSecondary leading-relaxed font-normal max-w-2xl mx-auto">
          {ORIGIN_INTRO.description}
        </p>
      </div>

      {/* PALCO CINEMATOGRÁFICO: Quase Full-Width (~94vw) com Supabase Storage origin2 */}
      <div className="relative w-full px-2.5 sm:px-4 lg:px-0">
        <div
          ref={stageWrapRef}
          data-testid="origin-sticky-gallery"
          className="relative w-full lg:w-[94vw] xl:w-[95vw] lg:max-w-[1680px] mx-auto min-h-[72dvh] sm:min-h-[78dvh] lg:h-[80dvh] lg:max-h-[840px]"
        >
          {resolvedChapters.map((block, index) => (
            <CinemaReelStageFrame
              key={`frame-${block.id}`}
              block={block}
              index={index}
              isActive={index === activeSceneIndex}
              onExplore={handleOpenExplore}
            />
          ))}
        </div>
      </div>

      {/* HUD VERTICAL: Navegação lateral dos 4 capítulos no Desktop */}
      <CinemaReelRightRail
        total={resolvedChapters.length}
        activeSceneIndex={activeSceneIndex}
        onPipClick={handlePipClick}
        chapters={resolvedChapters}
      />

      {/* GAVETA LATERAL: Detalhes editoriais e pilares reais */}
      <DetailsPanel
        open={Boolean(activeDrawerChapter)}
        slide={activeDrawerChapter}
        onClose={handleCloseExplore}
      />

      {/* PONTE DE CONTINUIDADE: Transição e CTA */}
      <div className="relative w-full max-w-2xl mx-auto px-6 pt-[8dvh] pb-[6dvh] mt-[5dvh] border-t border-white/10 text-center select-none">
        <h3 className="font-sans text-h2 font-medium text-text leading-snug mb-3">
          {ORIGIN_BRIDGE.headline}
        </h3>

        <p className="font-sans text-small text-textSecondary leading-relaxed max-w-lg mx-auto mb-6">
          {ORIGIN_BRIDGE.text}
        </p>

        <a
          href={ORIGIN_BRIDGE.ctaHref}
          className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-bluePrimary/40 bg-bluePrimary/15 px-6 py-2.5 font-sans text-small font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-bluePrimary hover:bg-bluePrimary hover:shadow-[0_0_24px_rgba(0,72,255,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bluePrimary group"
        >
          <span>{ORIGIN_BRIDGE.ctaText}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-y-1 text-blueAccent"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

export default AboutOrigin;
