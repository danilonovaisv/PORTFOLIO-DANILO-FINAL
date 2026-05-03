import { useEffect, useState } from 'react';

const checkWebGLSupport = (): boolean => {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');

  try {
    const context =
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'));

    return Boolean(context);
  } catch {
    return false;
  } finally {
    canvas.width = 1;
    canvas.height = 1;
  }
};

export const useWebGLSupport = (): boolean => {
  const [supportsWebGL, setSupportsWebGL] = useState(false);

  useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);

  return supportsWebGL;
};
