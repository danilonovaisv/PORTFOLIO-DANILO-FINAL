# 01-HEADER

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/header/SiteHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.module.css`
  - `src/components/layout/header/MobileStaggeredMenu.tsx`
  - `src/components/layout/header/mobile/MobileHeaderBar.tsx`
  - `src/components/layout/header/mobile/MobileMenuPanel.tsx`
  - `src/components/layout/header/mobile/MobileMenuButton.tsx`
  - `src/config/navigation.ts`
- Dependências:
  - `next/navigation`, `next/image`, `next/link`
  - Framer Motion (`framer-motion`)
  - `useActiveSection`, `useMediaQuery`, `useMobileMenuAnimation`
  - R3F dinâmico no desktop (`HeaderGlassCanvas` via `dynamic(..., { ssr: false })`)
  - Assets dinâmicos (`useSiteAssetUrl`, `SITE_ASSET_KEYS`)
- Padrão arquitetural:
  - Header canônico com estratégia responsiva: desktop e mobile desacoplados.
  - Navegação dirigida por config (`NAVIGATION.header`) com roteamento e âncoras híbridas.
- Observações sobre coesão e acoplamento:
  - Boa coesão por dispositivo.
  - Acoplamento médio com camada de animação mobile (hook extenso) e com runtime de assets.

## 1. Objetivo da Página/Sessão

Garantir navegação global do portfólio com foco em transição fluida entre rotas e âncoras, mantendo identidade visual Ghost e suporte completo a desktop/mobile.

## 2. Estrutura de Conteúdo

- Headings:
  - Não possui heading próprio, atua como navegação global (`nav`).
- Hierarquia semântica:
  - `header` + `nav` corretamente presentes.
  - Links/botões de navegação com estado ativo visual.
- Textos principais:
  - Itens: `home`, `sobre`, `portfólio`, `contato`.
- CTA’s:
  - Navegação primária para rotas e anchor `#contact`.
- Fonts utilizadas:
  - Família global via `Manrope` (herdada de `globals.css`).
- Peso das fontes:
  - Itens com `font-medium`/`font-semibold` conforme estado.
- Tokens aplicados:
  - `bluePrimary`, `blueAccent`, `background` e efeitos glass.
- Densidade de informação:
  - Baixa, orientada à orientação do usuário.

## 3. Identidade Visual

- Cores aplicadas:
  - Fundo translúcido escuro + destaques em `#0048ff` e `#4fe6ff`.
- Gradientes:
  - Camada glass via WebGL (`HeaderGlassCanvas`) e fundo blur.
- Backgrounds:
  - Estado `headerDark`/`headerLight` com variações de opacidade e borda.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado no uso de atmosfera escura + acentos elétricos.
- Uso de contraste:
  - Em geral adequado; estados inativos (`text-white/70`) ainda legíveis em fundo escuro.
- Coerência tipográfica:
  - Consistente com sistema global.

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Presente no mobile (`MobileHeaderBar`, painel e botões).
- Variants:
  - Header mobile entra com `y` e blur; menu panel possui transições de itens.
- Scroll animations:
  - Destaque de seção ativa via `useActiveSection`.
- Microinterações:
  - Underline animado desktop, hover e active states.
- Riscos de layout shift:
  - Baixo no desktop.
  - Médio no mobile por animações iniciais de entrada do header.
- Impacto em performance:
  - Moderado no desktop por canvas R3F no header.

## 5. Responsividade

- Desktop:
  - Header fixo com largura ampliada (`w-[calc(100%+5rem)]`).
- Tablet:
  - Comportamento mobile até `lg`.
- Mobile:
  - Menu fullscreen com foco trap e safe-area.
- Breakpoints:
  - Principal switch em `lg`.
- Grid/Flex:
  - Flex com container padrão (`std-grid`).
- Overflow:
  - Painel mobile cobre viewport inteira sem overflow lateral.
- CLS potencial:
  - Baixo a médio por animação de entrada do header mobile.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - `header`/`nav` corretos.
- ARIA:
  - `aria-label`, `aria-expanded` e `aria-hidden` aplicados.
- Alt em imagens:
  - Logo com `alt="Danilo"`.
- Navegação por teclado:
  - Foco visível configurado; foco trap no menu mobile.
- Contraste (WCAG):
  - Majoritariamente adequado.
- Heading structure:
  - Neutro (header sem heading próprio).
- Meta tags:
  - Não aplicável direto ao componente.
- SEO técnico:
  - Navegação limpa e indexável.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não há uso direto na sessão.
- Supabase:
  - Asset runtime para logo (`useSiteAssetUrl`).
- APIs externas:
  - Links sociais externos.
- SSR/CSR:
  - Componente client-side.
- Lazy loading:
  - Canvas desktop carregado por import dinâmico (`ssr: false`).
- Suspense:
  - Não aplicado diretamente.

## 8. Considerações Técnicas

- Performance:
  - Ponto de atenção no canvas do header desktop.
- Bundle size:
  - Framer Motion + canvas no header elevam custo inicial.
- Code splitting:
  - Bom uso em `HeaderGlassCanvas`.
- Reusabilidade:
  - Alta por separação desktop/mobile.
- Testabilidade:
  - Média; lógica de menu poderia ter testes de a11y/foco dedicados.
- Escalabilidade:
  - Boa para crescimento de itens de navegação.
- Débito técnico:
  - Duplicação de estados/efeitos entre componentes mobile.
- Recomendações arquiteturais:
  - Extrair contrato de acessibilidade mobile (foco trap + ESC) para utilitário compartilhado.
  - Considerar fallback estático do header canvas em dispositivos com baixa capacidade gráfica.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**

| Componente  | Descrição                                                 | Estados                        | Interações                          | Status        |
| ----------- | --------------------------------------------------------- | ------------------------------ | ----------------------------------- | ------------- |
| Botão CTA   | Ações primárias de navegação no topo (links prioritários) | Default, Hover, Focus, Active  | Navegação entre rotas e âncora      | Implementado  |
| Modal       | Não aplicável no header                                   | N/A                            | N/A                                 | Não se aplica |
| Formulário  | Não aplicável no header                                   | N/A                            | N/A                                 | Não se aplica |
| Slider      | Não há slider funcional no header                         | N/A                            | N/A                                 | Não se aplica |
| Menu Mobile | Menu colapsável com trap de foco e fechamento por Esc     | Closed, Opening, Open, Closing | Clique, teclado, outside click, Esc | Implementado  |

🔄 **Estados e Transições:**

- Hover: Links e gatilho de menu aplicam feedback visual sem deslocamento de layout.
- Focus: Foco visível em links e botão do menu mobile com navegação por teclado.
- Loading: Header renderiza sem bloquear paint; canvas decorativo em carga progressiva.
- Error: Fallback para header sem efeitos 3D quando WebGL indisponível.
- Success: Menu abre/fecha com transição fluida e restauração de foco.

## 10. Estrutura de Páginas e Navegação

- Escopo global: navegação primária para `/`, `/sobre`, `/portfolio` e âncora `#contact`.
- Entrada para menu mobile com foco em navegação por teclado e fechamento por `Esc`.
- Dependência da configuração central de navegação (`src/config/navigation.ts`).

## 11. Informações Relevantes para Compreensão da Sessão

- Referência visual esperada: `.context/HOME-PORTFOLIO-BLACK---GHOST.jpg`.
- Ponto crítico arquitetural: evitar duplicidade de landmarks `<main>` entre layout raiz e client layout.

## 12. Atualização de Estado — 2026-03-08

- `SiteHeader.tsx` passou a resolver explicitamente os dois assets de marca do header:
  - `SITE_ASSET_KEYS.logos.headerLight`
  - `SITE_ASSET_KEYS.logos.headerDark`
- A troca de logo agora acompanha `isOnLightSection`, preservando contraste quando o header atravessa fundos claros.
- `DesktopFluidHeader.tsx` e `MobileHeaderBar.tsx` usam sizing estável com `img` nativa e `object-contain`, evitando o desaparecimento/corte do logo observado no runtime.
- Validação em build (`next start`) confirmou o logo desktop visível com caixa estável de aproximadamente `150x47px`.
