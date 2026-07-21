'use client';

import React, { forwardRef, RefObject } from 'react';
import { m } from 'motion/react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Instagram, Linkedin } from '@/components/shared/icons/SocialIcons';
import { SOCIALS } from '@/config/navigation';
import type { NavItem } from '@/components/layout/header/types';
import { isNavItemActive } from '@/components/layout/header/nav-state';

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
      <section
        ref={ref}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Menu de navegação"
        data-testid="site-navigation"
        data-lenis-prevent
        className={`fixed inset-0 z-[var(--z-layer-mobile-menu)] flex min-h-[100svh] flex-col overflow-y-auto overscroll-contain bg-bluePrimary px-8 backdrop-blur-xl transition-opacity duration-modal sm:px-12 md:px-16 ${
          open
            ? 'visible pointer-events-auto opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        style={{
          minHeight: '100dvh',
          paddingTop: 'max(6rem, env(safe-area-inset-top, 2rem))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))',
          paddingLeft: 'max(2rem, env(safe-area-inset-left, 2rem))',
          paddingRight: 'max(2rem, env(safe-area-inset-right, 2rem))',
        }}
        aria-hidden={open ? 'false' : 'true'}
        inert={open ? undefined : true}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="my-auto flex w-full flex-col py-4">
          <nav aria-label="Navegação principal">
            <ul className="flex flex-col gap-2" role="list">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href, activeHref);
                return (
                  <li key={item.href} className="overflow-hidden leading-none">
                    <Link
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.href);
                      }}
                      className={`sm-panel-item block min-h-14 w-full py-4 text-left text-4xl font-light uppercase leading-none tracking-wide transition-colors duration-fast sm:text-5xl ${
                        isActive
                          ? 'text-blueAccent font-medium underline underline-offset-4'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social links */}
          <div
            ref={socialsRef}
            className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8"
          >
            <m.h3
              className="sm-social-title text-sm font-medium uppercase tracking-wider"
              initial={false}
              animate={{ color: accentColor }}
            >
              Connect
            </m.h3>
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
                  tabIndex={open ? 0 : -1}
                  className="sm-social-link flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-fast hover:border-primary hover:bg-primary"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

MobileMenuPanel.displayName = 'MobileMenuPanel';
export default MobileMenuPanel;
