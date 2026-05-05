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
  - RESOLVIDO: O bloco agora flutua diretamente sobre o vídeo (sem painel escuro sólido) e a lista foi refatorada para usar divisórias horizontais em azul com números simples ("0X"), seguindo exatamente a referência visual.
- Inconformidade 2 (Média): reduced-motion para vídeo
  - O texto respeita motion gate, mas o vídeo permanece com `autoPlay/loop` mesmo para usuários com `prefers-reduced-motion`.
- Inconformidade 3 (Baixa): semântica da lista
  - Protótipo recomenda `<ul>/<li>`; implementação utiliza `div`.
- Conformidade parcial:
  - Estrutura textual e narrativa estão corretas.

## 13. Estado Implementado — 2026-04-16

- Ajuste editorial aplicado em `src/components/sobre/sections/AboutMethod.tsx`:
  - o conteúdo deixou de entrar tarde demais na viewport e passou a abrir a seção com presença imediata;
  - o bloco principal agora usa um único painel escuro translúcido com borda sutil, reforçando a exceção controlada “texto sobre vídeo” prevista no protótipo;
  - a lista de etapas passou a operar como sequência técnica dentro do painel, com separação por linhas e marcador azul consistente, em vez de competir com o vídeo de fundo.
- Resultado esperado após esta rodada:
  - desktop com leitura estável no primeiro viewport útil da seção;
  - mobile/tablet com contraste mais seguro e hierarquia mais clara;
  - vídeo continua como base visual, mas não mais como superfície dominante vazia.

## 14. Estado Implementado — 2026-04-16 (legibilidade)

- Refinamento adicional aplicado em `src/components/sobre/sections/AboutMethod.tsx`:
  - o painel principal deixou de usar `backdrop-blur`, passando a depender de opacidade alta (`rgba(4,0,19,0.9)`) para contraste;
  - a leitura do heading e do texto de apoio ficou ancorada em superfície sólida, em linha com a regra global do projeto de evitar blur excessivo em conteúdo editorial;
  - o reduced-motion permanece respeitado no vídeo (`autoPlay/loop` desligados quando motion está bloqueado).

## 15. Estado Implementado — 2026-04-21 (Alinhamento de Design)

- Refatoração visual aplicada em `src/components/sobre/sections/AboutMethod.tsx` para corresponder à referência visual (`05-COMO-EU-TRABALHO-DESKTOP.jpg`):
  - **Vídeo Full-Bleed:** Removida a restrição de `max-w` do contêiner do vídeo, permitindo que ele ocupe todas as laterais da página.
  - **Remoção do Painel Sólido:** O background escuro sólido (`rgba(4,0,19,0.9)`) e as bordas arredondadas do contêiner de texto foram removidos. O conteúdo agora repousa sobre a camada de gradiente escuro global, melhorando a imersão.
  - **Lista em Formato de Tabela:** O visual das etapas foi atualizado com divisórias horizontais em azul (`border-bluePrimary/30`). Os marcadores de etapa deixaram de ser "badges" arredondados e agora utilizam texto simples em formato "0X" (ex: 01, 02), em harmonia com a estética técnica da referência.

## 16. Estado Implementado — 2026-05-05 (Grid e Container)

- `AboutMethod.tsx` preserva `.std-grid` como único contrato de container da seção.
- A malha interna `lg:grid lg:grid-cols-12` foi removida para evitar duplicação estrutural de grid/container; o conteúdo desktop agora usa `lg:flex-row`, `lg:ml-[8.333333%]` e `lg:w-1/2`, preservando a leitura equivalente às colunas 2-7.
- O padding horizontal interno do bloco de texto foi removido, deixando o espaçamento lateral sob controle do `.std-grid`.
- Validação Playwright confirmou `hasNestedGrid = false` e `overflow-x = 0` em mobile, tablet, desktop e wide.
