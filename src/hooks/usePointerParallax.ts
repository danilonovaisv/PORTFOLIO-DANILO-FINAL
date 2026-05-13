import { useEffect, useRef, useMemo } from 'react';

export function usePointerParallax() {
  const xRef = useRef(0);
  const yRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      xRef.current = normalizedX;
      yRef.current = normalizedY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return useMemo(
    () => ({
      x: { get: () => xRef.current },
      y: { get: () => yRef.current },
    }),
    []
  );
}
