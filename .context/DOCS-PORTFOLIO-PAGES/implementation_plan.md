# Implementation Plan — Media Card System

## 1. Root Cause

- Project cards mixed image and video rendering in each consumer.
- Cards picked media URLs as plain strings, so aspect ratio and fit behavior were implicit.
- The same card surface could render 1:1 and 16:9 assets without a typed media contract.
- Videos relied on local conditional branches, increasing crop/distortion risk and duplicated fallback behavior.

## 2. Implemented Architecture

### A. Media Metadata

Project media now resolves to a typed contract:

```ts
type MediaFormat = 'square' | 'landscape';
type MediaKind = 'image' | 'video';
type MediaFit = 'cover' | 'contain';

interface ProjectMedia {
  kind: MediaKind;
  src: string;
  format: MediaFormat;
  fit?: MediaFit;
  alt?: string;
}
```

`PortfolioProject` supports optional format metadata for existing media fields without breaking older records.

### B. Aspect Ratio System

Aspect mapping is centralized:

- `square` -> `aspect-square`
- `landscape` -> `aspect-video`

### C. MediaCard Component

`src/components/ui/media/MediaCard.tsx` owns media rendering for project card surfaces:

- Applies stable aspect containers.
- Renders `next/image` for images.
- Renders native `<video>` for videos.
- Resolves Firebase/Supabase-safe asset URLs through the existing asset helpers.
- Keeps `object-position`, priority loading, poster, autoplay, preload, and sizing explicit.

### D. Fit Strategy

- Images default to `object-cover` for card consistency.
- Videos default to `object-contain` to avoid crop and distortion.
- Per-media `fit` can override the default when a critical asset needs a specific rule.

## 3. Files

- `src/lib/media/media-format.ts`
- `src/components/ui/media/MediaCard.tsx`
- `src/lib/portfolio/card-media.ts`
- `src/types/project.ts`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/home/featured-projects/FeaturedProjectCard.tsx`
- `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`
- `test/lib/portfolio/card-media.test.ts`
- `test/components/ui/MediaCard.test.tsx`

## 4. Validation

Executed:

```bash
rg -n "^(<<<<<<<|=======$|>>>>>>>)" .context src scripts public package.json firebase.json
pnpm run typecheck
pnpm run lint
pnpm exec jest test/lib/portfolio/card-media.test.ts test/components/ui/MediaCard.test.tsx test/components/portfolio/ProjectCard.test.tsx --runInBand
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key pnpm run build
```

Browser validation used local Playwright against `http://localhost:3007/portfolio` for desktop and mobile. Expected Supabase DNS errors appeared because placeholder env values were used; card media still rendered with stable dimensions and expected `object-fit` rules.

## 5. Risks

- Image cards still use `object-cover` by default. This preserves grid consistency but can crop image edges by design.
- Videos use `object-contain`, so letterboxing can appear when source ratio differs from the card ratio.
- Existing CMS/project rows without explicit format metadata rely on field-name inference.
