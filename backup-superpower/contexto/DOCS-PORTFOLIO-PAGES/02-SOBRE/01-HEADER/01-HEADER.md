# 01-HEADER

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/header/SiteHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.tsx`
  - `src/components/layout/header/MobileStaggeredMenu.tsx`
  - `src/components/layout/header/mobile/MobileHeaderBar.tsx`
  - `src/components/layout/header/mobile/MobileMenuPanel.tsx`
  - `src/components/layout/header/mobile/MobileMenuButton.tsx`
  - `src/hooks/useMobileMenuAnimation.ts`
  - `src/config/navigation.ts`
- Dependências:
  - `next/navigation`, `next/image`, `next/link`
  - Framer Motion (`framer-motion`)
  - GSAP (`gsap`) no menu mobile
  - `useMotionGate`, `useActiveSection`, `useMediaQuery`
- Padrão arquitetural:
  - Header único para todo o site, com estratégia desktop/mobile separada.
  - Navegação orientada por configuração (`NAVIGATION.header`).
- Observações sobre coesão e acoplamento:
  - Boa coesão por dispositivo.
  - Acoplamento médio com animações GSAP no mobile.

## 1. Objetivo da Página/Sessão

Garantir navegação global consistente na `/sobre`, preservando leitura fluida da narrativa e acesso rápido para Home, Sobre, Portfólio e Contato.

## 2. Estrutura de Conteúdo

- Headings:
  - Não possui heading próprio (componente de navegação global).
- Hierarquia semântica:
  - `header` + `nav` corretos.
- Textos principais:
  - `home`, `sobre`, `portfólio`, `contato`.
- CTA’s:
  - Navegação primária para rotas e âncora `#contact`.
- Fonts utilizadas:
  - Herda tipografia global (`Manrope`).
- Tokens aplicados:
  - Predominância de `bluePrimary`, `blueAccent`, fundo escuro translúcido.

## 3. Identidade Visual

- Cores aplicadas:
  - Header escuro translúcido com acento azul.
- Backgrounds:
  - Glass/translucent com variação em seções claras (`data-light-section`).
- Consistência com GHOST-DESIGN-SYSTEM:
  - Boa, com destaque discreto e foco em legibilidade.
- Uso de contraste:
  - Bom contraste em desktop e mobile.

## 4. Interatividade & Animações

- Framer Motion:
  - Entrada do header mobile (`MobileHeaderBar`).
- GSAP:
  - Timeline de abertura/fechamento do menu mobile (`useMobileMenuAnimation`).
- Microinterações:
  - Substituição visual “Menu/Close”, ícone +/X animado, estados ativos.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Médio no mobile por timeline completa + blur.

## 5. Responsividade

- Desktop:
  - Navegação horizontal fluida.
- Mobile:
  - Menu fullscreen com trap de foco e fechamento por `Esc`.
- Breakpoints:
  - Alternância principal em `lg`.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - `header`, `nav`, botões e links corretos.
- ARIA:
  - `aria-expanded`, `aria-label`, `aria-hidden` aplicados.
- Navegação por teclado:
  - Foco inicial no menu e focus trap implementado.
- Contraste:
  - Em conformidade geral com leitura adequada.

## 7. Integrações ou Recursos Especiais

- Assets dinâmicos:
  - Logo via `useSiteAssetUrl`.
- Runtime:
  - `useExperience` e detecção de seções claras para ajuste visual.

## 8. Considerações Técnicas

- Performance:
  - Mobile menu com animações robustas; custo aceitável para baixa frequência de uso.
- Reusabilidade:
  - Alta, por divisão clara de componentes.
- Débito técnico:
  - Complexidade do hook `useMobileMenuAnimation` dificulta manutenção.

## 9. Componentes Interativos

| Componente        | Descrição        | Estados                        | Interações                  | Status       |
| ----------------- | ---------------- | ------------------------------ | --------------------------- | ------------ |
| Navegação Desktop | Links principais | Default, Hover, Active         | Clique e scroll para âncora | Implementado |
| Menu Mobile       | Overlay completo | Closed, Opening, Open, Closing | Clique, Esc, outside click  | Implementado |
| Botão do Menu     | Troca Menu/Close | Idle, Active                   | Clique/tap                  | Implementado |

## 10. Estrutura de Páginas e Navegação

- Fluxo principal:
  - Home (`/`)
  - Sobre (`/sobre`)
  - Portfólio (`/portfolio`)
  - Contato (`#contact`)
- Comportamento esperado do protótipo:
  - Header idêntico ao da Home com destaque de página ativa em Sobre.

## 11. Informações Relevantes para Compreensão da Sessão

- Referências:
  - `.context/SOBRE-PROTOTIPO-INTERATIVO.md`
  - `.context/SOBRE-PORTFOLIO-BLACK---GHOST.jpg`
  - `.context/SOBRE-MOBILE-BLACK---GHOST.jpg`

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Média): item de navegação
  - Esperado: `Portfólio do Acaso`.
  - Implementado: `portfólio` (`src/config/navigation.ts`).
- Inconformidade 2 (Baixa): motion proibido no UI mobile
  - Há `hover:scale-105` e `active:scale-95` em ícones sociais do painel mobile (`src/components/layout/header/mobile/MobileMenuPanel.tsx`).
  - O protótipo da página Sobre recomenda evitar `scale/bounce/rotate` no conteúdo UI.
- Conformidade parcial:
  - Destaque de página ativa e overlay de menu fullscreen estão alinhados com o esperado.
