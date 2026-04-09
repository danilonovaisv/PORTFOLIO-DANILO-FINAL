import { useGLTF } from '@react-three/drei';
import {
  GhostModel as SharedGhostModel,
  type GhostModelProps,
} from '@/components/shared/3d/GhostModel';

const GHOST_MODEL_PATH = '/site.assets/3d/ghost-v1.glb';

const GhostModel = (props: GhostModelProps) => {
  return <SharedGhostModel src={GHOST_MODEL_PATH} {...props} />;
};

useGLTF.preload(GHOST_MODEL_PATH);

export { GHOST_MODEL_PATH };
export default GhostModel;
