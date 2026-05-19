'use client';
 
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { m } from 'motion/react';
import type { MotionValue } from 'motion/react';
 
interface ShaderAnimationProps {
  /** Controle de opacidade opcional (suporta MotionValue ou number simples) */
  opacity?: MotionValue<number> | number;
  /** Classe CSS customizada para o container */
  className?: string;
}
 
export function ShaderAnimation({ opacity, className }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (!containerRef.current) return;
 
    const container = containerRef.current;
 
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;
 
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
 
      float random(in float x) {
        return fract(sin(x) * 1e4);
      }
 
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
 
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256.0, 256.0);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);
 
        float t = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;
 
        float lineIntensity = 0.0;
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            lineIntensity += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv));
          }
        }
 
        // Blue -> Purple -> Blue gradient mapping (Awwwards design signature)
        vec3 blue1 = vec3(0.15, 0.40, 1.00);
        vec3 purple = vec3(0.70, 0.15, 1.00);
        vec3 blue2 = vec3(0.10, 0.30, 0.95);
 
        float xNorm = (uv.x + 1.0) * 0.5;
        vec3 gradColor = mix(blue1, purple, smoothstep(0.0, 0.5, xNorm));
        gradColor = mix(gradColor, blue2, smoothstep(0.5, 1.0, xNorm));
        gradColor = mix(gradColor, vec3(0.45, 0.20, 0.90), sin(time * 0.25) * 0.15 + 0.1);
 
        gl_FragColor = vec4(clamp(gradColor * lineIntensity, 0.0, 1.0), 1.0);
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
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    scene.add(new THREE.Mesh(geometry, material));
 
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
 
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
 
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(canvas.width, canvas.height);
    };
 
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
 
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    animate();
 
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      if (container.contains(canvas)) container.removeChild(canvas);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);
 
  return (
    <m.div
      ref={containerRef}
      aria-hidden="true"
      data-testid="shader-lines-canvas"
      style={{ opacity }}
      className={
        className ||
        'fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#040013]'
      }
    />
  );
}
