'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginAnimationsProps {
  isClient: boolean;
  archRef: RefObject<HTMLDivElement | null>;
  archRightRef: RefObject<HTMLDivElement | null>;
  contentCount: number;
}

export function useOriginAnimations({
  isClient,
  archRef,
  archRightRef,
  contentCount,
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
          gsap.set(maskOverlays, { scaleY: 1, transformOrigin: 'top center' });
          gsap.set(maskOverlays[0], { scaleY: 0 });
        };
        setInitialState();

        blocks.forEach((block, index) => {
          const trigger = ScrollTrigger.create({
            trigger: block,
            start: 'top 75%', // Reveal image earlier (before text fully enters center)
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
          const duration = 0.8;
          const ease = 'power3.inOut';

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
              scaleY: i <= activeIndex ? 0 : 1,
              duration,
              ease,
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
              duration: 0.8,
              ease: 'power3.inOut',
            });
          }
        }

        gsap.from(archRightEl, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: archEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            onLeaveBack: setInitialState,
          },
        });

        const parallaxTween = gsap.to(archRightEl, {
          y: -40,
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

        return () => {
          triggers.forEach((trigger) => trigger.kill());
        };
      }, archEl);

      return () => {
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, [isClient, archRef, archRightRef, contentCount]);
}
