# GLB Model Compression Guide

**Target:** `ghost.glb` (2.9MB → ~500KB)  
**Tool:** gltf-transform  
**Compression:** Draco

---

## Quick Start

```bash
# Install gltf-transform globally (one-time)
npm install -g @gltf-transform/cli

# Compress ghost.glb with Draco
gltf-transform optimize \
  public/site.assets/3d/ghost.glb \
  public/site.assets/3d/ghost-compressed.glb \
  --compress draco

# Verify file size
ls -lh public/site.assets/3d/ghost*.glb
```

---

## Expected Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| File Size | 2.9MB | ~500KB | **-83%** |
| Load Time (3G) | ~10s | ~2s | **-80%** |
| Parse Time | ~150ms | ~50ms | **-67%** |

---

## Implementation Steps

### 1. Backup Original

```bash
cp public/site.assets/3d/ghost.glb public/site.assets/3d/ghost-original.glb
```

### 2. Compress with Draco

```bash
gltf-transform optimize \
  public/site.assets/3d/ghost.glb \
  public/site.assets/3d/ghost-compressed.glb \
  --compress draco \
  --texture-compress webp
```

### 3. Test in Browser

```typescript
// In Ghost.tsx or relevant component
import { useGLTF } from '@react-three/drei';

function GhostModel() {
  const { scene } = useGLTF('/site.assets/3d/ghost-compressed.glb');
  return <primitive object={scene} />;
}
```

### 4. Verify Quality

- **Visual Check**: Ensure no visible artifacts
- **Animation Check**: Verify animations still work
- **Performance Check**: Confirm FPS improvement

### 5. Replace Original (if satisfied)

```bash
mv public/site.assets/3d/ghost-compressed.glb public/site.assets/3d/ghost.glb
```

---

## Advanced Options

### Aggressive Compression

```bash
gltf-transform optimize \
  ghost.glb ghost-ultra.glb \
  --compress draco \
  --draco.compressionLevel 10 \
  --draco.quantizePosition 14 \
  --draco.quantizeNormal 10 \
  --draco.quantizeTexcoord 12
```

### Texture Optimization

```bash
gltf-transform optimize \
  ghost.glb ghost-optimized.glb \
  --compress draco \
  --texture-compress webp \
  --resize 1024,1024
```

---

## Troubleshooting

### Issue: Draco decoder not found

**Solution:** Add Draco loader to your Three.js setup:

```typescript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
```

### Issue: Visual artifacts after compression

**Solution:** Reduce compression level:

```bash
gltf-transform optimize \
  ghost.glb ghost-compressed.glb \
  --compress draco \
  --draco.compressionLevel 7  # Lower = better quality
```

---

## Performance Impact

### Load Time Savings

- **First Load**: -2.4MB download = **~8 seconds** faster on 3G
- **Cached Load**: Minimal impact (already cached)
- **Parse Time**: -100ms = **smoother initial render**

### Runtime Performance

- **Memory**: -2.4MB GPU memory freed
- **FPS**: No impact (same geometry after decompression)
- **Draw Calls**: No impact

---

## References

- [gltf-transform Documentation](https://gltf-transform.donmccurdy.com/)
- [Draco Compression Guide](https://google.github.io/draco/)
- [Three.js DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)
