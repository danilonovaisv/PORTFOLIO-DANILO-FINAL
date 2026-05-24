# Implementation Plan — Ghost Bloom + Portfolio Hero Full-Bleed

> **Status:** AWAITING APPROVAL — do not implement until user replies "Aprovado" / "Proceed".
> **Date:** 2026-05-24
> **Scope:** Three defects, single PR.
> **Mode:** Plan-only. No code edits, no build, no deploy.

---

## 1. Defects (verbatim)

| # | Defect | Surface |
|---|--------|---------|
| 1 | Ghost 3D perde brilho após deploy | `src/components/canvas/home/hero/**` |
| 2 | Vídeo da hero `/portfolio` corta laterais | `src/components/portfolio/PortfolioHeroNew.tsx`, `src/lib/video-assets.ts` |
| 3 | Hero `/portfolio` deve iniciar full bleed | Already structurally full-bleed; verify and harden |

---

## 2. Root-cause analysis

### 2.1 Ghost brilho — primary cause

**File:** `src/components/canvas/home/hero/hooks/useGhostParams.ts:48`

```ts
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.55,
```

**File:** `src/hooks/usePerformanceAdaptive.ts:24-31`

```ts
const isMobile = /iPhone|iPad|iPod|Android/i.test(nav.userAgent);
const isLowEnd = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
const hasLowMemory = nav.deviceMemory && nav.deviceMemory < 4;
if (isMobile || isLowEnd || hasLowMemory) {
  setQuality('low');
  return;
}
```

**Result:**
- Dev locally = desktop = `quality='high'` = `bloomStrength=0.55` → brilho visível.
- Production tested on phone = `quality='low'` = `bloomStrength=0.18` → bloom quase apagado.
- Mesmo código, runtime tiers diferentes. Usuário lê como "perde brilho após deploy".

### 2.2 Ghost brilho — secondary cause (resize regression)

**File:** `src/components/canvas/home/hero/hooks/useGhostScene.ts:241-244`

```ts
bloomPassRef.current.resolution.set(window.innerWidth, window.innerHeight);
```

`UnrealBloomPass` exposes `setSize(width, height)` que redimensiona FBOs internos da mip-chain. Mutar `.resolution` Vector2 não recria os render targets. Após resize/orientation change, bloom samplea mip pyramid em resolução errada → bloom degrada ou some. Atinge paths exclusivos de produção (mobile rotation).

### 2.3 Ghost brilho — tertiary cause (HDR headroom)

**File:** `useGhostScene.ts:70-71`

```ts
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = params.exposure; // 1.05
```

ACESFilmic comprime highlights. `bloomThreshold = 0.65` significa apenas luminância >0.65 contribui pro bloom. `emissiveIntensity` lerpa para `params.emissiveIntensity + pulse` sem clamp HDR — raramente passa de threshold pós-tonemap. Bloom presente mas fraco por design.

### 2.4 Hero vídeo — root cause

**File:** `src/lib/video-assets.ts` — `RESPONSIVE_VIDEOS.portfolioHero.fitPolicy = 'contain'`

`object-contain` preserva aspect ratio dentro do container → barras letterbox em mismatch (16:9 em 21:9 → barras laterais; 16:9 em 9:16 → barras topo/baixo). Usuário lê as barras como "corta laterais".

### 2.5 Full bleed

**File:** `src/components/portfolio/PortfolioHeroNew.tsx:36`

```tsx
className="relative left-1/2 z-10 h-screen min-h-[100svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-background"
```

Section **já** é full-bleed estrutural. Body com `overflow-x-clip` (`src/app/layout.tsx`). Parent `<main>` e wrapper `<div className="min-h-screen">` sem constraint. Sintoma "precisa de full bleed" é downstream de 2.4 — barras letterbox fazem parecer recuado.

---

## 3. Affected files

| File | Change | Why |
|------|--------|-----|
| `src/components/canvas/home/hero/hooks/useGhostScene.ts` | Modify (1 line) | Trocar `.resolution.set()` por `.setSize()` no resize handler |
| `src/components/canvas/home/hero/hooks/useGhostParams.ts` | Modify (3 lines) | Subir bloom em tier `low`; verificar floor emissive |
| `src/lib/video-assets.ts` | Modify (1 token) | Flip `fitPolicy` `'contain'` → `'cover'` em `portfolioHero` |
| `src/components/portfolio/PortfolioHeroNew.tsx` | Modify (className) | Ajuste defensivo de `object-position` se cover cortar foco |
| `docs/plans/2026-05-24-ghost-bloom-hero/walkthrough.md` | Create | Evidências pós-execução |
| `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/*` | Update | Documentar política `cover` |

**Files NÃO tocados:**
- `GhostSceneWrapper.tsx` (SSR já desativado, sem mudança)
- `GhostScene.tsx` (sem mudança de lógica)
- `useGhostAnimate.ts` (render path correto)
- `ResponsiveVideo.tsx` (componente genérico; mudança é upstream)

---

## 4. Technical strategy

### 4.1 Ghost brilho fix

**Step A — resize correctness (mandatory)**

`useGhostScene.ts:241`:

```ts
// Before
bloomPassRef.current.resolution.set(window.innerWidth, window.innerHeight);

// After
bloomPassRef.current.setSize(window.innerWidth, window.innerHeight);
```

**Step B — mobile bloom parity (mandatory)**

`useGhostParams.ts:48`:

```ts
// Before
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.55,

// After
bloomStrength:
  performanceConfig.quality === 'low' ? 0.42 :
  performanceConfig.quality === 'medium' ? 0.50 : 0.55,
```

Justificativa: aproximar `low` de `high` preservando identidade. Custo bounded — bloom mip resolution já capada via `pixelRatio: 1` em low tier.

**Step C — HDR floor para emissive (mandatory)**

`useGhostParams.ts` — onde `emissiveIntensity` é declarado, garantir base ≥ `1.2` para o `pulse` manter sinal acima de `bloomThreshold=0.65` pós-ACES. Ler valor atual primeiro; se já ≥1.2, no-op.

**Step D — guardrails (defensivo, sem mudança comportamental)**

`console.assert` dev-only em `useGhostScene.ts` confirmando `composer`, `bloomPass`, `OutputPass` instanciados pós-`init()`. Removido em build via DCE.

### 4.2 Hero vídeo fix

`src/lib/video-assets.ts`:

```ts
portfolioHero: {
  desktop: '...',
  mobile: '...',
  fitPolicy: 'cover', // was: 'contain'
}
```

`PortfolioHeroNew.tsx:47` — manter `objectPosition="center center"`. Validar no QA contra mp4 source.

### 4.3 Full bleed

Sem mudança de código. Section já bleeds. Asserção no walkthrough: hero `<section>` `getBoundingClientRect().width === window.innerWidth` (sem scrollbar offset graças a `overflow-x-clip`).

---

## 5. Restrictions honored

| Constraint | How enforced |
|------------|-------------|
| Tokens intactos | Sem novos valores de cor/espaçamento |
| Vermelho não como identidade | Sem mudanças de cor |
| Tailwind `source(none)` | Sem novas utilities fora do config |
| Motion: opacity/blur/translateY only | Sem mudanças de motion |
| Motion proibido: scale/rotate/bounce | Não introduzido |
| Easing `cubic-bezier(0.22, 1, 0.36, 1)` | Sem mudanças de timing |
| pnpm only | Validação via `pnpm run lint`, `pnpm run build` |
| Editar existentes | Apenas walkthrough é novo |
| Read antes de edit | Cada task lê target primeiro |

---

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `setSize` em `UnrealBloomPass` realoca GPU a cada resize | Low | Frame drop durante resize | Browser já debouce; mesmo custo do init |
| Bloom mais forte em mobile derruba FPS <50 | Medium | Falha critério perf | QA: amostragem FPS em device real. Fallback: `0.35` |
| `object-cover` corta composição crítica (rosto, logo) | Medium | Regressão visual | QA: screenshots side-by-side desktop+mobile vs source mp4 |
| Emissive >1.2 oversatura bloom em high-tier | Low | "Halo" | Diff visual vs referência high-tier atual |
| Aspect ratio do vídeo causa crop feio em ultrawide | Low | Edge case | `objectPosition` tweak — adiar até QA observar |

---

## 7. Validation matrix

**Local (mandatory, gate):**

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run dev   # smoke manual
```

Pass criteria:
- Zero novos warnings de lint nos arquivos tocados
- Build sucesso, `.next` produzido
- Dev renderiza `/` e `/portfolio` sem console errors

**Visual (mandatory, gate):**

| Surface | Device | Evidence |
|---------|--------|----------|
| `/` ghost em repouso | Desktop Chrome 1920×1080 | Screenshot antes/depois |
| `/` ghost em movimento | Desktop Chrome | Screenshot mid-animation |
| `/` ghost | iOS Safari simulator 390×844 | Screenshot antes/depois |
| `/portfolio` hero | Desktop 1920×1080 | Screenshot — confirmar sem barras laterais |
| `/portfolio` hero | Mobile 390×844 | Screenshot — confirmar full bleed |
| `/portfolio` hero | Ultrawide 3440×1440 | Screenshot — confirmar crop aceitável |

**Build vs dev parity (mandatory):**

```bash
pnpm run build && pnpm start   # standalone
```

Comparar brilho ghost no mesmo browser, mesmo viewport, dev vs standalone. Se bloom differ ≥10% perceptual → regressão → bloquear.

**FPS gate (mandatory per `.claude/rules/21-webgl-performance.md`):**

- Desktop: ≥58 FPS sustained
- Mobile (device real ou CPU 4× throttle): ≥50 FPS sustained

---

## 8. Out of scope

- Refactor de `useGhostScene.ts` modularization
- Novos shaders ou passes de post-processing
- Swap de tone mapping (ACES → Linear/Reinhard) — exigiria design review
- Re-encode de vídeo ou upload de novo asset
- Mudança `cover`/`contain` em outros heros
- Update de tokens em `.context/GHOST-DESIGN-SYSTEM.md`

---

## 9. Approval gate

**STOP. Aguardando:**

> "Aprovado" ou "Proceed"

Sem aprovação explícita:
- Sem code edits
- Sem `pnpm run build`
- Sem deploy
- Sem `.context/` writes (exceto walkthrough na conclusão)

---

## 10. Post-approval execution order

1. Branch: `fix/ghost-bloom-portfolio-hero-fullbleed`
2. Task 1 — Ghost resize fix (1 file, 1 line)
3. Task 2 — Ghost bloom params (1 file, 3 lines)
4. Task 3 — Emissive floor (1 file, 1 value — só se leitura mostrar <1.2)
5. Task 4 — Hero video fitPolicy (1 file, 1 token)
6. Task 5 — PortfolioHeroNew objectPosition guard (1 file, 1 attr — só se QA exigir)
7. Validação (lint, typecheck, build, dev smoke)
8. QA visual (screenshots desktop + mobile)
9. Build vs dev parity check
10. FPS sample
11. Walkthrough write
12. Commit (atomic, um arquivo por commit onde razoável)
13. Opcional: update `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/` com nota da política cover

Detalhamento em `task.md`.
