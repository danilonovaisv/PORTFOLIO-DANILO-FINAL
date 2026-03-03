# R3F Setup Workflow (Phoenix v2.1)

Este workflow define as etapas para garantir a integridade da cena 3D e performance do Ghost System.

## 🌌 Core Components

1. **GhostCanvas**:
   - Arquivo: `src/components/canvas/GhostScene.tsx` (ou `GhostCanvas.tsx`)
   - Requisito: DPR Adaptativo, "use client", 60 FPS Mandate.
2. **Atmosphere**:
   - Ghost Mesh, Particles, Fireflies.
   - Post-Processing: Bloom (subtle), Noise.
3. **HeaderGlassCanvas**:
   - Câmera ortográfica.
   - Shader: Liquid Ether Glass.
4. **Interatividade**:
   - Mouse Lerp e Spring Physics (Zustand controlled).
5. **Fallbacks**:
   - Verificação `useWebGLSupport`.

## 🛠️ Ativação

// turbo

1. Validar existência de `GhostScene.tsx`.
2. Validar CSP no `next.config.mjs` para `wss://` (Supabase Realtime).
3. Verificar performance via `Stats`.
