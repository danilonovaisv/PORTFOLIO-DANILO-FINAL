# Task Plan: Correção `/sobre`

## T01

- ID: T01
- Título: Localizar fonte da rota `/sobre`
- Objetivo: Confirmar arquivos da rota e cadeia de componentes antes de editar.
- Arquivos prováveis: `src/app/sobre/page.tsx`, `src/components/sobre/sections/*`, `src/config/content.ts`
- Pré-condições: Repositório em `/Users/danilonovais/PORTFOLIO-DANILO-FINAL`.
- Passos: localizar `src/app/sobre/page.tsx`; mapear imports de seções; confirmar que `AboutOrigin`, `AboutMethod` e seção de contato aparecem na árvore.
- Validação: rota `/sobre` mapeada com componentes responsáveis.
- Critério de aceite: lista clara de componentes de `/sobre` antes de qualquer edição.
- Risco: editar componente errado se a rota usar wrapper ou lazy import.

## T02

- ID: T02
- Título: Localizar seção “ORIGEM”
- Objetivo: Confirmar fonte dos blocos, imagem e render.
- Arquivos prováveis: `src/components/sobre/sections/AboutOrigin.tsx`, `src/components/sobre/origin/data.ts`, `src/components/sobre/origin/OriginComponents.tsx`
- Pré-condições: T01 concluída.
- Passos: ler `AboutOrigin.tsx`; ler `data.ts`; ler `OriginComponents.tsx`; confirmar `ORIGIN_CONTENT`, `SITE_ASSET_KEYS.about.originImages`, `DynamicAssetImage`.
- Validação: origem de `title`, `fallback`, `assetKey`, `fallbackUrl` e `sizes` documentada.
- Critério de aceite: caminho de render da imagem está rastreado de data até `<Image>`.
- Risco: provider realtime sobrescrever fallback e mascarar bug.

## T03

- ID: T03
- Título: Auditar helpers Supabase
- Objetivo: Confirmar comportamento de construção de URL e logs.
- Arquivos prováveis: `src/lib/supabase/urls.ts`, `src/lib/utils.ts`, `src/contexts/site-assets.tsx`, `src/components/ui/shared/DynamicAssetImage.tsx`
- Pré-condições: T02 concluída.
- Passos: revisar `buildSupabaseStorageUrl`; revisar `debugUrl`; revisar `supabaseLoader`; revisar `useSiteAssetUrl`; confirmar tratamento de `/site.assets`.
- Validação: decisão documentada sobre evitar fallback remoto em Origem.
- Critério de aceite: causa do loop `[SupabaseURL] checking:` associada a construção de fallback remoto.
- Risco: remover logs globais em vez de resolver fallback determinístico.

## T04

- ID: T04
- Título: Validar política de URL e bucket
- Objetivo: Documentar política Supabase sem alterar permissões.
- Arquivos prováveis: `next.config.mjs`, `supabase/schemas/02_security.sql`, `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/assets-site.json`
- Pré-condições: T03 concluída.
- Passos: confirmar bucket `site-assets` público nas schemas/migrations locais; confirmar `object/public` e `render/image/public` em `next.config.mjs`; confirmar assets no inventário.
- Validação: decisão registrada em `walkthrough.md` após implementação.
- Critério de aceite: nenhuma alteração de bucket/policy planejada ou feita.
- Risco: confundir erro de path com problema de permissão.

## T05

- ID: T05
- Título: Corrigir assets ou caminho de assets
- Objetivo: Tornar imagens Origem determinísticas e reduzir fallback ruidoso.
- Arquivos prováveis: `src/components/sobre/sections/AboutOrigin.tsx`, `src/components/sobre/origin/data.ts`
- Pré-condições: T01-T04 concluídas.
- Passos: substituir fallback remoto por `/site.assets/about/origin/about.origin_image.N.webp`; alinhar `ORIGIN_CONTENT.assetKey` ao formato `about.origin.about.origin_image.N`; manter `SITE_ASSET_KEYS.about.originImages` como SSOT para provider.
- Validação: buscar `[SupabaseURL] checking:` durante render local; verificar Network para 4 imagens.
- Critério de aceite: 4 imagens carregam `200` por path local ou Supabase determinístico.
- Risco: public URL inválida do provider remoto ainda pode sobrescrever fallback local.

## T06

- ID: T06
- Título: Corrigir texto híbrido
- Objetivo: Trocar string incorreta na fonte de verdade.
- Arquivos prováveis: `src/config/content.ts`
- Pré-condições: T01 concluída.
- Passos: substituir `Design with propósito, não só beleza` por `Design com propósito, não só beleza`; rodar busca textual para garantir ausência da string antiga fora de docs de auditoria.
- Validação: `/sobre` mostra texto correto; `rg "Design with propósito" src` não encontra ocorrência.
- Critério de aceite: string antiga não existe em runtime source.
- Risco: docs históricas ainda conterem string antiga; não confundir com source runtime.

## T07

- ID: T07
- Título: Auditar headings duplicados
- Objetivo: Confirmar duplicações semânticas antes de aplicar `aria-hidden`.
- Arquivos prováveis: `src/components/sobre/origin/OriginComponents.tsx`, `src/config/content.ts`, `src/config/navigation.ts`, componentes de header/footer/contact
- Pré-condições: T01-T02 concluídas.
- Passos: inspecionar `h1-h6` na árvore `/sobre`; identificar duplicatas de `O QUE PERMANECE`, `DO TRAÇO À INTENÇÃO`, `A DESCOBERTA DO INVISÍVEL`, `EXPANSÃO COM PROPÓSITO`, `contato`; separar clones visuais de navegação/conteúdo único.
- Validação: lista de duplicatas com origem por arquivo.
- Critério de aceite: não aplicar `aria-hidden` em navegação ou link.
- Risco: esconder conteúdo único ou interativo.

## T08

- ID: T08
- Título: Aplicar solução semântica para clones visuais
- Objetivo: Preservar visual e remover duplicação semântica.
- Arquivos prováveis: `src/components/sobre/origin/OriginComponents.tsx`
- Pré-condições: T07 concluída.
- Passos: manter desktop `h2 data-origin-title`; trocar mobile `m.h2` por `m.div` ou `m.span`; adicionar `aria-hidden="true"` no clone visual; manter classes e motion permitida.
- Validação: DOM contém só 1 heading semântico por título Origem.
- Critério de aceite: visual mobile permanece; accessibility tree não expõe clone visual.
- Risco: alterar espaçamento por troca de elemento.

## T09

- ID: T09
- Título: Validar console
- Objetivo: Confirmar fim do ruído excessivo de URL.
- Arquivos prováveis: `src/lib/supabase/urls.ts`, `src/components/sobre/sections/AboutOrigin.tsx`
- Pré-condições: T05 concluída; app local rodando.
- Passos: abrir `/sobre`; recarregar; observar console; contar logs `[SupabaseURL] checking:`.
- Validação: sem loop repetitivo de checks para as 4 imagens Origem.
- Critério de aceite: logs inexistentes ou limitados a chamadas esperadas, sem repetição contínua.
- Risco: logs vindos de outros assets mascararem resultado.

## T10

- ID: T10
- Título: Validar DOM e accessibility tree
- Objetivo: Provar headings e `aria-hidden` corretos.
- Arquivos prováveis: `src/components/sobre/origin/OriginComponents.tsx`, componentes de contato se aplicável
- Pré-condições: T08 concluída; app local rodando.
- Passos: inspecionar DOM; verificar `h1-h6`; verificar `[aria-hidden="true"]`; confirmar ausência de `a`, `button`, `input`, `select`, `textarea`, `[tabindex]` dentro de clones escondidos.
- Validação: DOM e accessibility tree sem duplicata semântica indevida.
- Critério de aceite: nenhum foco interativo dentro de árvore `aria-hidden`.
- Risco: ferramenta de accessibility tree indisponível; registrar alternativa textual.

## T11

- ID: T11
- Título: Validar build
- Objetivo: Confirmar que mudanças não quebram pipeline local.
- Arquivos prováveis: `package.json`, arquivos alterados
- Pré-condições: T05, T06 e T08 concluídas.
- Passos: executar `pnpm lint`; executar `pnpm run typecheck`; executar `pnpm build`; ler outputs.
- Validação: comandos passam ou falhas pré-existentes ficam documentadas.
- Critério de aceite: PASS confirmado ou limitação documentada com erro real.
- Risco: build falhar por problema fora do escopo.

## T12

- ID: T12
- Título: Gerar `walkthrough.md`
- Objetivo: Registrar evidências finais e riscos.
- Arquivos prováveis: `walkthrough.md`, `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/03-ORIGEM-CRIATIVA/03-ORIGEM-CRIATIVA.md` se update for necessário
- Pré-condições: T09-T11 concluídas.
- Passos: listar arquivos alterados; registrar URLs finais das imagens; registrar console/network; registrar DOM/a11y; registrar lint/typecheck/build; registrar decisão sobre `.context/DOCS-PORTFOLIO-PAGES`.
- Validação: `walkthrough.md` cobre Definition of Done.
- Critério de aceite: handoff completo com evidências e riscos remanescentes.
- Risco: documentar sucesso sem evidência real; proibido.
