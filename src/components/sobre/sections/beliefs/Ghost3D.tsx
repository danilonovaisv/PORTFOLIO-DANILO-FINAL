'use client';

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

const LEGACY_MODEL_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';
const STABLE_MODEL_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost.glb';

const toStableGhostVariant = (value: string) =>
  value.replace(/ghost-transformed\.glb(?:\?.*)?$/i, 'ghost.glb');

const buildModelCandidates = (primary?: string) => {
  const candidates = [primary, primary ? toStableGhostVariant(primary) : null];
  candidates.push(STABLE_MODEL_URL, LEGACY_MODEL_URL);
  return Array.from(new Set(candidates.filter(Boolean) as string[]));
};

const canLoadModel = async (url: string, signal: AbortSignal) => {
  try {
    const headResponse = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
      signal,
    });

    if (headResponse.ok) return true;
  } catch {
    // Fallback para GET de 1 byte quando HEAD não for confiável.
  }

  try {
    const getResponse = await fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=0-0' },
      cache: 'no-store',
      signal,
    });
    return getResponse.ok;
  } catch {
    return false;
  }
};

const GhostModel = ({
  modelUrl,
  activeIndex,
  totalSections,
  isMobile,
}: {
  modelUrl: string;
  activeIndex: number;
  totalSections: number;
  isMobile: boolean;
}) => {
  const { scene } = useGLTF(modelUrl);
  const modelRootRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const { model, center, maxDimension } = useMemo(() => {
    const clonedModel = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clonedModel);
    const centerPoint = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(centerPoint);
    box.getSize(size);

    return {
      model: clonedModel,
      center: centerPoint,
      maxDimension: Math.max(size.x, size.y, size.z) || 1,
    };
  }, [scene]);

  useEffect(() => {
    if (isMobile) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [isMobile]);

  useFrame((state, delta) => {
    const root = modelRootRef.current;
    if (!root) return;

    const isFinalSection = activeIndex >= totalSections - 1;
    const normalizedProgress = Math.min(
      activeIndex / Math.max(totalSections - 1, 1),
      1
    );
    const wobble =
      0.04 * Math.sin(state.clock.elapsedTime * 1.8 + normalizedProgress * 2);
    const driftX =
      (isMobile ? 0.028 : 0.05) * Math.sin(state.clock.elapsedTime * 0.95);

    // Intensificação progressiva por frase + clímax final (+10%)
    const baseSize = isMobile ? 0.66 : 0.9;
    const progressiveEnergy = isMobile
      ? normalizedProgress * 0.1
      : normalizedProgress * 0.12;
    const finalBoost = isFinalSection ? 0.1 : 0;
    const desiredSize = baseSize + progressiveEnergy + finalBoost;

    const scaleTarget = desiredSize / maxDimension;
    const xTarget = isMobile ? (isFinalSection ? 0 : -0.52) : 0;
    const yTarget = isMobile ? (isFinalSection ? 0.02 : 0.46) : 0;

    const rotationInfluenceX = isMobile ? 0 : pointerRef.current.x * 0.08;
    const rotationInfluenceY = isMobile ? 0 : pointerRef.current.y * 0.05;

    root.position.x = THREE.MathUtils.lerp(
      root.position.x,
      xTarget + driftX,
      delta * 4.2
    );
    root.position.y = THREE.MathUtils.lerp(
      root.position.y,
      yTarget + wobble,
      delta * 4.2
    );
    root.position.z = 0;

    root.scale.x = THREE.MathUtils.lerp(root.scale.x, scaleTarget, delta * 4.2);
    root.scale.y = THREE.MathUtils.lerp(root.scale.y, scaleTarget, delta * 4.2);
    root.scale.z = THREE.MathUtils.lerp(root.scale.z, scaleTarget, delta * 4.2);

    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      -rotationInfluenceY,
      delta * 3.6
    );
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      0.08 * Math.sin(state.clock.elapsedTime * 0.7) + rotationInfluenceX,
      delta * 3.6
    );
    root.rotation.z = THREE.MathUtils.lerp(
      root.rotation.z,
      rotationInfluenceX * -0.16,
      delta * 3.6
    );
  });

  return (
    <group ref={modelRootRef} position={[0, 0, 0]}>
      <primitive object={model} position={[-center.x, -center.y, -center.z]} />
    </group>
  );
};

class GhostCanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export const Ghost3D = ({
  activeIndex,
  totalSections,
}: {
  activeIndex: number;
  totalSections: number;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isResolvingModel, setIsResolvingModel] = useState(true);
  const [modelUnavailable, setModelUnavailable] = useState(false);

  const resolvedAssetUrl = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.beliefs.ghostModel,
    'site-assets/about/beliefs/ghost.glb'
  );

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const resolveModel = async () => {
      setIsResolvingModel(true);
      setModelUnavailable(false);

      const candidates = buildModelCandidates(resolvedAssetUrl);

      for (const candidate of candidates) {
        const isValid = await canLoadModel(candidate, controller.signal);
        if (!isValid) continue;

        if (isCancelled) return;
        setModelUrl(candidate);
        setIsResolvingModel(false);
        useGLTF.preload(candidate);
        return;
      }

      if (!isCancelled) {
        setModelUrl(null);
        setModelUnavailable(true);
        setIsResolvingModel(false);
      }
    };

    void resolveModel();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [resolvedAssetUrl]);

  if (isResolvingModel || modelUnavailable || !modelUrl) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <GhostCanvasErrorBoundary
        onError={() => {
          setModelUnavailable(true);
          setModelUrl(null);
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.8], fov: 40 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[3, 4, 6]} intensity={1.3} />
          <directionalLight
            position={[-3, 1.5, 4]}
            intensity={0.45}
            color="#dbe6ff"
          />
          <Suspense fallback={null}>
            <GhostModel
              modelUrl={modelUrl}
              activeIndex={activeIndex}
              totalSections={totalSections}
              isMobile={isMobile}
            />
          </Suspense>
        </Canvas>
      </GhostCanvasErrorBoundary>
    </div>
  );
};
