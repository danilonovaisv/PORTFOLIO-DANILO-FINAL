# Walkthrough — 06-O-QUE-ME-MOVE + Origin Images Regression

> Data: 2026-05-18  
> Escopo: preservar a seção “O que me move” conforme documentação final sem animação Ghost 3D e corrigir regressão de imagens da seção ORIGEM.

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

Manter `06-O-QUE-ME-MOVE-FINAL.md` como fonte de verdade atual. Qualquer retorno de Ghost 3D nessa seção deve exigir novo blueprint e aprovação explícita, porque conflita com a documentação final aprovada.
