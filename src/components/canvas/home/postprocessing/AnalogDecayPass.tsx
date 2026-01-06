// src/components/canvas/home/postprocessing/AnalogDecayPass.tsx
'use client';

import * as THREE from 'three';
import { Uniform } from 'three';
import { Effect } from 'postprocessing';
import { wrapEffect } from '@react-three/postprocessing';

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
float random(float x) {
  return fract(sin(x) * 43758.5453123);
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
  vec2 jitteredUV = uv;

  // Jitter
  if (uAnalogJitter > 0.01) {
    float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
    jitteredUV.x += jitterAmount;
    jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
  }

  // VSync
  if (uAnalogVSync > 0.01) {
    float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
    float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
    jitteredUV.y += vsyncRoll * vsyncChance;
  }

  vec4 color = texture2D(inputBuffer, jitteredUV);

  // Bleeding
  if (uAnalogBleeding > 0.01) {
    float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
    float offsetPhase = time * 1.5 + uv.y * 20.0;
    vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
    vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
    float r = texture2D(inputBuffer, jitteredUV + redOffset).r;
    float g = texture2D(inputBuffer, jitteredUV).g;
    float b = texture2D(inputBuffer, jitteredUV + blueOffset).b;
    color = vec4(r, g, b, color.a);
  }

  // Grain
  if (uAnalogGrain > 0.01) {
    vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
    grainEffect *= (1.0 - color.rgb);
    color.rgb += grainEffect;
  }

  // Scanlines
  if (uAnalogScanlines > 0.01) {
    float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
    float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
    float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
    color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
  }

  // Vignette
  if (uAnalogVignette > 0.6) {
    vec2 vignetteUV = (uv - 0.5) * 2.0;
    float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
    color.rgb *= vignette;
  }

  outputColor = color;
}
`;

class AnalogDecayEffectImpl extends Effect {
  constructor() {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new Uniform(0.2)],
        ['uAnalogGrain', new Uniform(1.4)],
        ['uAnalogBleeding', new Uniform(3.9)],
        ['uAnalogVSync', new Uniform(2.2)],
        ['uAnalogScanlines', new Uniform(0.6)],
        ['uAnalogVignette', new Uniform(4.8)],
        ['uAnalogJitter', new Uniform(0.2)],
        ['uAnalogIntensity', new Uniform(3.0)],
        ['uLimboMode', new Uniform(0.0)],
      ]),
    });
  }

  update(
    renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number
  ) {
    const uTime = this.uniforms.get('uTime');
    if (uTime) uTime.value += deltaTime;
  }
}

// wrapEffect cria o componente React automaticamente
const AnalogDecayPass = wrapEffect(AnalogDecayEffectImpl);

export default AnalogDecayPass;
