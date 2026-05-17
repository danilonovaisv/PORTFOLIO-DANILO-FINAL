'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

/**
 * ShaderAnimation Component
 * 
 * Uma seção imersiva com animação procedural via shaders.
 * Representa a filosofia Ghost: "Design que transforma intenção em percepção."
 */
export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: any;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 cyan = vec3(0.31, 0.9, 1.0);
        vec3 pink = vec3(0.96, 0.004, 0.83);
        vec3 bg = vec3(0.016, 0.0, 0.075);

        float glow = 0.0;
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            glow += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        float blend = 0.5 + 0.5 * sin(t * 2.0);
        vec3 color = bg + glow * mix(cyan, pink, blend);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }

        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        background: '#040013',
        overflow: 'hidden',
      }}
    />
  );
}

export function ShaderSection() {
  return (
    <m.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: MOTION_TOKENS.duration.slow, ease: GHOST_EASE }}
      viewport={{ once: true, margin: '-20%' }}
      className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden" 
      style={{ background: '#040013' }}
    >
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>
      
      {/* Editorial Overlay */}
      <div className="absolute inset-0 z-[5] bg-radial-gradient from-transparent via-background/40 to-background opacity-60 pointer-events-none" />

      <div className="relative z-10 px-6 max-w-[1680px] w-full text-center">
        <m.span 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: MOTION_TOKENS.duration.ghostIn, 
            ease: GHOST_EASE,
            delay: 0.3
          }}
          className="block text-3xl md:text-5xl lg:text-7xl leading-tight font-semibold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,72,255,0.4)]"
        >
          Design que transforma<br />
          <span className="text-blueAccent">intenção</span> em <span className="text-bluePrimary">percepção</span>.
        </m.span>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-bluePrimary/30 to-transparent" />
    </m.section>
  );
}
