'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import React, { useCallback, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import type { NavItem } from './types';
import { HEADER_TOKENS } from './headerTokens';
import styles from './DesktopFluidHeader.module.css';

const HeaderGlassCanvas = dynamic(
  () => import('@/components/canvas/header/HeaderGlassCanvas'),
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
    <header className="hidden lg:block sticky top-6 z-40 pointer-events-none inset-x-0">
      <div className="w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          ref={wrapRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={{ x, scaleX, scaleY }}
          className="pointer-events-auto mx-auto w-full max-w-[1100px] relative"
        >
          <div
            className={`${styles.headerContainer} h-16 rounded-full backdrop-blur-md border border-white/10 shadow-lg bg-black/5`}
          >
            {/* glass background */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {!disableWebGL && !reducedMotion ? (
                <HeaderGlassCanvas accentColor={accentColor} />
              ) : (
                <div className={styles.fallbackBackground} />
              )}
            </div>

            {/* content */}
            <div className="relative z-10 h-full px-8 flex items-center justify-between gap-6">
              <Link
                href="/"
                aria-label="Ir para Home"
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
              >
                <Image
                  src={logoUrl}
                  alt="Danilo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
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
                    'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md';
                  const textColor = isActive
                    ? 'text-primary font-medium'
                    : 'text-white/70 hover:text-white font-medium';
                  const underline = isActive
                    ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary'
                    : 'after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary group-hover:after:w-full after:transition-all after:duration-300';

                  if (isExternalHref(item.href) || item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group ${common} ${textColor} relative flex items-center`}
                      >
                        <span className="tracking-tight">{item.label}</span>
                        <span className={underline} />
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => onNavigate(item.href)}
                      className={`group ${common} ${textColor} relative flex items-center`}
                    >
                      <span className="tracking-tight">{item.label}</span>
                      <span className={underline} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
