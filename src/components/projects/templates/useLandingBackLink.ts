'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function useLandingBackLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const originCard = searchParams.get('originCard');

  return useMemo(() => {
    if (from === 'portfolio') {
      const safeCard = originCard ? sanitizeSlug(originCard) : '';
      return safeCard ? `/portfolio#portfolio-card-${safeCard}` : '/portfolio';
    }

    if (from === 'home') {
      return '/#portfolio';
    }

    return '/portfolio';
  }, [from, originCard]);
}
