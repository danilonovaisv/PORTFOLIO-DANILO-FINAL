'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { MobileStaggeredMenuProps } from './types';

/**
 * Animation timing constants (in seconds)
 * Total open duration: ~320ms (PRELAYER + PANEL overlap)
 * Total close duration: ~280ms
 */
const OVERLAY_DURATION = 0.22;
const PANEL_DURATION = 0.28;
const ITEM_DURATION = 0.22;
const NUMBER_DURATION = 0.2;

/** Unique ID for ARIA controls relationship */
const MENU_ID = 'mobile-nav-menu';

const MobileStaggeredMenu: React.FC<MobileStaggeredMenuProps> = ({
  navItems,
  logoUrl,
  gradient,
  accentColor,
  isOpen,
  isFixed = true,
  onOpen,
  onClose,
  staggerDelay = 0.1,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const resolvedIsOpen = typeof isOpen === 'boolean' ? isOpen : internalOpen;
  const [isRendered, setIsRendered] = useState(resolvedIsOpen);
  const prefersReducedMotion = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  itemRefs.current = [];
  numberRefs.current = [];

  const setOpen = (next: boolean) => {
    if (typeof isOpen !== 'boolean') {
      setInternalOpen(next);
    }
    if (next) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (resolvedIsOpen) {
      setIsRendered(true);
    }
  }, [resolvedIsOpen]);

  useEffect(() => {
    if (!resolvedIsOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [resolvedIsOpen]);

  // ESC key handler & Focus management
  useEffect(() => {
    if (!resolvedIsOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        // Return focus to menu button after closing
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedIsOpen]);

  // Focus trap: move focus to first nav item when menu opens
  useEffect(() => {
    if (resolvedIsOpen && itemRefs.current[0]) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [resolvedIsOpen]);

  // Trap focus within menu when open
  const handleKeyDownTrap = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift+Tab: if on first element, go to last
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: if on last element, go to first
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  const resolvedGradient = useMemo(
    () => gradient ?? ['#0d0d10', '#1a1a20'],
    [gradient]
  );
  const toggleMenu = () => {
    setOpen(!resolvedIsOpen);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!isRendered) return;
    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      const offscreen = 100;

      if (panel) {
        gsap.set(panel, { xPercent: offscreen });
      }
      if (overlay) {
        gsap.set(overlay, { opacity: 0 });
      }
      if (items.length) {
        gsap.set(items, { y: 16, opacity: 0 });
      }
      if (numbers.length) {
        gsap.set(numbers, { opacity: 0 });
      }
    }, menuRef);
    return () => ctx.revert();
  }, [isRendered]);

  useLayoutEffect(() => {
    if (!isRendered) return;
    const items = itemRefs.current.filter(Boolean);
    const numbers = numberRefs.current.filter(Boolean);
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const offscreen = 100;

    if (!panel || !overlay) return;

    openTimelineRef.current?.kill();
    closeTimelineRef.current?.kill();

    if (prefersReducedMotion) {
      if (resolvedIsOpen) {
        gsap.set(overlay, { opacity: 1 });
        gsap.set(panel, { xPercent: 0 });
        gsap.set(items, { y: 0, opacity: 1 });
        gsap.set(numbers, { opacity: 1 });
      } else {
        gsap.set(overlay, { opacity: 0 });
        gsap.set(panel, { xPercent: offscreen });
        setIsRendered(false);
      }
      return;
    }

    if (resolvedIsOpen) {
      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: OVERLAY_DURATION, ease: 'power2.out' }, 0);
      tl.to(
        panel,
        { xPercent: 0, duration: PANEL_DURATION, ease: 'power2.out' },
        0
      );

      if (items.length) {
        tl.to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: ITEM_DURATION,
            ease: 'power2.out',
            stagger: { each: staggerDelay, from: 'start' },
          },
          PANEL_DURATION * 0.4
        );
        if (numbers.length) {
          tl.to(
            numbers,
            {
              opacity: 1,
              duration: NUMBER_DURATION,
              ease: 'power2.out',
              stagger: { each: staggerDelay, from: 'start' },
            },
            PANEL_DURATION * 0.45
          );
        }
      }
      openTimelineRef.current = tl;
    } else {
      const tl = gsap.timeline({
        onComplete: () => setIsRendered(false),
      });
      tl.to(overlay, { opacity: 0, duration: OVERLAY_DURATION, ease: 'power2.in' }, 0);
      if (items.length) {
        tl.to(
          [...items].reverse(),
          {
            y: 16,
            opacity: 0,
            duration: ITEM_DURATION,
            ease: 'power2.in',
            stagger: { each: staggerDelay, from: 'start' },
          },
          0
        );
      }
      if (numbers.length) {
        tl.to(numbers, { opacity: 0, duration: NUMBER_DURATION }, 0);
      }
      tl.to(
        panel,
        { xPercent: offscreen, duration: PANEL_DURATION, ease: 'power2.in' },
        0
      );
      closeTimelineRef.current = tl;
    }
  }, [isRendered, prefersReducedMotion, resolvedIsOpen, staggerDelay]);

  return (
    <>
      {isRendered && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="fixed inset-0 z-50 flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          onClick={closeMenu}
          onKeyDown={handleKeyDownTrap}
        >
          {/* Overlay escuro - clicável para fechar */}
          <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${resolvedGradient[0]}cc, ${resolvedGradient[1]}cc)`,
            }}
            aria-hidden="true"
          />

          {/* Container do painel - apenas este bloqueia propagação */}
          <div
            className="absolute right-0 top-0 h-full w-full"
            onClick={(event) => event.stopPropagation()}
            style={
              {
                '--menu-accent': accentColor,
              } as React.CSSProperties
            }
          >
            {/* Painel do gradiente principal */}
            <div
              ref={panelRef}
              className="absolute inset-0 bg-[linear-gradient(135deg,var(--menu-gradient-start),var(--menu-gradient-end))]"
              style={{
                '--menu-gradient-start': resolvedGradient[0],
                '--menu-gradient-end': resolvedGradient[1],
              } as React.CSSProperties}
            />

            {/* Conteúdo do menu */}
            <div className="relative flex h-full flex-col justify-between px-8 pb-12 pt-24 text-white">
              <nav>
                {navItems.map((link, index) => (
                  <div
                    key={link.href}
                    className="flex items-center gap-4 py-3"
                  >
                    <span
                      ref={(node) => {
                        if (node) numberRefs.current[index] = node;
                      }}
                      className="text-xs font-medium tracking-[0.3em] text-white/50"
                      style={{ color: accentColor }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-3xl font-medium uppercase tracking-tight text-white transition-colors hover:text-[var(--menu-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
                      aria-label={link.ariaLabel}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      ref={(node) => {
                        if (node) itemRefs.current[index] = node;
                      }}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>

            </div>
          </div>
        </div>
      )}

      <header
        className={`${isFixed ? 'fixed' : 'relative'} inset-x-0 top-0 z-40 lg:hidden ${className ?? ''}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Ir para a home"
          >
            <Image
              src={logoUrl}
              alt={`Logo ${BRAND.name}`}
              width={53}
              height={53}
              className="h-[53px] w-[53px]"
              priority
              unoptimized
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label={resolvedIsOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={resolvedIsOpen ? 'true' : 'false'}
            aria-controls={MENU_ID}
            aria-haspopup="dialog"
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${resolvedIsOpen
              ? 'border-white/50 bg-white/85 text-black'
              : 'bg-white/10'
              }`}
            style={
              resolvedIsOpen
                ? undefined
                : ({
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                } as React.CSSProperties)
            }
          >
            {resolvedIsOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
    </>
  );
};

export default MobileStaggeredMenu;
