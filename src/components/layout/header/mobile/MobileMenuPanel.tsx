'use client';

import React, { forwardRef, RefObject } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { SOCIALS } from '@/config/navigation';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MobileMenuPanelProps {
  navItems: NavItem[];
  accentColor: string;
  open: boolean;
  socialsRef: RefObject<HTMLDivElement | null>;
  onNavigate: (_href: string) => void;
  onClose: () => void;
  activeHref?: string;
  isPageActive?: boolean;
}

const MobileMenuPanel = forwardRef<HTMLElement, MobileMenuPanelProps>(
  (
    {
      navItems,
      accentColor,
      open,
      socialsRef,
      onNavigate,
      onClose,
      activeHref,
      isPageActive,
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        id="mobile-menu-panel"
        aria-label="Navegação principal"
        className="fixed inset-0 bg-[#0048ff] backdrop-blur-xl flex flex-col justify-center px-8 z-50 pointer-events-auto sm:px-12 md:px-16"
        style={{
          paddingTop: 'env(safe-area-inset-top, 2rem)',
          paddingBottom: 'env(safe-area-inset-bottom, 2rem)',
          paddingLeft: 'max(2rem, env(safe-area-inset-left, 2rem))',
          paddingRight: 'max(2rem, env(safe-area-inset-right, 2rem))',
        }}
        aria-hidden={open ? 'false' : 'true'}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Menu items */}
        <ul className="flex flex-col gap-4" role="list">
          {navItems.map((item) => {
            const hash = item.href.startsWith('/#')
              ? item.href.substring(1)
              : item.href;
            const isActive = activeHref === hash;
            const pageHighlight = isPageActive
              ? 'text-blueAccent font-semibold'
              : '';

            return (
              <li key={item.href} className="overflow-hidden leading-none">
                <button
                  onClick={() => onNavigate(item.href)}
                  className={`sm-panel-item w-full py-4 text-4xl sm:text-5xl font-light tracking-wide transition-all text-left leading-none uppercase will-change-transform origin-bottom min-h-[56px] active:translate-x-2 active:opacity-70 ${
                    pageHighlight ||
                    (isActive
                      ? 'text-blueAccent font-medium underline underline-offset-4'
                      : 'text-white/80 hover:text-white')
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Social links */}
        <div
          ref={socialsRef}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4"
        >
          <motion.h3
            className="sm-social-title text-sm font-medium uppercase tracking-wider"
            initial={false}
            animate={{ color: accentColor }}
          >
            Connect
          </motion.h3>
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
                href: SOCIALS.emailPrimary,
                icon: <Mail className="w-5 h-5" />,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="sm-social-link flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-primary hover:border-primary hover:scale-105 active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  }
);

MobileMenuPanel.displayName = 'MobileMenuPanel';
export default MobileMenuPanel;
