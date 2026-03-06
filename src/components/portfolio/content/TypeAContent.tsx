'use client';

import { FC, useMemo } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';
import type { PortfolioProject } from '@/types/project';
import { AdaptiveMediaLayout } from '@/components/portfolio/content/AdaptiveMediaLayout';
import { getModalHeroMedia } from '@/components/portfolio/content/modal-media';

interface TypeAContentProps {
  project: PortfolioProject;
}

/**
 * Layout A: Hero adaptativo baseado no aspect ratio da mídia
 * Substitui o layout fixo antigo por um sistema inteligente estilo e-commerce.
 */
const TypeAContent: FC<TypeAContentProps> = ({ project }) => {
  const prefersReducedMotion = useMotionGate();
  const shouldReduce = !!prefersReducedMotion;

  const heroMedia = useMemo(() => getModalHeroMedia(project), [project]);

  return (
    <div className="w-full">
      <AdaptiveMediaLayout
        project={project}
        heroMedia={heroMedia ?? ''}
        shouldReduce={shouldReduce}
      />
    </div>
  );
};

export default TypeAContent;
