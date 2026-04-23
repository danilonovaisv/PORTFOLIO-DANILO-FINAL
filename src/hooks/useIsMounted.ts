import { useEffect, useState } from 'react';

/**
 * Hook to detect if the component has mounted on the client.
 * Useful for avoiding hydration mismatches with browser-only APIs or
 * complex elements like <video> with boolean attributes.
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
