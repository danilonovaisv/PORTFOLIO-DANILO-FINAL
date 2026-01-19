// src/components/HeroHeader.tsx
'use client';
import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { GHOST_EASE } from '@/config/motion';

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useMemo(
    () =>
      (typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ||
      false,
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--gx', `${x}px`);
      el.style.setProperty('--gy', `${y}px`);
    };

    const onLeave = () => {
      // Fallback pro centro do hero
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--gx', `${rect.width * 0.5}px`);
      el.style.setProperty('--gy', `${rect.height * 0.4}px`);
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    onLeave();

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6"
    >
      <span className="text-[12px] uppercase tracking-widest opacity-70">
        [BRAND AWARENESS]
      </span>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: GHOST_EASE, delay: 0.15 }}
        className="hero-title hero-reveal mt-2"
      >
        <span className="hero-title--base">
          Design, não é<br />
          só estética.
        </span>
        <span className="hero-title--lit">
          Design, não é<br />
          só estética.
        </span>
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={reduced ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: GHOST_EASE, delay: 0.35 }}
        className="mt-3 text-xl text-neutral-300 md:text-2xl"
      >
        [É intenção, é estratégia, é experiência.]
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? {} : { opacity: 1 }}
        transition={{ duration: 0.5, ease: GHOST_EASE, delay: 0.6 }}
        className="mt-8"
      >
        <a
          href="/sobre"
          className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/10"
        >
          Saiba mais
        </a>
      </motion.div>
    </div>
  );
}
