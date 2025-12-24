'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { NAV_LINKS, FOOTER, SOCIAL_LIST } from '@/config/navigation';
import Image from 'next/image';

/**
 * Staggered Menu Component (Mobile & Tablet)
 *
 * Visual Behavior:
 * - Fullscreen menu
 * - Side entry animation
 * - Editorial staggered animation
 * - Animated color prelayers
 * - Animated Menu ↔ Close icon
 *
 * Configuration (from spec):
 * - position: "right"
 * - displaySocials: true
 * - displayItemNumbering: true
 * - menuButtonColor: "#e9e9ef"
 * - openMenuButtonColor: "#000"
 * - changeMenuColorOnOpen: true
 * - colors: ['#B19EEF', '#5227FF']
 * - accentColor: "#5227FF"
 * - isFixed: true
 */

export default function StaggeredMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-110 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
          isOpen ? 'text-black bg-white/10' : 'text-[#e9e9ef] hover:bg-white/10'
        }`}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen ? 'true' : 'false'}
        type="button"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Animated Color Prelayers */}
            <motion.div
              initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              animate={{
                clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
              }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#B19EEF] z-100"
            />
            <motion.div
              initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              animate={{
                clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
              }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.05,
              }}
              className="fixed inset-0 bg-[#5227FF] z-101"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              animate={{
                clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
              }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1,
              }}
              className="fixed inset-0 bg-[#06071f] z-102 flex flex-col"
            >
              {/* Header with Logo */}
              <div className="flex items-center justify-between px-6 py-6 sm:px-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Image
                    src={BRAND.logos.light}
                    alt={BRAND.name}
                    width={120}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/10 py-4 sm:py-6"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 text-white transition-colors hover:text-[#5227FF]"
                    >
                      {/* Item Numbering */}
                      <span className="text-sm text-white/40 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* Label */}
                      <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight lowercase">
                        {link.label}
                      </span>
                      {/* Arrow indicator */}
                      <motion.span
                        className="ml-auto text-white/30 group-hover:text-[#5227FF] transition-colors"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer with Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="px-8 sm:px-12 pb-8 space-y-6"
              >
                {/* Social Links */}
                <div className="flex items-center gap-6">
                  {SOCIAL_LIST.map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-[#5227FF] transition-colors"
                      aria-label={social.platform}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Copyright */}
                <p className="text-white/30 text-xs sm:text-sm">
                  {FOOTER.copyright}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
