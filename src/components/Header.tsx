'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

const HeaderScene = dynamic(() => import('./HeaderScene'), { ssr: false });

type NavKey = 'home' | 'sobre' | 'portfolio' | 'showcase' | 'contato';

type NavItem = {
  key: NavKey;
  label: string;
  href: `#${NavKey}`;
};

const SMOOTH_EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'home', href: '#home' },
  { key: 'sobre', label: 'sobre', href: '#sobre' },
  { key: 'portfolio', label: 'portfolio', href: '#portfolio' },
  { key: 'showcase', label: 'showcase', href: '#showcase' },
  { key: 'contato', label: 'contato', href: '#contato' },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}

function getKeyFromHash(hash: string): NavKey | null {
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;
  const keys = new Set<NavKey>(NAV_ITEMS.map((i) => i.key));
  return keys.has(clean as NavKey) ? (clean as NavKey) : null;
}

function useScrollSpyActiveKey(options?: {
  defaultKey?: NavKey;
  threshold?: number;
}) {
  const defaultKey = options?.defaultKey ?? 'home';
  const threshold = options?.threshold ?? 0.6;

  const [active, setActive] = useState<NavKey>(defaultKey);

  // Sync initial hash + hash changes (deep link)
  useEffect(() => {
    const applyHash = () => {
      const fromHash = getKeyFromHash(window.location.hash);
      if (fromHash) setActive(fromHash);
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Scroll spy: observes sections and updates active based on intersection
  useEffect(() => {
    const elements = NAV_ITEMS.map((i) =>
      document.getElementById(i.key)
    ).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    // Prefer whichever is most "visible"
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;

        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibility.set(
            id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        for (const [id, ratio] of visibility.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestRatio >= threshold) {
          const key = getKeyFromHash(`#${bestId}`);
          if (key) setActive(key);
        } else {
          // If nothing meets threshold, do a softer fallback:
          // pick the first intersecting entry (helps when sections are small)
          const first = entries.find((e) => e.isIntersecting)?.target as
            | HTMLElement
            | undefined;
          if (first?.id) {
            const key = getKeyFromHash(`#${first.id}`);
            if (key) setActive(key);
          }
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        rootMargin: '-15% 0px -55% 0px', // balances hero + next sections
      }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { active, setActive };
}

function GhostIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative grid size-20 place-items-center rounded-3xl',
        'bg-white/5 ring-1 ring-white/10 backdrop-blur-xl',
        'shadow-[0_0_60px_rgba(59,130,246,0.55)]',
        className
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_40%,rgba(59,130,246,0.35),transparent_60%)]" />
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        className="relative z-[1]"
      >
        <path
          d="M32 8c-11.046 0-20 8.954-20 20v26.5c0 1.933 2.19 3.064 3.771 1.948l3.7-2.614a2.4 2.4 0 0 1 2.77 0l3.7 2.614a2.4 2.4 0 0 0 2.77 0l3.7-2.614a2.4 2.4 0 0 1 2.77 0l3.7 2.614a2.4 2.4 0 0 0 2.77 0l3.7-2.614a2.4 2.4 0 0 1 2.77 0l3.7 2.614C49.81 57.564 52 56.433 52 54.5V28c0-11.046-8.954-20-20-20Z"
          fill="rgba(255,255,255,0.92)"
        />
        <circle cx="24.5" cy="30" r="4.2" fill="rgba(59,130,246,0.55)" />
        <circle cx="39.5" cy="30" r="4.2" fill="rgba(59,130,246,0.55)" />
      </svg>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'relative grid size-9 place-items-center rounded-xl',
          'bg-white/5 ring-1 ring-white/10 backdrop-blur-xl',
          'shadow-[0_0_30px_rgba(124,58,237,0.35)]'
        )}
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(60%_60%_at_30%_30%,rgba(124,58,237,0.35),transparent_60%)]" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 32 32"
          fill="none"
          className="relative z-[1]"
        >
          <path
            d="M16 2.2 27.6 8.9v14.2L16 29.8 4.4 23.1V8.9L16 2.2Z"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
          />
          <path
            d="M11 21.5c4.8 2.6 10.6.8 12.8-3.9"
            stroke="rgba(59,130,246,0.85)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="leading-none">
        <span className="text-xl font-semibold tracking-tight text-white">
          Danilo
        </span>
        <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-indigo-500/0 via-blue-500/70 to-indigo-500/0" />
      </div>
    </div>
  );
}

export default function Header() {
  const reduceMotion = useReducedMotion();
  const { active, setActive } = useScrollSpyActiveKey({
    defaultKey: 'home',
    threshold: 0.55,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  // ESC closes mobile menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.7, ease: SMOOTH_EASE, staggerChildren: 0.08 },
      },
    }),
    [reduceMotion]
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
      show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.6, ease: SMOOTH_EASE },
      },
    }),
    [reduceMotion]
  );

  return (
    <header
      id="home"
      className={cn(
        'relative isolate min-h-[100svh] overflow-hidden',
        'bg-[#070811] text-white'
      )}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_35%_40%,rgba(59,130,246,0.25),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_65%_10%,rgba(124,58,237,0.22),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 via-black/15 to-transparent" />
        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_70%_at_50%_45%,transparent_10%,rgba(0,0,0,0.55)_85%)]" />
      </div>

      {/* Optional 3D layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeaderScene />
      </div>

      {/* Top nav */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <motion.nav
          initial="hidden"
          animate="show"
          variants={container}
          className={cn(
            'relative flex items-center justify-between rounded-2xl',
            'border border-white/10 bg-white/[0.04] backdrop-blur-xl',
            'shadow-[0_20px_80px_rgba(0,0,0,0.55)]'
          )}
          aria-label="Navegação principal"
        >
          {/* Neon strokes (top/bottom) */}
          <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-indigo-500/0" />
          <div className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0" />
          {/* right highlight (fidelidade visual) */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-36 rounded-2xl bg-[radial-gradient(60%_60%_at_70%_40%,rgba(124,58,237,0.22),transparent_70%)]" />

          <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
            <motion.div variants={item}>
              <Link
                href="#home"
                onClick={() => setActive('home')}
                className="group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-xl"
              >
                <BrandMark />
                <span className="sr-only">Ir para o início</span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 px-6 py-4 md:flex">
            {NAV_ITEMS.map((it) => {
              const isActive = it.key === active;
              return (
                <motion.div variants={item} key={it.key} className="relative">
                  <Link
                    href={it.href}
                    onClick={() => setActive(it.key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative text-sm font-medium tracking-wide transition',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md',
                      isActive
                        ? 'text-blue-400'
                        : 'text-white/80 hover:text-white'
                    )}
                  >
                    {it.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.85)]"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.35, ease: SMOOTH_EASE }
                        }
                      />
                    ) : null}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile button */}
          <div className="flex items-center px-4 py-4 md:hidden">
            <motion.button
              variants={item}
              type="button"
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                'inline-flex items-center justify-center rounded-xl p-3',
                'bg-white/5 ring-1 ring-white/10 backdrop-blur-xl',
                'transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70'
              )}
            >
              <span className="sr-only">
                {mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={
                    mobileOpen
                      ? 'M6 6l12 12M18 6 6 18'
                      : 'M4 7h16M4 12h16M4 17h16'
                  }
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile menu (overlay) */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: reduceMotion ? { duration: 0 } : { duration: 0.18 },
              }}
              exit={{
                opacity: 0,
                transition: reduceMotion ? { duration: 0 } : { duration: 0.14 },
              }}
              className="fixed inset-0 z-50 md:hidden"
              aria-hidden={!mobileOpen}
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/55"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
              />
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                initial={{ y: -10, opacity: 0, scale: 0.99 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: SMOOTH_EASE },
                }}
                exit={{
                  y: -10,
                  opacity: 0,
                  scale: 0.99,
                  transition: reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.18, ease: SMOOTH_EASE },
                }}
                className={cn(
                  'relative mx-auto mt-6 w-[min(92vw,520px)] overflow-hidden rounded-2xl',
                  'border border-white/10 bg-white/[0.05] backdrop-blur-xl',
                  'shadow-[0_20px_80px_rgba(0,0,0,0.65)]'
                )}
              >
                <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-indigo-500/0" />
                <div className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0" />

                <div className="flex items-center justify-between px-4 py-4">
                  <Link
                    href="#home"
                    onClick={() => {
                      setActive('home');
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                  >
                    <BrandMark />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl p-3 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                  >
                    <span className="sr-only">Fechar</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 6l12 12M18 6 6 18"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-1 p-3">
                  {NAV_ITEMS.map((it) => {
                    const isActive = it.key === active;
                    return (
                      <Link
                        key={it.key}
                        href={it.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => {
                          setActive(it.key);
                          setMobileOpen(false);
                        }}
                        className={cn(
                          'rounded-xl px-4 py-3 text-sm font-medium transition',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                          isActive
                            ? 'bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20'
                            : 'text-white/85 hover:bg-white/5'
                        )}
                      >
                        {it.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="px-4 pb-4 pt-1">
                  <Link
                    href="#sobre"
                    onClick={() => {
                      setActive('sobre');
                      setMobileOpen(false);
                    }}
                    className={cn(
                      'group inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium',
                      'bg-blue-600/80 text-white ring-1 ring-white/10 backdrop-blur',
                      'shadow-[0_12px_55px_rgba(59,130,246,0.25)]',
                      'transition hover:bg-blue-500/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70'
                    )}
                  >
                    <span className="tracking-wide">get to know me better</span>
                    <span
                      className={cn(
                        'grid size-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15',
                        'transition group-hover:bg-white/15 group-hover:ring-white/20'
                      )}
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 17 17 7M9 7h8v8"
                          stroke="rgba(255,255,255,0.92)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Hero */}
      <div className="mx-auto grid w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 pt-8 sm:pt-14"
        >
          <motion.p
            variants={item}
            className="text-center text-[11px] font-medium tracking-[0.35em] text-white/25"
          >
            [BRAND AWARENESS]
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8"
          >
            <GhostIcon />

            <div className="text-center md:text-left">
              <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.08)]">
                  Design,
                </span>{' '}
                <span className="text-white/25">não é</span>
                <br />
                <span className="text-white drop-shadow-[0_0_22px_rgba(59,130,246,0.15)]">
                  só
                </span>{' '}
                <span className="bg-gradient-to-r from-white/35 via-white/25 to-white/20 bg-clip-text text-transparent">
                  estética.
                </span>
              </h1>

              <p className="mt-5 max-w-[44ch] text-pretty text-sm text-white/28 sm:text-base">
                [É intenção, é estratégia e experiência.]
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-2 flex flex-col items-center gap-5"
          >
            <Link
              href="#sobre"
              onClick={() => setActive('sobre')}
              className={cn(
                'group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium',
                'bg-blue-600/80 text-white ring-1 ring-white/10 backdrop-blur',
                'shadow-[0_12px_55px_rgba(59,130,246,0.35)]',
                'transition hover:bg-blue-500/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70'
              )}
            >
              <span className="tracking-wide">get to know me better</span>
              <span
                className={cn(
                  'grid size-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15',
                  'transition group-hover:bg-white/15 group-hover:ring-white/20'
                )}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="rgba(255,255,255,0.92)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Bottom-right "showcase" card */}
          <motion.div
            variants={item}
            className="pointer-events-none hidden md:block"
          >
            <div className="pointer-events-none absolute bottom-10 right-6 lg:right-10">
              <div className="relative pointer-events-auto">
                <div className="absolute -left-9 -top-8 text-white/70">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4v8c0 4.418 3.582 8 8 8h8"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 20 15 15M20 20 15 20M20 20 20 15"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <Link
                  href="#showcase"
                  onClick={() => setActive('showcase')}
                  className={cn(
                    'block w-[240px] overflow-hidden rounded-2xl',
                    'border border-white/10 bg-white/[0.04] backdrop-blur-xl',
                    'shadow-[0_18px_80px_rgba(0,0,0,0.55)]',
                    'transition hover:bg-white/[0.06]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70'
                  )}
                >
                  <div className="relative aspect-[16/10]">
                    {/* If you have a real asset, you can place it here as an <img> background layer. */}
                    <div className="absolute inset-0 bg-[radial-gradient(80%_90%_at_30%_30%,rgba(59,130,246,0.28),transparent_65%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.14),rgba(59,130,246,0.10),transparent_70%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-medium text-white/80">
                        Strategy
                      </p>
                      <p className="mt-1 text-[11px] text-white/45">
                        Clique para ver o showcase
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
