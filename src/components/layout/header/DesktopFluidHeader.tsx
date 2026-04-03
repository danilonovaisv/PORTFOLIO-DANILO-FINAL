'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem } from '@/components/layout/header/types';
import styles from '@/components/layout/header/DesktopFluidHeader.module.css';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useAntigravityStore } from '@/store/antigravity.store';
import { isNavItemActive } from '@/components/layout/header/nav-state';

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
}: DesktopFluidHeaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMotionGate();
  const mountWebGL = useAntigravityStore((state) => state.flags.mountWebGL);
  const [allowCanvas, setAllowCanvas] = useState(false);

  const nav = useMemo(() => navItems, [navItems]);

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
      className={`hidden lg:block fixed top-6 left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ease-in-out ${
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
                  width={150}
                  height={47}
                  className="block h-auto w-[150px] object-contain transition-colors duration-300"
                  priority
                  unoptimized
                />
              </Link>

              <nav
                aria-label="Navegação principal"
                className="flex items-center gap-7"
                data-testid="site-navigation"
              >
                {nav.map((item) => {
                  const isActive = isNavItemActive(item.href, activeHref);

                  const common =
                    'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md text-xs uppercase tracking-[0.2em] relative flex items-center';
                  const baseText = isLight ? 'text-white' : 'text-white/70';
                  const hoverText = isLight
                    ? 'hover:text-bluePrimary'
                    : 'hover:text-white';
                  const activeText = 'text-bluePrimary';
                  const textColor = isActive
                    ? `${activeText} font-semibold`
                    : `${baseText} ${hoverText} font-medium`;

                  const LinkComponent =
                    isExternalHref(item.href) || item.external
                      ? motion.a
                      : motion.button;
                  const linkProps =
                    isExternalHref(item.href) || item.external
                      ? {
                          href: item.href,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {
                          type: 'button' as const,
                          onClick: () => onNavigate(item.href),
                        };

                  return (
                    <LinkComponent
                      key={item.href}
                      {...linkProps}
                      className={`group ${common} ${textColor}`}
                      whileHover={!isActive ? 'hover' : undefined}
                      initial="initial"
                      animate={isActive ? 'active' : 'initial'}
                    >
                      <span className="tracking-tight">{item.label}</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[1px] w-full bg-current origin-center"
                        variants={{
                          initial: { scaleX: 0 },
                          hover: {
                            scaleX: 1,
                            transition: {
                              duration: reducedMotion ? 0 : 0.3,
                              ease: GHOST_EASE,
                            },
                          },
                          active: {
                            scaleX: 1,
                            transition: {
                              duration: reducedMotion ? 0 : 0.3,
                              ease: GHOST_EASE,
                            },
                          },
                        }}
                      />
                    </LinkComponent>
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
