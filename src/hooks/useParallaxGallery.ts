'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const LERP_EASING = 0.08;

/**
 * Performs linear interpolation.
 * @param start - The start value.
 * @param end - The end value.
 * @param t - The interpolation factor.
 * @returns The interpolated value.
 */
const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

/**
 * Custom hook to create a smooth, LERP-based scroll effect for a fixed gallery.
 * This hook manages the animation loop and the height of the scrollable area.
 *
 * @returns A ref to be attached to the gallery's track element.
 */
export function useLERPGalleryScroll<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use refs to store state that changes frequently without causing re-renders.
  const scrollState = useRef({
    currentY: 0,
    targetY: 0,
    rafId: 0,
  });

  useEffect(() => {
    if (prefersReducedMotion || !trackRef.current) {
      return;
    }

    const track = trackRef.current;
    const gallery = document.querySelector('.gallery') as HTMLElement; // Wrapper element

    const updateHeight = () => {
      if (gallery && track) {
        // Set the height of the gallery wrapper to the height of the fixed track,
        // creating the scrollable space.
        gallery.style.height = `${track.clientHeight}px`;
      }
    };

    const handleScroll = () => {
      scrollState.current.targetY = window.scrollY;
    };

    const animationLoop = () => {
      const { currentY, targetY } = scrollState.current;

      // Interpolate the current scroll position towards the target.
      const newY = lerp(currentY, targetY, LERP_EASING);
      scrollState.current.currentY = newY;

      // Apply the transform to the track element for the parallax effect.
      track.style.transform = `translateY(-${newY}px)`;

      // Continue the animation loop.
      scrollState.current.rafId = requestAnimationFrame(animationLoop);

      // Stop the loop if the scroll position has stabilized.
      if (Math.abs(targetY - newY) < 0.1) {
        cancelAnimationFrame(scrollState.current.rafId);
        scrollState.current.rafId = 0;
      }
    };

    const startAnimationLoop = () => {
      if (scrollState.current.rafId === 0) {
        scrollState.current.rafId = requestAnimationFrame(animationLoop);
      }
    };

    const init = () => {
      updateHeight();
      handleScroll();
      startAnimationLoop();
    };

    // Set initial height and start the loop.
    updateHeight();

    window.addEventListener('scroll', init, { passive: true });
    window.addEventListener('resize', updateHeight, { passive: true });

    // Use a ResizeObserver to adjust height when content changes (e.g., filtering).
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(track);

    return () => {
      window.removeEventListener('scroll', init);
      window.removeEventListener('resize', updateHeight);
      cancelAnimationFrame(scrollState.current.rafId);
      resizeObserver.disconnect();
      if (gallery) {
        gallery.style.height = 'auto';
      }
    };
  }, [prefersReducedMotion]);

  return trackRef;
}

/**
 * Custom hook to apply a parallax effect to a card's image wrapper.
 * It calculates the vertical translation based on the card's position in the viewport.
 *
 * @returns A ref to be attached to the card's image wrapper element.
 */
export function useParallaxCard<
  WrapperEl extends HTMLElement = HTMLDivElement,
  CardEl extends HTMLElement = HTMLDivElement,
>(enabled = true) {
  const wrapperRef = useRef<WrapperEl>(null);
  const cardRef = useRef<CardEl>(null); // Ref for the parent card
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (
      prefersReducedMotion ||
      !enabled ||
      !wrapperRef.current ||
      !cardRef.current
    ) {
      return;
    }

    const wrapper = wrapperRef.current;
    const card = cardRef.current;

    const parallaxEffect = () => {
      const wrapperHeight = wrapper.offsetHeight;
      const cardHeight = card.offsetHeight;
      const diff = cardHeight - wrapperHeight;
      const { top } = card.getBoundingClientRect();
      const progress = top / window.innerHeight;
      const yPos = diff * progress;

      wrapper.style.transform = `translateY(${yPos}px)`;
    };

    const rafId = requestAnimationFrame(function animationLoop() {
      parallaxEffect();
      requestAnimationFrame(animationLoop);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [enabled, prefersReducedMotion]);

  // We need to return both refs to be attached to the correct elements.
  return { wrapperRef, cardRef };
}
