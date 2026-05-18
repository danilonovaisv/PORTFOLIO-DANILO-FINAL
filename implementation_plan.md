# Correção `/sobre`: Origem, Texto Híbrido, Headings

## 1. Resumo executivo

Corrigir 3 bugs na rota `/sobre` com mudança mínima e reversível:

- As 4 imagens da seção “ORIGEM” devem carregar de forma determinística.
- A string híbrida `Design with propósito, não só beleza` deve virar `Design com propósito, não só beleza` na fonte de verdade.
- Headings duplicados devem manter visual intacto, mas expor apenas uma representação semântica por título.

A execução não altera bucket, permissões Supabase, Firebase Hosting, deploy, dependências ou arquitetura global.

## 2. Escopo e não escopo

Escopo:

- Ajustar resolução/fallback das imagens da seção “ORIGEM”.
- Alinhar asset keys usadas por `AboutOrigin` e `DynamicAssetImage`.
- Corrigir texto híbrido em `ABOUT_CONTENT`.
- Corrigir clones visuais de headings com semântica acessível.
- Gerar `walkthrough.md` após validação.
- Verificar se `.context/DOCS-PORTFOLIO-PAGES` precisa update.

Não escopo:

- Alterar política ou visibilidade do bucket `site-assets`.
- Usar `SUPABASE_SERVICE_ROLE_KEY` no browser.
- Trocar loader global do Next.js.
- Alterar Firebase Hosting, headers, adapters ou deploy.
- Reescrever componentes inteiros.
- Introduzir dependência nova.

## 3. Mapa dos arquivos analisados

- `AGENTS.md`: regras do projeto, pnpm, Ghost System, SSOT e validação.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/03-ORIGEM-CRIATIVA/03-ORIGEM-CRIATIVA.md`: contrato local da seção Origem.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`: referência de conteúdo, assets e texto correto do Processo Criativo.
- `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/assets-site.json`: inventário local dos assets `about.origin.about.origin_image.N`.
- `.context/GHOST-DESIGN-SYSTEM.md`: tokens, easing e restrições visuais.
- `src/config/content.ts`: fonte do texto híbrido e conteúdo antigo da Origem.
- `src/config/site-assets.ts`: keys públicas dos assets da seção Origem.
- `src/config/site-assets.json`: snapshot local de asset records.
- `src/components/sobre/sections/AboutOrigin.tsx`: monta URLs e injeta imagens na seção Origem.
- `src/components/sobre/origin/data.ts`: fonte atual dos blocos da seção Origem.
- `src/components/sobre/origin/OriginComponents.tsx`: renderiza headings mobile/desktop e imagens.
- `src/components/ui/shared/DynamicAssetImage.tsx`: renderiza `next/image` com `supabaseLoader`.
- `src/contexts/site-assets.tsx`: resolve assets do provider e fallbacks locais.
- `src/lib/supabase/urls.ts`: normaliza caminhos e constrói URLs Supabase.
- `src/lib/utils.ts`: loader e fallback local `/site.assets`.
- `next.config.mjs`: `images.remotePatterns` para `/object/public` e `/render/image/public`.
- `firebase.json`: Hosting sem necessidade de alteração para esta correção.
- `public/site.assets/about/origin/*.webp`: fallback local existente das 4 imagens.

## 4. Diagnóstico por erro

### 4.1 Imagens quebradas em “ORIGEM”

As imagens são declaradas em dois lugares:

- `src/components/sobre/origin/data.ts` declara `fallback` e `assetKey`.
- `src/config/site-assets.ts` declara `SITE_ASSET_KEYS.about.originImages`.

O componente renderizador é:

- `src/components/sobre/sections/AboutOrigin.tsx`, que chama `useSiteAssetUrl(...)`.
- `src/components/sobre/origin/OriginComponents.tsx`, que passa `assetKey`, `fallbackUrl` e `sizes` para `DynamicAssetImage`.

Problema principal:

- `ORIGIN_CONTENT.assetKey` usa `about.origin_image.N`.
- `SITE_ASSET_KEYS.about.originImages` usa `about.origin.about.origin_image.N`.
- Inventários locais mostram ambos os formatos em lugares diferentes, mas `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/assets-site.json` usa `about.origin.about.origin_image.N`.
- `AboutOrigin.tsx` constrói fallback com `buildSupabaseStorageUrl`, gerando URL remota Supabase.
- `useSiteAssetUrl` retorna fallback HTTP como está, sem converter para `/site.assets`.
- `buildSupabaseStorageUrl` chama `debugUrl`, gerando logs `[SupabaseURL] checking:` em development.

Arquivos existem localmente:

- `public/site.assets/about/origin/about.origin_image.1.webp`
- `public/site.assets/about/origin/about.origin_image.2.webp`
- `public/site.assets/about/origin/about.origin_image.3.webp`
- `public/site.assets/about/origin/about.origin_image.4.webp`

Config Next.js:

- `next.config.mjs` já permite `umkmwbkwvulxtdodzmzf.supabase.co`.
- Paths remotos permitidos incluem `/storage/v1/object/public/**` e `/storage/v1/render/image/public/**`.

### 4.2 Texto híbrido

Origem confirmada:

- `src/config/content.ts`
- `ABOUT_CONTENT.method.steps[2].text`
- Valor atual: `Design with propósito, não só beleza`
- Valor correto: `Design com propósito, não só beleza`

### 4.3 Headings duplicados

Origem confirmada:

- `src/components/sobre/origin/OriginComponents.tsx`

Duplicação:

- Mobile renderiza `m.h2`.
- Desktop renderiza `h2 data-origin-title`.
- CSS esconde por breakpoint, mas DOM mantém duas headings por bloco.

Solução:

- Manter desktop como heading semântico.
- Trocar heading mobile visual para elemento não-heading com `aria-hidden="true"`.
- Não adicionar `aria-hidden` em elemento focável nem ancestral de foco.

`contato` ainda deve ser auditado na execução. Fontes prováveis:

- `src/config/content.ts`
- `src/config/navigation.ts`
- componentes de header/footer/contact.

## 5. Hipóteses validadas e descartadas

Validadas:

- Assets locais existem em `public/site.assets/about/origin/`.
- `next.config.mjs` já cobre host Supabase e endpoints object/render.
- Texto híbrido está em constante TypeScript.
- Headings Origem duplicam por render mobile + desktop.
- Bucket `site-assets` é documentado como público em `supabase/schemas/02_security.sql` e migrations locais.

Descartadas por enquanto:

- Necessidade de nova dependência.
- Necessidade de alterar Firebase Hosting.
- Necessidade de service role key no browser.
- Necessidade de mudar política do bucket.
- Necessidade de trocar todo `DynamicAssetImage`.

Ainda a validar após aprovação:

- Se as URLs Supabase remotas retornam `200` em Network.
- Se o provider `/api/site-assets` entrega keys com prefixo `about.origin.about.origin_image.N`.
- Se existe duplicação real de heading `contato` na página `/sobre`.

## 6. Decisão arquitetural recomendada

Aplicar correção local, pequena e determinística:

- Usar `/site.assets/about/origin/about.origin_image.N.webp` como fallback local de Origem.
- Alinhar `ORIGIN_CONTENT.assetKey` ao formato `SITE_ASSET_KEYS.about.originImages`.
- Remover construção de fallback remoto em `AboutOrigin.tsx`.
- Corrigir apenas a constante de conteúdo.
- Transformar headings mobile duplicados em texto visual não semântico.

Motivo:

- Reduz dependência de rede para fallback.
- Evita loop/log excessivo.
- Preserva realtime asset override quando provider Supabase tiver public URL válida.
- Não mexe em bucket, permissões, deploy ou config global.

## 7. Estratégia Supabase Storage

Manter Supabase como fonte remota quando `SiteAssetsProvider` entregar asset válido.

Fallback local:

- Se provider falhar, usar `/site.assets/about/origin/about.origin_image.N.webp`.
- Não chamar `buildSupabaseStorageUrl` para fallback de Origem.

Política documentada:

- URLs públicas sem transform devem usar `/storage/v1/object/public/site-assets/...`.
- URLs transformadas podem usar `/storage/v1/render/image/public/site-assets/...` quando há parâmetros de transformação e plano suporta Image Transformations.
- Não alterar permissões do bucket.
- Não usar signed URL para assets públicos da página.
- Não expor secrets.

## 8. Estratégia Next.js image rendering

Manter `DynamicAssetImage` com `next/image` e `supabaseLoader`.

Com fallback local:

- `src` local `/site.assets/...` passa pelo loader e retorna local sem Supabase.
- `remotePatterns` continua cobrindo Supabase para public URLs reais.
- `sizes` existentes permanecem.
- `priority` existente permanece.

Não alterar:

- `next.config.mjs`
- loader global
- Firebase image optimization

## 9. Estratégia de acessibilidade e SEO

Origem:

- Desktop `h2 data-origin-title` fica único heading semântico por bloco.
- Mobile clone visual vira `m.div` ou `m.span` com `aria-hidden="true"`.
- Clone visual não terá `tabIndex`, links, botões, inputs ou elementos focáveis.

Contato:

- Auditar DOM real antes de alterar.
- Se duplicação vier de clone visual, aplicar `aria-hidden="true"` no clone visual.
- Se duplicação vier de navegação/header/footer, não esconder links ou ancestrais interativos.

Regra:

- `aria-hidden="true"` nunca em elemento focável.
- `aria-hidden="true"` nunca em ancestral de elemento focável.
- Não esconder conteúdo único.
- Preservar ordem lógica de headings.

## 10. Estratégia de correção de conteúdo

Editar somente:

- `src/config/content.ts`

Substituição:

- De: `Design with propósito, não só beleza`
- Para: `Design com propósito, não só beleza`

Não duplicar o texto em componente, JSON ou docs de runtime.

## 11. Riscos e mitigação

- Risco: provider remoto pode entregar public URL inválida e sobrepor fallback local.
  - Mitigação: validar Network; se necessário, limitar fallback determinístico no `DynamicAssetImage` com onError em tarefa separada.

- Risco: mudar assetKey quebra realtime asset lookup.
  - Mitigação: usar o mesmo formato de `SITE_ASSET_KEYS.about.originImages` e inventário `.context`.

- Risco: trocar mobile heading para `div` altera CSS default.
  - Mitigação: manter mesmas classes visuais.

- Risco: heading `contato` duplicado pode estar em navegação.
  - Mitigação: auditar DOM antes de aplicar `aria-hidden`; não esconder links.

- Risco: build pode falhar por problemas pré-existentes.
  - Mitigação: registrar output e separar regressão de baseline em `walkthrough.md`.

## 12. Rollback

Rollback por arquivos:

- Reverter alterações em `src/components/sobre/sections/AboutOrigin.tsx`.
- Reverter alterações em `src/components/sobre/origin/data.ts`.
- Reverter alterações em `src/components/sobre/origin/OriginComponents.tsx`.
- Reverter alteração em `src/config/content.ts`.
- Remover `walkthrough.md` se criado nesta execução.

Sem rollback Supabase/Firebase porque não haverá mudança externa.

## 13. Plano de validação

Executar após aprovação e implementação:

- `pnpm lint`
- `pnpm run typecheck`
- `pnpm build`
- Teste local `/sobre` desktop.
- Teste local `/sobre` mobile.
- Inspeção de Console: confirmar ausência de loop excessivo `[SupabaseURL] checking:`.
- Inspeção Network: confirmar 4 imagens Origem `200`.
- Inspeção DOM: confirmar headings alvo com representação semântica única.
- Inspeção accessibility tree quando possível.
- Verificar se `.context/DOCS-PORTFOLIO-PAGES` precisa update.

## 14. Definition of Done

- 4 imagens da seção “ORIGEM” carregam corretamente.
- Não há loop excessivo de `[SupabaseURL] checking:`.
- Política Supabase path documentada em `walkthrough.md`.
- String `Design with propósito` não existe mais no código fonte.
- Página exibe `Design com propósito, não só beleza`.
- Cada heading investigado tem única representação semântica.
- Clones visuais estão com `aria-hidden="true"`.
- Nenhum foco interativo fica dentro de árvore `aria-hidden`.
- Visual Ghost Design permanece intacto.
- Motion permanece em opacity, blur, translateY; sem scale, rotate, bounce adicionados.
- `pnpm lint`, `pnpm run typecheck` e `pnpm build` passam ou limitações ficam documentadas.
- `walkthrough.md` lista arquivos alterados, evidências e riscos remanescentes.
- `.context/DOCS-PORTFOLIO-PAGES` foi verificado para necessidade de update.

## 15. Evidências esperadas no `walkthrough.md`

`walkthrough.md` deve conter:

- Arquivos alterados.
- Antes/depois das URLs das 4 imagens.
- Resultado de Network para cada imagem.
- Resultado de busca por `Design with propósito`.
- Resultado de DOM/a11y para headings Origem.
- Resultado da auditoria de `contato`.
- Resultado de `pnpm lint`.
- Resultado de `pnpm run typecheck`.
- Resultado de `pnpm build`.
- Screenshots ou evidência textual da seção “ORIGEM”.
- Nota sobre `.context/DOCS-PORTFOLIO-PAGES`.
- Riscos remanescentes.
