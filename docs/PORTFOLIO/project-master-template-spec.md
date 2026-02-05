# Portfolio Project Pages — Template Mestre (`master-project-v1`)

## 1) Gap Analysis (design novo vs página atual `key-vision`)

### Elementos globais preservados
- Header global do site (menu `home`, `sobre`, `portfólio`, `contato`) via `ClientLayout`.
- Footer global via `SiteFooter`.
- Rota dinâmica mantém URL pública em `/projects/:slug`.

### Onde o novo template assume controle
- Todo o conteúdo principal da página do projeto (hero, introdução, galeria editorial, CTA final).
- Estratégia de layout visual do case (grid assimétrico, quote-band, blocos split).
- Metadados específicos do projeto (OG/SEO/JSON-LD) baseados no schema do template.

### Compatibilidade
- Conteúdo legado em `landing_pages.content` como array de blocos continua funcional (`legacy-blocks`).
- Novo modo é ativado quando `content.template === "master-project-v1"`.

---

## 2) Design Tokens aplicados ao template

### Cores base (Ghost DS)
- `primary`: `#0048ff`
- `accent`: `#4fe6ff`
- `backgroundDark`: `#040013`
- `textPrimary`: `#fcffff`
- `textSecondary`: `#a1a3a3`

### Motion
- Easing oficial: `cubic-bezier(0.22, 1, 0.36, 1)`
- Permitido: `opacity`, `blur`, `translateY`
- Limite de deslocamento: `translateY <= 18px`
- `prefers-reduced-motion`: remove parallax, simplifica reveals para fade

### Grid e ritmo
- Desktop: `12 col`, `grid-flow-dense`
- Mobile: lista vertical full-width
- Layouts de item do grid:
  - `full`
  - `feature`
  - `quote-band`
  - `split-left`
  - `split-right`

---

## 3) Schema de dados configurável (CMS/Admin)

```json
{
  "schema_version": "1.0",
  "template": "master-project-v1",
  "project_slug": "honda-civic-lancamento",
  "hero_cover_image": {
    "src": "landing-pages/honda-civic/hero.webp",
    "alt": "Capa do projeto Honda Civic",
    "kind": "image",
    "poster": ""
  },
  "hero_logo_image": {
    "src": "landing-pages/honda-civic/logo.webp",
    "alt": "Logo Honda Civic",
    "kind": "image"
  },
  "project_title": "Lançamento",
  "project_subtitle": "Honda Civic",
  "project_client": "Honda",
  "project_year": 2018,
  "project_tags": ["Key Visual", "Edição de Vídeo", "Direção de Arte"],
  "project_services": ["Design", "Branding", "Motion"],
  "project_summary": "Uma nova geração começa agora.",
  "intro_headline": "Honda Civic",
  "intro_body": [
    "O futuro não acontece por acaso.",
    "Mais do que um lançamento, este é um marco."
  ],
  "highlight_color": "#0048ff",
  "gallery_grid": [
    {
      "id": "item-01",
      "layout": "feature",
      "src": "landing-pages/honda-civic/section-1.webp",
      "alt": "Peça principal da campanha",
      "kind": "image",
      "title": "Renove suas asas",
      "description": "Peça hero da campanha"
    },
    {
      "id": "item-02",
      "layout": "quote-band",
      "quote": "Renove suas asas",
      "description": "Mensagem central da campanha",
      "src": "",
      "alt": "",
      "kind": "image"
    },
    {
      "id": "item-03",
      "layout": "split-left",
      "src": "landing-pages/honda-civic/section-3.webp",
      "alt": "Evento de lançamento",
      "kind": "image",
      "title": "O amanhã começa hoje"
    }
  ],
  "navigation": {
    "back_label": "voltar",
    "next_label": "próximo projeto",
    "next_project_slug": "projeto-seguinte"
  },
  "cta": {
    "label": "vamos trabalhar juntos →",
    "href": "/#contact"
  },
  "seo": {
    "description": "Case Honda Civic por Danilo Novais.",
    "og_image": "landing-pages/honda-civic/og.webp"
  }
}
```

---

## 4) Regras fixas vs editáveis

### Fixo (template)
- Estrutura semântica da página (`header/hero/main/sections/cta`).
- Regras de motion Ghost e acessibilidade.
- Comportamento responsivo do grid editorial.

### Editável (admin)
- Conteúdo textual (títulos, parágrafos, tags, serviços, cta).
- Assets de hero e galeria.
- Cor de destaque (`highlight_color`).
- Ordem/composição dos itens do `gallery_grid`.

---

## 5) Performance e acessibilidade no template

- Hero media com fallback (imagem/gradiente) e overlay escuro para legibilidade.
- Mídias da galeria com lazy loading por padrão.
- Controles de vídeo habilitados e `playsInline`.
- Alvos interativos com mínimo de altura útil (`min-h-12`).
- Sem animações proibidas (`scale`, `rotate`, `bounce`).

---

## 6) Mapeamento de implementação no repositório

- Parser/schema: `src/lib/projects/template-schema.ts`
- Tipos do template: `src/types/project-template.ts`
- Renderer do template novo: `src/components/projects/templates/MasterProjectTemplate.tsx`
- Router dinâmico: `src/app/projects/[slug]/page.tsx`
- Builder admin (template switch + campos): `src/components/admin/LandingPageForm.tsx`
- Editor do template novo: `src/components/admin/MasterProjectTemplateEditor.tsx`
