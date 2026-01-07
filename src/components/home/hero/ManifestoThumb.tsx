'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion';

interface ManifestoThumbProps {
  scrollProgress: MotionValue<number>;
}

export default function ManifestoThumb({
  scrollProgress,
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // --- Animation Mapping ---
  // 0 -> 0.6: Transition from Thumbnail to Fullscreen
  // 0.6 -> 0.9: Fullscreen Hold (Unmuted zone)
  // 0.9 -> 1.0: Preparing to exit (Fade out or just stay)

  // Scale: Starts at 0.3 (~30vw), goes to 1 (100vw)
  const scale = useTransform(scrollProgress, [0, 0.6], [0.3, 1]);

  // Border Radius: Starts at 16px, becomes 0 when fullscreen
  const borderRadius = useTransform(scrollProgress, [0.5, 0.6], [16, 0]);

  // Translation: Adjust origin or position if needed.
  // Using `transform-origin: bottom right` means it grows from that corner.
  // But we want it to center.
  // A simple way is to animate `right` and `bottom` from 32px to 0px?
  // Transform is more performant.
  // If we set origin to bottom right, it stays anchored there.
  // We need it to move to center.
  // Let's rely on standard scaling from center, but position it initially at bottom right using translate.

  // BETTER STRATEGY:
  // Position absolutely centered (inset-0).
  // Initial state: Translate(X, Y) scaled down.
  // Target state: Translate(0, 0) scale 1.

  // Width: 100vw, Height: 100vh.
  // Thumbnail Position (Bottom Right, 32px padding).
  // If Scale is 0.3:
  // Visible Width = 30vw.
  // Visible Height = 30vh (approx).
  // Total Distance to corner: 35vw X, 35vh Y approx.
  // Let's use percentages for safety.
  // 50% - (15% + padding) ?

  // Let's try simple percentage translation.
  // x: "35%" -> "0%"
  // y: "35%" -> "0%"
  const x = useTransform(scrollProgress, [0, 0.6], ['34%', '0%']);
  const y = useTransform(scrollProgress, [0, 0.6], ['34%', '0%']);

  // Opacity for Entrance
  // const opacity = useTransform(scrollProgress, [0, 0.05], [0, 1]); // optional fade in if not already visible

  // --- Sound Logic ---
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    // Only unmute if we are in the "Hold" zone (fullscreen)
    // Threshold: 0.6
    const shouldBeUnmuted = latest > 0.6 && latest < 0.95;

    if (shouldBeUnmuted && isMuted) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    } else if (!shouldBeUnmuted && !isMuted) {
      setIsMuted(true);
      if (videoRef.current) videoRef.current.muted = true;
    }
  });

  return (
    <motion.div
      style={{
        scale,
        borderRadius,
        x,
        y,
      }}
      className="hidden lg:block absolute inset-0 z-30 overflow-hidden shadow-2xl bg-black origin-center cursor-pointer pointer-events-auto"
      aria-label="Assistir manifesto em fullscreen"
      onClick={() => {
        // Jump to fullscreen point
        // 0.65 of 250vh = ?
        // We can just scroll the window.
        // Section is usually at top 0.
        // Total height of section: document.getElementById('hero')?.offsetHeight
        const heroHeight =
          document.getElementById('hero')?.offsetHeight ||
          window.innerHeight * 2.5;
        const targetScroll = heroHeight * 0.65;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }}
    >
      <video
        ref={videoRef}
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        muted // Initial state controlled by prop/state
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay Icon - Only visible when thumbnail (scale < 0.9) */}
      <motion.div
        style={{ opacity: useTransform(scrollProgress, [0.5, 0.6], [1, 0]) }}
        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-300"
      >
        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
          <span className="text-white text-xs font-mono uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            Expand
          </span>
        </div>
      </motion.div>

      {/* Unmute Indicator (Optional) */}
      {!isMuted && (
        <div className="absolute bottom-8 right-8 z-40 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-white uppercase tracking-widest pointer-events-none">
          Sound On
        </div>
      )}
    </motion.div>
  );
}
