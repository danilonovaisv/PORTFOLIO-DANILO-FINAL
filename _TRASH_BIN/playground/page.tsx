'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LayoutPlayground() {
  const [opacity, setOpacity] = useState(0.5);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [blendMode, setBlendMode] = useState<string>('normal');

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Control Panel */}
      <div className="fixed bottom-10 left-1/2 z-9999 -translate-x-1/2 flex items-center gap-6 rounded-full bg-black/90 px-8 py-4 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="opacity-slider"
            className="text-[10px] uppercase tracking-widest text-white/50 font-mono"
          >
            Reference Opacity
          </label>
          <input
            id="opacity-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-32 accent-[#0057FF]"
            title="Adjust Reference Opacity"
          />
        </div>

        <button
          onClick={() => setIsOverlayVisible(!isOverlayVisible)}
          className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase transition-all tracking-tighter ${isOverlayVisible ? 'bg-[#0057FF] text-white' : 'bg-white/10 text-white'}`}
        >
          {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
        </button>

        <div className="flex items-center gap-2">
          <label
            htmlFor="blend-selector"
            className="text-[10px] uppercase text-white/50 font-mono"
          >
            Blend:
          </label>
          <select
            id="blend-selector"
            value={blendMode}
            onChange={(e) => setBlendMode(e.target.value)}
            className="bg-transparent text-white text-[10px] border-none focus:ring-0 uppercase font-bold px-0 py-0"
            title="Choose Mix Blend Mode"
          >
            <option value="normal">Normal</option>
            <option value="difference">Difference</option>
            <option value="screen">Screen</option>
            <option value="multiply">Multiply</option>
          </select>
        </div>
      </div>

      {/* The Live Implementation (Current Page Content) */}
      <div className="relative z-10 w-full pointer-events-none">
        {/* We use an iframe to render the actual homepage here for comparison */}
        <iframe
          src="/"
          className="w-full min-h-screen border-none h-[500vh]"
          title="Live Implementation"
        />
      </div>

      {/* The Reference Image Overlay */}
      {isOverlayVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          animate={{
            opacity,
            mixBlendMode: blendMode as any,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-full h-full max-w-[1680px] mx-auto">
            <Image
              src="/referencia/HOME-PORTFOLIO-BLACK---GHOST.jpg"
              alt="Layout Reference"
              fill
              className="object-top object-contain"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* Helper Legend */}
      <div className="fixed top-10 right-10 z-9999 bg-black/80 p-4 rounded-lg border border-white/10 backdrop-blur-md">
        <h4 className="text-[#0057FF] font-bold text-xs uppercase mb-2">
          Playground Tools
        </h4>
        <p className="text-white/60 text-[10px] leading-relaxed max-w-[200px]">
          Use this overlay to find misalignment between the current
          implementation and the absolute reference. Toggle{' '}
          <strong>Difference</strong> blend mode to see exactly where pixels
          don't match.
        </p>
      </div>
    </div>
  );
}
