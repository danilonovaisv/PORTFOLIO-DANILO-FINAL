'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

type SplitGhostTextProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitType?: 'words' | 'lines' | 'chars';
  className?: string;
  delay?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
  scrub?: boolean | number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  ease?: gsap.TweenVars['ease'];
};

const DEFAULT_FROM: gsap.TweenVars = {
  opacity: 0,
  y: 15,
  filter: 'blur(8px)',
};

const DEFAULT_FROM_SCRUB: gsap.TweenVars = {
  opacity: 0,
  y: 18,
  filter: 'blur(10px)',
};

function splitText(text: string, type: 'words' | 'lines' | 'chars'): string[] {
  switch (type) {
    case 'chars':
      return text.split('');
    case 'lines':
      return text.split('\n');
    case 'words':
    default:
      return text.split(' ');
  }
}

export function SplitGhostText({
  text,
  as: Tag = 'p',
  splitType = 'words',
  className,
  delay = 0.05,
  duration = 0.8,
  textAlign = 'left',
  scrub = false,
  from,
  to,
  ease,
}: SplitGhostTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const segments = splitText(text, splitType);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.split-segment');
      if (!items) return;

      const resolvedFrom = from ?? (scrub ? DEFAULT_FROM_SCRUB : DEFAULT_FROM);
      const resolvedEase = ease ?? GSAP_GHOST_EASE;

      const animationTo: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
        duration,
        stagger: delay,
        ease: resolvedEase,
        ...(to ?? {}),
      };

      if (scrub) {
        gsap.fromTo(items, resolvedFrom, {
          ...animationTo,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: scrub === true ? 1 : scrub,
          },
        });
      } else {
        gsap.fromTo(items, resolvedFrom, {
          ...animationTo,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, [text, delay, duration, scrub, from, to, ease]);

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ textAlign }}
      aria-label={text}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="split-segment inline-block will-change-[transform,opacity,filter]"
          style={{ opacity: 0 }}
        >
          {segment}
          {splitType === 'words' ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  );
}
