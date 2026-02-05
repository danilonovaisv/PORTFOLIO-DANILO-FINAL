'use client';
import React from 'react';
import { useMotionValue } from 'framer-motion';
import { BeliefSection, BeliefMobileTextLayer } from '../beliefs/BeliefSection';
import { BeliefFinalSection } from '../beliefs/BeliefFinalSection';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '../beliefs/BeliefFinalSectionOverlay';
import GhostScene from '../3d/GhostScene';
import { BRAND } from '@/config/brand';
import { useScroll as useDreiScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];

// Bridge component needs to be inside Canvas to access useDreiScroll
const ScrollBridge = ({ opacityMV }: { opacityMV: any }) => {
  const scroll = useDreiScroll();

  useFrame(() => {
    // Logic: [0.05, 0.12, 0.85, 0.95] -> [0, 1, 1, 0]
    const off = scroll.offset;
    let opacity = 0;

    if (off < 0.05) opacity = 0;
    else if (off < 0.12) opacity = (off - 0.05) / (0.12 - 0.05);
    else if (off < 0.85) opacity = 1;
    else if (off < 0.95) opacity = 1 - (off - 0.85) / (0.95 - 0.85);
    else opacity = 0;

    opacityMV.set(opacity);
  });
  return null;
}

export const AboutBeliefs: React.FC = () => {
  const headerOpacityMV = useMotionValue(0);

  // Determine pages count: Phrases + Final Section buffer
  const pages = PHRASES.length + 2;

  return (
    <section className="relative w-full h-screen bg-black">
      <GhostScene pages={pages}>
        <ScrollBridge opacityMV={headerOpacityMV} />

        {/* Content that scrolls with the page */}
        <div className="w-full">

          {/* Fixed Header: We put it outside the flow but inside the Scroll html context */}
          <div className="fixed top-0 left-0 w-full z-20 pointer-events-none">
            <BeliefFixedHeader opacity={headerOpacityMV} progress={headerOpacityMV} />
          </div>

          {PHRASES.map((phrase, index) => (
            <BeliefSection
              key={index}
              text={phrase}
              bgColor={COLORS[index] || COLORS[0]}
              isFirst={index === 0}
            />
          ))}

          <BeliefFinalSection
            scrollProgress={headerOpacityMV}
            bgColor={BRAND.colors.bluePrimary}
          />

          {/* Render Mobile Text Layer if needed, or hide if redundant */}
          <div className="block md:hidden">
            <BeliefMobileTextLayer
              phrases={PHRASES}
              scrollYProgress={headerOpacityMV} // Using opacity MV as proxy for now
            />
          </div>
        </div>

        {/* Final Overlay at the very end of scroll flow */}
        <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
          <BeliefFinalSectionOverlay />
        </div>
      </GhostScene>
    </section>
  );
};

export default AboutBeliefs;
