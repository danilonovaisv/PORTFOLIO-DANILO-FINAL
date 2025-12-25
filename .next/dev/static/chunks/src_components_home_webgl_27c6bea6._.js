(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/home/webgl/Eyes.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Eyes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/Eyes.tsx
'use client';
;
;
;
;
function Eyes({ speedRef }) {
    _s();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const leftEyeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightEyeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseSpeedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const lastMousePos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const currentMovement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Eyes.useEffect": ()=>{
            const handleMouseMove = {
                "Eyes.useEffect.handleMouseMove": (e)=>{
                    if (reducedMotion) return;
                    const mousePos = {
                        x: e.clientX / window.innerWidth * 2 - 1,
                        y: -(e.clientY / window.innerHeight) * 2 + 1
                    };
                    mouseSpeedRef.current.x = Math.abs(mousePos.x - lastMousePos.current.x);
                    mouseSpeedRef.current.y = Math.abs(mousePos.y - lastMousePos.current.y);
                    lastMousePos.current = mousePos;
                    currentMovement.current = currentMovement.current * 0.95 + (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 0.5;
                }
            }["Eyes.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            return ({
                "Eyes.useEffect": ()=>window.removeEventListener('mousemove', handleMouseMove)
            })["Eyes.useEffect"];
        }
    }["Eyes.useEffect"], [
        reducedMotion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Eyes.useFrame": ()=>{
            if (reducedMotion) return;
            // Eye glow based on movement speed
            const mouseGlow = Math.min(currentMovement.current * 5, 1);
            const velocityGlow = speedRef?.current ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(speedRef.current * 0.05, 0, 1) : 0;
            const glowIntensity = Math.min(mouseGlow + velocityGlow, 1.2);
            if (leftEyeRef.current) {
                leftEyeRef.current.material.opacity = glowIntensity;
                leftEyeRef.current.lookAt(camera.position);
            }
            if (rightEyeRef.current) {
                rightEyeRef.current.material.opacity = glowIntensity;
                rightEyeRef.current.lookAt(camera.position);
            }
        }
    }["Eyes.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.7,
                    0.6,
                    1.9
                ],
                scale: [
                    1.1,
                    1.0,
                    0.6
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.45,
                            16,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#0c1d52"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.7,
                    0.6,
                    1.9
                ],
                scale: [
                    1.1,
                    1.0,
                    0.6
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.45,
                            16,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#0c1d52"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: leftEyeRef,
                position: [
                    -0.7,
                    0.6,
                    2.2
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.3,
                            12,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#7cb6ff",
                        transparent: true,
                        opacity: 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: rightEyeRef,
                position: [
                    0.7,
                    0.6,
                    2.0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.3,
                            12,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#7cb6ff",
                        transparent: true,
                        opacity: 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Eyes.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/Eyes.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(Eyes, "EoVgzUlBTesEuxMvOU8awybYTms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Eyes;
var _c;
__turbopack_context__.k.register(_c, "Eyes");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/Ghost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Ghost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Eyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Eyes.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/Ghost.tsx
'use client';
;
;
;
;
function Ghost({ speedRef }) {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Ghost.useMemo[geometry]": ()=>{
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2, 56, 56);
            const positions = geo.attributes.position.array;
            // Create the ghost "skirt" wavy bottom
            for(let i = 0; i < positions.length; i += 3){
                if (positions[i + 1] < -0.4) {
                    const x = positions[i];
                    const z = positions[i + 2];
                    const noise = Math.sin(x * 4) * 0.35 + Math.cos(z * 3) * 0.28;
                    positions[i + 1] = -2.0 + noise;
                }
            }
            geo.computeVertexNormals();
            return geo;
        }
    }["Ghost.useMemo[geometry]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Ghost.useFrame": (state)=>{
            const t = state.clock.elapsedTime;
            const speed = speedRef?.current ?? 0;
            const speedNormalized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(speed * 0.08, 0, 7);
            // Pulsing core
            const pulse = Math.sin(t * 1.8) * 0.2;
            const material = meshRef.current.material;
            material.emissiveIntensity = 6.5 + pulse * 9 + speedNormalized;
            // Floating animation
            const float = Math.sin(t * 1.2) * 0.2;
            meshRef.current.position.y = float;
            glowRef.current.position.y = float;
            // Scale breathing
            const s = 1.1 + Math.sin(t * 0.8) * 0.06 + speedNormalized * 0.012;
            meshRef.current.scale.setScalar(s);
            glowRef.current.scale.setScalar(s * (1.45 + speedNormalized * 0.02));
            // Rotation wobble
            meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
            meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
        }
    }["Ghost.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        scale: 1.2,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                geometry: geometry,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#060a1f",
                        emissive: "#0e5dff",
                        emissiveIntensity: 6.5,
                        transparent: true,
                        opacity: 0.82,
                        roughness: 0,
                        metalness: 1,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Eyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        speedRef: speedRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: glowRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            2.5,
                            32,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#3b82f6",
                        transparent: true,
                        opacity: 0.28,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/Ghost.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/Ghost.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(Ghost, "K7AvyV42tNCpjl71q952j80bji4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Ghost;
var _c;
__turbopack_context__.k.register(_c, "Ghost");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/AtmosphereVeil.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AtmosphereVeil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/AtmosphereVeil.tsx
'use client';
;
;
;
function AtmosphereVeil({ ghostPosRef }) {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const atmosphereMaterial = {
        uniforms: {
            ghostPosition: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0)
            },
            revealRadius: {
                value: 0.2
            },
            fadeStrength: {
                value: 1.7
            },
            baseOpacity: {
                value: 0.03
            },
            revealOpacity: {
                value: 0.001
            },
            time: {
                value: 0
            }
        },
        vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      void main() {
        // Calculate distance in screen-ish space for reveal
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        
        // Pulsing reveal radius
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        
        // Create smooth reveal gradient
        float reveal = smoothstep(dynamicRadius * 0.1, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        
        // Mix between revealed and base opacity
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        
        // Very dark overlay with low alpha for subtle effect
        gl_FragColor = vec4(0.02, 0.02, 0.03, opacity);
      }
    `
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "AtmosphereVeil.useFrame": (state)=>{
            if (!meshRef.current) return;
            const material = meshRef.current.material;
            material.uniforms.time.value = state.clock.elapsedTime;
            if (ghostPosRef?.current) {
                material.uniforms.ghostPosition.value.copy(ghostPosRef.current);
            }
        }
    }["AtmosphereVeil.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        position: [
            0,
            0,
            -40
        ],
        renderOrder: -100,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    300,
                    300
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                args: [
                    atmosphereMaterial
                ],
                transparent: true,
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/AtmosphereVeil.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(AtmosphereVeil, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
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
    "default",
    ()=>Particles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/Particles.tsx
'use client';
;
;
;
function Particles({ count = 250, speedRef }) {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dummy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[dummy]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]()
    }["Particles.useMemo[dummy]"], []);
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[particles]": ()=>{
            const temp = [];
            for(let i = 0; i < count; i++){
                // Particles closer to ghost origin (per reference: scatterRange 3.5)
                const xFactor = (Math.random() - 0.5) * 3.5;
                const yFactor = (Math.random() - 0.5) * 3.5 - 0.8; // Offset down
                const zFactor = -0.8 - Math.random() * 0.6; // Behind ghost
                const decay = Math.random() * 0.003 + 0.005;
                const phase = Math.random() * Math.PI * 2;
                temp.push({
                    xFactor,
                    yFactor,
                    zFactor,
                    decay,
                    phase,
                    life: Math.random(),
                    baseScale: 0.018 + Math.random() * 0.028,
                    spin: 0.6 + Math.random() * 0.8,
                    velocity: {
                        x: (Math.random() - 0.5) * 0.012,
                        y: (Math.random() - 0.5) * 0.012 - 0.002,
                        z: (Math.random() - 0.5) * 0.012 - 0.006
                    }
                });
            }
            return temp;
        }
    }["Particles.useMemo[particles]"], [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Particles.useFrame": (state, delta)=>{
            const t = state.clock.elapsedTime;
            const speedFactor = speedRef?.current ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(0.6 + speedRef.current * 0.06, 0.6, 4.5) : 0.8;
            particles.forEach({
                "Particles.useFrame": (particle, i)=>{
                    // Update life and reset when dead
                    particle.life -= particle.decay * speedFactor * 0.65;
                    if (particle.life <= 0) {
                        particle.life = 1.0;
                        particle.xFactor = (Math.random() - 0.5) * 3.5;
                        particle.yFactor = (Math.random() - 0.5) * 3.5 - 0.8;
                        particle.zFactor = -0.8 - Math.random() * 0.6;
                    }
                    // Position with swirling motion
                    const swirl = Math.cos(t * 1.8 + particle.phase) * 0.28;
                    dummy.position.set(particle.xFactor + swirl + particle.velocity.x * t * 8 * speedFactor, particle.yFactor + particle.velocity.y * t * 8 * speedFactor, particle.zFactor + particle.velocity.z * t * 8 * speedFactor);
                    // Scale based on life (fade out)
                    const scale = particle.baseScale * particle.life * speedFactor;
                    dummy.scale.setScalar(scale);
                    // Rotation animation
                    dummy.rotation.set(t * 1.2 * particle.spin, t * 0.4 * particle.spin, t * 0.25 * particle.spin);
                    dummy.updateMatrix();
                    if (meshRef.current) {
                        meshRef.current.setMatrixAt(i, dummy.matrix);
                    }
                }
            }["Particles.useFrame"]);
            if (meshRef.current) {
                meshRef.current.instanceMatrix.needsUpdate = true;
            }
        }
    }["Particles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: meshRef,
        args: [
            undefined,
            undefined,
            count
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    3,
                    6,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/Particles.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: "#4b8dff",
                transparent: true,
                opacity: 0.55
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/Particles.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/Particles.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(Particles, "dtaPmNTc+gTFG1X3AdUpUMK9aes=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
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
    "default",
    ()=>Fireflies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/Fireflies.tsx
'use client';
;
;
;
function Fireflies({ count = 20 }) {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dummy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Fireflies.useMemo[dummy]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]()
    }["Fireflies.useMemo[dummy]"], []);
    const fireflies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Fireflies.useMemo[fireflies]": ()=>{
            const temp = [];
            for(let i = 0; i < count; i++){
                temp.push({
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20),
                    velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05),
                    phase: Math.random() * Math.PI * 2,
                    pulseSpeed: 1 + Math.random() * 2
                });
            }
            return temp;
        }
    }["Fireflies.useMemo[fireflies]"], [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Fireflies.useFrame": (state)=>{
            const t = state.clock.elapsedTime;
            fireflies.forEach({
                "Fireflies.useFrame": (data, i)=>{
                    // Update position
                    data.position.add(data.velocity);
                    // Bounds check
                    if (Math.abs(data.position.x) > 25) data.velocity.x *= -1;
                    if (Math.abs(data.position.y) > 20) data.velocity.y *= -1;
                    if (Math.abs(data.position.z) > 15) data.velocity.z *= -1;
                    dummy.position.copy(data.position);
                    // Pulse scale/opacity
                    const pulse = Math.sin(t * data.pulseSpeed + data.phase) * 0.5 + 0.5;
                    const scale = 0.8 + pulse * 0.4;
                    dummy.scale.setScalar(scale);
                    dummy.updateMatrix();
                    if (meshRef.current) {
                        meshRef.current.setMatrixAt(i, dummy.matrix);
                    }
                }
            }["Fireflies.useFrame"]);
            if (meshRef.current) {
                meshRef.current.instanceMatrix.needsUpdate = true;
            }
        }
    }["Fireflies.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: meshRef,
        args: [
            undefined,
            undefined,
            count
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    0.06,
                    8,
                    8
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: "#6fd2ff",
                transparent: true,
                opacity: 0.55
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/Fireflies.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(Fireflies, "Gml7rH45h+XNG3mEnAuZYvGbOXs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Fireflies;
var _c;
__turbopack_context__.k.register(_c, "Fireflies");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/postprocessing/AnalogDecayPass.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalogDecayPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shaderMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/shaderMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export e as extend>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const AnalogDecayShader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shaderMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shaderMaterial"])({
    tDiffuse: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](),
    uTime: 10,
    uIntensity: 1.35,
    uGrain: 1.4,
    uScanlines: 1.0,
    uJitter: 0.9
}, /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `, /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    uniform float uGrain;
    uniform float uScanlines;
    uniform float uJitter;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Jitter sutil
      if (uJitter > 0.01) {
        uv += (rand(vec2(uTime)) - 0.5) * uJitter * 0.002;
      }

      vec2 jitter = vec2(
        rand(vec2(uTime * 0.7, uv.y)) - 0.5,
        rand(vec2(uv.x, uTime * 0.9)) - 0.5
      ) * uJitter * 0.0015;

      vec4 baseColor = texture2D(tDiffuse, uv + jitter);
      vec4 colorR = texture2D(tDiffuse, uv + jitter + vec2(0.001 * uJitter, 0.0));
      vec4 colorB = texture2D(tDiffuse, uv + jitter - vec2(0.001 * uJitter, 0.0));
      vec4 color = vec4(colorR.r, baseColor.g, colorB.b, baseColor.a);

      // Grain
      if (uGrain > 0.01) {
        float grain = rand(uv + uTime) * 2.0 - 1.0;
        color.rgb += grain * uGrain * 0.06 * uIntensity;
      }

      // Scanlines
      if (uScanlines > 0.01) {
        float scan = sin(uv.y * 1200.0 + uTime * 2.0) * 0.5 + 0.5;
        color.rgb *= mix(1.0, 0.97, scan * uScanlines * uIntensity);
      }

      gl_FragColor = color;
    }
  `);
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__["extend"])({
    AnalogDecayShader,
    ShaderPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"]
});
function AnalogDecayPass() {
    _s();
    const material = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AnalogDecayPass.useMemo[material]": ()=>new AnalogDecayShader()
    }["AnalogDecayPass.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "AnalogDecayPass.useFrame": (state)=>{
            if (material) {
                material.uniforms.uTime.value = state.clock.elapsedTime;
            }
        }
    }["AnalogDecayPass.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderPass", {
        args: [
            material
        ]
    }, void 0, false, {
        fileName: "[project]/src/components/home/webgl/postprocessing/AnalogDecayPass.tsx",
        lineNumber: 95,
        columnNumber: 10
    }, this);
}
_s(AnalogDecayPass, "6Q9Y/dEciz1GFW9gnhBSxnYXSpU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = AnalogDecayPass;
var _c;
__turbopack_context__.k.register(_c, "AnalogDecayPass");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Ghost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Ghost.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/AtmosphereVeil.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Particles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Fireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/Fireflies.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$postprocessing$2f$AnalogDecayPass$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/webgl/postprocessing/AnalogDecayPass.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// src/components/home/webgl/GhostCanvas.tsx
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
// Ghost Scene Orchestrator
function GhostScene() {
    _s();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const ghostGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const ghostPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
    const ghostSpeedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastGhostPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
    const { size, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Set initial anchor so the ghost starts leading the text on the left
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostScene.useEffect": ()=>{
            if (ghostGroupRef.current) {
                ghostGroupRef.current.position.set(-8, 3.5, 0);
            }
        }
    }["GhostScene.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostScene.useEffect": ()=>{
            const checkMobile = {
                "GhostScene.useEffect.checkMobile": ()=>setIsMobile(window.innerWidth < 1024)
            }["GhostScene.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            if (reducedMotion) {
                return ({
                    "GhostScene.useEffect": ()=>window.removeEventListener('resize', checkMobile)
                })["GhostScene.useEffect"];
            }
            const handleMove = {
                "GhostScene.useEffect.handleMove": (e)=>{
                    if (window.innerWidth >= 1024) {
                        mouseRef.current.x = e.clientX / size.width * 2 - 1;
                        mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
                    }
                }
            }["GhostScene.useEffect.handleMove"];
            window.addEventListener('mousemove', handleMove);
            return ({
                "GhostScene.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMove);
                    window.removeEventListener('resize', checkMobile);
                }
            })["GhostScene.useEffect"];
        }
    }["GhostScene.useEffect"], [
        reducedMotion,
        size
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GhostScene.useFrame": (state, delta)=>{
            if (!ghostGroupRef.current) return;
            const t = state.clock.elapsedTime;
            let targetX = 0;
            let targetY = 0;
            if (isMobile) {
                // Automatic organic movement for mobile (Sine/Cosine loop - slower for ethereal feel)
                targetX = Math.sin(t * 0.2) * 6; // Reduced speed and distance
                targetY = Math.cos(t * 0.15) * 4;
            } else {
                // Mouse tracking for desktop
                targetX = mouseRef.current.x * 8;
                targetY = mouseRef.current.y * 6;
            }
            const anchorX = -8;
            const anchorY = 3.5;
            // Smooth dampening
            ghostGroupRef.current.position.x += (anchorX + targetX - ghostGroupRef.current.position.x) * 0.06;
            ghostGroupRef.current.position.y += (anchorY + targetY - ghostGroupRef.current.position.y) * 0.06;
            // Scale adjustment for mobile
            const baseScale = isMobile ? 0.8 : 1.3;
            ghostGroupRef.current.scale.setScalar(baseScale);
            // Sync Ref for Veil
            ghostPosRef.current.copy(ghostGroupRef.current.position);
            // Track ghost velocity for reactive eyes/particles
            if (lastGhostPosRef.current.lengthSq() === 0) {
                lastGhostPosRef.current.copy(ghostGroupRef.current.position);
            }
            const distanceMoved = ghostGroupRef.current.position.clone().sub(lastGhostPosRef.current).length();
            const velocity = delta > 0 ? distanceMoved / delta : 0;
            const clampedVelocity = Math.min(velocity, 40);
            ghostSpeedRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(ghostSpeedRef.current, clampedVelocity, 0.08);
            lastGhostPosRef.current.copy(ghostGroupRef.current.position);
            // PROJECT POSITION TO SCREEN FOR MASKING
            // Convert 3D position to Screen Coordinates (0-100%)
            const vector = ghostGroupRef.current.position.clone();
            vector.project(camera);
            // Convert (-1 to 1) to (0% to 100%)
            const screenX = (vector.x * 0.5 + 0.5) * 100;
            const screenY = (1 - (vector.y * 0.5 + 0.5)) * 100;
            // Update CSS variables for DOM text masking
            document.documentElement.style.setProperty('--gx', `${screenX}%`);
            document.documentElement.style.setProperty('--gy', `${screenY}%`);
        }
    }["GhostScene.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ghostPosRef: ghostPosRef
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: ghostGroupRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Ghost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        speedRef: ghostSpeedRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Particles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        count: isMobile ? 80 : 160,
                        speedRef: ghostSpeedRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(GhostScene, "1f0IF6/LjMURoJa7uDhdILl2iRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = GhostScene;
function GhostCanvas() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        camera: {
            position: [
                0,
                0,
                20
            ],
            fov: 75
        },
        dpr: [
            1,
            2
        ],
        gl: {
            antialias: false,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: 'high-performance'
        },
        className: "absolute inset-0 pointer-events-none",
        style: {
            background: 'transparent'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.02,
                color: "#020214"
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -8,
                    6,
                    -4
                ],
                intensity: 1.5,
                color: "#4a90e2"
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    8,
                    -4,
                    -6
                ],
                intensity: 2,
                color: "#0057ff"
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostScene, {}, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$Fireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                count: 48
            }, void 0, false, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                        intensity: 3.2,
                        luminanceThreshold: 0.08,
                        luminanceSmoothing: 0.85,
                        mipmapBlur: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$webgl$2f$postprocessing$2f$AnalogDecayPass$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                        offset: 0.12,
                        darkness: 0.78
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/webgl/GhostCanvas.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c1 = GhostCanvas;
var _c, _c1;
__turbopack_context__.k.register(_c, "GhostScene");
__turbopack_context__.k.register(_c1, "GhostCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/webgl/GhostCanvas.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/home/webgl/GhostCanvas.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_home_webgl_27c6bea6._.js.map