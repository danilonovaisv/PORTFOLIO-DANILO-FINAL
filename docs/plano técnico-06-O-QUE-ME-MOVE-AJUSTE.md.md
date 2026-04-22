## FASE 1 — GUIA EXECUTÁVEL

### Introdução

Este guia transforma o arquivo **“06-O-QUE-ME-MOVE-AJUSTE.md”** em um plano técnico executável para adaptar, na seção **“O Que Me Move”**, apenas a **física das animações**, os **gatilhos de scroll** e o **comportamento do cursor customizado** inspirados na referência **drinksom.eu**, sem alterar layout, tipografia ou cores do projeto. A seção já define uma arquitetura com `BeliefBackground`, `BeliefOverlay`, `BeliefFixedHeader`, `BeliefScrollText`, `BeliefManifesto` e `GhostScene`, além de exigir `useScroll`, `animate()`, `inView()`, `frameloop="demand"` e Ghost acima do manifesto no clímax. 

A base arquitetural do projeto continua sendo o **MASTER KNOWLEDGE MAP** e o **Ghost Design System**: stack oficial com Next.js App Router, React, Tailwind com `source(none)`, Motion/Framer Motion, React Three Fiber, easing Ghost `cubic-bezier(0.22, 1, 0.36, 1)`, grid 4/8/12, e camadas próprias para cursor e cena 3D.


### Pré-requisitos

* Repositório alinhado com a arquitetura do projeto e com os arquivos da seção já previstos em `src/components/sobre/...`, `src/hooks/useBeliefsScroll.ts`, `src/store/beliefStore.ts` e `src/config/motion.ts`.
* Motion para React com suporte a `useScroll`, `useTransform`, `animate`, `useInView/useInView-like` e gestos. ([Motion][2])
* React Three Fiber com `frameloop="demand"` e `invalidate()` para render sob demanda. ([Poimandres Documentation][3])
* Tailwind com `@import "tailwindcss" source(none)` e `@source` explícitos, para não reabrir o bug conhecido do Oxide. 
* Alinhamento com as regras Ghost:

  * easing Ghost obrigatório
  * movimento suave
  * Ghost acima do manifesto no clímax da seção
  * sem ruptura de tokens visuais.

### Passo a passo

#### Passo 1 — Congelar o contrato arquitetural da seção

**Descrição**
Antes de qualquer implementação, congele o contrato atual da seção e declare explicitamente o que **pode** e **não pode** mudar. O arquivo ajustado v3 já define a pilha de camadas, a cronologia desktop/mobile, o hook central de scroll e a regra editorial de o Ghost permanecer acima do manifesto.

**Código quando aplicável**

```md
Regras congeladas:
- Não alterar layout, grid, tipografia, paleta ou narrativa textual
- GhostScene continua acima de BeliefManifesto no clímax
- useScroll({ target, offset: ['start end', 'end end'] })
- Background muda por animate() + inView(), não por CSS transition
- Cursor não pode capturar clique nem pointer events
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @engineer com apoio de @frontend-specialist. Consulte `.antigravity/rules.md` (ou `AGENTS.md`), o MASTER KNOWLEDGE MAP, o Ghost Design System e `06-O-QUE-ME-MOVE-AJUSTE.md`.

Objetivo: Congelar o contrato arquitetural da seção "O Que Me Move", listando claramente invariantes, restrições de motion, arquivos afetados e pontos que não podem ser alterados.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Análise: examine a arquitetura atual da seção antes de propor mudanças.
2. Artefatos: gere `implementation_plan.md` com invariantes, riscos e arquivos impactados.
3. Lista de Tarefas: gere `task.md` com passos granulares de no máximo 1 hora.
4. Gate de Aprovação: pare imediatamente após os artefatos.
5. Verificação: após aprovação futura, validar visualmente a seção e consolidar evidências em `walkthrough.md`.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

Confirme se entendeu o protocolo e inicie a Fase de Planejamento.
```

**Dica ou aviso de verificação**
Verifique se o z-index local da seção não conflita com o mapa global do projeto, porque o Knowledge Map define camadas-base globais e o ajuste v3 sobe o Ghost para `z-70` dentro da sessão. Isso é viável, mas precisa ser tratado como regra local deliberada.

**Resultado mensurável**
Documento de invariantes fechado com 0 ambiguidade sobre layout, camadas e contrato de scroll.

---

#### Passo 2 — Extrair da referência só a linguagem cinética

**Descrição**
A referência não deve virar clone visual. Ela deve ser reduzida a três coisas:

1. **inércia suave**
2. **storytelling scroll-driven por blocos**
3. **sensação de cursor experiencial desacoplado do mouse nativo**

Pelo que ficou observável na homepage, a referência organiza a experiência em blocos heroicos longos e sequenciais, o que combina com o seu modelo de sticky storytelling. O detalhamento exato de blend mode, spring constants ou shaders de cursor não apareceu diretamente no DOM analisável, então essa parte precisa ficar como benchmark, não como contrato literal. ([DrinkSom][1])

**Código quando aplicável**

```ts
export const referenceMotionProfile = {
  narrative: "scroll-driven cinematic sections",
  entrance: "soft inertial reveal",
  transitions: "continuous, not abrupt",
  cursor: "overlay experiential cursor",
  certainty: {
    scrollNarrative: "high",
    easingFamily: "medium",
    cursorInternals: "low"
  }
}
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @motion-specialist. Consulte a documentação base e trate a referência drinksom.eu apenas como fonte de física de animação, gatilhos de scroll e comportamento de cursor.

Objetivo: Extrair da referência exclusivamente a linguagem cinética e convertê-la em parâmetros implementáveis na stack Motion + R3F, sem copiar layout, tipografia, grid ou paleta.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Análise: separar evidência direta de inferência.
2. Artefatos: gerar plano com "evidência", "inferência controlada" e "⚠️ Verificar".
3. Lista de Tarefas: quebrar em ações técnicas atômicas.
4. Gate de Aprovação: parar após o plano.
5. Verificação: validar visualmente depois da aprovação.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
**⚠️ Verificar** o cursor em ambiente com Browser Subagent real após aprovação, porque a análise atual não expôs toda a camada runtime da referência. ([DrinkSom][1])

**Resultado mensurável**
Lista separando 100% do que é observação direta versus inferência técnica controlada.

---

#### Passo 3 — Consolidar o engine de scroll da seção

**Descrição**
O núcleo da adaptação deve ser um único hook de scroll semântico. O próprio ajuste v3 já fixa o contrato: `useScroll({ target, offset: ['start end', 'end end'] })`, com início antecipado quando o topo da seção toca o rodapé da viewport e fim quando o rodapé da seção encontra esse mesmo rodapé. Motion documenta `useScroll` como base para animações scroll-linked, o que casa exatamente com esse modelo.  ([Motion][2])

**Código quando aplicável**

```ts
import { useScroll, useTransform, useReducedMotion } from "motion/react"

export function useBeliefsScroll(containerRef: React.RefObject<HTMLElement>) {
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const activePhraseIndex = useTransform(
    scrollYProgress,
    [0.10, 0.22, 0.34, 0.46, 0.58, 0.70],
    [0, 1, 2, 3, 4, 5]
  )

  const isManifestoPhase = useTransform(scrollYProgress, [0.82, 1], [0, 1])
  const isClimax = useTransform(scrollYProgress, [0.85, 1], [0, 1])

  return { reduce, scrollYProgress, activePhraseIndex, isManifestoPhase, isClimax }
}
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @engineer com apoio de @motion-specialist. Consulte `.antigravity/rules.md` (ou `AGENTS.md`) e as skills de Framer Motion/Motion.

Objetivo: Consolidar o engine de scroll da seção "O Que Me Move" em um hook semântico único, compatível com reverse scroll, reduced motion e sincronização DOM↔R3F.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Análise do hook existente.
2. Geração de plano de implementação.
3. Task list em blocos de até 1 hora.
4. Gate de aprovação.
5. Verificação pós-aprovação com evidências.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
Se aparecer erro de ref não hidratada com `useScroll`, a própria documentação do Motion indica revisar a hidratação da `target ref`. ([Motion][4])

**Resultado mensurável**
`scrollYProgress` consistente de 0→1 em scroll down e 1→0 em reverse scroll.

---

#### Passo 4 — Sincronizar texto, fundo e overlay no mesmo frame narrativo

**Descrição**
Seu documento já define que texto e cor são “um único sistema”: a frase entra, o fundo muda no mesmo frame lógico, e um overlay preto de baixa opacidade absorve micro-glitches e banding. Isso deve continuar sendo implementado com `animate()` + `inView()`, nunca com `transition: background-color`. Motion suporta `animate()` para estilos HTML/CSS com boa performance, e o ajuste v3 já fixa a duração de 0.9s e o easing ambient.  ([Motion][5])

**Código quando aplicável**

```ts
import { animate, inView } from "motion"

const palette = [
  "#040013",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#040013",
]

document.querySelectorAll("[data-belief-line]").forEach((node) => {
  inView(node, () => {
    const index = Number((node as HTMLElement).dataset.index ?? 0) + 1

    animate(bgRef.current, {
      backgroundColor: palette[index],
    }, {
      duration: 0.9,
      ease: [0.17, 0.55, 0.55, 1],
    })

    animate(overlayRef.current, {
      opacity: [0, 0.1, 0],
    }, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    })
  })
})
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @motion-specialist. Consulte a documentação de Motion e o ajuste v3 da seção.

Objetivo: Implementar a troca de background e o overlay anti-banding sincronizados com a entrada das frases, usando animate() + inView(), sem CSS transition.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Examinar a implementação atual.
2. Gerar plano com estados, cores, durações e pontos de disparo.
3. Gerar task list granular.
4. Parar antes de escrever código.
5. Após aprovação, validar se frase e cor entram em sincronia visual.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
Mensure visualmente se a cor já começou a mudar no primeiro frame perceptível da entrada da frase. Esse é um critério de aceite direto da spec. 

**Resultado mensurável**
0 casos de transição de fundo disparada por CSS; 100% das frases com cor correspondente sincronizada.

---

#### Passo 5 — Transformar o Ghost em sistema responsivo ao scroll

**Descrição**
A referência sugere que o objeto principal “respira” com a narrativa. O seu ajuste v3 já descreve isso com precisão: flutuação senoidal determinística, rotação Y dependente do progresso, intensificação gradual e centralização no clímax. Em React Three Fiber, esse tipo de atualização deve viver no frame loop com `lerp`/`damp`, e não em setState por frame. A própria documentação de R3F recomenda lerp em `useFrame`, e documenta `frameloop="demand"` + `invalidate()` para render sob demanda.  ([Poimandres Documentation][3])

**Código quando aplicável**

```ts
useFrame((state, delta) => {
  const p = scrollProgress.get()
  const t = state.clock.getElapsedTime()

  const floatSpeed = 0.6 + p * 0.6
  const floatAmplitude = reduced ? 0 : 0.036 + p * 0.03

  const targetX = p > 0.85 ? 0 : baseX + cursorX.get() * 0.4
  const targetY = p > 0.85 ? 0 : baseY + cursorY.get() * 0.25 + Math.sin(t * floatSpeed) * floatAmplitude
  const targetScale = isMobile ? (p > 0.85 ? 1.0 : 0.9) : (p > 0.85 ? 1.05 : 0.95)

  group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, Math.min(delta * 8, 0.15))
  group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, Math.min(delta * 8, 0.15))
  group.current.rotation.y = Math.sin(t * (0.4 + p * 0.4)) * (0.06 + p * 0.04)
  group.current.scale.setScalar(
    THREE.MathUtils.lerp(group.current.scale.x, targetScale, Math.min(delta * 8, 0.15))
  )
})
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @r3f-specialist com apoio de @motion-specialist. Consulte `.antigravity/rules.md`, `06-O-QUE-ME-MOVE-AJUSTE.md` e a documentação oficial do React Three Fiber.

Objetivo: Transformar o Ghost 3D em um sistema responsivo ao scroll, com float determinístico, rotação Y progressiva, centralização no clímax e render sob demanda.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Auditar o componente GhostScene atual.
2. Gerar plano com motion map e riscos de performance.
3. Gerar task list granular.
4. Gate de aprovação.
5. Após aprovação, validar FPS, sobreposição no manifesto e ausência de vazamento WebGL.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
Confirme que o Ghost realmente sobrepõe a palavra “GHOST” no clímax e que o cursor perde influência progressivamente após `p > 0.85`.

**Resultado mensurável**
Ghost com intensificação contínua e sobreposição correta no clímax, mantendo FPS alvo acima de 50.

---

#### Passo 6 — Implementar cursor global com trailing e magnetismo leve

**Descrição**
Aqui está a maior área de incerteza factual da referência. O ambiente atual não expôs o runtime completo do cursor em drinksom.eu; portanto, a adaptação abaixo é uma **tradução segura do efeito percebido**, não uma reprodução literal. A proposta compatível com Ghost é:

* cursor global em camada superior
* `pointer-events-none`
* dot + ring
* ring com atraso por spring
* magnetismo leve apenas em CTAs
* sem uso em touch/coarse pointer
* sem alterar o cursor funcional do sistema fora do necessário.

O próprio mapa do projeto já reserva `z-cursor` como camada absoluta de cursor. Motion documenta gestos e hover state; isso é suficiente para a implementação sem biblioteca externa adicional.  ([Motion][6])

**Código quando aplicável**

```ts
const x = useMotionValue(0)
const y = useMotionValue(0)

const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.7 })
const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.7 })

useEffect(() => {
  const onMove = (e: PointerEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }
  window.addEventListener("pointermove", onMove, { passive: true })
  return () => window.removeEventListener("pointermove", onMove)
}, [x, y])
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @frontend-specialist com apoio de @motion-specialist. Consulte o Ghost Design System, o MASTER KNOWLEDGE MAP e a documentação oficial do Motion para gestos.

Objetivo: Implementar um cursor global Ghost com dot + ring, trailing suave e magnetismo leve em CTAs, sem capturar eventos de clique e sem habilitar em touch/coarse pointer.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Examinar o estado atual do cursor no projeto.
2. Gerar implementation plan com estados do cursor, alvos semânticos e reduced motion.
3. Gerar task list de no máximo 1 hora por item.
4. PARE imediatamente após os artefatos.
5. Após aprovação, validar hover, clique, seleção de texto e desempenho.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

⚠️ Verificar: benchmark drinksom.eu não teve o runtime completo do cursor acessível no ambiente atual; tratar a proposta como inferência técnica controlada.
```

**Dica ou aviso de verificação**
**⚠️ Verificar** se o cursor customizado não degrada seleção de texto, hover nativo ou acessibilidade por teclado. Ele deve desaparecer ou reduzir-se adequadamente sob `prefers-reduced-motion` e em touch. ([Motion][6])

**Resultado mensurável**
Cursor ativo apenas em desktop pointer fino, sem bloquear clique e com trailing estável.

---

#### Passo 7 — Conectar cursor e Ghost apenas no desktop

**Descrição**
A adaptação correta não é “controlar” o Ghost com o mouse, e sim fazê-lo **sentir presença**. O seu ajuste v3 já aponta exatamente isso: cursor normalizado de `-1 → 1`, mapeado para amplitude de até `±0.4` unidades no mundo, com `pointer-events-none` no container e baseline central. No clímax, a influência do cursor precisa cair para o centro dominar a composição.

**Código quando aplicável**

```ts
const cursorInfluence = useTransform(scrollYProgress, [0, 0.82, 0.9, 1], [1, 1, 0.3, 0])

const targetX = baseX + normalizedCursorX * 0.4 * cursorInfluence.get()
const targetY = baseY + normalizedCursorY * 0.25 * cursorInfluence.get()
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @r3f-specialist. Consulte a spec v3 da seção e o Ghost Design System.

Objetivo: Conectar o cursor ao Ghost 3D apenas no desktop, como parallax emocional sutil, reduzindo a influência no clímax para preservar a composição central do manifesto.

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Examinar a implementação atual do Ghost.
2. Gerar plano com ranges de influência e reduced motion.
3. Gerar task list.
4. Gate de aprovação.
5. Validação visual futura com reverse scroll e clímax.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
Não deixe a influência do cursor disputar a narrativa do manifesto final. Se o Ghost parecer “caçando” o ponteiro no clímax, a implementação falhou.

**Resultado mensurável**
Parallax perceptível fora do clímax e neutralização progressiva após `0.85`.

---

#### Passo 8 — Fechar performance, acessibilidade e teardown

**Descrição**
A implementação final precisa combinar Motion e R3F sem desperdício de render. R3F documenta `invalidate()` como mecanismo para solicitar novo frame quando `frameloop === 'demand'`, e recomenda interpolação por `lerp`/`damp` dentro de `useFrame`. O seu documento também exige descarte de geometria/material no unmount e `GhostErrorBoundary`. ([Poimandres Documentation][3]) 

**Código quando aplicável**

```ts
<Canvas frameloop="demand" dpr={[1, isMobile ? 1 : 2]}>
  <GhostScene />
</Canvas>

// teardown
useEffect(() => {
  return () => {
    scene.traverse((obj: any) => {
      obj.geometry?.dispose?.()
      if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m?.dispose?.())
      else obj.material?.dispose?.()
    })
  }
}, [scene])
```

**Prompt de IA**

```md
Ative o Modo de Planejamento (Planning Mode) ou utilize o workflow /plan.

Atuação: Assuma o papel do @engineer com apoio de @qa-verifier e @r3f-specialist.

Objetivo: Endurecer performance, reduced motion, teardown WebGL e critérios de verificação da seção "O Que Me Move".

Diretrizes de Execução Rigorosas (Protocolo PREVC):
1. Examinar render loop, invalidation, cleanup e acessibilidade.
2. Gerar implementation plan com checklist de QA.
3. Gerar task list de auditoria e correção.
4. Gate de aprovação.
5. Após aprovação, validar visualmente e consolidar em walkthrough.md.

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...
```

**Dica ou aviso de verificação**
Valide desktop, mobile, reverse scroll, reduced motion, hover em CTA e ausência de cursor em touch. Esse conjunto deve virar checklist fechado de QA. 

**Resultado mensurável**
Sem vazamento WebGL, sem jank perceptível e sem regressões em reduced motion.

### Integrações

A adaptação usa apenas integrações já coerentes com o projeto:

* **Motion / Framer Motion** para separar:

  * `useScroll` em comportamento scroll-linked
  * `inView`/`useInView` em comportamento scroll-triggered
  * `animate()` em transições de background e overlay. ([Motion][2])
* **React Three Fiber** para o Ghost com render sob demanda, interpolação em frame loop e `invalidate()`. ([Poimandres Documentation][3])
* **Tailwind CSS** apenas para composição estrutural, sticky, camadas e utilitários; sem mexer em identidade.
* **Store compartilhado** (`beliefStore.ts`) para ponte DOM↔R3F quando necessário. 

### Custos

* **Bibliotecas novas**: não são obrigatórias.
* **Custo de implementação**: médio, porque há sincronização entre DOM, Motion, R3F e cursor global.
* **Custo de QA**: relevante, porque a seção exige validação em desktop, mobile, reverse scroll e reduced motion.
* **Custo de manutenção**: baixo a médio, desde que o mapa de motion fique centralizado em hook/config, e não espalhado por componentes.

### Próximos passos

1. Revisar os artefatos gerados e aprovar o plano de motion antes de qualquer alteração de código.
2. Rodar a auditoria Antigravity sobre a implementação atual da seção para medir divergência real versus spec v3.
3. Executar a implementação em duas etapas: primeiro scroll/motion base, depois cursor e acoplamento cursor↔Ghost.

### Conclusão

A adaptação correta da referência não é visual; é **cinética**. O que deve ser importado de drinksom.eu é a sensação de narrativa contínua, a inércia suave e o protagonismo responsivo do objeto central. O que deve permanecer intocado é a identidade Ghost: paleta, tipografia, grid, composição editorial e regra de presença sem ruído. Essa combinação já está tecnicamente suportada pela sua spec v3 e pela stack Motion + R3F do projeto.  ([DrinkSom][1])

Artefatos gerados:

* [motion_implementation_plan.md](sandbox:/mnt/data/artifacts/motion_implementation_plan.md)
* [task_list.md](sandbox:/mnt/data/artifacts/task_list.md)

---

## FASE 2 — EXPANSÃO ESTRATÉGICA

### Resumo executivo

A melhor leitura arquitetural para essa seção é tratá-la como um **micro-sistema de direção de cena**, não como um conjunto de animações soltas. O scroll define o tempo, o texto define a intenção, o background define a emoção e o Ghost define a presença. O cursor, quando existir, entra só como modulador de proximidade no desktop. Isso está alinhado com a filosofia “Presence without noise” e com os próprios limites do Ghost System.

### Arquitetura completa

A arquitetura ideal fica dividida em cinco camadas funcionais:

**1. Narrative Timeline Layer**
Responsável por transformar `scrollYProgress` em estados semânticos:

* entering
* active phrase
* manifesto phase
* climax
* exit/reset

**2. DOM Motion Layer**
Opera:

* header reveal
* phrase reveal
* manifesto fade-in
* background interpolation
* overlay anti-banding

**3. 3D Response Layer**
Opera:

* float determinístico
* rotação Y
* escala emocional
* re-centering no clímax
* desacoplamento de cursor no fim

**4. Cursor Interaction Layer**
Opera:

* presença do cursor
* trailing
* magnetismo leve
* semântica por `data-cursor=*`
* disable em touch/reduced motion

**5. Verification Layer**
Opera:

* checklist visual
* reverse scroll
* reduced motion
* performance
* teardown

Essa separação reduz acoplamento e evita que o GhostScene concentre responsabilidades demais. Motion já diferencia scroll-triggered e scroll-linked, o que casa bem com essa divisão. ([Motion][7])

### Orquestração com agentes

A orquestração mais segura para esse trabalho é:

**Intake**
`@engineer` recebe a demanda e congela invariantes.

**MCP Context Layer**
Ler:

* MASTER KNOWLEDGE MAP
* Ghost Design System
* `06-O-QUE-ME-MOVE-AJUSTE.md`
* artefatos `motion_implementation_plan.md` e `task_list.md`

**Orchestration**

* `@motion-specialist`: ranges, timings, gatilhos de scroll
* `@r3f-specialist`: sistema do Ghost, invalidate, cleanup
* `@frontend-specialist`: cursor global, hover semantics, integração com layout
* `@qa-verifier`: evidências visuais e regressões

**Execution**
Implementação particionada por subsistema, nunca por “efeitos soltos”.

**Verification**
Browser Subagent pós-aprovação para:

* scroll lento
* scroll rápido
* reverse scroll
* hover em CTA
* reduced motion
* mobile

Esse pipeline segue bem o padrão Antigravity de Intake → Context Layer → Orchestration → Execution → Verification. 

### Métodos alternativos

**Alternativa A — ScrollControls no R3F**
Poderia migrar parte da lógica de scroll para dentro do mundo 3D.
Desvantagem: aumenta o acoplamento com a cena e dificulta sincronizar texto/background/manifesto com a mesma clareza do DOM.

**Alternativa B — GSAP + ScrollTrigger**
Funciona bem para storytelling, mas neste caso adiciona uma segunda gramática de animação a uma seção já definida em Motion.
Desvantagem: mais peso mental, mais manutenção e mais risco de drift em relação à spec.

**Alternativa C — Cursor sem trailing**
Mais barato e robusto.
Indicado se os testes mostrarem que trailing + magnetismo + R3F estão caros demais.

**Alternativa D — Sem cursor customizado na seção**
É a alternativa mais conservadora se a auditoria mostrar que o custo de manter o cursor está acima do ganho perceptivo.

### Análise de ferramentas

**Motion / Framer Motion**
É a melhor escolha aqui porque já cobre:

* scroll-linked
* scroll-triggered
* hover
* animate()
* reduced motion
  e tudo isso com documentação atualizada. ([Motion][2])

**React Three Fiber**
Continua sendo a escolha correta para o Ghost porque suporta:

* `useFrame`
* `invalidate`
* `frameloop="demand"`
* interpolação manual no loop
  com boas práticas documentadas de performance. ([Poimandres Documentation][3])

**Tailwind CSS**
Adequado para camadas, sticky, full-bleed e utilitários, desde que a regra `source(none)` seja preservada no projeto. 

### Tips & tricks

* Use `MotionValue` para cursor; evite `setState` por movimento.
* Desligue trailing e magnetismo quando a seção não estiver ativa.
* Faça a influência do cursor cair no clímax; o manifesto precisa “ganhar” a cena.
* Mantenha a troca de cor fora do React render path quando possível.
* Centralize marcos semânticos em um hook só; isso evita drift entre DOM e R3F.
* Trate o cursor como camada global, não como responsabilidade do `GhostScene`.
* **⚠️ Verificar** blend modes somente se o QA mostrar ganho real; eles podem encarecer a composição.

### Tendências 2026

A direção mais forte em experiências editoriais de alto nível continua sendo:

* **scroll as timeline**
* **3D como presença, não gimmick**
* **motion systems sem jitter**
* **cursor como affordance atmosférica, não brinquedo**
* **reduced motion como requisito de primeira classe**

A referência analisada se encaixa bem nessa tendência de storytelling cinemático com objeto central e seções narrativas progressivas. ([DrinkSom][1])

### Trilha de aprendizado

A trilha mais útil para consolidar essa seção é:

1. Dominar a separação entre **scroll-triggered** e **scroll-linked** em Motion. ([Motion][7])
2. Dominar `invalidate()` e `frameloop="demand"` em React Three Fiber. ([Poimandres Documentation][3])
3. Padronizar um **motion map semântico** do projeto para outras seções Ghost.
4. Criar um **cursor protocol** global com estados semânticos reutilizáveis.
5. Levar o QA visual da seção para um checklist replicável no restante do site.

Se quiser, no próximo passo eu transformo isso na saída do seu **GERADOR DE SUPER PROMPTS** em **Versão Executiva + Versão Técnica Expandida**, já no formato PREVC e pronta para colar no agent Antigravity.

[1]: https://www.drinksom.eu/ "SOM | Modern Elixir From Ancient Core"
[2]: https://motion.dev/docs/react-use-scroll?utm_source=chatgpt.com "useScroll — React scroll-linked animations | Motion"
[3]: https://r3f.docs.pmnd.rs/advanced/scaling-performance?utm_source=chatgpt.com "Scaling performance - React Three Fiber"
[4]: https://motion.dev/troubleshooting/use-scroll-ref?utm_source=chatgpt.com "Error: useScroll ref is not hydrated - Motion"
[5]: https://motion.dev/docs/animate?utm_source=chatgpt.com "animate() — Create JavaScript, SVG animations - Motion"
[6]: https://motion.dev/docs/react-gestures?utm_source=chatgpt.com "React gesture animations — hover, drag, press - Motion"
[7]: https://motion.dev/docs/react-scroll-animations?utm_source=chatgpt.com "React scroll animation — scroll-linked & parallax | Motion"
