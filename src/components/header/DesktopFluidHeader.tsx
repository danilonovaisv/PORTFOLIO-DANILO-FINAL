// src/components/header/DesktopFluidHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FluidGlass from './webgl/FluidGlass';

type NavItem = { label: string; href: string };

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

function BrandMark(props: React.SVGProps<SVGSVGElement>) {
  // Substitua este SVG pelo SVG real do seu logotipo "Danilo"
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      {/* Este é um exemplo genérico. Substitua pela sua arte. */}
      <path
        d="M9 11.2c0-1.2 1-2.2 2.2-2.2h12.2c6.4 0 11.6 5.2 11.6 11.6S29.8 32.2 23.4 32.2H11.2C10 32.2 9 31.2 9 30V11.2Z"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="M14 14l12 12M26 14 14 26"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.55"
      />
    </svg>
  );
}

export default function DesktopFluidHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (wrapRef.current) setEventSource(wrapRef.current);
  }, []);

  const nav = useMemo<NavItem[]>(
    () => [
      { label: 'home', href: '/' },
      { label: 'sobre', href: '/sobre' },
      { label: 'portfolio showcase', href: '/portfolio' },
      { label: 'contato', href: '/#contato' },
    ],
    []
  );

  return (
    <motion.header
      className="fixed left-1/2 top-5 z-70 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2"
      initial={reduceMotion ? false : { opacity: 0, y: -14 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={wrapRef}
        className="relative h-16 overflow-hidden rounded-[28px]"
      >
        {/* WEBGL GLASS - Agora apenas 'bar' */}
        <FluidGlass
          mode="bar"
          eventSource={eventSource}
          followPointer={!reduceMotion}
          className="pointer-events-none absolute inset-0 h-full w-full"
          barProps={{
            ior: 1.14,
            thickness: 9,
            chromaticAberration: 0.08,
            anisotropy: 0.06,
            distortion: 0.28,
            distortionScale: 0.28,
            temporalDistortion: 0.12,
            attenuationColor: '#ffffff',
            attenuationDistance: 0.35,
            samples: 8,
            resolution: 512,
            ampX: 0.12,
            ampY: 0.08,
            rotX: 0.06,
            rotY: 0.08,
            barWidth: 0.99,
            barHeight: 0.9,
          }}
        />

        {/* “casing”/glow (igual referência) */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-sky-400/15 shadow-[0_16px_80px_rgba(56,189,248,0.18)]" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-sky-400/80 to-transparent opacity-70" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-400/40 to-transparent opacity-60" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full items-center justify-between px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-white/90"
            aria-label="Ir para home"
          >
            <BrandMark className="h-8 w-8 text-white/90 transition-opacity group-hover:opacity-100" />
            <span className="text-[22px] font-semibold tracking-tight">
              Danilo
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-2"
          >
            {nav.map((item) => {
              const active = item.href.startsWith('/#')
                ? pathname === '/'
                : isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'relative rounded-full px-3 py-2 text-[15px] font-medium tracking-tight transition-colors',
                    active ? 'text-sky-300' : 'text-white/80 hover:text-white',
                  ].join(' ')}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* underline ativo */}
                  {active ? (
                    <span className="pointer-events-none absolute inset-x-2 bottom-1 h-px bg-sky-400/90" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
