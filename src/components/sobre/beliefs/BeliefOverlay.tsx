import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress } = useBeliefsScrollContext();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black opacity-0"
      style={{
        zIndex: beliefZIndex.overlay,
      }}
    />
  );
}
