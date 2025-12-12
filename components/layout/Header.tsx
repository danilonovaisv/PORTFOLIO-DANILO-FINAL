'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, ASSETS } from '../../lib/constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Otimização: Transformações diretas de valor sem re-renderizar o componente React
  const headerHeight = useTransform(scrollY, [0, 50], ['110px', '80px']);
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
    if (href.startsWith('/sobre') && pathname.startsWith('/sobre'))
      return 'page';
    if (href.startsWith('/#hero') && pathname === '/') return 'page';
    return undefined;
  };

  return (
    <>
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor,
          backdropFilter,
          boxShadow,
        }}
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 md:px-12 will-change-transform"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center shrink-0 relative z-[1000]">
          <a href="/" className="block relative group">
            {!logoError ? (
              <img
                src={ASSETS.logoDark}
                alt="Danilo Novais"
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-text-main tracking-tighter">
                Danilo.
              </span>
            )}
          </a>
        </div>

        <nav
          className="hidden md:block"
          aria-label="Navegação principal"
          role="navigation"
        >
          <ul className="flex items-center space-x-8 lg:space-x-12">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-text-main hover:text-primary transition-colors duration-200 lowercase tracking-wide block py-2"
                  aria-current={getAriaCurrent(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden z-[1000]">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-main p-2 hover:text-primary transition-colors"
            aria-label="Alternar menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[900] bg-surface-main pt-32 px-6 md:hidden flex flex-col items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            ref={menuRef}
          >
            <nav className="w-full max-w-sm">
              <ul className="flex flex-col space-y-6 text-center">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-medium text-text-main hover:text-primary transition-colors block lowercase"
                      aria-current={getAriaCurrent(link.href)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
