'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to sync with Ghost energy emitted from GhostCanvas
 * Energy represents the proximity of the ghost to the center (higher = closer)
 * Falls back to 0.3 if --ghost-energy CSS variable is not defined
 */
export function useGhostEnergy(): number {
  const [energy, setEnergy] = useState(0.3);

  useEffect(() => {
    const update = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        '--ghost-energy'
      );

      if (value) {
        const parsed = parseFloat(value);
        if (!isNaN(parsed)) {
          setEnergy(parsed);
        }
      }
    };

    // Poll at 20fps (50ms interval) - organic feel without excessive updates
    const id = setInterval(update, 50);

    // Initial update
    update();

    return () => clearInterval(id);
  }, []);

  return energy;
}
