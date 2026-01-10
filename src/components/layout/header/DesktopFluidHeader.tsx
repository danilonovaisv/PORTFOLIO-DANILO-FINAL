'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import React, { useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { NavItem } from './types';
import styles from './DesktopFluidHeader.module.css';
import { BRAND } from '@/config/brand';

const HeaderFluidGlass = dynamic(
  () => import('@/components/canvas/header/HeaderFluidGlass'),
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
  isLight?: boolean;
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
  isLight,
}: DesktopFluidHeaderProps) {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const nav = useMemo(() => navItems, [navItems]);

  return (
    <header
      className={`hidden lg:block fixed top-0 left-0 right-0 z-100 w-full pointer-events-none ${
        isLight ? 'header--light' : ''
      }`}
    >
      <div className={BRAND.layout.container + ' pt-6 flex justify-center'}>
        <div
          ref={wrapRef}
          className="pointer-events-auto w-fit relative mx-auto"
        >
          <div
            className={`${styles.headerContainer} h-16 min-w-[700px] rounded-full backdrop-blur-md border border-white/5 bg-linear-to-b from-white/5 to-transparent`}
          >
            {/* glass background */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {!disableWebGL && !reducedMotion ? (
                <HeaderFluidGlass navItems={nav} accentColor={accentColor} />
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
                  className="h-8 w-auto transition-colors"
                  style={{ width: 'auto' }}
                  unoptimized
                  loading="eager"
                />
              </Link>

              <nav
                aria-label="Navegação principal"
                className="flex items-center gap-7"
              >
                {nav.map((item) => {
                  const hash = item.href.startsWith('/#')
                    ? item.href.substring(1)
                    : item.href;
                  const isActive = activeHref === hash;

                  const common =
                    'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md text-xs uppercase tracking-[0.2em]';
                  const baseText = isLight ? 'text-[#0048ff]' : 'text-white/70';
                  const hoverText = isLight
                    ? 'hover:text-[#0048ff]'
                    : 'hover:text-white';
                  const activeText = isLight
                    ? 'text-[#0048ff]'
                    : 'text-primary';
                  const textColor = isActive
                    ? `${activeText} font-semibold`
                    : `${baseText} ${hoverText} font-medium`;
                  const underline = isActive
                    ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-current'
                    : 'after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current group-hover:after:w-full after:transition-all after:duration-300';

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
        </div>
      </div>
    </header>
  );
}
