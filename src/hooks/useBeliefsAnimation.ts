import { useTransform, MotionValue } from 'framer-motion';

interface UseBeliefsAnimationProps {
  scrollYProgress: MotionValue<number>;
  totalPhrases: number;
  colors: string[];
}

export function useBeliefsAnimation({
  scrollYProgress,
  totalPhrases,
  colors,
}: UseBeliefsAnimationProps) {
  // Timeline:
  // 0.0 - 0.15: Intro (Sticky Header fades in)
  // 0.15 - 0.8: Phrases Sequence
  // 0.8 - 0.9: Final Reveal Intro
  // 0.9 - 1.0: Final Overlay

  // 1. Background Color Interpolation
  // Map scroll progress to colors based on phrase index
  // We want colors to switch roughly when the phrase becomes active
  const colorStops = colors.map((_, i) => 0.15 + (i / totalPhrases) * 0.65);
  // Add start and end buffers
  const colorInput = [0, ...colorStops, 1];
  // Ensure the sequence ends with bluePrimary as requested
  const finalColor = colors[0]; // Assuming colors[0] is bluePrimary based on arrays
  const colorOutput = [colors[0], ...colors, finalColor];

  const backgroundColor = useTransform(
    scrollYProgress,
    colorInput,
    colorOutput
  );

  // 2. Active Index (for mobile text layer mainly)
  // Logic handled inside components usually, but we can expose a "phase"
  // 0 = Intro, 1 = Phrases, 2 = Outro

  // 3. Ghost Intensity (0 to 1)
  // Increases as we scroll down, peaks at the end of phrases
  const ghostIntensity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.2, 1, 0] // Calms down at very end or stays high? Let's drop to 0 for exit.
  );

  // 4. Header Opacity
  // Visible during phrases, fades out for final reveal
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.75, 0.85],
    [0, 1, 1, 0]
  );

  // 5. Final Section Reveal
  // Trigger for "ISSO É GHOST DESIGN"
  const showFinalReveal = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);

  return {
    backgroundColor,
    ghostIntensity,
    headerOpacity,
    showFinalReveal,
  };
}
