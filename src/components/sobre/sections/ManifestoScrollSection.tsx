'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ShaderAnimation } from '@/components/ui/shader-lines';
import { WhatMovesMeBackground } from '@/components/sobre/beliefs/WhatMovesMeBackground';
import { useMotionGate } from '@/hooks/useMotionGate';
import { Pause, Play } from 'lucide-react';

// ─── Content ──────────────────────────────────────────────────────────────────

const PHRASES = [
  { line1: 'Crio o que a marca diz', line2: 'antes mesmo de falar.' },
  { line1: 'Transformo intenção', line2: 'em presença.' },
  { line1: 'Entre estética e estratégia,', line2: 'eu construo percepção.' },
  { line1: 'O que fica não é só a imagem.', line2: 'É a sensação de marca.' },
] as const;

export function ManifestoScrollSection() {
  const prefersReducedMotion = useMotionGate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');

  // Separate visual states for each text line
  const [line1Status, setLine1Status] = useState<'active' | 'exit'>('active');
  const [line2Status, setLine2Status] = useState<'inactive' | 'active' | 'exit'>('inactive');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const line2TimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Transition engine mapping the exact behavior of the prototype
  const transitionTo = useCallback((nextIndex: number, manual = false) => {
    // Immediately update active tab indicator for responsive UI feedback
    setActiveIndex(nextIndex);

    // 1. Immediately trigger exit stagger animations for both lines
    setLine1Status('exit');
    setLine2Status('exit');

    // Clean up any pending entry delays
    if (line2TimeoutRef.current) clearTimeout(line2TimeoutRef.current);

    // 2. Wait for the exit animation (350ms + small buffer = 450ms) to complete
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      // 3. Switch the active text phrase and mount the new content
      setDisplayIndex(nextIndex);
      setLine1Status('active');
      setLine2Status('inactive');

      // Update screen reader live text ONLY on manual action
      if (manual) {
        setAnnouncementText(`${PHRASES[nextIndex].line1} ${PHRASES[nextIndex].line2}`);
      }

      // 4. Stagger reveal line 2 immediately after line 1 completes
      const line1Length = PHRASES[nextIndex].line1.length;
      const delayTime = prefersReducedMotion ? 0 : line1Length * 30 + 150;

      line2TimeoutRef.current = setTimeout(() => {
        setLine2Status('active');
      }, delayTime);
    }, prefersReducedMotion ? 50 : 450);
  }, [prefersReducedMotion]);

  // Autoplay loop — strictly paused when reduced motion or user paused
  useEffect(() => {
    // If reduced motion or user paused, do not run interval
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const nextIndex = (displayIndex + 1) % PHRASES.length;
      transitionTo(nextIndex, false);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (line2TimeoutRef.current) clearTimeout(line2TimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [displayIndex, prefersReducedMotion, isPaused, transitionTo]);

  // Dot navigation handler with safe loop reset
  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    transitionTo(index, true);
  };

  // Keyboard navigation for WAI-ARIA tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      targetIndex = (index + 1) % PHRASES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      targetIndex = (index - 1 + PHRASES.length) % PHRASES.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = PHRASES.length - 1;
    }

    if (targetIndex !== -1) {
      tabsRef.current[targetIndex]?.focus();
      handleDotClick(targetIndex);
    }
  };

  const currentPhrase = PHRASES[displayIndex];

  return (
    <section
      id="o-que-me-move"
      data-testid="beliefs-section"
      aria-labelledby="manifesto-section-title"
      className="relative h-dvh w-full overflow-hidden bg-[#040013]"
    >
      <h2 id="manifesto-section-title" className="sr-only">
        O que me move
      </h2>

      {/* Scoped CSS styling for letter-by-letter staggering transitions */}
      <style>{`
        .char {
          display: inline-block;
          opacity: 0;
          filter: blur(10px);
          transform: translateY(8px);
          font-size: clamp(2rem, 6.5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          line-height: 1.1;
          color: #fcffff;
          text-shadow: 0 0 10px rgba(0, 72, 255, 0.4), 0 0 25px rgba(0, 72, 255, 0.2), 0 0 50px rgba(0, 0, 0, 0.6);
          will-change: transform, opacity, filter;
          animation-delay: calc(var(--char-idx, 0) * 30ms);
        }

        .text-line-wrapper.active .char {
          animation: charReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .text-line-wrapper.inactive .char {
          opacity: 0;
          filter: blur(10px);
          transform: translateY(8px);
        }

        .text-line-wrapper.exit .char {
          animation: charExit 0.35s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        @keyframes charReveal {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes charExit {
          0% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(-25px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .char {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* Global background shader with built-in boundary and fallback */}
      <ShaderAnimation className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#040013]" />

      {/* Radial overlay layers for depth */}
      <WhatMovesMeBackground />

      {/* Safe screen-reader announcement wrapper (WCAG 2.2 compliant) */}
      <div
        className="sr-only"
        id="manifesto-phrase-live"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcementText || `${PHRASES[0].line1} ${PHRASES[0].line2}`}
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-8 md:gap-10">
        {/* Category Label with enhanced contrast (text-white/70 > 7:1 ratio) */}
        <p className="text-[0.75rem] font-medium tracking-[0.18em] uppercase text-white/70">
          Direção Criativa
        </p>

        {/* Text Container with dynamic active/exit state binding */}
        <div
          aria-hidden="true"
          className="flex max-w-[95vw] flex-col items-center justify-center gap-[0.4rem] px-6 text-center select-none"
        >
          <div
            key={`phrase-${displayIndex}`}
            id="manifesto-phrase-panel"
            role="tabpanel"
            aria-roledescription="slide"
            aria-label={`Manifesto ${displayIndex + 1} de ${PHRASES.length}`}
            className="text-container-inner flex flex-col items-center gap-[0.4rem]"
          >
            {/* Line 1 Stagger Reveal */}
            <div
              className={`text-line-wrapper flex flex-wrap justify-center min-h-[1.4em] ${line1Status}`}
            >
              {(() => {
                let charCounter = 0;
                return currentPhrase.line1
                  .split(' ')
                  .map((word, wordIdx, wordsArr) => (
                    <span
                      key={`l1-w-${wordIdx}`}
                      className="inline-block whitespace-nowrap"
                    >
                      {word.split('').map((char, charIdx) => {
                        const absoluteIdx = charCounter;
                        charCounter++;
                        return (
                          <span
                            key={`l1-c-${charIdx}`}
                            className="char"
                            style={
                              {
                                '--char-idx': absoluteIdx,
                              } as React.CSSProperties
                            }
                          >
                            {char}
                          </span>
                        );
                      })}
                      {wordIdx < wordsArr.length - 1 &&
                        (() => {
                          const absoluteIdx = charCounter;
                          charCounter++;
                          return (
                            <span
                              key={`l1-space-${wordIdx}`}
                              className="char"
                              style={
                                {
                                  '--char-idx': absoluteIdx,
                                } as React.CSSProperties
                              }
                            >
                              {'\u00A0'}
                            </span>
                          );
                        })()}
                    </span>
                  ));
              })()}
            </div>

            {/* Line 2 Stagger Reveal */}
            <div
              className={`text-line-wrapper flex flex-wrap justify-center min-h-[1.4em] ${line2Status}`}
            >
              {(() => {
                let charCounter = 0;
                return currentPhrase.line2
                  .split(' ')
                  .map((word, wordIdx, wordsArr) => (
                    <span
                      key={`l2-w-${wordIdx}`}
                      className="inline-block whitespace-nowrap"
                    >
                      {word.split('').map((char, charIdx) => {
                        const absoluteIdx = charCounter;
                        charCounter++;
                        return (
                          <span
                            key={`l2-c-${charIdx}`}
                            className="char"
                            style={
                              {
                                '--char-idx': absoluteIdx,
                              } as React.CSSProperties
                            }
                          >
                            {char}
                          </span>
                        );
                      })}
                      {wordIdx < wordsArr.length - 1 &&
                        (() => {
                          const absoluteIdx = charCounter;
                          charCounter++;
                          return (
                            <span
                              key={`l2-space-${wordIdx}`}
                              className="char"
                              style={
                                {
                                  '--char-idx': absoluteIdx,
                                } as React.CSSProperties
                              }
                            >
                              {'\u00A0'}
                            </span>
                          );
                        })()}
                    </span>
                  ));
              })()}
            </div>
          </div>
        </div>

        {/* Navigation Indicator Dots & Pause/Play Control */}
        <div className="flex items-center gap-3">
          {/* Pause / Play Accessible Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Reproduzir troca automática de manifesto' : 'Pausar troca automática de manifesto'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrimary cursor-pointer"
          >
            {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>

          {/* Tablist with 44x44px touch targets and full keyboard arrow navigation */}
          <div
            role="tablist"
            aria-label="Controle de frases do manifesto"
            className="flex items-center gap-1"
          >
            {PHRASES.map((_, idx) => (
              <button
                key={idx}
                ref={(el) => {
                  tabsRef.current[idx] = el;
                }}
                onClick={() => handleDotClick(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                role="tab"
                aria-selected={idx === activeIndex ? 'true' : 'false'}
                aria-controls="manifesto-phrase-panel"
                tabIndex={idx === activeIndex ? 0 : -1}
                className="flex h-11 min-w-11 items-center justify-center p-2 rounded-full border-none bg-transparent cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrimary"
                aria-label={`Ver manifesto ${idx + 1}`}
              >
                <span
                  className={`block h-[0.35rem] rounded-full transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    idx === activeIndex
                      ? 'bg-white w-[1.8rem]'
                      : 'bg-white/20 w-[0.35rem] hover:bg-white/60 hover:scale-125'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
