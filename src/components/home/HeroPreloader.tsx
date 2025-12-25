'use client';

import { AnimatePresence, motion } from 'framer-motion';

type HeroPreloaderProps = {
  isVisible: boolean;
};

export default function HeroPreloader({ isVisible }: HeroPreloaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#0f112b] text-[#e0e0e0]"
        >
          <motion.div
            className="mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <svg
              className="drop-shadow-[0_0_30px_rgba(0,87,255,0.45)]"
              width="88"
              height="88"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"
                fill="white"
              />
              <motion.circle
                cx="208"
                cy="225"
                r="22"
                fill="#0d0f29"
                animate={{ opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="297"
                cy="225"
                r="22"
                fill="#0d0f29"
                animate={{ opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />
            </svg>
          </motion.div>

          <motion.div
            className="font-mono text-[11px] uppercase tracking-[0.3em]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            Summoning spirits
          </motion.div>

          <div className="mt-6 h-0.5 w-24 overflow-hidden rounded-full bg-[#12132e]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0057FF] via-[#2c7bff] to-[#5227FF]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
