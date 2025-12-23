import { forwardRef, useEffect, useMemo } from 'react';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const analogDecayShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;

    void main()
    {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    varying vec2 vUv;

    float rand(vec2 c)
    {
      return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main()
    {
      vec4 col = texture2D(tDiffuse, vUv);
      float g = rand(vUv + uTime) * 0.04;
      gl_FragColor = vec4(col.rgb - g, col.a);
    }
  `,
};

const AnalogDecayPass = forwardRef(function AnalogDecayPass(props, ref) {
  const pass = useMemo(() => new ShaderPass(analogDecayShader), []);
  useEffect(() => {
    return () => void pass.dispose();
  }, [pass]);
  return <primitive ref={ref} object={pass} {...props} />;
});

export default AnalogDecayPass;
