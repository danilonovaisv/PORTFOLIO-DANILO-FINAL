'use client';

import React from 'react';

interface BeliefSectionProps {
  text: string;
  isFirst?: boolean;
  index?: number;
  MotionSection?: React.ElementType;
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

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  index,
  MotionSection,
}) => {
  const Section = MotionSection ?? 'section';

  return (
    <Section
      aria-label={text.replace(/\n/g, ' ')}
      data-testid={index !== undefined ? `belief-sentinel-${index}` : undefined}
      className="relative h-screen w-full"
    />
  );
};

export { useIsMobile };
