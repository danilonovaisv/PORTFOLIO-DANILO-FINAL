'use client';

/**
 * Origin Section Animations — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 3 (Animation):
 * - Desktop (≥1024px): Pin cinematic stage with smooth scrub, Lenis compatibility,
 *   hardware-accelerated clipPath transitions and GPU transforms.
 * - Synchronized Right-Rail HUD indicator (01..04).
 * - Mobile (<1024px): Responsive scroll-triggered narrative cards.
 * - Reduced Motion: Immediate states with zero blur, parallax, or scroll locks.
 *
 * Craft Standards (review-animations & Emil Kowalski):
 * - Curva de aceleração natural: cubic-bezier(0.16, 1, 0.3, 1) via GSAP CustomEase.
 * - Aceleração GPU exclusiva: will-change em clipPath e transforms, limpos no unmount.
 * - Lenis Integration: data-lenis-prevent condicional para evitar conflitos de scroll lock.
 */

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import { GHOST_EASE } from '@/config/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

export const ORIGIN_LAYOUT = {
  STAGE_HEIGHT_DVH: 82,
  PAD_X_DVH: 6,
  PAD_X_MOBILE_DVH: 2,
} as const;

// ──────────────────────────────────────────────────────────────────────────────
// ANIMATION CONSTANTS — Cinema Reel Specs
// ──────────────────────────────────────────────────────────────────────────────

const CLIP_FULL = 'inset(0% 0% 0% 0% round 32px)';
const CLIP_TOP_EXIT = 'inset(0% 0% 100% 0% round 32px)';

// ANIM: Entrada das cenas — Wipe vertical suave com scale sutil e blur dramático
const ENTRANCE_CLIP_FULL = 'inset(0% 0% 0% 0% round 32px)';
const ENTRANCE_CLIP_HIDDEN = 'inset(100% 0% 0% 0% round 32px)';

// ANIM: Text Reveal Variants — Stagger cinematográfico
export const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 24, // AUMENTAR de 16 para 24 para mais impacto
    filter: 'blur(8px)', // ADICIONAR blur inicial no texto
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)', // Remover blur durante entrada
    transition: {
      delay: i * 0.12, // STAGGER aumentado de 0.1 para 0.12s
      duration: 0.7,
      ease: GHOST_EASE,
    },
  }),
};

export interface UseOriginAnimationsProps {
  isClient: boolean;
  stageWrapRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  contentCount: number;
  prefersReducedMotion: boolean;
  onActiveSceneChange?: (_index: number) => void;
}

export function useOriginAnimations({
  isClient,
  stageWrapRef,
  containerRef,
  contentCount,
  prefersReducedMotion,
  onActiveSceneChange,
}: UseOriginAnimationsProps) {
  useEffect(() => {
    if (!isClient) return;

    const mediaQueryReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReduced = prefersReducedMotion || mediaQueryReduced;

    const mm = gsap.matchMedia();

    // Register custom ease for natural physics
    const naturalEase =
      typeof window !== 'undefined'
        ? CustomEase.create('naturalEase', GHOST_EASE.join(','))
        : 'cubic-bezier(0.22, 1, 0.36, 1)';

    // DESKTOP & TABLET WIDE (≥ 1024px)
    mm.add('(min-width: 1024px)', () => {
      const container = containerRef.current;
      const stageWrap = stageWrapRef.current;
      if (!container || !stageWrap) return;

      const ctx = gsap.context(() => {
        const frames = stageWrap.querySelectorAll<HTMLElement>(
          '[data-origin-frame]'
        );
        const parallaxImgs = stageWrap.querySelectorAll<HTMLElement>(
          '[data-origin-parallax-img]'
        );
        const masks =
          stageWrap.querySelectorAll<HTMLElement>('[data-origin-mask]');
        const rail = document.querySelector<HTMLElement>('[data-origin-rail]');

        if (frames.length === 0) return;

        // Reduced motion: static reveal — no blur, no parallax, no clip transitions
        if (isReduced) {
          frames.forEach((frame) => {
            gsap.set(frame, {
              clipPath: CLIP_FULL,
              filter: 'blur(0px)',
              autoAlpha: 1,
            });
          });
          masks.forEach((mask) => {
            gsap.set(mask, { opacity: 0 });
          });
          parallaxImgs.forEach((img) => {
            gsap.set(img, { yPercent: 0 });
          });
          if (rail) {
            gsap.set(rail, { autoAlpha: 0, pointerEvents: 'none' });
          }
          onActiveSceneChange?.(0);
          return;
        }

        // ANIM: Initial visual states (full motion)
        // Frame 0 entra 100% nítido (blur 0px); frames subsequentes preparam transição
        frames.forEach((frame, i) => {
          gsap.set(frame, {
            clipPath: i === 0 ? ENTRANCE_CLIP_FULL : ENTRANCE_CLIP_HIDDEN,
            filter: i === 0 ? 'blur(0px)' : 'blur(12px)', // AUMENTADO de 8px para 12px
            autoAlpha: 1,
            scale: i === 0 ? 1 : 0.97, // Scale inicial sutil
            willChange: 'clip-path, filter, transform',
          });
        });

        masks.forEach((mask, i) => {
          gsap.set(mask, {
            opacity: i === 0 ? 0 : 0.65,
            willChange: 'opacity',
          });
        });

        // ANIM: Parallax amplitude aumentada de -4/4 para -6/6
        parallaxImgs.forEach((img) => {
          gsap.set(img, { yPercent: -6, willChange: 'transform' }); // AUMENTADO de -4 para -6
        });

        // Right Rail HUD: inicia oculto fora da seção Origem Criativa
        if (rail) {
          gsap.set(rail, { autoAlpha: 0, pointerEvents: 'none' });
        }

        onActiveSceneChange?.(0);

        // Each chapter transition gets approx. 85vh of scroll distance
        const totalDistance = (frames.length - 1) * 85;

        // Visibilidade do Right Rail: visível ESTRITAMENTE durante a permanência na Origem Criativa
        if (rail) {
          ScrollTrigger.create({
            id: 'origin-rail-visibility',
            trigger: stageWrap,
            start: 'top 65%',
            end: `+=${totalDistance}% 35%`,
            onToggle: (self) => {
              gsap.to(rail, {
                autoAlpha: self.isActive ? 1 : 0,
                pointerEvents: self.isActive ? 'auto' : 'none',
                duration: 0.35,
                ease: 'power2.out',
              });
            },
          });
        }

        // ANIM: Timeline principal com Cross-Dissolve + Ken Burns
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'origin-reel-trigger',
            trigger: stageWrap,
            start: 'center center',
            end: `+=${totalDistance}%`,
            pin: true,
            scrub: 1.5, // AUMENTADO de 0.5 para 1.5 (mais suavidade no cross-dissolve)
            anticipatePin: 1,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const segment = 1 / (frames.length - 1);
              const activeIndex = Math.min(
                frames.length - 1,
                Math.round(progress / segment)
              );
              onActiveSceneChange?.(activeIndex);
            },
          },
        });

        // Orchestrate transitions sequentially — Cross-Dissolve orchestrado
        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const currFrame = frames[i];
          const prevMask = masks[i - 1];
          const currMask = masks[i];
          const prevImg = parallaxImgs[i - 1];
          const currImg = parallaxImgs[i];

          const label = `chapter_${i}`;
          tl.addLabel(label);

          // ANIM: Ken Burns sutil na imagem anterior (zoom out 1.02 → 1.05)
          if (prevImg) {
            tl.to(
              prevImg,
              {
                scale: 1.05, // Ken Burns zoom in sutil na saída
                yPercent: 6, // AUMENTADO de 4 para 6 (parallax amplitude)
                ease: 'power2.inOut',
                duration: 1.2,
              },
              label
            );
          }

          // ANIM: Máscara de transição — fade out do frame anterior
          if (prevMask) {
            tl.to(
              prevMask,
              {
                opacity: 0.85, // AUMENTADO de 0.75 para 0.85
                ease: 'power2.inOut',
                duration: 0.75,
              },
              label
            );
          }

          // ANIM: Frame anterior — clipPath invertido (saída pela parte superior) + blur + scale down + fade
          tl.to(
            prevFrame,
            {
              clipPath: CLIP_TOP_EXIT,
              filter: 'blur(10px)',
              scale: 0.98,
              opacity: 0.7,
              ease: 'power3.inOut',
              duration: 1.0,
            },
            label
          );

          // ANIM: Frame atual — entrada com clipPath wipe + blur clear + scale 1
          tl.to(
            currFrame,
            {
              clipPath: ENTRANCE_CLIP_FULL,
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              ease: naturalEase, // GHOST_EASE "0.16, 1, 0.3, 1"
              duration: 1.4, // AUMENTADO de 1.0 para 1.4
            },
            label
          );

          // ANIM: Imagem atual — Ken Burns reverso (1.05 → 1.0) + parallax -6 → 0
          if (currImg) {
            tl.fromTo(
              currImg,
              { scale: 1.05, yPercent: -6 }, // Estado inicial: zoom in + parallax up
              {
                scale: 1, // Ken Burns zoom out sutil
                yPercent: 0, // Parallax resolve para centro
                ease: 'power3.inOut',
                duration: 1.2,
              },
              label
            );
          }

          // ANIM: Máscara atual — fade in (revelação)
          if (currMask) {
            tl.to(
              currMask,
              {
                opacity: 0,
                ease: 'power2.out',
                duration: 0.75,
              },
              `${label}+=0.15`
            );
          }
        }
      }, stageWrap);

      return () => {
        ctx.revert();
      };
    });

    // MOBILE (< 1024px)
    mm.add('(max-width: 1023px)', () => {
      const stageWrap = stageWrapRef.current;
      if (!stageWrap) return;

      const ctx = gsap.context(() => {
        const frames = stageWrap.querySelectorAll<HTMLElement>(
          '[data-origin-frame]'
        );

        frames.forEach((frame, i) => {
          gsap.set(frame, {
            position: 'relative',
            clipPath: 'none',
            filter: 'none',
            autoAlpha: 1,
            marginBottom: '2.5rem',
            height: 'auto',
            minHeight: '72dvh',
          });

          ScrollTrigger.create({
            trigger: frame,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => onActiveSceneChange?.(i),
            onEnterBack: () => onActiveSceneChange?.(i),
          });
        });
      }, stageWrap);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [
    isClient,
    stageWrapRef,
    containerRef,
    contentCount,
    prefersReducedMotion,
    onActiveSceneChange,
  ]);
}
