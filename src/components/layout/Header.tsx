'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_LINKS, ASSETS } from '@/lib/constants';
import type { NavLink } from '@/lib/types';
import { Menu, X } from 'lucide-react';

function Header(): React.ReactElement {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navItems = useMemo<NavLink[]>(() => NAV_LINKS, []);

  // Padding animado para compressão suave ao scroll
  const paddingY = useTransform(scrollY, [0, 40], [16, 8]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsCondensed(latest >= 40);
  });

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const getAriaCurrent = (href: string): 'page' | undefined => {
    if (href.startsWith('/sobre') && pathname.startsWith('/sobre')) {
      return 'page';
    }
    if (href.startsWith('/portfolio') && pathname.startsWith('/portfolio')) {
      return 'page';
    }
    if (href === '/#hero' && pathname === '/') {
      return 'page';
    }
    return undefined;
  };

  const handleNavClick =
    (href: string) =>
    (event: React.MouseEvent<HTMLAnchorElement>): void => {
      const isHashLink = href.startsWith('#');

      if (isHashLink && pathname !== '/') {
        event.preventDefault();
        router.push(`/${href}`);
      }

      setIsMobileMenuOpen(false);
    };

  return (
    <>
      <motion.header
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isCondensed
            ? 'bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Ir para a home"
            className="relative block shrink-0 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {!logoError ? (
              <img
                src={ASSETS.logoDark}
                alt="Danilo Novais"
                className="h-8 md:h-10 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-[#111111] tracking-tighter">
                Danilo.
              </span>
            )}
          </Link>

          <nav
            className="hidden md:block"
            aria-label="Navegação principal"
            role="navigation"
          >
            <ul className="flex items-center gap-6 text-sm text-gray-700">
              {navItems.map((link) => {
                const isActive = getAriaCurrent(link.href) === 'page';

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      aria-current={getAriaCurrent(link.href)}
                      className="relative block py-2 text-sm font-medium lowercase tracking-wide text-[#4a4a4a] transition-colors duration-200 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white data-[active=true]:text-[#0057FF]"
                      data-active={isActive}
                    >
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-[#0057FF]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        whileFocus={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              {...(isMobileMenuOpen
                ? { 'aria-expanded': true }
                : { 'aria-expanded': false })}
              aria-controls="menu-principal"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center bg-white pt-32 px-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            ref={menuRef}
          >
            <nav id="menu-principal" className="w-full max-w-sm">
              <ul className="flex flex-col space-y-6 text-center">
                {navItems.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      className="block text-3xl font-medium lowercase text-[#111111] transition-colors duration-200 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-current={getAriaCurrent(link.href)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
