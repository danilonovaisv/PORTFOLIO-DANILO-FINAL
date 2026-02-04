'use client';

import { useEffect, useRef, useState } from 'react';
import { lerp } from '@/utils/math';

/**
 * LERP-based scroll smoother for a fixed gallery track.
 * It keeps the track translated with an eased scroll value and
 * updates the wrapper height so the page retains native scroll.
 * The gallery becomes fixed only when it enters the viewport.
 */
type TrackRef =
  | React.RefObject<HTMLElement | null>
  | React.MutableRefObject<HTMLElement | null>;

export const useLERPScroll = (trackRef: TrackRef, enabled = true) => {
  const [isSticky, setIsSticky] = useState(false);
  const startY = useRef(0);
  const endY = useRef(0);
  const rafId = useRef<number | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const heroOffset = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setIsSticky(false);
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

    // Calculate hero offset - distance from page top to gallery section
    const calculateHeroOffset = () => {
      const galleryRect = gallery.getBoundingClientRect();
      const currentScroll = window.scrollY;
      // The gallery's position from document top
      heroOffset.current = galleryRect.top + currentScroll;
    };

    const updateHeight = () => {
      // Total scrollable height = track height + hero offset
      // Added a small buffer to avoid jitter at the end
      gallery.style.height = `${track.clientHeight + heroOffset.current}px`;
    };

    const animate = () => {
      startY.current = lerp(startY.current, endY.current, 0.05);

      // Determine sticky state based on eased scroll
      const active = startY.current >= heroOffset.current;
      setIsSticky(active);

      // Only translate when scrolled past hero
      const scrollOffset = Math.max(0, startY.current - heroOffset.current);
      if (track) {
        track.style.transform = `translateY(-${scrollOffset}px)`;
      }

      if (Math.abs(startY.current - endY.current) > 0.1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        rafId.current = null;
      }
    };

    const onScroll = () => {
      endY.current = window.scrollY;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    // Keep height in sync when content changes
    const resizeObserver = new ResizeObserver(() => {
      calculateHeroOffset();
      updateHeight();
    });
    resizeObserver.observe(track);

    // Initial setup
    calculateHeroOffset();
    updateHeight();
    endY.current = window.scrollY;
    rafId.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      calculateHeroOffset();
      updateHeight();
    });
    window.addEventListener('load', () => {
      calculateHeroOffset();
      updateHeight();
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('load', updateHeight);
      resizeObserver.disconnect();

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      // Reset inline styles
      if (track) track.style.transform = '';
      if (gallery) gallery.style.height = 'auto';
    };
  }, [enabled, trackRef]);

  return { galleryRef, isSticky } as const;
};
