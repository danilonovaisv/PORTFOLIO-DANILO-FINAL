'use client';

import { useEffect, useRef, useCallback, memo } from 'react';
import { animate, stagger } from 'motion';

/**
 * MorphingText — Ghost System v3
 *
 * Anima caracteres individualmente com stagger progressivo,
 * criando um efeito de "morphing" / revelação de texto.
 *
 * Direções suportadas:
 * - 'left': texto entra da esquerda (translateX negativo → 0)
 * - 'right': texto entra da direita (translateX positivo → 0)
 */

interface MorphingTextProps {
  /** Texto a ser animado */
  text: string;
  /** Direção de entrada: 'left' ou 'right' */
  enterFrom?: 'left' | 'right';
  /** Direção de saída (se definida, o texto desaparece nessa direção) */
  exitTo?: 'left' | 'right' | null;
  /** Se true, dispara a animação de entrada */
  isVisible?: boolean;
  /** Se true, dispara a animação de saída */
  isExiting?: boolean;
  /** Duração total da entrada em ms */
  duration?: number;
  /** Delay do stagger entre caracteres em ms */
  staggerDelay?: number;
  /** Classe CSS adicional para o container */
  className?: string;
  /** Offset de translação em pixels */
  offset?: number;
  /** Reduzir motion */
  reducedMotion?: boolean;
  /** Callback ao terminar a animação de entrada */
  onAnimationComplete?: () => void;
}

const GHOST_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MorphingText = memo(
  ({
    text,
    enterFrom = 'left',
    exitTo = null,
    isVisible = true,
    isExiting = false,
    duration = 600,
    staggerDelay = 18,
    className = '',
    offset = 60,
    reducedMotion = false,
    onAnimationComplete,
  }: MorphingTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const controlsRef = useRef<{ stop?: () => void }[]>([]);
    const hasAnimatedRef = useRef(false);

    const stopAllAnimations = useCallback(() => {
      controlsRef.current.forEach((c) => c?.stop?.());
      controlsRef.current = [];
    }, []);

    // Cria os spans de caracteres via DOM para performance
    const buildCharSpans = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = '';
      charsRef.current = [];

      const lines = text.split('\n');

      lines.forEach((line, lineIdx) => {
        const lineSpan = document.createElement('span');
        lineSpan.style.display = 'block';
        lineSpan.style.whiteSpace = 'normal';

        const words = line.split(' ');
        words.forEach((word, wordIdx) => {
          // Wrap cada palavra em um span inline-block para evitar quebra no meio
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.whiteSpace = 'nowrap';

          for (let i = 0; i < word.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = word[i];
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = '0';
            charSpan.style.willChange = 'transform, opacity';

            const xOffset = enterFrom === 'left' ? -offset : offset;
            charSpan.style.transform = `translate3d(${xOffset}px, 0, 0)`;

            wordSpan.appendChild(charSpan);
            charsRef.current.push(charSpan);
          }

          lineSpan.appendChild(wordSpan);

          // Adiciona espaço entre palavras (exceto depois da última)
          if (wordIdx < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.innerHTML = '&nbsp;';
            spaceSpan.style.display = 'inline-block';
            lineSpan.appendChild(spaceSpan);
          }
        });

        container.appendChild(lineSpan);

        if (lineIdx < lines.length - 1) {
          const spacer = document.createElement('span');
          spacer.style.display = 'block';
          spacer.style.height = '0.12em';
          container.appendChild(spacer);
        }
      });
    }, [text, enterFrom, offset]);

    // Animação de ENTRADA
    const animateIn = useCallback(() => {
      const chars = charsRef.current;
      if (!chars.length) return;

      stopAllAnimations();

      if (reducedMotion) {
        chars.forEach((c) => {
          c.style.opacity = '1';
          c.style.transform = 'translate3d(0, 0, 0)';
        });
        hasAnimatedRef.current = true;
        onAnimationComplete?.();
        return;
      }

      const durationSec = duration / 1000;
      const staggerSec = staggerDelay / 1000;

      const control = animate(
        chars,
        { opacity: [0, 1], x: [enterFrom === 'left' ? -offset : offset, 0] },
        {
          duration: durationSec,
          delay: stagger(staggerSec, { ease: 'easeOut' }),
          ease: GHOST_EASING,
        }
      );

      controlsRef.current.push(control);
      hasAnimatedRef.current = true;

      // Callback quando terminar
      if (onAnimationComplete) {
        const totalDuration = durationSec + staggerSec * chars.length;
        const timeout = setTimeout(
          () => onAnimationComplete(),
          totalDuration * 1000
        );
        controlsRef.current.push({
          stop: () => clearTimeout(timeout),
        });
      }
    }, [
      duration,
      staggerDelay,
      enterFrom,
      offset,
      reducedMotion,
      stopAllAnimations,
      onAnimationComplete,
    ]);

    // Animação de SAÍDA
    const animateOut = useCallback(() => {
      const chars = charsRef.current;
      if (!chars.length || !exitTo) return;

      stopAllAnimations();

      if (reducedMotion) {
        chars.forEach((c) => {
          c.style.opacity = '0';
        });
        return;
      }

      const durationSec = (duration * 0.7) / 1000;
      const staggerSec = (staggerDelay * 0.6) / 1000;
      const exitOffset = exitTo === 'right' ? offset : -offset;

      const control = animate(
        chars,
        { opacity: [1, 0], x: [0, exitOffset] },
        {
          duration: durationSec,
          delay: stagger(staggerSec, { ease: 'easeIn' }),
          ease: GHOST_EASING,
        }
      );

      controlsRef.current.push(control);
    }, [
      duration,
      staggerDelay,
      exitTo,
      offset,
      reducedMotion,
      stopAllAnimations,
    ]);

    // Build chars on text change
    useEffect(() => {
      buildCharSpans();
      hasAnimatedRef.current = false;
    }, [buildCharSpans]);

    // Trigger enter animation
    useEffect(() => {
      if (isVisible && !isExiting && !hasAnimatedRef.current) {
        animateIn();
      }
    }, [isVisible, isExiting, animateIn]);

    // Trigger exit animation
    useEffect(() => {
      if (isExiting && hasAnimatedRef.current) {
        animateOut();
        hasAnimatedRef.current = false;
      }
    }, [isExiting, animateOut]);

    // Cleanup
    useEffect(() => {
      return () => stopAllAnimations();
    }, [stopAllAnimations]);

    return (
      <div
        ref={containerRef}
        className={className}
        aria-label={text}
        role="text"
      />
    );
  }
);

MorphingText.displayName = 'MorphingText';
