'use client';

import React, { forwardRef, RefObject } from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  open: boolean;
  controlsId: string;
  textLines: string[];
  textInnerRef: RefObject<HTMLSpanElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  plusHRef: RefObject<HTMLSpanElement | null>;
  plusVRef: RefObject<HTMLSpanElement | null>;
  onToggle: () => void;
}

const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
  (
    {
      open,
      controlsId,
      textLines,
      textInnerRef,
      iconRef,
      plusHRef,
      plusVRef,
      onToggle,
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
        aria-controls={controlsId}
        className={`relative inline-flex items-center justify-center gap-2 bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible z-110 min-h-12 min-w-12 px-3 transition-colors duration-fast ${
          open ? 'text-white' : 'text-white hover:text-primary'
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
                className={`block h-[1em] leading-none text-sm tracking-wide ${
                  i === textLines.length - 1 ? 'visible' : 'invisible'
                }`}
                key={`${line}-${i}`}
              >
                {line}
              </span>
            ))}
          </span>
        </span>

        {/* Static icon crossfade; transforms are reserved for opacity/blur/Y motion. */}
        <span
          ref={iconRef}
          className="relative w-[18px] h-[18px] shrink-0 inline-flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className={`absolute inset-0 inline-flex items-center justify-center transition-opacity duration-fast ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span
            ref={plusVRef}
            className={`absolute inset-0 inline-flex items-center justify-center transition-opacity duration-fast ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        </span>
      </button>
    );
  }
);

MobileMenuButton.displayName = 'MobileMenuButton';
export default MobileMenuButton;
