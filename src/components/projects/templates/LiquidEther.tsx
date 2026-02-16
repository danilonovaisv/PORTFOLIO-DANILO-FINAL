'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { WebGLManager } from '@/lib/webgl/liquid-ether/engine';
import { LiquidEtherProps } from '@/lib/webgl/liquid-ether/types';
import { makePaletteTexture } from '@/lib/webgl/liquid-ether/utils';

const DEFAULT_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

/**
 * LiquidEther Component - Ghost System v3
 * Refatorado para melhor performance e legibilidade.
 */
export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = DEFAULT_COLORS,
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<WebGLManager | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Background transparente fixo
  const bgVec4 = useMemo(() => new THREE.Vector4(0, 0, 0, 0), []);
  const paletteTex = useMemo(() => makePaletteTexture(colors), [colors]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // Inicializa o engine
    const webgl = new WebGLManager({
      $wrapper: container,
      paletteTex,
      bgVec4,
      autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration,
    });

    webglRef.current = webgl;
    webgl.start();

    // Observador de Interseção para economia de recursos
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
        isVisibleRef.current = isVisible;
        if (!webglRef.current) return;

        if (isVisible && !document.hidden) {
          webglRef.current.start();
        } else {
          webglRef.current.pause();
        }
      },
      { threshold: [0, 0.01, 0.1] }
    );

    io.observe(container);

    // Observador de Redimensionamento
    const ro = new ResizeObserver(() => {
      if (!webglRef.current) return;
      webglRef.current.resize();
    });
    ro.observe(container);

    const onVisibilityChange = () => {
      if (!webglRef.current) return;
      if (document.hidden) {
        webglRef.current.pause();
      } else if (isVisibleRef.current) {
        webglRef.current.start();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (webglRef.current) {
        webglRef.current.dispose();
      }
      webglRef.current = null;
    };
  }, [paletteTex, bgVec4]); // Recria o engine apenas se a paleta mudar radicalmente

  // Sincronização de propriedades sem recriar o renderer
  useEffect(() => {
    const webgl = webglRef.current;
    if (!webgl) return;

    const sim = webgl.output?.simulation;
    if (!sim) return;

    const prevRes = sim.options.resolution;

    Object.assign(sim.options, {
      mouse_force: mouseForce,
      cursor_size: cursorSize,
      isViscous,
      viscous,
      iterations_viscous: iterationsViscous,
      iterations_poisson: iterationsPoisson,
      dt,
      BFECC,
      resolution,
      isBounce,
    });

    if (webgl.autoDriver) {
      webgl.autoDriver.enabled = autoDemo;
      webgl.autoDriver.speed = autoSpeed;
      webgl.autoDriver.resumeDelay = autoResumeDelay;
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;
    }

    if (resolution !== prevRes) {
      sim.resize();
    }
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
  ]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative overflow-hidden pointer-events-none touch-none ${className || ''}`}
      style={style}
    />
  );
}
