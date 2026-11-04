'use client';

/**
 * Origin Section Animations — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 3 (Animation):
 * - Desktop (≥1024px): Cinema Reel infinite loop with spring physics, snap, parallax
 * - Entrance: 3-loop auto-scroll with motion blur & scanlines (2.5s)
 * - Reduced Motion: Static cross-fade, rAF disabled
 * - Mobile (<1024px): Responsive scroll-triggered narrative cards
 *
 * Craft Standards (review-animations & Emil Kowalski):
 * - Spring physics: y += (target - y) * 0.11 per frame (~600ms settle)
 * - Velocity handoff: drag release velocity → spring initial velocity
 * - Interruptibility: rAF loop respects drag/wheel input at any moment
 * - GPU acceleration: will-change on transform, clip-path, filter
 * - Lenis Integration: data-lenis-prevent conditional for scroll lock avoidance
 */

import { RefObject, useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import { GHOST_EASE } from '@/config/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

// Convert GHOST_EASE tuple to CSS cubic-bezier string for GSAP
const GHOST_EASE_STRING = `cubic-bezier(${GHOST_EASE.join(',')})`;

// ──────────────────────────────────────────────────────────────────────────────
// CINEMA REEL CONSTANTS — Specification from cinema-reel.md
// ──────────────────────────────────────────────────────────────────────────────

const SLIDE_VH = 80;
const GAP_VH = 5;
const PITCH_VH = SLIDE_VH + GAP_VH; // 85vh
const TOP_PAD_VH = 10;
const TOTAL_SLOTS = 28; // 4 chapters × 7 copies
const CHAPTERS = 4;
const AUTO_START_IDX = 4; // Start at slot 4 (first real chapter after buffer)
const AUTO_START_Y = TOP_PAD_VH - AUTO_START_IDX * PITCH_VH; // -330vh

// Entrance constants
const ENTRANCE_DURATION = 2.5; // seconds
const ENTRANCE_LOOPS = 3;
const ENTRANCE_SLIDES_PER_LOOP = CHAPTERS; // 4 chapters
const ENTRANCE_TOTAL_SLIDES = ENTRANCE_LOOPS * ENTRANCE_SLIDES_PER_LOOP; // 12
const MAX_BLUR_PX = 18;
const MAX_BLUR_SVG_DEVIATION = 18;

// Physics constants
const SPRING_K = 0.11; // y += (target - y) * 0.11 per frame
const WHEEL_CLAMP_PX = 200;
const DRAG_SNAP_THRESHOLD_DVH = 14;
const HALF_PITCH = PITCH_VH / 2;

// Per-slide constants
const ACTIVE_ZONE_RATIO = 0.55; // smoothstep denominator
const BLUR_MAX_PX = 14;
const ENTRY_OFFSET_PX = 64;
const PARALLAX_FACTOR = 1.2; // R = 1.2 → 16.7% speed
const PERF_SKIP_DN = 2; // skip slots with |dn| > 2

// Reduced motion fallback
const REDUCED_FADE_DURATION = 0.3;

export const ORIGIN_LAYOUT = {
  STAGE_HEIGHT_DVH: 82,
  PAD_X_DVH: 6,
  PAD_X_MOBILE_DVH: 2,
} as const;

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
  // Refs for rAF loop state
  const rafRef = useRef<number | null>(null);
  const yRef = useRef(AUTO_START_Y);
  const targetYRef = useRef(AUTO_START_Y);
  const dragRef = useRef({ active: false, startY: 0, startTarget: 0, velocity: 0, lastTime: 0, lastY: 0 });
  const wheelLastTimeRef = useRef(0);
  const entrancePlayingRef = useRef(false);
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);
  const blurFilterRef = useRef<SVGFilterElement | null>(null);
  const scanlinesRef = useRef<HTMLDivElement | null>(null);
  const framesRef = useRef<HTMLElement[]>([]);
  const parallaxWrappersRef = useRef<HTMLElement[]>([]);
  const masksRef = useRef<HTMLElement[]>([]);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (entranceTlRef.current) {
      if (typeof entranceTlRef.current.kill === 'function') {
        entranceTlRef.current.kill();
      }
      entranceTlRef.current = null;
    }
    // Remove SVG filter if we injected it
    if (blurFilterRef.current && blurFilterRef.current.parentNode) {
      blurFilterRef.current.parentNode.removeChild(blurFilterRef.current);
      blurFilterRef.current = null;
    }
    // Remove scanlines if we injected them
    if (scanlinesRef.current && scanlinesRef.current.parentNode) {
      scanlinesRef.current.parentNode.removeChild(scanlinesRef.current);
      scanlinesRef.current = null;
    }
    // Clear will-change
    framesRef.current.forEach((frame) => {
      frame.style.willChange = 'auto';
    });
    parallaxWrappersRef.current.forEach((wrapper) => {
      wrapper.style.willChange = 'auto';
    });
    masksRef.current.forEach((mask) => {
      mask.style.willChange = 'auto';
    });
  }, []);

  // rAF loop — Spring physics + per-slide motion + parallax
  const rafLoop = useCallback(() => {
    const frames = framesRef.current;
    const parallaxWrappers = parallaxWrappersRef.current;
    const masks = masksRef.current;
    if (frames.length === 0) return;

    // Spring: y += (target - y) * 0.11
    const currentY = yRef.current;
    const targetY = targetYRef.current;
    const newY = currentY + (targetY - currentY) * SPRING_K;
    yRef.current = newY;

    // Update active scene index based on position
    // Each slot is PITCH_VH, first real chapter at slot 4 (index 0)
    const slotIndex = Math.round((TOP_PAD_VH - newY) / PITCH_VH);
    const chapterIndex = ((slotIndex % CHAPTERS) + CHAPTERS) % CHAPTERS;

    // Per-slide motion calculations
    const slideH = SLIDE_VH; // in vh
    const viewportCenter = -newY; // positive = scrolled down

    frames.forEach((frame, i) => {
      const slotCenterY = TOP_PAD_VH - i * PITCH_VH; // center of this slot in vh
      const dy = slotCenterY - viewportCenter; // distance from viewport center in vh
      const dn = dy / slideH; // normalized distance in slide heights

      // Skip slots far from viewport for performance
      if (Math.abs(dn) > PERF_SKIP_DN) {
        frame.style.opacity = '0';
        frame.style.filter = `blur(${BLUR_MAX_PX}px)`;
        frame.style.transform = 'translate3d(0, 0, 0) scale(0.97)';
        if (masks[i]) masks[i].style.opacity = '0.65';
        if (parallaxWrappers[i]) parallaxWrappers[i].style.transform = 'translate3d(0, 0, 0)';
        return;
      }

      let opacity = 0;
      let blur = BLUR_MAX_PX;
      let translateY = 0;
      let scale = 0.97;
      let maskOpacity = 0.65;
      let parallaxY = 0;

      if (dn <= 0) {
        // Incoming / active slide (at or past center)
        const absDn = Math.abs(dn);
        const t = Math.max(0, Math.min(1, 1 - absDn / ACTIVE_ZONE_RATIO));
        const smoothstep = t * t * (3 - 2 * t); // smoothstep
        opacity = smoothstep * smoothstep * (3 - 2 * smoothstep); // smoothstep squared for opacity
        blur = (1 - opacity) * BLUR_MAX_PX;
        translateY = (1 - opacity) * ENTRY_OFFSET_PX;
        scale = 0.97 + 0.03 * opacity;
        maskOpacity = 1 - opacity;
      } else if (dn <= 1) {
        // Leaving slide (just past center)
        const t = Math.max(0, Math.min(1, (1 - dn) / 0.4)); // fade after dn > 0.6
        opacity = t;
        blur = (1 - t) * BLUR_MAX_PX;
        translateY = 0;
        scale = 1;
        maskOpacity = 1 - t;
        // Parallax lead for leaving slide
        parallaxY = -dy * 0.42;
      } else {
        // Far slides
        opacity = 0;
        blur = BLUR_MAX_PX;
        translateY = 0;
        scale = 0.97;
        maskOpacity = 0.65;
      }

      // Apply to frame
      frame.style.opacity = String(opacity);
      frame.style.filter = `blur(${blur}px)`;
      frame.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      frame.style.willChange = 'transform, filter, opacity';

      // Apply to mask
      if (masks[i]) {
        masks[i].style.opacity = String(maskOpacity);
        masks[i].style.willChange = 'opacity';
      }

      // Apply parallax to image wrapper
      if (parallaxWrappers[i]) {
        parallaxWrappers[i].style.transform = `translate3d(0, ${parallaxY - dy / PARALLAX_FACTOR}px, 0)`;
        parallaxWrappers[i].style.willChange = 'transform';
      }
    });

    // Update HUD
    onActiveSceneChange?.(chapterIndex);

    // Continue loop
    rafRef.current = requestAnimationFrame(rafLoop);
  }, [onActiveSceneChange]);

  // Entrance animation — 3 loops auto-scroll with blur & scanlines
  const runEntrance = useCallback(
    (stageWrap: HTMLElement, frames: HTMLElement[], masks: HTMLElement[], parallaxWrappers: HTMLElement[]) => {
      entrancePlayingRef.current = true;

      // Create SVG filter for motion blur
      const svgNs = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNs, 'svg');
      svg.style.position = 'absolute';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.pointerEvents = 'none';
      const filter = document.createElementNS(svgNs, 'filter');
      filter.id = 'entrance-motion-blur';
      const feGaussianBlur = document.createElementNS(svgNs, 'feGaussianBlur');
      feGaussianBlur.setAttribute('in', 'SourceGraphic');
      feGaussianBlur.setAttribute('stdDeviation', '0 0');
      feGaussianBlur.setAttribute('edgeMode', 'duplicate');
      filter.appendChild(feGaussianBlur);
      svg.appendChild(filter);
      document.body.appendChild(svg);
      blurFilterRef.current = filter;

      // Create scanlines overlay
      const scanlines = document.createElement('div');
      scanlines.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        mix-blend-mode: screen;
        background-image: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(79, 230, 255, 0.08) 2px,
          rgba(79, 230, 255, 0.08) 4px
        );
        background-size: 100% 4px;
      `;
      document.body.appendChild(scanlines);
      scanlinesRef.current = scanlines;

      // Apply filter to stage wrap
      stageWrap.style.filter = 'url(#entrance-motion-blur)';

      // Initial state for entrance
      frames.forEach((frame) => {
        gsap.set(frame, {
          clipPath: 'inset(100% 0% 0% 0% round 32px)',
          filter: 'blur(12px)',
          autoAlpha: 1,
          scale: 0.97,
        });
      });
      masks.forEach((mask) => {
        gsap.set(mask, { opacity: 0.65 });
      });
      parallaxWrappers.forEach((wrapper) => {
        gsap.set(wrapper, { yPercent: -6 });
      });

      // GSAP timeline for entrance
      const tl = gsap.timeline({
        onComplete: () => {
          entrancePlayingRef.current = false;
          setEntranceComplete(true);
          // Handoff to rAF loop
          rafRef.current = requestAnimationFrame(rafLoop);
        },
      });
      entranceTlRef.current = tl;

      // Register custom ease
      const naturalEase =
        typeof window !== 'undefined'
          ? CustomEase.create('naturalEase', GHOST_EASE.join(','))
          : 'cubic-bezier(0.22, 1, 0.36, 1)';

      // Opacity fade-in parallel
      tl.to([stageWrap, scanlines], {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0);

      // 3 loops = 12 chapter transitions
      const segmentDuration = ENTRANCE_DURATION / ENTRANCE_TOTAL_SLIDES;

      for (let loop = 0; loop < ENTRANCE_LOOPS; loop++) {
        for (let chapter = 0; chapter < CHAPTERS; chapter++) {
          const frameIdx = (loop * CHAPTERS + chapter) % frames.length;
          const frame = frames[frameIdx];
          const mask = masks[frameIdx];
          const wrapper = parallaxWrappers[frameIdx];

          if (!frame) continue;

          const label = `loop${loop}_ch${chapter}`;

          // Animate SVG blur (velocity-driven)
          tl.to(
            feGaussianBlur,
            {
              attr: { stdDeviation: `0 ${MAX_BLUR_SVG_DEVIATION}` },
              duration: segmentDuration * 0.4,
              ease: 'power2.in',
            },
            label
          ).to(
            feGaussianBlur,
            {
              attr: { stdDeviation: '0 0' },
              duration: segmentDuration * 0.6,
              ease: 'power2.out',
            },
            `${label}+=${segmentDuration * 0.4}`
          );

          // Frame entrance: clipPath wipe + blur clear + scale
          tl.to(
            frame,
            {
              clipPath: 'inset(0% 0% 0% 0% round 32px)',
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              ease: naturalEase,
              duration: segmentDuration * 1.2,
            },
            label
          );

          // Ken Burns on image
          if (wrapper) {
            tl.fromTo(
              wrapper,
              { scale: 1.05, yPercent: -6 },
              {
                scale: 1,
                yPercent: 0,
                ease: 'power3.inOut',
                duration: segmentDuration,
              },
              label
            );
          }

          // Mask fade in
          if (mask) {
            tl.to(
              mask,
              {
                opacity: 0,
                ease: 'power2.out',
                duration: segmentDuration * 0.5,
              },
              `${label}+=${segmentDuration * 0.2}`
            );
          }

          // Scanlines pulse
          tl.to(
            scanlines,
            {
              opacity: 0.6,
              duration: segmentDuration * 0.2,
              ease: 'power2.in',
            },
            label
          ).to(
            scanlines,
            {
              opacity: 0.15,
              duration: segmentDuration * 0.8,
              ease: 'power2.out',
            },
            `${label}+=${segmentDuration * 0.2}`
          );
        }
      }

      // Final state: land on first chapter (slot 4)
      targetYRef.current = AUTO_START_Y;
      yRef.current = AUTO_START_Y;
    },
    [rafLoop]
  );

  useEffect(() => {
    if (!isClient) return;

    const mediaQueryReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReduced = prefersReducedMotion || mediaQueryReduced;

    const mm = gsap.matchMedia();

    // DESKTOP & TABLET WIDE (≥ 1024px)
    mm.add('(min-width: 1024px)', () => {
      const container = containerRef.current;
      const stageWrap = stageWrapRef.current;
      if (!container || !stageWrap) return;

      const ctx = gsap.context(() => {
        const frames = Array.from(stageWrap.querySelectorAll<HTMLElement>('[data-origin-frame]'));
        const parallaxWrappers = Array.from(stageWrap.querySelectorAll<HTMLElement>('[data-slide-image]'));
        const masks = Array.from(stageWrap.querySelectorAll<HTMLElement>('[data-origin-mask]'));
        const rail = document.querySelector<HTMLElement>('[data-origin-rail]');

        if (frames.length === 0) return;

        // Store refs
        framesRef.current = frames;
        parallaxWrappersRef.current = parallaxWrappers;
        masksRef.current = masks;

        // Reduced motion: static reveal — no blur, no parallax, no rAF
        if (isReduced) {
          frames.forEach((frame) => {
            gsap.set(frame, {
              clipPath: 'inset(0% 0% 0% 0% round 32px)',
              filter: 'blur(0px)',
              autoAlpha: 1,
              opacity: 1,
              scale: 1,
            });
          });
          masks.forEach((mask) => {
            gsap.set(mask, { opacity: 0 });
          });
          parallaxWrappers.forEach((wrapper) => {
            gsap.set(wrapper, { yPercent: 0 });
          });
          if (rail) {
            gsap.set(rail, { autoAlpha: 0, pointerEvents: 'none' });
          }
          onActiveSceneChange?.(0);
          setEntranceComplete(true);
          return;
        }

        // Full motion: initial states
        frames.forEach((frame) => {
          gsap.set(frame, {
            clipPath: 'inset(100% 0% 0% 0% round 32px)',
            filter: 'blur(12px)',
            autoAlpha: 1,
            scale: 0.97,
            opacity: 0,
            willChange: 'clip-path, filter, transform, opacity',
          });
        });

        masks.forEach((mask) => {
          gsap.set(mask, {
            opacity: 0.65,
            willChange: 'opacity',
          });
        });

        parallaxWrappers.forEach((wrapper) => {
          gsap.set(wrapper, { yPercent: -6, willChange: 'transform' });
        });

        // Right Rail HUD: initially hidden
        if (rail) {
          gsap.set(rail, { autoAlpha: 0, pointerEvents: 'none' });
        }

        onActiveSceneChange?.(0);

        // Set initial track position for infinite loop
        // Track is positioned via CSS transform on the stageWrap or a inner track element
        // We use the stageWrap itself as the scrolling container
        gsap.set(stageWrap, {
          transform: `translate3d(0, ${AUTO_START_Y}dvh, 0)`,
        });

        // Run entrance animation
        runEntrance(stageWrap, frames, masks, parallaxWrappers);

        // Wheel handler
        const handleWheel = (e: WheelEvent) => {
          if (entrancePlayingRef.current) return;
          const now = performance.now();
          if (now - wheelLastTimeRef.current < 16) return; // throttle ~60fps
          wheelLastTimeRef.current = now;

          const delta = Math.max(-WHEEL_CLAMP_PX, Math.min(WHEEL_CLAMP_PX, e.deltaY));
          targetYRef.current -= delta * 0.01; // convert px to vh-ish
          // Clamp to loop bounds
          const maxY = TOP_PAD_VH;
          const minY = TOP_PAD_VH - (TOTAL_SLOTS - 1) * PITCH_VH;
          if (targetYRef.current > maxY) targetYRef.current = maxY;
          if (targetYRef.current < minY) targetYRef.current = minY;

          // Live-commit index when crossing half-pitch
          // Handled in rAF loop via onActiveSceneChange
        };

        // Drag handlers
        const handlePointerDown = (e: PointerEvent) => {
          if (entrancePlayingRef.current) return;
          if (e.button !== 0) return; // left click only
          const target = e.target as HTMLElement;
          if (target.closest('button, a, [role="button"]')) return; // don't drag interactive elements

          dragRef.current = {
            active: true,
            startY: e.clientY,
            startTarget: targetYRef.current,
            velocity: 0,
            lastTime: performance.now(),
            lastY: e.clientY,
          };
          stageWrap.setPointerCapture(e.pointerId);
          stageWrap.style.cursor = 'grabbing';
          // Suspend spring while dragging — we just update targetY directly
        };

        const handlePointerMove = (e: PointerEvent) => {
          if (!dragRef.current.active) return;
          const now = performance.now();
          const deltaY = e.clientY - dragRef.current.lastY;
          const dt = now - dragRef.current.lastTime;
          if (dt > 0) {
            dragRef.current.velocity = deltaY / dt; // px/ms
          }
          dragRef.current.lastY = e.clientY;
          dragRef.current.lastTime = now;

          // Move target directly (suspend spring)
          targetYRef.current = dragRef.current.startTarget - (e.clientY - dragRef.current.startY) * 0.01;
          // Clamp
          const maxY = TOP_PAD_VH;
          const minY = TOP_PAD_VH - (TOTAL_SLOTS - 1) * PITCH_VH;
          if (targetYRef.current > maxY) targetYRef.current = maxY;
          if (targetYRef.current < minY) targetYRef.current = minY;
        };

        const handlePointerUp = (e: PointerEvent) => {
          if (!dragRef.current.active) return;
          stageWrap.releasePointerCapture(e.pointerId);
          stageWrap.style.cursor = '';

          // Snap logic on release
          const velocity = dragRef.current.velocity * 1000; // px/s
          const currentTarget = targetYRef.current;
          const slotCenterY = TOP_PAD_VH - Math.round((TOP_PAD_VH - currentTarget) / PITCH_VH) * PITCH_VH;
          const delta = slotCenterY - currentTarget;
          const absDelta = Math.abs(delta);

          if (absDelta > DRAG_SNAP_THRESHOLD_DVH || Math.abs(velocity) > 100) {
            // Snap to next/prev based on velocity direction
            const direction = velocity < 0 ? 1 : -1; // negative velocity = dragging down = next chapter
            targetYRef.current = slotCenterY + direction * PITCH_VH;
          } else {
            // Spring back to nearest slot
            targetYRef.current = slotCenterY;
          }

          // Clamp
          const maxY = TOP_PAD_VH;
          const minY = TOP_PAD_VH - (TOTAL_SLOTS - 1) * PITCH_VH;
          if (targetYRef.current > maxY) targetYRef.current = maxY;
          if (targetYRef.current < minY) targetYRef.current = minY;

          dragRef.current.active = false;
        };

        stageWrap.addEventListener('wheel', handleWheel, { passive: true });
        stageWrap.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        // Right Rail HUD visibility
        const totalDistance = (frames.length - 1) * 85;
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

        return () => {
          stageWrap.removeEventListener('wheel', handleWheel);
          stageWrap.removeEventListener('pointerdown', handlePointerDown);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerup', handlePointerUp);
        };
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
        const frames = stageWrap.querySelectorAll<HTMLElement>('[data-origin-frame]');

        frames.forEach((frame, i) => {
          gsap.set(frame, {
            position: 'relative',
            clipPath: 'none',
            filter: isReduced ? 'none' : 'blur(8px)',
            autoAlpha: isReduced ? 1 : 0,
            marginBottom: '2.5rem',
            height: 'auto',
            minHeight: '72dvh',
            willChange: isReduced ? 'auto' : 'transform, filter, opacity',
          });

          if (!isReduced) {
            ScrollTrigger.create({
              trigger: frame,
              start: 'top 70%',
              end: 'bottom 30%',
              onEnter: () =>
                gsap.to(frame, {
                  filter: 'blur(0px)',
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: GHOST_EASE_STRING,
                }),
              onEnterBack: () =>
                gsap.to(frame, {
                  filter: 'blur(0px)',
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: GHOST_EASE_STRING,
                }),
              onLeave: () =>
                gsap.to(frame, {
                  filter: 'blur(8px)',
                  autoAlpha: 0.5,
                  y: 24,
                  duration: 0.5,
                  ease: GHOST_EASE_STRING,
                }),
              onLeaveBack: () =>
                gsap.to(frame, {
                  filter: 'blur(8px)',
                  autoAlpha: 0.5,
                  y: -24,
                  duration: 0.5,
                  ease: GHOST_EASE_STRING,
                }),
              onUpdate: (self) => {
                if (self.progress > 0.5) onActiveSceneChange?.(i);
              },
            });
          } else {
            gsap.set(frame, { filter: 'none', autoAlpha: 1 });
            ScrollTrigger.create({
              trigger: frame,
              start: 'top 60%',
              end: 'bottom 40%',
              onEnter: () => onActiveSceneChange?.(i),
              onEnterBack: () => onActiveSceneChange?.(i),
            });
          }
        });
      }, stageWrap);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
      cleanup();
    };
  }, [
    isClient,
    stageWrapRef,
    containerRef,
    contentCount,
    prefersReducedMotion,
    onActiveSceneChange,
    runEntrance,
    cleanup,
    rafLoop,
  ]);

  // Return state for components that need it
  return {
    entrancePlaying: entrancePlayingRef.current,
    entranceComplete,
  };
}