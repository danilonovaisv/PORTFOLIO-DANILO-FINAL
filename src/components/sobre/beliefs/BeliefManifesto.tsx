import { useMemo } from 'react';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefManifesto() {
  const { isClimax } = useBeliefsScrollContext();

  const manifestoLines = useMemo(
    () => [
      {
        text: 'ISSO É',
        className: 'text-[16vw] lg:text-[14rem] mix-blend-overlay opacity-0',
      },
      {
        text: 'GHOST',
        className: 'text-[30vw] lg:text-[25rem] text-[#0048ff] z-10 opacity-0',
      },
      {
        text: 'DESIGN',
        className: 'text-[24vw] lg:text-[19rem] mix-blend-overlay opacity-0',
      },
    ],
    []
  );

  return (
    <div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="belief-manifesto col-span-full row-start-1 col-start-1 pointer-events-none flex flex-col items-center justify-center px-4 h-full opacity-0"
      style={{
        zIndex: beliefZIndex.manifesto,
      }}
      aria-live={isClimax ? 'polite' : 'off'}
    >
      <div className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full">
        {manifestoLines.map((line, idx) => (
          <div
            key={line.text}
            className={`manifesto-line ${line.className} tracking-tighter uppercase font-black will-change-transform`}
            data-index={idx}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
