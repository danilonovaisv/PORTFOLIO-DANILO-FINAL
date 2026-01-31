'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface AnimationProps {
  isClient: boolean;
  archRef: React.RefObject<HTMLDivElement | null>;
  archRightRef: React.RefObject<HTMLDivElement | null>;
  contentCount: number;
}

export function useOriginAnimations({
  isClient,
  archRef,
  archRightRef,
  contentCount,
}: AnimationProps) {
  useEffect(() => {
    if (!isClient) return;

    let rafId = 0;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    const raf = (time: DOMHighResTimeStamp) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!archRef.current || !archRightRef.current) return;

      const wrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');
      const images = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
      const infoBlocks = gsap.utils.toArray<HTMLElement>('.arch__info');
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: archRightRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(images, {
        clipPath: 'inset(0% 0% 0% 0%)',
        objectPosition: '0px 0%',
        scale: 1.15,
        filter: 'blur(12px)',
        opacity: 0,
        yPercent: 0,
      });

      wrappers.forEach((el, idx) => {
        el.style.zIndex = (contentCount - idx).toString();
      });

      gsap.to(images[0], {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      for (let i = 0; i < contentCount; i++) {
        const currentWrapper = wrappers[i];
        const currentImg = images[i];
        const nextImage = images[i + 1];

        if (i < contentCount - 1) {
          const startPosition = i * 1.5;

          mainTimeline.to(
            'body',
            {
              backgroundColor: bgColors[i + 1] || bgColors[bgColors.length - 1],
              duration: 1.5,
              ease: 'none',
            },
            startPosition
          );

          mainTimeline.to(
            currentWrapper,
            {
              clipPath: 'inset(0px 0px 100% 0px)',
              duration: 1.5,
              ease: 'none',
            },
            startPosition
          );

          mainTimeline.to(
            currentImg,
            {
              objectPosition: '0px 60%',
              yPercent: 15,
              duration: 1.5,
              ease: 'none',
            },
            startPosition
          );

          mainTimeline.to(
            nextImage,
            {
              objectPosition: '0px 0%',
              yPercent: -15,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 1.5,
              ease: 'none',
            },
            startPosition
          );
        }
      }

      infoBlocks.forEach((block) => {
        const h2 = block.querySelector('h2') as HTMLElement;
        const p = block.querySelector('p') as HTMLElement;

        if (h2) {
          gsap.fromTo(
            h2,
            { y: 40, opacity: 0, filter: 'blur(12px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (p) {
          gsap.fromTo(
            p,
            { y: 30, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              delay: 0.1,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    mm.add('(max-width: 1023px)', () => {
      const mobileImages = gsap.utils.toArray<HTMLElement>(
        '.mobile-img-container'
      );
      const mobileTexts = gsap.utils.toArray<HTMLElement>(
        '.mobile-text-container'
      );
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

      mobileImages.forEach((container, index) => {
        const img = container.querySelector('img') as HTMLImageElement;
        if (!img) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
          .fromTo(
            img,
            { y: -40, scale: 1.1 },
            { y: 40, scale: 1, ease: 'none' }
          )
          .to(
            'body',
            {
              backgroundColor: bgColors[index] || bgColors[bgColors.length - 1],
              duration: 0.5,
              ease: 'power2.inOut',
            },
            0
          );
      });

      mobileTexts.forEach((text) => {
        gsap.fromTo(
          text,
          { y: 80, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    const refreshST = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshST);
    setTimeout(refreshST, 500);

    return () => {
      window.removeEventListener('load', refreshST);
      if (rafId) cancelAnimationFrame(rafId);
      mm.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient, archRef, archRightRef, contentCount]);
}
