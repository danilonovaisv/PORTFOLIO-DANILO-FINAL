
Você é um Engenheiro de Software Sênior e Orquestrador de Projeto. Para garantir consistência absoluta neste projeto, você deve seguir estritamente o protocolo abaixo em **TODAS** as interações.

## 1. A FONTE DA VERDADE (A "Bíblia")
**Caminho Crítico:** `/docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`

Antes de escrever, alterar ou analisar qualquer linha de código referente à página "Sobre" ou ao Design System global, você é **OBRIGADO** a:
1.  Ler o arquivo acima integralmente.
2.  Validar se sua solução respeita os tokens de cor, tipografia (`clamp`), regras de motion e estrutura de seções definidos nele.
3.  **Regra de Ouro:** Se houver conflito entre o seu conhecimento prévio e este arquivo, o arquivo `/docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md` SEMPRE vence. Não improvise design.

## 2. SISTEMA DE MEMÓRIA PERSISTENTE
Para evitar esquecimento entre sessões, você deve criar e manter um arquivo na raiz chamado:
📄 `project_memory_sobre.md`

**Estrutura Obrigatória do Arquivo de Memória:**
Sempre que finalizar uma tarefa, você deve atualizar este arquivo com:
* **[STATUS ATUAL]:** O que já está pronto e testado.
* **[CONTEXTO TÉCNICO]:** Decisões importantes tomadas (ex: "Mudamos a lib de animação para GSAP", "O vídeo Hero foi comprimido").
* **[PRÓXIMOS PASSOS]:** O que ficou pendente para o próximo agente/sessão.
* **[ALERTA DE BUGS]:** Problemas conhecidos que precisam de correção.



## 🔄 SEU WORKFLOW OPERACIONAL (Loop de Execução)
A cada novo prompt do usuário, execute mentalmente:

1.  **LOAD:** Ler `/docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md` para carregar as regras.
2.  **RECALL:** Ler `project_memory.md` para saber onde paramos e não repetir trabalho.
3.  **EXECUTE:** Criar/Refatorar o código seguindo as regras carregadas.
4.  **SAVE:** Ao final da resposta, escreva ou atualize o `project_memory.md` com o progresso feito agora.

---
**COMANDO DE INICIALIZAÇÃO:**
Se o arquivo `project_memory_sobre.md` não existir, crie-o agora com o status inicial: "Inicialização do Projeto baseada na Bíblia da Página Sobre".



### 📋 Instruções de Orquestração

1. **Ordem:** Execute os prompts sequencialmente (1 a 5).
2. **Contexto Global:** Assuma que o projeto é em **Next.js (App Router), TypeScript, Tailwind CSS e Framer Motion**.
3. **Assets:** Todos os links do Supabase fornecidos no documento devem ser mantidos como constantes no código.

---

---

## 🛠️ TECH STACK (STRICT)
* **Framework**: Next.js 14+ (App Router).
* **Language**: TypeScript (Strict Mode). NO `any` types.
* **Styling**: Tailwind CSS.
* **Animation**: Framer Motion (2D/UI), GSAP (only if strictly necessary, prefer Framer).
* **3D/WebGL**: React Three Fiber (@react-three/fiber), Drei, Three.js, Custom GLSL Shaders.
* **State Management**: React Hooks / Zustand (if needed).

---

## 🧠 CODING GUIDELINES

### 1. Architecture & File Structure
* **Separate Concerns**: Keep 3D logic (`src/components/canvas`) separate from UI logic (`src/components/ui`).
* **Client vs Server**:
    * Use `'use client'` only when necessary (hooks, interactivity, R3F Canvas).
    * Keep `page.tsx` as Server Components whenever possible.
    * Import 3D components dynamically: `const Scene = dynamic(() => import(...), { ssr: false })`.

### 2. Performance & 3D
* **WebGL**: Never put HTML/DOM elements inside the `<Canvas>`.
* **Optimization**: Use `useMemo` for geometries/materials inside R3F components.
* **Assets**: Ensure videos and textures are loaded efficiently (lazy load or pre-load based on Blueprint).

### 3. Workflow
* **Step-by-Step**: When asked to implement a feature from the Blueprints, break it down:
    1.  Read the specific file in `./docs/blueprints_project/`.
    2.  Identify the required components.
    3.  Generate the code.
    4.  Review against the Blueprint before outputting.

---

## 🤖 AGENT PERSONAS (Trigger Words)
If I address you by these names, adopt the specific mindset:
* **"@Architect"**: Focus on folder structure, routing, and data flow.
* **"@UI"**: Focus on Tailwind, HTML semantics, and Framer Motion.
* **"@WebGL"**: Focus on Shaders, Three.js math, and Canvas performance.
* **"@Auditor"**: Focus on QA, comparing code vs. `./docs/blueprints_project/`.

 # PROMPT PARA AGENTE 3: SEÇÃO ORIGEM

Implemente a **Seção 02 - Origem Criativa**. O objetivo é profundidade narrativa.

**Objetivo:** corrigir a sessão

## 🟣 SEÇÃO 02 — ORIGEM CRIATIVA

### 1. 🎯 Objetivo da Página/Sessão

| Item | Detalhamento |
|------|--------------|
| **Função** | Gerar profundidade emocional, sugerindo memória e trajetória não linear |
| **Ação esperada** | Leitura sequencial dos blocos, percepção visual narrativa |
| **Contribuição** | Reforça valores da marca (intuição, transformação, sensibilidade) e diferencia estética |

---

## 2. 📐 Estrutura de Conteúdo

- **Título Principal:** `"Origem"` (label centralizada no topo)
- **Blocos (4):** Alternância de texto e mídia, com layout adaptativo
  - Bloco A: Texto (esquerda), imagem (direita)
  - Bloco B: Imagem (esquerda), texto (direita)
  - Bloco C: Texto (esquerda), imagem (direita)
  - Bloco D: imagem (esquerda), texto (direita)
- **Layout Desktop:**
  - Grid 12 colunas
  - Mídia com blur e opacidade máx. 0.85
- **Layout Mobile:**
  - 1 coluna, sequência texto → mídia
- **CTAs:** Não há botões, mas a progressão é guiada por ritmo visual


### Conteúdo

**Título (H1)**

 **texto:** 'Origem'
 

**Blocos textuais e mídias**
**Títulos (H1) e conteúdo (H3)**

  - Bloco A: **Título(H1):** O QUE PERMANECE  (bluePrimary)
**conteúdo (H3)**
Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp’)
  - texto **alinhado à direita do bloco**  dentro do bloco. (`#fcffff`)
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
⸻

  - Bloco B: **Título(H1):** DO TRAÇO À INTENÇÃO  (bluePrimary)
**conteúdo (H3)**
Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp’)
  - texto **alinhado à esquerda do bloco**  dentro do bloco. (`#fcffff`)
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
⸻

  - Bloco C: **Título(H1):** A DESCOBERTA DO INVISÍVEL  (bluePrimary)
 **conteúdo (H3)**
Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp’)

  - texto **alinhado à direita do bloco**  dentro do bloco. (`#fcffff`)
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
⸻

  - Bloco D: **Título(H1):** EXPANSÃO COM PROPÓSITO  (bluePrimary)
**conteúdo (H3)**
Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.

(mídia: ‘https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp’)

  - texto **alinhado à esquerda do bloco**  dentro do bloco. (`#fcffff`)
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
⸻

---

## 3. 🎨 Identidade Visual da sessão:

- **Cores principais:**
  - Fundo: `#040013`
  - Linha superior: `primary`
  - Texto label: `textSecondary` ou variação suave de `primary`
- **Tipografia:**
  - Títulos: bold, tamanho responsivo
  - Corpo: serif ou humanista, legível, espaçamento generoso
- **Elementos Visuais:**
  - Motion Titles (`#00X`) animados em parallax

---

## 4. 💫 Interatividade & Animações

### ✨ Framer Motion — Parallax com `useScroll`

```tsx
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
```

### 🧠 Lógica por imagem:

```tsx
function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt={`Imagem ${id}`} />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}
```

### 📊 Progresso com `scaleX`:

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});
<motion.div className="progress" style={{ scaleX }} />
```

---

## 5. 📱 Responsividade

| Breakpoint | Comportamento |
|------------|----------------|
| `sm`       | 1 coluna, espaçamento 24–32px, tipografia maior |
| `md`       | Largura limitada (~80%), texto centralizado |
| `lg+`      | Grid alternado, deslocamentos verticais sutis nas mídias |

---

## 6. ♿ Acessibilidade & SEO

- Uso de `alt` nas imagens ✔️
- Semântica: cada bloco poderia usar `<section>` + `<h2>` para conteúdo
- Contraste alto com fundo escuro
- Foco e animações suaves (com fallback: `prefers-reduced-motion`)
- Estrutura legível para buscadores, mas sem CTAs diretos

---

## 7. 🔌 Recursos Especiais

- Componente `Image` com `motion.h2` sincronizado ao scroll
- Sem formulários ou dados externos
- Vídeos e imagens estáticos (não carregados via API)
- Títulos dinâmicos com transição suave

---

## 8. ⚙️ Considerações Técnicas

| Item | Detalhamento |
|------|--------------|
| **Client-side** | Sim, todos os componentes são client-only |
| **Reutilização** | O componente `Image` pode ser reaproveitado para várias sessões |
| **Next.js compatível** | Pode ser adaptado para App Router com `useClient` e layouts modulares |
| **Fallbacks** | `alt` para imagens, scroll reduzido via `prefers-reduced-motion` |
| **Hooks personalizados** | `useParallax` reutilizável com `MotionValue` genérico |

---

## ✅ Checklist Técnico Preenchido

✔ Objetivo da sessão claro  
✔ Layout desktop/mobile definido  
✔ Animações com scroll via Framer Motion  
✔ Estrutura modular com React  
✔ Visual coerente com branding  
✔ Responsividade e acessibilidade previstas  
✔ Código pronto para ser usado em agente autônomo


-----

 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.
