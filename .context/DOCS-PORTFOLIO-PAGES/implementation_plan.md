# Implementation Plan — Video Responsivo, Ghost Hero Glow, Firebase Deploy

> Plano baseado em exploração real do código (commits até `ef7131783`).
> Skill aplicada: `ghost-design-system:ghost-design` + `superpowers:writing-plans`.

---

## 1. Root Cause Analysis

### 1.1 Vídeo Responsivo (`ResponsiveVideo.tsx`)

Arquivo: `src/components/ui/shared/ResponsiveVideo.tsx`

| # | Causa raiz | Linha |
|---|---|---|
| A | Swap de `src` via JS pós-hidratação (`mounted` flag) → primeiro request é desktop, depois remount para mobile | 44–53 |
| B | `useEffect` chama `internalRef.current.load() + .play()` toda vez que `activeSrc` muda → `AbortError` quando o elemento é desmontado mid-play (silenciado mas wasteful) | 66–104 |
| C | Wrapper com aspect ratio diferente entre breakpoints (`aspect-[9/16] sm:aspect-video` em `VideoManifesto.tsx:139`) + `object-cover` → crop/distorção quando o MP4 físico não bate com o aspect do wrapper | consumers |
| D | `useMediaQuery` SSR-unsafe inicial — sempre renderiza desktop primeiro, gera flash em mobile | 43 |

Consumers afetados:
- `src/components/home/hero/VideoManifesto.tsx:149`
- `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx:151,199`
- `src/components/sobre/sections/AboutHero.tsx:63`
- `src/components/sobre/sections/AboutMethod.tsx:43`
- `src/components/sobre/sections/AboutClosing.tsx:106`
- `src/components/portfolio/PortfolioHeroNew.tsx:41`

### 1.2 Ghost Hero Glow

Arquivos:
- `src/components/canvas/home/hero/hooks/useGhostParams.ts`
- `src/components/canvas/home/hero/hooks/useGhostScene.ts`
- `src/components/canvas/home/hero/hooks/useGhostAnimate.ts`

| # | Causa raiz | Linha |
|---|---|---|
| A | `bloomThreshold: 0.0` → bloom processa todos os pixels (não apenas emissivos) → instável e custoso | `useGhostParams.ts:50` |
| B | `emissiveIntensity = base + sin(time * pulseSpeed) * pulseIntensity` direto, sem smoothing → flicker quando `pulseIntensity` > 0.1 | `useGhostAnimate.ts:110–112` |
| C | Eye glow com `glowChangeSpeed = response * 2` quando `isMoving=true`, `response` quando `false` → step visível no toggle | `useGhostAnimate.ts:115–127` |
| D | `setPixelRatio(performanceConfig.pixelRatio)` sem cap final → custo de bloom dobra em retina | `useGhostScene.ts:66` |
| E | Atmosphere mesh `transparent + depthWrite: false + renderOrder: -100` ordenado antes do bloom → alpha sort com bloom pode flicker | `useGhostScene.ts:146,152` |

### 1.3 Firebase Deploy + Asset URLs

Arquivos: `firebase.json`, `next.config.mjs`, `scripts/firebase-next-adapter.cjs`, `src/lib/video-assets.ts`, `docs/audits/supabase-cors-rls-fix.sql`

| # | Causa raiz | Evidência |
|---|---|---|
| A | URLs Supabase são absolutas e hard-coded (`umkmwbkwvulxtdodzmzf.supabase.co`) — NÃO afetadas pelo build, mas dependem 100% de Storage público + CORS + RLS | `src/lib/video-assets.ts:1–35` |
| B | `docs/audits/supabase-cors-rls-fix.sql` nunca rodado em produção → buckets podem estar privados ou sem `POLICY SELECT TO public` | `docs/audits/supabase-cors-rls-fix.sql` |
| C | CORS do Supabase não inclui `portfolio-danilo-novais.web.app` e `portfolio-danilo-novais.firebaseapp.com` → browser bloqueia preflight | painel Supabase |
| D | `adapterPath: scripts/firebase-next-adapter.cjs` só escreve `export-marker.json` placeholder — não causa o bug, mas mascara regressão do webframeworks adapter | `scripts/firebase-next-adapter.cjs:1–35` |
| E | CSP `media-src` já inclui `*.supabase.co` (`next.config.mjs:118–128`) — OK. Mas `NEXT_PUBLIC_SUPABASE_URL` precisa estar setado nas envs do Firebase Functions runtime (`nodejs22`) | `next.config.mjs:15–33` |

---

## 2. Proposed Architecture

### A. ResponsiveVideo — `<source media>` nativo

Eliminar todo JS de breakpoint. Browser escolhe source no parse:

```tsx
<video autoPlay muted loop playsInline poster={poster} className={className} {...rest}>
  {mobileSrc && (
    <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
  )}
  <source src={desktopSrc} type="video/mp4" />
</video>
```

Manter API pública (`desktopSrc`, `mobileSrc`, `desktopPoster`, `mobilePoster`, `breakpoint`, `forwardRef`) — zero refactor nos 7 consumers. Eliminar `useMediaQuery`, `useState(mounted)`, `useEffect` de load/play.

**Wrapper aspect**: para `VideoManifesto.tsx:139` (`aspect-[9/16] sm:aspect-video`), validar com `ffprobe` que o ficheiro mobile MP4 é 9:16 e desktop 16:9. Se não bater → re-encode `ffmpeg`. Manter `object-cover` SE aspect bate.

### B. Ghost Hero Glow — clamp + smoothing

`useGhostParams.ts`:
```ts
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.35,
bloomRadius: 1.1,
bloomThreshold: 0.85, // só pixels muito emissivos pulam
pulseIntensity: 0.12, // clamp
```

`useGhostAnimate.ts` — substituir:
```ts
// Antes:
ghostMaterial.emissiveIntensity =
  params.emissiveIntensity + Math.sin(time * params.pulseSpeed) * params.pulseIntensity;

// Depois:
const target =
  params.emissiveIntensity + Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
ghostMaterial.emissiveIntensity +=
  (target - ghostMaterial.emissiveIntensity) * 0.08;
```

Eye glow — único speed:
```ts
const glowChangeSpeed = 0.08;
const newOpacity =
  eyes.leftEyeMaterial.opacity +
  (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;
```

`useGhostScene.ts:66`:
```ts
renderer.setPixelRatio(Math.min(performanceConfig.pixelRatio, 1.5));
```

`useGhostScene.ts:152`:
```ts
atmosphere.renderOrder = -1000;
```

### C. Firebase Deploy — pipeline determinístico

1. **Rodar SQL idempotente** em `docs/audits/supabase-cors-rls-fix.sql` via Supabase MCP (`mcp__plugin_supabase_supabase__apply_migration`).
2. **Configurar CORS** no painel Supabase (`Settings → API → CORS Allowed Origins`):
   - `https://portfoliodanilo.com`
   - `https://portfolio-danilo-novais.web.app`
   - `https://portfolio-danilo-novais.firebaseapp.com`
   - `http://localhost:3000`
3. **Criar `scripts/verify-supabase-assets.mjs`** — `HEAD` em 1 URL de cada bucket pré-deploy; exit ≠ 0 se 4xx.
4. **Wire `package.json`**:
   ```json
   "verify:assets": "node scripts/verify-supabase-assets.mjs",
   "predeploy": "pnpm run verify:assets && pnpm run build"
   ```
5. **Documentar env vars no `next.config.mjs`** — `NEXT_PUBLIC_SUPABASE_URL` no Firebase Functions runtime env.

---

## 3. Files Affected

**Modify:**
- `src/components/ui/shared/ResponsiveVideo.tsx`
- `src/components/canvas/home/hero/hooks/useGhostParams.ts:48–50`
- `src/components/canvas/home/hero/hooks/useGhostAnimate.ts:110–127`
- `src/components/canvas/home/hero/hooks/useGhostScene.ts:66,152`
- `next.config.mjs:15–33`
- `package.json`

**Create:**
- `scripts/verify-supabase-assets.mjs`

**Apply (DB):**
- `docs/audits/supabase-cors-rls-fix.sql` via Supabase MCP `apply_migration`

**Reuse:**
- `src/lib/video-assets.ts` (`RESPONSIVE_VIDEOS`)
- `src/lib/media/asset-contract.ts`
- `src/lib/supabase/urls.ts`

---

## 4. Risks & Mitigations

| Risco | Mitigação |
|---|---|
| `<source media>` swap dinâmico em browser antigo | Baseline: Chrome 90+, Safari 14+, Firefox 88+ — suportam. Sem fallback |
| Hydration mismatch SSR vs client | Componente puramente declarativo — zero state |
| Bloom threshold alto deixa cena escura | Compensar `emissiveIntensity` 1.8 → 2.2 se necessário |
| SQL aplicado em prod sem revisão | Idempotente. Testar em branch Supabase |
| `verify:assets` quebra deploy offline | Opt-in via `SKIP_ASSET_VERIFY=1` |
| Cache CDN serve versão antiga | `firebase hosting:channel:deploy` antes do live |

---

## 5. Validation Strategy

### Video
- Network: 1 único request de vídeo por viewport.
- Resize 1920px → 375px enquanto vídeo toca → swap sem flash.
- Zero crop em `/`, `/sobre`, `/portfolio` em 375px e 1440px.

### Hero glow
- DevTools Performance → record 30s no hero.
- FPS > 55 (target 60) em MacBook M1.
- Sem flicker no ghost ou eye glow.

### Firebase deploy
- `pnpm run verify:assets` exit 0.
- Pós-deploy em incognito → console limpo, Network all 200.
- `curl -I -H "Origin: https://portfolio-danilo-novais.web.app" <url>` → 200 + ACAO header.

### CI / build
- `pnpm typecheck && pnpm lint && pnpm build` exit 0.
- `pnpm test` — `test/unit/asset-contract.test.ts` passando.

---

## 6. Execution Order

1. Branch: `git checkout -b fix/media-glow-deploy-2026-05-21`
2. Task 1 — ResponsiveVideo rewrite (`pnpm dev` smoke).
3. Tasks 3–5 — Ghost params/animate/scene fixes.
4. Task 6 — SQL Supabase via MCP.
5. Task 7 — CORS painel Supabase.
6. Task 8 — `verify-supabase-assets.mjs` + predeploy.
7. Task 9 — `pnpm test && pnpm build` smoke + Playwright.
8. `firebase hosting:channel:deploy preview-media-fix` validação.
9. Merge PR + `pnpm run deploy` live.

Detalhe de cada step: ver `task.md`.
