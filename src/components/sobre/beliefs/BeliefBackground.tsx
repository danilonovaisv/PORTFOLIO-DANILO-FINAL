import {
  BELIEF_BACKGROUND_STOPS,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BeliefBackground() {
  const { scrollYProgress } = useBeliefsScrollContext();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // We animate background color based on progress via GSAP inside the scroll hook
    // but here we can set a listener or just let the data-attribute drive it if we use CSS
    // For full rollback to the 'original' GSAP style, we'll use the onUpdate in useBeliefsScroll
    // but we can also do a quick interpolation here for decoupling.
    
    // Actually, the original implementation likely used a simple linear interpolation of the array.
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0 transition-colors duration-500 ease-linear"
      style={{
        zIndex: beliefZIndex.background,
        backgroundColor: BELIEF_BACKGROUND_STOPS[0],
      }}
    />
  );
}
