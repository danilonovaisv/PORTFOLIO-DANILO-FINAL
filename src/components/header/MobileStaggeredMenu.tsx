'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { MobileStaggeredMenuProps } from './types';

const PRELAYER_STAGGER = 0.07;
const PRELAYER_DURATION = 0.5;
const PANEL_DURATION = 0.65;
const ITEM_DURATION = 1;
const ITEM_STAGGER = 0.1;
const NUMBER_DURATION = 0.6;

const MobileStaggeredMenu: React.FC<MobileStaggeredMenuProps> = ({
  navItems,
  logoUrl,
  gradient,
  accentColor,
  isOpen,
  isFixed = true,
  onOpen,
  onClose,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const resolvedIsOpen = typeof isOpen === 'boolean' ? isOpen : internalOpen;
  const [isRendered, setIsRendered] = useState(resolvedIsOpen);
  const prefersReducedMotion = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayerRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  preLayerRefs.current = [];
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

  useEffect(() => {
    if (!resolvedIsOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedIsOpen]);

  const resolvedGradient = useMemo(
    () => gradient ?? ['#0d0d10', '#1a1a20'],
    [gradient]
  );
  const prelayerColors = useMemo(
    () => [resolvedGradient[0], resolvedGradient[1], '#0b0b12'],
    [resolvedGradient]
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
      const preLayers = preLayerRefs.current.filter(Boolean);
      const items = itemRefs.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      const offscreen = 100;

      if (panel) {
        gsap.set([panel, ...preLayers], { xPercent: offscreen });
      }
      if (overlay) {
        gsap.set(overlay, { opacity: 0 });
      }
      if (items.length) {
        gsap.set(items, { yPercent: 140, rotate: 10, opacity: 0 });
      }
      if (numbers.length) {
        gsap.set(numbers, { opacity: 0 });
      }
    }, menuRef);
    return () => ctx.revert();
  }, [isRendered]);

  useLayoutEffect(() => {
    if (!isRendered) return;
    const preLayers = preLayerRefs.current.filter(Boolean);
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
        gsap.set([panel, ...preLayers], { xPercent: 0 });
        gsap.set(items, { yPercent: 0, rotate: 0, opacity: 1 });
        gsap.set(numbers, { opacity: 1 });
      } else {
        gsap.set(overlay, { opacity: 0 });
        gsap.set([panel, ...preLayers], { xPercent: offscreen });
        setIsRendered(false);
      }
      return;
    }

    if (resolvedIsOpen) {
      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0);
      preLayers.forEach((layer, index) => {
        tl.to(
          layer,
          { xPercent: 0, duration: PRELAYER_DURATION, ease: 'power4.out' },
          index * PRELAYER_STAGGER
        );
      });

      const lastTime = preLayers.length
        ? (preLayers.length - 1) * PRELAYER_STAGGER
        : 0;
      const panelInsertTime = lastTime + (preLayers.length ? 0.08 : 0);
      tl.to(
        panel,
        { xPercent: 0, duration: PANEL_DURATION, ease: 'power4.out' },
        panelInsertTime
      );

      if (items.length) {
        const itemsStart = panelInsertTime + PANEL_DURATION * 0.15;
        tl.to(
          items,
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: ITEM_DURATION,
            ease: 'power4.out',
            stagger: { each: ITEM_STAGGER, from: 'start' },
          },
          itemsStart
        );
        if (numbers.length) {
          tl.to(
            numbers,
            {
              opacity: 1,
              duration: NUMBER_DURATION,
              ease: 'power2.out',
              stagger: { each: 0.08, from: 'start' },
            },
            itemsStart + 0.1
          );
        }
      }
      openTimelineRef.current = tl;
    } else {
      const tl = gsap.timeline({
        onComplete: () => setIsRendered(false),
      });
      tl.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0);
      if (items.length) {
        tl.to(
          [...items].reverse(),
          {
            yPercent: 140,
            rotate: -6,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.04,
          },
          0
        );
      }
      if (numbers.length) {
        tl.to(numbers, { opacity: 0, duration: 0.2 }, 0);
      }
      tl.to(
        panel,
        { xPercent: offscreen, duration: 0.4, ease: 'power3.in' },
        0
      );
      [...preLayers].reverse().forEach((layer, index) => {
        tl.to(
          layer,
          { xPercent: offscreen, duration: 0.3, ease: 'power3.in' },
          index * 0.04
        );
      });
      closeTimelineRef.current = tl;
    }
  }, [isRendered, prefersReducedMotion, resolvedIsOpen]);

  return (
    <>
      {isRendered && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/20"
            aria-hidden="true"
          />
          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
            style={
              {
                '--menu-accent': accentColor,
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 flex justify-end">
              <div className="relative h-full w-full max-w-[420px]">
                <div className="absolute inset-0">
                  {prelayerColors.map((color, index) => (
                    <div
                      key={color}
                      ref={(node) => {
                        if (node) preLayerRefs.current[index] = node;
                      }}
                      className="absolute inset-0"
                      style={{
                        background: color,
                        opacity: 0.35 - index * 0.08,
                      }}
                    />
                  ))}
                </div>
                <div
                  ref={panelRef}
                  className="absolute inset-0 bg-[linear-gradient(135deg,var(--menu-gradient-start),var(--menu-gradient-end))]"
                  style={{
                    '--menu-gradient-start': resolvedGradient[0],
                    '--menu-gradient-end': resolvedGradient[1],
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="relative ml-auto flex h-full w-full max-w-[420px] flex-col justify-between px-8 pb-12 pt-24 text-white">
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
                      className="text-3xl font-medium uppercase tracking-tight text-white transition-colors hover:text-[var(--menu-accent)]"
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

              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                {BRAND.name}
              </div>
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
              width={32}
              height={32}
              className="h-8 w-8"
              priority
              unoptimized
            />
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={resolvedIsOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={resolvedIsOpen ? 'true' : 'false'}
            className={`flex h-12 items-center gap-2 rounded-full border px-5 text-xs font-semibold uppercase tracking-[0.3em] transition-colors ${resolvedIsOpen
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
            <span className="relative h-4 overflow-hidden">
              <span className="block">{resolvedIsOpen ? 'Close' : 'Menu'}</span>
            </span>
            <span className={resolvedIsOpen ? 'text-black' : undefined}>
              {resolvedIsOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default MobileStaggeredMenu;
