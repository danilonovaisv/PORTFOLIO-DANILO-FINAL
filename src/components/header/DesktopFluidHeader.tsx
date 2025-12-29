'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { BRAND } from '@/config/brand';
import { headerTokens } from '@/components/header/headerTokens.ts';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import FluidGlass from './webgl/FluidGlass';
import type { DesktopFluidHeaderProps, NavItem } from './types';

const cursorUrl =
  'url(\'data:image/svg+xml,%3Csvg width=\"44\" height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"22\" cy=\"22\" r=\"14\" fill=\"%23ffffff\" fill-opacity=\"0.12\"/%3E%3Ccircle cx=\"22\" cy=\"22\" r=\"6\" fill=\"%236da8ff\" fill-opacity=\"0.62\"/%3E%3C/svg%3E\') 22 22, pointer';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * DesktopFluidHeader
 *
 * STACKING: z-40 garante que o header fique SEMPRE acima da Hero section:
 * - HomeHero Ghost (z-20)
 * - HomeHero Video (z-30)
 * - Header (z-40) ← ESTE COMPONENTE
 *
 * O efeito FluidGlass fica abaixo do conteúdo, mas dentro do header (stacking local).
 */
const DesktopFluidHeader: React.FC<DesktopFluidHeaderProps> = ({
  navItems,
  logoUrl,
  glass,
  height: _height = headerTokens.layout.height,
  onNavigate,
  supportsWebGL: supportsWebGLOverride,
  className,
}) => {
  const hookSupportsWebGL = useWebGLSupport();
  const supportsWebGL = supportsWebGLOverride ?? hookSupportsWebGL;
  const [pointer, setPointer] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });
  const [parallax, setParallax] = useState<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Array<HTMLAnchorElement | undefined>>([]);

  const magnetizedNavItems = useMemo<NavItem[]>(() => navItems, [navItems]);
  const headerClassName = `fixed left-0 top-0 z-40 w-full overflow-hidden ${className ?? ''}`.trim();

  useEffect(() => {
    const handleScroll = () => {
      setParallax(window.scrollY / 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (event: MouseEvent) => {
      setPointer({
        x: clamp01(event.clientX / window.innerWidth),
        y: clamp01(1 - event.clientY / window.innerHeight),
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReducedMotion]);

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

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (prefersReducedMotion) return;
    navItemRefs.current.forEach((link) => {
      if (!link) return;
      const box = link.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = (event.clientX - cx) / box.width;
      const dy = (event.clientY - cy) / box.height;
      const influence = Math.max(0, 1 - Math.hypot(dx, dy));
      const strength = influence * 12;
      link.style.transform = `translate3d(${dx * strength}px, ${dy * strength
        }px, 0) scale(${1 + influence * 0.02})`;
    });
  };

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    if (prefersReducedMotion) return;
    setPointer({ x: 0.5, y: 0.5 });
    navItemRefs.current.forEach((link) => {
      if (link) link.style.transform = '';
    });
  };

  return (
    <header
      className={`${headerClassName} fluid-header-shell`}
      style={{ height: _height }}
    >
      <div className="absolute inset-0 z-0 bg-[#0b0c14]/75 backdrop-blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-linear-to-r from-transparent via-sky-300/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />

      {supportsWebGL ? (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <FluidGlass
            mode="bar"
            pointer={prefersReducedMotion ? { x: 0.5, y: 0.5 } : pointer}
            parallax={parallax}
            reducedMotion={prefersReducedMotion}
            className="h-full w-full"
            barProps={{
              scale: [1.2, 0.25, 0.2],
              ior: glass.ior,
              thickness: glass.thickness,
              chromaticAberration: glass.chromaticAberration,
              anisotropy: glass.anisotropy,
              smoothness: glass.smoothness,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-10 bg-linear-to-r from-white/20 via-white/10 to-white/20" />
      )}

      <div
        ref={containerRef}
        className="relative z-50 mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-10"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <Link
          href="/"
          aria-label="Ir para a home"
          className="group flex items-center"
        >
          <Image
            src={logoUrl ?? BRAND.logos.faviconLight}
            alt={`Logo ${BRAND.name}`}
            width={58}
            height={58}
            className="h-[58px] w-[58px] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
            priority
            unoptimized
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="relative flex items-center gap-8 text-[15px] font-medium tracking-[0.02em] text-white/80"
        >
          {magnetizedNavItems.map((link, idx) => {
            const isActive =
              (pathname === '/' && link.href === '#hero') ||
              (pathname !== '/' && link.href === pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                ref={(node) => {
                  navItemRefs.current[idx] = node ?? undefined;
                }}
                onClick={() => onNavigate(link.href)}
                className={`group relative px-2 py-1 transition-all duration-300 hover:text-white ${isActive ? 'text-sky-300' : ''}`}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute inset-x-1 -bottom-1 h-px origin-center bg-linear-to-r from-transparent via-sky-400 to-transparent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default DesktopFluidHeader;
