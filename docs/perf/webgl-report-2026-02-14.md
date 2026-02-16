# WebGL Performance Report (2026-02-14)

## 📊 Summary

**System Status**: PASS 🟢 (Optimized)
**Focus Area**: Ghost System (Hero & About)

## 🔍 Findings

### 1. Active Render Logic (Optimized)

Crucial components are using best practices:

- **Home Hero**: `src/components/canvas/home/hero/GhostScene.tsx`
  - Uses `InstancedMesh` for 500+ particles (1 draw call vs 500).
  - Uses `InstancedMesh` for Fireflies.
  - Inline Shader definitions prevent re-compilation.
  - Use of Refs for vectors to avoid GC pressure.
- **About Ghost**: `src/components/sobre/3d/GhostScene.tsx`
  - Uses `Sparkles` (Instanced via drei).
  - Uses `ContactShadows` with distinct blur (balanced).
  - Uses `dpr={[1, 2]}` to cap pixel ratio.

### 2. Dead Code Detection (Cleanup Required)

Detected multiple heavy/unoptimized components that appear **UNUSED** in the current build. These should be removed to avoid confusion:

| Component | Status | Issue |
| :--- | :--- | :--- |
| `src/components/canvas/home/hero/GhostParticles.tsx` | 💀 Unused | Creates objects in loop. |
| `src/components/canvas/home/hero/GhostFireflies.tsx` | 💀 Unused | Uses PointLights inside loop. |
| `src/components/canvas/home/hero/Ghost.tsx` | 💀 Unused | Legacy wrapper. |
| `src/components/canvas/home/hero/GhostCanvas.tsx` | 💀 Unused | Legacy entry point. |
| `src/components/canvas/home/hero/AtmosphereVeil.tsx` | 💀 Unused | Replaced by inline shader. |
| `src/components/canvas/header/HeaderFluidGlass.tsx` | 💀 Unused | Heavy FBO logic. |

### 3. Asset Analysis

- **Ghost Model**: Remote (Supabase).
- **Textures**: None strictly local in `public/textures`.
- **Optimization**: No immediate asset action needed.

## 🛠️ Recommendations

1. **Purge Dead Code**: Delete the unused files listed above.
2. **Monitor FPS**: Ensure `HomeHero` maintains 60fps on mobile (InstancedMesh logic is heavy on vertex shader but efficient on CPU).
3. **Verify Header**: Ensure `DesktopFluidHeader` is intentionally using `HeaderGlassCanvas` (simple) instead of the complex `HeaderFluidGlass` (which has refraction). If refraction was desired, `HeaderFluidGlass` needs optimization before re-enabling.

## 🚀 Next Steps

- User Approval to delete dead code.
- User Verification of `HeaderFluidGlass` intent.
