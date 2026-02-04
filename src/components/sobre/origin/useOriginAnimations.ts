'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginAnimationsProps {
  isClient: boolean;
  archRef: RefObject<HTMLDivElement | null>;
  archRightRef: RefObject<HTMLDivElement | null>;
  contentCount: number;
}

/**
 * Hook that manages scroll-based mask reveal animations for the Origin section
 * Implements pinned mask reveal effect where images dramatically emerge
 * Tech: GSAP ScrollTrigger + Lenis compatible
 */
export function useOriginAnimations({
  isClient,
  archRef,
  archRightRef,
  contentCount,
}: UseOriginAnimationsProps) {
  useEffect(() => {
    if (!isClient) return;

    const archEl = archRef.current;
    const archRightEl = archRightRef.current;

    if (!archEl || !archRightEl) return;

    const ctx = gsap.context(() => {
      // Get all content blocks and images
      const blocks = archEl.querySelectorAll('[data-origin-block]');
      const images = archRightEl.querySelectorAll('.origin-img');
      const maskOverlays = archRightEl.querySelectorAll('.origin-mask');

      if (blocks.length === 0 || images.length === 0) return;

      // Set initial states for mask reveal with blur
      images.forEach((img, i) => {
        gsap.set(img, {
          clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          opacity: i === 0 ? 1 : 0.85,
          filter: i === 0 ? 'blur(0px)' : 'blur(4px)',
        });
      });

      // Set initial states for mask overlays
      maskOverlays.forEach((mask, i) => {
        gsap.set(mask, {
          scaleY: i === 0 ? 0 : 1,
          transformOrigin: 'top center',
        });
      });

      // Create scroll triggers for each block with mask reveal
      blocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => revealImage(index, 'down'),
          onEnterBack: () => revealImage(index, 'up'),
        });
      });

      /**
       * Mask reveal animation
       * Images emerge from bottom (scroll down) or top (scroll up)
       */
      function revealImage(activeIndex: number, direction: 'up' | 'down') {
        const duration = 0.8;
        const ease = 'power3.inOut';

        images.forEach((img, i) => {
          if (i === activeIndex) {
            // Reveal active image with mask + blur animation
            gsap.to(img, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              filter: 'blur(0px)',
              duration,
              ease,
            });
          } else if (i < activeIndex) {
            // Images before active - fully revealed but behind
            gsap.to(img, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              filter: 'blur(0px)',
              duration: duration * 0.5,
              ease,
            });
          } else {
            // Images after active - hidden with mask + blur
            gsap.to(img, {
              clipPath:
                direction === 'down'
                  ? 'inset(100% 0% 0% 0%)'
                  : 'inset(0% 0% 100% 0%)',
              opacity: 0.85,
              filter: 'blur(4px)',
              duration,
              ease,
            });
          }
        });

        // Animate mask overlays for dramatic effect
        maskOverlays.forEach((mask, i) => {
          if (i === activeIndex) {
            gsap.to(mask, {
              scaleY: 0,
              duration,
              ease,
            });
          } else if (i > activeIndex) {
            gsap.to(mask, {
              scaleY: 1,
              duration: duration * 0.5,
              ease,
            });
          }
        });
      }

      // Initial fade-in animation for the gallery container
      gsap.from(archRightEl, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: archEl,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Subtle parallax on the gallery
      gsap.to(archRightEl, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: archEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, archEl);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.vars.trigger;
        if (triggerEl instanceof Element && triggerEl.closest('.arch')) {
          trigger.kill();
        }
      });
    };
  }, [isClient, archRef, archRightRef, contentCount]);
}
