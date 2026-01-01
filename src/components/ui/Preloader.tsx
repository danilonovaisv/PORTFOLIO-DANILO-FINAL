'use client';
import { useEffect, useState } from 'react';
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
      const t = setTimeout(() => setShow(false), reduced ? 200 : 800);
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
        <motion.div
          className={
            'fixed inset-0 z-100 grid place-items-center bg-[#050505] ' +
            (className ?? '')
          }
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.3 : 0.8, ease: 'easeInOut' }}
          role="status"
          aria-live="polite"
        >
          <div className="text-center text-slate-100 select-none">
            {/* Ghost Flutuante */}
            <motion.div
              className="mx-auto mb-8 h-20 w-20"
              animate={
                reduced
                  ? {}
                  : {
                      y: [0, -8, 0],
                      opacity: [1, 0.9, 1],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Ghost />
            </motion.div>

            {/* Texto Pulsante */}
            <motion.p
              className="text-[11px] font-medium uppercase tracking-[0.3em] text-cyan-400/80 mb-6"
              animate={reduced ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {label}
            </motion.p>

            {/* Barra de Progresso Gradient */}
            <div className="mx-auto w-32 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: durationMs / 1000,
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
      className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
    >
      <path
        d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"
        fill="white"
        opacity="0.95"
      />
      <circle cx="208" cy="225" r="22" fill="black" />
      <circle cx="297" cy="225" r="22" fill="black" />
    </svg>
  );
}
