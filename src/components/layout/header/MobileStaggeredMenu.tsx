'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { SOCIALS } from '@/config/navigation';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient?: [string, string];
  accentColor: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
}

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const, // easeOutExpo
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const socialVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.4 } },
};

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: MobileStaggeredMenuProps) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuRef = useRef<HTMLElement>(null);

  // Trap focus
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusableElements = menuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="lg:hidden">
      {/* Header bar fixed */}
      <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 py-6 pointer-events-none">
        <Link href="/" onClick={onClose} className="pointer-events-auto">
          <Image
            src={logoUrl}
            alt="Danilo"
            width={72}
            height={72}
            className="w-[72px] h-auto object-contain"
            unoptimized
          />
        </Link>

        <button
          onClick={isOpen ? onClose : onOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center text-white focus:outline-none z-110"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-[6px]">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-white block origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-[2px] bg-white block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-[2px] bg-white block origin-center"
            />
          </div>
        </button>
      </header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-linear-to-b from-[#06071f] to-[#050505] flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => onNavigate(item.href)}
                      className="text-4xl xs:text-5xl font-bold tracking-tight text-white hover:text-[#0057FF] transition-colors text-left"
                    >
                      <span className="text-sm font-medium text-[#0057FF] block mb-1 opacity-80">
                        0{i + 1}
                      </span>
                      {item.label}
                    </button>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              variants={socialVariants}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <h3 className="text-sm font-medium text-[#0057FF] mb-4 uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    label: 'LinkedIn',
                    href: SOCIALS.linkedin,
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                  {
                    label: 'Instagram',
                    href: SOCIALS.instagram,
                    icon: <Instagram className="w-5 h-5" />,
                  },
                  {
                    label: 'Email',
                    href: `mailto:${SOCIALS.emailSecondary}`,
                    icon: <Mail className="w-5 h-5" />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-[#0057FF] hover:border-[#0057FF] hover:scale-110"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
