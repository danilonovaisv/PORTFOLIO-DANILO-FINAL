'use client';

import { useEffect, useRef } from 'react';

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

/**
 * LERP-based scroll smoother for a fixed gallery track.
 * It keeps the track translated with an eased scroll value and
 * updates the wrapper height so the page retains native scroll.
 */
type TrackRef =
  | React.RefObject<HTMLElement | null>
  | React.MutableRefObject<HTMLElement | null>;

export const useLERPScroll = (
  trackRef: TrackRef,
  enabled = true
) => {
  const startY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    // Resolve the gallery wrapper (main element with class "gallery")
    if (!galleryRef.current) {
      galleryRef.current = document.querySelector('.gallery');
    }

    const track = trackRef.current;
    const gallery = galleryRef.current;

    if (!track || !gallery) {
      return undefined;
    }

    const updateHeight = () => {
      gallery.style.height = `${track.clientHeight}px`;
    };

    const animate = () => {
      startY.current = lerp(startY.current, targetY.current, 0.05);

      track.style.transform = `translateY(-${startY.current}px)`;

      if (Math.abs(startY.current - targetY.current) > 0.35) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        rafId.current = null;
      }
    };

    const onScroll = () => {
      targetY.current = window.scrollY;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    // Keep height in sync when content changes
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(track);

    updateHeight();
    targetY.current = window.scrollY;
    rafId.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      // Reset inline styles so SSR/hydration don't keep stale transforms
      track.style.transform = '';
      gallery.style.height = 'auto';
    };
  }, [enabled, trackRef]);

  return { galleryRef } as const;
};
