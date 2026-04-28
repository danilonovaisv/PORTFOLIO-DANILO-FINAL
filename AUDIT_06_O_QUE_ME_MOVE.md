# AUDIT_06_O_QUE_ME_MOVE.md

## 1. Diagnóstico Atual: O que está funcionando vs O que fere o Blueprint

### A. Verificação de Camadas (Z-Index)
*   **O que está funcionando:** O `BeliefFixedHeader` ("Acredito no design...") e os Textos Rotativos (`BeliefScrollText`) estão devidamente empilhados. O fundo está em `z-0` como prescrito. O `BeliefManifesto` está em um `z-[100]`.
*   **O que fere o Blueprint:**
    *   O `GhostScene` está definido como `z-[70]`. Pelo Blueprint, ele deveria estar na camada `z-50` (Abaixo do Manifesto `z-40`, na lógica do Blueprint original onde o Canvas fica em 50 e o resto antes, porém no Blueprint enviado, a ordem é: Fundo `z-0`, Overlay `z-10`, Header `z-20`, Textos `z-30`, Manifesto `z-40`, e Ghost 3D Canvas `z-50`). No código atual o Manifesto é `z-[100]` e o Canvas é `z-[70]`. Embora visualmente não quebre, difere da arquitetura rigorosa exigida.
    *   O Overlay de Transição (Camada 1 `z-10` com crossfade) **não está sendo utilizado** no container principal (`AboutBeliefsClient.tsx`). O componente `BeliefOverlay.tsx` existe no diretório, mas não foi inserido na árvore principal de renderização. O `BeliefBackground` muda de cor diretamente.

### B. Verificação de Motion e Sincronia
*   **O que está funcionando:**
    *   A troca de cores está sendo feita via interpolação HSL (`interpolateHSL`) de acordo com o `scrollYProgress`, não dependendo de timers externos, o que atende às premissas do Blueprint.
    *   A curva de aceleração para animações do Ghost e textos foi configurada utilizando o Ghost Ease correto `cubic-bezier(0.22, 1, 0.36, 1)`.
*   **O que fere o Blueprint:**
    *   **Flicker (Transição de cores):** Por não incluir o Overlay (`BeliefOverlay`), a transição entre as fases carece da Camada 1 (`opacity: 0 -> 1 -> 0`), podendo expor a quebra seca da cor de base durante as mudanças do array de cores.
    *   **Comportamento Mobile:** O movimento de saída mobile em `BeliefScrollText.tsx` utiliza o valor de movimento via interpolação `[30, 0, 0, -30]`. O Blueprint exige que no Mobile a lógica de saída seja explicitamente para a DIREITA (`x: "100%"`), e o texto deve se posicionar a 20% do bottom, o que atualmente é simulado através de offsets e paddings (`paddingBottom: isMobile ? '25vh' : undefined`), com saídas horizontais limitadas a pixels (`-30`), em vez de saídas absolutas para fora da tela.
    *   O `BeliefManifesto` atualmente não utiliza a escala de z-index definida no documento (`z-40`), extrapolando com `z-[100]`.

### C. Verificação de Performance e Reset
*   **O que está funcionando:** O WebGL `Canvas` na `GhostScene` está usando `frameloop="demand"` em conjunto com o `invalidate` baseado em eventos de movimento, economizando ciclos de processamento quando não há interações ativas. Existe tratamento para `prefersReducedMotion`.
*   **O que fere o Blueprint:**
    *   **Reset de viewport:** O componente pai não implementa nenhum reset imediato forçado que desmonte/recrie estados ou resete valores do R3F quando a seção sai ativamente da Viewport (`amount: 0`), ele apenas confia na leitura progressiva do `useScroll` (`[0,1]`).

---

## 2. Plano de Refatoração (Step-by-Step)

### Passo 1: Correção Rigorosa de Arquitetura Z-Index
- Alterar as definições de classes z-index para alinhar estritamente com a taxonomia do Blueprint:
  - Fundo (`BeliefBackground`): `z-0`
  - Inserir Overlay (`BeliefOverlay`): `z-10`
  - Header fixo (`BeliefFixedHeader`): `z-20`
  - Textos Rotativos (`BeliefScrollText`): `z-30`
  - Manifesto Final (`BeliefManifesto`): `z-40`
  - Ghost 3D Canvas (`GhostScene`): `z-50`

### Passo 2: Integração e Ajuste do Overlay de Transição
- Injetar `<BeliefOverlay scrollProgress={scrollYProgress} />` no componente pai `AboutBeliefsClient.tsx` acima do `BeliefFixedHeader`, passando o progresso do scroll para que seu mapeamento de fade-in/fade-out coincida com as quebras das `PHRASES`.

### Passo 3: Refatoração das Animações Mobile
- Em `BeliefScrollText.tsx`, refazer a interpolação do `movement`. Ao invés de valores em pixels simples (`[30, 0, 0, -30]`), o movimento mobile deve mapear o `x` de saída para `100%` da largura da tela (`"100%"` ou tamanho em `vw`).
- Corrigir o ancoramento vertical do mobile para exatamente `bottom: 20%` (ou `20vh` offset) conforme prescrito, de forma estrita no CSS do wrapper de texto.

### Passo 4: Implementar Lógica de Reset de Viewport
- Utilizar `useInView` ou `IntersectionObserver` no container em `AboutBeliefsClient.tsx`. Quando `inView` for false (após o usuário dar scroll para a próxima ou seção anterior), disparar um reset explícito (ex: chamando uma ação de reset na store global de beliefs ou forçando os valores do scrollProgress de volta ao estado neutro para evitar artefatos de renderização de componentes não desmontados).

---

## 3. Arquitetura de Arquivos Sugerida

A estrutura de arquivos atual (dentro de `src/components/sobre/beliefs/` e `src/components/sobre/3d/`) está satisfatoriamente modulada, não havendo mega componentes acoplados que precisem ser desmembrados com urgência. No entanto, sugere-se as seguintes modificações em nomenclatura/organização para ficar mais conciso:

```text
src/components/sobre/sections/beliefs/
├── BeliefsSection.tsx        // Renomear AboutBeliefsClient.tsx para BeliefsSection.tsx e colocar tudo nesta sub-pasta
├── BeliefBackground.tsx
├── BeliefOverlay.tsx         // Necessita ser reativado
├── BeliefFixedHeader.tsx
├── BeliefScrollText.tsx
├── BeliefManifesto.tsx
└── 3d/
    ├── GhostCanvas.tsx       // Renomear GhostScene.tsx para alinhar com o blueprint
    ├── GhostModel.tsx        // Extrair o model de dentro do arquivo da scene
    └── GhostErrorBoundary.tsx
```
