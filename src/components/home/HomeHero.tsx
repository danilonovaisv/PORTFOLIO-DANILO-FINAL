'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import ManifestoSection from './ManifestoSection';
import HeroVideoThumb, { ManifestoThumb } from './HeroVideoThumb';

export default function HomeHero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTextRef = useRef<HTMLDivElement | null>(null);
  const toggleSoundRef = useRef<HTMLButtonElement | null>(null);
  const [muted, setMuted] = useState(true);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Entrada da thumb (fade + slide) com stagger para texto/botão de som
  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    if (!wrapper) return;

    const videoText = videoTextRef.current;
    const toggleSound = toggleSoundRef.current;

    if (reducedMotion) {
      wrapper.classList.add('is-visible');
      videoText?.classList.add('show');
      toggleSound?.classList.add('show');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wrapper.classList.add('is-visible');
            setTimeout(() => videoText?.classList.add('show'), 150);
            setTimeout(() => toggleSound?.classList.add('show'), 275);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [reducedMotion]);

  // Scroll pin + animação da thumb expandindo até full-screen
  useEffect(() => {
    const hero = heroRef.current;
    const wrapper = videoWrapperRef.current;
    if (!hero || !wrapper) return;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: true,
          },
        });

        const overlayTargets = [
          videoTextRef.current,
          toggleSoundRef.current,
        ].filter(Boolean) as HTMLElement[];

        timeline.fromTo(
          wrapper,
          {
            bottom: '5vw',
            right: '5vw',
            width: 'min(520px, 34vw)',
            height: 'auto',
            borderRadius: 18,
            scale: 1,
            transformOrigin: '100% 100%',
          },
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            scale: 1,
            transformOrigin: '50% 50%',
            ease: 'none',
          }
        );

        if (overlayTargets.length) {
          timeline.to(
            overlayTargets,
            { autoAlpha: 0, yPercent: 20, ease: 'none' },
            0
          );
        }
      });
    }, hero);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  // Toggle de som
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = muted;
  }, [muted]);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen md:min-h-[200vh] overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#0b0d3a_0%,#06071f_55%,#06071f_100%)]"
        aria-label="Hero"
      >
        <HeroPreloader />

        {/* WebGL Layer */}
        <div className="absolute inset-0 z-20">
          <GhostStage />
        </div>

        {/* Editorial Copy (SEM animação / SEM binding de scroll) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <HeroCopy />
        </div>

        {/* Manifesto Thumb - Desktop */}
        <div
          ref={videoWrapperRef}
          aria-label="Vídeo manifesto"
          className="video-wrapper group/video z-30 relative mx-auto mt-10 flex aspect-[9/14] w-[220px] max-w-[360px] flex-col items-end overflow-hidden rounded-[18px] shadow-[0_20px_80px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-in-out md:absolute md:bottom-[5vw] md:right-[5vw] md:w-[min(520px,34vw)] md:aspect-video md:hover:scale-[1.05]"
          onClick={() => {
            if (typeof window === 'undefined') return;
            if (window.innerWidth >= 768 && heroRef.current) {
              const top =
                (heroRef.current?.offsetTop ?? 0) +
                (heroRef.current?.clientHeight ?? 0) -
                window.innerHeight;
              window.scrollTo({
                top,
                behavior: reducedMotion ? 'auto' : 'smooth',
              });
              return;
            }

            setMuted((prev) => !prev);
          }}
        >
          <ManifestoThumb ref={videoRef} muted={muted} />

          <div className="pointer-events-none absolute right-3 top-3">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="manifesto-arrow -rotate-45 transition-transform duration-500 ease-in-out group-hover/video:rotate-0"
              >
                <path
                  d="M7 17L17 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7H17V15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div
            ref={videoTextRef}
            className="video-text pointer-events-none absolute left-4 bottom-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-white"
          >
            manifesto
          </div>

          <button
            ref={toggleSoundRef}
            type="button"
            className="toggle-sound pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            onClick={(event) => {
              event.stopPropagation();
              setMuted((prev) => !prev);
            }}
          >
            <span>{muted ? 'sound off' : 'sound on'}</span>
            <span
              className="inline-block h-2 w-2 rounded-full"
              aria-hidden="true"
              style={{ backgroundColor: muted ? '#ef4444' : '#22c55e' }}
            />
          </button>
        </div>
      </section>

      {/* Thumb flutuante sincronizada com o scroll da Hero */}
      <HeroVideoThumb scrollProgress={scrollYProgress} />

      {/* Mobile manifesto como seção independente */}
      <ManifestoSection />
    </>
  );
}
