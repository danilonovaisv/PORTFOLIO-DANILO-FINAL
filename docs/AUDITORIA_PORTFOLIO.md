## Análise HOME · Header + Hero Ghost

## 1️⃣ Visão Geral

Com base nas referências enviadas:

- **Layout (fonte da verdade)**
  - Hero com ghost brilhante à esquerda, texto “[BRAND AWARENESS] / Você não vê o design. / Mas ele vê você.” alinhado à direita do ghost.
  - CTA “step inside” centralizado sob o texto principal.
  - Thumb/manifesto de vídeo no canto inferior direito do Hero.
  - Header em “pill” de glass fluido, full‑width, alinhado ao grid da página, com navegação “home / sobre / portfólio showcase / contato”.
  - Versões desktop e mobile bem definidas (hierarquia e ritmo mantidos).

- **Motion / Ghost (fonte da verdade técnica)**
  - CodePen “Ghost Hero” com:
    - Preloader em fullscreen com ghost SVG flutuando, olhos pulsando, texto “Summoning spirits” + progress bar.
    - Cena Three.js com ghost 3D seguindo o cursor, partículas, fireflies e shader de analog decay (grain, scanlines, jitter, vSync, vignette).
    - Transição preloader → conteúdo → canvas via classes `.fade-out` / `.fade-in` com `transition: opacity ...`.

- **Estado atual disponível para análise**
  - Você forneceu:
    - Referência de motion completa (HTML, CSS e TypeScript do CodePen Ghost Hero).
    - Referências visuais (crops do Hero, layout desktop completo e mobile).
  - **Não** há, neste contexto, o código renderizado da HOME em Next.js (App Router) com `HomeHero.tsx`, `Header.tsx` etc; só conhecemos os nomes dos arquivos via GitHub (`src/components/home/hero/HomeHero.tsx`, `src/components/layout/header/DesktopFluidHeader.tsx`, etc.), mas não o conteúdo.

Por isso:

- A análise de **layout + animações abaixo é feita cruzando**:
  - Referência visual (imagens da HOME).
  - Referência de motion (CodePen Ghost Hero).
- E **não consegue confirmar** se a implementação atual em Next.js já está alinhada 1:1, porque o JSX/CSS/Framer dos componentes reais não está acessível aqui.

Ainda assim, dá para:

1. Extrair **critérios objetivos** de layout e motion a partir das referências.
2. Identificar **riscos de desvio** claros observando o CodePen (ghost/canvas, preloader, analog shader).
3. Gerar **prompts atômicos** para o agente executor alinhar `Header` + `HomeHero` ao layout e motion de referência.

---

## 2️⃣ Diagnóstico por Seção

### 🎯 Seção: HEADER

**Contexto:**  
O CodePen Ghost Hero não implementa o header. O header visto nas imagens (desktop/mobile) parece vir de outro código (provavelmente `src/components/layout/header/*.tsx`), que não está visível aqui.

Por isso, os pontos abaixo são avaliados frente **ao que está implementado no snippet (Header ausente)** vs **o que a referência exige**.

- 📌 Fidelidade ao layout (HOME-PORTFOLIO-LAYOUYT-GHOST.jpg): **✗ (Não – Header não existe no snippet Ghost Hero)**  
- 🎞️ Qualidade da animação (glass/fluid): **✗ (Não – não há animação de glass no snippet analisado)**  
- ↔️ Integração com Hero: **✗ (Não – no snippet, o Hero ocupa fullscreen sem header)**  
- 📱 Mobile: **✗ (Não avaliável – não há variação de header mobile no snippet)**  

#### ❌ Problema

1. **Header inexistente no snippet de referência de motion**
   - O CodePen trabalha apenas com preloader + Hero central, sem qualquer estrutura de header (logo, navegação, glass fluido).
   - Isso impede verificar se o header real (em `DesktopFluidHeader.tsx`, `MobileHeaderBar.tsx`, etc.) está:
     - Alinhado ao grid/margens da HOME.
     - Proporcional em altura ao Hero.
     - Integrado ao glass/fluid 3D corretamente.

2. **Integração Header ↔ Hero não está prototipada no CodePen**
   - No snippet, tanto o `preloader` quanto `.content` estão com `position: fixed` e tomam 100% da viewport.
   - Em produção, o header precisa viver **acima** do Hero, com glass/fluid independente, sem competir com o ghost.

#### 🔧 Correção Técnica (especificação)

> Não é possível validar o código atual, então aqui estão **critérios corretivos** que o Header deve atender quando você alinhar `Header.tsx` / `DesktopFluidHeader.tsx` / `MobileHeaderBar.tsx` à referência.

- **Layout desktop**
  1. Header em forma de “pill” horizontal:
     - Ocupa aproximadamente **80–90% da largura** visual, alinhado ao centro, com margens laterais iguais às do Hero.
     - Altura visualmente proporcional (ligeiramente mais baixa que o Hero, não chamando mais atenção que o ghost).
  2. Logo à esquerda, navegação “home / sobre / portfólio showcase / contato” distribuída na metade direita.
  3. Fundo glass com blur + leve glow, mas **sem exceder** a intensidade luminosa do ghost.

- **Layout mobile**
  1. Header compacto, full‑width, com logo à esquerda + ícone de menu/hamburger à direita.
  2. Mantém a mesma lógica de margens laterais do Hero mobile (safe area consistente).

- **Motion (glass header)**
  1. Animação de entrada: fade/slide sutil (≤ 400 ms), com ease tipo `easeOut` ou `easeInOut`, **antes ou em sincronia** com a aparição do Hero – nunca depois.
  2. Qualquer deformação do glass/fluid 3D deve permanecer:
     - De baixa amplitude.
     - Sem variações bruscas de escala/posição que disputem atenção com o ghost no Hero.
  3. Respeitar `prefers-reduced-motion`:
     - Em modo “reduce”, desabilitar ondulações contínuas e manter apenas um fade-in estático do header.

#### ✅ Resultado Esperado

Quando o header real for alinhado:

- Visualmente, ele se comporta como a “tampa” da HOME:  
  um elemento glass/fluid fino, discreto e **perfeitamente alinhado** ao grid do Hero.
- No desktop:
  - Proporção Header ↔ Hero é a mesma da imagem de referência (header ~20–25% da altura visual do primeiro viewport).
  - Navegação e logo não saltam mais que o ghost + texto do Hero.
- No mobile:
  - Header compacto, com hierarquia clara (logo → menu), sem roubar espaço vertical excessivo do Hero.
- Em movimento:
  - A transição de entrada do header é editorial, suave, sem overshoot exagerado.
  - Em `prefers-reduced-motion`, o header é praticamente estático após o fade-in.

---

### 🎯 Seção: HERO (Ghost + Texto + CTA + Manifesto)

Aqui conseguimos ser mais específicos, pois temos:

- Layout visual do Hero (imagens desktop + mobile).
- CodePen com:
  - `preloader` (ghost SVG, texto “Summoning spirits”, progress bar).
  - `.content` com `[BRAND AWARENESS]` + `Você não vê / o design.` + `Mas ele vê você.`.
  - Cena Three.js com ghost 3D/analog decay ocupando fullscreen (canvas posicionado `absolute` em todo o body).

**Checklist em relação ao layout/motion de referência:**

- 📌 Grid corresponde à imagem? **✗ (Não – snippet é 1 coluna centralizada, referência é composição assimétrica com ghost à esquerda, texto à direita e thumb no canto)**  
- 📌 Margens laterais iguais? **✗ (Não – snippet usa padding genérico de `20px`, referência usa margens mais amplas alinhadas ao header e ao restante da página)**  
- 📌 Alinhamento das duas colunas consistente? **✗ (Não – no snippet não há segunda coluna para a thumb/manifesto)**  
- 📌 Proporção Header ↔ Hero correta? **✗ (Não avaliável no snippet – hero ocupa 100% da viewport sem header)**  
- 📌 Animações existem apenas onde a referência sugere? **✗ (Não – snippet adiciona fireflies, partículas “extras” e jitter forte que não aparecem na referência estática)**  
- 📌 Timing/Easing compatível com motion premium? **⚠️ Tendencialmente Não – intensidade de `analogVSync`, `analogJitter` e partículas pode estar acima do que a hierarquia de texto permite**  
- 📌 Mobile mantém hierarquia e ritmo? **✗ (Não – `.content` é `fixed` fullscreen e `body` tem `overflow: hidden`; isso não reflete a HOME mobile da referência, que é scrollável com múltiplas seções)**  

#### ❌ Problemas (Hero)

1. **Layout do Hero centralizado x Composição da referência**

   - Snippet:
     - `.content` é um flex container **centralizado** (`justify-content: center; align-items: center; text-align: center;`) ocupando a viewport inteira.
     - Não há CTA “step inside” nem botão algum no HTML fornecido.
     - Não há thumb/manifesto de vídeo no canto direito.
   - Referência:
     - Ghost luminoso ocupa **lado esquerdo** da composição (sobrepondo-se parcialmente à área de texto).
     - Texto está alinhado à direita do ghost, com alinhamento **à esquerda** (não centralizado).
     - CTA “step inside” está logo abaixo do texto, centralizado na coluna de texto.
     - Thumb/manifesto de vídeo está **ancorada na parte inferior direita** do Hero.

   ➜ Isso significa que **qualquer implementação em React/Next baseada diretamente no layout do CodePen estará divergente** do layout final.

2. **Canvas do ghost ocupando fullscreen com `pointer-events: auto`**

   - No snippet, o `renderer.domElement` (canvas) é posicionado como:

     ```ts
     renderer.domElement.style.position = "absolute";
     renderer.domElement.style.top = "0";
     renderer.domElement.style.left = "0";
     renderer.domElement.style.zIndex = "2";
     renderer.domElement.style.pointerEvents = "auto";
     renderer.domElement.style.background = "transparent";
     ```

   - Como ele cobre a viewport inteira e aceita eventos de ponteiro, existe o risco de:
     - Bloquear cliques no CTA “step inside”.
     - Bloquear interações na thumb/manifesto e em outros elementos do Hero.

   - Nas referências visuais, o ghost **não compete com o texto nem com a interação**; ele é pano de fundo/halo.

3. **Preloader + `.content` em `position: fixed` + `overflow: hidden` no body**

   - CSS atual:

     ```css
     html, body {
       width: 100%;
       height: 100%;
       overflow: hidden;
       background-color: #111;
     }

     .preloader {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       ...
     }

     .content {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       display: flex;
       ...
     }
     ```

   - Isso é aceitável como protótipo isolado, mas **não é compatível** com a HOME real:
     - Na HOME desktop/mobile de referência, o Hero é apenas a **primeira dobra**, com showcase, brands, contato etc. abaixo (scroll regular).
     - Com `overflow: hidden` em `body` e `.content`/`preloader` fixos, você impede o scroll da página e prende toda a experiência nessa tela.

4. **Animação e intensidade do efeito “Analog Decay” podem comprometer legibilidade**

   - Parâmetros iniciais no snippet:

     ```ts
     const params = {
       analogIntensity: 0.9,
       analogGrain: 0.4,
       analogBleeding: 0.9,
       analogVSync: 1.7,
       analogScanlines: 1.0,
       analogVignette: 2.4,
       analogJitter: 0.5,
       ...
     };
     ```

   - O shader aplica:
     - Grain procedural relativamente forte.
     - VSync roll, jitter horizontal/vertical e scanlines.
     - Vignette agressiva (`uAnalogVignette` alto).
   - Referência visual mostra um **ruído editorial sutil**, mas o texto “Você não vê o design” é claramente legível.

   ➜ Com esses valores, é provável que:
   - O texto fique mais “danificado” do que na referência estática.
   - A hierarquia (texto > ghost > ruído) se inverta em alguns momentos.

5. **Fireflies e partículas podem introduzir movimentos não sugeridos pela referência**

   - O snippet cria:
     - ~20 fireflies com movimento contínuo ao redor da cena.
     - Um sistema de partículas com movimento swirl, rotações e variações de opacidade.
   - As imagens de referência não sugerem esses elementos; o foco está em:
     - Ghost.
     - Glow em torno do texto.
     - Ruído analógico suave.

   ➜ Em uma implementação final, esses elementos podem ser percebidos como **decoração extra**, não como parte do conceito principal.

6. **Ausência de suporte a `prefers-reduced-motion`**

   - Não há checagem de `window.matchMedia("(prefers-reduced-motion: reduce)")`.
   - Tanto:
     - O preloader (ghost SVG flutuando, olhos pulsando).
     - Quanto a cena 3D (wobble, follow cursor, analog jitter, fireflies, partículas).
   - Continuam animando da mesma forma para todos os usuários.

   ➜ Isso viola o requisito de **“Respeitar prefers-reduced-motion”** e pode gerar desconforto.

7. **Hero mobile não reflete a composição mobile da HOME**

   - No snippet:
     - `.content` continua fullscreen fixo em qualquer viewport.
     - Tipografia baseada em `6vw` pode ficar excessivamente grande em alguns tamanhos de tela.
   - Na referência mobile:
     - Hero ocupa o topo, seguido do grid de vídeos, seções de portfólio, marcas, contato etc.
     - Tipografia é controlada e escalonada para leitura confortável em tela estreita.

#### 🔧 Correção Técnica (especificação)

Novamente: sem acesso ao JSX de `HomeHero.tsx`, aqui estão os **ajustes que a implementação precisa cumprir** para ficar 1:1 com as referências:

1. **Grid e composição do Hero**
   - Transformar o Hero em um layout de **duas zonas**:
     - Zona principal: ghost + texto + CTA (ocupando ~60–70% centrais).
     - Zona secundária: thumb/manifesto ancorada na borda direita/inferior da área do Hero.
   - Alinhamentos:
     - Ghost orb/3D posicionado **à esquerda** da coluna de texto (pode ficar parcialmente “por trás” do texto).
     - Texto alinhado à esquerda.
     - CTA “step inside” direto abaixo do texto, centralizado nessa coluna.
     - Thumb/manifesto com largura proporcional (~25–30% da largura do Hero), alinhada à direita.

2. **Canvas do ghost integrado ao layout**
   - O canvas deve:
     - Respeitar o container do Hero (não cobrir a página inteira por padrão).
     - Ser posicionado **como background/overlay** atrás do texto e CTA, com:
       - `pointer-events: none;`
       - `z-index` inferior ao texto/CTA, superior ao fundo.
   - O ghost continua seguindo o cursor, mas com limites/clamping para não atravessar CTA/manifesto de forma agressiva.

3. **Remoção de `position: fixed` para o conteúdo principal**
   - O Hero, na HOME final, deve ser um **section** normativa (`position: relative`, `height` controlada, inserida no flow da página).
   - `html, body` não podem ter `overflow: hidden`; o scroll da página deve funcionar normalmente.

4. **Refino do Analog Decay**
   - Manter o shader, mas com ajustes:
     - `analogIntensity` reduzido.
     - `analogJitter` e `analogVSync` suavizados.
     - `analogVignette` menos agressivo.
   - Objetivo:
     - Texto sempre legível.
     - Ruído percebido como “camada editorial”, não protagonista.

5. **Revisão de fireflies/partículas**
   - Se mantidos:
     - Ficam restritos à região próxima do ghost.
     - Opacidade e tamanho bem mais baixos, para não virar ruído visual.
   - Alternativamente:
     - Desabilitar totalmente no estado “produção” da HOME, usando-os apenas nos estudos do CodePen.

6. **Suporte a `prefers-reduced-motion`**
   - Para usuários com `reduce`:
     - Preloader sem animação de flutuação/olhos pulsando; apenas fade estático.
     - Ghost 3D fixo (sem follow cursor/wobble).
     - Analog shader com jitter/vSync desativados, apenas leve grain/vignette.

7. **Hero mobile alinhado à referência**
   - Stack vertical:
     - Header.
     - Hero (ghost + texto + CTA).
     - Thumb/manifesto logo abaixo (full‑width ou largura controlada).
   - Tipografia:
     - Títulos e subtítulos reescalonados para manter leitura confortável.
   - Animações:
     - Menos intensas, sem jitter forte, respeitando o menor espaço de tela.

#### ✅ Resultado Esperado

Com esses ajustes aplicados ao `HomeHero` (e ao canvas do ghost):

- **Desktop**
  - Hero reproduz a mesma composição da imagem:
    - Ghost “vazando” pelo lado esquerdo do texto.
    - CTA forte no centro da coluna de texto.
    - Thumb/manifesto ancorada no canto inferior direito.
  - O ghost e o noise criam atmosfera, mas **não prejudicam a legibilidade** do título e CTA.
  - Canvas não bloqueia cliques; CTA e manifesto são totalmente clicáveis.

- **Mobile**
  - Ordem visual: Header → Hero → thumb/manifesto → demais seções.
  - Escala tipográfica e espaçamentos seguem a lógica da referência mobile.
  - Motion está simplificado e respeita `prefers-reduced-motion`.

---

## 3️⃣ Lista de Problemas (com severidade)

> Observação: severidade aqui é em relação à **fidelidade às referências** e à hierarquia visual/motion.

### 🔴 Alta

1. **Hero centralizado em 1 coluna no snippet vs composição assimétrica da referência**  
   → Quebra de grid, alinhamento e hierarquia texto/ghost/manifesto.

2. **Canvas do ghost fullscreen com `pointer-events: auto`**  
   → Risco alto de bloquear interações (CTA “step inside”, manifesto, etc.).

3. **Uso de `position: fixed` + `overflow: hidden` no body**  
   → Impede o fluxo normal da HOME (portfólio, marcas, contato) como visto nas referências.

4. **Ausência de suporte a `prefers-reduced-motion`**  
   → Não atende o requisito de acessibilidade/motion editorial.

### 🟡 Média

5. **Intensidade do Analog Decay (grain, jitter, vSync, vignette) potencialmente acima da referência**  
   → Pode comprometer legibilidade/hierarquia, mas é ajustável via parâmetros.

6. **Fireflies e partículas extras não sugeridos explicitamente na referência**  
   → Podem ser percebidos como efeitos decorativos se muito evidentes.

7. **Hero mobile não respeitando a estrutura de página scrollável da referência**  
   → Hierarquia e ritmo mobile podem se perder.

### 🟢 Baixa

8. **Falta de implementação clara da thumb/manifesto no snippet de referência**  
   → Ainda que seja esperado ser adicionada na etapa de migração para Next/React, precisa ser especificada com proporção e ancoragem corretas.

9. **Integração visual Header ↔ Hero não prototipada no CodePen**  
   → Cabe garantir que os componentes `DesktopFluidHeader` e `HomeHero` compartilhem o mesmo grid/margens.

---

## 4️⃣ Prompts Técnicos para Agente Executor

Abaixo, prompts atômicos para serem executados em sequência. Ajuste os caminhos de arquivo conforme o seu projeto, mas mantendo a lógica.

---

### 🛠️ Prompt #01 — Alinhar Grid do Hero ao Layout 2 Colunas

**Objetivo**  
Ajustar o layout do Hero para refletir exatamente a composição da referência: ghost à esquerda, texto + CTA à direita e thumb/manifesto no canto inferior direito.

**Arquivos envolvidos**
- `src/components/home/hero/HomeHero.tsx`
- `src/components/home/hero/HomeHero.module.css` (ou equivalente)

**Ações**
1. Refatorar o container principal do Hero para usar um grid/flex de **duas zonas**:
   - Zona A: ghost + texto + CTA.
   - Zona B: thumb/manifesto ancorada à direita/inferior da área do Hero.
2. Garantir que o texto esteja alinhado à esquerda, com quebras de linha e espaçamentos idênticos ao layout (“Você não vê / o design.” + “Mas ele vê você.”).
3. Adicionar o CTA “step inside” na posição correta (logo abaixo do texto, centralizado na coluna).
4. Posicionar a thumb/manifesto no canto inferior direito do Hero, com proporção similar à referência.

**Regras**
- ❌ Não alterar conteúdo.
- ❌ Não criar novas animações.
- ✅ Usar o sistema de layout atual (CSS Modules/Tailwind).
- ✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

**Critérios de Aceite**
- [ ] Layout idêntico à referência.
- [ ] CTA e manifesto posicionados exatamente como no layout.
- [ ] Ghost alinhado à esquerda da coluna de texto.
- [ ] Mobile mantém a mesma lógica espacial (stack com hero + manifesto).

---

### 🛠️ Prompt #02 — Integrar Canvas do Ghost sem Bloquear Interações

**Objetivo**  
Garantir que o canvas do ghost atue como camada visual/ambiental, sem bloquear cliques em CTA ou manifesto.

**Arquivos envolvidos**
- `src/components/home/hero/HomeHero.tsx`
- `src/components/home/hero/GhostCanvas.tsx`
- `src/components/home/hero/HomeHero.module.css`

**Ações**
1. Confinar o `<canvas>` ao container do Hero (não mais fullscreen no `body`).
2. Aplicar:
   - `position: absolute; inset: 0;`
   - `pointer-events: none;`
   - `z-index` abaixo do texto/CTA/manifesto.
3. Garantir que o ghost ainda possa se aproximar da área de texto, mas sem obscurecer o conteúdo.

**Regras**
- ❌ Não alterar a lógica de movimento do ghost além do necessário para respeitar os limites do Hero.
- ❌ Não criar novos efeitos.
- ✅ Usar Framer Motion/R3F apenas para ajustes finos.
- ✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

**Critérios de Aceite**
- [ ] CTA e thumb/manifesto são clicáveis em toda a área.
- [ ] Canvas não captura eventos do mouse.
- [ ] Ghost permanece visível e alinhado à composição.

---

### 🛠️ Prompt #03 — Remover `position: fixed` e `overflow: hidden` da HOME

**Objetivo**  
Transformar o Hero em uma seção normal da HOME, permitindo scroll para showcase, marcas e contato.

**Arquivos envolvidos**
- `src/app/page.tsx`
- `src/components/home/hero/HomeHero.tsx`
- `src/styles/globals.css` (ou equivalente)

**Ações**
1. Remover `position: fixed` de `.content` e containers equivalentes no React.
2. Garantir que `html, body` **não** tenham `overflow: hidden` na HOME.
3. Ajustar o Hero para `position: relative`, altura definida (ex.: `min-height: 100vh` na primeira dobra) e integração no fluxo da página.

**Regras**
- ❌ Não alterar a ordem das seções da HOME.
- ❌ Não introduzir wrappers que quebrem o App Router.
- ✅ Preservar a proporção visual do Hero em relação ao Header.
- ✅ Validar desktop e mobile.

**Critérios de Aceite**
- [ ] Página rola do Hero até contato como na referência.
- [ ] Hero permanece visualmente idêntico ao primeiro frame da HOME.
- [ ] Nenhum elemento de scroll é bloqueado.

---

### 🛠️ Prompt #04 — Ajustar Intensidade do Analog Decay ao Nível Editorial

**Objetivo**  
Refinar a intensidade do shader de analog decay para que o ruído seja sutil e compatível com a referência, sem comprometer legibilidade.

**Arquivos envolvidos**
- `src/components/home/hero/GhostCanvas.tsx`
- Config de pós-processamento (onde `analogDecayPass` é configurado)

**Ações**
1. Reduzir valores iniciais de:
   - `analogIntensity`
   - `analogJitter`
   - `analogVSync`
   - `analogVignette`
2. Testar a leitura do texto “Você não vê o design. / Mas ele vê você.” durante a animação completa.
3. Ajustar até que o ruído seja perceptível, mas nunca domine a hierarquia.

**Regras**
- ❌ Não remover o efeito analog.
- ❌ Não adicionar novos passes de pós-processamento.
- ✅ Ajustar apenas parâmetros existentes.
- ✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

**Critérios de Aceite**
- [ ] Texto legível em qualquer momento.
- [ ] Ruído percebido como textura, não como elemento principal.
- [ ] Motion continua editorial e premium.

---

### 🛠️ Prompt #05 — Reduzir Fireflies/Partículas para Não Quebrarem Hierarquia

**Objetivo**  
Garantir que fireflies e partículas não ultrapassem o que a referência sugere em termos de motion.

**Arquivos envolvidos**
- `src/components/home/hero/GhostCanvas.tsx`

**Ações**
1. Localizar criação de fireflies e partículas (equivalente a `createFireflies` / `createParticle`).
2. Reduzir:
   - Quantidade total.
   - Escala.
   - Opacidade.
3. Limitar a zona de atuação à proximidade do ghost, sem atravessar o texto.

**Regras**
- ❌ Não adicionar novas partículas.
- ❌ Não mudar cores.
- ✅ Priorizar texto + CTA como foco.
- ✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

**Critérios de Aceite**
- [ ] Primeiro olhar do usuário vai para texto e CTA.
- [ ] Partículas não “competem” em brilho/movimento com o ghost.
- [ ] Motion segue a intenção editorial.

---

### 🛠️ Prompt #06 — Implementar `prefers-reduced-motion` no Preloader e no Ghost

**Objetivo**  
Respeitar `prefers-reduced-motion`, reduzindo animações contínuas no Hero.

**Arquivos envolvidos**
- `src/components/home/hero/HomeHero.tsx`
- `src/components/home/hero/GhostCanvas.tsx`

**Ações**
1. Criar hook/util para ler `prefers-reduced-motion`.
2. Se `reduce` estiver ativo:
   - Preloader: remover `ghostFloat` e `eyePulse`; manter ghost estático + fade-in/fade-out.
   - Ghost 3D: desabilitar follow do cursor e wobble contínuo.
   - Analog shader: zerar `analogJitter` e `analogVSync`, mantendo apenas leve grain/vignette.
3. Garantir que as transições de entrada permaneçam suaves e discretas.

**Regras**
- ❌ Não desligar completamente o Hero.
- ❌ Não criar versões alternativas de layout.
- ✅ Usar flags internas condicionadas ao media query.
- ✅ Comparar a experiência reduzida com a referência, mantendo hierarquia.

**Critérios de Aceite**
- [ ] Com `prefers-reduced-motion: reduce`, não há loops intensos de animação.
- [ ] Preloader, ghost e noise só fazem transições pontuais.
- [ ] Conteúdo continua visualmente fiel.

---

### 🛠️ Prompt #07 — Ajustar Hero Mobile para Manter Hierarquia e Ritmo

**Objetivo**  
Alinhar a versão mobile do Hero à lógica espacial da referência.

**Arquivos envolvidos**
- `src/components/layout/header/mobile/MobileHeaderBar.tsx`
- `src/components/home/hero/HomeHero.tsx`
- `src/components/home/hero/HomeHero.module.css`
- `src/app/page.tsx`

**Ações**
1. Em mobile, garantir ordem:
   - Header compacto com logo + menu.
   - Hero com ghost + texto + CTA.
   - Thumb/manifesto imediatamente abaixo.
2. Ajustar tipografia do Hero (font-size e line-height) para proximidade visual da referência mobile.
3. Reduzir jitter/ruído em telas pequenas, priorizando leitura.

**Regras**
- ❌ Não trocar ordem das seções em relação à referência.
- ❌ Não alterar textos.
- ✅ Reutilizar tokens de tipografia já existentes.
- ✅ Comparar visualmente com o layout mobile fornecido.

**Critérios de Aceite**
- [ ] Mobile mostra Header → Hero → manifesto na ordem correta.
- [ ] Texto legível sem zoom.
- [ ] Motion sutil, sem distrair do conteúdo.

---

### 🛠️ Prompt #08 — Sincronizar Entrada do Header e do Hero

**Objetivo**  
Garantir que Header e Hero entrem em cena como um sistema único, sem competição visual.

**Arquivos envolvidos**
- `src/components/layout/header/DesktopFluidHeader.tsx`
- `src/components/home/hero/HomeHero.tsx`
- Eventual layout de página (transições Framer Motion, se existir)

**Ações**
1. Definir sequência:
   - Header: fade/slide-in leve logo após o load.
   - Hero: entrada 80–150 ms depois, com texto/CTA e ghost em sync.
2. Ajustar delays e easing (`easeOut`/`easeInOut`) para que a atenção vá naturalmente para o Hero.
3. Garantir que o glass/fluid do header não tenha picos de animação simultâneos ao pico do analog/ghost.

**Regras**
- ❌ Não criar novas animações além da já planejada.
- ❌ Não alterar textos.
- ✅ Usar Framer Motion para controlar timing e stagger.
- ✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

**Critérios de Aceite**
- [ ] Header surge de forma sutil, sem roubar o foco do Hero.
- [ ] Entrada do Hero reforça a hierarquia do texto + CTA + ghost.
- [ ] Transição fluida em desktop e mobile.

---

Esses prompts formam a **Fase 2 (correção atômica)** a partir do diagnóstico acima.  
Quando o código de `HomeHero.tsx`, `Header.tsx` e cenas 3D estiver disponível no contexto, é possível descer ao nível de linha para ajustar cada ponto diretamente.

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


