'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import '@/styles/about-origin.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import { ABOUT_ORIGIN_SECTIONS as SECTIONS } from '@/config/about';

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
    // Initialize Lenis smooth scroll
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
      // Desktop: Pin + Mask Reveal

      // 0. Set Initial State (Invisible to prevent FOUC)
      gsap.set('.arch__right', { autoAlpha: 0, y: 100 });
      gsap.set('.arch__left .arch__info', { autoAlpha: 0, y: 50 });

      // 1. Entrance Sequence: Image First -> Then Text
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.arch',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      introTl
        .to('.arch__right', {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(
          '.arch__left .arch__info',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '>-0.2' // Starts 0.2s before image ends for fluid feel, but effectively "after" visual start
        );

      // 2. Main Pinning & Scrubbing Timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.arch',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.arch__right',
          scrub: 1,
        },
      });

      // Initial buffer to keep first image static while text scrolls a bit
      mainTimeline.to({}, { duration: 0.2 });

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
          // Add swapping animation
          sectionTimeline
            .to(
              'body',
              {
                backgroundColor: bgColors[index + 1],
                duration: 1,
                ease: 'power2.inOut',
              },
              0
            )
            .to(
              currentImage,
              {
                clipPath: 'inset(0px 0px 100%)',
                objectPosition: '0px 60%',
                duration: 1,
                ease: 'none',
              },
              0
            )
            .to(
              nextImage,
              {
                objectPosition: '0px 40%',
                duration: 1,
                ease: 'none',
              },
              0
            );

          mainTimeline.add(sectionTimeline);
          // Add a small pause between transitions
          mainTimeline.to({}, { duration: 0.1 });
        }
      });
    });

    mm.add('(max-width: 768px)', () => {
      const imgWrappers = gsap.utils.toArray<HTMLDivElement>('.img-wrapper');
      const infos = gsap.utils.toArray<HTMLDivElement>('.arch__info');

      // Ensure H1 is visible and positioned correctly on mobile context
      // (CSS order is handled via utility class, but we ensure visibility here if needed)

      // Reveal animations for each content block
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

      // Parallax and background transitions for images
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

        // Background color transition
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
      mm.revert();
      lenisRef.current?.destroy();
      window.removeEventListener('resize', handleMobileLayout);
    };
  }, [handleMobileLayout]);

  return (
    <section
      className="origem-criativa std-grid py-20 md:py-16 pb-24"
      ref={containerRef}
    >
      <div className="arch">
        <div className="arch__left" ref={leftRef}>
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className="arch__info"
              id={`${section.id}-arch`}
            >
              <div
                className={`content ${section.textAlign === 'right' ? 'text-right' : 'text-left'}`}
              >
                <h2 className="header">{section.title}</h2>
                <p className="desc whitespace-normal">{section.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="arch__right" ref={rightRef}>
          <h1
            className="section-title text-center text-[30px] md:text-[54px] font-outfit font-italic text-blueAccent mb-12 md:mb-0 relative z-10 md:absolute md:top-[-80px] md:w-full mix-blend-screen pointer-events-none"
            style={{ order: -1 }}
          >
            Origem
          </h1>
          {SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className="img-wrapper"
              data-index={SECTIONS.length - index}
            >
              <Image
                src={section.img}
                alt={section.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 540px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="spacer h-[10vh] w-full" />
    </section>
  );
};

export default AboutOrigin;
