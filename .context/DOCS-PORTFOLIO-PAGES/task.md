# Task List — Video Responsivo, Ghost Hero Glow, Firebase Deploy

> Plan ref: `.context/DOCS-PORTFOLIO-PAGES/implementation_plan.md`
> Branch alvo: `fix/media-glow-deploy-2026-05-21`
> Stack: Next.js 16, React 19, Three.js, Tailwind 4, Supabase, Firebase Hosting (webframeworks)

---

## Task 1 — Rewrite `ResponsiveVideo` para `<source media>` nativo

**Files:**
- Modify: `src/components/ui/shared/ResponsiveVideo.tsx`
- Reference: 7 consumers (sem refactor — API pública mantida)

- [x] **Step 1.1** — Substituir TODO o arquivo:

```tsx
'use client';

import React, { forwardRef } from 'react';

export type ResponsiveVideoProps =
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopSrc: string;
    mobileSrc?: string;
    desktopPoster?: string;
    mobilePoster?: string;
    breakpoint?: string;
  };

export const ResponsiveVideo = forwardRef<
  HTMLVideoElement,
  ResponsiveVideoProps
>(
  (
    {
      desktopSrc,
      mobileSrc,
      desktopPoster,
      mobilePoster,
      breakpoint = '(max-width: 767px)',
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const poster = mobilePoster || desktopPoster;
    const hasMobile = mobileSrc && mobileSrc !== desktopSrc;

    return (
      <video
        ref={ref}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        {...rest}
      >
        {hasMobile && (
          <source src={mobileSrc} media={breakpoint} type="video/mp4" />
        )}
        <source src={desktopSrc} type="video/mp4" />
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
```

- [x] **Step 1.2** — Typecheck:

```bash
pnpm run typecheck
```
Expected: PASS.

- [x] **Step 1.3** — Smoke test local:

```bash
pnpm run dev
# /, /sobre, /portfolio, /portfolio/<slug>, featured cards
# Network: 1 request de vídeo por viewport
```

- [/] **Step 1.4** — Commit:

```bash
git add src/components/ui/shared/ResponsiveVideo.tsx
git commit -m "fix(video): use native <source media> instead of JS-based src swap"
```

---

## Task 2 — Validar aspect ratio dos MP4 vs wrappers

**Files:** none changed (validação + possível re-encode externo).

- [x] **Step 2.1** — Inspecionar metadata dos 10 MP4s:

```bash
for url in $(grep -oE 'https://[^"]+\.mp4' src/lib/video-assets.ts); do
  echo "=== $url ==="
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate "$url"
done
```

- [x] **Step 2.2** — Cruzar com wrappers:
  - `VideoManifesto.tsx:139` → desktop 16:9, mobile 9:16
  - `AboutHero.tsx:62` → desktop 16:9, mobile 1:1 (`aspect-square`)
  - `AboutMethod.tsx:42` → ambos 16:9 (background)
  - `AboutClosing.tsx`, `PortfolioHeroNew.tsx`, `FeaturedProjectCardFrame.tsx`

- [x] **Step 2.3** — Se mismatch, re-encode:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -crf 23 -preset slow -movflags +faststart output.9x16.mp4
```

- [x] **Step 2.4** — Atualizar `src/lib/video-assets.ts` se path mudou:

```bash
git commit -m "fix(video): align MP4 aspect ratios to component wrappers"
```

---

## Task 3 — Ghost Hero Glow: clamp params

**Files:**
- Modify: `src/components/canvas/home/hero/hooks/useGhostParams.ts:48–50`

- [x] **Step 3.1** — Edits:

```ts
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.35,
bloomRadius: 1.1,
bloomThreshold: 0.85,
```

Se houver `pulseIntensity`, clamp ≤ `0.12`.

- [/] **Step 3.2** — Commit:

```bash
git commit -m "fix(hero): raise bloom threshold + lower strength to stabilize glow"
```

---

## Task 4 — Ghost Hero Glow: lerp emissive + eye glow uniforme

**Files:**
- Modify: `src/components/canvas/home/hero/hooks/useGhostAnimate.ts:110–127`

- [x] **Step 4.1** — Substituir bloco `// Float & Pulse`:

```ts
// Float
ghostGroup.position.y += Math.sin(time * params.floatSpeed * 1.5) * 0.03;

// Pulse — smoothed via lerp
const targetEmissive =
  params.emissiveIntensity +
  Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
ghostMaterial.emissiveIntensity +=
  (targetEmissive - ghostMaterial.emissiveIntensity) * 0.08;
```

- [x] **Step 4.2** — Substituir bloco `// Eyes`:

```ts
const isMoving = currentMovementRef.current > params.movementThreshold;
const targetGlow = isMoving ? 1.0 : 0.0;
const glowChangeSpeed = 0.08;

const newOpacity =
  eyes.leftEyeMaterial.opacity +
  (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;

eyes.leftEyeMaterial.opacity = newOpacity;
eyes.rightEyeMaterial.opacity = newOpacity;
eyes.leftOuterGlowMaterial.opacity = newOpacity * 0.3;
eyes.rightOuterGlowMaterial.opacity = newOpacity * 0.3;
```

- [/] **Step 4.3** — Commit:

```bash
git commit -m "fix(hero): lerp emissive + uniform eye-glow speed to remove flicker"
```

---

## Task 5 — Ghost Hero Scene: DPR cap + renderOrder

**Files:**
- Modify: `src/components/canvas/home/hero/hooks/useGhostScene.ts:66,152`

- [x] **Step 5.1** — DPR cap:

```ts
renderer.setPixelRatio(Math.min(performanceConfig.pixelRatio, 1.5));
```

- [x] **Step 5.2** — Atmosphere renderOrder:

```ts
atmosphere.renderOrder = -1000;
```

- [/] **Step 5.3** — Commit:

```bash
git commit -m "fix(hero): cap DPR at 1.5 and push atmosphere behind bloom"
```

---

## Task 6 — Aplicar SQL Supabase: RLS + buckets públicos

**Files:** none (remote DB).

- [ ] **Step 6.1** — Listar:

```
mcp__plugin_supabase_supabase__list_tables (schemas: ["storage"])
```

- [ ] **Step 6.2** — Aplicar migration:

```
mcp__plugin_supabase_supabase__apply_migration
  name: "cors_rls_fix_2026_05_21"
  query: <conteúdo de docs/audits/supabase-cors-rls-fix.sql>
```

- [ ] **Step 6.3** — Verificar buckets:

```
mcp__plugin_supabase_supabase__execute_sql
  query: "SELECT id, public FROM storage.buckets WHERE id IN ('site-assets','portfolio-media');"
```
Expected: ambos `public = true`.

- [ ] **Step 6.4** — Verificar policies:

```
mcp__plugin_supabase_supabase__execute_sql
  query: "SELECT policyname FROM pg_policies WHERE tablename='objects' AND schemaname='storage';"
```
Expected: `Public read site-assets` + `Public read portfolio-media`.

---

## Task 7 — Configurar CORS no painel Supabase

**Files:** none.

- [ ] **Step 7.1** — Abrir `https://supabase.com/dashboard/project/umkmwbkwvulxtdodzmzf/settings/api`
- [ ] **Step 7.2** — Em "CORS Allowed Origins":
  - `https://portfoliodanilo.com`
  - `https://portfolio-danilo-novais.web.app`
  - `https://portfolio-danilo-novais.firebaseapp.com`
  - `http://localhost:3000`
- [ ] **Step 7.3** — Validar:

```bash
curl -I -H "Origin: https://portfolio-danilo-novais.web.app" \
  https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4
```
Expected: `HTTP/2 200` + `access-control-allow-origin: https://portfolio-danilo-novais.web.app`

---

## Task 8 — Criar `verify-supabase-assets.mjs` + wire predeploy

**Files:**
- Create: `scripts/verify-supabase-assets.mjs`
- Modify: `package.json`

- [x] **Step 8.1** — Criar script:

```js
#!/usr/bin/env node
if (process.env.SKIP_ASSET_VERIFY === '1') {
  console.log('[verify-assets] skipped via SKIP_ASSET_VERIFY=1');
  process.exit(0);
}

const URLS = [
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4',
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.desktop.compress.mp4',
];

let failed = false;
for (const url of URLS) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      console.error(`[verify-assets] FAIL ${res.status} ${url}`);
      failed = true;
    } else {
      console.log(`[verify-assets] OK  ${res.status} ${url}`);
    }
  } catch (err) {
    console.error(`[verify-assets] ERR ${url} :: ${err.message}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
```

- [x] **Step 8.2** — Adicionar em `package.json` `scripts`:

```json
"verify:assets": "node scripts/verify-supabase-assets.mjs",
"predeploy": "pnpm run verify:assets && pnpm run build"
```

(Se `predeploy` já existe, mesclar.)

- [x] **Step 8.3** — Testar:

```bash
pnpm run verify:assets
```
Expected: 2 linhas `OK 200`, exit 0.

- [/] **Step 8.4** — Commit:

```bash
git add scripts/verify-supabase-assets.mjs package.json
git commit -m "chore(deploy): add Supabase asset HEAD-check as predeploy guard"
```

---

## Task 9 — Validação E2E

**Files:** none.

- [ ] **Step 9.1** — Build + start:

```bash
pnpm run build
pnpm start &
sleep 5
```

- [ ] **Step 9.2** — Playwright:

```bash
pnpm test:e2e -- --grep "@hero|@video"
```

- [ ] **Step 9.3** — Deploy preview:

```bash
firebase hosting:channel:deploy preview-media-fix --expires 2d
```

- [ ] **Step 9.4** — Abrir URL preview em incognito:
  - Console: zero CORS errors
  - Network: assets Supabase = 200
  - Visual: hero estável, vídeos sem crop

- [ ] **Step 9.5** — Live:

```bash
pnpm run deploy
```

- [ ] **Step 9.6** — Smoke final:

```bash
curl -I https://portfoliodanilo.com
```
Expected: 200.

---

## Definition of Done

- [ ] 7 consumers do `ResponsiveVideo` funcionando idênticos
- [ ] `pnpm typecheck && pnpm lint && pnpm build` exit 0
- [ ] `pnpm test` todos os specs passando
- [ ] Network: 1 request de vídeo por viewport
- [ ] Hero glow > 55 FPS em MacBook M1
- [ ] `pnpm run verify:assets` exit 0
- [ ] `https://portfoliodanilo.com` sem CORS error
- [ ] `ERRORS.md` atualizado
- [ ] `.context/active_state.md` atualizado

---

## Rollback

```bash
# Code
git revert <hash-task-1>..<hash-task-5>

# Supabase (raro)
mcp__plugin_supabase_supabase__execute_sql
  query: "DROP POLICY 'Public read site-assets' ON storage.objects;
          DROP POLICY 'Public read portfolio-media' ON storage.objects;"

# Firebase
firebase hosting:rollback
```
