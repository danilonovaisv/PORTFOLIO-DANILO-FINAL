'use client';

import { FC, useMemo } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';
import type { PortfolioProject } from '@/types/project';
import { AdaptiveMediaLayout } from '@/components/portfolio/content/AdaptiveMediaLayout';

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

  // [BUG FIX #9]: Prioritize video for motion projects
  const primaryMedia = useMemo(() => {
    if (project.thumbnailMedia) {
      return project.thumbnailMedia;
    }
    if (project.category === 'motion' && project.videoPreview) {
      return project.videoPreview;
    }
    return project.imageLandscape ?? project.imageSquare ?? project.image;
  }, [
    project.thumbnailMedia,
    project.category,
    project.videoPreview,
    project.image,
    project.imageLandscape,
    project.imageSquare,
  ]);

  return (
    <div className="w-full">
      <AdaptiveMediaLayout
        project={project}
        heroMedia={primaryMedia}
        shouldReduce={shouldReduce}
      />
    </div>
  );
};

export default TypeBContent;
