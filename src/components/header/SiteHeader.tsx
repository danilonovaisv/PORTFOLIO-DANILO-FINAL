'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/config/navigation';
import { BRAND } from '@/config/brand';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  /* Removed unused scrollY */
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scrolled state based on scroll position
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12',
          isScrolled || isOpen
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 flex items-center gap-2 group"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-8 h-8 overflow-hidden">
            <Image
              src={BRAND.logos.light}
              alt={BRAND.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block group-hover:opacity-80 transition-opacity">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0057FF] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Button href="#contact" variant="primary" size="sm" className="ml-4">
            Lets Talk
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="relative z-50 p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505] md:hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

            <nav className="flex flex-col items-center gap-8 p-8 w-full max-w-md">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl font-light text-white/90 hover:text-[#0057FF] transition-colors tracking-tight py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 * NAV_LINKS.length, duration: 0.4 }}
                className="mt-8"
              >
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  Lets Talk
                </Button>
              </motion.div>
            </nav>

            {/* Decorative Elements */}
            <div className="absolute bottom-12 text-center text-white/20 text-xs tracking-[0.2em] uppercase">
              {BRAND.name} &copy; {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
