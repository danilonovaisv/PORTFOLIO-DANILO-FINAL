# 🔧 Quick Action Checklist

This file contains immediate action items from the audit. Check off each item as you complete it.

## ✅ Completed

- [x] Fixed TypeScript error in FeaturedProjectsSection.tsx (Framer Motion ease types)
- [x] Build passing
- [x] Lint passing
- [x] TypeScript check passing

## 🔴 High Priority (Do Now)

### 1. Fix AnalogDecayPass TypeScript Types

**File:** `src/components/home/webgl/postprocessing/AnalogDecayPass.tsx`
**Lines:** 123, 129
**Time:** 15 minutes

Create `src/types/webgl.d.ts`:

```typescript
import type { WebGLRenderer, WebGLRenderTarget } from 'three';

export interface EffectUpdateParams {
  renderer: WebGLRenderer;
  inputBuffer: WebGLRenderTarget;
  deltaTime: number;
}

export interface AnalogDecayPassProps {
  // Add props if needed
}
```

Update AnalogDecayPass.tsx:

```typescript
import type { EffectUpdateParams, AnalogDecayPassProps } from '@/types/webgl';

update({ renderer, inputBuffer, deltaTime }: EffectUpdateParams) {
  const uTime = this.uniforms.get('uTime');
  if (uTime) uTime.value += deltaTime;
}

const AnalogDecayPass = forwardRef<any, AnalogDecayPassProps>(
  function AnalogDecayPass(props, ref) {
    const effect = useMemo(() => new AnalogDecayEffectImpl(), []);
    return <primitive object={effect} ref={ref} />;
  }
);
```

---

### 2. Create Tailwind Config with Design Tokens

**File:** Create `tailwind.config.ts`
**Time:** 30 minutes

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ghost Theme Colors
        primary: '#0057FF',
        'ghost-bg': '#f0f0f0',
        'text-dark': '#000000',
        'text-inverse': '#FFFFFF',
        'neutral-light': '#F5F5F5',
        // Add other colors from config/brand.ts
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

### 3. Replace Hardcoded Colors

**Files:** Multiple (see audit report)
**Time:** 45 minutes

**Search & Replace Guide:**

- `bg-[#0057FF]` → `bg-primary`
- `text-[#0057FF]` → `text-primary`
- `bg-[#F5F5F5]` → `bg-neutral-light`
- `bg-[#f5f5f5]` → `bg-neutral-light`
- `bg-[#0f172a]` → Check if this should be added to theme

**Files to update:**

- src/components/home/ContactSection.tsx (line 177)
- src/components/home/FeaturedProjectsSection.tsx (line 163)
- src/components/layout/SiteFooter.tsx (line 77)
- src/components/portfolio/MosaicCard.tsx (line 47)
- src/components/portfolio/PortfolioHero.tsx (line 41)
- src/components/home/PortfolioShowcaseSection.tsx (line 105)

---

## 🟡 Medium Priority (This Week)

### 4. Clean Up Unused React Imports

**Time:** 20 minutes

Remove `import React from 'react'` from these files (only import specific hooks):

- [ ] src/components/portfolio/MosaicCard.tsx
- [ ] src/components/layout/ClientLayout.tsx
- [ ] src/components/portfolio/PortfolioHero.tsx
- [ ] src/components/layout/SiteFooter.tsx
- [ ] src/components/home/GhostStage.tsx
- [ ] src/components/home/ClientsBrandsSection.tsx
- [ ] src/components/home/PortfolioShowcaseSection.tsx
- [ ] src/components/home/HeroCopy.tsx
- [ ] src/components/home/ContactSection.tsx
- [ ] src/components/templates/NarrativeSection.tsx
- [ ] src/components/home/HeroPreloader.tsx
- [ ] src/components/home/FeaturedProjectsSection.tsx
- [ ] src/components/home/contact/FormFields.tsx
- [ ] src/components/ui/PrimaryButton.tsx
- [ ] src/components/ui/ArrowIcon.tsx

**Example:**

```typescript
// Before
import React from 'react';
import { useState } from 'react';

// After
import { useState } from 'react';
```

---

### 5. Audit Three.js Imports

**Time:** 30 minutes

Check all files importing from 'three' and ensure tree-shaking:

```bash
# Search for problematic imports
grep -r "import \* as THREE" src/
```

**Replace:**

```typescript
// ❌ Bad
import * as THREE from 'three';

// ✅ Good
import { WebGLRenderer, Scene, PerspectiveCamera, Clock } from 'three';
```

---

### 6. Run Bundle Analyzer

**Time:** 10 minutes

```bash
# Install
npm install --save-dev @next/bundle-analyzer

# Update next.config.mjs
# (see audit report for config)

# Run
ANALYZE=true npm run build
```

Review the bundle visualization for optimization opportunities.

---

## 🟢 Low Priority (Nice to Have)

### 7. Extract HomeHero Video Logic

**File:** `src/components/home/HomeHero.tsx`
**Time:** 45 minutes

Create `src/hooks/useVideoControls.ts`:

```typescript
import { useEffect, useRef, useState } from 'react';

export function useVideoControls() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = muted;
  }, [muted]);

  return { videoRef, muted, setMuted };
}
```

---

### 8. Add Performance Budgets

**File:** `next.config.mjs`
**Time:** 10 minutes

See audit report for recommended configuration.

---

### 9. Setup Automated Tests

**Time:** Ongoing

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests
- [ ] Add accessibility audit with @axe-core/react
- [ ] Add performance monitoring

---

## 📊 Progress Tracking

- Completed: 4/9 items (44%)
- High Priority: 1/3 ✅
- Medium Priority: 0/3
- Low Priority: 0/3

**Next Action:** Start with #1 (Fix AnalogDecayPass types)

---

**Last Updated:** 2025-12-29 20:03:00 -03:00
