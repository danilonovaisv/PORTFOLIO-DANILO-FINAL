'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HEADER_LINKS_MOBILE } from '@/config/navigation';
import { BRAND } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import LogoDark from '@/assets/logos/LogoDark.svg';
import { headerTokens } from '@/design-system/headerTokens';

const overlayVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const MobileStaggeredMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const resolvedOverlayVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return overlayVariants;
  }, [prefersReducedMotion]);

  const resolvedListVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
      };
    }
    return listVariants;
  }, [prefersReducedMotion]);

  const resolvedItemVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
      };
    }
    return itemVariants;
  }, [prefersReducedMotion]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed inset-0 z-40 flex justify-end lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={resolvedOverlayVariants}
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            role="dialog"
            aria-modal="true"
          >
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${headerTokens.color.gradient[0]}, ${headerTokens.color.gradient[1]})`,
                }}
              />
              <motion.div
                className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-white/15 blur-3xl"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, 20, 0], x: [0, 10, 0] }
                }
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-10 -right-20 h-56 w-56 rounded-full bg-black/10 blur-3xl"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -20, 0], x: [0, -12, 0] }
                }
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative flex h-full flex-col justify-between px-8 pb-12 pt-24 text-white">
                <motion.nav variants={resolvedListVariants} initial="hidden" animate="visible">
                  {HEADER_LINKS_MOBILE.map((link, index) => (
                    <motion.div
                      key={link.href}
                      variants={resolvedItemVariants}
                      className="flex items-center gap-4 py-3"
                    >
                      <span className="text-xs font-medium tracking-[0.3em] text-white/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-medium tracking-tight text-white transition-opacity hover:opacity-[0.85]"
                        aria-label={link.ariaLabel}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {BRAND.name}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center" aria-label="Ir para a home">
            <Image
              src={LogoDark}
              alt={`Logo ${BRAND.name}`}
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
              isOpen
                ? 'border-white/50 bg-white/85 text-black'
                : 'border-white/30 bg-white/10 text-[#e9e9ef]'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-black"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>
    </>
  );
};

export default MobileStaggeredMenu;
