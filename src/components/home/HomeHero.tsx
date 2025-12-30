'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import ManifestoSection from './ManifestoSection';
import ManifestoThumb from './ManifestoThumb';

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
  }, [reducedMotion]);

  // Scroll pin + animação da thumb expandindo até full-screen
  useEffect(() => {
    const hero = heroRef.current;
    const wrapper = videoWrapperRef.current;
    if (!hero || !wrapper) return;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
          },
        });

        const overlayTargets = [
          videoTextRef.current,
          toggleSoundRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Morphing animation conforme spec
        timeline.fromTo(
          wrapper,
          {
            width: '320px',
            height: '180px',
            bottom: '2rem',
            right: '2rem',
            borderRadius: '18px',
            x: 0,
            y: 0,
          },
          {
            width: '100vw',
            height: '100vh',
            bottom: 0,
            right: 0,
            borderRadius: '0px',
            x: 0,
            y: 0,
            ease: 'none',
          }
        );

        if (overlayTargets.length) {
          timeline.to(
            overlayTargets,
            { opacity: 0, y: 20, ease: 'power1.out' },
            0.1 // Começa logo depois do início da expansão
          );
        }
      });
    }, hero);

    return () => ctx.revert();
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
        <div className="absolute inset-0 z-20 pointer-events-none">
          <GhostStage />
        </div>

        {/* Editorial Copy */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <HeroCopy />
        </div>

        {/* Manifesto Thumb Wrapper - Desktop */}
        <div
          ref={videoWrapperRef}
          aria-label="Vídeo manifesto"
          className="video-wrapper fixed bottom-8 right-8 z-30 hidden md:flex flex-col items-end overflow-hidden rounded-[18px] shadow-[0_20px_80px_rgba(0,0,0,0.55)] cursor-pointer group/video"
          onClick={() => {
            if (typeof window === 'undefined') return;
            if (window.innerWidth >= 768 && heroRef.current) {
              const top = heroRef.current.offsetTop + (heroRef.current.clientHeight * 0.82);
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

          {/* Seta Hover */}
          <div className="pointer-events-none absolute right-4 top-4 z-40">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/20 backdrop-blur-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="manifesto-arrow -rotate-45 transition-transform duration-500 ease-in-out group-hover/video:rotate-0"
              >
                <path
                  d="M7 17L17 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7H17V15"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Label Manifesto */}
          <div
            ref={videoTextRef}
            className="video-text pointer-events-none absolute left-4 bottom-4 z-40 rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-500"
          >
            manifesto
          </div>

          {/* Botão de Som */}
          <button
            ref={toggleSoundRef}
            type="button"
            className="toggle-sound absolute left-4 top-4 z-40 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-500 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 pointer-events-auto"
            onClick={(event) => {
              event.stopPropagation();
              setMuted((prev) => !prev);
            }}
          >
            <span>{muted ? 'sound off' : 'sound on'}</span>
            <span
              className={`inline-block h-2 w-2 rounded-full transition-colors ${muted ? 'bg-white/40' : 'bg-[#0057FF]'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      {/* Mobile manifesto como seção independente */}
      <ManifestoSection />
    </>
  );
}
