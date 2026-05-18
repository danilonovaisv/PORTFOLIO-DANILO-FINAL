'use client';

import Link from 'next/link';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { type HTMLMotionProps, m } from 'motion/react';

// m(Link) produces a component whose HTML handler types (onDrag, onAnimationStart, etc.)
// conflict with Framer Motion's own handler signatures of the same name.
// Strategy: build the public prop type from the two leaf types independently,
// then cast at the JSX boundary to avoid unsolvable overload errors.

type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

// HTML event handlers that collide with Framer Motion's own props
type CollidingHandlers =
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration';

type CleanLinkProps = Omit<NextLinkProps, CollidingHandlers>;
type MotionOnlyProps = Omit<HTMLMotionProps<'a'>, keyof CleanLinkProps | 'ref'>;

export interface MotionLinkProps extends CleanLinkProps, MotionOnlyProps {
  children?: React.ReactNode;
}

const MotionNextLink = m(Link);

export const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  function MotionLink({ children, ...props }, ref) {
    return (
      <MotionNextLink ref={ref} {...(props as any)}>
        {children}
      </MotionNextLink>
    );
  }
);

MotionLink.displayName = 'MotionLink';
