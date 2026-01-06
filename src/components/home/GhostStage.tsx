'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './GhostStage.module.css';

// Componente de fallback para evitar flashes
const GhostFallback = () => (
  <div className="absolute inset-0 z-0 bg-[#050505] opacity-100 pointer-events-none transition-opacity duration-700 animate-pulse" />
);

// Carregamento dinâmico do Canvas para evitar erros de SSR (window is not defined)
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas'),
  {
    ssr: false,
    loading: () => <GhostFallback />,
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
  active: _active = true,
  onCanvasCreated,
  ghostRef,
}: GhostStageProps) {
  if (reducedMotion) {
    return (
      <div className={`${styles.stageContainer} ${styles.fallbackContainer}`}>
        <div className={`absolute inset-0 ${styles.fallbackBase}`} />
        <div className={`absolute inset-0 ${styles.fallbackGlow}`} />
        <div className={`absolute inset-0 ${styles.fallbackFlare}`} />
        <div className={`absolute inset-0 ${styles.fallbackVignette}`} />
      </div>
    );
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
        <Suspense fallback={<GhostFallback />}>
          <GhostCanvas onCreated={onCanvasCreated} ghostRef={ghostRef} />
        </Suspense>
      </motion.div>

      {/* Gradiente de vinheta para ajudar na leitura do texto */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#020204] via-transparent to-[#020204]/50" />
    </div>
  );
}
