# AUDITORIA — HOME PAGE (Hero • Manifesto • Featured Projects)

## 1. Resumo Executivo
From the visual evidence, I observe divergências claras entre as referências oficiais e a implementação em produção, principalmente no Vídeo Manifesto (mídia quase invisível) e na hierarquia do Hero (tag ausente + subtítulo abaixo do mínimo de legibilidade mobile).
1. Vídeo Manifesto está escurecido por overlay + poster inexistente, o que gera um bloco praticamente “vazio” em produção.
2. Hero não renderiza a tag `[BRAND AWARENESS]` prevista no doc e nas referências visuais.
3. Subtítulo do Hero cai para ~14.4px no mobile, abaixo do mínimo de legibilidade do Ghost DS.
4. `prefers-reduced-motion` não é aplicado no Hero CTA (animação sempre ativa) e há easing fora do Ghost em `.btn-icon-circle`.
5. Featured Projects carece de `h2` semântico e o CTA “Like what you see?” é lido sem espaço por leitores de tela.

**Ambiente e evidências**
- Produção: https://portfoliodanilo.com
- Branch/commit analisado (local): `main` @ `b2b6f8cdfd998838300a6a99c970a4f56dedef27`
- Docs referência: `.context/DOCS-PORTFOLIO-PAGES/01-HOME/*`
- Captura visual (Chromium headless, 2026-02-26 19:15 -03): `.../reports/home-audit/*`
- Limitação: WebGL não disponível em headless, então o Ghost 3D não pôde ser validado visualmente (canvas ausente). Isso é registrado como **limitação de ambiente**, não como bug.

## 2. Score Geral (0–100)
**Score total: 60/100 (Fail)**
- Estrutura: 13/20
- UI/Visual: 14/25
- Mobile: 9/15
- Motion: 8/15
- Performance: 10/15
- A11y/SEO: 6/10

**Score por seção**
- Hero: 62
- Vídeo Manifesto: 38
- Featured Projects: 68

## 3. Top 5 Problemas Críticos

1) **Vídeo Manifesto praticamente invisível (overlay + poster inexistente)**
- **Expected (Doc):** vídeo sem overlay, full-visibility, poster válido.
- **Observed (Impl):** overlay `bg-background/80` (opacidade efetiva 1 com alpha 0.8) + poster derivado `-poster.jpg` retornando 404.
- **Impacto:** queda de percepção visual e valor criativo; seção vira “vazio” escuro.
- **Evidência:** `.../reports/home-audit/desktop-manifesto.png`, `.../reports/home-audit/mobile-manifesto.png`, `.../reports/home-audit/video-manifesto-inspect.json`, `.../reports/home-audit/video-poster-check.txt`
- **Arquivos:** `src/components/home/hero/VideoManifesto.tsx`

2) **Hero sem tag editorial `[BRAND AWARENESS]`**
- **Expected (Doc/Imagem):** tag acima do H1 em desktop e mobile.
- **Observed (Impl):** tag existe em `HOME_CONTENT.hero.tag`, mas não é renderizada.
- **Impacto:** perda de sinal editorial e hierarquia do manifesto.
- **Evidência:** `.../01-HOME/02-HERO-HOME/02-HERO-HOME-DESKTOP.jpg` vs `.../reports/home-audit/desktop-hero.png`
- **Arquivos:** `src/components/home/hero/HeroCopy.tsx`, `src/config/content.ts`

3) **Subtítulo do Hero abaixo do mínimo de legibilidade mobile (14.4px)**
- **Expected (Ghost DS):** `--font-body-mobile` 20–22px.
- **Observed (Impl):** 14.4px (mobile 360px).
- **Impacto:** legibilidade reduzida e quebra de regra AA (especialmente em contraste/visão reduzida).
- **Evidência:** `.../reports/home-audit/measurements.json` + `.../reports/home-audit/mobile-hero.png`
- **Arquivos:** `src/components/home/hero/HeroCopy.module.css`, `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md`

4) **`prefers-reduced-motion` não aplicado no Hero CTA**
- **Expected (Ghost rules):** reduzir animações no modo reduce.
- **Observed (Impl):** `HeroCTA` sempre anima (`motion.div` sem gate).
- **Impacto:** violação de acessibilidade cognitiva; reduz conformidade.
- **Evidência:** código em `src/components/home/hero/HeroCTA.tsx` + testes `mobile-reduced`
- **Arquivos:** `src/components/home/hero/HeroCTA.tsx`

5) **Featured Projects sem `h2` e CTA “Like what you see?” lido sem espaço**
- **Expected (Doc/a11y):** `h2` na seção; texto lido corretamente.
- **Observed (Impl):** não há `h2` e o `h3` do CTA é lido como “Like whatyou see?”.
- **Impacto:** semântica e SEO degradados; screen readers perdem estrutura.
- **Evidência:** headings dump (2026-02-26)
- **Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/components/home/featured-projects/CTAProjectCard.tsx`

## 4. Análise por Seção

### 4.1 Hero
- **Intenção (Doc):** hero editorial com tag `[BRAND AWARENESS]`, ghost 3D, H1 dominante, CTA central, subtítulo legível.
- **Estado Atual (Impl):** H1 sr-only OK, título renderizado, CTA aparece, tag editorial ausente, subtítulo pequeno em mobile.
- **Divergências (com evidência):**
  - Tag `[BRAND AWARENESS]` não renderizada.
  - Subtítulo mobile 14.4px vs mínimo 20px.
  - WebGL/ghost não validável em headless.
- **Impacto:** perda de hierarquia editorial, legibilidade fraca em mobile, risco de desalinhamento com Ghost DS.
- **Recomendações:**
  1. Renderizar `HOME_CONTENT.hero.tag` acima do headline.
  2. Ajustar `heroSubtitle` para `min 20px` no mobile.
  3. Aplicar `useMotionGate` também no `HeroCTA`.

**Visual Diff (tokens)**
| Item | Expected (Doc/DS) | Observed (Impl) | Delta | Evidência |
|---|---|---|---|---|
| Tag editorial | Presente | Ausente | Missing | `.../02-HERO-HOME-DESKTOP.jpg`, `.../reports/home-audit/desktop-hero.png` |
| Subtítulo mobile | 20–22px | 14.4px | -5.6px | `.../reports/home-audit/measurements.json` |
| CTA min-width | Token `min-w-cta-*` | `w-[220px]/[280px]/[340px]` | Token mismatch | `src/components/ui/AntigravityCTA.tsx` |

### 4.2 Vídeo Manifesto
- **Intenção (Doc):** vídeo full-width com alta legibilidade, sem overlay, poster válido.
- **Estado Atual (Impl):** vídeo carregado, overlay `bg-background/80`, poster derivado inexistente.
- **Divergências (com evidência):**
  - Overlay escurece 80% do vídeo (contrário ao doc).
  - Poster 404 (derivado `-poster.jpg`).
- **Impacto:** percepção de valor criativo reduzida; seção aparenta “vazio”.
- **Recomendações:**
  1. Remover ou reduzir drasticamente o overlay.
  2. Amarrar poster real via metadata do asset.
  3. Garantir fallback visual quando poster/stream falhar.

**Visual Diff (tokens)**
| Item | Expected (Doc) | Observed (Impl) | Delta | Evidência |
|---|---|---|---|---|
| Overlay | Nenhum | `bg-background/80` | +80% escurecimento | `.../reports/home-audit/video-manifesto-inspect.json` |
| Poster | Existente | 404 | Missing | `.../reports/home-audit/video-poster-check.txt` |

### 4.3 Featured Projects
- **Intenção (Doc):** grid bento 12 col, cards com altura igual por linha, CTA “Like what you see?” com botão.
- **Estado Atual (Impl):** grid bento implementado e alturas iguais (480px desktop, 250px mobile).
- **Divergências (com evidência):**
  - Ausência de `h2` na seção.
  - CTA h3 sem espaço (screen reader lê “whatyou”).
  - CTA card background não segue spec `#0d003b` (usa `bg-background`).
- **Impacto:** SEO/a11y e desalinhamento visual.
- **Recomendações:**
  1. Adicionar `h2` visível ou `sr-only` para a seção.
  2. Corrigir string acessível do CTA sem alterar copy.
  3. Ajustar fundo do CTA card conforme spec.

**Visual Diff (tokens)**
| Item | Expected (Doc) | Observed (Impl) | Delta | Evidência |
|---|---|---|---|---|
| `h2` seção | Presente | Ausente | Missing | headings dump + `.../05-FEATURED-PROJECTS.md` |
| CTA card bg | `#0d003b` | `#040013` | Color mismatch | `src/components/home/featured-projects/CTAProjectCard.tsx` |
| Card heights | Iguais por linha | Iguais (480px) | OK | `.../reports/home-audit/measurements.json` |

## 5. Matriz de Conformidade
| Critério | Referência (Doc) | Observado (Impl) | Status | Severidade | Impacto | Evidência |
|---|---|---|---|---|---|---|
| Hero tag `[BRAND AWARENESS]` | 02-HERO-HOME images | Ausente | ❌ | Alto | Clareza | `.../02-HERO-HOME-DESKTOP.jpg`, `.../reports/home-audit/desktop-hero.png` |
| Hero subtitle legibilidade mobile | Ghost DS 20–22px | 14.4px | ❌ | Alto | A11y | `.../reports/home-audit/measurements.json` |
| Hero CTA reduz motion | Ghost rules | Anima sempre | ⚠️ | Médio | A11y | `src/components/home/hero/HeroCTA.tsx` |
| Manifesto sem overlay | 03-VIDEO-MANIFESTO.md | Overlay 80% | ❌ | Crítico | Clareza | `.../reports/home-audit/video-manifesto-inspect.json` |
| Manifesto poster válido | Doc/Spec | 404 | ❌ | Alto | Performance | `.../reports/home-audit/video-poster-check.txt` |
| Featured grid bento | 05-FEATURED-PROJECTS.md | OK | ✅ | — | Consistência | `.../reports/home-audit/desktop-featured.png` |
| Featured `h2` | 05-FEATURED-PROJECTS.md | Ausente | ❌ | Médio | SEO/A11y | headings dump |
| CTA h3 spacing | A11y | “whatyou” | ⚠️ | Baixo | A11y | headings dump |

## 6. Recomendações Estratégicas
1. **Manifesto como prova visual:** remover overlay pesado e garantir poster real. Sem isso, a seção quebra o argumento visual do manifesto.
2. **Ritmo editorial do Hero:** reintroduzir tag `[BRAND AWARENESS]` e aumentar subtítulo no mobile para manter o ritmo tipográfico Ghost.
3. **Motion governance unificada:** aplicar `useMotionGate` no Hero CTA e alinhar easing da `.btn-icon-circle` ao Ghost Ease.
4. **A11y/SEO mínimo:** adicionar `h2` para Featured Projects e corrigir a string do CTA para leitura correta.
5. **Documentação sincronizada:** doc do Hero afirma CTA “não montado”, mas já está ativo; precisa alinhamento.

## 7. Roadmap de Correção (P0/P1/P2)
**P0 (Imediato)**
1. Remover/reduzir overlay do manifesto e validar poster real.
2. Fix do poster (metadata explícita no asset).

**P1 (Alta)**
1. Renderizar tag `[BRAND AWARENESS]` no Hero.
2. Ajustar subtítulo mobile para 20–22px.
3. Aplicar `useMotionGate` no `HeroCTA`.
4. Adicionar `h2` para Featured Projects + corrigir “Like what you see?” para leitura acessível.

**P2 (Média)**
1. Alinhar easing de `.btn-icon-circle` com Ghost Ease.
2. Ajustar background do CTA card ao spec `#0d003b`.
3. Atualizar doc do Hero (CTA mount status).

## 8. Prompts Atômicos para Execução

### 🛠️ Prompt #01 — Manifesto: remover overlay e corrigir poster
**Objetivo:** Tornar o vídeo manifesto visível e garantir poster válido.
**Arquivos:** `src/components/home/hero/VideoManifesto.tsx`, `src/lib/video.ts`, `src/config/site-assets.ts`
**Contexto:** Doc exige vídeo sem overlay e com poster válido. Evidência do 404 em `.../reports/home-audit/video-poster-check.txt`.
**Ações:**
1. Remover ou reduzir `bg-background/80` para no máximo 0.15 de alpha.
2. Trocar derivação `-poster.jpg` por poster explícito (metadata do asset).
3. Garantir fallback visual caso poster/stream falhe.
**Regras:** Tailwind, mobile-first, não alterar copy, respeitar tokens, reduzir motion quando necessário.
**Critérios de Aceite:**
- [ ] Vídeo visível em 360/1440 sem escurecimento excessivo.
- [ ] Poster não retorna 404.
- [ ] Overlay reduzido ou removido conforme doc.
**Risco/Trade-off:** aumento leve de contraste visual; validar legibilidade do botão de som.

### 🛠️ Prompt #02 — Hero: renderizar tag editorial
**Objetivo:** Reintroduzir `[BRAND AWARENESS]` conforme doc.
**Arquivos:** `src/components/home/hero/HeroCopy.tsx`, `src/config/content.ts`
**Contexto:** Tag existe no conteúdo mas não é renderizada.
**Ações:**
1. Inserir tag acima do headline (desktop e mobile).
2. Estilizar com token de tag já existente no CSS.
**Regras:** não alterar copy, respeitar tokens, manter hierarquia.
**Critérios de Aceite:**
- [ ] Tag aparece em 360/1440.
- [ ] Não quebra layout do título.
**Risco/Trade-off:** potencial ajuste de espaçamento vertical.

### 🛠️ Prompt #03 — Hero: aumentar subtítulo mobile
**Objetivo:** Subtítulo mobile ≥ 20px (Ghost DS).
**Arquivos:** `src/components/home/hero/HeroCopy.module.css`
**Contexto:** Medição atual 14.4px em 360px.
**Ações:**
1. Ajustar `clamp` do `.heroSubtitle` para mínimo 1.25rem.
2. Revalidar line-height (mínimo 1.4).
**Regras:** mobile-first, sem alterar copy.
**Critérios de Aceite:**
- [ ] 360px ≥ 20px.
- [ ] Não estoura largura.
**Risco/Trade-off:** aumento de altura total do hero.

### 🛠️ Prompt #04 — Motion: respeitar reduce no Hero CTA
**Objetivo:** Desligar animação do CTA quando `prefers-reduced-motion`.
**Arquivos:** `src/components/home/hero/HeroCTA.tsx`
**Contexto:** `HeroCTA` sempre anima.
**Ações:**
1. Aplicar `useMotionGate` e zerar animação no reduce.
2. Garantir estados estáticos em reduce.
**Regras:** Ghost motion, sem scale.
**Critérios de Aceite:**
- [ ] Reduced motion sem y/opacity animation.
**Risco/Trade-off:** nenhum.

### 🛠️ Prompt #05 — Featured: `h2` semântico + CTA legível por SR
**Objetivo:** Melhorar semântica e leitura de screen reader.
**Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/components/home/featured-projects/CTAProjectCard.tsx`
**Contexto:** seção sem `h2` e CTA lido como “whatyou”.
**Ações:**
1. Adicionar `h2` (visível ou `sr-only`) com título da seção.
2. Ajustar string do CTA com espaço sem alterar copy.
**Regras:** não alterar copy, manter layout.
**Critérios de Aceite:**
- [ ] `h2` presente na seção.
- [ ] Screen reader lê “Like what you see?” corretamente.
**Risco/Trade-off:** mínimo.

### 🛠️ Prompt #06 — Tokens: easing Ghost no círculo CTA
**Objetivo:** alinhar `.btn-icon-circle` ao easing Ghost.
**Arquivos:** `src/app/globals.css`
**Contexto:** hoje usa `cubic-bezier(0.4,0,0.2,1)`.
**Ações:**
1. Trocar easing por `cubic-bezier(0.22, 1, 0.36, 1)`.
**Regras:** evitar scale/bounce/rotate.
**Critérios de Aceite:**
- [ ] Transição usa easing Ghost.
**Risco/Trade-off:** alteração sutil de feel.
