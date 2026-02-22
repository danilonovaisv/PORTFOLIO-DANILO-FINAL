'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem } from '@/components/layout/header/types';
import styles from '@/components/layout/header/DesktopFluidHeader.module.css';

import dynamic from 'next/dynamic';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useAntigravityStore } from '@/store/antigravity.store';

const HeaderGlassCanvas = dynamic(
  () => import('@/components/canvas/header/HeaderGlassCanvas'),
  {
    ssr: false,
  }
);

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  onNavigate: (_href: string) => void;
  activeHref?: string;
  isLight?: boolean;
  isPageActive?: boolean;
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
  onNavigate,
  activeHref,
  isLight,
  isPageActive,
}: DesktopFluidHeaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMotionGate();
  const mountWebGL = useAntigravityStore((state) => state.flags.mountWebGL);
  const [allowCanvas, setAllowCanvas] = useState(false);

  const nav = useMemo(() => navItems, [navItems]);
  const shouldHighlightPage = Boolean(isPageActive);

  useEffect(() => {
    if (reducedMotion || !mountWebGL) {
      setAllowCanvas(false);
      return;
    }

    type NavigatorWithHints = Navigator & {
      deviceMemory?: number;
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };

    const navInfo = navigator as NavigatorWithHints;
    const lowCpu =
      typeof navInfo.hardwareConcurrency === 'number' &&
      navInfo.hardwareConcurrency <= 4;
    const lowMemory =
      typeof navInfo.deviceMemory === 'number' && navInfo.deviceMemory <= 4;
    const saveData = !!navInfo.connection?.saveData;
    const slowNetwork =
      typeof navInfo.connection?.effectiveType === 'string' &&
      /2g/.test(navInfo.connection.effectiveType);

    setAllowCanvas(!(lowCpu || lowMemory || saveData || slowNetwork));
  }, [mountWebGL, reducedMotion]);

  return (
    <header
      className={`hidden lg:block fixed top-6 left-0 right-0 z-[1000] w-full pointer-events-none transition-all duration-300 ease-in-out ${
        isLight ? 'header--light' : ''
      }`}
    >
      <div
        className={
          'flex justify-center w-full max-w-[1680px] mx-auto px-6 md:px-16'
        }
      >
        <div ref={wrapRef} className="pointer-events-auto w-full relative">
          <div
            className={`${styles.headerContainer} ${
              isLight ? styles.headerLight : styles.headerDark
            } h-16 w-[calc(100%+5rem)] -ml-10 rounded-4xl backdrop-blur-md border border-white/10 bg-black/20 transition-all duration-300`}
          >
            {/* glass background - Dynamic R3F */}
            <div className="absolute inset-0 rounded-4xl overflow-hidden opacity-60 pointer-events-none">
              {allowCanvas ? (
                <HeaderGlassCanvas accentColor="#0048ff" />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,72,255,0.25),rgba(0,0,0,0.25)_65%)]" />
              )}
            </div>

            {/* content */}
            <div className="relative z-10 h-full px-10 flex items-center justify-between gap-6">
              <Link
                href="/"
                aria-label="Ir para Home"
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
              >
                <Image
                  src={logoUrl}
                  alt="Danilo"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain transition-colors duration-300"
                />
              </Link>

              <nav
                aria-label="Navegação principal"
                className="flex items-center gap-7"
                data-testid="site-navigation"
              >
                {nav.map((item) => {
                  const hash = item.href.startsWith('/#')
                    ? item.href.substring(1)
                    : item.href;
                  const isActive = activeHref === hash;

                  const common =
                    'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md text-xs uppercase tracking-[0.2em]';
                  const baseText = isLight ? 'text-white' : 'text-white/70';
                  const hoverText = isLight
                    ? 'hover:text-blueAccent'
                    : 'hover:text-white';
                  const activeText = isLight
                    ? 'text-blueAccent'
                    : 'text-bluePrimary';
                  const textColor = isActive
                    ? `${activeText} font-semibold`
                    : `${baseText} ${hoverText} font-medium`;
                  const pageOverride = shouldHighlightPage
                    ? 'text-bluePrimary font-semibold'
                    : '';
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
                        className={`group ${common} ${textColor} ${pageOverride} relative flex items-center`}
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
                      className={`group ${common} ${textColor} ${pageOverride} relative flex items-center`}
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
