'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Film } from 'lucide-react';

interface HTMLVideoBlockProps {
  html?: string;
  media?: string;
  title?: string;
  className?: string;
}

export function HTMLVideoBlock({
  html,
  media,
  title = 'HTML Video Preview',
  className = '',
}: HTMLVideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  // If html contains a full HTML document (e.g., <!DOCTYPE html> or <html> tag), render as srcDoc iframe
  const isFullHtmlDoc = Boolean(
    html && (html.includes('<!DOCTYPE') || html.includes('<html') || html.includes('<script'))
  );

  useEffect(() => {
    if (isFullHtmlDoc || !media || html) return;

    // Interactive Scroll Video Simulation for image track
    const cycleDuration = 10000; // 10 seconds per loop
    const scrollDistance = 1200; // estimated vertical scroll distance

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        const pixelsPerMs = (scrollDistance / cycleDuration) * speed;
        offsetRef.current = (offsetRef.current + pixelsPerMs * delta) % scrollDistance;
        const currentProgress = (offsetRef.current / scrollDistance) * 100;
        setProgress(currentProgress);

        if (trackRef.current) {
          trackRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
        }
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed, media, html, isFullHtmlDoc]);

  // Case 1: Full HTML document or custom embed markup provided
  if (html) {
    if (isFullHtmlDoc) {
      return (
        <div className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl ${className}`}>
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/90 px-4 py-2 text-xs text-white/70 font-mono">
            <span className="flex items-center gap-2">
              <Film size={14} className="text-bluePrimary" />
              {title}
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
              HTML_VIDEO
            </span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden">
            <iframe
              srcDoc={html}
              title={title}
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl ${className}`}>
        <div className="p-4" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  // Case 2: Interactive Scroll Video Preview using media asset (like attached CONIB example)
  if (media) {
    return (
      <div className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl ${className}`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/95 px-6 py-3 font-mono text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-bluePrimary" />
            <span className="font-semibold tracking-wider">{title}</span>
          </div>
          <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] tracking-widest text-white/60">
            16:9 • LOOP
          </span>
        </div>

        {/* Video / Scroll Viewport */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
          <div ref={trackRef} className="absolute left-0 top-0 w-full will-change-transform">
            <img src={media} alt={title} className="block w-full h-auto" />
            <img src={media} alt={`${title} loop`} className="block w-full h-auto" />
          </div>

          {/* Vignette Gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0f]/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />

          {/* Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#0a0a0f]/95 px-6 py-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-[#0a0a0f]"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                offsetRef.current = 0;
                setProgress(0);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
              title="Reset"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Speed Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-wider text-white/40 uppercase">Vel</span>
            {[0.5, 1, 2, 3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all ${
                  speed === s
                    ? 'border-white/30 bg-white/20 text-white'
                    : 'border-white/10 bg-transparent text-white/50 hover:text-white'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback when neither html nor media is provided
  return (
    <div className="flex min-h-[220px] w-full items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 text-center font-mono text-xs text-white/60">
      HTML_VIDEO_NODE: No code or media provided
    </div>
  );
}
