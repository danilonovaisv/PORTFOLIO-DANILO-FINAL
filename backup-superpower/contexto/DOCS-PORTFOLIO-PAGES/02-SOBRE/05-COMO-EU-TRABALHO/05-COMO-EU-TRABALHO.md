# 05-COMO-EU-TRABALHO

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/sobre/sections/AboutMethod.tsx`
- Dependências:
  - Framer Motion (`motion`, `useScroll`, `useTransform`, `useSpring`)
  - `useMotionGate`, `useMediaQuery`
  - Conteúdo em `ABOUT_CONTENT.method`

## 1. Objetivo da Página/Sessão

Traduzir processo criativo em método prático, gerando confiança através de clareza operacional.

## 2. Estrutura de Conteúdo

- Título:
  - “Criatividade com método. Impacto sem ruído.”
- Intro:
  - Três linhas sobre intenção, lógica e silêncio.
- Lista:
  - 6 etapas de processo.
- Mídia:
  - Vídeo de fundo desktop/mobile.

## 3. Identidade Visual

- Fundo com vídeo + overlay escuro.
- Texto predominante branco com destaque em azul.
- Cards/lista com linguagem mais técnica.

## 4. Interatividade & Animações

- Texto com parallax vertical sutil.
- Lista com stagger de entrada.
- Hover em itens de processo com leve realce.

## 5. Responsividade

- Desktop:
  - Colunas dedicadas para conteúdo (2-7) e área visual (8-12).
- Mobile:
  - Conteúdo em coluna única sobre vídeo.

## 6. Acessibilidade & SEO

- Uso de heading e textos legíveis.
- Desktop mantém `track` de captions; mobile remove legendas embutidas por regra global.
- Contraste adequado no conteúdo textual.

## 7. Integrações ou Recursos Especiais

- Vídeo com fallback poster.
- Ajuste por dispositivo via `useMediaQuery`.

## 8. Considerações Técnicas

- Sessão visualmente robusta, dependente de render de vídeo.
- Estrutura simples e de boa manutenção.

## 9. Componentes Interativos

| Componente      | Descrição             | Estados         | Interações     | Status       |
| --------------- | --------------------- | --------------- | -------------- | ------------ |
| Vídeo de Fundo  | Base visual da sessão | Loading, Ready  | Autoplay/loop  | Implementado |
| Bloco de Método | Conteúdo textual      | Hidden, Visible | Scroll/reveal  | Implementado |
| Lista de Etapas | 6 itens operacionais  | Idle, Hover     | InView + hover | Implementado |

## 10. Estrutura de Páginas e Navegação

- Quarta sessão da narrativa.
- Liga posicionamento autoral com racionalidade de execução.

## 11. Informações Relevantes para Compreensão da Sessão

- Protótipo define esta seção como exceção controlada de texto sobre vídeo (em card escuro).

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Alta): formato dos cards de processo no desktop
  - Protótipo especifica cards com fundo escuro translúcido + borda esquerda azul.
  - Implementação desktop usa linhas com `border-bottom` e fundo majoritariamente transparente.
- Inconformidade 2 (Média): reduced-motion para vídeo
  - O texto respeita motion gate, mas o vídeo permanece com `autoPlay/loop` mesmo para usuários com `prefers-reduced-motion`.
- Inconformidade 3 (Baixa): semântica da lista
  - Protótipo recomenda `<ul>/<li>`; implementação utiliza `div`.
- Conformidade parcial:
  - Estrutura textual e narrativa estão corretas.
