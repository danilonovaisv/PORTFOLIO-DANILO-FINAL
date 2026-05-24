# Task Breakdown — Ghost Bloom + Portfolio Hero Full-Bleed

> **Status:** AWAITING APPROVAL. Não executar até "Aprovado" / "Proceed".
> **Pareado com:** `implementation_plan.md`
> **Branch alvo (pós-aprovação):** `fix/ghost-bloom-portfolio-hero-fullbleed`
> **Owner padrão:** `@orchestrator` (delegação por agente abaixo)

---

## Task 1 — Fix UnrealBloomPass resize (Ghost brilho secondary cause)

**Owner:** `@spectral-artist`
**Duração estimada:** 10 min
**Dependências:** nenhuma
**Files:** `src/components/canvas/home/hero/hooks/useGhostScene.ts`

**Steps:**

- [ ] Ler `src/components/canvas/home/hero/hooks/useGhostScene.ts` linhas 229-249
- [ ] Substituir linha 241:

```ts
// Before
bloomPassRef.current.resolution.set(window.innerWidth, window.innerHeight);
// After
bloomPassRef.current.setSize(window.innerWidth, window.innerHeight);
```

- [ ] Rodar `pnpm run typecheck` — esperado: PASS
- [ ] Rodar `pnpm run lint -- src/components/canvas/home/hero/hooks/useGhostScene.ts` — esperado: zero warnings
- [ ] Commit:

```bash
git add src/components/canvas/home/hero/hooks/useGhostScene.ts
git commit -m "fix(ghost): use UnrealBloomPass.setSize() to rebuild FBOs on resize"
```

**Critério de aceite:**
- TypeScript compila
- Lint limpo
- Rotation/resize em DevTools mobile preserva intensidade do bloom (visual smoke)

---

## Task 2 — Lift bloom strength on low tier (Ghost brilho primary cause)

**Owner:** `@spectral-artist`
**Duração estimada:** 15 min
**Dependências:** Task 1 mergeada (para isolar efeito visual)
**Files:** `src/components/canvas/home/hero/hooks/useGhostParams.ts`

**Steps:**

- [ ] Ler `src/components/canvas/home/hero/hooks/useGhostParams.ts` linha 48 e contexto (10 linhas vizinhas)
- [ ] Substituir definição de `bloomStrength`:

```ts
// Before
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.55,
// After
bloomStrength:
  performanceConfig.quality === 'low'
    ? 0.42
    : performanceConfig.quality === 'medium'
      ? 0.50
      : 0.55,
```

- [ ] Rodar `pnpm run typecheck` — esperado: PASS
- [ ] Rodar `pnpm run dev`, abrir `/` em viewport mobile via DevTools (User-Agent iPhone), confirmar:
  - Ghost emite brilho visível
  - FPS sustentado ≥50 (Performance tab)
- [ ] Commit:

```bash
git add src/components/canvas/home/hero/hooks/useGhostParams.ts
git commit -m "fix(ghost): align low-tier bloomStrength with desktop for parity"
```

**Critério de aceite:**
- Bloom visível em emulação mobile
- FPS ≥50 em emulação mobile
- Sem regressão visual no tier high (comparar contra branch main)

---

## Task 3 — Audit emissive baseline (HDR floor)

**Owner:** `@spectral-artist`
**Duração estimada:** 20 min
**Dependências:** Task 2 mergeada
**Files:** `src/components/canvas/home/hero/hooks/useGhostParams.ts`

**Steps:**

- [ ] Ler `useGhostParams.ts` na íntegra
- [ ] Localizar `emissiveIntensity` (provavelmente próximo de `bloomThreshold`)
- [ ] Se valor atual ≥ `1.2`: marcar task como `SKIPPED`, commit não necessário
- [ ] Se valor atual < `1.2`: subir para `1.2` (manter pulse derivado)
- [ ] Rodar `pnpm run typecheck`
- [ ] Rodar `pnpm run dev`, comparar brilho em high tier:
  - Sem halo excessivo
  - Pulse perceptível mas não chamativo
- [ ] Commit (se alterado):

```bash
git add src/components/canvas/home/hero/hooks/useGhostParams.ts
git commit -m "fix(ghost): raise emissive baseline above bloom threshold post-ACES"
```

**Critério de aceite:**
- Bloom mais consistente entre frames de pulse
- Sem oversaturação visível

---

## Task 4 — Flip portfolioHero fitPolicy to cover

**Owner:** `@frontend-specialist`
**Duração estimada:** 10 min
**Dependências:** nenhuma (paralelo às Tasks 1-3)
**Files:** `src/lib/video-assets.ts`

**Steps:**

- [ ] Ler `src/lib/video-assets.ts` localizando bloco `portfolioHero`
- [ ] Substituir:

```ts
// Before
portfolioHero: { ..., fitPolicy: 'contain' }
// After
portfolioHero: { ..., fitPolicy: 'cover' }
```

- [ ] Rodar `pnpm run typecheck` — esperado: PASS
- [ ] Rodar `pnpm run dev`, abrir `/portfolio`, confirmar:
  - Desktop 1920×1080: sem barras laterais nem topo/baixo
  - Mobile 390×844 (DevTools): vídeo preenche viewport
  - Foco visual (rosto/elemento central) preservado
- [ ] Commit:

```bash
git add src/lib/video-assets.ts
git commit -m "fix(portfolio): use object-cover for hero video to eliminate letterbox"
```

**Critério de aceite:**
- Hero `/portfolio` sem barras visíveis em desktop e mobile
- Composição do vídeo permanece legível

---

## Task 5 — Defensive objectPosition (conditional)

**Owner:** `@frontend-specialist`
**Duração estimada:** 10 min (skippable)
**Dependências:** Task 4 mergeada + QA visual identificou crop ruim
**Files:** `src/components/portfolio/PortfolioHeroNew.tsx`

**Steps:**

- [ ] Após Task 4, capturar screenshots desktop + mobile + ultrawide
- [ ] Se composição preservada: marcar `SKIPPED`, encerrar task
- [ ] Se crop cortou foco crítico: ajustar `objectPosition` em `PortfolioHeroNew.tsx:47`
  - Ex: `objectPosition="center 30%"` para puxar foco para cima
- [ ] Re-capturar screenshots
- [ ] Commit (se alterado):

```bash
git add src/components/portfolio/PortfolioHeroNew.tsx
git commit -m "fix(portfolio): tune hero video objectPosition for cover focal point"
```

**Critério de aceite:**
- Composição do vídeo preserva foco em todos os breakpoints validados

---

## Task 6 — Full validation gate

**Owner:** `@audit-sentinel` / `@orchestrator`
**Duração estimada:** 30 min
**Dependências:** Tasks 1-5 completas
**Files:** nenhum (validação)

**Steps:**

- [ ] `pnpm run lint` — esperado: PASS, zero novos warnings
- [ ] `pnpm run typecheck` — esperado: PASS
- [ ] `pnpm run build` — esperado: PASS, `.next/` gerado
- [ ] `pnpm start` (standalone) e abrir `/` e `/portfolio`
- [ ] Comparar brilho ghost dev vs standalone em mesmo browser/viewport — confirmar paridade ≤10% diff perceptual
- [ ] FPS sample:
  - Desktop Chrome 1920×1080 em `/` por 30s — esperado: ≥58 FPS
  - Mobile emulado (CPU 4× throttle) em `/` por 30s — esperado: ≥50 FPS
- [ ] Capturar screenshots de evidência:
  - `evidence/ghost-desktop-before.png` (de branch main, pré-correção)
  - `evidence/ghost-desktop-after.png` (worktree atual)
  - `evidence/ghost-mobile-before.png` / `after.png`
  - `evidence/portfolio-hero-desktop-before.png` / `after.png`
  - `evidence/portfolio-hero-mobile-before.png` / `after.png`
- [ ] Salvar evidências em `docs/plans/2026-05-24-ghost-bloom-hero/evidence/`

**Critério de aceite:**
- Todos os gates PASS
- Evidências arquivadas

---

## Task 7 — Walkthrough

**Owner:** `@orchestrator`
**Duração estimada:** 20 min
**Dependências:** Task 6 completa
**Files:** `docs/plans/2026-05-24-ghost-bloom-hero/walkthrough.md` (criar)

**Steps:**

- [ ] Criar `walkthrough.md` com seções:
  - **Causa raiz** (resumo das 3 hipóteses validadas)
  - **Decisões** (por que `0.42` em low, por que `cover`, por que sem swap de tone mapping)
  - **Arquivos alterados** (lista com path + hash de commit)
  - **Evidências** (refs a screenshots em `evidence/`)
  - **Próximos riscos** (se cover quebrar em vídeo futuro; revisitar emissive ao trocar HDR pipeline)
- [ ] Avaliar se `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/` precisa nota sobre política `cover`
  - Se sim: adicionar parágrafo curto no doc relevante
  - Se não: documentar decisão no walkthrough
- [ ] Commit:

```bash
git add docs/plans/2026-05-24-ghost-bloom-hero/walkthrough.md
git commit -m "docs: walkthrough for ghost bloom + portfolio hero fixes"
```

**Critério de aceite:**
- Walkthrough autossuficiente (leitor sem contexto entende a mudança)
- Links para commits e evidências

---

## Task 8 — Deploy gate (humano)

**Owner:** Usuário (Danilo)
**Duração estimada:** N/A
**Dependências:** Task 7 completa
**Files:** nenhum

**Steps:**

- [ ] Push da branch `fix/ghost-bloom-portfolio-hero-fullbleed`
- [ ] Abrir PR contra `main`
- [ ] Aguardar review humano
- [ ] Validar preview Vercel/Firebase
- [ ] Aprovar merge

**Critério de aceite:**
- Preview confirma fixes em ambiente equivalente a produção
- Usuário aprova explicitamente o deploy

---

## Resumo de gates

| Gate | Bloqueia? | Validador |
|------|-----------|-----------|
| `pnpm run lint` | Sim | CI/local |
| `pnpm run typecheck` | Sim | CI/local |
| `pnpm run build` | Sim | CI/local |
| FPS desktop ≥58 | Sim | DevTools Performance |
| FPS mobile ≥50 | Sim | DevTools Performance (throttled) |
| Bloom visível em emulação mobile | Sim | Visual |
| Hero `/portfolio` sem barras | Sim | Visual |
| Composição do vídeo preservada | Sim | Visual |
| Build vs dev parity ≤10% diff | Sim | Visual |

---

## Approval gate

**STOP.**

Sem reply "Aprovado" / "Proceed" do usuário:
- Tasks 1-8 ficam congeladas
- Branch não é criada
- Nenhum commit é feito
