'use client';
import { useEffect, useRef, useState } from 'react';
import { lerp } from '@/lib/utils';

/**
 * LERP-based scroll smoother for fixed gallery track.
 * Maintains track translation with eased scroll value and updates wrapper height.
 * The gallery becomes fixed only when it enters the viewport.
 */
type TrackRef =
  | React.RefObject<HTMLElement | null>
  | React.MutableRefObject<HTMLElement | null>;
type GalleryRef =
  | React.RefObject<HTMLElement | null>
  | React.MutableRefObject<HTMLElement | null>;

export type ScrollState = 'pre' | 'fixed' | 'post';

export const useLERPScroll = (
  trackRef: TrackRef,
  galleryRef: GalleryRef,
  enabled = true
) => {
  const [scrollState, setScrollState] = useState<ScrollState>('pre');
  const startY = useRef(0);
  const endY = useRef(0);
  const rafId = useRef<number | null>(null);
  const heroOffset = useRef(0);
  const maxScroll = useRef(0);
  const stickyState = useRef<ScrollState | 'idle'>('idle');
  const stickyTopOffset = useRef(88);

  useEffect(() => {
    if (!enabled) {
      setScrollState('pre');
      return undefined;
    }

    const track = trackRef.current;
    const gallery = galleryRef.current;

    if (!track || !gallery) {
      return undefined;
    }

    const resolveStickyTop = () => (window.innerWidth >= 768 ? 96 : 88);

    // Calculate gallery start offset from page top
    const calculateHeroOffset = () => {
      const galleryRect = gallery.getBoundingClientRect();
      const currentScroll = window.scrollY;
      heroOffset.current = galleryRect.top + currentScroll;
    };

    const updateHeight = () => {
      stickyTopOffset.current = resolveStickyTop();

      const trackHeight = track.scrollHeight;
      const viewportHeight = window.innerHeight;
      const availableViewport = Math.max(
        1,
        viewportHeight - stickyTopOffset.current
      );

      maxScroll.current = Math.max(0, trackHeight - availableViewport);
      const wrapperHeight =
        maxScroll.current > 0
          ? trackHeight + stickyTopOffset.current
          : trackHeight;

      gallery.style.height = `${wrapperHeight}px`;
    };

    const animate = () => {
      startY.current = lerp(startY.current, endY.current, 0.05);

      const rawOffset = startY.current - heroOffset.current;
      const hasScrollableRange = maxScroll.current > 0.5;
      const clampedOffset = hasScrollableRange
        ? Math.max(0, Math.min(rawOffset, maxScroll.current))
        : 0;
      const active =
        hasScrollableRange &&
        rawOffset >= 0 &&
        rawOffset <= maxScroll.current + 0.5;

      const newScrollState: ScrollState = active
        ? 'fixed'
        : rawOffset > maxScroll.current + 0.5
          ? 'post'
          : 'pre';

      if (stickyState.current !== newScrollState) {
        stickyState.current = newScrollState;
        setScrollState(newScrollState);

        // Reset transform if not fixed to avoid conflicting with CSS positioning
        if (newScrollState !== 'fixed' && track) {
          track.style.transform = '';
        }
      }

      if (track && newScrollState === 'fixed') {
        track.style.transform = `translateY(-${clampedOffset}px)`;
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

    const onResize = () => {
      calculateHeroOffset();
      updateHeight();
      endY.current = window.scrollY;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const onLoad = () => {
      calculateHeroOffset();
      updateHeight();
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
    startY.current = window.scrollY;
    endY.current = window.scrollY;
    rafId.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      resizeObserver.disconnect();

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      // Reset inline styles
      if (track) track.style.transform = '';
      if (gallery) gallery.style.height = 'auto';
      stickyState.current = 'pre';
      setScrollState('pre');
    };
  }, [enabled, galleryRef, trackRef]);

  return { galleryRef, scrollState } as const;
};
