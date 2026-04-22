import { inView } from 'motion';
import { useEffect } from 'react';
import { GHOST_EASE } from '@/config/motion';

// Configurações padrão de animação
export const textAnimation = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: (isMobile: boolean) => (isMobile ? 100 : -100) },
  duration: 0.8,
  easing: GHOST_EASE,
  exitEasing: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

// Hook personalizado para animações baseadas em scroll
export const useScrollTriggeredAnimation = (
  selector: string,
  onEnter: (_element: Element) => void,
  onExit?: (_element: Element) => void,
  options?: {
    margin?: string;
  }
) => {
  useEffect(() => {
    return inView(
      selector,
      (element) => {
        onEnter(element);

        return () => {
          if (onExit) onExit(element);
        };
      },
      { margin: (options?.margin ?? '-30% 0px 0px 0px') as never }
    );
  }, [selector, onEnter, onExit, options?.margin]);
};
