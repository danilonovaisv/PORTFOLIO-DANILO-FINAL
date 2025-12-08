'use client';

import { useEffect, useState } from 'react';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface LayoutConfig {
  viewport: ViewportMode;
  columns: number;
  gap: string;
  maxWidth: string;
  containerPadding: string;
}

const getLayoutConfig = (width: number): LayoutConfig => {
  if (width < 640) {
    return {
      viewport: 'mobile',
      columns: 1,
      gap: '1.2rem',
      maxWidth: '100%',
      containerPadding: '1rem',
    };
  }

  if (width < 1024) {
    return {
      viewport: 'tablet',
      columns: 2,
      gap: '1.75rem',
      maxWidth: '1100px',
      containerPadding: '1.5rem',
    };
  }

  return {
    viewport: 'desktop',
    columns: 3,
    gap: '2.25rem',
    maxWidth: '1400px',
    containerPadding: '2rem',
  };
};

export const useDynamicLayout = (): LayoutConfig => {
  const [layout, setLayout] = useState<LayoutConfig>(() =>
    getLayoutConfig(typeof window === 'undefined' ? 1440 : window.innerWidth)
  );

  useEffect(() => {
    let frame: number | null = null;

    const handleResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        setLayout(getLayoutConfig(window.innerWidth));
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return layout;
};
