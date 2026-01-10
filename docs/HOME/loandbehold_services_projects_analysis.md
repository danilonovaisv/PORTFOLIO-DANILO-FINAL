
# Análise Técnica — Seções *Services* e *Projects*
## Referência: loandbehold.studio
## Uso: Agent Copiloto de AI Website Builder

---

## 1. Objetivo da Página/Sessão

### Services
- **Função principal:** Comunicar claramente *o que o estúdio faz* e *em quais frentes atua*.
- **Ação esperada:** Explorar categorias → entender escopo → seguir para projetos.
- **Contribuição estratégica:** Filtra leads qualificados e prepara o usuário para o showcase.

### Projects
- **Função principal:** Provar excelência por meio de exemplos reais.
- **Ação esperada:** Clicar em projetos → navegar para páginas internas.
- **Contribuição estratégica:** Credibilidade, prova social e conversão.

---

## 2. Estrutura de Conteúdo

### Services (Portfolio Showcase)
- Headline: `portfolio showcase`
- Subheadline contextual: `[what we love working on]`
- Itens:
  - Brand & Campaigns
  - Videos & Motions
  - Web Campaigns, Websites & Tech
- CTA intermediário: `let’s build something great →`

**Layout**
- Lista vertical
- Cada item ocupa 100% da largura
- Divisores horizontais finos (linha neon)
- Ícone circular com seta à direita

### Projects (Featured Projects)
- Grid editorial
- Cards grandes (imagem full-bleed)
- Tags (branding / campaign / website)
- Título + cliente
- CTA secundário: `view projects →`

---

## 3. Identidade Visual

- Fundo: gradiente escuro (`#040013 → #0b0d3a`)
- Dividers: azul neon / ciano
- Tipografia:
  - Headings: TT Norms Pro (Bold / Black)
  - Metadata: PPSupplyMono
- Cards usam contraste alto (imagem vibrante vs fundo escuro)

---

## 4. Interatividade & Animações

### Scroll / Entrada
- `whileInView`
- `opacity: 0 → 1`
- `y: 24 → 0`
- `duration: 0.6`
- `ease: cubic-bezier(0.22,1,0.36,1)`

### Services
- Hover:
  - Texto desliza levemente
  - Ícone rotaciona ~15°
  - Linha de divisão ganha glow
- Click:
  - Navegação interna ou scroll para Projects

### Projects
- Hover:
  - Image scale: `1 → 1.05`
  - Overlay gradient aparece
  - Texto sobe suavemente
- Cards maiores usam efeito *editorial parallax leve*

---

## 5. Responsividade

### Mobile (base)
- 1 coluna
- Textos centralizados
- Cards empilhados
- Imagens com `aspect-[4/5]`

### Tablet
- Services mantém lista vertical
- Projects: grid 2 colunas

### Desktop
- Services em full-width
- Projects:
  - Grid assimétrico
  - Cards grandes alternados
  - Tipografia maior e alinhamento à esquerda

---

## 6. Acessibilidade & SEO

- Headings semânticos:
  - Services: `<h2>`
  - Items: `<h3>`
- Cards como `<a>` focáveis
- `alt` descritivo em imagens
- Contraste WCAG AA+
- Navegação por teclado funcional
- Conteúdo textual indexável (não embutido em canvas)

---

## 7. Integrações / Recursos

- Nenhuma API externa
- Dados estáticos ou CMS-ready
- Cards reutilizáveis
- Preparado para filtros futuros

---

## 8. Considerações Técnicas (Stack)

### Componentes (Next.js App Router)

```
components/
  ServicesSection.tsx
  ServiceItem.tsx
  ProjectsSection.tsx
  ProjectCard.tsx
```

### Client vs Server
- Sections: **Server Components**
- Cards animados: **Client Components**

### Framer Motion
- Uso declarativo
- Variants para stagger

### Tailwind
- Theme extend:
  - colors.brand.blue
  - fontSize.display
  - spacing.section

### Exemplo de Variant

```ts
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}
```

---

## Checklist de Implementação

- [ ] Services ocupa viewport width
- [ ] Dividers com glow sutil
- [ ] Hover suave e consistente
- [ ] Projects grid responsivo
- [ ] Cards clicáveis e acessíveis
- [ ] Lighthouse ≥ 90

---

## Conclusão

As seções *Services* e *Projects* operam como um sistema editorial animado, com foco em ritmo, clareza e impacto visual. A implementação deve priorizar legibilidade, performance e microinterações intencionais — nunca decorativas.

Pronto para execução por agente autônomo.
