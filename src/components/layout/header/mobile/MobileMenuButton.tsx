'use client';

import React, { forwardRef, RefObject } from 'react';

interface MobileMenuButtonProps {
  open: boolean;
  textLines: string[];
  textInnerRef: RefObject<HTMLSpanElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  plusHRef: RefObject<HTMLSpanElement | null>;
  plusVRef: RefObject<HTMLSpanElement | null>;
  onToggle: () => void;
  isLight?: boolean;
}

const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
  (
    {
      open,
      textLines,
      textInnerRef,
      iconRef,
      plusHRef,
      plusVRef,
      onToggle,
      isLight = false,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open ? 'true' : 'false'}
        className={`relative inline-flex items-center justify-center gap-2 bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible z-110 min-h-[48px] min-w-[48px] px-3 ${
          isLight ? 'text-section-clients' : 'text-white'
        }`}
      >
        {/* Animated text */}
        <span
          className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          <span ref={textInnerRef} className="flex flex-col leading-none">
            {textLines.map((line, i) => (
              <span
                className="block h-[1em] leading-none text-sm tracking-wide"
                key={`${line}-${i}`}
              >
                {line}
              </span>
            ))}
          </span>
        </span>

        {/* Animated plus/X icon */}
        <span
          ref={iconRef}
          className="relative w-[18px] h-[18px] shrink-0 inline-flex items-center justify-center will-change-transform"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
          />
          <span
            ref={plusVRef}
            className="absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
          />
        </span>
      </button>
    );
  }
);

MobileMenuButton.displayName = 'MobileMenuButton';
export default MobileMenuButton;
