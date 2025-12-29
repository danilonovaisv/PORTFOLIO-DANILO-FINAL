import { useEffect, useState } from 'react';

const checkWebGLSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const useWebGLSupport = (): boolean => {
  const [supportsWebGL, setSupportsWebGL] = useState(false);

  useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);

  return supportsWebGL;
};
