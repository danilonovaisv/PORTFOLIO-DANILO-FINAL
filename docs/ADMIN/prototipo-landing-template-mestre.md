# Protótipo interativo + Documento de handoff — Landing Page (Template Mestre)

> **Objetivo**: documentar, de ponta a ponta, como a landing page funciona (pública + admin) para que um agente/DEV implemente com previsibilidade.
>
> **Premissa-chave**: **apenas** o **Header**, o **Background animado**, a **Hero** e a **Introdução** são fixos. Todo o restante é **montado por blocos** no Admin via `gallery_grid`.

---

## 0) Glossário rápido (para alinhar termos)

- **Landing Page do Projeto**: página pública renderizada em `/projects/:slug` (ou rota equivalente) com o conteúdo editorial do projeto.
- **Template Mestre (novo)**: formato estruturado com campos fixos + `gallery_grid` (lista de seções).
- **Legacy Blocks**: builder antigo por blocos (texto, imagem, vídeo, etc.). Mantém compatibilidade, mas o foco é o Template Mestre novo.
- **Asset**: mídia (imagem/vídeo) que vive no storage (ex.: Supabase) e é referenciada por `src`/`poster`.

---

## 1) O que é fixo vs. montável (regra de ouro)

### 1.1 Fixo (sempre presente)
1. **Header principal (sticky)**
   - **O que é**: navegação global do seu site.
   - **Por que existe**: consistência e acesso rápido a rotas principais.
   - **Requisito**: sempre legível sobre o BG (blur/backdrop + contraste).

2. **Background animado (Liquid Ether)**
   - **O que é**: camada visual fixa com animação.
   - **Desktop**: a animação reage ao **mouse**.
   - **Mobile**: a animação reage ao **touch**.
   - **Requisito**: precisa ser uma camada `fixed` atrás de tudo, e não pode “quebrar” a leitura do conteúdo (contraste).

3. **Hero (capa do projeto)**
   - **O que é**: capa com imagem/vídeo + logo do cliente (opcional) + informações do projeto.
   - **Por que é fixo**: padroniza o início de todas as landings.
   - **Campos**: `hero_cover_image` (obrigatório) e `hero_logo_image` (opcional).

4. **Introdução padrão (título + texto abaixo)**
   - **O que é**: bloco editorial que contextualiza qualquer landing.
   - **Por que é fixo**: garante consistência narrativa entre projetos.
   - **Campos**: `summary`, `intro_headline`, `intro_paragraphs` (divididos por linha no Admin).

### 1.2 Montável (tudo após a intro)
- **O que é**: uma sequência de seções configuráveis, renderizadas a partir de `gallery_grid[]`.
- **Como funciona**: cada item do `gallery_grid` vira uma seção com:
  - `layout` (tipo de seção)
  - `kind` (imagem ou vídeo)
  - `src` (caminho do asset no storage)
  - textos opcionais (`title`, `eyebrow`, `description`, `quote`)
  - `poster` opcional (para vídeo)

---

## 2) Protótipo interativo — Página pública (wireflow)

### Estado A — Topo (Hero)
**O usuário vê**:
- BG animado (fundo).
- Header sticky (em cima).
- Hero com a capa e o logo do cliente.

**Interações**:
- Scroll desce para o bloco de Introdução.
- (Opcional) indicador de scroll (seta) que faz jump para a Introdução.

**Critérios de aceite**:
- Hero deve ficar legível com BG ativo.
- Imagem/vídeo deve estar otimizado (lazy quando possível; hero pode ter prioridade).

---

### Estado B — Introdução fixa (padrão)
**O usuário vê**:
- Título/Headline + parágrafos (conteúdo editorial “base” do projeto).

**Interações**:
- Scroll continua para as seções montáveis (gallery grid).

**Critérios de aceite**:
- Texto com largura confortável (ex.: max-w) e bom contraste.
- Parágrafos respeitam quebra por linha (cada linha vira um `<p>`).

---

### Estado C — Seções montáveis (gallery_grid)
**O usuário vê**:
- Blocos que mudam por projeto: imagem full, vídeo full, split, quote band, grid, etc.

**Interações**:
- Lazy-load de mídia abaixo da dobra.
- Split vira stack no mobile automaticamente.

**Critérios de aceite**:
- Ordem deve respeitar o array `gallery_grid`.
- Se não houver itens, renderiza somente Hero + Intro + Footer.

---

### Estado D — Footer de navegação do projeto
**O usuário vê**:
- “Voltar” e “Próximo projeto” (se existir).
- CTA final (opcional).

**Interações**:
- Navega para o próximo slug ou volta para listagem.

**Critérios de aceite**:
- Links acessíveis via teclado, com foco visível.

---

## 3) Protótipo interativo — Admin (montagem do conteúdo)

> O Admin suporta **Template Mestre novo** e **Legacy Blocks**. O foco é o Template Mestre novo.

### 3.1 Fluxo — Template Mestre novo (recomendado)
1. **Campos do projeto**
   - Preenche: título, slug, etc.
   - Explicação: isso define URL e identificação do projeto.

2. **Hero**
   - Sobe a mídia `hero_cover_image` (obrigatório).
   - (Opcional) sobe `hero_logo_image`.
   - Explicação: estes assets definem a “capa” do projeto e marca do cliente.

3. **Introdução**
   - `summary`: resumo curto do projeto.
   - `intro_headline`: headline editorial.
   - `intro_paragraphs`: texto dividido por linha (cada linha vira um parágrafo).
   - Explicação: “abre” a narrativa e padroniza leitura.

4. **Seções (gallery_grid)**
   - Clica em **Adicionar item**.
   - Define: `layout`, `kind`, `src`, `alt`, (opcional) textos e `poster`.
   - Ordena (↑/↓) e remove (trash).
   - Explicação: é aqui que a landing vira “montável”.

---

### 3.2 Fluxo — Legacy Blocks (compatibilidade)
- **Adicionar bloco** (texto, imagem, vídeo, split etc.).
- Explicação: útil para projetos antigos, mas tende a gerar variações imprevisíveis. O Template Mestre novo deve ser o “default”.

---

## 4) Contrato de dados (schema) — Template Mestre novo

> Os nomes abaixo seguem o que o seu Admin já manipula (`MasterProjectTemplateData` e `gallery_grid`).  
> O draft no editor adiciona `file` e `previewUrl`, mas isso **não** deve ir para o banco.

### 4.1 Tipos principais (visão conceitual)

#### `MasterProjectAsset`
Campos esperados no storage:
- `src: string` — caminho no storage (ex.: `landing-pages/meu-projeto/cover.webp`)
- `alt: string` — texto alternativo (obrigatório para imagem)
- `kind: "image" | "video"`
- `poster?: string` — opcional (para vídeo)

#### `MasterProjectGalleryItem`
Cada item do `gallery_grid` contém:
- `id: string`
- `kind: "image" | "video"`
- `layout: "grid" | "full-highlight" | "full" | "feature" | "quote-band" | "split-left" | "split-right"`
- `src: string`
- `alt: string`
- `poster?: string`
- `title?: string`
- `eyebrow?: string`
- `description?: string`
- `quote?: string`

#### `MasterProjectTemplateData`
- `hero_cover_image: MasterProjectAsset`
- `hero_logo_image?: MasterProjectAsset`
- `summary: string`
- `intro_headline: string`
- `intro_paragraphs: string` (no Admin é textarea; no renderer vira array por quebra de linha)
- `gallery_grid: MasterProjectGalleryItem[]`
- (+ campos extras do projeto: `title`, `slug`, etc., conforme sua base)

---

### 4.2 Exemplo de JSON (pronto para testes)

```json
{
  "title": "Honda Civic",
  "slug": "honda-civic",
  "summary": "Lançamento — Honda 2018",
  "intro_headline": "Uma nova geração começa agora",
  "intro_paragraphs": "O futuro não acontece por acaso.\nO novo Civic nasceu desse princípio.\nInovação não é promessa. É entrega.",
  "hero_cover_image": {
    "src": "landing-pages/honda-civic/hero-cover.webp",
    "alt": "Capa do projeto Honda Civic",
    "kind": "image"
  },
  "hero_logo_image": {
    "src": "landing-pages/honda-civic/logo-honda.webp",
    "alt": "Logo Honda",
    "kind": "image"
  },
  "gallery_grid": [
    {
      "id": "grid-item-1",
      "kind": "image",
      "layout": "full-highlight",
      "src": "landing-pages/honda-civic/highlight.webp",
      "alt": "Imagem destaque",
      "title": "Renove suas asas",
      "eyebrow": "CIVIC",
      "description": "Tecnologia que antecipa o amanhã."
    },
    {
      "id": "grid-item-2",
      "kind": "image",
      "layout": "quote-band",
      "src": "",
      "alt": "",
      "quote": "Renove suas asas",
      "description": "Aqui, inovação não é promessa. É entrega."
    },
    {
      "id": "grid-item-3",
      "kind": "image",
      "layout": "full",
      "src": "landing-pages/honda-civic/typography.webp",
      "alt": "Headline grande em fundo claro"
    },
    {
      "id": "grid-item-4",
      "kind": "image",
      "layout": "split-left",
      "src": "landing-pages/honda-civic/evento.webp",
      "alt": "Foto do evento",
      "title": "O amanhã começa hoje",
      "description": "Texto do lado direito com contexto do lançamento."
    }
  ]
}
```

**Explicação do exemplo**:
- `intro_paragraphs` usa `\n` para representar “1 parágrafo por linha”.
- `quote-band` pode não precisar de mídia; se `src` vier vazio, o renderer deve ignorar a mídia e mostrar só o texto.

---

## 5) Regras de renderização por `layout` (o coração do protótipo)

> Cada `layout` define uma composição visual + comportamento responsivo.

### 5.1 `grid`
- **O que faz**: galeria em grid (2 colunas desktop / 1 coluna mobile).
- **Quando usar**: sequência de imagens menores (moodboard, detalhes, bastidores).
- **Regras**:
  - Renderizar cards padronizados.
  - Se vários itens consecutivos forem `grid`, pode agrupar em uma única seção (opcional).

### 5.2 `full-highlight`
- **O que faz**: “poster” grande com espaço para texto editorial.
- **Quando usar**: imagem hero secundária como no seu template.
- **Regras**:
  - Mídia ocupa boa parte da largura.
  - `eyebrow/title/description` podem sobrepor ou ficar abaixo (defina um padrão).

### 5.3 `full`
- **O que faz**: mídia edge-to-edge.
- **Quando usar**: imagens/vídeos que precisam de impacto visual.
- **Regras**:
  - Sem texto por padrão (opcional legenda curta).

### 5.4 `feature`
- **O que faz**: seção de destaque com tipografia forte (headline).
- **Quando usar**: mensagens de impacto (“100 km/h em 10s”).
- **Regras**:
  - Se tiver mídia, pode ser background; senão, só texto.

### 5.5 `quote-band`
- **O que faz**: faixa colorida (background sólido/gradiente) com quote.
- **Quando usar**: destacar tagline/copy principal.
- **Regras**:
  - Prioriza texto (`quote` grande + `description` menor).
  - Se `src` vier vazio, não renderiza mídia.

### 5.6 `split-left` / `split-right`
- **O que faz**: duas colunas (mídia + texto).
- **Quando usar**: narrativa editorial com imagem e explicação.
- **Regras**:
  - Desktop: 2 colunas.
  - Mobile: empilha (mídia em cima, texto abaixo).
  - `split-left`: mídia na esquerda; `split-right`: mídia na direita.

---

## 6) Comportamento de mídia (imagem e vídeo)

### 6.1 Imagem
- Renderizar com `next/image` (ou equivalente).
- `alt` **obrigatório**.
- Lazy-load para seções abaixo da dobra.

**Explicação**: melhora performance e acessibilidade; o browser só carrega o necessário.

### 6.2 Vídeo
- Renderizar com `<video controls>` por padrão.
- Suporta `poster` (opcional).
- Variantes futuras (opcionais): autoplay/loop/muted.

**Explicação**: mantém previsibilidade e evita comportamento invasivo; autoplay pode ser adicionado depois como layout/flag.

---

## 7) Background animado (Liquid Ether) — especificação de integração

### Regras
- Deve ser `position: fixed; inset: 0; z-index: 0`.
- Conteúdo deve ficar acima (`z-index` maior).
- Desktop: responde a mouse.
- Mobile: responde a touch.
- **Pause when hidden**: quando a aba perde foco/visibilidade, pausar animação (economia de bateria/perf).

**Explicação**: evita consumo contínuo de GPU/CPU e garante que o conteúdo continue legível.

---

## 8) Ordenação, remoção e “draft” no Admin

### 8.1 Draft vs. Persistido
No editor, os assets têm:
- `file?: File | null`
- `previewUrl?: string`

Antes de salvar, deve “strippar” isso e persistir apenas:
- `src`, `alt`, `kind`, `poster`, etc.

**Explicação**: `file` e `previewUrl` são apenas para UX no admin (preview), não devem ir para o banco.

### 8.2 Ordenação
- Botões ↑/↓ trocam posições no array `gallery_grid`.

**Explicação**: o renderer respeita exatamente a ordem do array; ordenar é “editar a narrativa”.

---

## 9) Edge cases (precisa tratar)

1. `gallery_grid` vazio  
   - Renderiza Hero + Intro + Footer.

2. Item `quote-band` sem `src`  
   - Renderiza apenas texto.

3. Item `kind="video"` sem `poster`  
   - Renderiza vídeo normal (sem poster).

4. `alt` vazio em imagem  
   - Bloquear no Admin (validação) ou gerar warning.

**Explicação**: sem isso o conteúdo fica inconsistente e pode quebrar acessibilidade.

---

## 10) Critérios de aceite (para você cobrar a execução)

### Página pública
- [ ] Header sticky sempre visível e legível.
- [ ] BG animado aparece atrás do conteúdo e responde a mouse/touch.
- [ ] Hero + Intro sempre renderizam.
- [ ] `gallery_grid` renderiza todos os layouts corretamente.
- [ ] Mobile responsivo (split empilha).
- [ ] Imagens lazy-load abaixo da dobra.
- [ ] A11y básico (alt, foco visível, navegação por teclado).

### Admin
- [ ] Upload de `hero_cover_image` e `hero_logo_image` funcionando.
- [ ] `intro_paragraphs` vira parágrafos por linha no público.
- [ ] Adicionar/editar/remover/ordenar `gallery_grid`.
- [ ] Ao salvar, não persiste `file`/`previewUrl`.
- [ ] Validações mínimas (alt obrigatório para imagem).

---

## 11) Roadmap (opcional, mas recomendado)

1. **Tema por projeto** (cores/gradientes por landing)
   - Explicação: “personaliza” o projeto sem perder consistência.

2. **Autoplay flags** para vídeo
   - Explicação: mantém default seguro, mas permite casos específicos.

3. **Agrupamento automático de `grid` consecutivo**
   - Explicação: deixa o editor mais simples e o layout mais coeso.

---

## 12) Para o DEV implementar (tarefas objetivas)

1. Criar/ajustar renderer: `ProjectTemplateMasterRenderer`
   - Explicação: componente único que monta Hero + Intro + `gallery_grid`.

2. Criar componentes por seção:
   - `SectionGrid`
   - `SectionFull`
   - `SectionFullHighlight`
   - `SectionFeature`
   - `SectionQuoteBand`
   - `SectionSplit`
   - Explicação: cada layout vira um componente previsível e testável.

3. Camadas (z-index):
   - `AnimatedBackground (0)`, `Header (50)`, `Content (10+)`
   - Explicação: garante que BG não “invade” o conteúdo.

4. Validações no Admin:
   - imagem exige `alt`, vídeo sugere `poster`
   - Explicação: evita publicar conteúdo incompleto.

---

## 13) Anexos (origem dos nomes)

- `MasterProjectTemplateEditor` usa `gallery_grid`, `hero_cover_image`, `hero_logo_image`, `intro_headline`, `summary` e layouts:  
  `grid | full-highlight | full | feature | quote-band | split-left | split-right`.
- O draft adiciona `file` e `previewUrl`, que devem ser removidos antes de persistir.

---

**Fim do documento.**
