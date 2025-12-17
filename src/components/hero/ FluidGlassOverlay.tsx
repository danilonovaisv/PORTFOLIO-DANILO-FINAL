'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

type FluidGlassOverlayProps = {
  progress: MotionValue<number>;
};

/**
 * FluidGlassOverlay
 * -----------------
 * Camada visual de "vidro líquido" inspirada no reactbits.dev
 * - NÃO altera o texto
 * - NÃO mexe nos spans
 * - NÃO interfere na animação original
 * - Apenas aplica blur + refração visual
 */
export default function FluidGlassOverlay({
  progress,
}: FluidGlassOverlayProps) {
  /**
   * Controle de aparição do efeito
   * Ajuste os ranges se quiser antecipar ou atrasar
   */
  const opacity = useTransform(progress, [0.15, 0.28], [0, 1]);

  return (
    <motion.div
      aria-hidden
      className="fluid-glass-overlay"
      style={{ opacity }}
    />
  );
}
