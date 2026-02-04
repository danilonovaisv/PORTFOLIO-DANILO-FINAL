import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const reducedMotion = useFramerReducedMotion();
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    setIsSafe(true);
  }, []);

  return isSafe ? (reducedMotion ?? false) : false;
}

export default useReducedMotion;
