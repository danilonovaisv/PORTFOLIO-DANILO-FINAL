'use client';

import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GhostParams } from './GhostParams';

function useComposer() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer | null>(null);
  const analogPass = useRef<ShaderPass | null>(null);

  const analogShader = useMemo(
    () => ({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uAnalogGrain: { value: GhostParams.analogGrain },
        uAnalogBleeding: { value: GhostParams.analogBleeding },
        uAnalogVSync: { value: GhostParams.analogVSync },
        uAnalogScanlines: { value: GhostParams.analogScanlines },
        uAnalogVignette: { value: GhostParams.analogVignette },
        uAnalogJitter: { value: GhostParams.analogJitter },
        uAnalogIntensity: { value: GhostParams.analogIntensity },
        uLimboMode: { value: 0.0 },
      },
      vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uAnalogGrain;
      uniform float uAnalogBleeding;
      uniform float uAnalogVSync;
      uniform float uAnalogScanlines;
      uniform float uAnalogVignette;
      uniform float uAnalogJitter;
      uniform float uAnalogIntensity;
      uniform float uLimboMode;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float gaussian(float z, float u, float o) {
        return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
      }

      vec3 grain(vec2 uv, float time, float intensity) {
        float seed = dot(uv, vec2(12.9898,78.233));
        float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
        noise = gaussian(noise, 0.0, 0.25);
        return vec3(noise) * intensity;
      }

      void main() {
        vec2 uv = vUv;
        float time = uTime * 1.8;

        // Jitter
        vec2 jitteredUV = uv;
        if (uAnalogJitter > 0.01) {
          float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
          jitteredUV.x += jitterAmount;
          jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
        }

        // VSync roll
        if (uAnalogVSync > 0.01) {
          float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
          float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
          jitteredUV.y += vsyncRoll * vsyncChance;
        }

        vec4 color = texture2D(tDiffuse, jitteredUV);

        // Channel bleeding
        if (uAnalogBleeding > 0.01) {
          float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
          float offsetPhase = time * 1.5 + uv.y * 20.0;

          vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
          vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);

          float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
          float g = texture2D(tDiffuse, jitteredUV).g;
          float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;

          color = vec4(r,g,b,color.a);
        }

        // Grain
        if (uAnalogGrain > 0.01) {
          vec3 g = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
          g *= (1.0 - color.rgb);
          color.rgb += g;
        }

        // Scanlines
        if (uAnalogScanlines > 0.01) {
          float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
          float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
          float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);

          float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - horizontalLines);
        }

        // Vignette
        if (uAnalogVignette > 0.01) {
          vec2 vignetteUV = (uv - 0.5) * 2.0;
          float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
          color.rgb *= vignette;
        }

        if (uLimboMode > 0.5) {
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          color.rgb = vec3(gray);
        }

        gl_FragColor = color;
      }
    `,
    }),
    [size.width, size.height]
  );

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setClearColor(0x000000, 0); // transparent

    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));

    // @ts-ignore
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3,
      1.25,
      0.0
    );
    c.addPass(bloom);

    const a = new ShaderPass(analogShader);
    c.addPass(a);

    c.addPass(new OutputPass());

    composer.current = c;
    analogPass.current = a;

    return () => {
      c.dispose();
      composer.current = null;
      analogPass.current = null;
    };
  }, [gl, scene, camera, size.width, size.height, analogShader]);

  useEffect(() => {
    composer.current?.setSize(size.width, size.height);
    analogPass.current?.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height]);

  return { composer, analogPass };
}

export function GhostEffect() {
  const { composer, analogPass } = useComposer();
  useFrame(({ clock }) => {
    const c = composer.current;
    if (!c) return;
    if (analogPass.current) {
      analogPass.current.uniforms.uTime.value = clock.getElapsedTime();
      analogPass.current.uniforms.uLimboMode.value = GhostParams.limboMode
        ? 1.0
        : 0.0;
      analogPass.current.uniforms.uAnalogIntensity.value =
        GhostParams.analogIntensity;
      analogPass.current.uniforms.uAnalogGrain.value = GhostParams.analogGrain;
      analogPass.current.uniforms.uAnalogBleeding.value =
        GhostParams.analogBleeding;
      analogPass.current.uniforms.uAnalogVSync.value = GhostParams.analogVSync;
      analogPass.current.uniforms.uAnalogScanlines.value =
        GhostParams.analogScanlines;
      analogPass.current.uniforms.uAnalogVignette.value =
        GhostParams.analogVignette;
      analogPass.current.uniforms.uAnalogJitter.value =
        GhostParams.analogJitter;
    }
    c.render();
  }, 1);

  // Prevent R3F default render loop from double-rendering
  return null;
}
