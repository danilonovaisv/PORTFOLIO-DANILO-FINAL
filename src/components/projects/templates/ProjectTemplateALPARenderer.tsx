'use client';

import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { normalizeHexColor } from '@/lib/colors';
import type { MasterProjectTemplateV3Data } from '@/types/project-template';
import type { ZoomAsset } from './types';

// Sub-components
import { AlpaLayout } from './alpa/AlpaLayout';
import { AlpaContent } from './alpa/AlpaContent';

export default function ProjectTemplateALPARenderer({
  project,
}: {
  project: MasterProjectTemplateV3Data;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [zoomAsset, setZoomAsset] = useState<ZoomAsset | null>(null);
  const lastFocusedTriggerRef = useRef<HTMLElement | null>(null);

  const accentColor = normalizeHexColor(
    project.theme_color || project.highlight_color,
    '#0048ff'
  );

  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18 };
  const revealVisible = { opacity: 1, y: 0 };

  const openAsset = useCallback(
    (asset: ZoomAsset, event: React.MouseEvent<HTMLButtonElement>) => {
      lastFocusedTriggerRef.current = event.currentTarget;
      setZoomAsset(asset);
    },
    []
  );

  const closeAsset = useCallback(() => {
    setZoomAsset(null);
    lastFocusedTriggerRef.current?.focus();
  }, []);

  return (
    <AlpaLayout
      project={project}
      zoomAsset={zoomAsset}
      closeAsset={closeAsset}
      revealInitial={revealInitial}
      revealVisible={revealVisible}
    >
      <AlpaContent
        blocks={project.gallery_grid}
        prefersReducedMotion={prefersReducedMotion}
        accentColor={accentColor}
        revealInitial={revealInitial}
        revealVisible={revealVisible}
        openAsset={openAsset}
      />
    </AlpaLayout>
  );
}
