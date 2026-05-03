'use client';

import { useEffect, useState } from 'react';

const checkWebGLAvailable = () => {
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

    context?.getExtension('WEBGL_lose_context')?.loseContext();

    return Boolean(context);
  } catch {
    return false;
  } finally {
    canvas.width = 1;
    canvas.height = 1;
  }
};

export function useWebGLAvailable() {
  const [available, setAvailable] = useState<boolean | null>(() => {
    if (typeof document === 'undefined') return null;
    return checkWebGLAvailable();
  });

  useEffect(() => {
    setAvailable(checkWebGLAvailable());
  }, []);

  return available;
}
