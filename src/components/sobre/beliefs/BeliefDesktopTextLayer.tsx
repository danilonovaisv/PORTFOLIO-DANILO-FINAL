import { m, useTransform } from 'motion/react';
import { BELIEF_PHRASE_ITEMS, beliefColors, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefDesktopTextLayer() {
  const { scrollYProgress, isMobile } = useBeliefsScrollContext();

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
            total={BELIEF_PHRASE_ITEMS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function PhraseItem({ 
  phrase, 
  index, 
  total, 
  scrollYProgress 
}: { 
  phrase: typeof BELIEF_PHRASE_ITEMS[0]; 
  index: number; 
  total: number;
  scrollYProgress: any;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  
  // Define os pontos de interpolação para entrada e saída suave
  // Entrada: [start, start + 25% do segmento]
  // Saída: [end - 25% do segmento, end]
  const entryEnd = start + segmentSize * 0.25;
  const exitStart = end - segmentSize * 0.25;

  const opacity = useTransform(
    scrollYProgress,
    [start, entryEnd, exitStart, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, entryEnd, exitStart, end],
    [20, 0, 0, -20]
  );

  const blur = useTransform(
    scrollYProgress,
    [start, entryEnd, exitStart, end],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

  return (
    <m.div 
      className="absolute top-1/2 left-0 -translate-y-1/2 w-full"
      style={{ opacity, y, filter: blur }}
    >
      <span 
        className="block italic font-semibold whitespace-pre-line text-left"
        style={{
          color: beliefColors.blueAccent,
          fontSize: 'clamp(2.5rem, 4.5vw, 2.75rem)',
          lineHeight: 1.1,
          textShadow: '0 4px 20px rgba(79,230,255,0.25)',
          letterSpacing: '-0.01em'
        }}
      >
        {phrase.text}
      </span>
    </m.div>
  );
}
