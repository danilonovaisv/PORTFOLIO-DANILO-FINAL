import { useEffect, useState } from 'react';

export const isWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined' || typeof window.WebGLRenderingContext === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    if (typeof canvas.getContext !== 'function') return false;
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    const hasContext = Boolean(gl);
    if (gl) {
      const ext = (gl as WebGLRenderingContext).getExtension?.('WEBGL_lose_context');
      if (ext) {
        ext.loseContext();
      }
    }
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
