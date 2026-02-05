# Real-Time Asset Sync & Persistence System - Implementation Summary

## ✅ What Was Built

A complete real-time synchronization system that allows the Admin panel to update assets (images, 3D models, etc.) on the live website **without requiring a redeploy**.

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   ADMIN     │────────▶│   Firebase   │────────▶│  Supabase   │
│   Panel     │  Upload │   Storage    │  URL    │  Database   │
└─────────────┘         └──────────────┘         └──────┬──────┘
                                                         │
                                                    Realtime
                                                    Broadcast
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │   Client    │
                                                  │  (Website)  │
                                                  └─────────────┘
```

## 📦 Components Created

### 1. Database Layer

- **Migration:** Added `metadata` JSONB column to `site_assets` table
- **Realtime:** Enabled Supabase Realtime publication for all tables
- **Types:** Updated `DbAsset` type with metadata support

### 2. Upload Infrastructure

- **`src/lib/firebase/storage-client.ts`** - Firebase Storage upload utility
- **`src/app/admin/(protected)/midia/actions.ts`** - Updated to support metadata
- **`src/components/admin/AssetFormWithMetadata.tsx`** - Admin form with 3D controls

### 3. Client Observer

- **`src/hooks/useRealtimeAssets.ts`** - Two hooks:
  - `useRealtimeAsset(key)` - Subscribe to single asset
  - `useRealtimeAssets(page)` - Subscribe to all assets on a page
- **`src/components/DynamicAssetImage.tsx`** - Image component with auto-updates

## 🎯 How It Works

### Upload Flow (Admin → Storage → Database)

1. Admin uploads file via `AssetFormWithMetadata`
2. File is uploaded to **Firebase Storage** → Returns public URL
3. URL + metadata saved to **Supabase** `site_assets` table
4. Supabase triggers **Realtime broadcast** to all connected clients

### Update Flow (Database → Client)

1. Client subscribes via `useRealtimeAsset('asset.key')`
2. When asset changes in database, Supabase sends update
3. Hook receives new URL and metadata
4. Component re-renders with **cross-fade transition** (150ms)

## 💡 Usage Examples

### Admin: Upload Asset with 3D Metadata

```tsx
import { AssetFormWithMetadata } from '@/components/admin/AssetFormWithMetadata';

<AssetFormWithMetadata 
  preset={{
    key: 'about.ghost_model',
    page: 'about',
    asset_type: 'model',
  }}
/>
```

### Client: Subscribe to Asset Updates

```tsx
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';

function GhostScene() {
  const { asset, loading } = useRealtimeAsset('about.ghost_model');
  
  return (
    <Canvas>
      <Model 
        url={asset?.publicUrl} 
        position={asset?.metadata?.position}
        scale={asset?.metadata?.scale}
      />
    </Canvas>
  );
}
```

### Client: Dynamic Image Component

```tsx
import { DynamicAssetImage } from '@/components/DynamicAssetImage';

<DynamicAssetImage 
  assetKey="home.hero_background"
  alt="Hero Background"
  width={1920}
  height={1080}
  priority
/>
```

## 🔧 Technical Details

### Metadata Structure

```typescript
{
  position: [x, y, z],  // 3D position
  scale: [x, y, z],     // 3D scale
  rotation: [x, y, z],  // 3D rotation
  // ... extensible for custom properties
}
```

### Performance Optimizations

- **Realtime channels** auto-unsubscribe on component unmount
- **Cross-fade transition** provides smooth visual updates
- **Image preloading** via Next.js Image component
- **Selective subscriptions** (single asset vs. page-wide)

## 📋 Next Steps

### Integration Tasks

- [ ] Replace static imports with `DynamicAssetImage` in key pages
- [ ] Integrate `useRealtimeAsset` into 3D scenes (Ghost, etc.)
- [ ] Add metadata editor UI in admin panel
- [ ] Create asset preview component

### Validation Tasks

- [ ] Upload test image in Admin
- [ ] Verify file appears in Firebase Storage
- [ ] Verify record in Supabase table
- [ ] Confirm automatic update on client (no refresh)
- [ ] Test metadata updates (position/scale)

## 🎨 Benefits

1. **Zero Downtime Updates** - Change assets without redeploy
2. **Real-Time Sync** - All clients update automatically
3. **3D Support** - Position, scale, rotation metadata
4. **Smooth UX** - Cross-fade transitions between assets
5. **Scalable** - Firebase CDN + Supabase Realtime
6. **Type-Safe** - Full TypeScript support

## 🔐 Security Notes

- Firebase Storage rules allow public read (assets are public)
- Supabase RLS should restrict write access to authenticated admins
- Asset URLs are permanent (Firebase Storage public URLs)
- Metadata is validated on server-side (upsertAsset action)

---

**Status:** ✅ Core implementation complete. Ready for integration and testing.
