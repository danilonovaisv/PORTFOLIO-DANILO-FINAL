'use client';
import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import { BRAND } from '@/config/brand';
import { GHOST_EASE, MOTION_TOKENS, GHOST_EASE_SOFT_UI } from '@/config/motion';
import { Z_INDEX } from '@/config/z-indices';

const hexToRgba = (hex: string, alpha = 1) => {
  const cleaned = hex.replace('#', '');
  const longHex =
    cleaned.length === 3
      ? cleaned.replace(/./g, (char) => char + char)
      : cleaned;
  const numeric = parseInt(longHex, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const primaryShadowColor = hexToRgba(BRAND.colors.bluePrimary, 0.45);
const accentShadowColor = hexToRgba(BRAND.colors.blueAccent, 0.6);

type Props = {
  /** Controlado: some quando `ready === true` */
  ready?: boolean;
  /** Compatibilidade: encerra sozinho e chama callback */
  onComplete?: () => void;
  /** Duração usada com `onComplete` (ms) */
  durationMs?: number;
  label?: string;
  className?: string;
};

export function Preloader({
  ready,
  onComplete,
  durationMs = 2000,
  label = 'Summoning spirits',
  className,
}: Props) {
  const [show, setShow] = useState(true);

  // Detecção de movimento reduzido
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Modo A: controlado por 'ready'
    if (typeof ready === 'boolean') {
      if (!ready) return;
      const t = setTimeout(
        () => setShow(false),
        reduced ? 200 : (MOTION_TOKENS.duration.normal as number) * 1000
      );
      return () => clearTimeout(t);
    }
    // Modo B: compatibilidade com onComplete
    if (onComplete) {
      const t = setTimeout(() => {
        setShow(false);
        try {
          onComplete();
        } catch {}
      }, durationMs);
      return () => clearTimeout(t);
    }
  }, [ready, onComplete, durationMs, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className={
            'fixed inset-0 grid place-items-center bg-linear-to-b from-background to-neutral ' +
            (className ?? '')
          }
          style={{ zIndex: Z_INDEX.preloader }}
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{
            duration: reduced ? 0.3 : (MOTION_TOKENS.duration.textIn as number),
            ease: GHOST_EASE,
          }}
          role="status"
          aria-live="polite"
        >
          <div className="text-center text-text select-none">
            {/* Ghost Flutuante */}
            <m.div
              className="mx-auto mb-10 h-24 w-24"
              animate={
                reduced
                  ? {}
                  : {
                      y: [0, -12, 0],
                      opacity: [0.95, 1, 0.95],
                      filter: [
                        `drop-shadow(0 0 15px ${primaryShadowColor})`,
                        `drop-shadow(0 0 25px ${accentShadowColor})`,
                        `drop-shadow(0 0 15px ${primaryShadowColor})`,
                      ],
                    }
              }
              transition={{
                duration: MOTION_TOKENS.duration.slow,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Ghost />
            </m.div>

            {/* Texto Pulsante */}
            <m.p
              className="text-[14px] font-mono font-medium uppercase tracking-[0.35em] text-textSecondary mb-8"
              animate={reduced ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: MOTION_TOKENS.duration.ghostIn as number,
                repeat: Infinity,
                ease: GHOST_EASE,
              }}
            >
              {label.toUpperCase()}
            </m.p>

            {/* Barra de Progresso Gradient */}
            <div className="mx-auto w-40 h-px bg-text/20 rounded-full overflow-hidden">
              <m.div
                className="h-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.colors.bluePrimary} 0%, ${BRAND.colors.blueAccent} 100%)`,
                  boxShadow: `0 0 12px ${primaryShadowColor}`,
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: durationMs / 1000,
                  ease: GHOST_EASE_SOFT_UI as any,
                }}
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Ghost() {
  return (
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <path
        d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"
        fill={BRAND.colors.text}
        opacity="0.95"
      />
      <circle cx="208" cy="225" r="22" fill={BRAND.colors.neutral} />
      <circle cx="297" cy="225" r="22" fill={BRAND.colors.neutral} />
    </svg>
  );
}
