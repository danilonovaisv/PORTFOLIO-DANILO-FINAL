/**
 * We keep the existing sticky, scroll-aware header but ensure the logo
 * renders through the Next.js Image component for better stability.
 */
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ASSETS, NAV_LINKS } from '../../lib/constants';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = NAV_LINKS.map((item) => ({
  label: item.label,
  href: item.href,
  isAnchor: item.href.startsWith('#'),
}));

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Animações do Header no Scroll
  const headerHeight = useTransform(scrollY, [0, 50], ['6.875rem', '5rem']);
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.95)']
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

  // Sincroniza o activeSection com a rota atual ou scroll
  useEffect(() => {
    // 1. Verifica rotas diretas
    if (pathname === '/sobre') {
      setActiveSection('sobre');
      return;
    }
    if (pathname?.startsWith('/portfolio') && pathname !== '/') {
      // Se estiver em /portfolio/algo, não queremos ativar "portfolio showcase" da home necessariamente,
      // mas se for a lógica desejada, mantemos. O layout pede "portfolio showcase" como âncora na home.
      setActiveSection('portfolio showcase');
      return;
    }

    // 2. Se for Home, observa as seções para "home" e "contato"
    if (pathname === '/') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target.id === 'hero') setActiveSection('home');
              if (entry.target.id === 'contact') setActiveSection('contato');
              if (entry.target.id === 'portfolio-showcase')
                setActiveSection('portfolio showcase');
            }
          });
        },
        { threshold: 0.3 }
      );

      const sections = ['hero', 'contact', 'portfolio-showcase'];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isAnchor: boolean
  ) => {
    if (isAnchor && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setIsMobileMenuOpen(false);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
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
        className="fixed top-0 left-0 right-0 z-999 flex items-center justify-between px-6 lg:px-12 will-change-transform border-b border-transparent data-[scrolled=true]:border-neutral-100 backdrop-blur-md bg-white/70"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center shrink-0 relative z-1000">
          <Link
            href="/"
            className="block relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg p-1"
            onClick={(e) => handleLinkClick(e, '#hero', true)}
            aria-label="Ir para página inicial"
          >
            {!logoError ? (
              <span className="relative block h-8 w-32 transition-transform duration-300 group-hover:scale-105 md:h-10 md:w-[140px]">
                <Image
                  src={ASSETS.logoDark}
                  alt="Logo Danilo Novais"
                  sizes="140px"
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                />
              </span>
            ) : (
              <span className="text-2xl font-bold text-[#111111] tracking-tighter">
                Danilo.
              </span>
            )}
          </Link>
        </div>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center space-x-2 lg:space-x-4">
            {NAV_ITEMS.map((link) => {
              const isActive =
                activeSection === link.label || link.href === pathname;

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) =>
                      handleLinkClick(e, link.href, link.isAnchor)
                    }
                    className={clsx(
                      'relative text-sm font-medium transition-all duration-300 lowercase tracking-wide block px-4 py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:underline underline-offset-8 decoration-2',
                      isActive
                        ? 'text-[#0057FF] bg-blue-50/50'
                        : 'text-[#111111] hover:text-[#0057FF] hover:bg-black/5'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="md:hidden z-1000 flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#111111] p-2 hover:text-[#0057FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-900 bg-[#F4F5F7] pt-32 px-6 md:hidden flex flex-col items-center"
          >
            <nav className="w-full max-w-sm" aria-label="Navegação mobile">
              <ul className="flex flex-col space-y-6 text-center">
                {NAV_ITEMS.map((link, i) => {
                  const isActive = activeSection === link.label;
                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) =>
                          handleLinkClick(e, link.href, link.isAnchor)
                        }
                        className={`
                          text-3xl font-medium transition-colors block lowercase
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7] rounded-lg px-4 py-2 hover:underline underline-offset-6 decoration-2
                          ${isActive ? 'text-[#0057FF]' : 'text-[#111111] hover:text-[#0057FF]'}
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
