(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/src/components/ui/backgrounds/Grainient.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/ogl@1.0.11/node_modules/ogl/src/core/Renderer.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/ogl@1.0.11/node_modules/ogl/src/core/Program.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/ogl@1.0.11/node_modules/ogl/src/core/Mesh.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/ogl@1.0.11/node_modules/ogl/src/extras/Triangle.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return [1, 1, 1];
      return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ];
    };
    const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
    const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;
    const Grainient = ({
      timeSpeed = 0.25,
      colorBalance = 0.0,
      warpStrength = 1.0,
      warpFrequency = 5.0,
      warpSpeed = 2.0,
      warpAmplitude = 50.0,
      blendAngle = 0.0,
      blendSoftness = 0.05,
      rotationAmount = 500.0,
      noiseScale = 2.0,
      grainAmount = 0.1,
      grainScale = 2.0,
      grainAnimated = false,
      contrast = 1.5,
      gamma = 1.0,
      saturation = 1.0,
      centerX = 0.0,
      centerY = 0.0,
      zoom = 0.9,
      color1 = '#FF9FFC',
      color2 = '#5227FF',
      color3 = '#B19EEF',
      className = '',
      maxDevicePixelRatio = 1.5,
    }) => {
      _s();
      const containerRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'Grainient.useEffect': () => {
            if (!containerRef.current) return;
            const renderer =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Renderer'
              ]({
                webgl: 2,
                alpha: true,
                antialias: false,
                dpr: Math.min(
                  window.devicePixelRatio || 1,
                  maxDevicePixelRatio
                ),
              });
            const gl = renderer.gl;
            const canvas = gl.canvas;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.display = 'block';
            const container = containerRef.current;
            container.appendChild(canvas);
            const geometry =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Triangle'
              ](gl);
            const program =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Program'
              ](gl, {
                vertex,
                fragment,
                uniforms: {
                  iTime: {
                    value: 0,
                  },
                  iResolution: {
                    value: new Float32Array([1, 1]),
                  },
                  uTimeSpeed: {
                    value: timeSpeed,
                  },
                  uColorBalance: {
                    value: colorBalance,
                  },
                  uWarpStrength: {
                    value: warpStrength,
                  },
                  uWarpFrequency: {
                    value: warpFrequency,
                  },
                  uWarpSpeed: {
                    value: warpSpeed,
                  },
                  uWarpAmplitude: {
                    value: warpAmplitude,
                  },
                  uBlendAngle: {
                    value: blendAngle,
                  },
                  uBlendSoftness: {
                    value: blendSoftness,
                  },
                  uRotationAmount: {
                    value: rotationAmount,
                  },
                  uNoiseScale: {
                    value: noiseScale,
                  },
                  uGrainAmount: {
                    value: grainAmount,
                  },
                  uGrainScale: {
                    value: grainScale,
                  },
                  uGrainAnimated: {
                    value: grainAnimated ? 1.0 : 0.0,
                  },
                  uContrast: {
                    value: contrast,
                  },
                  uGamma: {
                    value: gamma,
                  },
                  uSaturation: {
                    value: saturation,
                  },
                  uCenterOffset: {
                    value: new Float32Array([centerX, centerY]),
                  },
                  uZoom: {
                    value: zoom,
                  },
                  uColor1: {
                    value: new Float32Array(hexToRgb(color1)),
                  },
                  uColor2: {
                    value: new Float32Array(hexToRgb(color2)),
                  },
                  uColor3: {
                    value: new Float32Array(hexToRgb(color3)),
                  },
                },
              });
            const mesh =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ogl$40$1$2e$0$2e$11$2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Mesh'
              ](gl, {
                geometry,
                program,
              });
            const setSize = {
              'Grainient.useEffect.setSize': () => {
                const rect = container.getBoundingClientRect();
                const width = Math.max(1, Math.floor(rect.width));
                const height = Math.max(1, Math.floor(rect.height));
                renderer.setSize(width, height);
                const res = program.uniforms.iResolution.value;
                res[0] = gl.drawingBufferWidth;
                res[1] = gl.drawingBufferHeight;
              },
            }['Grainient.useEffect.setSize'];
            const ro = new ResizeObserver(setSize);
            ro.observe(container);
            setSize();
            let raf = 0;
            const t0 = performance.now();
            const loop = {
              'Grainient.useEffect.loop': (t) => {
                program.uniforms.iTime.value = (t - t0) * 0.001;
                renderer.render({
                  scene: mesh,
                });
                raf = requestAnimationFrame(loop);
              },
            }['Grainient.useEffect.loop'];
            raf = requestAnimationFrame(loop);
            return {
              'Grainient.useEffect': () => {
                cancelAnimationFrame(raf);
                ro.disconnect();
                gl.getExtension('WEBGL_lose_context')?.loseContext();
                try {
                  container.removeChild(canvas);
                } catch {
                  // Ignore
                }
              },
            }['Grainient.useEffect'];
          },
        }['Grainient.useEffect'],
        [
          timeSpeed,
          colorBalance,
          warpStrength,
          warpFrequency,
          warpSpeed,
          warpAmplitude,
          blendAngle,
          blendSoftness,
          rotationAmount,
          noiseScale,
          grainAmount,
          grainScale,
          grainAnimated,
          contrast,
          gamma,
          saturation,
          centerX,
          centerY,
          zoom,
          color1,
          color2,
          color3,
          maxDevicePixelRatio,
        ]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          ref: containerRef,
          className:
            `relative h-full w-full overflow-hidden ${className}`.trim(),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/ui/backgrounds/Grainient.tsx',
          lineNumber: 275,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(Grainient, '8puyVO4ts1RhCfXUmci3vLI3Njw=');
    _c = Grainient;
    const __TURBOPACK__default__export__ = Grainient;
    var _c;
    __turbopack_context__.k.register(_c, 'Grainient');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/ui/backgrounds/Grainient.tsx [app-client] (ecmascript, next/dynamic entry)',
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        '[project]/src/components/ui/backgrounds/Grainient.tsx [app-client] (ecmascript)'
      )
    );
  },
]);

//# sourceMappingURL=src_components_ui_backgrounds_Grainient_tsx_34311011._.js.map
