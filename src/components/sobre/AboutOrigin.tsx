'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import '@/styles/about-origin.css';

import { ABOUT_ORIGIN_SECTIONS as SECTIONS } from '@/config/about';
import { useSiteAssetUrl } from '@/contexts/site-assets';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutOrigin = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const handleMobileLayout = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const leftItems = leftRef.current?.querySelectorAll('.arch__info');
    const rightItems = rightRef.current?.querySelectorAll('.img-wrapper');

    if (isMobile) {
      leftItems?.forEach((item, i) => {
        (item as HTMLElement).style.order = `${i * 2}`;
      });
      rightItems?.forEach((item, i) => {
        (item as HTMLElement).style.order = `${i * 2 + 1}`;
      });
    } else {
      leftItems?.forEach((item) => {
        (item as HTMLElement).style.order = '';
      });
      rightItems?.forEach((item) => {
        (item as HTMLElement).style.order = '';
      });
    }
  }, []);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const mm = gsap.matchMedia();
    const bgColors = ['#040013', '#0a001a', '#040013', '#0a001a'];

    mm.add('(min-width: 769px)', () => {
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.arch',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.arch__right',
          scrub: 1,
        },
      });

      const imgWrappers = gsap.utils.toArray<HTMLDivElement>('.img-wrapper');
      imgWrappers.forEach((el, i) => {
        gsap.set(el, { zIndex: SECTIONS.length - i });
      });

      const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
      gsap.set(imgs, {
        clipPath: 'inset(0)',
        objectPosition: '0px 0%',
      });

      imgs.forEach((currentImage, index) => {
        const nextImage = imgs[index + 1];
        if (nextImage) {
          const sectionTimeline = gsap.timeline();
          sectionTimeline
            .to(
              'body',
              {
                backgroundColor: bgColors[index + 1],
                duration: 1.5,
                ease: 'power2.inOut',
              },
              0
            )
            .to(
              currentImage,
              {
                clipPath: 'inset(0px 0px 100%)',
                objectPosition: '0px 60%',
                duration: 1.5,
                ease: 'none',
              },
              0
            )
            .to(
              nextImage,
              {
                objectPosition: '0px 40%',
                duration: 1.5,
                ease: 'none',
              },
              0
            );
          mainTimeline.add(sectionTimeline);
        }
      });

      const firstContent = leftRef.current?.querySelector<HTMLDivElement>(
        '.arch__info:first-child .content'
      );

      if (firstContent) {
        const firstImage = rightRef.current?.querySelector<HTMLDivElement>(
          `.img-wrapper[data-index="${SECTIONS.length}"]`
        );

        if (firstImage) {
          gsap.set(firstContent, { y: 120, opacity: 0 });
          gsap.to(firstContent, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: firstImage,
              start: 'top bottom',
              end: 'top 45%',
              toggleActions: 'play reverse play reverse',
            },
          });
        }
      }
    });

    mm.add('(max-width: 768px)', () => {
      const imgWrappers = gsap.utils.toArray<HTMLDivElement>('.img-wrapper');
      const infos = gsap.utils.toArray<HTMLDivElement>('.arch__info');

      infos.forEach((info) => {
        gsap.fromTo(
          info,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: info,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      imgWrappers.forEach((wrapper, index) => {
        const img = wrapper.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { objectPosition: '0px 80%' },
            {
              objectPosition: '0px 20%',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top center',
          onEnter: () =>
            gsap.to('body', { backgroundColor: bgColors[index], duration: 1 }),
          onEnterBack: () =>
            gsap.to('body', { backgroundColor: bgColors[index], duration: 1 }),
        });
      });
    });

    handleMobileLayout();
    window.addEventListener('resize', handleMobileLayout);

    return () => {
      lenisRef.current?.destroy();
      window.removeEventListener('resize', handleMobileLayout);
      mm.revert();
    };
  }, [handleMobileLayout]);

  const originImages = SECTIONS.map((section, index) =>
    useSiteAssetUrl(`about.origin_image.${index + 1}`, section.img)
  );

  return (
    <section
      ref={containerRef}
      className="arch relative min-h-screen bg-background overflow-hidden"
      aria-label="About origin timeline"
    >
      <div className="arch__content std-grid">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          <div ref={leftRef} className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.id} className="arch__info">
                <div className="content space-y-4">
                  <h3 className="type-h3 uppercase tracking-[0.3em] text-white/60">
                    {section.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/80">
                    {section.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        <div ref={rightRef} className="space-y-6 arch__right">
          {SECTIONS.map((section, index) => {
            const dynamicImg = originImages[index];
            return (
              <div
                className="img-wrapper rounded-3xl overflow-hidden bg-white/5"
                key={`img-${section.id}`}
                data-index={SECTIONS.length - index}
              >
                <img
                  src={dynamicImg}
                  alt={section.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOrigin;
