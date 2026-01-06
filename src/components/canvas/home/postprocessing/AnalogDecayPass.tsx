'use client';

import React, { forwardRef, useMemo } from 'react';
import { Uniform, WebGLRenderer, WebGLRenderTarget } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  uniform float uGrain;
  uniform float uScanlines;
  uniform float uVignette;
  uniform float uJitter;

  // Noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 distortedUV = uv;
    
    // Jitter (Horizontal displacement)
    float jitterTime = uTime * uSpeed;
    float n = noise(vec2(uv.y * 100.0, jitterTime));
    if (n > (1.0 - uJitter * 0.1)) { // Only jitter occasionally based on intensity
       distortedUV.x += (n - 0.5) * uIntensity * 0.02;
    }

    // RGB Split / Bleeding based on intensity
    float offset = 0.002 * uIntensity;
    float r = texture2D(inputBuffer, distortedUV + vec2(offset, 0.0)).r;
    float g = texture2D(inputBuffer, distortedUV).g;
    float b = texture2D(inputBuffer, distortedUV - vec2(offset, 0.0)).b;

    // Scanlines
    float scanline = sin(uv.y * 800.0 * 1.0) * 0.04 * uScanlines;
    vec3 color = vec3(r, g, b) - scanline;

    // Grain
    float grainVal = noise(uv * 1000.0 + uTime * 10.0);
    color += (grainVal - 0.5) * uGrain * 0.1;

    // Vignette (Analog style)
    if (uVignette > 0.0) {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(uv, center);
        float vignette = smoothstep(0.4, 0.9, dist * uVignette); 
        color *= (1.0 - vignette * 0.5); 
    }

    outputColor = vec4(color, inputColor.a);
  }
`;

class AnalogDecayEffect extends Effect {
  constructor({
    intensity = 0.5,
    speed = 1.0,
    grain = 0.4,
    scanlines = 1.0,
    vignette = 1.0,
    jitter = 0.5,
  }) {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new Uniform(0)],
        ['uIntensity', new Uniform(intensity)],
        ['uSpeed', new Uniform(speed)],
        ['uGrain', new Uniform(grain)],
        ['uScanlines', new Uniform(scanlines)],
        ['uVignette', new Uniform(vignette)],
        ['uJitter', new Uniform(jitter)],
      ]),
    });
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
    deltaTime: number
  ) {
    const uTime = this.uniforms.get('uTime');
    if (uTime) uTime.value += deltaTime;
  }
}

export const AnalogDecay = forwardRef<
  any,
  {
    intensity?: number;
    speed?: number;
    grain?: number;
    scanlines?: number;
    vignette?: number;
    jitter?: number;
  }
>(
  (
    {
      intensity = 0.5,
      speed = 1.0,
      grain = 0.4,
      scanlines = 1.0,
      vignette = 1.0,
      jitter = 0.5,
    },
    ref
  ) => {
    const effect = useMemo(
      () =>
        new AnalogDecayEffect({
          intensity,
          speed,
          grain,
          scanlines,
          vignette,
          jitter,
        }),
      [intensity, speed, grain, scanlines, vignette, jitter]
    );

    useMemo(() => {
      const uIntensity = effect.uniforms.get('uIntensity');
      const uSpeed = effect.uniforms.get('uSpeed');
      const uGrain = effect.uniforms.get('uGrain');
      const uScanlines = effect.uniforms.get('uScanlines');
      const uVignette = effect.uniforms.get('uVignette');
      const uJitter = effect.uniforms.get('uJitter');

      if (uIntensity) uIntensity.value = intensity;
      if (uSpeed) uSpeed.value = speed;
      if (uGrain) uGrain.value = grain;
      if (uScanlines) uScanlines.value = scanlines;
      if (uVignette) uVignette.value = vignette;
      if (uJitter) uJitter.value = jitter;
    }, [intensity, speed, grain, scanlines, vignette, jitter, effect]);

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

AnalogDecay.displayName = 'AnalogDecay';
