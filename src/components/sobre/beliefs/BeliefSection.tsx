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
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
