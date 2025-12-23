'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HomeHero from './HomeHero';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostAboveText from './GhostAboveText';

export default function HomeIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a timeline linked to the scroll of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // --- Animation Config (Manifesto Expansion) ---

  // Hero Copy Fades Out Early
  // 0.05 -> 0.25: Fades out
  const heroOpacity = useTransform(smoothProgress, [0.05, 0.25], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0.05, 0.25], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0.05, 0.25], [0, -50]);
  const heroPointerEvents = useTransform(smoothProgress, (val) =>
    val > 0.2 ? 'none' : 'auto'
  );

  // Video Thumb Expansion
  // 0.2 -> 0.9: Expands to fill screen

  // Width: Initial (30vw or fixed) -> 100vw
  const thumbWidth = useTransform(
    smoothProgress,
    [0.2, 0.9],
    ['min(90vw, 28rem)', '100%']
  );

  // Aspect: Thumb (16/9) -> Full (100vh/100vw implicitly via fixed positioning or size)
  const thumbHeight = useTransform(
    smoothProgress,
    [0.2, 0.9],
    ['15.75rem', '100vh']
  ); // 16:9 of 28rem is ~15.75

  // Position Adjustment
  // Rounded Corners: 1rem -> 0 (finish earlier to look crisp at edges)
  const thumbRadius = useTransform(
    smoothProgress,
    [0.2, 0.6],
    ['1rem', '0rem']
  );

  // Layout puts it initially under the text.
  // As we scroll, we override constraint to fixed/absolute covering screen.

  return (
    // Tall container for scroll space
    <div ref={containerRef} className="relative h-[250vh] bg-[#050505]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background (Ghost Canvas) - Remains static/visible until fully covered */}
        <div className="absolute inset-0 z-0">
          {/* We use HomeHero purely as background layer now, assume it has no content */}
          <HomeHero />
        </div>

        {/* Editorial Content (Hero Copy) */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          {/* Copy needs pointer events for links, but container is pointer-events-none to let clicks pass to video if needed?
                 Actually we want interaction on Copy when visible. */}
          <div
            className="relative z-20 pointer-events-auto"
            style={{ pointerEvents: heroPointerEvents as any }}
          >
            <HeroCopy />
          </div>
          
          {/* Ghost Canvas Above Text - Creates the "Ghost Above Text" effect */}
          <div className="absolute inset-0 z-30">
            <GhostAboveText />
          </div>
        </motion.div>

        {/* Manifesto Video Thumb -> Fullscreen */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pointer-events-none">
          <motion.div
            className="relative z-20 overflow-hidden shadow-2xl origin-bottom pointer-events-auto"
            style={{
              width: thumbWidth,
              height: thumbHeight,
              borderRadius: thumbRadius,
              marginBottom: useTransform(
                smoothProgress,
                [0, 0.2], // Faster transition to 0 to lock in fullscreen
                ['3rem', '0rem']
              ),
            }}
          >
            <ManifestoThumb className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
