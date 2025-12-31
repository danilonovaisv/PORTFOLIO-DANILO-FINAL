'use client';

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { SOCIALS } from '@/config/navigation';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string]; // We'll use this for the pre-layers
  accentColor: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
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
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const openRef = useRef(isOpen);

  // Sync internal state and ref with prop
  useEffect(() => {
    if (isOpen !== openRef.current) {
      toggleMenu(isOpen);
    }
  }, [isOpen]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = Array.from(preContainer?.querySelectorAll('.sm-prelayer') || []) as HTMLElement[];
      preLayerElsRef.current = preLayers;

      // Initial offscreen position
      gsap.set([panel, ...preLayers], { xPercent: 100 });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });
      gsap.set(toggleBtnRef.current, { color: '#ffffff' });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-item-number')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    // Reset initial states for entry
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { opacity: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // 1. Pre-layers sweep
    layers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    // 2. Main panel entrance
    const lastLayerTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastLayerTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    // 3. Menu items entrance
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
          },
          itemsStart + 0.1
        );
      }
    }

    // 4. Socials entrance
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.08,
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0 });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((seq.length - 1) / seq.length) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + seq.length * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      const targetColor = opening ? '#000000' : '#ffffff';
      colorTweenRef.current = gsap.to(btn, {
        color: targetColor,
        delay: 0.18,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    []
  );

  const toggleMenu = useCallback(
    (target: boolean) => {
      if (target === openRef.current) return;
      openRef.current = target;
      setInternalOpen(target);

      if (target) {
        playOpen();
      } else {
        playClose();
      }

      animateIcon(target);
      animateColor(target);
      animateText(target);
    },
    [playOpen, playClose, animateIcon, animateColor, animateText]
  );

  const handleToggleClick = () => {
    if (internalOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className="lg:hidden">
      <header className="fixed top-0 left-0 w-full flex items-center justify-between p-6 bg-transparent pointer-events-none z-60">
        <Link href="/" className="pointer-events-auto" onClick={onClose}>
          <Image
            src={logoUrl}
            alt="Logo"
            width={110}
            height={24}
            className={`h-8 w-auto object-contain transition-all duration-300 ${internalOpen ? 'invert brightness-0' : ''}`}
          />
        </Link>

        <button
          ref={toggleBtnRef}
          onClick={handleToggleClick}
          className="pointer-events-auto flex items-center gap-2 bg-transparent border-0 cursor-pointer font-medium text-white mix-blend-difference"
          aria-expanded={internalOpen}
        >
          <span className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap min-w-[50px] text-right mr-1">
            <span ref={textInnerRef} className="flex flex-col leading-none">
              {textLines.map((l, i) => (
                <span key={i} className="h-[1em] leading-none">
                  {l}
                </span>
              ))}
            </span>
          </span>

          <span ref={iconRef} className="relative w-4 h-4 flex items-center justify-center">
            <span
              ref={plusHRef}
              className="absolute w-full h-[2px] bg-current rounded-full"
            />
            <span
              ref={plusVRef}
              className="absolute w-full h-[2px] bg-current rounded-full"
            />
          </span>
        </button>
      </header>

      <div ref={preLayersRef} className="fixed inset-0 pointer-events-none z-45">
        {[gradient[0], gradient[1], '#ffffff'].map((c, i) => (
          <div
            key={i}
            className="sm-prelayer absolute inset-0 w-full h-full"
            style={{ backgroundColor: c } as React.CSSProperties}
          />
        ))}
      </div>

      <aside
        ref={panelRef}
        className="fixed inset-0 h-full w-full bg-white flex flex-col p-24 pb-12 overflow-y-auto z-50"
        aria-hidden={!internalOpen}
      >
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="list-none m-0 p-0 flex flex-col gap-8">
            {navItems.map((it, idx) => (
              <li key={it.href} className="relative overflow-hidden leading-none">
                <button
                  className="group relative text-black font-semibold text-5xl sm:text-7xl cursor-pointer leading-none tracking-tight uppercase transition-colors inline-block no-underline text-left w-full"
                  onClick={() => onNavigate(it.href)}
                >
                  <span className="sm-panel-item-number absolute -top-1 -right-8 text-sm font-normal text-[#0057FF] opacity-0">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="sm-panel-itemLabel inline-block origin-bottom will-change-transform group-hover:text-[#0057FF]">
                    {it.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-12 border-t border-black/5 flex flex-col gap-4">
          <h3 className="sm-socials-title text-sm font-medium text-[#0057FF] uppercase tracking-wider">Socials</h3>
          <ul className="list-none m-0 p-0 flex flex-row items-center gap-6 flex-wrap">
            {[
              { label: 'LinkedIn', link: SOCIALS.linkedin },
              { label: 'Instagram', link: SOCIALS.instagram },
              { label: 'E-mail', link: `mailto:${SOCIALS.emailSecondary}` },
            ].map((s, i) => (
              <li key={i}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-socials-link text-lg font-medium text-black no-underline hover:text-[#0057FF] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <style jsx>{`
        .sm-panel-itemLabel {
          /* Prevents layout shift during animation */
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
