'use client';

import { useRef } from 'react';
import { WhatMovesMeBackground } from '../beliefs/WhatMovesMeBackground';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { SECTION_HEIGHT_VH } from '../beliefs/what-moves-me.constants';

export function AboutBeliefs() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="o-que-me-move"
      aria-labelledby="o-que-me-move-title"
      className="relative text-white"
      style={{ minHeight: `${SECTION_HEIGHT_VH}vh` }}
    >
      <h2 id="o-que-me-move-title" className="sr-only">
        O que me move
      </h2>
      <WhatMovesMeBackground />
      <BeliefScrollText sectionRef={sectionRef} />
    </section>
  );
}
