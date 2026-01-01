'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  durationMs = 800,
  label = 'Summoning spirits',
  className,
}: Props) {
  const [show, setShow] = useState(true);
  const reduced = useMemo(
    () =>
      (typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ||
      false,
    []
  );

  useEffect(() => {
    // Modo A: controlado por 'ready'
    if (typeof ready === 'boolean') {
      if (!ready) return;
      const t = setTimeout(() => setShow(false), reduced ? 200 : 1000);
      return () => clearTimeout(t);
    }
    // Modo B: compatibilidade com onComplete
    if (onComplete) {
      const t = setTimeout(
        () => {
          setShow(false);
          try {
            onComplete();
          } catch {}
        },
        Math.max(0, durationMs)
      );
      return () => clearTimeout(t);
    }
  }, [ready, onComplete, durationMs, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={
            'fixed inset-0 z-1000 grid place-items-center bg-[radial-gradient(ellipse_at_center,#0a0a0a,#1a1a1a_50%,#0a0a0a_100%)] ' +
            (className ?? '')
          }
          initial={{ opacity: 1 }}
          animate={{ opacity: ready ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 1.0, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <div className="text-center text-neutral-200 select-none">
            <div className="mx-auto mb-4 h-16 w-16">
              <Ghost />
            </div>
            <div className="text-[12px] uppercase tracking-widest opacity-80">
              {label}
            </div>
            <div className="mt-3 h-[4px] w-24 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full w-1/3 bg-white/80"
                animate={reduced ? {} : { x: ['0%', '200%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Ghost() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    >
      <path
        d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"
        fill="white"
        opacity="0.95"
      />
      <circle cx="208" cy="225" r="22" fill="black">
        <animate
          attributeName="r"
          values="22;27;22"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="297" cy="225" r="22" fill="black">
        <animate
          attributeName="r"
          values="22;27;22"
          dur="2s"
          begin="0.1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
