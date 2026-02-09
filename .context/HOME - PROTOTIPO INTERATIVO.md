# HOME — PROTOTIPO INTERATIVO (CANONICO)

Versao: **5.0**  
Data: **2026-02-09**  
Status: **Canonica para implementacao**

## 1. Objetivo da pagina

A Home deve comunicar autoridade criativa com execucao tecnica premium, guiando o visitante em um fluxo direto:

1. Entender a proposta (Hero).
2. Ver evidencia de trabalho (Portfolio + Featured).
3. Converter em contato (Contato + CTA principal).

Frase-base: **"Voce nao ve o design. Mas ele ve voce."**

## 2. Regras globais (obrigatorias)

- Acessibilidade: WCAG AA minimo.
- Performance mobile-first: pagina inicial abaixo de 2MB.
- Motion Ghost: somente `opacity`, `blur` e `translateY` (maximo 18px).
- Proibido em UI/conteudo: `scale`, `bounce`, `rotate`.
- Easing oficial: `cubic-bezier(0.22, 1, 0.36, 1)`.
- `prefers-reduced-motion` obrigatorio: sem parallax/lerp, sem WebGL, reveals simplificados.

## 3. IA e ordem de secoes

Estrutura canonica da Home:

1. Header
2. Hero
3. Video Manifesto
4. Portfolio Showcase
5. Featured Projects
6. Marcas
7. Contato
8. Footer

## 4. Navegacao canonica

No header:

- Home -> `/` (ou `#hero` quando na Home)
- Sobre -> `/sobre`
- Portfolio -> `/portfolio`
- Contato -> `#contact`

## 5. Design tokens (fonte de verdade)

### 5.1 Cores

- `primary`: `#0048ff`
- `accent`: `#4fe6ff`
- `ghostPurple`: `#8705f2`
- `backgroundDark`: `#040013`
- `backgroundLight`: `#f0f0f0`
- `textPrimary`: `#fcffff`
- `textSecondary`: `#a1a3a3`
- `textInverse`: `#0e0e0e`
- `neutral`: `#0b0d3a`
- `neutralLight`: `#F5F5F5`

### 5.2 Espacamento

- `xs`: 4
- `sm`: 8
- `md`: 16
- `lg`: 24
- `xl`: 40
- `xxl`: 64
- `section`: 120

## 6. Especificacao por secao

### 6.1 Header

Objetivo: navegacao clara, fixa e discreta.

- Desktop: barra fixa horizontal, links visiveis.
- Mobile: logo + menu, overlay acessivel.
- Estados de foco: sempre visiveis (`focus-visible`).
- Alvos touch: minimo `48x48px`.

### 6.2 Hero

Objetivo: impacto editorial imediato + direcionamento para proxima secao.

Conteudo:

- Tag: `[BRAND AWARENESS]`
- H1 unico da pagina:
  - Linha 1: `Voce nao ve`
  - Linha 2: `o design.`
- Subheadline: `Mas ele ve voce.`
- CTA: `step inside ->` (ancora para proxima secao)

Midia:

- WebGL e opcional e nunca compete com texto.
- Fallback obrigatorio: imagem estatica/gradiente.

Acessibilidade:

- Canvas decorativo: `aria-hidden="true"`, `role="presentation"`.
- Conteudo textual sem depender de canvas.

### 6.3 Video Manifesto

Objetivo: reforcar posicionamento com narrativa audiovisual curta.

Regras:

- Video com autoplay mudo, `playsInline`, loop.
- Overlay escuro para contraste real de leitura.
- Poster obrigatorio.
- Fallback para imagem quando video indisponivel.
- Lazy load quando abaixo da dobra.

### 6.4 Portfolio Showcase

Objetivo: conectar rapidamente o visitante as categorias de servico.

Conteudo minimo:

- Titulo da secao com destaque em `primary`.
- 3 categorias principais.
- CTA final: **"vamos trabalhar juntos ->"** levando para `#contact`.

Interacao:

- Clique leva para `/portfolio` com contexto de categoria.
- Hover apenas com mudancas sutis de opacidade/translateY.

### 6.5 Featured Projects

Objetivo: prova de qualidade em layout editorial denso.

Layout:

- Desktop: grid irregular (12 colunas).
- Mobile: lista vertical com cards full-width.

Card:

- H3 por projeto.
- Meta: cliente e ano.
- Tags opcionais.
- Click target claro e focavel.

### 6.6 Marcas

Objetivo: social proof sem ruido visual.

- Logos monocromaticas.
- Contraste suficiente.
- Animacao discreta por opacidade.

### 6.7 Contato

Objetivo: conversao direta e sem friccao.

Conteudo:

- Headline: `contato`
- Subheadline clara.
- Canais diretos (telefone/email).
- Formulario com nome, email, mensagem.

Regras:

- Labels associadas.
- Validacao com mensagens legiveis e anunciaveis.
- Botao principal sem scale.

### 6.8 Footer

Objetivo: fechamento institucional e navegacao secundaria.

- Desktop: barra final limpa, sem sobrepor conteudo.
- Mobile: stack vertical no fluxo normal.
- Links replicam navegacao principal.

## 7. Motion system da Home

Padroes permitidos:

- `opacity: 0 -> 1`
- `filter: blur(8px) -> blur(0)`
- `translateY: 18px -> 0`

Padrao de transicao:

```ts
const ghostTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};
```

`prefers-reduced-motion`:

- remove reveals encadeados;
- remove parallax/lerp;
- desliga WebGL;
- usa apenas `opacity` curta.

## 8. Acessibilidade e semantica

Estrutura obrigatoria:

- `header` + `nav`
- `main`
- `section` por bloco
- `footer`

Regras:

- 1 H1 na Home (Hero).
- H2 por secao.
- H3 por card/projeto.
- Skip link no inicio da pagina.
- Navegacao completa por teclado.

## 9. Performance e SEO

### 9.1 Budget

- Peso inicial: `< 2MB`
- TTI: `< 5s` em 3G
- FCP: `< 2s`
- CLS: `< 0.1`
- Lighthouse alvo: `> 90`

### 9.2 Otimizacoes

- Imagens WebP com `srcset/sizes`.
- Videos comprimidos + poster.
- Fontes self-hosted com preload/subset.
- Imports dinamicos para WebGL.
- Purge de Tailwind em producao.

### 9.3 SEO

- `export const metadata` na rota.
- Open Graph com `og:image` valido.
- JSON-LD (`Person` + `CreativeWork`/`Portfolio`).

## 10. Stack e boundaries de implementacao

- Next.js (App Router) + React 18+ + TypeScript.
- Tailwind CSS.
- Framer Motion para UI 2D.
- Lenis apenas quando fizer sentido.
- R3F/Drei opcional e com fallback.

Separacao server/client:

- Server: metadata, shell, dados.
- Client: video, animacao, modal, parallax, 3D.

## 11. Checklist de validacao da Home

- [ ] Header navegavel por teclado.
- [ ] Hero com H1 unico e contraste AA.
- [ ] Video manifesto com poster e fallback.
- [ ] Portfolio showcase com CTA para `#contact`.
- [ ] Featured projects legiveis em mobile.
- [ ] Formulario com labels e feedback acessivel.
- [ ] `prefers-reduced-motion` funcionando.
- [ ] Lighthouse > 90 na Home.

---

## 12. Prompt estruturado (prototype-prompt-generator)

### Role

Voce e um engenheiro(a) UI/UX senior especialista em Next.js, Tailwind e Framer Motion, com foco em portfolios editoriais premium de alta performance.

### Task

Crie o prototipo da pagina Home (`/`) do portfolio Ghost Design System, priorizando legibilidade, acessibilidade e performance. A experiencia deve ser silenciosa, editorial e orientada a conversao para contato.

### Tech Stack

- Next.js App Router + React 18+ + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (opcional)
- R3F/Drei (opcional, com fallback)

### Visual Design Requirements

- Cores e espacamentos devem usar os tokens deste documento.
- Evitar ruido visual; usar contraste alto e grid denso.
- Background com profundidade (gradientes/superficies), sem sacrificar leitura.

### Motion Requirements

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Permitido: `opacity`, `blur`, `translateY`
- Proibido: `scale`, `bounce`, `rotate`
- `translateY` maximo: `18px`
- Implementar `prefers-reduced-motion`

### Accessibility Requirements

- Semantica completa (`header/nav/main/section/footer`)
- H1 unico
- Focus visivel
- Touch target minimo 48x48
- Navegacao por teclado

### Performance Requirements

- Peso inicial < 2MB
- LCP < 2.5s
- CLS < 0.1
- Lighthouse > 90

### Output Format

Entregar estrutura de pagina pronta para App Router com:

1. Componentes por secao.
2. Estados de loading/erro/fallback (video e WebGL).
3. Animacoes com `prefers-reduced-motion`.
4. Metadata SEO + JSON-LD.
