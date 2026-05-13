import {
  BELIEF_PHRASE_ITEMS,
  beliefColors,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefDesktopTextLayer() {
  const { isMobile } = useBeliefsScrollContext();

  if (isMobile) return null;

  return (
    <div
      className="col-span-6 row-start-1 col-start-1 pointer-events-none flex items-center h-full pl-8 lg:pl-16 xl:pl-24"
      style={{ zIndex: beliefZIndex.scrollText }}
    >
      <div className="relative w-full max-w-[32vw]">
        {BELIEF_PHRASE_ITEMS.map((phrase, index) => (
          <PhraseItem
            key={phrase.id}
            phrase={phrase}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function PhraseItem({
  phrase,
  index,
}: {
  phrase: (typeof BELIEF_PHRASE_ITEMS)[0];
  index: number;
}) {
  return (
    <div
      className="desktop-phrase absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-0"
      data-index={index}
    >
      <span
        className="block italic font-semibold whitespace-pre-line text-left"
        style={{
          color: beliefColors.blueAccent,
          fontSize: 'clamp(2.5rem, 4.5vw, 2.75rem)',
          lineHeight: 1.1,
          textShadow: '0 4px 20px rgba(79,230,255,0.25)',
          letterSpacing: '-0.01em',
        }}
      >
        {phrase.text}
      </span>
    </div>
  );
}
