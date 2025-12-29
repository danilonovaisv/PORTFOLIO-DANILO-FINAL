'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BRAND } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import FluidGlassHeader from './webgl/FluidGlass';

type NavItem = {
  label: string;
  href: string;
  ariaLabel: string;
  description?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero', ariaLabel: 'Ir para a Home' },
  {
    label: 'Sobre',
    href: '/sobre',
    ariaLabel: 'Ir para a página Sobre',
    description: 'portifoliodanilo.com/sobre',
  },
  {
    label: 'Portfólio',
    href: '/portfolio',
    ariaLabel: 'Ir para o portfólio',
    description: 'portifoliodanilo.com/portfolio',
  },
  { label: 'Contato', href: '#contact', ariaLabel: 'Ir para contato' },
];

const cursorUrl =
  "url('data:image/svg+xml,%3Csvg width=\"44\" height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"22\" cy=\"22\" r=\"14\" fill=\"%23ffffff\" fill-opacity=\"0.12\"/%3E%3Ccircle cx=\"22\" cy=\"22\" r=\"6\" fill=\"%236da8ff\" fill-opacity=\"0.62\"/%3E%3C/svg%3E') 22 22, pointer";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const hasContext =
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    return Boolean(hasContext);
  } catch {
    return false;
  }
};

const DesktopFluidHeader: React.FC = () => {
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [parallax, setParallax] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mq.matches);
    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const value = clamp01(window.scrollY / 1600);
      setParallax(value);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const parallaxPx = (-parallax * 12).toFixed(2);
    document.documentElement.style.setProperty(
      '--fluid-header-parallax',
      `${parallaxPx}px`
    );
    document.documentElement.style.setProperty(
      '--fluid-header-cursor',
      cursorUrl
    );
  }, [parallax]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp01((event.clientX - rect.left) / rect.width);
    const y = clamp01((event.clientY - rect.top) / rect.height);
    setPointer({ x, y });

    navItemRefs.current.forEach((link) => {
      if (!link) return;
      const box = link.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = (event.clientX - cx) / box.width;
      const dy = (event.clientY - cy) / box.height;
      const influence = Math.max(0, 1 - Math.hypot(dx, dy));
      const strength = influence * 12;
      link.style.transform = `translate3d(${dx * strength}px, ${
        dy * strength
      }px, 0) scale(${1 + influence * 0.02})`;
    });
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion) return;
    setPointer({ x: 0.5, y: 0.5 });
    navItemRefs.current.forEach((link) => {
      if (link) link.style.transform = '';
    });
  };

  const navColorClass = useMemo(
    () =>
      isDarkMode
        ? 'text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]'
        : 'text-neutral-900 drop-shadow-[0_6px_18px_rgba(0,0,0,0.08)]',
    [isDarkMode]
  );

  const logo = isDarkMode ? BRAND.logos.dark : BRAND.logos.light;

  return (
    <header className="fixed left-0 top-0 z-80 hidden h-23 w-screen lg:block">
      <div
        ref={containerRef}
        className="fluid-header-shell relative mx-auto flex h-full w-full max-w-300 items-center px-6 py-3"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="absolute inset-0 rounded-full border border-white/10 bg-white/4 shadow-[0_24px_72px_rgba(0,0,0,0.28)] backdrop-blur-2xl" />

        {supportsWebGL ? (
          <FluidGlassHeader
            mode="bar"
            pointer={prefersReducedMotion ? { x: 0.5, y: 0.5 } : pointer}
            parallax={parallax}
            reducedMotion={prefersReducedMotion}
            className="pointer-events-none absolute inset-0 -z-1 overflow-hidden rounded-full"
            barProps={{
              navItems: NAV_ITEMS,
              materialProps: {
                scale: [1.85, 0.26, 0.22],
                ior: 1.15,
                thickness: 2,
                chromaticAberration: 0.05,
                anisotropy: 0.01,
              },
            }}
          />
        ) : (
          <div className="absolute inset-0 -z-1 rounded-full bg-linear-to-r from-white/60 via-white/35 to-white/18 backdrop-blur-xl" />
        )}

        <div className="relative z-10 flex w-full items-center justify-between">
          <Link
            href="/"
            aria-label="Ir para a home"
            className="group flex items-center gap-3"
          >
            <Image
              src={logo}
              alt={`Logo ${BRAND.name}`}
              width={36}
              height={36}
              className="h-9 w-9 drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized
            />
            <span
              className={`text-[15px] font-semibold uppercase tracking-[0.08em] text-white/90 drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:text-white ${navColorClass}`}
            >
              Logo Dark
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="relative flex items-center gap-6 text-sm font-medium uppercase tracking-[0.08em]"
          >
            {NAV_ITEMS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                ref={(node) => {
                  navItemRefs.current[idx] = node;
                }}
                className={`group relative px-2 py-1 text-[14px] transition-all duration-300 hover:scale-[1.02] hover:text-white ${navColorClass}`}
              >
                <span className="relative z-10 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  {link.label}
                </span>
                <span className="absolute inset-x-1 -bottom-2 h-px origin-center scale-x-0 bg-linear-to-r from-white via-sky-200 to-white/20 opacity-60 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DesktopFluidHeader;
