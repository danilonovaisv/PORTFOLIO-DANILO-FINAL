(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/home/webgl/ghost/GhostSphere.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhostSphere",
    ()=>GhostSphere
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostParams.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Eyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Eyes.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function GhostSphere({ positionRef, onMovementUpdate }) {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { pointer, viewport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    // Estado para controle de brilho dos olhos
    const [eyeOpacity, setEyeOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const currentMovementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Criar geometria deformada uma única vez
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GhostSphere.useMemo[geometry]": ()=>{
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2, 40, 40);
            const positions = geo.attributes.position.array;
            // Aplicar deformação "wavy" na parte inferior
            for(let i = 0; i < positions.length; i += 3){
                if (positions[i + 1] < -0.2) {
                    const x = positions[i];
                    const z = positions[i + 2];
                    const noise1 = Math.sin(x * 5) * 0.35;
                    const noise2 = Math.cos(z * 4) * 0.25;
                    const noise3 = Math.sin((x + z) * 3) * 0.15;
                    positions[i + 1] = -2.0 + (noise1 + noise2 + noise3);
                }
            }
            geo.computeVertexNormals();
            return geo;
        }
    }["GhostSphere.useMemo[geometry]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GhostSphere.useFrame": (state, _delta)=>{
            if (!groupRef.current || !meshRef.current) return;
            const time = state.clock.elapsedTime;
            // --- Movimento (Mouse Follow) ---
            // Converter pointer (-1 a 1) para coordenadas do mundo baseadas no viewport
            // Ajuste os multiplicadores (11 e 7 no original) conforme o tamanho do seu viewport
            const targetX = pointer.x * (viewport.width / 2) * 0.8;
            const targetY = pointer.y * (viewport.height / 2) * 0.8;
            const prevPos = groupRef.current.position.clone();
            // Lerp suave para posição do mouse
            groupRef.current.position.x += (targetX - groupRef.current.position.x) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].followSpeed;
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].followSpeed;
            // Atualizar ref global para outros componentes (atmosfera, partículas)
            positionRef.current.copy(groupRef.current.position);
            // --- Flutuação ---
            const float1 = Math.sin(time * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].floatSpeed * 1.5) * 0.03;
            const float2 = Math.cos(time * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].floatSpeed * 0.7) * 0.018;
            const float3 = Math.sin(time * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].floatSpeed * 2.3) * 0.008;
            groupRef.current.position.y += float1 + float2 + float3;
            // --- Rotação e Tilt ---
            const mouseDirection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](targetX - groupRef.current.position.x, targetY - groupRef.current.position.y).normalize();
            const tiltStrength = 0.1 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].wobbleAmount;
            const tiltDecay = 0.95;
            meshRef.current.rotation.z = meshRef.current.rotation.z * tiltDecay + -mouseDirection.x * tiltStrength * (1 - tiltDecay);
            meshRef.current.rotation.x = meshRef.current.rotation.x * tiltDecay + mouseDirection.y * tiltStrength * (1 - tiltDecay);
            meshRef.current.rotation.y = Math.sin(time * 1.4) * 0.05 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].wobbleAmount;
            // --- Escala (Respiração) ---
            const pulse1 = Math.sin(time * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].pulseSpeed) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].pulseIntensity;
            const scaleVariation = 1 + Math.sin(time * 2.1) * 0.025 * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].wobbleAmount + pulse1 * 0.015;
            const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
            const finalScale = scaleVariation * scaleBreath;
            meshRef.current.scale.set(finalScale, finalScale, finalScale);
            // --- Material Pulsing ---
            const breathe = Math.sin(time * 0.6) * 0.12;
            const mat = meshRef.current.material;
            mat.emissiveIntensity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].emissiveIntensity + pulse1 + breathe;
            // --- Eye Logic ---
            const movementAmount = prevPos.distanceTo(groupRef.current.position);
            currentMovementRef.current = currentMovementRef.current * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].eyeGlowDecay + movementAmount * (1 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].eyeGlowDecay);
            const isMoving = currentMovementRef.current > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].movementThreshold;
            const targetGlow = isMoving ? 1.0 : 0.0;
            const glowChangeSpeed = isMoving ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].eyeGlowResponse * 2 : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].eyeGlowResponse;
            setEyeOpacity({
                "GhostSphere.useFrame": (prev)=>prev + (targetGlow - prev) * glowChangeSpeed
            }["GhostSphere.useFrame"]);
            // Notificar pai sobre movimento para partículas
            onMovementUpdate(isMoving, movementAmount * 100); // Scale up movement for logic
        }
    }["GhostSphere.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                geometry: geometry,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].bodyColor,
                    transparent: true,
                    opacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].ghostOpacity,
                    emissive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].glowColor,
                    emissiveIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].emissiveIntensity,
                    roughness: 0.02,
                    metalness: 0.0,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                    alphaTest: 0.1
                }, void 0, false, {
                    fileName: "[project]/src/components/home/webgl/ghost/GhostSphere.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/ghost/GhostSphere.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Eyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Eyes"], {
                eyeOpacity: eyeOpacity
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/ghost/GhostSphere.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/ghost/GhostSphere.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_s(GhostSphere, "bEhc35NGV/jVfUODGz8SDDzsIdU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = GhostSphere;
var _c;
__turbopack_context__.k.register(_c, "GhostSphere");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/AtmosphereVeil.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AtmosphereVeil",
    ()=>AtmosphereVeil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostParams.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = `
  uniform vec3 ghostPosition;
  uniform float revealRadius;
  uniform float fadeStrength;
  uniform float baseOpacity;
  uniform float revealOpacity;
  uniform float time;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    float dist = distance(vWorldPosition.xy, ghostPosition.xy);
    
    // Pulsing reveal radius
    float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
    
    // Create smooth reveal gradient
    float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
    reveal = pow(reveal, fadeStrength);
    
    // Mix between revealed and base opacity
    float opacity = mix(revealOpacity, baseOpacity, reveal);
    
    // EXTREMELY low RGB values to avoid bloom interference
    gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
  }
`;
function AtmosphereVeil({ ghostPosition }) {
    _s();
    const materialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AtmosphereVeil.useMemo[uniforms]": ()=>({
                ghostPosition: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0)
                },
                revealRadius: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].revealRadius
                },
                fadeStrength: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fadeStrength
                },
                baseOpacity: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].baseOpacity
                },
                revealOpacity: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].revealOpacity
                },
                time: {
                    value: 0
                }
            })
    }["AtmosphereVeil.useMemo[uniforms]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "AtmosphereVeil.useFrame": (state)=>{
            if (materialRef.current) {
                materialRef.current.uniforms.time.value = state.clock.elapsedTime;
                materialRef.current.uniforms.ghostPosition.value.copy(ghostPosition.current);
            }
        }
    }["AtmosphereVeil.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            0,
            0,
            -50
        ],
        renderOrder: -100,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    300,
                    300
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                ref: materialRef,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: uniforms,
                transparent: true,
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(AtmosphereVeil, "mxMSLax264v9PNGkK8Hncs992Ic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = AtmosphereVeil;
var _c;
__turbopack_context__.k.register(_c, "AtmosphereVeil");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/Particles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Particles",
    ()=>Particles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostParams.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Particles({ ghostPosition, isGhostMoving, movementSpeed }) {
    _s();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastEmitTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Geometrias reutilizáveis
    const geometries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[geometries]": ()=>[
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.05, 6, 6),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TetrahedronGeometry"](0.04, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.045, 0)
            ]
    }["Particles.useMemo[geometries]"], []);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].particleColor,
                transparent: true,
                opacity: 0,
                alphaTest: 0.1
            })
    }["Particles.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Particles.useFrame": (state)=>{
            const time = state.clock.elapsedTime;
            const now = performance.now();
            // --- Emissão de Partículas ---
            const shouldCreate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].createParticlesOnlyWhenMoving ? isGhostMoving && movementSpeed > 0.5 // Ajuste de sensibilidade
             : true;
            if (shouldCreate && now - lastEmitTime.current > 100) {
                const count = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].particleCreationRate, 5); // Limite por frame
                for(let i = 0; i < count; i++){
                    if (particlesRef.current.length >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].particleCount) break;
                    const geom = geometries[Math.floor(Math.random() * geometries.length)];
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geom, material.clone());
                    // Posição inicial (atrás do fantasma)
                    mesh.position.copy(ghostPosition.current);
                    mesh.position.z -= 0.8 + Math.random() * 0.6;
                    mesh.position.x += (Math.random() - 0.5) * 3.5;
                    mesh.position.y += (Math.random() - 0.5) * 3.5 - 0.8;
                    const scale = 0.6 + Math.random() * 0.7;
                    mesh.scale.set(scale, scale, scale);
                    // Cor aleatória leve
                    const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].particleColor);
                    color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
                    mesh.material.color = color;
                    mesh.material.opacity = Math.random() * 0.9;
                    groupRef.current?.add(mesh);
                    particlesRef.current.push({
                        mesh,
                        life: 1.0,
                        decay: Math.random() * 0.003 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].particleDecayRate,
                        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012 - 0.002, (Math.random() - 0.5) * 0.012 - 0.006),
                        rotationSpeed: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015)
                    });
                }
                lastEmitTime.current = now;
            }
            // --- Atualização de Partículas ---
            for(let i = particlesRef.current.length - 1; i >= 0; i--){
                const p = particlesRef.current[i];
                p.life -= p.decay;
                p.mesh.material.opacity = p.life * 0.85;
                // Movimento
                p.mesh.position.add(p.velocity);
                const swirl = Math.cos(time * 1.8 + p.mesh.position.y) * 0.0008;
                p.mesh.position.x += swirl;
                // Rotação
                p.mesh.rotation.x += p.rotationSpeed.x;
                p.mesh.rotation.y += p.rotationSpeed.y;
                p.mesh.rotation.z += p.rotationSpeed.z;
                // Morte
                if (p.life <= 0) {
                    groupRef.current?.remove(p.mesh);
                    p.mesh.geometry.dispose(); // Opcional se geometria for compartilhada, mas material foi clonado
                    p.mesh.material.dispose();
                    particlesRef.current.splice(i, 1);
                }
            }
        }
    }["Particles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef
    }, void 0, false, {
        fileName: "[project]/src/components/home/webgl/Particles.tsx",
        lineNumber: 133,
        columnNumber: 10
    }, this);
}
_s(Particles, "mGMRPOlAOonHyKxyv7XnBo+7hQ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Particles;
var _c;
__turbopack_context__.k.register(_c, "Particles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/Fireflies.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fireflies",
    ()=>Fireflies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostParams.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Fireflies() {
    _s();
    const count = 20;
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Dados estáticos iniciais
    const initialData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Fireflies.useMemo[initialData]": ()=>{
            return new Array(count).fill(0).map({
                "Fireflies.useMemo[initialData]": ()=>({
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20),
                        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflySpeed, (Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflySpeed, (Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflySpeed),
                        phase: Math.random() * Math.PI * 2,
                        pulseSpeed: 2 + Math.random() * 3
                    })
            }["Fireflies.useMemo[initialData]"]);
        }
    }["Fireflies.useMemo[initialData]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Fireflies.useFrame": (state)=>{
            if (!groupRef.current) return;
            const time = state.clock.elapsedTime;
            groupRef.current.children.forEach({
                "Fireflies.useFrame": (child, i)=>{
                    const data = initialData[i];
                    const firefly = child;
                    const glow = firefly.children[0];
                    const light = firefly.children[1];
                    // Pulse
                    const pulsePhase = time + data.phase;
                    const pulse = Math.sin(pulsePhase * data.pulseSpeed) * 0.4 + 0.6;
                    // Update Opacity & Intensity
                    const glowMat = glow.material;
                    const flyMat = firefly.material;
                    glowMat.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflyGlowIntensity * 0.4 * pulse;
                    flyMat.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflyGlowIntensity * 0.9 * pulse;
                    light.intensity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflyGlowIntensity * 0.8 * pulse;
                    // Random Walk
                    data.velocity.x += (Math.random() - 0.5) * 0.001;
                    data.velocity.y += (Math.random() - 0.5) * 0.001;
                    data.velocity.z += (Math.random() - 0.5) * 0.001;
                    data.velocity.clampLength(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].fireflySpeed);
                    firefly.position.add(data.velocity);
                    // Bounds check
                    if (Math.abs(firefly.position.x) > 30) data.velocity.x *= -0.5;
                    if (Math.abs(firefly.position.y) > 20) data.velocity.y *= -0.5;
                    if (Math.abs(firefly.position.z) > 15) data.velocity.z *= -0.5;
                }
            }["Fireflies.useFrame"]);
        }
    }["Fireflies.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: initialData.map((data, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: data.position,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.02,
                            2,
                            2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#ffff44",
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.08,
                                    8,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: "#ffff88",
                                transparent: true,
                                opacity: 0.4,
                                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        color: "#ffff44",
                        distance: 3,
                        decay: 2,
                        intensity: 0.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Fireflies, "MxWJytN6BGW0dAq0Liyj3leYzlU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Fireflies;
var _c;
__turbopack_context__.k.register(_c, "Fireflies");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/GhostCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GhostCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+fiber@9.4.2_@types+react@19.2.7_react-dom@19.2.3_react@19.2.3__react@19.2.3_three@0.182.0/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$postprocessing$40$3$2e$0$2e$4_$40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$do_1ba75cbd897d3f30bb699ab4beff6ab0$2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-three+postprocessing@3.0.4_@react-three+fiber@9.4.2_@types+react@19.2.7_react-do_1ba75cbd897d3f30bb699ab4beff6ab0/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostSphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostSphere.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/AtmosphereVeil.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Particles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Fireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Fireflies.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$postprocessing$2f$AnalogDecayPass$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/postprocessing/AnalogDecayPass.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/ghost/GhostParams.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function GhostCanvas() {
    _s();
    const ghostPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
    const [isGhostMoving, setIsGhostMoving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [movementSpeed, setMovementSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleMovementUpdate = (moving, speed)=>{
        setIsGhostMoving(moving);
        setMovementSpeed(speed);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-0 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_three$40$0$2e$182$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            dpr: [
                1,
                2
            ],
            camera: {
                position: [
                    0,
                    0,
                    20
                ],
                fov: 75
            },
            gl: {
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
                toneMappingExposure: 0.9
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.08,
                        color: "#0a0a2e"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            -8,
                            6,
                            -4
                        ],
                        intensity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].rimLightIntensity,
                        color: "#4a90e2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            8,
                            -4,
                            -6
                        ],
                        intensity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostParams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParams"].rimLightIntensity * 0.7,
                        color: "#50e3c2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$ghost$2f$GhostSphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostSphere"], {
                        positionRef: ghostPosRef,
                        onMovementUpdate: handleMovementUpdate
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtmosphereVeil"], {
                        ghostPosition: ghostPosRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Particles"], {
                        ghostPosition: ghostPosRef,
                        isGhostMoving: isGhostMoving,
                        movementSpeed: movementSpeed
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Fireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fireflies"], {}, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$postprocessing$40$3$2e$0$2e$4_$40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$do_1ba75cbd897d3f30bb699ab4beff6ab0$2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
                        enableNormalPass: false,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$postprocessing$40$3$2e$0$2e$4_$40$react$2d$three$2b$fiber$40$9$2e$4$2e$2_$40$types$2b$react$40$19$2e$2$2e$7_react$2d$do_1ba75cbd897d3f30bb699ab4beff6ab0$2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                                luminanceThreshold: 0.0,
                                mipmapBlur: true,
                                intensity: 0.3,
                                radius: 0.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$postprocessing$2f$AnalogDecayPass$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalogDecayEffect"], {}, void 0, false, {
                                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(GhostCanvas, "2U/il+CAPCQyWrV5IjcoulJOTXc=");
_c = GhostCanvas;
var _c;
__turbopack_context__.k.register(_c, "GhostCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/GhostCanvas.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/home/webgl/GhostCanvas.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_home_webgl_d59d3aa5._.js.map