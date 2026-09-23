'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Film, Maximize2, X } from 'lucide-react';
import { COLORS } from '@/config/colors';
import { cn } from '@/lib/utils';

interface HTMLVideoBlockProps {
  html?: string;
  media?: string;
  title?: string;
  className?: string;
  /** Quando true, remove o header bar, bordas e sombra — útil em landing pages e thumbnails */
  frameless?: boolean;
  preserveVideoFrame?: boolean;
  /** Permite alternância explícita de tela cheia sem cortes */
  allowFullscreenToggle?: boolean;
}

export function HTMLVideoBlock({
  html,
  media,
  title = 'HTML Video Preview',
  className = '',
  frameless = false,
  preserveVideoFrame = false,
  allowFullscreenToggle = true,
}: HTMLVideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const animRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  // Close fullscreen on ESC key
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // If html contains a full HTML document (e.g., <!DOCTYPE html> or <html> tag), render as srcDoc iframe
  const isFullHtmlDoc = Boolean(
    html && /<!doctype\b|<html\b|<script\b/i.test(html)
  );

  const sanitizedHtmlDoc = React.useMemo(() => {
    if (!html || !isFullHtmlDoc) return html;
    const darkInject = `
<style id="ghost-safe-bg">
  html, body {
    background-color: ${COLORS.background} !important;
    color-scheme: dark;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stage { background-color: ${COLORS.background} !important; opacity: 1 !important; }
  ${
    preserveVideoFrame || isFullscreen
      ? `
  video {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain !important;
    object-position: center !important;
    margin: auto !important;
    background: transparent !important;
  }
  `
      : ''
  }
</style>`;
    if (/<\/head\s*>/i.test(html)) {
      return html.replace(/<\/head\s*>/i, `${darkInject}</head>`);
    }
    return darkInject + html;
  }, [html, isFullHtmlDoc, preserveVideoFrame, isFullscreen]);

  const embeddedVideoClasses = preserveVideoFrame || isFullscreen
    ? '[&_video]:block [&_video]:h-full! [&_video]:w-full! [&_video]:max-h-full! [&_video]:max-w-full! [&_video]:object-contain! [&_video]:object-center! [&_video]:bg-transparent! [&_video]:m-auto!'
    : '';

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
        offsetRef.current =
          (offsetRef.current + pixelsPerMs * delta) % scrollDistance;
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

  // Fullscreen Overlay View
  const renderFullscreenOverlay = () => {
    if (!isFullscreen) return null;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Visualização em tela cheia do vídeo"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl"
      >
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 font-mono text-xs text-white shadow-2xl transition-all hover:border-bluePrimary hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-bluePrimary"
          aria-label="Sair da tela cheia"
        >
          <X size={16} />
          <span>Fechar</span>
        </button>

        <div className="relative flex h-full w-full max-h-[92vh] max-w-[96vw] items-center justify-center overflow-hidden">
          {isFullHtmlDoc ? (
            <iframe
              srcDoc={sanitizedHtmlDoc}
              title={`${title} (Tela cheia)`}
              style={{ backgroundColor: COLORS.background }}
              allow="autoplay"
              allowFullScreen
              className="h-full w-full border-0 bg-background"
              sandbox="allow-scripts allow-same-origin allow-popups allow-fullscreen"
            />
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-transparent',
                embeddedVideoClasses
              )}
              dangerouslySetInnerHTML={{ __html: html || '' }}
            />
          )}
        </div>
      </div>
    );
  };

  // Case 1: Full HTML document or custom embed markup provided
  if (html) {
    if (isFullHtmlDoc) {
      if (frameless) {
        return (
          <>
            <div
              className={cn(
                'group relative h-full w-full overflow-hidden bg-background flex items-center justify-center',
                className
              )}
            >
              {allowFullscreenToggle && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:border-bluePrimary hover:bg-white hover:text-black focus:opacity-100 focus:outline-none"
                  aria-label="Visualizar em tela cheia"
                  title="Tela cheia"
                >
                  <Maximize2 size={14} />
                </button>
              )}
              <iframe
                srcDoc={sanitizedHtmlDoc}
                title={title}
                style={{ backgroundColor: COLORS.background }}
                allow="autoplay"
                allowFullScreen
                className="h-full w-full border-0 bg-background"
                sandbox="allow-scripts allow-same-origin allow-popups allow-fullscreen"
              />
            </div>
            {renderFullscreenOverlay()}
          </>
        );
      }

      return (
        <>
          <div
            className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl ${className}`}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-background/90 px-4 py-2 text-xs text-white/70 font-mono">
              <span className="flex items-center gap-2">
                <Film size={14} className="text-bluePrimary" />
                {title}
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                  HTML_VIDEO
                </span>
                {allowFullscreenToggle && (
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    title="Tela cheia"
                  >
                    <Maximize2 size={12} />
                    <span className="hidden sm:inline">FULLSCREEN</span>
                  </button>
                )}
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden bg-background flex items-center justify-center">
              <iframe
                srcDoc={sanitizedHtmlDoc}
                title={title}
                style={{ backgroundColor: COLORS.background }}
                allow="autoplay"
                allowFullScreen
                className="h-full w-full border-0 bg-background"
                sandbox="allow-scripts allow-same-origin allow-popups allow-fullscreen"
              />
            </div>
          </div>
          {renderFullscreenOverlay()}
        </>
      );
    }

    if (frameless) {
      return (
        <>
          <div
            className={cn(
              'group relative h-full w-full overflow-hidden flex items-center justify-center bg-transparent',
              className,
              embeddedVideoClasses
            )}
          >
            {allowFullscreenToggle && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:border-bluePrimary hover:bg-white hover:text-black focus:opacity-100 focus:outline-none"
                aria-label="Visualizar em tela cheia"
                title="Tela cheia"
              >
                <Maximize2 size={14} />
              </button>
            )}
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-transparent',
                embeddedVideoClasses
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          {renderFullscreenOverlay()}
        </>
      );
    }

    return (
      <>
        <div
          className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl ${className}`}
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-background/90 px-4 py-2 text-xs text-white/70 font-mono">
            <span className="flex items-center gap-2">
              <Film size={14} className="text-bluePrimary" />
              {title}
            </span>
            {allowFullscreenToggle && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70 transition-all hover:bg-white/20 hover:text-white"
                title="Tela cheia"
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </button>
            )}
          </div>
          <div
            className={cn(
              'p-4 flex items-center justify-center bg-transparent',
              embeddedVideoClasses
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {renderFullscreenOverlay()}
      </>
    );
  }

  // Case 2: Interactive Scroll Video Preview using media asset (like attached CONIB example)
  if (media) {
    if (frameless) {
      return (
        <div
          className={`group relative w-full overflow-hidden bg-background ${className}`}
        >
          {/* Video / Scroll Viewport - frameless */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
            <div
              ref={trackRef}
              className="absolute left-0 top-0 w-full will-change-transform"
            >
              <img src={media} alt={title} className="block w-full h-auto" />
              <img
                src={media}
                alt={`${title} loop`}
                className="block w-full h-auto"
              />
            </div>

            {/* Vignette Gradients */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/60 to-transparent" />

            {/* Progress Bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-bluePrimary to-blueAccent transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl ${className}`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-background/95 px-6 py-3 font-mono text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-bluePrimary" />
            <span className="font-semibold tracking-wider">{title}</span>
          </div>
          <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] tracking-widest text-white/60">
            16:9 • LOOP
          </span>
        </div>

        {/* Video / Scroll Viewport */}
        <div className="relative aspect-video w-full overflow-hidden bg-background">
          <div
            ref={trackRef}
            className="absolute left-0 top-0 w-full will-change-transform"
          >
            <img src={media} alt={title} className="block w-full h-auto" />
            <img
              src={media}
              alt={`${title} loop`}
              className="block w-full h-auto"
            />
          </div>

          {/* Vignette Gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/60 to-transparent" />

          {/* Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-bluePrimary to-blueAccent transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-background/95 px-6 py-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-background"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={14} />
              ) : (
                <Play size={14} className="ml-0.5" />
              )}
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
            <span className="text-[10px] tracking-wider text-white/40 uppercase">
              Vel
            </span>
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
    <div className="flex min-h-[220px] w-full items-center justify-center rounded-2xl border border-white/10 bg-background p-6 text-center font-mono text-xs text-white/60">
      HTML_VIDEO_NODE: No code or media provided
    </div>
  );
}
