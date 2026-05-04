import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

export function useGhostInput() {
  const mouseRef = useRef(new THREE.Vector2());
  const hasReceivedMouseInputRef = useRef(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateMousePos = useCallback((x: number, y: number) => {
    hasReceivedMouseInputRef.current = true;
    mouseRef.current.x = (x / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(y / window.innerHeight) * 2 + 1;

    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      hasReceivedMouseInputRef.current = false;
    }, 3000);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    },
    [updateMousePos]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateMousePos]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, [onMouseMove, onTouchMove]);

  return {
    mouse: mouseRef.current,
    hasReceivedMouseInput: hasReceivedMouseInputRef,
  };
}
