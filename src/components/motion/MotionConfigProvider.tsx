'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import React from 'react';

/**
 * MotionConfigProvider
 * Implements Framer Motion's LazyMotion to reduce initial bundle size.
 * Instead of loading the full motion library, it loads domAnimation features.
 */
export default function MotionConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
