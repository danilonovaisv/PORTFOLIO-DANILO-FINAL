import { useMemo } from 'react';
import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

/**
 * Mobile Phrase Component
 * Encapsula a lógica de animação individual para cada frase no Mobile
 */
function MobilePhrase({
  phrase,
  index,
}: {
  phrase: (typeof BELIEF_PHRASE_ITEMS)[0];
  index: number;
}) {
  return (
    <div
      className="mobile-phrase absolute bottom-0 left-0 right-0 flex justify-center opacity-0"
      data-index={index}
    >
      <span
        className="block text-center italic font-semibold select-none whitespace-pre-line"
        style={{
          color: beliefColors.blueAccent,
          fontSize: 'clamp(2.15rem, 8vw, 3.25rem)',
          lineHeight: 1.1,
          textShadow: `0 4px 20px rgba(79,230,255,0.25)`,
          letterSpacing: '-0.01em',
        }}
      >
        {phrase.text}
      </span>
    </div>
  );
}

export function BeliefMobileTextLayer() {
  const { isMobile } = useBeliefsScrollContext();

  const phrases = useMemo(() => BELIEF_PHRASE_ITEMS, []);

  if (!isMobile) return null;

  return (
    <div
      className="col-span-full row-start-1 col-start-1 pointer-events-none flex items-end justify-center pb-[16vh] h-full"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      <div className="relative w-full max-w-[90vw]">
        {phrases.map((phrase, index) => (
          <MobilePhrase
            key={phrase.id}
            phrase={phrase}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
