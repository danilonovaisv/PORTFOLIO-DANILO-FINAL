import * as THREE from 'three';

export const createGlassBackgroundScene = () => {
  const scene = new THREE.Scene();
  const gradient = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uParallax: { value: 0 },
    },
    transparent: true,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uParallax;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;
        uv.y += uParallax * 0.2;
        float n = noise(uv * 5.0 + uTime * 0.15);
        vec3 c1 = vec3(0.05, 0.08, 0.14);
        vec3 c2 = vec3(0.24, 0.38, 0.68);
        vec3 c3 = vec3(0.1, 0.18, 0.32);
        float grad = smoothstep(0.0, 1.0, uv.y + n * 0.12);
        vec3 color = mix(c1, c2, grad);
        color = mix(color, c3, 0.25 + n * 0.1);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 6, 1, 1), gradient);
  plane.position.set(0, 0, -2);
  scene.add(plane);

  return { scene, gradientMaterial: gradient, gradientPlane: plane };
};
