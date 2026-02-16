# 01-HEADER

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/header/SiteHeader.tsx`
  - `src/components/layout/header/DesktopFluidHeader.tsx`
  - `src/components/layout/header/mobile/MobileHeaderBar.tsx`
  - `src/components/layout/header/mobile/MobileMenuPanel.tsx`
  - `src/config/navigation.ts`
- Dependências:
  - `next/link`, `next/navigation`
  - Framer Motion e GSAP no fluxo mobile
- Padrão arquitetural:
  - Header global reutilizado em `/`, `/sobre`, `/portfolio`.

## 1. Objetivo da sessão

Garantir navegação global consistente para a página `/portfolio`, mantendo continuidade visual com Home/Sobre e foco no CTA para contato.

## 2. Estrutura de conteúdo

- Semântica: `header` + `nav`.
- Itens principais: Home, Sobre, Portfólio, Contato.
- Estado ativo esperado em `/portfolio`.

## 3. Identidade visual

- Fundo translúcido escuro sobre hero em vídeo.
- Destaque em azul para item ativo.
- Consistência boa com o Ghost Design System.

## 4. Interatividade e animações

- Desktop: transições leves de cor/estado.
- Mobile: overlay com abertura/fechamento animados.
- Regra Ghost: preferir motion discreto, sem ruído.

## 5. Responsividade

- Desktop: barra horizontal.
- Mobile: menu fullscreen com foco visível e fechamento por `Esc`.

## 6. Acessibilidade e SEO

- Navegação por teclado funcional.
- ARIA em botões de menu mobile.
- Estrutura semântica adequada para navegação global.

## 7. Integrações

- Integração com âncora `#contact` no fluxo de conversão.
- Consumo de config central (`navigation.ts`).

## 8. Considerações técnicas

- Boa reusabilidade.
- Acoplamento médio com animação mobile.

## 9. Inconformidades observadas

- Inconformidade média: nomenclatura de item de menu deve permanecer consistente com a estratégia de branding adotada no projeto.
- Inconformidade baixa: revisar qualquer `scale` residual em ações de UI mobile para aderência estrita às Ghost rules.
