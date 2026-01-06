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
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        id="mobile-menu-panel"
        className="fixed inset-0 bg-[#040013]/98 backdrop-blur-xl flex flex-col justify-center px-8 z-50 pointer-events-auto"
        aria-hidden={!open}
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

            return (
              <li key={item.href} className="overflow-hidden leading-none">
                <button
                  onClick={() => onNavigate(item.href)}
                  className={`sm-panel-item text-4xl font-light tracking-wide transition-colors text-left leading-none uppercase will-change-transform origin-bottom ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-white/80 hover:text-white'
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
