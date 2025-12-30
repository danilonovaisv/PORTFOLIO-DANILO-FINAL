// src/hooks/useSpectralGhost.ts
import { useEffect, useState } from 'react';

export const useSpectralGhost = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula o carregamento da animação
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Tempo aproximado de carregamento da animação

    return () => clearTimeout(timer);
  }, []);

  return isLoaded;
};
