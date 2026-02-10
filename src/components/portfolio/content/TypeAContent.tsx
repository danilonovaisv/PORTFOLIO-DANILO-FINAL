'use client';

import { FC, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { PortfolioProject } from '@/types/project';
import { AdaptiveMediaLayout } from './AdaptiveMediaLayout';

interface TypeAContentProps {
  project: PortfolioProject;
}

/**
 * Layout A: Hero adaptativo baseado no aspect ratio da mídia
 * Substitui o layout fixo antigo por um sistema inteligente estilo e-commerce.
 */
const TypeAContent: FC<TypeAContentProps> = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = !!prefersReducedMotion;

  // [BUG FIX #9]: Prioritize video for motion projects
  const heroMedia = useMemo(() => {
    if (project.category === 'motion' && project.videoPreview) {
      return project.videoPreview;
    }
    return project.imageLandscape ?? project.imageSquare ?? project.image;
  }, [project.category, project.videoPreview, project.image, project.imageLandscape, project.imageSquare]);

  return (
    <div className="w-full">
      <AdaptiveMediaLayout
        project={project}
        heroMedia={heroMedia}
        shouldReduce={shouldReduce}
      />
    </div>
  );
};

export default TypeAContent;
