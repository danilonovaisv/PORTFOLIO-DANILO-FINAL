# 02-HERO-MANIFESTO

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/sobre/sections/AboutHero.tsx`
  - `src/config/content.ts` (`ABOUT_CONTENT.hero`)
  - `src/components/ui/shared/DynamicAssetVideo.tsx`
  - `src/hooks/useMotionGate.ts`
- Dependências:
  - Framer Motion (`motion`, `useScroll`, `useSpring`, `useTransform`)
  - Assets dinâmicos via `SITE_ASSET_KEYS.heroVideos.aboutDesktop/aboutMobile`
- Padrão arquitetural:
  - Hero com vídeo de fundo + overlay + bloco de texto manifesto.

## 1. Objetivo da Página/Sessão

Abrir a página `/sobre` com presença editorial silenciosa, apresentando posicionamento e assinatura verbal de Danilo Novais.

## 2. Estrutura de Conteúdo

- Headings:
  - `h1` existe em `sr-only` (concatenação de título e manifesto).
- Texto principal (desktop):
  - “Sou Danilo Novais.”
  - “Você não vê tudo o que eu faço. Mas sente quando funciona.”
- Subtexto:
  - Descrição em 3 linhas com proposta de valor.
- CTA:
  - Não há CTA direto no hero (conforme proposta narrativa).

## 3. Identidade Visual

- Mídia:
  - Vídeo desktop e mobile via Supabase (dinâmico).
- Overlay:
  - Desktop: `bg-background/60` com gradiente lateral adicional.
  - Mobile: gradiente vertical escuro sobre vídeo.
- Consistência Ghost:
  - Linguagem visual muito aderente às referências de imagem.

## 4. Interatividade & Animações

- Framer Motion:
  - Entrada com `opacity + blur + translateY`.
- Scroll:
  - Parallax leve no vídeo mobile (`mediaY`).
- Reduced motion:
  - Vídeo deixa de autoplay/loop com `useMotionGate`.

## 5. Responsividade

- Desktop:
  - Composição em 12 colunas com espaço negativo (1-6 vazias, texto 7-12).
- Mobile:
  - Vídeo em `aspect-square` + bloco textual abaixo.
- Breakpoints:
  - Chave de layout em `lg`.

## 6. Acessibilidade & SEO

- Semântica:
  - `section` com `aria-label` e `h1` para leitores de tela.
- Legibilidade:
  - Contraste geral alto.
- SEO:
  - Conteúdo textual essencial presente no DOM.

## 7. Integrações ou Recursos Especiais

- `DynamicAssetVideo` com fallback.
- Gate central de movimento via store global + `prefers-reduced-motion`.

## 8. Considerações Técnicas

- Performance:
  - Boa estratégia de fallback, mas hero continua componente client-heavy.
- Reusabilidade:
  - Estrutura clara e separada de conteúdo/configuração.

## 9. Componentes Interativos

| Componente         | Descrição       | Estados         | Interações                      | Status       |
| ------------------ | --------------- | --------------- | ------------------------------- | ------------ |
| Vídeo Hero Desktop | Fundo imersivo  | Loading, Ready  | Autoplay/loop condicional       | Implementado |
| Vídeo Hero Mobile  | Fundo mobile    | Loading, Ready  | Parallax + autoplay condicional | Implementado |
| Bloco de Manifesto | Texto principal | Hidden, Visible | Reveal por viewport             | Implementado |

## 10. Estrutura de Páginas e Navegação

- Primeiro bloco narrativo após Header.
- Conecta para Origem sem ruptura visual por gradiente inferior.

## 11. Informações Relevantes para Compreensão da Sessão

- Protótipo define hero como exceção controlada de texto sobre vídeo.
- Imagens de referência confirmam estrutura: vídeo + texto com destaque em azul.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Média): força do overlay no desktop
  - Regra do documento: evitar texto sobre mídia sem cobertura escura forte (80%+).
  - Implementação atual usa parte do plano com `bg-background/60`; nas áreas menos escuras do gradiente pode reduzir margem de legibilidade.
- Inconformidade 2 (Baixa): hierarquia visual explícita do H1
  - Protótipo descreve H1 visível como elemento central.
  - Implementação usa H1 semântico em `sr-only` e texto visual em `div/p`.
- Conformidade forte:
  - Sem CTA intrusivo.
  - Frases-chave e estética geral muito próximas das referências visuais.
