'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GhostSceneProps {
  onLightMove: (_data: {
    x: number; // 0–1
    y: number; // 0–1
    intensity: number;
  }) => void;
}

const GhostScene: React.FC<GhostSceneProps> = ({ onLightMove }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let disposed = false;

    const canvas = canvasRef.current;
    if (!canvas || startedRef.current) return;
    startedRef.current = true;

    /* ⏳ ADIAR PARA O PRÓXIMO FRAME (CRÍTICO) */
    requestAnimationFrame(() => {
      if (disposed) return;

      /* ================= CONTEXTO WEBGL ================= */

      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) {
        console.warn('WebGL not supported');
        return;
      }

      /* ================= SCENE ================= */

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 12;

      let renderer: THREE.WebGLRenderer;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          precision: 'mediump', // 🔥 EVITA CRASH DE PRECISION
        });
      } catch (e) {
        console.error('Failed to create WebGLRenderer', e);
        return;
      }

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      /* ================= LIGHTS ================= */

      scene.add(new THREE.AmbientLight(0x080820, 0.35));

      const rim = new THREE.DirectionalLight(0x50e3c2, 1.2);
      rim.position.set(6, 4, 6);
      scene.add(rim);

      /* ================= GHOST ================= */

      const ghostMat = new THREE.MeshStandardMaterial({
        color: 0x0f2027,
        emissive: new THREE.Color(0xff4500),
        emissiveIntensity: 7.5,
        transparent: true,
        opacity: 0.9,
      });

      const geo = new THREE.SphereGeometry(2, 40, 40);
      const pos = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < pos.length; i += 3) {
        if (pos[i + 1] < -0.2) {
          pos[i + 1] =
            -2 + Math.sin(pos[i] * 5) * 0.35 + Math.cos(pos[i + 2] * 4) * 0.25;
        }
      }
      geo.computeVertexNormals();

      const ghost = new THREE.Mesh(geo, ghostMat);
      scene.add(ghost);

      /* ================= INPUT ================= */

      const mouse = new THREE.Vector2();
      const target = new THREE.Vector2();

      const onMouseMove = (e: MouseEvent) => {
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', onMouseMove);

      /* ================= RESIZE ================= */

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      /* ================= LOOP ================= */

      let t = 0;

      const animate = () => {
        if (disposed) return;

        t += 0.01;
        mouse.lerp(target, 0.08);

        ghost.position.x += (mouse.x * 6 - ghost.position.x) * 0.08;
        ghost.position.y += (mouse.y * 4 - ghost.position.y) * 0.08;
        ghost.position.y += Math.sin(t * 1.6) * 0.15;

        ghost.rotation.y = mouse.x * 0.4;
        ghost.rotation.x = -mouse.y * 0.25;

        const intensity = 7.5 + Math.sin(t * 2.2) * 1.4;
        ghostMat.emissiveIntensity = intensity;

        onLightMove({
          x: mouse.x * 0.5 + 0.5,
          y: mouse.y * 0.5 + 0.5,
          intensity,
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      /* ================= CLEANUP ================= */

      return () => {
        disposed = true;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        geo.dispose();
        ghostMat.dispose();
      };
    });

    return () => {
      disposed = true;
    };
  }, [onLightMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-30 w-full h-full pointer-events-none"
    />
  );
};

export default GhostScene;
