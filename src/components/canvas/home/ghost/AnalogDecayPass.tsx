'use client';

import React, { forwardRef, useMemo } from 'react';
import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
uniform float uTime;
uniform float uAnalogGrain;
uniform float uAnalogBleeding;
uniform float uAnalogScanlines;
uniform float uAnalogVignette;
uniform float uAnalogIntensity;

// Funções de Ruído de Alta Qualidade (Restauradas)
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float gaussian(float z, float u, float o) {
  return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

vec3 grain(vec2 uv, float time, float intensity) {
  float seed = dot(uv, vec2(12.9898, 78.233));
  float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
  noise = gaussian(noise, 0.0, 0.5); // Distribuição Gaussiana para grão realístico
  return vec3(noise) * intensity;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 p = uv;
  vec3 color = inputColor.rgb;

  // 1. Color Bleeding (Vazamento de cor típico de VHS)
  if (uAnalogBleeding > 0.0) {
    float bleed = uAnalogBleeding * 0.001;
    color.r = texture2D(inputBuffer, p + vec2(bleed, 0.0)).r;
    color.b = texture2D(inputBuffer, p - vec2(bleed, 0.0)).b;
  }

  // 2. Scanlines (Linhas de varredura)
  if (uAnalogScanlines > 0.0) {
    float s = sin((p.y * 800.0) - (uTime * 10.0));
    float scanline = smoothstep(0.4, 0.6, s) * uAnalogScanlines * 0.1;
    color -= scanline;
  }

  // 3. Vignette (Escurecimento de borda)
  vec2 center = p - 0.5;
  float dist = dot(center, center);
  float vignette = 1.0 - (dist * uAnalogVignette);
  color *= smoothstep(0.0, 1.0, vignette);

  // 4. Film Grain (Grão)
  if (uAnalogGrain > 0.0) {
    vec3 g = grain(p, uTime, uAnalogGrain * 0.05);
    color += g;
  }

  // Ajuste de Intensidade Global
  color = mix(inputColor.rgb, color, uAnalogIntensity);

  outputColor = vec4(color, inputColor.a);
}
`;

class AnalogDecayEffectImpl extends Effect {
  constructor({
    grain = 0.5,
    bleeding = 0.5,
    scanlines = 0.5,
    vignette = 1.2,
    intensity = 1.0,
  }) {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new Uniform(0)],
        ['uAnalogGrain', new Uniform(grain)],
        ['uAnalogBleeding', new Uniform(bleeding)],
        ['uAnalogScanlines', new Uniform(scanlines)],
        ['uAnalogVignette', new Uniform(vignette)],
        ['uAnalogIntensity', new Uniform(intensity)],
      ]),
    });
  }

  update(renderer: any, inputBuffer: any, deltaTime: number) {
    const uTime = this.uniforms.get('uTime');
    if (uTime) uTime.value += deltaTime;
  }
}

interface AnalogDecayProps {
  grain?: number;
  bleeding?: number;
  scanlines?: number;
  vignette?: number;
  intensity?: number;
}

export const AnalogDecay = forwardRef<AnalogDecayEffectImpl, AnalogDecayProps>(
  (
    {
      grain = 1.5,
      bleeding = 0.5,
      scanlines = 0.5,
      vignette = 3.2,
      intensity = 1.0,
    },
    ref
  ) => {
    const effect = useMemo(
      () =>
        new AnalogDecayEffectImpl({
          grain,
          bleeding,
          scanlines,
          vignette,
          intensity,
        }),
      [grain, bleeding, scanlines, vignette, intensity]
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);
AnalogDecay.displayName = 'AnalogDecay';
