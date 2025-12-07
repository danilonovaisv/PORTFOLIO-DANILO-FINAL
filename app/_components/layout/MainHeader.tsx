'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { NAV_LINKS, ASSETS } from '@/src/lib/constants';
import { Menu, X } from 'lucide-react';

type LinkMeta = {
  label: string;
  href: string;
};

const normalizeLinkHref = (href: string) => {
  const [rawPath, rawHash] = href.split('#');
  return {
    path: rawPath === '' ? '/' : rawPath,
    hash: rawHash ? `#${rawHash}` : '',
  };
};

const MainHeader: React.FC = () => {
  const { scrollY } = useScroll();
  const pathname = usePathname() || '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const headerHeight = useTransform(scrollY, [0, 50], ['6.875rem', '5rem']);
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(244, 245, 247, 0)', 'rgba(255, 255, 255, 0.85)']
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0, 0, 0, 0.05)']
  );

  const handleSmoothScroll = useCallback(
    (link: LinkMeta, event: React.MouseEvent<HTMLAnchorElement>) => {
      const { path, hash } = normalizeLinkHref(link.href);
      const pathMatches = path === pathname;

      if (!hash || !pathMatches || typeof document === 'undefined') {
        return;
      }

      event.preventDefault();
      const targetId = hash.replace('#', '');
      const targetElement =
        document.getElementById(targetId) ||
        document.querySelector(`[name="${targetId}"]`);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(window.history.state, '', `${path}${hash}`);
        setCurrentHash(hash);
      }
    },
    [pathname]
  );

  const activeLink = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const { path, hash } = normalizeLinkHref(link.href);
        const pathMatches = path === pathname;
        const isHashActive = hash ? currentHash === hash && pathMatches : false;
        const isPathActive = !hash && pathMatches;

        return {
          ...link,
          isActive: isHashActive || isPathActive,
        };
      }),
    [currentHash, pathname]
  );

  const desktopNav = (
    <nav aria-label="Navegação principal" className="hidden md:block">
      <ul className="flex items-center space-x-8 lg:space-x-12">
        {activeLink.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(event) => handleSmoothScroll(link, event)}
              aria-current={link.isActive ? 'page' : undefined}
              className={`relative flex items-center gap-1 text-sm font-medium lowercase tracking-wide block py-2 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#0057FF]/70 ${
                link.isActive
                  ? 'text-[#0057FF]'
                  : 'text-[#111111] hover:text-[#0057FF]'
              }`}
            >
              {link.label}
              {link.isActive && (
                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-[#0057FF] to-[#8db7ff]" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  const mobileNav = (
    <AnimatePresence>
      {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-900 bg-[#F4F5F7] pt-32 px-6 md:hidden flex flex-col items-center"
          >
          <nav className="w-full max-w-sm" aria-label="Navegação principal">
            <ul className="flex flex-col space-y-6 text-center">
              {activeLink.map((link, i) => (
                <li key={link.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(event) => {
                        handleSmoothScroll(link, event);
                        setIsMobileMenuOpen(false);
                      }}
                      aria-current={link.isActive ? 'page' : undefined}
                      className={`text-3xl font-medium lowercase transition-colors duration-200 ${
                        link.isActive ? 'text-[#0057FF]' : 'text-[#111111]'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]/70`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor,
          backdropFilter,
          boxShadow,
        }}
        className="fixed top-0 left-0 right-0 z-999 flex items-center justify-between px-4 sm:px-8 lg:px-12 will-change-transform"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center shrink-0 relative z-1000">
          <a href="/" className="block relative group" aria-label="Home">
            {!logoError ? (
              <div className="relative h-8 md:h-10 w-[130px] md:w-[180px]">
                <Image
                  src={ASSETS.logoDark}
                  alt="Danilo Novais"
                  fill
                  priority
                  onError={() => setLogoError(true)}
                  sizes="(min-width: 768px) 180px, 130px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#111111] tracking-tighter">
                Danilo.
              </span>
            )}
          </a>
        </div>

        {desktopNav}

        <div className="md:hidden z-1000">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-[#111111] p-2 hover:text-[#0057FF] transition-colors tappable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]/70"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {mobileNav}
    </>
  );
};

export default MainHeader;
