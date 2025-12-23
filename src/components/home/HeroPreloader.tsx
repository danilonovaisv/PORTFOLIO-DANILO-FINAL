// src/components/home/HeroPreloader.tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="ghost-loader mb-12">
        <motion.svg
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="ghost-svg"
          height="100"
          viewBox="0 0 512 512"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="ghost-body"
            d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"
            fill="#0057FF"
          />
          <circle
            className="ghost-eye left-eye"
            cx="208"
            cy="225"
            r="22"
            fill="black"
          />
          <circle
            className="ghost-eye right-eye"
            cx="297"
            cy="225"
            r="22"
            fill="black"
          />
        </motion.svg>
      </div>
      <div className="loading-text font-mono text-[10px] uppercase tracking-[0.5em] text-[#888888] mb-6">
        Summoning spirits
      </div>
      <div className="loading-progress w-32 h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="progress-bar h-full bg-[#0057FF]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
