'use client';

import type { SVGProps } from 'react';

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M3 13L13 3M6 3H13V10" />
    </svg>
  );
}
