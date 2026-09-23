import { useEffect, useState } from 'react';

export const isWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const hasContext = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
    canvas.width = 1;
    canvas.height = 1;
    return hasContext;
  } catch {
    return false;
  }
};

export const useWebGLSupport = (): boolean => {
  const [supportsWebGL, setSupportsWebGL] = useState(false);

  useEffect(() => {
    setSupportsWebGL(isWebGLAvailable());
  }, []);

  return supportsWebGL;
};
