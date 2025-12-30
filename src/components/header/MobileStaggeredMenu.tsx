'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { NavItem } from './types';
import { HEADER_TOKENS } from './headerTokens';
import { SOCIALS } from '@/config/navigation';

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
}

function isExternalHref(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  gradient,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: MobileStaggeredMenuProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const panelVariants = {
    closed: { x: '100%', transition: { duration: reducedMotion ? 0 : 0.18 } },
    open: {
      x: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 30 },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: reducedMotion ? 0 : 0.18 } },
    open: { opacity: 1, transition: { duration: reducedMotion ? 0 : 0.18 } },
  };

  const listVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: reducedMotion ? 0 : HEADER_TOKENS.mobile.staggerDelay,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 16 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.22 },
    },
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
      <div className="h-[56px] px-4 flex items-center justify-between bg-ghost-void/72 backdrop-blur-[10px] border-b border-white/10">
        <Link
          href="/"
          aria-label="Ir para Home"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-ghost-void rounded-md"
        >
          <Image
            src={logoUrl}
            alt="Danilo"
            width={24}
            height={24}
            className="h-6 w-auto"
            unoptimized
          />
        </Link>

        <button
          type="button"
          onClick={isOpen ? onClose : onOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen ? 'true' : 'false'}
          className="h-10 w-10 grid place-items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-ghost-void"
        >
          <div className="relative h-5 w-6">
            <span
              className={`absolute left-0 top-1 h-[2px] w-full bg-white transition-transform duration-200 ${isOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-white transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
              className={`absolute left-0 bottom-1 h-[2px] w-full bg-white transition-transform duration-200 ${isOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.button
              type="button"
              aria-label="Fechar menu (overlay)"
              className="absolute inset-0 w-full h-full"
              variants={overlayVariants}
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
              }}
            />

            <motion.aside
              className="absolute top-0 right-0 h-full w-[min(420px,92vw)] px-6 pt-20 pb-10"
              variants={panelVariants}
              style={{
                background: 'rgba(6, 7, 31, 0.92)',
                borderLeft: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <motion.nav
                aria-label="Menu mobile"
                variants={listVariants}
                className="space-y-6"
              >
                {navItems.map((item) => {
                  const isExternal = isExternalHref(item.href) || item.external;

                  if (isExternal) {
                    return (
                      <motion.a
                        key={item.href}
                        variants={itemVariants}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white text-3xl font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
                        onClick={onClose}
                      >
                        {item.label}
                      </motion.a>
                    );
                  }

                  return (
                    <motion.button
                      key={item.href}
                      type="button"
                      variants={itemVariants}
                      className="block text-left w-full text-white text-3xl font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
                      onClick={() => onNavigate(item.href)}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </motion.nav>

              <div className="mt-10 pt-8 border-t border-white/10 text-white/70 text-sm">
                <p className="mb-2">Atalhos</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href={`mailto:${SOCIALS.emailSecondary}`}
                  >
                    Email
                  </a>
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
