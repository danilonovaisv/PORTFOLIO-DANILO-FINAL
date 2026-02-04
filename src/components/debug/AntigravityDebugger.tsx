'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAntigravityStore } from '@/store/antigravity.store';

export const AntigravityDebugger: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const store = useAntigravityStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (
    !mounted ||
    process.env.NODE_ENV !== 'development' ||
    !store.flags.debugMode
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-9999 bg-black/90 text-[10px] font-mono p-3 rounded-lg border border-white/10 shadow-2xl backdrop-blur-md text-white w-52">
      <div className="mb-2 uppercase tracking-wider text-neutral-500 font-bold border-b border-white/10 pb-1 flex justify-between">
        Antigravity System
        <span className="text-green-500">●</span>
      </div>

      {/* Narrative State */}
      <div className="mb-3">
        <label className="text-neutral-500 block">Narrative State</label>
        <div className="text-blue-400 font-bold text-xs">
          {store.narrativeState}
        </div>
        <div className="w-full bg-neutral-800 h-1 mt-1 rounded overflow-hidden">
          <motion.div
            className="bg-blue-500 h-full"
            style={{ width: `${store.scrollProgress * 100}%` }}
            transition={{ duration: 0.075, ease: 'linear' }} // Slight smooth
          />
        </div>
      </div>

      {/* Flags Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <FlagStatus label="WebGL" active={store.flags.mountWebGL} />
        <FlagStatus
          label="Manifesto"
          active={store.flags.enableManifestoScroll}
        />
        <FlagStatus
          label="Hover"
          active={store.flags.enableHoverInteractions}
        />
        <FlagStatus
          label="Reduced Motion"
          active={store.flags.reducedMotion}
          bg="bg-red-500"
        />
      </div>

      {/* Viewport */}
      <div>
        <label className="text-neutral-500 block">Viewport</label>
        <span className="text-neutral-300">
          {store.viewport.width}px × {store.viewport.height}px
        </span>
      </div>
    </div>
  );
};

const FlagStatus = ({
  label,
  active,
  bg = 'bg-green-500',
}: {
  label: string;
  active: boolean;
  bg?: string;
}) => (
  <div className="flex items-center justify-between bg-white/5 p-1 px-2 rounded">
    <span>{label}</span>
    <div className={`w-2 h-2 rounded-full ${active ? bg : 'bg-neutral-700'}`} />
  </div>
);
