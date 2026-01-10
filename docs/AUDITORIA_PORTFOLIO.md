# 🛡️ PROTOCOLO DE INTEGRIDADE & MEMÓRIA DO PROJETO

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

### 🤖 AGENTE 1: Arquiteto de Design System & Setup Global

**Objetivo:** Configurar a base do projeto, tokens, tipografia, cores e layout wrapper.


# PROMPT PARA AGENTE 1: SETUP & DESIGN SYSTEM

Você é um Arquiteto de Frontend Sênior. Sua tarefa é configurar a base do projeto "Ghost Design Portfolio" (Página Sobre).

**STACK:** Next.js (App Router), Tailwind CSS, TypeScript, Framer Motion.

**TAREFAS:**

1.  **Tailwind Config (`tailwind.config.ts`):**
    Implemente exatamente estes tokens de cor e fontes:
    - Colors:
      - bluePrimary: '#0048ff'
      - blueAccent: '#4fe6ff'
      - purpleDetails: '#8705f2'
      - background: '#040013'
      - backgroundLight: '#f0f0f0'
      - text: '#fcffff' (Texto principal)
      - textSecondary: '#a1a3a3'
      - neutral: '#0b0d3a'
    - Fonts:
      - Sans: 'TT Norms Pro', 'ui-sans-serif'
      - Mono: 'PPSupplyMono', 'monospace'

2.  **CSS Global & Tipografia (`globals.css`):**
    Configure os `@font-face` usando as URLs do Supabase fornecidas abaixo.
    Implemente as variáveis CSS para tipografia fluida usando `clamp()` conforme especificação:
    - --font-display: clamp(2.5rem, 5vw, 4.5rem) (Weight: 900 Black)
    - --font-h1: clamp(2rem, 4vw, 3.5rem) (Weight: 700 Bold)
    - --font-h2: clamp(1.5rem, 3vw, 2.5rem) (Weight: 700 Bold)
    - --font-body: clamp(1rem, 1.2vw, 1.125rem) (Weight: 400 Regular)
    
    *URLs das Fontes:*
    - Thin: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2
    - Light: .../Light.woff2
    - Regular: .../Regular.woff2
    - Medium: .../Medium.woff2
    - Bold: .../Bold.woff2
    - Black: .../Black.woff2
    - Mono: https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2

3.  **Componente Wrapper/Container:**
    Crie um componente de layout padrão que respeite:
    - max-width: 1680px
    - Padding-x: clamp(24px, 5vw, 96px)
    - Background color: #040013 (Body)
    - Text color: #fcffff

4.  **Header Component:**
    Recrie o Header (transparente sobre Hero, fixo no scroll, link ativo em `/sobre`).
    - Desktop: Logo esq, Nav dir (Link ativo: text-bluePrimary).
    - Mobile: Hambúrguer menu full-screen overlay.
    - Assets Logo:
      - Light: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg

**SAÍDA ESPERADA:** Arquivos de configuração (tailwind, css) e componentes base (Container, Header).

```

---

### 🤖 AGENTE 2: Desenvolvedor Frontend - Hero & Manifesto

**Objetivo:** Implementar a Seção 01 (Hero) com vídeo background e animação de texto sincronizada.

```markdown
# PROMPT PARA AGENTE 2: SEÇÃO HERO (MANIFESTO)

Você é um Especialista em Motion UI. Implemente a **Seção 01 - Hero/Manifesto**.

**CONTEXTO:**
- Background Dark (#040013).
- Fullscreen (100vh).

**REQUISITOS VISUAIS & TÉCNICOS:**

1.  **Background Vídeo:**
    - Desktop URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4`
    - Mobile URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4`
    - Comportamento: Loop, Muted, Object-cover.
    - Overlay: Gradiente sutil da cor #040013 para garantir leitura.

2.  **Grid & Layout:**
    - **Desktop:** Grid 12 colunas. Vídeo/Espaço negativo nas colunas 1-6. Texto alinhado à DIREITA (colunas 7-12).
    - **Mobile:** Vídeo no topo (45-55vh), Texto abaixo (fundo sólido escuro).

3.  **Conteúdo (Texto):**
    - H1 Pequeno/Label: "Sou Danilo Novais."
    - Texto Manifesto (Quebras de linha importantes):
      "Você não vê tudo / o que eu faço. Mas / sente quando / funciona."
    - Subtexto (H2 style):
      "Crio design que observa, entende e guia experiências com intenção, estratégia e tecnologia — na medida certa."
    - *Destaque:* As palavras "não vê tudo" e "funciona" devem ter a cor `blueAccent` (#4fe6ff) ou `bluePrimary`.

4.  **Animação (Framer Motion):**
    - Entrada linha por linha.
    - Estado Inicial: opacity 0, blur 10px.
    - Estado Final: opacity 1, blur 0.
    - Stagger: 0.2s entre linhas.
    - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
    - Duração: 1.4s.

**SAÍDA ESPERADA:** Componente `HeroSection.tsx` totalmente responsivo e animado.

```

---

### 🤖 AGENTE 3: Desenvolvedor Frontend - Narrativa & Origem

**Objetivo:** Implementar a Seção 02 (Origem) com layout alternado e parallax.

```markdown
# PROMPT PARA AGENTE 3: SEÇÃO ORIGEM

Implemente a **Seção 02 - Origem Criativa**. O objetivo é profundidade narrativa.

**ESTRUTURA:**
1.  **Título Geral:** "Origem" (Label centralizada no topo).
2.  **Layout (Zig-Zag):**
    - Desktop: Grid 12 colunas. Alternar Texto (Esq) + Mídia (Dir) e vice-versa.
    - Mobile: 1 Coluna. Texto SEMPRE acima da mídia.
    - Mídias: Opacidade 0.85, Blur leve nas bordas.

**CONTEÚDO (4 BLOCOS):**

* **Bloco A:** "O QUE PERMANECE"
    - Texto: "Desde cedo, sempre prestei atenção no que ficava..." (ver doc completo).
    - Imagem: `.../sobre-1.webp`
* **Bloco B:** "DO TRAÇO À INTENÇÃO"
    - Texto: "Rabiscos viraram ideias..."
    - Imagem: `.../sobre-2.webp`
* **Bloco C:** "A DESCOBERTA DO INVISÍVEL"
    - Texto: "Foi ali que entendi: design não é enfeite..."
    - Imagem: `.../sobre-3.webp`
* **Bloco D:** "EXPANSÃO COM PROPÓSITO"
    - Texto: "Estudei Comunicação, mergulhei no design..."
    - Imagem: `.../sobre-4.webp`

**ASSETS:**
Base URL imagens: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/`

**INTERATIVIDADE (Parallax):**
Implemente um efeito de Parallax suave nas imagens usando `useScroll` e `useTransform` do Framer Motion.
- A imagem deve se mover levemente no eixo Y contra o scroll.
- Adicione um Motion Title (ex: `#001`, `#002`) que acompanha o scroll ao lado da imagem.

**SAÍDA ESPERADA:** Componente `OriginSection.tsx` com 4 blocos modulares e lógica de parallax isolada.

```

---

### 🤖 AGENTE 4: Desenvolvedor Frontend - Serviços & Método

**Objetivo:** Implementar Seção 03 (O que faço) e Seção 04 (Como trabalho).


# PROMPT PARA AGENTE 4: SEÇÃO SERVIÇOS & MÉTODO

Implemente duas seções técnicas e visuais: **"O Que Eu Faço"** e **"Como Eu Trabalho"**.

---
-

**PARTE A: SEÇÃO 03 (O QUE EU FAÇO)**

1.  **Layout:**
    - Desktop: Faixa horizontal única (flex-row) com 7 Cards.
    - Mobile: Coluna vertical (flex-col).
2.  **Cards:**
    - Estilo: "Pílula retangular", fundo Roxo Escuro translúcido (opacity 0.92), Ícone circular azul com seta (↗).
    - Conteúdo (7 itens):
      1. Direção criativa...
      2. Design estratégico...
      3. Identidades... (etc, ver doc original).
    - Hover Desktop: `translateY(-2px)` e brilho no fundo.
3.  **Footer Animado (Marquee):**
    - Duas faixas de texto infinito rodando em direções opostas.
    - Linha 1: "DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO..." (Esq -> Dir).
    - Linha 2: (Dir -> Esq).
    - Cor: Roxo (#8705f2) ou Branco com opacidade.

---
**PARTE B: SEÇÃO 04 (COMO EU TRABALHO - MÉTODO)**

1.  **Background:**
    - Vídeo: `VideoAboutMethod.mp4` (Full bleed).
    - Overlay: Gradiente `rgba(10, 10, 20, 0.85)` (Esq) -> `rgba(10, 10, 20, 0.4)` (Dir).
2.  **Lista de Processo (6 Steps):**
    - Layout: Lista vertical à esquerda (Desktop) ou empilhada (Mobile).
    - Design do Item: Card transparente com borda esquerda Azul Primário (3px).
    - Itens:
      01 | Briefings bem construídos...
      02 | Estratégia como base...
      (até 06).
3.  **Animação:**
    - Stagger na entrada dos itens da lista (0.12s entre cada).
    - Hover no item: Borda fica mais grossa (4px) e leve `translateX`.

**SAÍDA ESPERADA:** Componentes `ServicesSection.tsx` (com Marquee) e `MethodSection.tsx`.

```

---

### 🤖 AGENTE 5: Creative Developer - Crenças & Reveal Final

**Objetivo:** Implementar a Seção 05 (O que me move), a parte mais complexa de animação temporal.

```markdown
# PROMPT PARA AGENTE 5: SEÇÃO CRENÇAS (COMPLEX MOTION)

Você é responsável pela "Seção 05 - O Que Me Move". Esta é uma experiência narrativa sequencial controlada por tempo/scroll.

**ESTRUTURA VISUAL (3 FASES):**

1.  **Título Fixo (Topo):**
    - Texto: "Acredito no **design que muda o dia** de alguém. Não pelo choque, **mas pela conexão.**"
    - Permanece visível durante toda a animação das frases abaixo.

2.  **Frases Rotativas (Centro):**
    - Área central que alterna 6 frases (uma por vez).
    - Frases:
      1. "Um vídeo que **respira**."
      2. "Uma marca que se **reconhece**."
      3. "Um detalhe que **fica**."
      4. "**Crio** para gerar presença."
      5. "**Mesmo** quando não estou ali."
      6. "**Mesmo** quando ninguém percebe o esforço."
    - **Timing:** Cada frase dura ~4.2s (Entrada 0.8s, Permanência 2.5s, Saída 0.6s). Loop total ~25s.
    - Motion: Fade in/out suave.

3.  **Reveal Final (Ghost):**
    - Após a última frase, revela-se o rodapé final da narrativa.
    - Layout Desktop (2 colunas):
      - Esq: Ghost 3D/Animado (use uma imagem estática placeholder ou componente Ghost existente se houver). Implemente "Olhos seguindo o mouse".
      - Dir: Texto gigante "ISSO É GHOST DESIGN".
    - Layout Mobile: Coluna única (Ghost acima, Texto abaixo).

**ASSETS:**
- Cor destaque: `#0048ff` (palavras em negrito).

**REQUISITOS TÉCNICOS:**
- Use `AnimatePresence` do Framer Motion para a rotação de frases.
- Assegure que a altura da seção seja suficiente (`140vh`) para acomodar a experiência sem corte abrupto no scroll.

**SAÍDA ESPERADA:** Componente `BeliefsSection.tsx` com a lógica de orquestração de tempo complexa.

```

### **2.13 Checklist de Validação**

**Funcional:**
- [ ] Vídeo fullscreen logo após Hero
- [ ] Aspect ratio 16:9 mantido em todas as telas
- [ ] Autoplay funciona (muted)
- [ ] Botão de som visível e funcional
- [ ] Vídeo muta ao sair da seção
- [ ] Lazy loading implementado
- [ ] Qualidade adaptativa baseada em conexão

**Acessibilidade:**
- [ ] Botão com `aria-label` e `aria-pressed`
- [ ] `playsInline` no mobile
- [ ] Descrição alternativa no vídeo
- [ ] Contraste adequado no overlay
- [ ] Foco visível no botão de som

**Performance:**
- [ ] `preload="metadata"`
- [ ] Poster estático carregado
- [ ] IntersectionObserver para lazy load
- [ ] Versões HD/SD disponíveis

---




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


