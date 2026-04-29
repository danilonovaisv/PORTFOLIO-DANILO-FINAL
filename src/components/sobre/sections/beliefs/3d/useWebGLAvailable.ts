'use client';

import { useEffect, useState } from 'react';

export function useWebGLAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');

    try {
      const attributes: WebGLContextAttributes = {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      };

      const context =
        canvas.getContext('webgl2', attributes) ||
        canvas.getContext('webgl', attributes);

      setAvailable(Boolean(context));
    } catch {
      setAvailable(false);
    } finally {
      canvas.width = 1;
      canvas.height = 1;
    }
  }, []);

  return available;
}
