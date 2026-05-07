'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type SplitGhostTextProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitType?: 'words' | 'lines';
  className?: string;
  delay?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
};

export function SplitGhostText({
  text,
  as: Tag = 'p',
  splitType = 'words',
  className,
  delay = 0.05,
  duration = 0.8,
  textAlign = 'left',
  scrub = false,
}: SplitGhostTextProps & { scrub?: boolean | number }) {
  const containerRef = useRef<HTMLElement>(null);
  const segments = splitType === 'lines' ? text.split('\n') : text.split(' ');

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.split-segment');
      if (!items) return;

      const animationProps = {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: duration,
        stagger: delay,
        ease: 'power2.out',
      };

      if (scrub) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' },
          {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: scrub === true ? 1 : scrub,
            },
          }
        );
      } else {
        gsap.fromTo(
          items,
          { opacity: 0, y: 15, scale: 0.95, filter: 'blur(8px)' },
          {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [text, delay, duration]);

  return (
    <Tag
      ref={containerRef as any}
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
