'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(
  sectionIds: string[],
  rootMargin = '-45% 0px -45% 0px'
) {
  const [active, setActive] = useState<string>('#hero');

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { root: null, threshold: [0.15, 0.25, 0.35], rootMargin }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootMargin, sectionIds]);

  return active;
}
