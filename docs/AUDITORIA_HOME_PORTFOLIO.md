# 🧠 Auditoria + Correções (Prompts Atômicos) — HOME + PORTFOLIO 'use client';
// src/components/audit/SobreAuditReport.tsx
import React from "react";

const SOBRE_AUDIT_MD = String.raw`
# 1️⃣ Visão Geral

A implementação atual da página **/sobre** em \`src/app/sobre/page.tsx\` monta as seções na ordem correta, usando os componentes:

1. \`<AboutHero />\` — Hero / Manifesto  
2. \`<AboutOrigin />\` — Origem Criativa  
3. \`<AboutServices />\` — O Que Eu Faço  
4. \`<AboutMethod />\` — Como Eu Trabalho  
5. \`<AboutBeliefs />\` — O Que Me Move  
6. \`<AboutClosing />\` — Fechamento / CTA  

Em seguida vêm as mesmas seções globais da home (clientes, contato, footer), o que está alinhado com o protótipo canônico.

**Pontos fortes:**

- **Fidelidade narrativa:**  
  - Os textos das seções \`AboutHero\`, \`AboutOrigin\`, \`AboutServices\`, \`AboutMethod\`, \`AboutBeliefs\` e \`AboutClosing\` respeitam o conteúdo do protótipo (sem alterações significativas de fraseado ou sentido).  
  - A ordem macro da narrativa está correta (Hero → Origem → O que eu faço → Como eu trabalho → O que me move → Fechamento).

**Desvios críticos:**

- **Motion system Ghost não implementado na página SOBRE:**
  - Nenhum componente em \`src/components/sobre\` importa **Framer Motion** ou usa \`motion.*\`, \`whileInView\`, \`AnimatePresence\` ou tokens \`ghostIn\`, \`fadeGhost\`, \`riseSoft\`, \`floatMemory\`, \`staggerGhost\`.
  - Não há uso de **Intersection Observer** para disparar animações por viewport/scroll.
  - Resultado: todo o conteúdo entra de forma estática, quebrando o ritmo Ghost (nada entra “respirando”).

- **Alturas e ritmo vertical fora do spec:**
  - As seções da SOBRE não utilizam \`min-height\` explícito (\`100vh\`, \`120vh\`, \`80–100vh\`); o layout cresce apenas pelo conteúdo.
  - Isso quebra o conceito de “uma ideia por viewport” e o controle de respiro definido no protótipo.

- **Tokens de design Ghost (cores, max-widths, espaçamentos) não estão formalizados como CSS variables/tokens reutilizáveis na página SOBRE:**
  - A paleta \`#000022\`, \`#0048ff\`, \`#4fe6ff\`, etc., está documentada nos MDs de referência, mas não há um mapeamento claro de tokens aplicados sistematicamente na SOBRE.
  - Max-widths específicos (ex.: 520–600px na seção “O que eu faço”) não estão codificados como tal, apenas via \`max-w-*\` genéricos.

- **Experiência Ghost Design (parallax sutil, imagens flutuantes, vídeos de fundo) não foi reproduzida fielmente:**
  - A seção “Origem Criativa” não implementa explicitamente o cluster de **imagens flutuantes com blur e opacidade \< 1**.
  - A seção “Como eu trabalho” não apresenta o **fundo vivo full-bleed com parallax ultra sutil** (vídeo/código/IA) descrito no protótipo.

- **Mobile-first e prefers-reduced-motion estão incompletos:**
  - A estrutura geral é responsiva (stack vertical no mobile), porém:
    - Não há handling explícito de \`prefers-reduced-motion\`.
    - Como ainda não existem animações na SOBRE, isso não quebra nada hoje, mas se torna obrigatório assim que o motion Ghost for implementado.

Em resumo:  
**Texto e ordem estão corretos. A grande lacuna está em motion, alturas/ritmo vertical, fundos vivos e detalhes de grid/max-width definidos no Ghost Design.**

---

# 2️⃣ Diagnóstico por Seção

## 🎯 Seção: Hero / Manifesto (\`AboutHero\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/app/sobre/page.tsx\`  
  - \`src/components/sobre/AboutHero.tsx\`  
  - Header/layout compartilhado

**❌ Problema**

1. **Altura e posição vertical:**  
   - A seção não está explicitamente travada em \`100vh\` com o texto levemente acima do centro; a altura é determinada pelo conteúdo + padding.  
   - Isso faz o manifesto “afundar” ou “subir” dependendo do viewport, fugindo do enquadramento Ghost.

2. **Motion linha a linha inexistente:**  
   - O H1 (“Sou Danilo Novais.”) e o texto manifesto aparecem de forma estática.  
   - Não há animação **linha por linha** com \`opacity 0 → 1\` e \`blur 10px → 0\`, nem delays entre linhas (0.2–0.4s) ou easing \`ghostIn\`.  
   - Não há uso de tokens de motion nem Framer Motion.

3. **Background em loop não está tratado como “presença sutil”:**  
   - O vídeo de Hero (desktop/mobile) não está isolado como layer de background com loop suave e controlado segundo o protótipo (checar se a opacidade, blend e ausência de “ruído” estão sendo respeitadas).

**🔧 Correção Técnica**

- O que mudar
  - Ajustar a seção para **\`min-h-screen\`** ou \`min-h-[100vh]\`, compensando a altura do header, garantindo o manifesto ligeiramente acima do centro.
  - Implementar **Framer Motion** com tokens Ghost (\`ghostIn\`) para animar H1 e cada linha do manifesto separadamente.
  - Garantir que o vídeo de fundo seja tratado como layer sutil (sem distrair), com loop suave.

- Onde mudar
  - \`src/components/sobre/AboutHero.tsx\`  
  - (Se existir um wrapper de página) \`src/app/sobre/page.tsx\` apenas para garantir que não haja estilos conflitantes.

- Quais props / classes / hooks (sugestão)
  - Envolver o bloco de texto em um container com algo como:
    - \`className="relative z-10 flex min-h-screen items-center justify-center"\`
    - Internamente, um wrapper para alinhar o texto levemente acima do centro (ex.: \`items-start\` com padding-top ajustado).
  - Subdividir o texto manifesto em linhas (ex.: \`<p>\` ou \`<span>\` por linha) e aplicar \`motion\` com:
    - \`initial={{ opacity: 0, filter: "blur(10px)" }}\`
    - \`animate={{ opacity: 1, filter: "blur(0px)" }}\`
    - \`transition={{ duration: 1.4, delay: linhaIndex * 0.2, ease: [0.22, 1, 0.36, 1] }}\`
  - Usar \`useReducedMotion()\` para, em caso de \`prefers-reduced-motion\`, renderizar o texto sem animação (estado final).

**✅ Resultado Esperado**

- Ao carregar a página, o usuário vê:
  - Um fundo escuro contínuo com o vídeo de Hero rodando quase imperceptível.
  - O H1 e cada linha do manifesto surgindo, **um bloco por vez**, com fade + blur suave, sem scale ou bounce.
- A seção ocupa a viewport inteira (100vh) e não dá a sensação de “migalha de conteúdo” ou “scroll quebrado” logo de cara.

⸻

## 🎯 Seção: Origem Criativa (\`AboutOrigin\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/components/sobre/AboutOrigin.tsx\`  
  - \`src/app/sobre/page.tsx\`

**❌ Problema**

1. **Altura de 120–140vh não respeitada:**
   - A seção não tem \`min-height\` configurado para o intervalo 120–140vh.  
   - Resultado: o conteúdo pode caber em menos de um viewport, tirando a sensação de “memória longa”.

2. **Imagens flutuantes com blur e opacidade \< 1 não implementadas (ou implementadas de forma genérica):**
   - O protótipo especifica **imagens soltas, flutuantes, nunca 100% opacas, com blur leve permanente e leve deslocamento lateral (10–15px)**.  
   - Na implementação atual:
     - Não há cluster visual com esse comportamento Ghost **ou**
     - As imagens, se presentes, não respeitam opacidade máxima 0.85, blur permanente e motion lateral sutil.

3. **Texto entra todo de uma vez, sem progressão por scroll:**
   - Não há observação do viewport (Intersection Observer / \`whileInView\`) para revelar o texto à medida que o usuário desce.  
   - O texto longo aparece como um bloco estático, quebrando o ritmo “memória que se revela”.

**🔧 Correção Técnica**

- O que mudar
  - Forçar a seção a ter \`min-height\` na faixa de **120–140vh**.
  - Implementar um pequeno sistema de **cards/imagens soltas**:
    - \`opacity \<= 0.85\`
    - \`filter: blur(Xpx)\` permanente leve
    - Pequenos offsets horizontais (\`translateX\`) ou leves “floats” com tokens \`floatMemory\` (sem scale/bounce).
  - Aplicar motion Ghost:
    - Texto entra com fade/blur progressivo ao entrar no viewport (scroll).

- Onde mudar
  - \`src/components/sobre/AboutOrigin.tsx\` (estrutura, grid, imagens, motion).
  - Se necessário, util de motion em \`src/lib/motionTokens.ts\` (a criar) para declarar \`floatMemory\` e \`ghostIn\`.

- Quais props / classes / hooks
  - Envolver a seção em algo como:
    - \`className="relative min-h-[130vh] flex items-center bg-neutral-950"\`
  - Criar um wrapper de texto alinhado à esquerda (\`max-w-xl\` ou token 520–600px conforme Ghost global).
  - Para imagens:
    - \`className="absolute opacity-80 blur-sm"\` com variações de posição (\`top/left/right\`).
    - Motion com Framer + Intersection Observer (ex.: \`whileInView\` + \`viewport={{ once: true, amount: 0.4 }}\`).
  - Para texto:
    - \`initial={{ opacity: 0, filter: "blur(10px)" }}\`
    - \`whileInView={{ opacity: 1, filter: "blur(0px)" }}\`
    - \`transition\` com \`ghostIn\`.

**✅ Resultado Esperado**

- O usuário entra na seção e sente um **campo de memórias**:  
  - Texto denso que aparece conforme o scroll.  
  - Imagens nunca totalmente nítidas, sempre um pouco “distantes”.  
- A seção ocupa mais que um viewport (120–140vh), reforçando a sensação de profundidade temporal.

⸻

## 🎯 Seção: O Que Eu Faço (\`AboutServices\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/components/sobre/AboutServices.tsx\`  
  - \`src/app/sobre/page.tsx\`

**❌ Problema**

1. **Largura fixa de 520–600px não aplicada:**
   - A lista de serviços não foi explicitamente travada em um **coluna única centralizada** com largura fixa 520–600px.  
   - Em vez disso, está usando max-width genérico (ex.: \`max-w-2xl\`/\`3xl\`) que pode fugir da leitura “uma linha por ideia”.

2. **Espaçamento entre itens inadequado:**
   - O protótipo pede “muito espaço entre itens”, reforçando a leitura cadenciada.  
   - O espaçamento atual entre os \`li\` é menor, aproximando visualmente as frases.

3. **Motion item a item inexistente:**
   - Cada item deveria entrar individualmente ao entrar no viewport, com \`staggerGhost\` (~0.18s entre itens) e leve \`riseSoft\` (~18px).  
   - Atualmente todos os itens aparecem estáticos ao carregar a seção.

**🔧 Correção Técnica**

- O que mudar
  - Centralizar a lista em uma coluna única com \`max-width\` em torno de **520–600px**.
  - Aumentar o \`gap\` vertical entre itens para refletir o “respiro” do protótipo.
  - Implementar animação item a item com tokens:
    - \`staggerGhost\` (delay entre itens ~0.18s)
    - \`riseSoft\` (leve translateY + fade/blur).

- Onde mudar
  - \`src/components/sobre/AboutServices.tsx\`.

- Quais props / classes / hooks
  - Container:
    - \`className="min-h-screen flex items-center justify-center px-4"\`
    - Wrapper: \`className="max-w-[560px] mx-auto space-y-6"\` (ou token equivalente).
  - Cada item:
    - Envolver em \`motion.li\` com variants:
      - \`hidden: { opacity: 0, y: 18, filter: "blur(10px)" }\`
      - \`visible: { opacity: 1, y: 0, filter: "blur(0px)" }\`
    - Lista com \`variants\` aplicando \`staggerChildren: 0.18\`.
  - Hover:
    - Apenas \`hover:opacity-95\` ou similar.
    - **Sem** \`scale\`, \`translate\` exagerado ou underline.

**✅ Resultado Esperado**

- No desktop:
  - Coluna única, estreita, muito legível, centrada.  
  - Cada item entra suavemente enquanto o usuário desce, um após o outro.  
- No mobile:
  - Mesmo padrão de uma ideia por viewport (sem colunas lado a lado), com bom respiro entre itens.

⸻

## 🎯 Seção: Como Eu Trabalho (\`AboutMethod\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/components/sobre/AboutMethod.tsx\`  
  - \`src/app/sobre/page.tsx\`

**❌ Problema**

1. **Fundo vivo full-bleed não implementado:**
   - O protótipo pede fundo global com **vídeo abstrato / código / IA**, com parallax ultra sutil, ocupando toda a largura/altura.  
   - A implementação atual usa apenas fundo sólido/gradiente estático (sem vídeo ou parallax Ghost).

2. **Altura 120vh não respeitada:**
   - A seção não está configurada com \`min-height\` em torno de **120vh**, o que faz o bloco de método parecer apenas mais uma “faixa” comum.

3. **Motion do texto (\`fadeGhost\`) ausente:**
   - Título, texto introdutório e lista de processo deveriam entrar com \`fadeGhost\` (opacity + blur, sem deslocamento contínuo) e depois ficarem estáticos.  
   - Atualmente todo o conteúdo aparece instantaneamente.

**🔧 Correção Técnica**

- O que mudar
  - Implementar um layer de background full-bleed com o vídeo/visual especificado (mesma fonte do protótipo).
  - Configurar a seção com \`min-h-[120vh]\` e texto em primeiro plano (z-index acima do vídeo).
  - Aplicar \`fadeGhost\` ao bloco textual na entrada (via viewport ou time), mantendo-o estático depois.

- Onde mudar
  - \`src/components/sobre/AboutMethod.tsx\`.

- Quais props / classes / hooks
  - Seção root:
    - \`className="relative min-h-[120vh] overflow-hidden"\`
  - Background:
    - \`<video ... className="absolute inset-0 w-full h-full object-cover opacity-60"\`
    - Parallax sutil pode ser feito via scroll Y tiny em CSS ou efeito leve no vídeo (sem exagero).
  - Conteúdo:
    - \`className="relative z-10 max-w-3xl mx-auto px-4 py-24"\`
    - Aplicar \`motion.div\` com \`fadeGhost\`:
      - \`initial={{ opacity: 0, filter: "blur(12px)" }}\`
      - \`whileInView={{ opacity: 1, filter: "blur(0px)" }}\`
      - \`transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}\`.

**✅ Resultado Esperado**

- Seção que parece um **laboratório vivo**, mas com o texto extremamente legível e estático após entrar.  
- O fundo se move levemente (parallax) sem roubar a cena, reforçando o conceito de “criatividade com método”.

⸻

## 🎯 Seção: O Que Me Move (\`AboutBeliefs\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/components/sobre/AboutBeliefs.tsx\`  
  - \`src/app/sobre/page.tsx\`

**❌ Problema**

1. **Altura de 100vh e espaço negativo não garantidos:**
   - A seção não está explicitamente configurada com \`min-h-screen\` e um grande espaço negativo ao redor do texto, o que tira a sensação de “manisfesto suspenso”.

2. **Motion baseado em tempo ausente:**
   - O protótipo define que **frases surgem por tempo, não por scroll**, com delays longos (1s+) entre blocos.  
   - Hoje o texto inteiro aparece de uma vez, sem cadência de pensamento.

3. **Nenhum controle de “uma ideia por viewport”:**
   - Sem altura mínima controlada + motion por tempo, o usuário pode ver muitos blocos ao mesmo tempo, perdendo o ritmo contemplativo previsto.

**🔧 Correção Técnica**

- O que mudar
  - Garantir \`min-h-screen\` com texto centralizado (horizontal e verticalmente).
  - Dividir o manifesto em blocos/frases conforme o protótipo e fazer cada bloco aparecer **por tempo**, sequencialmente.
  - Evitar qualquer \`translateY\` ou scale — apenas opacity + blur.

- Onde mudar
  - \`src/components/sobre/AboutBeliefs.tsx\`.

- Quais props / classes / hooks
  - Seção:
    - \`className="min-h-screen flex items-center justify-center px-4"\`
  - Texto:
    - Array de blocos (“Acredito no design...”, “Um vídeo que respira...”, etc.).
    - \`useEffect + useState\` ou \`Framer Motion\` com delays cronometrados (não dependentes do scroll).
    - Exemplo: cada \`motion.p\` com:
      - \`initial={{ opacity: 0, filter: "blur(10px)" }}\`
      - \`animate={{ opacity: 1, filter: "blur(0px)" }}\`
      - \`transition={{ duration: 1.4, delay: baseDelay + index * 1.0 }}\`.

**✅ Resultado Esperado**

- Mesmo sem scroll, ficando parado na seção, o usuário vê as frases **aparecerem uma após a outra**, como pensamentos surgindo.  
- Muito espaço negativo em volta, reforçando o silêncio e a presença do manifesto.

⸻

## 🎯 Seção: Fechamento / Confirmação (\`AboutClosing\`)

- 📐 Grid e layout: ✗  
- 🧱 Espaçamento vertical: ✗  
- 🎞️ Motion conforme spec: ✗  
- 🧠 Fidelidade narrativa: ✓  
- 📱 Mobile-first: ✓  
- 🧩 Componentes envolvidos:  
  - \`src/components/sobre/AboutClosing.tsx\`  
  - \`src/app/sobre/page.tsx\`

**❌ Problema**

1. **Altura 80–100vh e “sensação de encerramento” não formalizadas:**
   - A seção não garante \`min-height\` de 80–100vh; parece apenas mais um bloco no fluxo, sem a pausa final prevista.

2. **Motion \`fadeGhost\` no texto ausente:**
   - Texto deveria entrar com \`fadeGhost\` padrão (opacity + blur suave) ao entrar na viewport.  
   - Hoje o conteúdo aparece de forma instantânea.

3. **CTAs com hover potencialmente mais chamativo do que deveria:**
   - É necessário garantir que os botões:
     - **Não tenham scale/bounce.**
     - Use apenas leve mudança de opacidade e, no máximo, ajuste sutil de cor.

**🔧 Correção Técnica**

- O que mudar
  - Ajustar a seção para ter \`min-h-[80vh]\`–\`min-h-screen\`, alinhando o texto à esquerda com boa margem.
  - Aplicar \`fadeGhost\` no bloco textual completo.
  - Revisar os estados de hover dos CTAs para ficarem estritamente dentro do padrão Ghost.

- Onde mudar
  - \`src/components/sobre/AboutClosing.tsx\`.

- Quais props / classes / hooks
  - Seção:
    - \`className="min-h-[80vh] flex items-center px-4"\`
  - CTAs:
    - \`className="px-4 py-2 border border-primary/40 bg-primary/10 hover:bg-primary/20 hover:opacity-90 transition-opacity"\`
    - Sem \`scale-*\`, sem \`-translate-y-*\`, sem sombras exageradas.

**✅ Resultado Esperado**

- A seção final parece uma **convite calmo**, com texto entrando suave e CTAs discretos, fechando a narrativa sem ruído visual ou motion exagerado.

---

# 3️⃣ Lista de Problemas (com severidade)

- 🔴 **P1 — Motion Ghost ausente na página SOBRE**  
  - Nenhuma seção usa Framer Motion, tokens \`ghostIn\`, \`fadeGhost\`, \`riseSoft\`, \`floatMemory\` ou \`staggerGhost\`.  
  - Todo conteúdo aparece “de uma vez” sem cadência.

- 🔴 **P2 — Alturas mínimas das seções não seguem 100vh / 120–140vh / 80–100vh**  
  - Quebra o conceito de “uma ideia por viewport” e o ritmo vertical Ghost.

- 🔴 **P3 — Fundo vivo full-bleed e parallax ausentes em “Como Eu Trabalho”**  
  - A seção não transmite o laboratório vivo de IA/código previsto.

- 🔴 **P4 — Motion por tempo em “O Que Me Move” não implementado**  
  - Frases não surgem como pensamentos; tudo aparece estático.

- 🟡 **P5 — Imagens flutuantes com blur e opacidade \< 1 não implementadas em “Origem Criativa”**  
  - Perda de profundidade/memória visual.

- 🟡 **P6 — Grid e max-width de “O Que Eu Faço” não seguem 520–600px com muito espaço entre itens**  
  - Lista perde o ritmo de leitura e foco por item.

- 🟡 **P7 — Fechamento sem “pausa” visual clara (80–100vh + fadeGhost)**  
  - Sensação de encerramento menos marcada.

- 🟢 **P8 — Design tokens Ghost não formalizados na SOBRE (cores, espaços, max-widths)**  
  - Ainda que a paleta se pareça correta, não há tokens explícitos para garantir consistência/evolução.

---

# 🤖 PROMPTS PARA AGENTE EXECUTOR

## 🛠️ Prompt #01 — Implementar sistema de motion tokens Ghost

**Objetivo**
- Criar um módulo de motion tokens (\`ghostIn\`, \`fadeGhost\`, \`riseSoft\`, \`floatMemory\`, \`staggerGhost\`) centralizado e pronto para uso na página SOBRE.

**Arquivos envolvidos**
- \`src/lib/motionTokens.ts\` (novo)  
- \`src/app/sobre/page.tsx\` (para imports globais)  

**Ações**
1. Criar \`src/lib/motionTokens.ts\` exportando objetos de variants e helpers de \`transition\` com:
   - Duração padrão 0.9s, longa 1.4–1.6s.
   - Delay padrão 0.2–0.4s.
   - Easing \`[0.22, 1, 0.36, 1]\`.
2. Implementar:
   - \`ghostIn\`: opacity + blur, sem translate/scale.
   - \`fadeGhost\`: variante mais leve de opacity + blur.
   - \`riseSoft\`: leve \`y\` (~18px) + opacity + blur (sem bounce).
   - \`floatMemory\`: pequeno deslocamento lateral/vertical e leve blur permanente para imagens.
   - \`staggerGhost\`: função helper que retorna \`staggerChildren\` ~0.18s.
3. Garantir que nenhum token utilize \`scale\` ou easing com \`bounce\`.

**Regras**
- ❌ Não alterar textos  
- ❌ Não mudar ordem das seções  
- ❌ Não inventar novas animações fora dos tokens  
- ✅ Seguir strictamente motion tokens Ghost  
- ✅ Mobile-first  
- ✅ Preparar tokens para uso com \`prefers-reduced-motion\`

**Critérios de aceite**
- Arquivo de tokens criado e exportando todas as variações necessárias.
- Nenhum token usa scale ou bounce.
- Todos os tokens usam apenas opacity + blur (+ leve position onde especificado).
- Código limpo e reaproveitável.

---

## 🛠️ Prompt #02 — Aplicar ghostIn no Hero / Manifesto

**Objetivo**
- Fazer o H1 e o manifesto da seção Hero aparecerem linha a linha com \`ghostIn\`, respeitando delays e blur do protótipo.

**Arquivos envolvidos**
- \`src/components/sobre/AboutHero.tsx\`  
- \`src/lib/motionTokens.ts\`  

**Ações**
1. Importar \`motion\` do Framer Motion e os tokens \`ghostIn\` de \`motionTokens\`.
2. Quebrar o texto manifesto em linhas ou blocos, usando \`motion.p\` ou \`motion.span\` por linha.
3. Aplicar \`ghostIn\` a cada linha com delay incremental (0.2–0.4s entre itens) e duração ~1.4s, respeitando \`prefers-reduced-motion\`.

**Regras**
- ❌ Não alterar o texto do manifesto  
- ❌ Não adicionar CTA na seção  
- ❌ Não usar scale/bounce  
- ✅ Usar apenas opacity + blur  
- ✅ Respeitar delays especificados  

**Critérios de aceite**
- Ao carregar a página, cada linha do manifesto surge com fade+blur suave, uma após a outra.
- Nenhum salto brusco de opacity.
- Com \`prefers-reduced-motion\`, o texto já aparece no estado final (sem animação).

---

## 🛠️ Prompt #03 — Ajustar alturas e ritmo vertical das seções SOBRE

**Objetivo**
- Aplicar \`min-height\` adequado em cada seção da SOBRE para garantir o ritmo de “uma ideia por viewport”.

**Arquivos envolvidos**
- \`src/components/sobre/AboutHero.tsx\`  
- \`src/components/sobre/AboutOrigin.tsx\`  
- \`src/components/sobre/AboutServices.tsx\`  
- \`src/components/sobre/AboutMethod.tsx\`  
- \`src/components/sobre/AboutBeliefs.tsx\`  
- \`src/components/sobre/AboutClosing.tsx\`  

**Ações**
1. Garantir \`min-h-screen\` (100vh) em:
   - \`AboutHero\`
   - \`AboutBeliefs\`
2. Garantir \`min-h-[120vh]\`–\`min-h-[140vh]\` em:
   - \`AboutOrigin\`
   - \`AboutMethod\`
3. Garantir \`min-h-[80vh]\`–\`min-h-screen\` em:
   - \`AboutServices\`
   - \`AboutClosing\`
4. Ajustar alignments (\`items-center\`, \`justify-center\`, etc.) para que cada seção respire conforme o protótipo.

**Regras**
- ❌ Não alterar o conteúdo textual  
- ❌ Não reordenar seções  
- ✅ Apenas ajustar classes Tailwind de altura e alinhamento  
- ✅ Manter consistência de margens laterais com o resto do site  

**Critérios de aceite**
- Cada seção ocupa aproximadamente o espaço vertical descrito (100vh / 120–140vh / 80–100vh).
- Não há “faixas comprimidas” entre seções.
- O scroll transmite um ritmo consistente do início ao fim.

---

## 🛠️ Prompt #04 — Implementar imagens flutuantes em “Origem Criativa”

**Objetivo**
- Reproduzir as imagens soltas, flutuantes, com blur e opacidade \<= 0.85 na seção Origem, conforme o Ghost Design.

**Arquivos envolvidos**
- \`src/components/sobre/AboutOrigin.tsx\`  

**Ações**
1. Adicionar o cluster de imagens definido no protótipo interativo (mesmos assets, se já existirem no projeto).
2. Posicionar as imagens com \`position: absolute\` e classes Tailwind que garantam:
   - \`opacity-80\` ou similar.
   - \`blur-sm\` permanente.
3. Aplicar motion \`floatMemory\` às imagens, com deslocamento lateral de 10–15px ao entrar na viewport, sem chegar a 100% de opacidade.

**Regras**
- ❌ Não alterar o texto da seção  
- ❌ Não usar scale/bounce  
- ✅ Usar apenas opacity + blur + deslocamento leve  
- ✅ Garantir que as imagens não atrapalhem a leitura do texto  

**Critérios de aceite**
- Imagens presentes, flutuando suavemente com blur e opacity < 1.
- Nenhuma imagem atinge opacidade 1.0.
- Texto permanece perfeitamente legível.

---

## 🛠️ Prompt #05 — Ajustar grid e motion de “O Que Eu Faço”

**Objetivo**
- Centralizar a lista de serviços em uma coluna única 520–600px, com muito espaço entre itens e motion com \`riseSoft\` + \`staggerGhost\`.

**Arquivos envolvidos**
- \`src/components/sobre/AboutServices.tsx\`  
- \`src/lib/motionTokens.ts\`  

**Ações**
1. Ajustar o container para centralizar a seção (\`flex\` + \`justify-center\` + \`items-center\`) com wrapper \`max-w-[560px]\`.
2. Aumentar o \`gap\` vertical entre itens (\`space-y-6\` ou maior) para refletir o respiro do protótipo.
3. Transformar a lista em \`motion.ul\`/\`motion.li\` utilizando:
   - \`staggerGhost\` na lista.
   - \`riseSoft\` em cada item (y~18px + opacity/blur).

**Regras**
- ❌ Não alterar textos dos itens  
- ✅ Uma única coluna, sem colunas lado a lado  
- ✅ Sem scale ou animações exageradas  

**Critérios de aceite**
- Lista centralizada, estreita, com grande espaço entre itens.
- Itens surgem um após o outro, suavemente, ao entrar no viewport.

---

## 🛠️ Prompt #06 — Implementar fundo vivo em “Como Eu Trabalho”

**Objetivo**
- Adicionar o fundo vivo full-bleed (vídeo/código/IA) com parallax sutil na seção “Como Eu Trabalho”.

**Arquivos envolvidos**
- \`src/components/sobre/AboutMethod.tsx\`  

**Ações**
1. Adicionar \`<video>\` full-bleed no background, usando o asset especificado no protótipo (ou já existente no projeto).
2. Configurar o vídeo como:
   - \`autoPlay\`, \`muted\`, \`loop\`, \`playsInline\`.
   - \`className="absolute inset-0 w-full h-full object-cover opacity-60"\`.
3. Implementar um efeito de parallax ultra sutil (ex.: pequeno offset baseado no scroll, sem exagero) e garantir que o texto principal fique em \`position: relative; z-10\`.

**Regras**
- ❌ Não alterar texto do método  
- ❌ Não criar efeitos chamativos ou rápidos  
- ✅ Fundo deve ser perceptível, mas discreto  

**Critérios de aceite**
- Fundo ocupa toda a seção, com leve sensação de movimento.
- Texto permanece totalmente legível e estável após o fade inicial.

---

## 🛠️ Prompt #07 — Implementar motion por tempo em “O Que Me Move”

**Objetivo**
- Fazer as frases da seção “O Que Me Move” surgirem por tempo, em blocos, com delays longos e sem deslocamento vertical.

**Arquivos envolvidos**
- \`src/components/sobre/AboutBeliefs.tsx\`  
- \`src/lib/motionTokens.ts\`  

**Ações**
1. Dividir o manifesto em blocos/frases exatamente como no protótipo.
2. Usar \`motion\` com \`fadeGhost\` + delays baseados em tempo (1s+ entre blocos), não em scroll.
3. Adicionar handling de \`prefers-reduced-motion\` para exibir tudo imediatamente quando usuário prefere menos animação.

**Regras**
- ❌ Não mudar o texto ou a ordem dos blocos  
- ❌ Não usar translateY/scale  
- ✅ Apenas opacity + blur + delay temporal  

**Critérios de aceite**
- Mesmo sem scroll, as frases aparecem sequencialmente ao longo do tempo.
- Não há jitter, bounce ou movimentos verticais perceptíveis.

---

## 🛠️ Prompt #08 — Ajustar fechamento / CTAs com fadeGhost suave

**Objetivo**
- Fazer o texto da seção de fechamento entrar com \`fadeGhost\` e normalizar os hovers dos CTAs para o padrão Ghost.

**Arquivos envolvidos**
- \`src/components/sobre/AboutClosing.tsx\`  
- \`src/lib/motionTokens.ts\`  

**Ações**
1. Envolver o bloco de texto em \`motion.div\` usando \`fadeGhost\` disparado por viewport.
2. Garantir \`min-h-[80vh]\` e texto alinhado à esquerda com respiro.
3. Revisar CTAs:
   - Remover qualquer \`scale\`, \`translate-y\` exagerado ou sombra forte.
   - Manter apenas leve mudança de opacidade/cor em hover.

**Regras**
- ❌ Não alterar textos dos CTAs  
- ✅ Manter dois CTAs: “Fale comigo” e “Download Curriculum”  
- ✅ Motion só com opacity + blur  

**Critérios de aceite**
- A seção final transmite calma e encerramento.
- CTAs são claros, mas discretos, sem efeitos chamativos.

---

## 🛠️ Prompt #09 — Preparar SOBRE para prefers-reduced-motion

**Objetivo**
- Garantir que todas as animações da página SOBRE respeitem \`prefers-reduced-motion\`.

**Arquivos envolvidos**
- \`src/components/sobre/*.tsx\`  
- \`src/lib/motionTokens.ts\`  

**Ações**
1. Usar \`useReducedMotion()\` do Framer Motion em cada seção animada.
2. Condicionar as animações para:
   - Com \`reduce = true\`: renderizar estados finais, sem transições.
   - Com \`reduce = false\`: aplicar tokens Ghost normalmente.
3. Centralizar, se possível, esse comportamento em helpers de \`motionTokens\`.

**Regras**
- ✅ Não remover motion quando \`prefers-reduced-motion = no-preference\`  
- ✅ Garantir acessibilidade sem quebrar narrativa Ghost  

**Critérios de aceite**
- Em dispositivos com \`prefers-reduced-motion: reduce\`, nenhuma animação é executada — apenas estados finais.
- Em outros casos, motion Ghost funciona normalmente.

---

🚫 **REGRAS ABSOLUTAS**

- ❌ NÃO reinventar layout  
- ❌ NÃO sugerir melhorias criativas além do protótipo  
- ❌ NÃO alterar textos  
- ❌ NÃO adicionar novas seções  
- ❌ NÃO mudar a ordem/narrativa  
- ✅ Tratar o protótipo interativo Ghost como fonte da verdade  
- ✅ Qualquer divergência visual/motion em relação ao protótipo = BUG

---

⚙️ **MODO DE OPERAÇÃO DO AGENTE**

1. Fazer análise completa da seção SOBRE (código + layout renderizado).  
2. Confirmar cada um dos problemas listados (P1–P8) no código atual.  
3. Executar os prompts corretivos, um a um, em duas fases:
   - Fase 1: Implementar motion tokens + estruturas de layout (alturas, grids, fundos).  
   - Fase 2: Refinar timings, delays e hovers para bater com o protótipo interativo.  
4. Após cada mudança, comparar a página com o protótipo interativo (desktop e mobile).

---

📦 **EXPORTAÇÃO FINAL**

- Este documento deve ser salvo como \`AUDITORIA-SOBRE-GHOST.md\` (ou equivalente).  
- Texto técnico, objetivo e acionável, pronto para execução por agente autônomo em ambiente Next.js + Tailwind + Framer Motion.

`;

export default function SobreAuditReport() {
  return (
    <section className="w-full bg-black text-white px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
          {SOBRE_AUDIT_MD}
        </pre>
      </div>
    </section>
  );
}
