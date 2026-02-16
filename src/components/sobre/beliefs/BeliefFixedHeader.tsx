'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  cubicBezier,
  useInView,
  useAnimation,
} from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
}

/**
 * BeliefFixedHeader — Layer 2 (z-20)
 *
 * ANIMATION STRATEGY:
 * - Entry: Triggered by `inView` (Viewport Entry).
 *   - Desktop: Slide Left + Fade In.
 *   - Mobile: Slide Left + Fade In.
 *   - "BG entry cannot be fade": We use x-axis slide.
 *
 * - Exit: Driven by `scrollProgress` (approaching manifesto).
 *   - Desktop: Slide Up + Blur.
 *   - Mobile: Slide Right.
 */
export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
}) => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  useEffect(() => {
    if (isInView) {
      // Entry Animation: Slide from Right (100px) to 0, Opacity 0->1
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: ghostEase },
      });
    } else {
      // Reset when out of view (optional, supports scrolling back up)
      controls.start({
        x: 100,
        opacity: 0,
        transition: { duration: 0.5, ease: ghostEase },
      });
    }
  }, [isInView, controls, ghostEase]);

  // --- EXIT LOGIC (Scroll Driven) ---
  // Only handle the *End* of the lifecycle with scroll.
  // We use a high range (0.72 -> 0.82) to fade out before manifesto.

  const exitOpacity = useTransform(scrollProgress, [0.72, 0.82], [1, 0]);

  // Desktop Exit: slide up (y: -18px)
  const yExit = useTransform(scrollProgress, [0.72, 0.82], [0, -18], {
    ease: ghostEase,
  });

  // Mobile Exit: slide right (x: 100%) - Note: This conflicts with Entry X if not careful.
  // Workaround: Apply Exit X on a wrapper or combine transforms?
  // Since Entry is component-state driven and Exit is scroll-driven, we can apply Exit to the outer container styling
  // OR strictly separate them opacity-wise so visual conflicts are hidden.
  // Actually, for Mobile Exit, let's keep it simple: Fade Out + Slide Right.

  const xExitMobile = useTransform(
    scrollProgress,
    [0.72, 0.82],
    ['0%', '100%'],
    {
      ease: ghostEase,
    }
  );

  const filterExit = useTransform(
    scrollProgress,
    [0.72, 0.82],
    ['blur(0px)', 'blur(6px)'],
    {
      ease: ghostEase,
    }
  );

  return (
    <motion.header
      ref={ref}
      id="beliefs-heading"
      // Combine Scroll Exit Transforms with InView Entry State
      style={{
        opacity: exitOpacity, // Scroll Exit overrides everything (multiplicative?) No, just replaces.
        // Issue: If controls sets opacity=1, and exitOpacity says 1, it's fine.
        // If exitOpacity says 0, it should be 0.
        // We can pass exitOpacity to a parent or use 'useMotionTemplate' if needed, but style prop usually wins?
        // Actually, 'animate' prop (controls) usually overrides 'style' prop for same keys in Framer Motion unless handled carefully.
        // BETTER STRATEGY:
        // Use `controls` for the Inner Content (Entry).
        // Use `style` on the Outer Container for Exit.
        y: isMobile ? 0 : yExit,
        x: isMobile ? xExitMobile : 0, // This applies to container
        filter: filterExit,
      }}
      className="flex w-full h-full pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start md:items-center justify-end pt-[20vh] md:pt-0 col-span-12">
          {/* Inner Wrapper handled by performant Entry Animation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={controls}
            className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[850px] pr-[5%] md:pr-0"
          >
            {/* Primary: "Acredito no design que muda o dia de alguém." */}
            <div className="flex flex-col items-end text-right w-full">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-none tracking-tighter mb-4 md:mb-12 uppercase font-black whitespace-nowrap">
                Acredito no
                <br />
                design que
                <br />
                muda o dia
                <br />
                de alguém.
              </h2>

              {/* Secondary: "Não pelo choque, mas pela conexão." */}
              <div className="flex flex-col items-end gap-1 text-white text-[clamp(1rem,4vw,1.25rem)] md:text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-normal font-bold whitespace-nowrap">
                Não pelo choque,
                <br />
                mas pela conexão.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
