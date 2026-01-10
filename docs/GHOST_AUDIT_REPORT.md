# 🕵️ Relatório de Auditoria Técnica: Ghost Animation (Agente 0 + 1)

**Data:** 2026-01-09
**Status:** 🔴 CRÍTICO (Divergência Visual Extrema)
**Referência:** CodePen (Visual da Lanterna) vs Implementação Atual (`src/components/canvas/hero`)

---

## 🛑 Principais Gaps Identificados (Resumo Executivo)

1. **Ausência Total de Post-Processing:** O componente `GhostScene.tsx` renderiza uma cena WebGL "crua". Não há `EffectComposer`, `Bloom` ou shaders de filme analógico (`AnalogDecay`). **Impacto Visual:** O fantasma parece "chapado", sem brilho neón e sem a textura VHS/Noise essencial para a estética "Ghost".
2. **Atmosfera Incorreta:** O shader da `Atmosphere.tsx` está configurado com cor preta (`0.001, 0.001, 0.002`), enquanto a referência e o material de design exigem um azul profundo/transparente (`0.0, 0.2, 1.0`). Isso mata o efeito de "lanterna" que revela o fundo.
3. **Deformação via CPU:** Tanto a referência quanto o código atual deformam a geometria no array de posições via CPU (`useEffect`). O Workflow exige migração para **Vertex Shader** para evitar gargalos de performance e permitir animação fluida da "saia".
4. **Olhos Simplificados:** A implementação atual usa esferas simples. A referência utiliza uma técnica de camada dupla (Esfera interna + Esfera externa com `BackSide`) para criar um glow volumétrico nos olhos que reage ao movimento.

---

## 📋 Checklist de Paridade Técnica (Target vs Atual)

| Feature | Referência (Alvo) | Implementação Atual | Status |
| :--- | :--- | :--- | :--- |
| **Engine** | Three.js Vanilla | R3F (React Three Fiber) | ✅ OK |
| **Geometria** | `SphereGeometry(2, 40, 40)` | `args={[2, segments, segments]}` | ✅ OK |
| **Deformação** | CPU (Array Mutation) | Vertex Shader (onBeforeCompile) | ✅ **FIXED** |
| **Material** | `MeshStandardMaterial` (Emissive 8.5) | `MeshStandardMaterial` (Emissive 2.0) | ⚠️ **Ajustar Intensidade** |
| **Olhos** | Dual Layer (Mesh + Glow BackSide) | Dual Layer (Mesh + Glow BackSide) | ✅ **FIXED** |
| **Atmosfera** | Shader Reveal (Blue Tint) | Shader Reveal (Blue Tint) | ✅ **FIXED** |
| **Bloom** | `UnrealBloomPass` (Strength 1.25) | `EffectComposer` + `Bloom` | ✅ **FIXED** |
| **Analog FX** | Noise, Scanlines, Vignette | `Noise` + `Vignette` + `Scanline` + `Aberration` | ✅ **FIXED** |
| **Partículas** | Trail Interativo (Spawn on Move) | Fireflies Estáticos (Ambient) | ⚠️ **Divergente** |
| **Luzes** | Directional (Rim) | Ambient + Directional | ⚠️ **Revisar Posição** |

---

## 🛠️ Plano de Ação Imediato (Próximos Agentes)

### 1. 🧬 Agente 2: Geometria & Shader (Prioridade Alta)
- Criar `GhostMaterial.tsx` (baseado em `MeshStandardMaterial`).
- Injetar lógica de deformação no Vertex Shader via `onBeforeCompile`.
- Garantir que a "saia" ondule com `uTime`.

### 2. 💡 Agente 3: Iluminação & Olhos
- Implementar o componente `GhostEyes` com a técnica de dupla geometria.
- Conectar a intensidade do brilho à velocidade do mouse (`useVelocity` hook ou similar).

### 3. 📼 Agente 5: Post-Processing Stack (CRÍTICO)
- Instalar `@react-three/postprocessing`.
- Configurar pipeline:
  ```jsx
  <EffectComposer disableNormalPass>
    <Bloom luminanceThreshold={0} mipmapBlur intensity={1.5} radius={0.6} />
    <Noise opacity={0.5} />
    <Vignette eskil={false} offset={0.1} darkness={1.1} />
    {/* Custom Scanline Shader se necessário */}
  </EffectComposer>
  ```

### 4. 🖱️ Agente 6: Interação
- Implementar física de "tilt" (rotação baseada na direção do movimento).
- Refinar o `damp` de posição para ser menos magnético e mais "flutuante".

---

## 📉 Dados de Calibragem (Extraídos da Referência)

- **Colors:**
  - Body: `#0f2027` (Dark Cyan/Blue)
  - Emissive: `#0080ff` (Eletric Blue)
- **Physics:**
  - `followSpeed`: 0.03 (Bem lento/pesado)
  - `floatSpeed`: 0.8
- **Bloom:**
  - Threshold: 0
  - Strength: 1.25
  - Radius: 0.3

> **Nota:** O código atual em `ghostConfig.ts` tem valores muito diferentes (`followSpeed: 0.035` ok, mas `emissiveIntensity: 2.0` vs `8.5`). Precisamos alinhar o config com a referência.
