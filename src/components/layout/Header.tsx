'use client';

import React, { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { NAV_LINKS, ASSETS } from '../../lib/constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Otimização: Transformações diretas de valor sem re-renderizar o componente React
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

  return (
    <>
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor,
          backdropFilter,
          boxShadow,
        }}
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-4 sm:px-8 lg:px-12 will-change-transform"
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
              <span className="text-2xl font-bold text-[#111111] tracking-tighter">
                Danilo.
              </span>
            )}
          </a>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8 lg:space-x-12">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-[#111111] hover:text-[#0057FF] transition-colors duration-200 lowercase tracking-wide block py-2"
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
            className="text-[#111111] p-2 hover:text-[#0057FF] transition-colors tappable"
            aria-label="Toggle menu"
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
            className="fixed inset-0 z-[900] bg-[#F4F5F7] pt-32 px-6 md:hidden flex flex-col items-center"
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
                      className="text-3xl font-medium text-[#111111] hover:text-[#0057FF] transition-colors block lowercase"
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
