'use client';

import Link from 'next/link';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { m, HTMLMotionProps } from 'motion/react';

// Criamos o link animado usando o m() do motion/react
const MotionNextLink = m(Link);

type LinkProps = ComponentPropsWithoutRef<typeof Link>;
type MotionProps = Omit<HTMLMotionProps<'a'>, keyof LinkProps | 'ref'>;

// Combinamos as props do Link e as props do motion
export interface MotionLinkProps extends MotionProps, LinkProps {
  children?: React.ReactNode;
}

export const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  function MotionLink({ children, ...props }, ref) {
    return (
      <MotionNextLink ref={ref} {...props}>
        {children}
      </MotionNextLink>
    );
  }
);

MotionLink.displayName = 'MotionLink';
