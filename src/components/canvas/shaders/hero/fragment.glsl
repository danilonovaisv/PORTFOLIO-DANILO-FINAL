precision mediump float;

varying vec2 vUv;
varying float vAlpha;
varying vec3 vColor;

void main() {
  // Soft Circle Calculation
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(vUv, center);
  
  // Discard outside circle
  if (dist > 0.5) discard;
  
  // Soft edge glow
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  glow = pow(glow, 2.0); // Sharpen the core
  
  float alpha = vAlpha * glow;
  
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(vColor, alpha);
}
