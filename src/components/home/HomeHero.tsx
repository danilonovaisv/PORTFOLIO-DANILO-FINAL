'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';
import ManifestoSection from './ManifestoSection';

export default function HomeHero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTextRef = useRef<HTMLDivElement | null>(null);
  const toggleSoundRef = useRef<HTMLButtonElement | null>(null);
  const [muted, setMuted] = useState(true);

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
  }, []);

  // Scroll pin + animação da thumb até virar miniatura
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
            end: '+=150%',
            pin: true,
            scrub: true,
          },
        });

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
            bottom: 30,
            right: 30,
            width: '11.5635%',
            height: '15.6782%',
            borderRadius: 5,
            scale: 1,
            ease: 'none',
          }
        );
      });
    }, hero);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

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
        className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#0b0d3a_0%,#06071f_55%,#06071f_100%)]"
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
          className="video-wrapper z-30 relative mx-auto mt-10 flex aspect-[9/14] w-[220px] max-w-[360px] flex-col items-end overflow-hidden rounded-[18px] shadow-[0_20px_80px_rgba(0,0,0,0.55)] transition-transform duration-700 md:absolute md:bottom-[5vw] md:right-[5vw] md:w-[min(520px,34vw)] md:aspect-video"
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
            }
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
                className="-rotate-45"
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

      {/* Mobile manifesto como seção independente */}
      <ManifestoSection />
    </>
  );
}
