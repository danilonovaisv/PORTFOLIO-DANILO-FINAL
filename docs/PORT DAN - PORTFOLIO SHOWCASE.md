# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page  
**Seções cobertas:** Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer

---

# **SECTION NAME: Portfolio Showcase**

## **SECTION PURPOSE (what this section must achieve)**
- Apresentar claramente as áreas de atuação de Danilo.
- Organizar mentalmente o portfólio em categorias.
- Criar navegação editorial premium com foco em clareza e ritmo.

---

## **PRIMARY MESSAGE / HEADLINE**
- `portfólio showcase`

---

## **SECONDARY MESSAGE / SUPPORT TEXT**
- `[what we love working on]`

---

## **KEY CONTENT ELEMENTS**
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

---

## **CALL TO ACTION (if any)**
- `Ver todos os projetos →` → `/portfolio?category={id}`
- `let’s build something great →` → `/#contact`

---

## **LINKS GLOBAIS**
- Integração com `/portfolio` (com filtro por categoria).
- Integração com `/#contact`.

---

## **LAYOUT TYPE**
- Seção editorial baseada em **stripes expansíveis**.

---

## **ALIGNMENT**

### Desktop (≥1024px)
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
  1. Direita
  2. Centro
  3. Esquerda

### Mobile (≤768px)
- Todos os elementos empilhados.
- Alinhamento à esquerda.
- Stripes ocupam 100% da largura.

---

## **SPACING**
- Desktop:
  - `py-24`
  - `gap-14` entre stripes
- Mobile:
  - `py-16`
  - `gap-10`
- Espaço claro antes do CTA final.

---

## **BACKGROUND**
- Fundo sólido `#F4F5F7`.

---

## **SECTION COLORS**
- Azul da marca `#0057FF`.
- Texto principal `#111111`.
- Texto secundário em tons neutros.

---

## **TYPOGRAPHY**
- Headline:
  - Mobile: `text-4xl`
  - Desktop: `text-6xl`
- Stripes:
  - Mobile: `text-2xl`
  - Desktop: `text-5xl / text-6xl`
- Microtexto:
  - Uppercase
  - Tracking amplo apenas em desktop

---

## **IMAGERY**
- Miniaturas animadas apenas em hover (desktop).
- Imagem grande apenas no estado expandido.
- Mobile não exibe thumbnails em hover.

---

## **MEDIA**
- Framer Motion para animações.
- Sem vídeo ou 3D nesta seção.

---

## **COMPONENTS USED**
- `PortfolioShowcaseSection`
- `CategoryStripe`
- `ExpandedCategoryPanel`
- CTA Button

---

## **STATE VARIANTS**
- Hover (desktop):
  - Slide-in da thumbnail.
  - Mudança de cor do título.
- Active:
  - Stripe expandido.
- Focus:
  - Outline visível (keyboard).

---

## **INTERACTIONS**
- Clique / Enter / Space no stripe:
  - Expande categoria.
- Clique em CTA:
  - Navegação direta.
- Hover:
  - Micro-interações sutis (desktop apenas).

---

## **SCROLL BEHAVIOUR**
- Reveal on scroll com fade + translateY.
- Sem sticky.

---

## **ANIMATIONS**
- Entrada da seção:
  - `opacity: 0 → 1`
  - `y: 24 → 0`
- Expansão:
  - `layout` animation
  - easing: `cubic-bezier(0.22,1,0.36,1)`
- Hover:
  - Apenas `transform` e `opacity`.
- `prefers-reduced-motion`:
  - Desativa animações não essenciais.

---

## **MICRO-INTERACTIONS**
- Hover no ponto azul (scale).
- Ícone de seta rotaciona ao expandir.

---

## **TEXT LIMITS**
- Labels curtos e escaneáveis.

---

## **CONTENT PRIORITY**
1. Headline
2. Stripes
3. CTA final

---

## **ALTERNATIVE CONTENT**
- Imagem fallback neutra.
- Conteúdo textual sempre visível.

---

## **LINKS / DESTINATIONS**
- `brand-campaigns` → Brand & Campaigns  
- `videos-motions` → Videos & Motions  
- `websites-webcampaigns-tech` → Web Campaigns, Websites & Tech  

---

## **DATA HOOKS / TRACKING**
- `portfolio_showcase_category_click`
- `portfolio_showcase_cta_click`

---

## **DEPENDENCIES**
- Página `/portfolio` com suporte a filtros.

---

## **ACCESSIBILITY NOTES**
- `role="button"` nos stripes.
- `aria-expanded` no estado ativo.
- Navegação completa por teclado.
- Foco visível.
- Respeito a `prefers-reduced-motion`.

---

## **SPECIAL STATES**
- Não aplicável (conteúdo estático).

---

## **NOTES / INSPIRATION**
- Referência direta: https://loandbehold.studio/

---

## **REFERENCES**
- `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

---

## **NON-NEGOTIABLES**
- 3 stripes de categoria.
- Copy imutável.
- CTA principal e aspiracional.
- Estética premium.

---

# **ULTRAWIDE STRATEGY (1920px+)**

## **Objetivo**
Evitar aparência “apertada” ou excessivamente centralizada em telas grandes, mantendo elegância editorial.

### **Container Strategy**
- Substituir container rígido por container fluido controlado:
  - `max-width: 1680px`
  - `padding-inline: clamp(24px, 5vw, 96px)`
- Centralizar conteúdo com `mx-auto`.

### **Layout**
- Headline mantém centralização visual.
- Stripes ganham mais “respiro” lateral.
- Microtexto permanece alinhado ao primeiro stripe, não ao viewport.

### **Animações**
- Mesmos timings do desktop.
- Nenhuma animação baseada em largura do viewport.

---

# **CHECKLIST DE QA VISUAL — Portfolio Showcase**

## ✅ Desktop (1280 / 1440 / 1680)
- [ ] Headline centralizada visualmente.
- [ ] Microtexto visível apenas no primeiro stripe.
- [ ] Alinhamento alternado correto (direita / centro / esquerda).
- [ ] Hover revela thumbnail suavemente.
- [ ] Nenhum layout shift ao hover.
- [ ] Expansão fluida, sem jank.
- [ ] CTA final visível e equilibrado.

---

## ✅ Ultrawide (1920+)
- [ ] Conteúdo não parece “estreito”.
- [ ] Padding lateral confortável.
- [ ] Stripes não colam nas bordas.
- [ ] Ritmo visual consistente com desktop.
- [ ] Nada parece “perdido” no centro.

---

## ✅ Tablet (768 / 820 / 1024)
- [ ] Stripes ocupam largura correta.
- [ ] Textos legíveis sem quebra estranha.
- [ ] Expansão não causa overflow.
- [ ] CTA acessível sem scroll excessivo.

---

## ✅ Mobile (320 / 375 / 414)
- [ ] Sem overflow horizontal.
- [ ] Todos os textos legíveis.
- [ ] Stripes clicáveis com boa área de toque.
- [ ] Thumbnails não aparecem em hover.
- [ ] Expansão vertical suave.
- [ ] CTA final claramente visível.

---

## ✅ Acessibilidade
- [ ] Navegação completa por teclado.
- [ ] Foco visível em stripes e CTAs.
- [ ] `aria-expanded` correto.
- [ ] Movimento reduzido respeitado.

---

## ✅ Performance
- [ ] Nenhuma animação de `width` em mobile.
- [ ] Apenas `transform` e `opacity` animados.
- [ ] Sem layout shift perceptível.
- [ ] Imagens carregam corretamente.

---

## ✅ Fidelidade Premium
- [ ] Ritmo editorial consistente.
- [ ] Espaçamento equilibrado.
- [ ] Tipografia hierárquica.
- [ ] Comportamento alinhado à referência Lo&Behold.

---

# **STATUS FINAL**
Este documento representa a **versão final validada** da seção **Portfolio Showcase** para a Home Page.
