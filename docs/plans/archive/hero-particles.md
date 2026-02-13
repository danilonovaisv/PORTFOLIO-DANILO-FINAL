# IMPLEMENTATION PLAN: Hero Interactive Particles (Loki Mode)

**Target**: `src/components/canvas/HeroParticles/`
**Objective**: Implement "Hero Interactive Particles" using R3F `instancedMesh` for high performance (10,000+ particles) with mouse interaction and shader-based logic.

## 1. Goal

Replace the existing imperative/low-poly particle system with a highly optimized, GPU-driven `instancedMesh` system that reacts to mouse movement and creates a "Ghostly" atmosphere.

## 2. Architecture & Data Flow

### Componenents

- **`HeroParticles/index.tsx`**: Main R3F component.
  - **`Input`**: `count` (default: 10,000), `color` (default: #E50914).
  - **`State`**: `uTime`, `uMouse` (Vector2), `uHover` (float).
  - **`Refs`**: `meshRef` (InstancedMesh), `materialRef` (ShaderMaterial).
  - **`Geometry`**: `PlaneGeometry` (billboarded) or simple `TetrahedronGeometry`.
  - **`Logic`**:
    - Compute initial random positions in `useMemo`.
    - Update uniforms in `useFrame`.
    - Use `glsl-noise` or custom noise function for organic movement.

### Shaders

- **`HeroParticles/shaders/vertex.glsl`**:
  - **Inputs**: `attribute vec3 aPosition`, `uniform float uTime`, `uniform vec2 uMouse`.
  - **Logic**:
    - Compute `curlNoise(position + time)` to create flow.
    - Compute `distance(position.xy, mouse)` to push particles away (Dispersion).
    - `gl_Position` output.
  - **Precision**: `precision mediump float;`.

- **`HeroParticles/shaders/fragment.glsl`**:
  - **Inputs**: `varying float vDistance`, `uniform vec3 uColor`.
  - **Logic**:
    - Render circular soft particle (if PlaneGeometry).
    - Mix color: Base (Ghost Blue) -> Hover (Nestlé Red #E50914).
    - `discard` alpha < 0.01.
  - **Precision**: `precision mediump float;`.

## 3. Implementation Steps

1. **Scaffold**: Create directory `src/components/canvas/HeroParticles/` and files.
2. **Shader Logic (Vertex)**:
    - Implement `snoise` or `curlNoise` function.
    - Add `uniform vec2 uMouse` for interaction.
    - Add `uniform float uTime` for flow.
3. **Shader Logic (Fragment)**:
    - Implement soft circle logic.
    - Apply color `#E50914` on interaction.
4. **Component Logic**:
    - `useMemo` to generate `Float32Array` for `aPosition` (or use `instanceMatrix` default position).
    - `useFrame`:
        - Update `material.uniforms.uTime.value`.
        - Update `material.uniforms.uMouse.value` (lerp for smoothness).
    - **Strict Rule A1**: Do NOT loop over 10,000 instances in CPU. All motion MUST be in Vertex Shader.
5. **Integration**:
    - Open `src/components/canvas/home/hero/Ghost.tsx`.
    - Import `HeroParticles`.
    - Replace `<GhostParticles />` with `<HeroParticles />`.
    - Ensure `<GhostCanvas />` is being used in `GhostSceneWrapper.tsx` (Critical fix: switch from vanilla `GhostScene` to R3F `GhostCanvas`).

## 4. Verification & Constraints

- **Performance**: Monitor FPS. Must stay at 60fps on M1 Macbook.
- **Memory**: Ensure `geometry.dispose()` and `material.dispose()` are handled (React unmounts should handle, but verify manually if using custom BufferGeometry).
- **Design**: Validate `#E50914` red accents appear on mouse interact.
- **Strict Rule**: No `setState` in `useFrame`.

## 5. Approval

Waiting for user approval to execute.
