// src/components/canvas/home/postprocessing/AnalogDecayPass.tsx
'use client';

import React, { forwardRef, useMemo } from 'react';
import * as THREE from 'three';

import { Effect } from 'postprocessing';

// Shader Fragment exato da referência (CodePen)
const fragmentShader = `
uniform float uTime;
uniform float uAnalogGrain;
uniform float uAnalogBleeding;
uniform float uAnalogVSync;
uniform float uAnalogScanlines;
uniform float uAnalogVignette;
uniform float uAnalogJitter;
uniform float uAnalogIntensity;
uniform float uLimboMode;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float gaussian(float z, float u, float o) {
  return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

vec3 grain(vec2 uv, float time, float intensity) {
  float seed = dot(uv, vec2(12.9898, 78.233));
  float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
  noise = gaussian(noise, 0.0, 0.5 * 0.5);
  return vec3(noise) * intensity;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float time = uTime * 1.8;
  vec2 vUv = uv;
  
  // Analog Jitter - Instabilidade temporal
  vec2 jitteredUV = vUv;
  if (uAnalogJitter > 0.01) {
    float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
    jitteredUV.x += jitterAmount;
    jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
  }

  // VHS VSync Roll
  if (uAnalogVSync > 0.01) {
    float vsyncRoll = sin(time * 2.0 + vUv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
    float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
    jitteredUV.y += vsyncRoll * vsyncChance;
  }

  vec4 color = texture2D(inputBuffer, jitteredUV);

  // Color Bleeding (Separação de canais RGB)
  if (uAnalogBleeding > 0.01) {
    float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
    float offsetPhase = time * 1.5 + vUv.y * 20.0;
    vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
    vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
    
    float r = texture2D(inputBuffer, jitteredUV + redOffset).r;
    float g = texture2D(inputBuffer, jitteredUV).g;
    float b = texture2D(inputBuffer, jitteredUV + blueOffset).b;
    color = vec4(r, g, b, color.a);
  }

  // Scanlines
  if (uAnalogScanlines > 0.01) {
    float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
    float scanlinePattern = sin(vUv.y * scanlineFreq) * 0.5 + 0.5;
    float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
    color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
  }

  // Vignette
  if (uAnalogVignette > 0.01) {
    vec2 vignetteUV = (vUv - 0.5) * 2.0;
    float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
    color.rgb *= vignette;
  }

  // Limbo Mode (Black and White)
  if (uLimboMode > 0.5) {
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = vec3(gray);
  }

  outputColor = color;
}
`;

// Implementação do Effect para o PostProcessing
class AnalogDecayEffect extends Effect {
  constructor(props: any = {}) {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new THREE.Uniform(1)],
        ['uAnalogGrain', new THREE.Uniform(props.grain ?? 3.4)],
        ['uAnalogBleeding', new THREE.Uniform(props.bleeding ?? 3.0)],
        ['uAnalogVSync', new THREE.Uniform(props.vsync ?? 3.0)],
        ['uAnalogScanlines', new THREE.Uniform(props.scanlines ?? 1.0)],
        ['uAnalogVignette', new THREE.Uniform(props.vignette ?? 3.0)],
        ['uAnalogJitter', new THREE.Uniform(props.jitter ?? 0.4)],
        ['uAnalogIntensity', new THREE.Uniform(props.intensity ?? 0.6)],
        ['uLimboMode', new THREE.Uniform(0.0)],
      ]),
    });
  }

  update(_: any, _2: any, deltaTime: number) {
    const time = this.uniforms.get('uTime');
    if (time) time.value += deltaTime;
  }
}

// Wrapper para usar dentro do EffectComposer
export const AnalogDecay = forwardRef((props: any, ref) => {
  const effect = useMemo(() => new AnalogDecayEffect(props), [props]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export default AnalogDecay;
