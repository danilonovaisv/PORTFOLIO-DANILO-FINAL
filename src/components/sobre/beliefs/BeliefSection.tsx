'use client';

import React from 'react';

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
  index?: number;
}

/**
 * Hook para detectar mobile
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const checkMobile = () => setIsMobile(mediaQuery.matches);

    checkMobile();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile);
      return () => mediaQuery.removeEventListener('change', checkMobile);
    }

    mediaQuery.addListener(checkMobile);
    return () => mediaQuery.removeListener(checkMobile);
  }, []);

  return isMobile;
};

/**
 * BeliefSection — Full-screen section with its own background color.
 * Each phrase gets a solid branded BG. CSS transition-colors handles smooth blending
 * as the user scrolls between sections.
 */
export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text: _text,
  bgColor,
  index,
}) => {
  const isMobile = useIsMobile();

  return (
    <section
      aria-hidden="true"
      data-testid={index !== undefined ? `belief-sentinel-${index}` : undefined}
      style={{ backgroundColor: bgColor }}
      className={`relative w-full h-screen flex overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isMobile
            ? 'items-end justify-start'
            : 'items-center justify-start pl-8 lg:pl-16'
        }
      `}
    />
  );
};

export { useIsMobile };
