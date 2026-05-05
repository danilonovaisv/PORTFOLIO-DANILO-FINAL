'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { MOTION_TOKENS } from '@/config/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginAnimationsProps {
  isClient: boolean;
  archRef: RefObject<HTMLDivElement | null>;
  archRightRef: RefObject<HTMLDivElement | null>;
  contentCount: number;
  prefersReducedMotion: boolean;
}

export function useOriginAnimations({
  isClient,
  archRef,
  archRightRef,
  contentCount,
  prefersReducedMotion,
}: UseOriginAnimationsProps) {
  useEffect(() => {
    if (!isClient) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const archEl = archRef.current;
      const archRightEl = archRightRef.current;

      if (!archEl || !archRightEl) return;

      const ctx = gsap.context(() => {
        const blocks = archEl.querySelectorAll('[data-origin-block]');
        const images = archRightEl.querySelectorAll('.origin-img');
        const maskOverlays = archRightEl.querySelectorAll('.origin-mask');
        const titles = archEl.querySelectorAll('[data-origin-title]');
        const copies = archEl.querySelectorAll('[data-origin-copy]');
        const triggers: ScrollTrigger[] = [];

        if (blocks.length === 0 || images.length === 0) return;

        const setInitialState = () => {
          gsap.set(images, {
            clipPath: 'inset(100% 0% 0% 0%)',
            opacity: 0.85,
            filter: 'blur(4px)',
          });
          gsap.set(images[0], {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            filter: 'blur(0px)',
          });
          gsap.set(maskOverlays, { top: 0, height: '100%' });
          gsap.set(maskOverlays[0], { height: '0%' });

          gsap.set(titles, {
            opacity: 0.45,
            y: MOTION_TOKENS.offset.subtle,
            filter: 'blur(2px)',
          });
          gsap.set(copies, {
            opacity: 0.4,
            y: MOTION_TOKENS.offset.subtle,
            filter: 'blur(2px)',
          });
          gsap.set(titles[0], { opacity: 1, y: 0, filter: 'blur(0px)' });
          gsap.set(copies[0], { opacity: 0.82, y: 0, filter: 'blur(0px)' });
        };
        setInitialState();

        blocks.forEach((block, index) => {
          const trigger = ScrollTrigger.create({
            trigger: block,
            start: 'top 82%',
            onEnter: () => revealImage(index, 'down'),
            onEnterBack: () => revealImage(index, 'up'),
            onLeaveBack: () => {
              if (index === 0) setInitialState();
            },
          });
          triggers.push(trigger);
        });

        const endTrigger = ScrollTrigger.create({
          trigger: archEl,
          start: 'bottom 80%',
          onEnter: () => hideLastImage(),
          onLeaveBack: () => setInitialState(),
        });
        triggers.push(endTrigger);

        function revealImage(activeIndex: number, direction: 'up' | 'down') {
          const duration = prefersReducedMotion
            ? MOTION_TOKENS.duration.fast
            : MOTION_TOKENS.duration.normal;
          const ease = prefersReducedMotion ? 'none' : GSAP_GHOST_EASE;

          images.forEach((img, i) => {
            const isActive = i === activeIndex;
            gsap.to(img, {
              clipPath: isActive
                ? 'inset(0% 0% 0% 0%)'
                : i < activeIndex
                  ? 'inset(0% 0% 0% 0%)'
                  : direction === 'down'
                    ? 'inset(100% 0% 0% 0%)'
                    : 'inset(0% 0% 100% 0%)',
              opacity: isActive ? 1 : 0.85,
              filter: isActive ? 'blur(0px)' : 'blur(4px)',
              duration,
              ease,
            });
          });

          maskOverlays.forEach((mask, i) => {
            gsap.to(mask, {
              height: i <= activeIndex ? '0%' : '100%',
              duration,
              ease,
            });
          });

          // Sequence: image settles first, then text block enters.
          titles.forEach((title, i) => {
            const isActive = i === activeIndex;
            gsap.to(title, {
              opacity: isActive ? 1 : 0.45,
              y: 0,
              filter: 'blur(0px)',
              duration: prefersReducedMotion
                ? MOTION_TOKENS.duration.fast
                : MOTION_TOKENS.duration.modal,
              delay: prefersReducedMotion
                ? 0
                : isActive
                  ? MOTION_TOKENS.delay.short
                  : 0,
              ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
            });
          });

          copies.forEach((copy, i) => {
            const isActive = i === activeIndex;
            gsap.to(copy, {
              opacity: isActive ? 0.82 : 0.4,
              y: 0,
              filter: 'blur(0px)',
              duration: prefersReducedMotion
                ? MOTION_TOKENS.duration.fast
                : MOTION_TOKENS.duration.modal,
              delay: prefersReducedMotion
                ? 0
                : isActive
                  ? MOTION_TOKENS.delay.normal
                  : 0,
              ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
            });
          });
        }

        function hideLastImage() {
          const lastImage = images[contentCount - 1];
          if (lastImage) {
            gsap.to(lastImage, {
              clipPath: 'inset(100% 0% 0% 0%)',
              opacity: 0.85,
              filter: 'blur(4px)',
              duration: MOTION_TOKENS.duration.normal,
              ease: GSAP_GHOST_EASE,
            });
          }
        }

        gsap.from(archRightEl, {
          opacity: 0,
          y: MOTION_TOKENS.offset.standard,
          duration: prefersReducedMotion
            ? MOTION_TOKENS.duration.fast
            : MOTION_TOKENS.duration.GHOST_REVEAL,
          delay: prefersReducedMotion ? 0 : MOTION_TOKENS.delay.short,
          ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,

          scrollTrigger: {
            trigger: archEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            onLeaveBack: setInitialState,
          },
        });

        if (!prefersReducedMotion) {
          const parallaxTween = gsap.to(archRightEl, {
            y: -MOTION_TOKENS.offset.standard,
            ease: 'none',

            scrollTrigger: {
              trigger: archEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
          if (parallaxTween.scrollTrigger) {
            triggers.push(parallaxTween.scrollTrigger);
          }
        }

        return () => {
          triggers.forEach((trigger) => trigger.kill());
        };
      }, archEl);

      return () => {
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, [isClient, archRef, archRightRef, contentCount, prefersReducedMotion]);
}
