'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './GhostStage.module.css';

// Carregamento dinâmico do Canvas para evitar erros de SSR (window is not defined)
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas'),
  {
    ssr: false,
    loading: () => <div className={styles.placeholder} />,
  }
);

interface GhostStageProps {
  reducedMotion?: boolean;
  active?: boolean;
  onCanvasCreated?: () => void;
  ghostRef?: React.RefObject<THREE.Group | null>;
}

export function GhostStage({
  reducedMotion = false,
  active = true,
  onCanvasCreated,
  ghostRef,
}: GhostStageProps) {
  if (reducedMotion) {
    return <div className={styles.fallbackBackground} />;
  }

  return (
    <div className={styles.stageContainer}>
      {/* O Canvas deve preencher tudo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full"
      >
        <GhostCanvas
          active={active}
          onCreated={onCanvasCreated}
          ghostRef={ghostRef}
        />
      </motion.div>

      {/* Gradiente de vinheta para ajudar na leitura do texto */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#020204] via-transparent to-[#020204]/50" />
    </div>
  );
}
