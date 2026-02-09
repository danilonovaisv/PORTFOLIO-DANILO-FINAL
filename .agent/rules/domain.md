# Layer 3: DOMAIN RULES (Specialized Knowledge)

> **MANDATORY**: Apply specific rules based on the folder you are editing.

## 🚀 WebGL & Canvas (`src/components/canvas`)

1. **Instancing:** >10 objects? Use `InstancedMesh`.
2. **No Loops:** No `new Vector3()` inside `useFrame`.
3. **Textures:** Max 2048px (Hero), 512px (Props). Use `.ktx2` or `.webp`.
4. **Disposal:** Manually dispose geometries/materials if not cached.
5. **Shaders:** Minimize distinct programs. Share uniforms.

## ⚡ Admin & Realtime (`src/app/admin`, Supabase)

1. **Zero Trust:** Middleware + RLS Policies for all writes.
2. **Role Check:** Verify `admin` role in `user_metadata`.
3. **Subscriptions:** Always unmount `supabase.channel().subscribe()`.
4. **Fallbacks:** Admin UI must work (read-only) if Realtime fails.

## 💅 Design System & Motion

1. **Grid:** Use `.std-grid` wrapper.
2. **Motion:**
    - UI: Fast (0.2s).
    - Ambient: Slow, linear (10s+).
    - Scroll: Use `lenis` hooks.
3. **Z-Index:** Use `z-indices.ts`. Never hardcode `999`.

## 📚 Documentation

1. **Self-Healing:** If code structure changes, update `docs/AGENTS_SYSTEM.md`.
2. **Drift:** Code is truth. Docs explain intent.
