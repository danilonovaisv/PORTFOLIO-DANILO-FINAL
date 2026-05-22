# Walkthrough — 06-O-QUE-ME-MOVE + Origin Images Regression

> Data: 2026-05-18  
> Escopo: preservar a seção “O que me move” conforme documentação final sem animação Ghost 3D e corrigir regressão de imagens da seção ORIGEM.

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
## Estado final vigente — AboutBeliefs

Fonte de verdade: `06-O-QUE-ME-MOVE-FINAL.md`.

`AboutBeliefs` foi deliberadamente reduzido para uma composição minimalista:

```txt
AboutBeliefs.tsx
  ├── WhatMovesMeBackground
  └── BeliefScrollText
        └── WhatMovesMePhrase x6
```

Essa redução é correta e substitui a arquitetura antiga com GSAP + Ghost 3D. Não tratar como bug a ausência destes itens na árvore renderizada da seção 06:

- `BeliefFixedHeader`
- `GhostScene`
- `BeliefManifesto`
- `BeliefBackground`
- `BeliefOverlay`
- `BeliefsScrollProvider`

Esses arquivos podem continuar no repositório para histórico, compatibilidade ou outros ciclos, mas não pertencem ao render vigente de `AboutBeliefs`.

## Contrato técnico vigente

- Background: CSS fixed shade em `WhatMovesMeBackground`, sem canvas, sem CDN externo, sem `requestAnimationFrame`.
- Texto: 6 frases centralizadas em `BeliefScrollText`, controladas por Motion `useScroll` + `useTransform`.
- Frase final: `ISSO É / GHOST / DESIGN.` integrada ao fluxo de frases; `GHOST` em Ghost Blue `#0048ff`.
- Reduced motion: preserva fade, remove translate e blur.
- Acessibilidade: `section` com `aria-labelledby`, `h2.sr-only`, frases com `aria-label` completo.
- Performance: nenhum GLB, R3F, WebGL ou GSAP `ScrollTrigger` montado na seção 06.

## Contrato E2E vigente

`test/e2e/about-beliefs.spec.ts` deve validar:

- presença de `beliefs-section`, `what-moves-me-background`, `beliefs-scroll-text` e 6 `belief-phrase`;
- ausência de `beliefs-ghost-scene`, `beliefs-manifesto`, `beliefs-fixed-header`, `beliefs-background`, `data-belief-section` e `data-belief-manifesto`;
- ausência de `canvas` dentro de `beliefs-section`;
- centralização desktop/mobile;
- scroll forward/reverso mantendo frase visível;
- reduced motion sem translate/blur;
- ausência de erro `Error creating WebGL context` quando WebGL é indisponível.

## Registro de validação — 2026-05-18

Validações executadas após registrar o estado final:

- `pnpm run typecheck` passou.
- `pnpm run lint` passou.
- `PLAYWRIGHT_BASE_URL=http://localhost:3000 pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --reporter=line` passou com `7 passed`.
- Playwright CLI abriu `http://localhost:3000/sobre`, gerou snapshot e confirmou a região `O que me move` com as 6 frases.
- `rg` no snapshot CLI confirmou texto da seção e não encontrou `canvas`.
- Console CLI mostrou apenas mensagens informativas de React DevTools/HMR, sem erro crítico.

Observações de ambiente:

- A sessão local usa Node `v26.0.0` / pnpm `11.1.1`; o repo declara Node `22`, então `pnpm` emite warning de engine.
- O Playwright config ainda tenta iniciar `next dev --port 5005`; como já existe servidor em `localhost:3000`, o log mostra `Another next dev server is already running`. O teste usa `PLAYWRIGHT_BASE_URL=http://localhost:3000` e passou contra o servidor ativo.

## Causa raiz

1. A documentação final de `06-O-QUE-ME-MOVE` substituiu o plano antigo com GSAP + Ghost 3D por uma seção editorial com background CSS fixo e frases centralizadas. Portanto, a reintrodução de animação Ghost 3D nessa seção foi explicitamente cancelada pela aprovação humana.
2. As imagens da seção ORIGEM usavam chaves de asset divergentes em `SITE_ASSET_KEYS.about.originImages` (`about.origin.about.origin_image.*`), enquanto a fonte exportada do projeto registra `about.origin_image.*`.
3. Quando a URL de fallback era local (`/site.assets/about/origin/...`), `DynamicAssetImage` ainda passava `supabaseLoader` para `next/image`. Para caminhos locais, o loader retornava a URL sem aplicar `width`, disparando `next-image-missing-loader-width`.

## Arquivos alterados

=======
## Causa raiz

1. A documentação final de `06-O-QUE-ME-MOVE` substituiu o plano antigo com GSAP + Ghost 3D por uma seção editorial com background CSS fixo e frases centralizadas. Portanto, a reintrodução de animação Ghost 3D nessa seção foi explicitamente cancelada pela aprovação humana.
2. As imagens da seção ORIGEM usavam chaves de asset divergentes em `SITE_ASSET_KEYS.about.originImages` (`about.origin.about.origin_image.*`), enquanto a fonte exportada do projeto registra `about.origin_image.*`.
3. Quando a URL de fallback era local (`/site.assets/about/origin/...`), `DynamicAssetImage` ainda passava `supabaseLoader` para `next/image`. Para caminhos locais, o loader retornava a URL sem aplicar `width`, disparando `next-image-missing-loader-width`.

## Arquivos alterados

>>>>>>> theirs
- `src/config/site-assets.ts`
  - Corrigidas as quatro chaves de `about.originImages` para os nomes reais registrados no export de assets.
- `src/components/ui/shared/DynamicAssetImage.tsx`
  - O loader Supabase agora só é aplicado para URLs remotas transformáveis.
  - Caminhos locais, `data:` e `blob:` usam o comportamento nativo do `next/image`, eliminando o contrato inválido de loader sem `width`.
- `docs/implementation_plan.md`
  - Registrada a ressalva humana pós-aprovação: sem animação Ghost 3D em `06-O-QUE-ME-MOVE`.
- `docs/task.md`
  - Atualizadas T10/T11 para refletir a decisão de não montar WebGL nessa seção.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
  - Atualizado este walkthrough com causa, decisões, validações e riscos.
<<<<<<< ours

## O que foi preservado/restaurado

- A seção “O que me move” permanece alinhada à documentação final:
  - sem Ghost 3D renderizando;
  - sem Canvas/WebGL;
  - background CSS shade fixo;
  - seis frases centralizadas controladas por scroll;
  - frase final com `GHOST` em Ghost Blue `#0048ff`.
- A seção ORIGEM mantém o uso de `DynamicAssetImage`, mas com chaves corretas e sem loader custom em fallback local.

## Proteção do Ghost 3D

=======
## Causa raiz

1. A documentação final de `06-O-QUE-ME-MOVE` substituiu o plano antigo com GSAP + Ghost 3D por uma seção editorial com background CSS fixo e frases centralizadas. Portanto, a reintrodução de animação Ghost 3D nessa seção foi explicitamente cancelada pela aprovação humana.
2. As imagens da seção ORIGEM usavam chaves de asset divergentes em `SITE_ASSET_KEYS.about.originImages` (`about.origin.about.origin_image.*`), enquanto a fonte exportada do projeto registra `about.origin_image.*`.
3. Quando a URL de fallback era local (`/site.assets/about/origin/...`), `DynamicAssetImage` ainda passava `supabaseLoader` para `next/image`. Para caminhos locais, o loader retornava a URL sem aplicar `width`, disparando `next-image-missing-loader-width`.

## Arquivos alterados

- `src/config/site-assets.ts`
  - Corrigidas as quatro chaves de `about.originImages` para os nomes reais registrados no export de assets.
- `src/components/ui/shared/DynamicAssetImage.tsx`
  - O loader Supabase agora só é aplicado para URLs remotas transformáveis.
  - Caminhos locais, `data:` e `blob:` usam o comportamento nativo do `next/image`, eliminando o contrato inválido de loader sem `width`.
- `docs/implementation_plan.md`
  - Registrada a ressalva humana pós-aprovação: sem animação Ghost 3D em `06-O-QUE-ME-MOVE`.
- `docs/task.md`
  - Atualizadas T10/T11 para refletir a decisão de não montar WebGL nessa seção.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
  - Atualizado este walkthrough com causa, decisões, validações e riscos.

## O que foi preservado/restaurado

- A seção “O que me move” permanece alinhada à documentação final:
  - sem Ghost 3D renderizando;
  - sem Canvas/WebGL;
  - background CSS shade fixo;
  - seis frases centralizadas controladas por scroll;
  - frase final com `GHOST` em Ghost Blue `#0048ff`.
- A seção ORIGEM mantém o uso de `DynamicAssetImage`, mas com chaves corretas e sem loader custom em fallback local.

## Proteção do Ghost 3D

>>>>>>> theirs
- Nenhum arquivo em `src/components/sobre/3d/*` foi removido.
- A seção `AboutBeliefs` não reintroduz `GhostScene`, respeitando a documentação final e a ressalva humana.
- WebGL permanece disponível no projeto para outros contextos, mas não participa de `06-O-QUE-ME-MOVE`.

## Correção do loader `next/image`

Estratégia aplicada:
<<<<<<< ours

```tsx
loader={shouldUseSupabaseLoader ? supabaseLoader : undefined}
```

Critério:

- usa `supabaseLoader` apenas quando `finalUrl` não é local (`/`), `data:` ou `blob:`;
- deixa `next/image` tratar caminhos locais de `public/site.assets` nativamente;
- mantém o loader width-aware para URLs Supabase remotas.

## Paths Supabase/local auditados

| Seção | Asset lógico | Path local esperado | Bucket | Path Supabase esperado | Evidência local | Status externo |
| --- | --- | --- | --- | --- | --- | --- |
| ORIGEM | Imagem 1 | `/site.assets/about/origin/about.origin_image.1.webp` | `site-assets` | `about/origin/about.origin_image.1.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 2 | `/site.assets/about/origin/about.origin_image.2.webp` | `site-assets` | `about/origin/about.origin_image.2.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 3 | `/site.assets/about/origin/about.origin_image.3.webp` | `site-assets` | `about/origin/about.origin_image.3.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 4 | `/site.assets/about/origin/about.origin_image.4.webp` | `site-assets` | `about/origin/about.origin_image.4.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |

Observação: o ambiente não expôs Supabase MCP e o acesso HTTP direto ao domínio Supabase retornou bloqueio do túnel (`CONNECT tunnel failed, response 403`). A validação operacional confiável neste ambiente foi o mirror local versionado em `public/site.assets` e o export `src/config/site-assets.json`.

## Evidências de terminal

- `git show 43def5ca^:src/components/sobre/sections/AboutBeliefs.tsx` confirmou que o commit `43def5ca` removeu a montagem antiga do Ghost 3D.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` confirma que a versão final documentada remove Ghost 3D e GSAP da seção.
- `find public/site.assets/about/origin` confirmou os quatro `.webp` locais.
- `node` sobre `src/config/site-assets.json` confirmou os quatro registros `about.origin_image.{1..4}`.

## Evidências visuais

Validação visual automatizada via navegador não foi concluída neste ambiente antes deste registro. Checklist manual esperado em `pnpm dev`:

1. abrir `/sobre`;
2. navegar até ORIGEM e confirmar quatro imagens sem erro `next-image-missing-loader-width`;
3. navegar até “O que me move” e confirmar seção sem Canvas/WebGL/Ghost 3D animado;
4. confirmar frases centralizadas, background Ghost shade e frase final com `GHOST` em `#0048ff`.

## Validações executadas

- Inspeção de histórico Git para identificar remoção do Ghost 3D.
- Inspeção de `.context` para reconciliar intenção atual versus plano antigo.
- Inspeção de `next.config.mjs` para confirmar `remotePatterns` Supabase.
- Inspeção de `src/config/site-assets.json` e `public/site.assets/about/origin`.
- Correções programáticas em `src/config/site-assets.ts` e `DynamicAssetImage.tsx`.

## Validações finais executadas após a correção

=======
## Causa raiz

1. A documentação final de `06-O-QUE-ME-MOVE` substituiu o plano antigo com GSAP + Ghost 3D por uma seção editorial com background CSS fixo e frases centralizadas. Portanto, a reintrodução de animação Ghost 3D nessa seção foi explicitamente cancelada pela aprovação humana.
2. As imagens da seção ORIGEM usavam chaves de asset divergentes em `SITE_ASSET_KEYS.about.originImages` (`about.origin.about.origin_image.*`), enquanto a fonte exportada do projeto registra `about.origin_image.*`.
3. Quando a URL de fallback era local (`/site.assets/about/origin/...`), `DynamicAssetImage` ainda passava `supabaseLoader` para `next/image`. Para caminhos locais, o loader retornava a URL sem aplicar `width`, disparando `next-image-missing-loader-width`.

## Arquivos alterados

- `src/config/site-assets.ts`
  - Corrigidas as quatro chaves de `about.originImages` para os nomes reais registrados no export de assets.
- `src/components/ui/shared/DynamicAssetImage.tsx`
  - O loader Supabase agora só é aplicado para URLs remotas transformáveis.
  - Caminhos locais, `data:` e `blob:` usam o comportamento nativo do `next/image`, eliminando o contrato inválido de loader sem `width`.
- `docs/implementation_plan.md`
  - Registrada a ressalva humana pós-aprovação: sem animação Ghost 3D em `06-O-QUE-ME-MOVE`.
- `docs/task.md`
  - Atualizadas T10/T11 para refletir a decisão de não montar WebGL nessa seção.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
  - Atualizado este walkthrough com causa, decisões, validações e riscos.

## O que foi preservado/restaurado

- A seção “O que me move” permanece alinhada à documentação final:
  - sem Ghost 3D renderizando;
  - sem Canvas/WebGL;
  - background CSS shade fixo;
  - seis frases centralizadas controladas por scroll;
  - frase final com `GHOST` em Ghost Blue `#0048ff`.
- A seção ORIGEM mantém o uso de `DynamicAssetImage`, mas com chaves corretas e sem loader custom em fallback local.

## Proteção do Ghost 3D

- Nenhum arquivo em `src/components/sobre/3d/*` foi removido.
- A seção `AboutBeliefs` não reintroduz `GhostScene`, respeitando a documentação final e a ressalva humana.
- WebGL permanece disponível no projeto para outros contextos, mas não participa de `06-O-QUE-ME-MOVE`.

## Correção do loader `next/image`

Estratégia aplicada:

```tsx
loader={shouldUseSupabaseLoader ? supabaseLoader : undefined}
```

Critério:

- usa `supabaseLoader` apenas quando `finalUrl` não é local (`/`), `data:` ou `blob:`;
- deixa `next/image` tratar caminhos locais de `public/site.assets` nativamente;
- mantém o loader width-aware para URLs Supabase remotas.

## Paths Supabase/local auditados

| Seção | Asset lógico | Path local esperado | Bucket | Path Supabase esperado | Evidência local | Status externo |
| --- | --- | --- | --- | --- | --- | --- |
| ORIGEM | Imagem 1 | `/site.assets/about/origin/about.origin_image.1.webp` | `site-assets` | `about/origin/about.origin_image.1.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 2 | `/site.assets/about/origin/about.origin_image.2.webp` | `site-assets` | `about/origin/about.origin_image.2.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 3 | `/site.assets/about/origin/about.origin_image.3.webp` | `site-assets` | `about/origin/about.origin_image.3.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 4 | `/site.assets/about/origin/about.origin_image.4.webp` | `site-assets` | `about/origin/about.origin_image.4.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |

Observação: o ambiente não expôs Supabase MCP e o acesso HTTP direto ao domínio Supabase retornou bloqueio do túnel (`CONNECT tunnel failed, response 403`). A validação operacional confiável neste ambiente foi o mirror local versionado em `public/site.assets` e o export `src/config/site-assets.json`.

## Evidências de terminal

- `git show 43def5ca^:src/components/sobre/sections/AboutBeliefs.tsx` confirmou que o commit `43def5ca` removeu a montagem antiga do Ghost 3D.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` confirma que a versão final documentada remove Ghost 3D e GSAP da seção.
- `find public/site.assets/about/origin` confirmou os quatro `.webp` locais.
- `node` sobre `src/config/site-assets.json` confirmou os quatro registros `about.origin_image.{1..4}`.

## Evidências visuais

Validação visual automatizada via navegador não foi concluída neste ambiente antes deste registro. Checklist manual esperado em `pnpm dev`:

1. abrir `/sobre`;
2. navegar até ORIGEM e confirmar quatro imagens sem erro `next-image-missing-loader-width`;
3. navegar até “O que me move” e confirmar seção sem Canvas/WebGL/Ghost 3D animado;
4. confirmar frases centralizadas, background Ghost shade e frase final com `GHOST` em `#0048ff`.

## Validações executadas

- Inspeção de histórico Git para identificar remoção do Ghost 3D.
- Inspeção de `.context` para reconciliar intenção atual versus plano antigo.
- Inspeção de `next.config.mjs` para confirmar `remotePatterns` Supabase.
- Inspeção de `src/config/site-assets.json` e `public/site.assets/about/origin`.
- Correções programáticas em `src/config/site-assets.ts` e `DynamicAssetImage.tsx`.

## Validações finais executadas após a correção

>>>>>>> theirs
- `pnpm run lint` passou. O ambiente emitiu apenas warning de engine porque o projeto pede Node 22 e o container usa Node 20.20.2.
- `pnpm run typecheck` passou. Mesmo warning de engine do ambiente.
- `pnpm run build` passou. O build usou fallback quando Supabase ficou inacessível por rede (`ENETUNREACH`) e não falhou.
- `pnpm test` passou: 37 suites e 250 testes.
- `pnpm run dev` + `curl http://127.0.0.1:3000/sobre` retornou HTTP 200 e o log não apresentou `next-image-missing-loader-width`.
- Screenshot automatizado via Playwright foi tentado, mas Chromium não abriu por dependência nativa ausente no container (`libatk-1.0.so.0`).
<<<<<<< ours

## Riscos remanescentes

- Se o banco `site_assets` em produção ainda contiver keys divergentes, os fallbacks locais continuarão protegendo o layout, mas a origem remota deve ser reconciliada no Supabase Dashboard/MCP.
- O ambiente atual bloqueou auditoria HTTP real do Supabase; a verificação externa precisa ser repetida em rede sem proxy restritivo.
- `pnpm build` pode atualizar `public/build-info.json`, que já aparece como artefato gerado no workspace.

## Recomendação sobre blueprints

=======

```tsx
loader={shouldUseSupabaseLoader ? supabaseLoader : undefined}
```

Critério:

- usa `supabaseLoader` apenas quando `finalUrl` não é local (`/`), `data:` ou `blob:`;
- deixa `next/image` tratar caminhos locais de `public/site.assets` nativamente;
- mantém o loader width-aware para URLs Supabase remotas.

## Paths Supabase/local auditados

| Seção | Asset lógico | Path local esperado | Bucket | Path Supabase esperado | Evidência local | Status externo |
| --- | --- | --- | --- | --- | --- | --- |
| ORIGEM | Imagem 1 | `/site.assets/about/origin/about.origin_image.1.webp` | `site-assets` | `about/origin/about.origin_image.1.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 2 | `/site.assets/about/origin/about.origin_image.2.webp` | `site-assets` | `about/origin/about.origin_image.2.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 3 | `/site.assets/about/origin/about.origin_image.3.webp` | `site-assets` | `about/origin/about.origin_image.3.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 4 | `/site.assets/about/origin/about.origin_image.4.webp` | `site-assets` | `about/origin/about.origin_image.4.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |

Observação: o ambiente não expôs Supabase MCP e o acesso HTTP direto ao domínio Supabase retornou bloqueio do túnel (`CONNECT tunnel failed, response 403`). A validação operacional confiável neste ambiente foi o mirror local versionado em `public/site.assets` e o export `src/config/site-assets.json`.

## Evidências de terminal

- `git show 43def5ca^:src/components/sobre/sections/AboutBeliefs.tsx` confirmou que o commit `43def5ca` removeu a montagem antiga do Ghost 3D.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` confirma que a versão final documentada remove Ghost 3D e GSAP da seção.
- `find public/site.assets/about/origin` confirmou os quatro `.webp` locais.
- `node` sobre `src/config/site-assets.json` confirmou os quatro registros `about.origin_image.{1..4}`.

## Evidências visuais

Validação visual automatizada via navegador não foi concluída neste ambiente antes deste registro. Checklist manual esperado em `pnpm dev`:

1. abrir `/sobre`;
2. navegar até ORIGEM e confirmar quatro imagens sem erro `next-image-missing-loader-width`;
3. navegar até “O que me move” e confirmar seção sem Canvas/WebGL/Ghost 3D animado;
4. confirmar frases centralizadas, background Ghost shade e frase final com `GHOST` em `#0048ff`.

## Validações executadas

- Inspeção de histórico Git para identificar remoção do Ghost 3D.
- Inspeção de `.context` para reconciliar intenção atual versus plano antigo.
- Inspeção de `next.config.mjs` para confirmar `remotePatterns` Supabase.
- Inspeção de `src/config/site-assets.json` e `public/site.assets/about/origin`.
- Correções programáticas em `src/config/site-assets.ts` e `DynamicAssetImage.tsx`.

## Validações finais executadas após a correção

- `pnpm run lint` passou. O ambiente emitiu apenas warning de engine porque o projeto pede Node 22 e o container usa Node 20.20.2.
- `pnpm run typecheck` passou. Mesmo warning de engine do ambiente.
- `pnpm run build` passou. O build usou fallback quando Supabase ficou inacessível por rede (`ENETUNREACH`) e não falhou.
- `pnpm test` passou: 37 suites e 250 testes.
- `pnpm run dev` + `curl http://127.0.0.1:3000/sobre` retornou HTTP 200 e o log não apresentou `next-image-missing-loader-width`.
- Screenshot automatizado via Playwright foi tentado, mas Chromium não abriu por dependência nativa ausente no container (`libatk-1.0.so.0`).

## Riscos remanescentes

- Se o banco `site_assets` em produção ainda contiver keys divergentes, os fallbacks locais continuarão protegendo o layout, mas a origem remota deve ser reconciliada no Supabase Dashboard/MCP.
- O ambiente atual bloqueou auditoria HTTP real do Supabase; a verificação externa precisa ser repetida em rede sem proxy restritivo.
- `pnpm build` pode atualizar `public/build-info.json`, que já aparece como artefato gerado no workspace.

## Recomendação sobre blueprints

>>>>>>> theirs
=======

## O que foi preservado/restaurado

- A seção “O que me move” permanece alinhada à documentação final:
  - sem Ghost 3D renderizando;
  - sem Canvas/WebGL;
  - background CSS shade fixo;
  - seis frases centralizadas controladas por scroll;
  - frase final com `GHOST` em Ghost Blue `#0048ff`.
- A seção ORIGEM mantém o uso de `DynamicAssetImage`, mas com chaves corretas e sem loader custom em fallback local.

## Proteção do Ghost 3D

- Nenhum arquivo em `src/components/sobre/3d/*` foi removido.
- A seção `AboutBeliefs` não reintroduz `GhostScene`, respeitando a documentação final e a ressalva humana.
- WebGL permanece disponível no projeto para outros contextos, mas não participa de `06-O-QUE-ME-MOVE`.

## Correção do loader `next/image`

Estratégia aplicada:

```tsx
loader={shouldUseSupabaseLoader ? supabaseLoader : undefined}
```

Critério:

- usa `supabaseLoader` apenas quando `finalUrl` não é local (`/`), `data:` ou `blob:`;
- deixa `next/image` tratar caminhos locais de `public/site.assets` nativamente;
- mantém o loader width-aware para URLs Supabase remotas.

## Paths Supabase/local auditados

| Seção | Asset lógico | Path local esperado | Bucket | Path Supabase esperado | Evidência local | Status externo |
| --- | --- | --- | --- | --- | --- | --- |
| ORIGEM | Imagem 1 | `/site.assets/about/origin/about.origin_image.1.webp` | `site-assets` | `about/origin/about.origin_image.1.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 2 | `/site.assets/about/origin/about.origin_image.2.webp` | `site-assets` | `about/origin/about.origin_image.2.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 3 | `/site.assets/about/origin/about.origin_image.3.webp` | `site-assets` | `about/origin/about.origin_image.3.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 4 | `/site.assets/about/origin/about.origin_image.4.webp` | `site-assets` | `about/origin/about.origin_image.4.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |

Observação: o ambiente não expôs Supabase MCP e o acesso HTTP direto ao domínio Supabase retornou bloqueio do túnel (`CONNECT tunnel failed, response 403`). A validação operacional confiável neste ambiente foi o mirror local versionado em `public/site.assets` e o export `src/config/site-assets.json`.

## Evidências de terminal

- `git show 43def5ca^:src/components/sobre/sections/AboutBeliefs.tsx` confirmou que o commit `43def5ca` removeu a montagem antiga do Ghost 3D.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` confirma que a versão final documentada remove Ghost 3D e GSAP da seção.
- `find public/site.assets/about/origin` confirmou os quatro `.webp` locais.
- `node` sobre `src/config/site-assets.json` confirmou os quatro registros `about.origin_image.{1..4}`.

## Evidências visuais

Validação visual automatizada via navegador não foi concluída neste ambiente antes deste registro. Checklist manual esperado em `pnpm dev`:

1. abrir `/sobre`;
2. navegar até ORIGEM e confirmar quatro imagens sem erro `next-image-missing-loader-width`;
3. navegar até “O que me move” e confirmar seção sem Canvas/WebGL/Ghost 3D animado;
4. confirmar frases centralizadas, background Ghost shade e frase final com `GHOST` em `#0048ff`.

## Validações executadas

- Inspeção de histórico Git para identificar remoção do Ghost 3D.
- Inspeção de `.context` para reconciliar intenção atual versus plano antigo.
- Inspeção de `next.config.mjs` para confirmar `remotePatterns` Supabase.
- Inspeção de `src/config/site-assets.json` e `public/site.assets/about/origin`.
- Correções programáticas em `src/config/site-assets.ts` e `DynamicAssetImage.tsx`.

## Validações finais executadas após a correção

- `pnpm run lint` passou. O ambiente emitiu apenas warning de engine porque o projeto pede Node 22 e o container usa Node 20.20.2.
- `pnpm run typecheck` passou. Mesmo warning de engine do ambiente.
- `pnpm run build` passou. O build usou fallback quando Supabase ficou inacessível por rede (`ENETUNREACH`) e não falhou.
- `pnpm test` passou: 37 suites e 250 testes.
- `pnpm run dev` + `curl http://127.0.0.1:3000/sobre` retornou HTTP 200 e o log não apresentou `next-image-missing-loader-width`.
- Screenshot automatizado via Playwright foi tentado, mas Chromium não abriu por dependência nativa ausente no container (`libatk-1.0.so.0`).

## Riscos remanescentes

- Se o banco `site_assets` em produção ainda contiver keys divergentes, os fallbacks locais continuarão protegendo o layout, mas a origem remota deve ser reconciliada no Supabase Dashboard/MCP.
- O ambiente atual bloqueou auditoria HTTP real do Supabase; a verificação externa precisa ser repetida em rede sem proxy restritivo.
- `pnpm build` pode atualizar `public/build-info.json`, que já aparece como artefato gerado no workspace.

## Recomendação sobre blueprints

>>>>>>> theirs
=======
## Causa raiz

1. A documentação final de `06-O-QUE-ME-MOVE` substituiu o plano antigo com GSAP + Ghost 3D por uma seção editorial com background CSS fixo e frases centralizadas. Portanto, a reintrodução de animação Ghost 3D nessa seção foi explicitamente cancelada pela aprovação humana.
2. As imagens da seção ORIGEM usavam chaves de asset divergentes em `SITE_ASSET_KEYS.about.originImages` (`about.origin.about.origin_image.*`), enquanto a fonte exportada do projeto registra `about.origin_image.*`.
3. Quando a URL de fallback era local (`/site.assets/about/origin/...`), `DynamicAssetImage` ainda passava `supabaseLoader` para `next/image`. Para caminhos locais, o loader retornava a URL sem aplicar `width`, disparando `next-image-missing-loader-width`.

## Arquivos alterados

- `src/config/site-assets.ts`
  - Corrigidas as quatro chaves de `about.originImages` para os nomes reais registrados no export de assets.
- `src/components/ui/shared/DynamicAssetImage.tsx`
  - O loader Supabase agora só é aplicado para URLs remotas transformáveis.
  - Caminhos locais, `data:` e `blob:` usam o comportamento nativo do `next/image`, eliminando o contrato inválido de loader sem `width`.
- `docs/implementation_plan.md`
  - Registrada a ressalva humana pós-aprovação: sem animação Ghost 3D em `06-O-QUE-ME-MOVE`.
- `docs/task.md`
  - Atualizadas T10/T11 para refletir a decisão de não montar WebGL nessa seção.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
  - Atualizado este walkthrough com causa, decisões, validações e riscos.

## O que foi preservado/restaurado

- A seção “O que me move” permanece alinhada à documentação final:
  - sem Ghost 3D renderizando;
  - sem Canvas/WebGL;
  - background CSS shade fixo;
  - seis frases centralizadas controladas por scroll;
  - frase final com `GHOST` em Ghost Blue `#0048ff`.
- A seção ORIGEM mantém o uso de `DynamicAssetImage`, mas com chaves corretas e sem loader custom em fallback local.

## Proteção do Ghost 3D

- Nenhum arquivo em `src/components/sobre/3d/*` foi removido.
- A seção `AboutBeliefs` não reintroduz `GhostScene`, respeitando a documentação final e a ressalva humana.
- WebGL permanece disponível no projeto para outros contextos, mas não participa de `06-O-QUE-ME-MOVE`.

## Correção do loader `next/image`

Estratégia aplicada:

```tsx
loader={shouldUseSupabaseLoader ? supabaseLoader : undefined}
```

Critério:

- usa `supabaseLoader` apenas quando `finalUrl` não é local (`/`), `data:` ou `blob:`;
- deixa `next/image` tratar caminhos locais de `public/site.assets` nativamente;
- mantém o loader width-aware para URLs Supabase remotas.

## Paths Supabase/local auditados

| Seção | Asset lógico | Path local esperado | Bucket | Path Supabase esperado | Evidência local | Status externo |
| --- | --- | --- | --- | --- | --- | --- |
| ORIGEM | Imagem 1 | `/site.assets/about/origin/about.origin_image.1.webp` | `site-assets` | `about/origin/about.origin_image.1.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 2 | `/site.assets/about/origin/about.origin_image.2.webp` | `site-assets` | `about/origin/about.origin_image.2.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 3 | `/site.assets/about/origin/about.origin_image.3.webp` | `site-assets` | `about/origin/about.origin_image.3.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |
| ORIGEM | Imagem 4 | `/site.assets/about/origin/about.origin_image.4.webp` | `site-assets` | `about/origin/about.origin_image.4.webp` | existe em `public/site.assets` | bloqueado por proxy/envoy 403 |

Observação: o ambiente não expôs Supabase MCP e o acesso HTTP direto ao domínio Supabase retornou bloqueio do túnel (`CONNECT tunnel failed, response 403`). A validação operacional confiável neste ambiente foi o mirror local versionado em `public/site.assets` e o export `src/config/site-assets.json`.

## Evidências de terminal

- `git show 43def5ca^:src/components/sobre/sections/AboutBeliefs.tsx` confirmou que o commit `43def5ca` removeu a montagem antiga do Ghost 3D.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` confirma que a versão final documentada remove Ghost 3D e GSAP da seção.
- `find public/site.assets/about/origin` confirmou os quatro `.webp` locais.
- `node` sobre `src/config/site-assets.json` confirmou os quatro registros `about.origin_image.{1..4}`.

## Evidências visuais

Validação visual automatizada via navegador não foi concluída neste ambiente antes deste registro. Checklist manual esperado em `pnpm dev`:

1. abrir `/sobre`;
2. navegar até ORIGEM e confirmar quatro imagens sem erro `next-image-missing-loader-width`;
3. navegar até “O que me move” e confirmar seção sem Canvas/WebGL/Ghost 3D animado;
4. confirmar frases centralizadas, background Ghost shade e frase final com `GHOST` em `#0048ff`.

## Validações executadas

- Inspeção de histórico Git para identificar remoção do Ghost 3D.
- Inspeção de `.context` para reconciliar intenção atual versus plano antigo.
- Inspeção de `next.config.mjs` para confirmar `remotePatterns` Supabase.
- Inspeção de `src/config/site-assets.json` e `public/site.assets/about/origin`.
- Correções programáticas em `src/config/site-assets.ts` e `DynamicAssetImage.tsx`.

## Validações finais executadas após a correção

- `pnpm run lint` passou. O ambiente emitiu apenas warning de engine porque o projeto pede Node 22 e o container usa Node 20.20.2.
- `pnpm run typecheck` passou. Mesmo warning de engine do ambiente.
- `pnpm run build` passou. O build usou fallback quando Supabase ficou inacessível por rede (`ENETUNREACH`) e não falhou.
- `pnpm test` passou: 37 suites e 250 testes.
- `pnpm run dev` + `curl http://127.0.0.1:3000/sobre` retornou HTTP 200 e o log não apresentou `next-image-missing-loader-width`.
- Screenshot automatizado via Playwright foi tentado, mas Chromium não abriu por dependência nativa ausente no container (`libatk-1.0.so.0`).

## Riscos remanescentes

- Se o banco `site_assets` em produção ainda contiver keys divergentes, os fallbacks locais continuarão protegendo o layout, mas a origem remota deve ser reconciliada no Supabase Dashboard/MCP.
- O ambiente atual bloqueou auditoria HTTP real do Supabase; a verificação externa precisa ser repetida em rede sem proxy restritivo.
- `pnpm build` pode atualizar `public/build-info.json`, que já aparece como artefato gerado no workspace.

## Recomendação sobre blueprints

>>>>>>> theirs
=======

## Riscos remanescentes

- Se o banco `site_assets` em produção ainda contiver keys divergentes, os fallbacks locais continuarão protegendo o layout, mas a origem remota deve ser reconciliada no Supabase Dashboard/MCP.
- O ambiente atual bloqueou auditoria HTTP real do Supabase; a verificação externa precisa ser repetida em rede sem proxy restritivo.
- `pnpm build` pode atualizar `public/build-info.json`, que já aparece como artefato gerado no workspace.

## Recomendação sobre blueprints

>>>>>>> theirs
Manter `06-O-QUE-ME-MOVE-FINAL.md` como fonte de verdade atual. Qualquer retorno de Ghost 3D nessa seção deve exigir novo blueprint e aprovação explícita, porque conflita com a documentação final aprovada.
