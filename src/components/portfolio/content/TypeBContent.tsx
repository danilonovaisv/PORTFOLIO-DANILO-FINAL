'use client';

import { FC, useMemo } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';
import type { PortfolioProject } from '@/types/project';
import { AdaptiveMediaLayout } from '@/components/portfolio/content/AdaptiveMediaLayout';
import { getModalHeroMedia } from '@/components/portfolio/content/modal-media';

interface TypeBContentProps {
  project: PortfolioProject;
}

/**
 * Layout B: Hero adaptativo baseado no aspect ratio da mídia
 * Substitui o layout compacto antigo por um sistema inteligente estilo e-commerce.
 */
const TypeBContent: FC<TypeBContentProps> = ({ project }) => {
  const prefersReducedMotion = useMotionGate();
  const shouldReduce = !!prefersReducedMotion;

  const primaryMedia = useMemo(() => getModalHeroMedia(project), [project]);

  return (
    <div className="w-full">
      <AdaptiveMediaLayout
        project={project}
        heroMedia={primaryMedia ?? ''}
        shouldReduce={shouldReduce}
      />
    </div>
  );
};

export default TypeBContent;
