# 12-STICKY-CONTACT-CTA

## 0. Estrutura de arquivos da seção

- Arquivos principais:
  - `src/components/sobre/sections/StickyContactCTA.tsx`
- Dependências:
  - Framer Motion (`motion/react`)
  - Componente de botão customizado (`src/components/ui/AntigravityCTA.tsx`)
  - Hook de detecção de acessibilidade (`src/hooks/useMotionGate.ts`)

## 1. Objetivo da Página/Seção

Destravar a conversão ao longo da leitura da página Sobre (que é extensa e foca em storytelling) exibindo um botão de contato flutuante ("fale comigo"). Ele atua como um facilitador de ação contínua sem prejudicar a leitura do conteúdo narrativo.

## 2. Estrutura de Conteúdo

- **Botão de Ação:** Exibe a chamada para ação (CTA) "fale comigo".
- **Âncora de Redirecionamento:** Aponta diretamente para a seção de formulário `#contact` no rodapé da página.

## 3. Identidade Visual

- Utiliza o padrão visual definido pelo `AntigravityCTA` na variação `compact`.
- Acoplado ao sistema de profundidade z-index no nível de sobreposições (`z-[var(--z-layer-overlay)]`) para flutuar acima dos blocos informativos.

## 4. Interatividade & Animações

- **Framer Motion & AnimatePresence:**
  - Anima a aparição e o desaparecimento do botão com fade de opacidade e movimento vertical sutil (`y: 16px ➔ 0px`).
  - Transição baseada em `GHOST_EASE` (`[0.22, 1, 0.36, 1]`) e duração padrão do sistema.
- **Lógica de Visibilidade (Scroll Engine):**
  - **Ativação:** Torna-se visível apenas após o usuário rolar mais de 90% da viewport vertical inicial (ultrapassando a seção de Hero).
  - **Desativação Inteligente:** Oculta-se automaticamente no momento em que a seção principal de contato (`#contact`) entra no campo de visão, evitando poluição visual e repetição de botões de conversão lado a lado.
  - Controlado combinando eventos nativos de `scroll` e um `IntersectionObserver` com threshold de `0.15`.

## 5. Responsividade

- Fixado na borda inferior direita (`fixed bottom-6 right-4 sm:bottom-8 sm:right-8`) para posicionamento ergonômico no uso com uma só mão em smartphones.

## 6. Acessibilidade & SEO

- **Reduced Motion:**
  - Desativa a oscilação vertical em `y` e a animação de saída de translação sob preferência de animações reduzidas do usuário.
- **Teclado:**
  - Botão indexável e focado de forma lógica, sem prender o foco ou impedir a rolagem nativa.

## 7. Integrações ou Recursos Especiais

- **Google Analytics / GTM:**
  - Ao ser clicado, dispara um evento customizado de telemetria no `gtag` ou `dataLayer` com o rótulo `cta_click` e localização `sobre_sticky` para mensurar a taxa de engajamento do botão persistente.
