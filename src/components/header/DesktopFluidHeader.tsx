'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import React, { useCallback, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import type { NavItem } from './types';
import { HEADER_TOKENS } from './headerTokens';

const HeaderGlassCanvas = dynamic(
  () => import('@/components/webgl/header/HeaderGlassCanvas'),
  {
    ssr: false,
  }
);

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  accentColor: string;
  disableWebGL?: boolean;
  onNavigate: (_href: string) => void;
  activeHref?: string;
}

function isExternalHref(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export default function DesktopFluidHeader({
  navItems,
  logoUrl,
  accentColor,
  disableWebGL,
  onNavigate,
  activeHref,
}: DesktopFluidHeaderProps) {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 });
  const scaleX = useSpring(1, { stiffness: 140, damping: 20, mass: 0.6 });
  const scaleY = useSpring(1, { stiffness: 140, damping: 20, mass: 0.6 });

  const maxTranslateX = HEADER_TOKENS.desktop.maxTranslateX;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return;
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const centered = (px - 0.5) * 2; // -1..1

      x.set(centered * maxTranslateX);
      scaleX.set(HEADER_TOKENS.desktop.maxScaleX);
      scaleY.set(HEADER_TOKENS.desktop.maxScaleY);
    },
    [maxTranslateX, reducedMotion, scaleX, scaleY, x]
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    scaleX.set(1);
    scaleY.set(1);
  }, [scaleX, scaleY, x]);

  const nav = useMemo(() => navItems, [navItems]);

  return (
    <header className="hidden lg:block fixed top-6 left-0 right-0 z-[40] pointer-events-none">
      <motion.div
        ref={wrapRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ x, scaleX, scaleY }}
        className="pointer-events-auto mx-auto w-[min(1100px,calc(100vw-48px))]"
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            height: HEADER_TOKENS.desktop.height,
            boxShadow: '0 18px 55px rgba(0,0,0,0.35)',
          }}
        >
          {/* glass background */}
          <div className="absolute inset-0">
            {!disableWebGL && !reducedMotion ? (
              <HeaderGlassCanvas accentColor={accentColor} />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
              />
            )}
          </div>

          {/* subtle border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />

          {/* content */}
          <div className="relative z-10 h-full px-6 flex items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="Ir para Home"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
            >
              <Image
                src={logoUrl}
                alt="Danilo"
                width={24}
                height={24}
                className="h-6 w-auto"
                unoptimized
              />
            </Link>

            <nav
              aria-label="Navegação principal"
              className="flex items-center gap-7"
            >
              {nav.map((item) => {
                const isActive = activeHref === item.href;

                const common =
                  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md';
                const textColor = isActive ? 'text-[#0057FF]' : 'text-white/80 hover:text-white';
                const underline = isActive
                  ? 'after:w-full'
                  : 'after:w-0 group-hover:after:w-full';

                if (isExternalHref(item.href) || item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative ${common} ${textColor}`}
                    >
                      <span className="text-[15px] font-medium tracking-tight">
                        {item.label}
                      </span>
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#0057FF] transition-all duration-200 ${underline}`}
                      />
                    </a>
                  );
                }

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => onNavigate(item.href)}
                    className={`group relative ${common} ${textColor}`}
                  >
                    <span className="text-[15px] font-medium tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#0057FF] transition-all duration-200 ${underline}`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
