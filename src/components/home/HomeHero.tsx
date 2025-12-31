'use client';

// ============================================================================
// src/components/home/HomeHero.tsx
// Orquestrador da Hero — layers e morph do ManifestoThumb com scroll
//
// ANIMATION BEHAVIOR (inspired by loandbehold.studio):
// - Thumb video starts small (30% scale) in bottom-right corner
// - As user scrolls, video scales up (0.3 → 1) and moves to center
// - Border radius transitions from rounded (16px) to sharp (0px)
// - Hero text fades out in first 60% of scroll
// - Video stays pinned at fullscreen for ~2 seconds worth of scroll
// - Easing: smooth, organic curves with no jarring transitions
// - All transforms are GPU-accelerated (transform, opacity only)
// ============================================================================

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroPreloader } from './HeroPreloader';
import { HeroCopy } from './HeroCopy';
import { ManifestoThumb } from './ManifestoThumb';
import { GhostStage } from './GhostStage';
import styles from './HomeHero.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// ANIMATION CONSTANTS
// These values control the scroll-based animation behavior
// Adjust these to fine-tune the animation feel
// ============================================================================
const ANIMATION_CONFIG = {
  // Video morph settings
  initialScale: 0.28, // Starting scale (thumbnail size) - smaller = more dramatic expansion
  finalScale: 1, // Final scale (fullscreen)
  initialBorderRadius: 20, // Starting corner radius in px
  finalBorderRadius: 0, // Final corner radius

  // Positioning (percentage of viewport)
  initialX: 42, // Start position X offset (% from left)
  initialY: -38, // Start position Y offset (% from bottom, negative = up)

  // Timing (as percentage of scroll progress)
  textFadeEnd: 0.5, // Text fully faded at 50% scroll
  morphStart: 0.1, // Video starts morphing at 10% scroll
  morphEnd: 0.85, // Video reaches fullscreen at 85% scroll
  holdDuration: 0.15, // Extra scroll after fullscreen (15% of section)

  // Easing curves (GSAP format)
  morphEase: 'power2.out', // Smooth deceleration for organic feel
  textFadeEase: 'power1.out', // Gentle text fade

  // Shadow settings
  initialShadow:
    '0 25px 80px rgba(0, 0, 0, 0.9), 0 10px 30px rgba(0, 0, 0, 0.6)',
  finalShadow: '0 0 0 rgba(0, 0, 0, 0)',
} as const;

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const ghostLayerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Skip to fullscreen on click (desktop behavior)
  const handleSkipToFullscreen = useCallback(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const sectionHeight = sectionRef.current.offsetHeight;
    const targetScroll =
      sectionRef.current.offsetTop + sectionHeight * ANIMATION_CONFIG.morphEnd;

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: true },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  }, [prefersReducedMotion]);

  // Main GSAP animation setup
  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;

    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const heroCopy = heroCopyRef.current;
    const ghostLayer = ghostLayerRef.current;

    if (!section || !videoWrapper) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(videoWrapper, {
        scale: ANIMATION_CONFIG.initialScale,
        xPercent: ANIMATION_CONFIG.initialX,
        yPercent: ANIMATION_CONFIG.initialY,
        borderRadius: ANIMATION_CONFIG.initialBorderRadius,
        boxShadow: ANIMATION_CONFIG.initialShadow,
        transformOrigin: 'center center',
      });

      if (heroCopy) {
        gsap.set(heroCopy, { opacity: 1 });
      }

      // Create main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8, // Smoothing factor - higher = smoother but more lag
          pin: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (_self) => {
            // Optional: Add custom logic based on scroll progress
            // console.log('Scroll progress:', _self.progress);
          },
        },
      });

      // Store ScrollTrigger reference for cleanup
      if (tl.scrollTrigger) {
        scrollTriggerRef.current = tl.scrollTrigger;
      }

      // ============================================================================
      // ANIMATION SEQUENCE
      // ============================================================================

      // 1. Text fade out (0% → textFadeEnd)
      if (heroCopy) {
        tl.to(
          heroCopy,
          {
            opacity: 0,
            duration: ANIMATION_CONFIG.textFadeEnd,
            ease: ANIMATION_CONFIG.textFadeEase,
          },
          0
        );
      }

      // 2. Ghost layer fade (parallel with text, slightly delayed)
      if (ghostLayer) {
        tl.to(
          ghostLayer,
          {
            opacity: 0.3,
            duration: ANIMATION_CONFIG.textFadeEnd * 0.8,
            ease: 'power1.out',
          },
          0.05
        );
      }

      // 3. Video morph animation (morphStart → morphEnd)
      // Scale up
      tl.to(
        videoWrapper,
        {
          scale: ANIMATION_CONFIG.finalScale,
          duration: ANIMATION_CONFIG.morphEnd - ANIMATION_CONFIG.morphStart,
          ease: ANIMATION_CONFIG.morphEase,
        },
        ANIMATION_CONFIG.morphStart
      );

      // Move to center
      tl.to(
        videoWrapper,
        {
          xPercent: 0,
          yPercent: 0,
          duration: ANIMATION_CONFIG.morphEnd - ANIMATION_CONFIG.morphStart,
          ease: ANIMATION_CONFIG.morphEase,
        },
        ANIMATION_CONFIG.morphStart
      );

      // Border radius transition
      tl.to(
        videoWrapper,
        {
          borderRadius: ANIMATION_CONFIG.finalBorderRadius,
          duration:
            (ANIMATION_CONFIG.morphEnd - ANIMATION_CONFIG.morphStart) * 0.7,
          ease: 'power1.out',
        },
        ANIMATION_CONFIG.morphStart
      );

      // Shadow fade
      tl.to(
        videoWrapper,
        {
          boxShadow: ANIMATION_CONFIG.finalShadow,
          duration:
            (ANIMATION_CONFIG.morphEnd - ANIMATION_CONFIG.morphStart) * 0.6,
          ease: 'power1.out',
        },
        ANIMATION_CONFIG.morphStart + 0.1
      );

      // 4. Hold at fullscreen (morphEnd → 100%)
      // The video stays at fullscreen state while user continues scrolling
      // This creates the "dwell" effect where users can appreciate the fullscreen video
    }, section);

    // Cleanup
    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isClient, prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#06071f] overflow-hidden"
      aria-label="Hero section with animated video manifesto"
    >
      {/* Preloader acima de tudo */}
      <HeroPreloader />

      {/* Sticky container for pinned elements */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* WebGL Ghost Atmosphere */}
        <div
          ref={ghostLayerRef}
          className="absolute inset-0 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <GhostStage reducedMotion={prefersReducedMotion ?? false} />
        </div>

        {/* Texto Editorial */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          <HeroCopy />
        </div>

        {/* Vídeo Manifesto — Desktop with GSAP-controlled animation */}
        <div
          ref={videoWrapperRef}
          className={`
            absolute inset-0 z-30 
            flex items-center justify-center
            overflow-hidden
            will-change-transform
            ${prefersReducedMotion ? styles.reducedMotionVideo : 'hidden md:flex'}
          `}
        >
          <div className="w-full h-full" onClick={handleSkipToFullscreen}>
            <ManifestoThumb onClickDesktop={handleSkipToFullscreen} />
          </div>
        </div>

        {/* Mobile: Video as static element (no scroll animation) */}
        {prefersReducedMotion && (
          <div className="absolute bottom-10 right-6 z-30 w-[60vw] aspect-video overflow-hidden rounded-2xl shadow-lg block md:hidden">
            <ManifestoThumb />
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeHero;
