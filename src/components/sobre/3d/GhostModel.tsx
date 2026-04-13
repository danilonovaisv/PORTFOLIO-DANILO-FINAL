'use client';

import { useGLTF } from '@react-three/drei';
import {
  GhostModel as SharedGhostModel,
  type GhostModelProps,
} from '@/components/shared/3d/GhostModel';

/**
 * About Beliefs — Ghost Model
 *
 * Uses the official Supabase-hosted GLB for this section.
 * Falls back to local path via SharedGhostModel if needed.
 */
const GHOST_SUPABASE_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

const GHOST_LOCAL_PATH = '/site.assets/3d/ghost-v1.glb';

const GhostModel = (props: GhostModelProps) => {
  return <SharedGhostModel src={GHOST_LOCAL_PATH} {...props} />;
};

// Preload both for fastest availability
useGLTF.preload(GHOST_LOCAL_PATH);

export { GHOST_SUPABASE_URL, GHOST_LOCAL_PATH };
export type { GhostModelProps };
export default GhostModel;
