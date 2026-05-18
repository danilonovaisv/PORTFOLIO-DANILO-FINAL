# implementation_plan.md

## 1) Resumo executivo
Plano de restauração de regressão da rota `/sobre` com foco em: (a) recuperar a intenção visual da seção **“O que me move”**, (b) reintroduzir com segurança o bloco 3D Ghost/WebGL no client boundary, (c) corrigir erro `next-image-missing-loader-width`, e (d) reconciliar paths `site.assets` vs `site-assets` entre código, assets locais e Supabase.

## 2) Causa provável da regressão
- Regressão funcional/visual introduzida em alterações recentes na família de componentes da seção Beliefs (`AboutBeliefs*`), com potencial remoção/substituição de composição 3D por estrutura textual.
- Erro de `next/image` indica uso de `loader` custom sem contrato completo (`width` ausente no retorno URL).
- Paths locais com prefixo `/site.assets/...` coexistem com nomenclatura de bucket `site-assets`, elevando risco de resolução inconsistente.

## 3) Diferença entre estado esperado e estado atual
**Esperado:** seção com camadas Ghost (atmosfera + profundidade + texto), presença 3D não bloqueante, fallback seguro, imagens ORIGEM estáveis.
**Atual:** relato de perda do 3D Ghost, seção textualizada, warnings de `next/image` e suspeita de path inconsistente.

## 4) Mapa da seção “O que me move”
- Entrada da seção na rota: `src/app/sobre/page.tsx` (`AboutBeliefs` dentro de `SectionErrorBoundary`).
- Pontos de inspeção: `src/components/sobre/sections` e subcomponentes Beliefs (background/overlay/manifesto/scroll/canvas/fallback).
- Dependências: motion tokens, z-index tokens, hooks de viewport/motion gate.

## 5) Mapa dos componentes 3D Ghost
- Assets locais detectados: `public/models/ghost.glb`, `public/models/ghost-transformed.glb`, `public/site.assets/3d/ghost-v1.glb`, fallbacks jpg/png.
- Alvos de inspeção: componentes com `Canvas`, R3F, Drei, loaders GLTF e qualquer `dynamic(..., { ssr:false })`.
- Verificar acoplamento com desempenho (IntersectionObserver, invalidation RAF, lazy mount).

## 6) Diagnóstico do erro `next-image-missing-loader-width`
Hipótese primária: `Image` com `loader` custom retorna URL sem parâmetro de largura. Em Next 16, loader deve receber `{ src, width, quality }` e produzir URL width-aware.

## 7) Diagnóstico do warning DEP0205
Classificado como secundário (conforme incidente). Tratar apenas como backlog técnico; não bloqueia a restauração visual/funcional da seção.

## 8) Auditoria Supabase Storage via MCP
Escopo planejado:
- Bucket `site-assets`
- Objetos `about/origin/about.origin_image.{1..4}.webp`
- URL pública `storage/v1/object/public/...`
- URL transform `storage/v1/render/image/public/...`
- ACL pública, MIME, cache-control, CORS e status HTTP.

## 9) Auditoria paths `site.assets` vs `site-assets`
- Validar se `/site.assets/...` é caminho **local em `/public`** (válido para Next static).
- Validar se `site-assets/...` é **bucket Supabase** (válido para URL remota pública).
- Eliminar ambiguidade na fonte de verdade de cada seção da `/sobre`.

## 10) Auditoria de `next.config.*`
- Confirmar `images.remotePatterns`/`images.domains` para host Supabase efetivo.
- Confirmar compatibilidade Firebase Hosting + Next image optimizer.
- Garantir CSP `img-src`/`media-src` com host Supabase e assets usados.

## 11) Estratégia de restauração visual
1. Identificar commit/alteração que removeu/degradou o Ghost 3D.
2. Recuperar componente original (ou equivalente já existente) sem redesign.
3. Reaplicar layering/z-index/tokens Ghost conforme documentação de Sobre.
4. Garantir animações permitidas (opacity/blur/translateY) com easing obrigatório.

## 12) Estratégia de correção das imagens
- Se origem for local (`public/site.assets/...`): remover loader custom na seção ORIGEM e usar `src` local puro.
- Se origem for Supabase: usar URL pública + `remotePatterns` ou loader Supabase correto com `width` e `quality`.
- Proibir probing runtime de extensões.

## 13) Estratégia de fallback WebGL
- Boundary client-only para Canvas (`dynamic import` com `ssr:false` quando necessário).
- Fallback estático leve (imagem/gradiente) mantendo composição e acessibilidade.
- Não bloquear FCP: lazy mount + viewport gate.

## 14) Arquivos candidatos afetados
- `src/app/sobre/page.tsx`
- `src/components/sobre/**` (especialmente seção Beliefs e seção Origin)
- `src/lib/supabase/image-loader.mjs` e utilitários de URL
- `src/config/site-assets.*` / `src/lib/supabase/site-assets*`
- `next.config.mjs`
- `.context/DOCS-PORTFOLIO-PAGES/**` (sincronização de estado, se alteração em `src/` ocorrer)

## 15) Riscos
- Reintrodução de WebGL impactar LCP/FCP em devices fracos.
- Corrigir loader sem alinhar origem real dos assets pode mascarar 404.
- Divergência entre docs e código real de produção.

## 16) Rollback
- Estratégia Git: rollback do conjunto de commits da seção Beliefs/Origin para último estado estável.
- Toggle por feature flag local de renderização Ghost (se já existir no código) para desativação emergencial.

## 17) Validações
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm dev`
- Abrir `/sobre` e validar: ausência de `next-image-missing-loader-width`, presença do Ghost 3D/fallback, imagens ORIGEM carregando, sem 404/403 críticos.

## 18) Definition of Done
Conforme gate do incidente: seção restaurada visualmente, Ghost 3D presente/seguro, erro de loader eliminado, paths reconciliados, auditoria Supabase concluída e evidências registradas em `walkthrough.md`.

---

## Observações de pesquisa e limitações
- **Repositório local foi auditado** para estrutura, assets, configs e rota `/sobre`.
- **Vector Store `vs_69520b1fb834819197e445db9aab8d69` não está disponível neste ambiente** via ferramenta exposta; será tratado como bloqueio parcial até conector ser disponibilizado.
- **Consulta Context7/Supabase MCP**: planejada na fase de execução após aprovação humana.

## Atualização pós-aprovação — ressalva humana (2026-05-18)

A aprovação humana alterou o escopo visual da seção `06-O-QUE-ME-MOVE`: a seção **não deve mais usar animação com Ghost 3D**, porque a documentação final de `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md` substitui o plano antigo de GSAP + WebGL por uma composição editorial minimalista com CSS shade fixo e frases centralizadas.

Decisão operacional:
- Manter `src/components/sobre/sections/AboutBeliefs.tsx` no modelo documentado atual: sem `GhostScene`, sem `Canvas`, sem GSAP e sem WebGL nessa seção.
- Preservar os componentes `src/components/sobre/3d/*` sem reintroduzi-los em `AboutBeliefs`, para uso futuro em outras áreas se necessário.
- Focar a execução aprovada na correção real da regressão de imagens ORIGEM: keys de assets divergentes e `next/image` recebendo loader custom para caminho local `/site.assets/...`.

