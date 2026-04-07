# 07-LANDING-PAGES

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/landing-pages/page.tsx`
- `src/app/admin/(protected)/landing-pages/new/page.tsx`
- `src/app/admin/(protected)/landing-pages/[id]/page.tsx`
- `src/app/admin/(protected)/landing-pages/actions.ts`
- `src/components/admin/LandingPageForm.tsx`

## 1. Objetivo da sessão

Gerenciar páginas detalhadas de projetos (`/projects/[slug]`) com templates versionados.

## 2. Funcionalidades

- listagem com identificação de template (Legacy, V1, V2, V3).
- CRUD completo com validação `zod`.
- links rápidos para página pública.

## 3. Integração

- tabela `landing_pages`.
- revalidação de `/admin/landing-pages` e `/portfolio`.

## 4. Inconformidades observadas

- Inconformidade baixa: reforçar validação de estrutura do campo `content` por template para evitar payload híbrido inválido.

## 5. Atualização 2026-02-20

- `save/delete` em `landing_pages` agora exigem `service_role` para evitar `new row violates row-level security policy`.
- Uploads de assets da landing page passaram a usar endpoint server-side do admin (`/api/admin/storage/upload`).
- Criado script SQL de manutenção para claim admin e limpeza de objetos órfãos: `supabase/sql/2026-02-20_admin_claim_and_cached_egress_cleanup.sql`.

## 6. Atualização de estado — 2026-03-08

- O editor V3 passou a aceitar `YouTube` como tipo explícito de mídia em blocos dinâmicos, preservando `mediaType = youtube` no roundtrip do formulário.
- A serialização do Template V3 continua saneando `media/media2/poster`, mas agora não força URL de YouTube a cair no fluxo de imagem comum.
- O CTA de retorno das landings foi reduzido para `voltar` e duplicado no fechamento dos templates (`legacy`, `master`, `master-v2`, `master-v3`) com variante compacta.
- `LiquidEther` teve o auto motion desacelerado (`autoSpeed` menor) e takeover mais curto para responder mais rápido a mouse/touch sem competir com o conteúdo.
- **Correção Template V3 Markdown & YouTube:** Foi substituído o uso de `splitLines` por `splitBlocks` (`\n\n`) nos campos de intro para preservar quebras de linha e estrutura do Markdown. Atualizamos também o `parsePortfolioBodyBlocks` (`[slug]/page.tsx`) com um parser resiliente para interagir com blocos de forma mais autônoma. Títulos em `GhostMarkdown` não forçam mais a cor branca para aceitar classes do Design System como `--color-bluePrimary`.

---

## 🔧 Patch Template V3 — Persistência JSONB + Render resiliente (Ghost QA)

### Especificação oficial do objeto JSONB (`landing_pages.content`) para V3

A coluna `landing_pages.content` deve permanecer como **JSONB** e no Template V3 deve salvar um objeto com `template: "master-project-v3-alpa"`.

No campo `intro_body`, o formato suportado e normalizado passa a ser:

```json
[
  {
    "type": "text",
    "value": "### Título\nParágrafo com **markdown** e caracteres de escape preservados.",
    "settings": { "autoplay": false }
  },
  {
    "type": "video_youtube",
    "value": "https://www.youtube.com/watch?v=VIDEO_ID",
    "settings": { "autoplay": true }
  }
]
```

Regras:

- `type`: `text` ou `video_youtube`.
- `value`: string obrigatória.
- `settings.autoplay`: boolean opcional (default `true` para `video_youtube` e `false` para `text`).
- Strings antigas em `intro_body` continuam aceitas e são convertidas para bloco `text` automaticamente.

### Política de fallback para vídeo (autoplay)

- Render principal usa `iframe` YouTube em `/embed/[ID]` com parâmetros `autoplay=1&mute=1&loop=1&playlist=[ID]`.
- Quando o navegador/provedor bloquear autoplay, o fallback visual padrão é **thumbnail estático do YouTube** (`hqdefault.jpg`) + ação explícita de play (lightbox no template ALPA).
- Resultado: o conteúdo permanece visível mesmo sem reprodução automática.

### Verificação de tipografia Markdown (react-markdown)

- Blocos `text` usam renderização Markdown com tokenização tipográfica existente.
- Títulos (`h1/h2/h3`) devem respeitar o tom Ghost e, para V3, permanecer compatíveis com `--color-bluePrimary` via classe utilitária (`prose-headings:text-bluePrimary`) nas áreas de conteúdo.
- Quebras e escapes do markdown são preservados ao salvar/carregar o JSONB (sem perda de barras invertidas e quebras relevantes).

## 8. Atualização de estado — 2026-03-09

- O renderer do Template V3 passou a diferenciar mídia de bloco editorial e mídia "full". Blocos standalone de imagem e vídeo usam `displayMode = full` para respeitar a proporção nativa do asset sem crop.
- Embeds de YouTube que exigem autoplay agora são montados com `autoplay=1`, `mute=1`, `playsinline=1`, `loop=1` e `playlist=[videoId]`, alinhando o comportamento com a política real dos browsers.
- Cards/thumbs conectados às landings passaram a aceitar imagem e MP4 de forma nativa, com detecção por tipo de mídia e fallback seguro para assets inválidos.
- O runtime prioriza capas estruturadas (`project.covers.*`) antes de links legados quebrados como `projects/.../thumb.*` e `projects/.../hero.*`, reduzindo falso positivo de mídia inexistente.
- Referências operacionais detalhadas:
  - `20-TASK-01-LANDING-V3-YOUTUBE-AUTOPLAY.md`
  - `21-TASK-02-LANDING-V3-FULL-IMAGE.md`
  - `22-TASK-03-THUMBS-MP4.md`

## 9. Atualização de estado — 2026-03-27

- A listagem de landing pages recebeu melhoria de acessibilidade nas ações de linha:
  - links de **ver/editar** agora incluem `aria-label` explícito com contexto do título.
  - links externos usam `rel="noopener noreferrer"` por segurança operacional.
- Fluxo de exclusão migrou para botão client-side com confirmação explícita (`window.confirm`) antes de executar `deleteLandingPageAction`.
