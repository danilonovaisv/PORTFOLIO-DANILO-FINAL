(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/src/components/ui/backgrounds/GhostCursor.tsx [app-client] (ecmascript)',
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/build/three.core.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/examples/jsm/postprocessing/EffectComposer.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/examples/jsm/postprocessing/RenderPass.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/three@0.183.2/node_modules/three/examples/jsm/postprocessing/ShaderPass.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const GhostCursor = ({
      className,
      style,
      trailLength = 50,
      inertia = 0.5,
      grainIntensity = 0.05,
      bloomStrength = 0.1,
      bloomRadius = 1.0,
      bloomThreshold = 0.025,
      brightness = 1,
      color = '#B19EEF',
      mixBlendMode = 'screen',
      edgeIntensity = 0,
      maxDevicePixelRatio = 0.5,
      targetPixels,
      fadeDelayMs,
      fadeDurationMs,
      zIndex = 10,
    }) => {
      _s();
      const containerRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const rendererRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const composerRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const materialRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const bloomPassRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const filmPassRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      // Trail circular buffer
      const trailBufRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])([]);
      const headRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(0);
      const rafRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const resizeObsRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const currentMouseRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Vector2'
        ](0.5, 0.5)
      );
      const velocityRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Vector2'
        ](0, 0)
      );
      const fadeOpacityRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(1.0);
      const lastMoveTimeRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(typeof performance !== 'undefined' ? performance.now() : Date.now());
      const pointerActiveRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(false);
      const runningRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(false);
      const isTouch = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'GhostCursor.useMemo[isTouch]': () =>
            ('TURBOPACK compile-time value', 'object') !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0),
        }['GhostCursor.useMemo[isTouch]'],
        []
      );
      const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);
      const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
      const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);
      const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;
      const fragmentShader = `
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

      float smoke = fbm(p * iScale + r * 0.8);
      float radius = 0.5 + 0.3 * (1.0 / iScale);
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
      float alpha = pow(smoke, 2.5) * distFactor;

      vec3 c1 = tint1(iBaseColor);
      vec3 c2 = tint2(iBaseColor);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

      return vec4(color * alpha * intensity, alpha * intensity);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;

      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }

      colorAcc *= iBrightness;

      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
      float k = clamp(iEdgeIntensity, 0.0, 1.0);
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
      gl_FragColor = vec4(colorAcc, outAlpha);
    }
  `;
      const FilmGrainShader = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'GhostCursor.useMemo[FilmGrainShader]': () => {
            return {
              uniforms: {
                tDiffuse: {
                  value: null,
                },
                iTime: {
                  value: 0,
                },
                intensity: {
                  value: grainIntensity,
                },
              },
              vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
              fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;

        float hash1(float n){ return fract(sin(n)*43758.5453); }

        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `,
            };
          },
        }['GhostCursor.useMemo[FilmGrainShader]'],
        [grainIntensity]
      );
      const UnpremultiplyPass = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'GhostCursor.useMemo[UnpremultiplyPass]': () =>
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'ShaderPass'
            ]({
              uniforms: {
                tDiffuse: {
                  value: null,
                },
              },
              vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
              fragmentShader: `
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float a = max(c.a, 1e-5);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `,
            }),
        }['GhostCursor.useMemo[UnpremultiplyPass]'],
        []
      );
      function calculateScale(el) {
        const r = el.getBoundingClientRect();
        const base = 600;
        const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
        return Math.max(0.5, Math.min(2.0, current / base));
      }
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            const host = containerRef.current;
            const parent = host?.parentElement;
            if (!host || !parent) return;
            const prevParentPos = parent.style.position;
            if (!prevParentPos || prevParentPos === 'static') {
              parent.style.position = 'relative';
            }
            const renderer =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                'WebGLRenderer'
              ]({
                antialias: !isTouch,
                alpha: true,
                depth: false,
                stencil: false,
                powerPreference: isTouch ? 'low-power' : 'high-performance',
                premultipliedAlpha: false,
                preserveDrawingBuffer: false,
              });
            renderer.setClearColor(0x000000, 0);
            rendererRef.current = renderer;
            renderer.domElement.style.pointerEvents = 'none';
            if (mixBlendMode) {
              renderer.domElement.style.mixBlendMode = String(mixBlendMode);
            } else {
              renderer.domElement.style.removeProperty('mix-blend-mode');
            }
            renderer.domElement.style.display = 'block';
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.background = 'transparent';
            host.appendChild(renderer.domElement);
            const scene =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Scene'
              ]();
            const camera =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'OrthographicCamera'
              ](-1, 1, 1, -1, 0, 1);
            const geom =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'PlaneGeometry'
              ](2, 2);
            const maxTrail = Math.max(1, Math.floor(trailLength));
            trailBufRef.current = Array.from(
              {
                length: maxTrail,
              },
              {
                'GhostCursor.useEffect': () =>
                  new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'Vector2'
                  ](0.5, 0.5),
              }['GhostCursor.useEffect']
            );
            headRef.current = 0;
            const baseColor =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Color'
              ](color);
            const material =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'ShaderMaterial'
              ]({
                defines: {
                  MAX_TRAIL_LENGTH: maxTrail,
                },
                uniforms: {
                  iTime: {
                    value: 0,
                  },
                  iResolution: {
                    value:
                      new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'Vector3'
                      ](1, 1, 1),
                  },
                  iMouse: {
                    value:
                      new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'Vector2'
                      ](0.5, 0.5),
                  },
                  iPrevMouse: {
                    value: trailBufRef.current.map(
                      {
                        'GhostCursor.useEffect': (v) => v.clone(),
                      }['GhostCursor.useEffect']
                    ),
                  },
                  iOpacity: {
                    value: 1.0,
                  },
                  iScale: {
                    value: 1.0,
                  },
                  iBaseColor: {
                    value:
                      new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'Vector3'
                      ](baseColor.r, baseColor.g, baseColor.b),
                  },
                  iBrightness: {
                    value: brightness,
                  },
                  iEdgeIntensity: {
                    value: edgeIntensity,
                  },
                },
                vertexShader: baseVertexShader,
                fragmentShader,
                transparent: true,
                depthTest: false,
                depthWrite: false,
              });
            materialRef.current = material;
            const mesh =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Mesh'
              ](geom, material);
            scene.add(mesh);
            const composer =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'EffectComposer'
              ](renderer);
            composerRef.current = composer;
            const renderPass =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'RenderPass'
              ](scene, camera);
            composer.addPass(renderPass);
            const bloomPass =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'UnrealBloomPass'
              ](
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'Vector2'
                ](1, 1),
                bloomStrength,
                bloomRadius,
                bloomThreshold
              );
            bloomPassRef.current = bloomPass;
            composer.addPass(bloomPass);
            const filmPass =
              new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'ShaderPass'
              ](FilmGrainShader);
            filmPassRef.current = filmPass;
            composer.addPass(filmPass);
            composer.addPass(UnpremultiplyPass);
            const resize = {
              'GhostCursor.useEffect.resize': () => {
                const rect = host.getBoundingClientRect();
                const cssW = Math.max(1, Math.floor(rect.width));
                const cssH = Math.max(1, Math.floor(rect.height));
                const currentDPR = Math.min(
                  ('TURBOPACK compile-time truthy', 1)
                    ? window.devicePixelRatio || 1
                    : 'TURBOPACK unreachable',
                  maxDevicePixelRatio
                );
                const need = cssW * cssH * currentDPR * currentDPR;
                const scale =
                  need <= pixelBudget
                    ? 1
                    : Math.max(
                        0.5,
                        Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need)))
                      );
                const pixelRatio = currentDPR * scale;
                renderer.setPixelRatio(pixelRatio);
                renderer.setSize(cssW, cssH, false);
                composer.setPixelRatio?.(pixelRatio);
                composer.setSize(cssW, cssH);
                const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
                const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
                material.uniforms.iResolution.value.set(wpx, hpx, 1);
                material.uniforms.iScale.value = calculateScale(host);
                bloomPass.setSize(wpx, hpx);
              },
            }['GhostCursor.useEffect.resize'];
            resize();
            const ro = new ResizeObserver(resize);
            resizeObsRef.current = ro;
            ro.observe(parent);
            ro.observe(host);
            const start =
              typeof performance !== 'undefined'
                ? performance.now()
                : Date.now();
            const animate = {
              'GhostCursor.useEffect.animate': () => {
                const now = performance.now();
                const t = (now - start) / 1000;
                const mat = materialRef.current;
                const comp = composerRef.current;
                if (pointerActiveRef.current) {
                  velocityRef.current.set(
                    currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
                    currentMouseRef.current.y - mat.uniforms.iMouse.value.y
                  );
                  mat.uniforms.iMouse.value.copy(currentMouseRef.current);
                  fadeOpacityRef.current = 1.0;
                } else {
                  velocityRef.current.multiplyScalar(inertia);
                  if (velocityRef.current.lengthSq() > 1e-6) {
                    mat.uniforms.iMouse.value.add(velocityRef.current);
                  }
                  const dt = now - lastMoveTimeRef.current;
                  if (dt > fadeDelay) {
                    const k = Math.min(1, (dt - fadeDelay) / fadeDuration);
                    fadeOpacityRef.current = Math.max(0, 1 - k);
                  }
                }
                const N = trailBufRef.current.length;
                headRef.current = (headRef.current + 1) % N;
                trailBufRef.current[headRef.current].copy(
                  mat.uniforms.iMouse.value
                );
                const arr = mat.uniforms.iPrevMouse.value;
                for (let i = 0; i < N; i++) {
                  const srcIdx = (headRef.current - i + N) % N;
                  arr[i].copy(trailBufRef.current[srcIdx]);
                }
                mat.uniforms.iOpacity.value = fadeOpacityRef.current;
                mat.uniforms.iTime.value = t;
                if (filmPassRef.current?.uniforms?.iTime) {
                  filmPassRef.current.uniforms.iTime.value = t;
                }
                comp.render();
                if (
                  !pointerActiveRef.current &&
                  fadeOpacityRef.current <= 0.001
                ) {
                  runningRef.current = false;
                  rafRef.current = null;
                  return;
                }
                rafRef.current = requestAnimationFrame(animate);
              },
            }['GhostCursor.useEffect.animate'];
            const ensureLoop = {
              'GhostCursor.useEffect.ensureLoop': () => {
                if (!runningRef.current) {
                  runningRef.current = true;
                  rafRef.current = requestAnimationFrame(animate);
                }
              },
            }['GhostCursor.useEffect.ensureLoop'];
            const onPointerMove = {
              'GhostCursor.useEffect.onPointerMove': (e) => {
                const rect = parent.getBoundingClientRect();
                const x =
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'MathUtils'
                  ].clamp(
                    (e.clientX - rect.left) / Math.max(1, rect.width),
                    0,
                    1
                  );
                const y =
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'MathUtils'
                  ].clamp(
                    1 - (e.clientY - rect.top) / Math.max(1, rect.height),
                    0,
                    1
                  );
                currentMouseRef.current.set(x, y);
                pointerActiveRef.current = true;
                lastMoveTimeRef.current = performance.now();
                ensureLoop();
              },
            }['GhostCursor.useEffect.onPointerMove'];
            const onPointerEnter = {
              'GhostCursor.useEffect.onPointerEnter': () => {
                pointerActiveRef.current = true;
                ensureLoop();
              },
            }['GhostCursor.useEffect.onPointerEnter'];
            const onPointerLeave = {
              'GhostCursor.useEffect.onPointerLeave': () => {
                pointerActiveRef.current = false;
                lastMoveTimeRef.current = performance.now();
                ensureLoop();
              },
            }['GhostCursor.useEffect.onPointerLeave'];
            parent.addEventListener('pointermove', onPointerMove, {
              passive: true,
            });
            parent.addEventListener('pointerenter', onPointerEnter, {
              passive: true,
            });
            parent.addEventListener('pointerleave', onPointerLeave, {
              passive: true,
            });
            ensureLoop();
            return {
              'GhostCursor.useEffect': () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                runningRef.current = false;
                rafRef.current = null;
                parent.removeEventListener('pointermove', onPointerMove);
                parent.removeEventListener('pointerenter', onPointerEnter);
                parent.removeEventListener('pointerleave', onPointerLeave);
                resizeObsRef.current?.disconnect();
                scene.clear();
                geom.dispose();
                material.dispose();
                composer.dispose();
                renderer.forceContextLoss();
                renderer.dispose();
                if (renderer.domElement && renderer.domElement.parentElement) {
                  renderer.domElement.parentElement.removeChild(
                    renderer.domElement
                  );
                }
                if (!prevParentPos || prevParentPos === 'static') {
                  parent.style.position = prevParentPos;
                }
              },
            }['GhostCursor.useEffect'];
          },
        }['GhostCursor.useEffect'],
        [
          trailLength,
          inertia,
          grainIntensity,
          bloomStrength,
          bloomRadius,
          bloomThreshold,
          pixelBudget,
          fadeDelay,
          fadeDuration,
          isTouch,
          color,
          brightness,
          mixBlendMode,
          edgeIntensity,
        ]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            if (materialRef.current) {
              const c =
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'Color'
                ](color);
              materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);
            }
          },
        }['GhostCursor.useEffect'],
        [color]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            if (materialRef.current) {
              materialRef.current.uniforms.iBrightness.value = brightness;
            }
          },
        }['GhostCursor.useEffect'],
        [brightness]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            if (materialRef.current) {
              materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;
            }
          },
        }['GhostCursor.useEffect'],
        [edgeIntensity]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            if (filmPassRef.current?.uniforms?.intensity) {
              filmPassRef.current.uniforms.intensity.value = grainIntensity;
            }
          },
        }['GhostCursor.useEffect'],
        [grainIntensity]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'GhostCursor.useEffect': () => {
            const el = rendererRef.current?.domElement;
            if (!el) return;
            if (mixBlendMode) {
              el.style.mixBlendMode = String(mixBlendMode);
            } else {
              el.style.removeProperty('mix-blend-mode');
            }
          },
        }['GhostCursor.useEffect'],
        [mixBlendMode]
      );
      const mergedStyle = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'GhostCursor.useMemo[mergedStyle]': () => ({
            zIndex,
            ...style,
          }),
        }['GhostCursor.useMemo[mergedStyle]'],
        [zIndex, style]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          ref: containerRef,
          className: `pointer-events-none absolute inset-0 ${className ?? ''}`,
          style: mergedStyle,
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/ui/backgrounds/GhostCursor.tsx',
          lineNumber: 560,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(GhostCursor, 'i6Xre3OE3lpkyO3aDgzQhADp/8c=');
    _c = GhostCursor;
    const __TURBOPACK__default__export__ = GhostCursor;
    var _c;
    __turbopack_context__.k.register(_c, 'GhostCursor');
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
  '[project]/src/components/ui/backgrounds/GhostCursor.tsx [app-client] (ecmascript, next/dynamic entry)',
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        '[project]/src/components/ui/backgrounds/GhostCursor.tsx [app-client] (ecmascript)'
      )
    );
  },
]);

//# sourceMappingURL=src_components_ui_backgrounds_GhostCursor_tsx_03c56965._.js.map
