// src/components/header/MobileStaggeredMenu.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import FluidGlass from './webgl/FluidGlass';

type NavItem = { label: string; href: string };

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={[
          'absolute left-0 top-0 h-[2px] w-6 bg-white/90 transition-transform duration-300',
          open ? 'translate-y-[9px] rotate-45' : '',
        ].join(' ')}
      />
      <span
        className={[
          'absolute left-0 top-[9px] h-[2px] w-6 bg-white/90 transition-opacity duration-300',
          open ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      />
      <span
        className={[
          'absolute left-0 top-[18px] h-[2px] w-6 bg-white/90 transition-transform duration-300',
          open ? 'translate-y-[-9px] -rotate-45' : '',
        ].join(' ')}
      />
    </div>
  );
}

export default function MobileStaggeredMenu() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (wrapRef.current) setEventSource(wrapRef.current);
  }, []);

  const nav = useMemo<NavItem[]>(
    () => [
      { label: 'home', href: '/' },
      { label: 'sobre', href: '/sobre' },
      { label: 'portfolio showcase', href: '/portfolio' },
      { label: 'contato', href: '/#contato' },
    ],
    []
  );

  return (
    <>
      <header className="fixed left-1/2 top-4 z-80 w-[min(720px,calc(100vw-1.5rem))] -translate-x-1/2 md:hidden">
        <div
          ref={wrapRef}
          className="relative h-14 overflow-hidden rounded-[24px]"
        >
          {/* WEBGL GLASS - Agora apenas 'bar' */}
          <FluidGlass
            mode="bar"
            eventSource={eventSource}
            followPointer={!reduceMotion}
            className="pointer-events-none absolute inset-0 h-full w-full"
            barProps={{
              ior: 1.14,
              thickness: 9,
              chromaticAberration: 0.08,
              anisotropy: 0.06,
              distortion: 0.28,
              distortionScale: 0.28,
              temporalDistortion: 0.12,
              samples: 8,
              resolution: 384,
              ampX: 0.1,
              ampY: 0.06,
              rotX: 0.05,
              rotY: 0.06,
              barWidth: 0.99,
              barHeight: 0.92,
            }}
          />

          {/* “casing”/glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/10" />
          <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-linear-to-r from-transparent via-sky-400/80 to-transparent opacity-70" />

          {/* CONTENT */}
          <div className="relative z-10 flex h-full items-center justify-between px-5">
            <Link
              href="/"
              className="text-[18px] font-semibold tracking-tight text-white/90"
            >
              Danilo
            </Link>

            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-75 md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
            />

            <motion.nav
              aria-label="Menu"
              className="relative mx-auto mt-24 w-[min(720px,calc(100vw-1.5rem))] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              initial={reduceMotion ? false : { y: -10, opacity: 0 }}
              animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col p-4">
                {nav.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { x: -10, opacity: 0 }}
                    animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: reduceMotion ? 0 : 0.04 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-[18px] font-medium tracking-tight text-white/85 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
