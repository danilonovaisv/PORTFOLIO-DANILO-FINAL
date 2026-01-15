'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import type { NavItem } from './types';
import styles from './DesktopFluidHeader.module.css';

// Forced static behavior - removing dynamic import for WebGL
// const HeaderFluidGlass = dynamic(
//   () => import('@/components/canvas/header/HeaderFluidGlass'),
//   {
//     ssr: false,
//   }
// );

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

  const nav = useMemo(() => navItems, [navItems]);
  const shouldHighlightPage = Boolean(isPageActive);

  return (
    <header
      className={`hidden lg:block fixed top-6 left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ease-in-out ${
        isLight ? 'header--light' : ''
      }`}
    >
      <div
        className={
          'flex justify-center w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24'
        }
      >
        <div ref={wrapRef} className="pointer-events-auto w-full relative">
          <div
            className={`${styles.headerContainer} ${
              isLight ? styles.headerLight : styles.headerDark
            } h-16 w-[calc(100%+5rem)] -ml-10 rounded-4xl backdrop-blur-md border border-white/10 bg-black/20 transition-all duration-300`}
          >
            {/* glass background - Static only */}
            {/* <div className="absolute inset-0 rounded-full overflow-hidden">
               Static fallback always
                <div className={styles.fallbackBackground} />
            </div> */}

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
                  width={32}
                  height={32}
                  className="h-8 w-auto transition-colors duration-300"
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
