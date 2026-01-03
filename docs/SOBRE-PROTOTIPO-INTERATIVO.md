# 🧠 SOBRE — PROTÓTIPO INTERATIVO + DESIGN SYSTEM
## portifoliodanilo.com
### Conceito-mãe: Ghost Design — presença que guia sem aparecer

---

## 📌 ESTE DOCUMENTO É A FONTE ÚNICA DA VERDADE

Este arquivo consolida **TODO** o conteúdo da página **/sobre**:

- Narrativa
- Conteúdo textual
- Layout (desktop + mobile)
- Motion
- Componentes
- Tokens técnicos
- Regras absolutas
- Auditoria

Nenhuma decisão fora deste documento é válida.

---

## 🖥 + 📱 VARIAÇÕES POR DISPOSITIVO (VISÃO GERAL)

A página **/sobre** é pensada como **mobile-first**, com expansão progressiva para desktop.

### Desktop (lg / xl)

- Grid conceitual de **12 colunas** com `max-width` ≈ 1120–1200px.
- Uso consistente de **espaço negativo** à esquerda ou direita para reforçar o conceito Ghost.
- Seções chave usam **2 colunas** (texto ↔ imagem/mídia), com alternância fluida.
- Vídeos e imagens têm **opacidade reduzida** e/ou **overlay escuro** para manter o texto sempre legível.
- Hero e seção 04 usam **texto sobre vídeo**, porém **sempre com overlay escuro de alto contraste** (exceção controlada).

### Mobile (sm / md)

- **Uma coluna** em toda a página.
- **Texto sempre vem antes da imagem/vídeo** em cada bloco de conteúdo.
- Tipografia ligeiramente maior que na home para garantir leitura confortável em scroll longo.
- Espaçamentos verticais aumentados para separar claramente blocos de narrativa.
- Vídeos recortados para focar o elemento principal (rosto, ghost, IA) e reduzidos em altura.

### Tablets (md → < lg)

- Transição suave entre **uma** e **duas colunas**:
  - Conteúdos mais densos permanecem em 1 coluna.
  - Listas e grids podem começar a se dividir em 2 colunas.
- Mantém foco em legibilidade, nunca sacrifica leitura por “layout desktop comprimido”.

---

# PARTE 1 — PROTÓTIPO INTERATIVO (EXPERIÊNCIA)

# 🧠 PROTÓTIPO INTERATIVO — PÁGINA “SOBRE”

Domínio: **portifoliodanilo.com**  
Conceito-mãe: **Ghost Design — presença que guia sem aparecer**

---

## 🎯 OBJETIVO DA PÁGINA

Criar conexão silenciosa, profundidade e confiança.  
Nada grita. Nada explica demais.  
O design age no subconsciente.

---

## 🎨 SISTEMA VISUAL — COLOR PALETTE

| Token           | Valor     | Uso                               |
|----------------|-----------|------------------------------------|
| primary        | #0048ff   | Marca, destaques, CTAs            |
| accent         | #4fe6ff   | Glow, atmosferas Ghost            |
| ghostPurple    | #8705f2   | Detalhes, ghost, pupilas          |
| background     | #000022   | Fundo geral                       |
| backgroundDark | #040013   | Fundo principal das seções        |
| backgroundLight| #f0f0f0   | Formulários e respiros            |
| text           | #fcffff   | Texto principal                   |
| textSecondary  | #a1a3a3   | Metadados                         |
| neutral        | #0b0d3a   | Gradientes, cards, listas         |
| neutralLight   | #F5F5F5   | Seções claras (contato/footer)    |

---

## HEADER — MESMO DA HOME

- Mesmo componente de header utilizado na página **/home**.
- **Desktop**:
  - Logo à esquerda.
  - Navegação principal à direita (home, sobre, portfólio do acaso, contato).
  - Link ativo (**/sobre**) destacado em `primary`.
  - Fundo translúcido sobre o vídeo do hero com borda inferior sutil em `primary`.
- **Mobile**:
  - Logo à esquerda, ícone de menu (hambúrguer) à direita.
  - Menu abre em overlay escuro, ocupando tela inteira, sem blur exagerado.
- Comportamento em scroll:
  - Pode fixar no topo com fundo mais sólido.
  - Nunca utiliza efeitos chamativos de scale/bounce.

---

## 🟣 SEÇÃO 01 — HERO / MANIFESTO

**Função:** Primeiro contato. Estabelecer presença sem exposição.  
O usuário entra direto em um estado de observação.

### Layout — Desktop

- Altura: **100vh** (`h-screen`).
- Fundo:
  - Vídeo hero desktop (loop, sem controles visíveis):  
    `VIDEO HERO - SOBRE-DESKTOP.mp4`
  - `object-fit: cover`, ocupando toda a viewport.
  - Overlay em `backgroundDark` com gradiente sutil (mais escuro atrás do texto).
- Grid:
  - Container central com `max-width` ≈ 1120px.
  - Conceito 12 colunas:
    - Colunas **1–6**: espaço negativo + vídeo.
    - Colunas **7–12**: bloco de texto.
- Texto:
  - Bloco de texto **alinhado à direita da página**, mas com textos **alinhados à esquerda** dentro do bloco.
  - Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  - Sem CTA aqui.
- Regra de contraste:
  - Hero é **exceção controlada** à regra “texto sobre imagem”, sempre com overlay escuro e contraste AA+.

### Layout — Mobile

- Header fixo no topo, comum à home.
- Vídeo hero mobile:  
  `VIDEO HERO - SOBRE MOBILE.mp4`
  - Posicionado logo abaixo do header.
  - Altura aproximada: **45–55vh**, `object-fit: cover`, focando o rosto.
- Bloco de texto:
  - Vem **logo abaixo** da área do vídeo, dentro do mesmo fundo escuro.
  - Largura 100% do container, com padding horizontal de 16–20px.
  - Texto **centralizado** (alinhamento visual mais próximo da composição do layout atual).
- Altura:
  - `min-height: 100vh`, permitindo scroll se o texto for mais longo.

### Motion (frame-by-frame)

| Frame | Estado                      |
|-------|-----------------------------|
| 0%    | opacity 0 / blur 10px       |
| 30%   | aparece linha 1             |
| 60%   | aparece linha 2             |
| 100%  | texto completo visível      |

- Entrada **linha a linha**.
- Delay entre linhas: **0.2s – 0.4s**.
- Duração média: **1.4s**.
- Easing: **ghostIn** = `cubic-bezier(0.22, 1, 0.36, 1)`.
- Background de vídeo com **loop lento**, sem mudanças bruscas.

### Conteúdo

**H1**

> Sou Danilo Novais.

**Texto manifesto**

> Você não vê tudo  
> o que eu faço. Mas  
> sente quando  
> funciona.  
>
> Crio design que observa, entende  
> e guia experiências com intenção,  
> estratégia e tecnologia — na medida certa.

Palavras-chave como **“não vê tudo”** e **“funciona”** podem usar a classe `.ghost-accent` (azul).

---

## 🟣 SEÇÃO 02 — ORIGEM CRIATIVA

**Função:** Construir profundidade, tempo e memória.  
Mostra trajetória sem cronologia rígida, mas com ritmo.

### Layout — Desktop

- Altura média: **120–140vh** (scroll leve).
- Fundo: `backgroundDark`.
- Topo da seção:
  - Linha horizontal discreta em `primary`.
  - Label **“ORIGEM”** centralizado, em `textSecondary` ou `primary` suave.
- Grid:
  - Container em 12 colunas, com alternância texto ↔ mídia.
  - **Quatro blocos** principais, sempre em pares texto + mídia:
    1. **Bloco A**
       - Esquerda (col. 2–6):  
         Texto “Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia.”
       - Direita (col. 8–12):  
         Vídeo `photo.mp4` (retrato) em loop silencioso, opacidade máx **0.85**, blur leve constante.
    2. **Bloco B**
       - Esquerda: imagem `squetch.webp` (palco).
       - Direita: texto “Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros.”
    3. **Bloco C**
       - Esquerda: texto “Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação.”
       - Direita: imagem `design.webp` (“New Design, New Inspiration”).
    4. **Bloco D**
       - Esquerda: vídeo `AI.mp4` (IA) com as mesmas regras de opacidade/blur.
       - Direita: texto sobre Comunicação, design, branding e IA.
- Imagens e vídeos:
  - Nunca chegam a **100% de opacidade**.
  - Blur leve permanente (1–2px) para sugerir memória.
  - Nunca encostam no texto: margem lateral mínima de 24px.

### Layout — Mobile

- Fundo `backgroundDark` contínuo.
- Elementos **em 1 coluna**, na ordem:
  - Label **“ORIGEM”** centralizado.
  - Para cada bloco:
    1. Texto
    2. Mídia correspondente (imagem ou vídeo).
- Largura:
  - Texto com padding horizontal de 16–20px.
  - Imagens/vídeos com `width: 100%` do container, `border-radius` suave.
- Altura:
  - Seção cresce livremente conforme a quantidade de texto e mídia (scroll natural).

### Responsividade

- `sm`:
  - Uma coluna.
  - Tipografia ligeiramente maior, line-height mais relaxado.
  - Espaçamento vertical de 24–32px entre blocos.
- `md`:
  - Mantém uma coluna, mas pode limitar a largura máxima das mídias a ~80% para respiro lateral.
- `lg+`:
  - Ativa grid alternado texto ↔ mídia.
  - Pequenos deslocamentos verticais entre imagens (±16px) para sensação de fluxo orgânico, sem quebrar alinhamentos principais.

### Conteúdo

**Título (H2 discreto)**

> Origem

**Blocos textuais e mídias**

1.  
   > Desde cedo, sempre prestei atenção no que ficava —  
   > não só no que aparecia.  
   >
   > *(mídia: vídeo `photo.mp4`)*

2.  
   > Rabiscos viraram ideias.  
   > Ideias viraram projetos.  
   > E os projetos começaram a deixar rastros.  
   >
   > *(mídia: imagem `squetch.webp`)*

3.  
   > Foi ali que entendi:  
   > design não é enfeite.  
   > É ferramenta invisível de transformação.  
   >
   > *(mídia: imagem `design.webp`)*

4.  
   > Estudei Comunicação, mergulhei no design, no branding  
   > e hoje uso inteligência artificial para expandir o alcance  
   > sem perder a essência humana da criação.  
   >
   > *(mídia: vídeo `AI.mp4`)*

### Interação & Motion

- Texto aparece **progressivamente** conforme scroll (viewport).
- Imagens e vídeos:
  - Entram com deslocamento lateral de **10–15px** (direita ou esquerda conforme coluna).
  - Opacity máxima **0.85**.
  - Blur leve permanente.
- Nada aparece de uma vez:
  - Stagger suave entre blocos (0.18–0.25s).
- Easing: **ghostIn**.
- Respeitar `prefers-reduced-motion`: se ativado, conteúdo aparece diretamente em opacity 1 (sem deslocamento).

---

# 🟣 SEÇÃO 03 — O QUE EU FAÇO

**Função:** Mostrar valor sem autopromoção.  
Transformar capabilities em lista silenciosa de entregas.

---

## Layout — Desktop

- **Altura de referência:** ≈100vh, mas permite scroll se necessário.
- **Fundo:** `backgroundDark` (#0A0A14 ou similar).
- **Container centralizado:** max-width ≈ 1120px com padding lateral 24–32px.

### Título
- Centralizado, em duas linhas, max-width ≈ 800px.
- Espaçamento: **64–80px acima**, **48–64px abaixo**.
- Primeira linha: "Do **insight** ao **impacto**." (insight e impacto em `primary`)
- Segunda linha: "Mesmo quando você não percebe." (em branco)
- Tipografia: font-size 40–48px, line-height 1.2, font-weight 600–700.

### Lista de Cards
- **Grid de 7 cards** (quantidade fixa conforme imagens).
- **Layout responsivo:**
  - `lg` (1024px+): **2 colunas** balanceadas
  - `xl` (1280px+): **3 colunas** (linha 1: 3 cards | linha 2: 3 cards | linha 3: 1 card centralizado)
- **Gap:** 20–24px entre cards.

### Estrutura de cada Card
- **Fundo:** `neutral` (#1A1A2E ou rgba(255,255,255,0.04))
- **Borda superior:** 2px sólida em `primary` (#5B5FFF)
- **Padding interno:** 24–28px
- **Alinhamento:** texto à esquerda
- **Opacity base:** 0.92
- **Border-radius:** 8–12px

**Conteúdo do card:**
- **Ícone:** círculo pequeno (8–10px) preenchido em `primary`, alinhado com a primeira linha do título
- **Título:** em `primary`, font-weight 600, font-size 18–20px
- **Descrição:** em branco, font-weight 400, font-size 14–16px, line-height 1.5, spacing entre título e descrição: 8px

---

## Layout — Mobile

- **Título:** 
  - Centralizado, max-width 90%.
  - Margem superior: **40–48px**.
  - Margem inferior: **32–40px**.
  - Font-size: 28–32px, line-height 1.2.

### Lista de Cards
- **1 coluna**, largura 100% do container (padding 16–20px lateral).
- **7 cards empilhados verticalmente**.
- **Espaçamento vertical:** 16–20px entre cards.
- **Padding por card:** 20–24px.

**Estrutura do card (mobile):**
- Mantém borda superior em `primary`.
- Ícone e texto alinhados verticalmente.
- Font-size título: 16–18px.
- Font-size descrição: 14–15px.

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- 1 coluna de cards
- Título: 28–30px
- Padding container: 16px

### Medium (`md`: 768px–1023px)
- 1 coluna de cards (transição para 2 colunas próximo a `lg`)
- Título: 32–36px
- Padding container: 20–24px

### Large (`lg`: 1024px–1279px)
- **2 colunas de cards**
- Grid: `grid-template-columns: repeat(2, 1fr)`
- Última linha com 1 card centralizado usando `grid-column: span 1` ou flexbox
- Título: 38–42px

### Extra Large (`xl`: 1280px+)
- **3 colunas de cards**
- Grid: `grid-template-columns: repeat(3, 1fr)`
- Última linha com 1 card centralizado usando `grid-column: 2 / 3`
- Título: 44–48px
- Max-width container: 1120–1200px

---

## Conteúdo dos 7 Cards

1. **Direção criativa** | que organiza o caos
2. **Design estratégico** | que guia decisões
3. **Identidades** | que permanecem na memória
4. **Campanhas** | multicanais com lógica e emoção
5. **Branding** | que não grita — mas marca
6. **Inteligência artificial** | aplicada à criação e automação
7. **Liderança criativa** | com visão e método

---

## Interação & Motion

### Animação de Entrada (Scroll)
- Cada card entra individualmente ao entrar no viewport.
- **Stagger:** 0.15–0.18s entre cada card.
- **Efeito:**
  - `opacity: 0 → 1`
  - `translateY: 24px → 0`
  - `duration: 0.5s`
  - `easing: cubic-bezier(0.4, 0, 0.2, 1)`

### Hover (Desktop)
- **Opacity:** 0.92 → 1.0
- **Borda superior:** aumenta de 2px → 3px
- **Transform:** `translateY: 0 → -4px)` (elevação sutil)
- **Transition:** 0.3s ease
- Sem scale, sem underline.

### Estados
- **Default:** opacity 0.92
- **Hover:** opacity 1.0 + elevação
- **Focus:** outline em `primary` para acessibilidade

### Acessibilidade
- Respeitar `prefers-reduced-motion`:
  - Sem translateY
  - Apenas fade-in instantâneo (0.2s)
  - Sem stagger perceptível

---

## Notas de Implementação

- Usar **Intersection Observer** para trigger de animações no scroll.
- Cards devem ter altura mínima consistente para evitar quebras visuais no grid.
- Considerar usar `grid-auto-rows: 1fr` para igualar altura de cards em cada linha.
- Textura ou noise sutil no fundo para profundidade (opcional, seguindo direção de arte).
- Garantir contraste mínimo AA/AAA para texto em `primary` sobre fundo escuro.



# 🟣 SEÇÃO 04 — COMO EU TRABALHO

**Função:** Gerar confiança racional através do método.  
Mostra que a criatividade é suportada por processo.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** ≈120vh (permite scroll se necessário).
- **Fundo:**
  - Vídeo abstrato/IA full-bleed: `VideoAboutMethod.mp4`
  - `object-fit: cover`, ocupando 100% de largura e altura da seção
  - **Overlay escuro:** gradiente radial ou linear
    - Mais opaco na área de texto (esquerda): `rgba(10, 10, 20, 0.85)`
    - Mais transparente na área visual (direita): `rgba(10, 10, 20, 0.4)`
  - Vídeo em loop contínuo, sem controles

### Grid & Composição
- Container de 12 colunas, max-width ≈ 1200px
- **Coluna de conteúdo (esquerda):** colunas 2–7
  - Padding vertical: 80–100px
  - Padding lateral: 32–40px
- **Área visual (direita):** colunas 8–12
  - Vídeo/ghost aparece com mais clareza
  - Sem texto sobreposto

### Título
- Alinhado à esquerda
- Duas linhas:
  - "**Criatividade** com **método**." (criatividade e método em `primary`)
  - "**Impacto** sem **ruído**." (impacto em branco, ruído levemente dimmed)
- Font-size: 44–52px
- Line-height: 1.15
- Font-weight: 700
- Margin-bottom: 32–40px

### Texto Introdutório
- Três frases em parágrafos separados ou quebras de linha
- Font-size: 18–20px
- Line-height: 1.6
- Font-weight: 400
- Opacity: 0.9
- Max-width: 520px
- Margin-bottom: 48–56px

### Lista de Processo
- **6 itens** em blocos horizontais/verticais
- Cada item estruturado como card:
  - **Fundo:** `rgba(26, 26, 46, 0.7)` ou `rgba(255, 255, 255, 0.05)` com backdrop-filter blur
  - **Borda esquerda:** 3px sólida em `primary`
  - **Padding:** 20–24px
  - **Margin-bottom:** 16–20px
  - **Border-radius:** 6–8px

**Estrutura de cada item:**
- **Índice:** `01`–`06` em `primary`, font-size 16–18px, font-weight 700, display inline ou como prefix
- **Texto:** em branco, font-size 16–18px, font-weight 400, line-height 1.5
- Spacing entre índice e texto: 12–16px

---

## Layout — Mobile

### Fundo
- Mesmo vídeo `VideoAboutMethod.mp4`
- **Position:** `object-position: right center` (prioriza ghost/IA no lado direito)
- **Overlay:** mais forte para garantir contraste
  - `rgba(10, 10, 20, 0.88)` uniforme ou gradiente vertical (mais escuro no topo)

### Estrutura
- **1 coluna**, largura 100%
- Padding lateral: 20–24px
- Padding vertical: 60–80px

### Conteúdo
- **Título:**
  - Centralizado ou alinhado à esquerda
  - Font-size: 32–36px
  - Margin-bottom: 24–32px
  
- **Texto introdutório:**
  - Centralizado
  - Font-size: 16–17px
  - Max-width: 100%
  - Margin-bottom: 40–48px
  - Frases podem estar em linha contínua ou separadas com `<br/>`

- **Lista:**
  - 6 itens empilhados verticalmente
  - Cada card com:
    - Fundo mais sólido: `rgba(26, 26, 46, 0.85)`
    - Padding: 16–20px
    - Margin-bottom: 14–16px
    - Borda esquerda mantida

### Ghost/IA Visual
- Pode aparecer como:
  - **Opção 1:** recorte de fundo fixo com parallax desabilitado
  - **Opção 2:** miniatura ou fade-in ao final da seção (abaixo da lista)
  - **Opção 3:** apenas sugestão visual no overlay do vídeo de fundo
- **Nunca competindo** com legibilidade do texto

### Altura
- Flexível, >100vh se necessário
- Min-height: 100vh para evitar corte visual

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- 1 coluna
- Título: 30–32px
- Texto intro: 15–16px
- Lista ocupa 100% da largura
- Spacing vertical entre cards: 14–16px

### Medium (`md`: 768px–1023px)
- 1 coluna
- Título: 36–40px
- Texto intro: 17–18px
- Cards com max-width: 90%
- Padding container: 24–28px

### Large (`lg`: 1024px–1279px)
- **2 blocos visuais:**
  - Texto: colunas 1–7
  - Vídeo visível: colunas 8–12
- Título: 42–46px
- Lista com max-width: 75% da área de texto
- Cards com largura limitada para manter legibilidade

### Extra Large (`xl`: 1280px+)
- Grid: colunas 2–7 para texto, 8–12 para vídeo
- Título: 48–52px
- Texto intro: 19–20px
- Cards: max-width ≈ 560px
- Mais respiro horizontal e vertical

---

## Conteúdo dos 6 Itens

1. **01** | Briefings bem construídos para decisões claras
2. **02** | Estratégia como base de qualquer criação
3. **03** | Design com propósito, não só beleza
4. **04** | Revisões inteligentes, sem ruído desnecessário
5. **05** | IA e automações para escalar com qualidade
6. **06** | Métricas criativas: engajamento, retenção e resultado

---

## Interação & Motion

### Background Video
- **Parallax ultra sutil** (opcional):
  - `translateY` de -20px a 20px no scroll
  - Apenas se `prefers-reduced-motion: no-preference`
- Vídeo em loop contínuo
- Sem controles, muted, autoplay

### Animação de Entrada (Scroll)

**Título:**
- `opacity: 0 → 1`
- `filter: blur(8px) → blur(0)`
- `translateY: 30px → 0`
- Duration: 0.8s
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Texto introdutório:**
- Mesma animação do título
- Delay: 0.2s após título

**Lista de processo:**
- Cada card entra individualmente
- **Stagger:** 0.12s entre itens
- Animação:
  - `opacity: 0 → 1`
  - `translateX: -20px → 0`
  - Duration: 0.5s
  - Easing: `ease-out`
- Delay inicial: 0.4s após texto introdutório

### Estados de Hover (Desktop)

**Cards da lista:**
- **Default:** opacity 0.9
- **Hover:**
  - Opacity: 1.0
  - Borda esquerda: 3px → 4px
  - `translateX: 0 → 4px` (deslocamento sutil para direita)
  - Backdrop blur aumenta levemente
- Transition: 0.3s ease

### Acessibilidade
- **prefers-reduced-motion:**
  - Sem parallax
  - Sem translateY/translateX
  - Apenas fade-in instantâneo (0.2s)
  - Sem stagger perceptível

---

## Notas de Implementação

### Vídeo
- Formato: MP4, WebM como fallback
- Compressão otimizada para web
- Resolução: 1920x1080 mínimo
- Duração: 10–20s em loop
- Considerar poster frame para carregamento inicial

### Performance
- Lazy load do vídeo se fora do viewport inicial
- Usar Intersection Observer para animações
- Considerar `will-change: transform, opacity` nos elementos animados

### Overlay
- Usar `::before` ou `::after` no container da seção
- Position: absolute, z-index entre vídeo e conteúdo
- Background: `linear-gradient(90deg, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0.4) 100%)`

### Contraste
- Garantir WCAG AA mínimo em todo texto
- Testar legibilidade em diferentes dispositivos
- Ajustar overlay se necessário

### Z-index Stack
1. Vídeo: `z-index: 1`
2. Overlay: `z-index: 2`
3. Conteúdo: `z-index: 3`

---

## Variações de Implementação

### Opção 1: Vídeo Full-bleed (Recomendada)
- Vídeo ocupa toda seção
- Conteúdo em primeiro plano com overlay
- Melhor impacto visual

### Opção 2: Split Screen
- Desktop: 50/50 texto/vídeo
- Mobile: vídeo como background fixo
- Mais tradicional, menos imersivo

### Opção 3: Vídeo como Card
- Vídeo contido em card à direita
- Mais controle, menos dramático
- Útil se performance for crítica

**Escolha baseada em:** performance do dispositivo, largura de banda esperada, e direção de arte geral do site.





## 🟣 SEÇÃO 05 — O QUE ME MOVE

**Função:** Criar vínculo emocional e manifesto.  
Momento mais íntimo, quase carta aberta.

### Layout — Desktop

- Altura alvo: **100vh**.
- Fundo: `backgroundDark`.
- Grid:
  - Container com 12 colunas.
  - Texto principal ocupa colunas **2–7**.
  - À direita (col. 8–11/12): **ícone Ghost animado** + selo “ISSO É GHOST DESIGN”.
- Texto:
  - Blocos de frases com quebras intencionais, reforçando ritmo de pensamento.
  - Muito espaço negativo acima e abaixo.
- Ghost:
  - Tamanho visível, mas não exagerado (máx ≈ 300px de largura).
  - Olhos seguem direção do cursor de forma leve.

### Layout — Mobile

- Seção em **1 coluna**.
- Texto:
  - Largura total do container, com padding 16–20px.
  - Alinhamento **centralizado**.
  - Quebras de linha mantidas para ritmo poético.
- Ghost:
  - Posicionado **após o texto**, centralizado.
  - Tamanho reduzido (max-width ≈ 180–220px).
  - “ISSO É GHOST DESIGN” logo abaixo, também centralizado.

### Responsividade

- `sm`:
  - Texto mais espaçado verticalmente.
  - Ghost menor e com maior margem superior.
- `md`:
  - Ainda 1 coluna, mas pode aproximar ghost do texto.
- `lg+`:
  - 2 colunas (texto ↔ ghost).
  - Ghost sempre alinhado ao centro vertical da altura de texto.

### Conteúdo

> Acredito no design que muda o dia de alguém.  
> Não pelo choque, mas pela conexão.  
>
> Um vídeo que respira.  
> Uma marca que se reconhece.  
> Um detalhe que fica.  
>
> Crio para gerar presença.  
> Mesmo quando não estou ali.  
> Mesmo quando ninguém percebe o esforço.  
>
> Isso é ghost design.

### Animação Ghost

Implementação base (já existente) — **olhos seguem cursor em grade 3x3**:

**Ghost.module.css**

css
/* Ghost.module.css */
/* Cores definidas como variáveis locais para fácil ajuste */
.ghostContainer {
  --ghost-blue: #0048ff;
  --ghost-purple: #8705f2;
  --ghost-dark: #040013;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--ghost-dark);
  overflow: hidden;
}

.svgIcon {
  width: 100%;
  max-width: 300px; /* Tamanho máximo do fantasma */
  height: auto;
}

/* A animação suave dos olhos */
.eyeGroup {
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(
    calc(var(--target-x, 0) * 1px),
    calc(var(--target-y, 0) * 1px)
  );
}


Ghost.tsx
import React, { useEffect, useState } from 'react';
import styles from './Ghost.module.css';

const Ghost: React.FC = () => {
  // Estado para armazenar a direção do olhar (-1, 0, ou 1)
  const [lookDir, setLookDir] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = event;

      // Divide a tela em três terços verticais e horizontais
      let x = 0;
      let y = 0;

      // Define X (-1: esquerda, 0: centro, 1: direita)
      if (clientX < innerWidth / 3) x = -1;
      else if (clientX > (innerWidth * 2) / 3) x = 1;

      // Define Y (-1: cima, 0: centro, 1: baixo)
      if (clientY < innerHeight / 3) y = -1;
      else if (clientY > (innerHeight * 2) / 3) y = 1;

      setLookDir({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Limpeza do evento quando o componente desmontar
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.ghostContainer}
      style={
        {
          '--target-x': lookDir.x,
          '--target-y': lookDir.y,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 14 14" className={styles.svgIcon}>
        <defs>
          <rect
            id="pixel-dot-rect"
            x="0.175"
            y="0.175"
            width="0.7"
            height="0.7"
            rx="0.2"
          />
          <pattern
            id="pixel-dot-pattern"
            viewBox="0 0 1 1"
            width="1"
            height="1"
            patternUnits="userSpaceOnUse"
          >
            {/* CORPO: Azul Elétrico */}
            <use fill="#0048ff" href="#pixel-dot-rect" />
          </pattern>
          <mask id="pixel-dot-mask">
            <rect fill="white" width="14" height="14" />
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="black"
              d="M 0 0 h5M 9 0h5 M 0 1h3 M 11 1h3 M 0 2h2 M 12 2h2M 0 3h1 M 
13 3h1M 0 4h1 M 13 4h1 M 0 5h1 M 13 5h1 M 4 12h1 M 9 12h1 M 
0 13h1 M 3 13h3 M8 13h3 M 13 13h1"
            />
          </mask>
        </defs>

        <rect
          mask="url(#pixel-dot-mask)"
          fill="url(#pixel-dot-pattern)"
          width="14"
          height="14"
        />

        {/* GRUPO DOS OLHOS */}
        <g className={styles.eyeGroup}>
          {/* Olho Esquerdo */}
          <g transform="translate(2 3)">
            {/* Fundo do olho */}
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="#040013"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            {/* Pupila */}
            <g fill="#8705f2">
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>

          {/* Olho Direito */}
          <g transform="translate(8 3)">
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="#040013"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            <g fill="#8705f2">
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Ghost;


## 🟣 **SEÇÃO 06 — FECHAMENTO / CONFIRMAÇÃO**
Função: Convite claro e humano.  
Conectar narrativa com ação, sem agressividade.

**Layout — Desktop**  
Altura alvo: 80–100vh.  
Fundo: `backgroundDark`.  
Container 12 colunas, max-width ≈ 1120px.  

**Estrutura:**  
- Título principal centralizado.  
- Parágrafos de contexto logo abaixo.  
- CTAs alinhados à direita ou ao centro, em mesma linha.  

Abaixo desta seção entram, na mesma ordem da home:  
- Marcas / clientes  
- Contato (formulário em fundo claro)  
- Footer  

**Layout — Mobile**  
- Seção em 1 coluna.  
- Título e texto centralizados.  
- CTAs empilhados verticalmente, ocupando toda a largura do container.  
- Espaço vertical generoso acima dos clientes e do formulário.

---

**Conteúdo**  
Hoje sou Diretor de Criação,  
com mais de 10 anos de estrada.  

Já liderei marcas, agências, eventos  
e criei experiências para todos os canais.  

Agora, quero criar algo que permaneça —  
com você.

**CTAs**  
[ Fale comigo ]  
[ Download Curriculum ]

**Comportamento dos botões:**  
- **Hover:**  
  Leve mudança de opacidade ou cor do texto.  
  Sem scale, sem animações chamativas.  
- **Foco acessível:**  
  Outline visível e coerente com o sistema de cor.

**Interação & Motion**  
- Texto entra com `fadeGhost` padrão (opacity + blur leve).  
- CTAs surgem logo após o texto (delay 0.2–0.3s).  
- Sensação de "respirar" antes do contato:  
  - Sem loops.  
  - Sem animações exageradas.

---

✨ **APÓS A SEÇÃO 06**  
Na página `/sobre`, após a seção de fechamento, entram as mesmas seções reutilizadas da home:  
- Marcas / Clientes  
- Contato (fundo claro, formulário, informações de contato)  
- Footer  

O comportamento visual e responsivo dessas seções é definido na documentação da home e não deve ser alterado aqui, apenas reutilizado.

---

🎬 **MOTION TOKENS (RESUMO)**  
- Duração padrão: `0.9s`  
- Duração longa: `1.4–1.6s`  
- Delay padrão: `0.2–0.4s`  
- Easing principal: `cubic-bezier(0.22, 1, 0.36, 1)` (`ghostIn`)  
- Escala: **proibida**  
- Bounce: **proibido**  
- Rotate: **proibido**  
- Opacity nunca é brusca.  
- Imagens nunca chegam a 100% — usar máx `0.85–0.9`.

---

📱 **BREAKPOINTS (COMPORTAMENTO NA /SOBRE)**  

| Breakpoint | Min width | Regra principal                                             |
|------------|-----------|-------------------------------------------------------------|
| sm         | 640px     | Fonte maior, 1 coluna em todas as seções                   |
| md         | 768px     | Ainda 1 coluna; ajustes de respiro e hierarquia            |
| lg         | 1024px    | Layout completo com colunas duplas onde previsto           |
| xl         | 1280px    | Mais respiro lateral e grids de 3 colunas (listas)         |

*Mapeamento técnico: ver tokens breakpoints na Parte 2.*

---

🚫 **REGRAS ABSOLUTAS — PÁGINA /SOBRE**  
❌ Texto diretamente sobre imagem/vídeo sem overlay escuro 80%+  
❌ Blur excessivo que prejudique leitura  
❌ Scale / bounce / rotate em conteúdo  

✅ **Exceções controladas:**  
- Hero (texto sobre vídeo com overlay sólido).  
- Seção 04 (texto em card escuro sobre vídeo).  
- Alternância fluida desktop texto ↔ mídia  
- Mobile-first (texto sempre antes da imagem)  
- Ritmo frase ↔ imagem, sem colagens visuais.

---

🧩 **EXPERIÊNCIA FINAL (NARRATIVA)**  
O usuário não percebe a técnica.  
Não vê o esforço.  
Não sente ruído.  

Mas sente presença.  
Sente fluidez.  
Sente confiança.  

Isso é o protótipo interativo da página SOBRE.

---

---

## **PARTE 2 — DESIGN SYSTEM TÉCNICO (IMPLEMENTAÇÃO)**

🧠 **GHOST DESIGN SYSTEM — TÉCNICO**  
_Tokens + Componentes_  
portifoliodanilo.com  

### 1. VISÃO GERAL  
Ghost Design é um sistema silencioso de interface.  
Ele prioriza:  
- Presença sem ruído  
- Movimento como respiração  
- Design como guia invisível  

Este documento é a fonte técnica oficial para design, frontend e motion.

### 2. DESIGN TOKENS  
#### 2.1 Color Tokens  
```ts
export const colors = {
  primary: '#0048ff',
  accent: '#4fe6ff',
  ghostPurple: '#8705f2',
  background: '#000022',
  backgroundDark: '#040013',
  backgroundLight: '#f0f0f0',
  textPrimary: '#fcffff',
  textSecondary: '#a1a3a3',
  textInverse: '#0e0e0e',
  neutral: '#0b0d3a',
  neutralLight: '#F5F5F5',
};
```

#### 2.2 Typography Tokens  
```ts
export const typography = {
  fontFamily: {
    primary: '"Inter", system-ui, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '28px',
    xxl: '40px',
    display: '56px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};
```

#### 2.3 Spacing Tokens  
```ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  xxl: '64px',
  section: '120px',
};
```

#### 2.4 Motion Tokens (CRÍTICO)  
```ts
export const motion = {
  duration: {
    fast: '0.6s',
    base: '0.9s',
    slow: '1.4s',
  },
  delay: {
    none: '0s',
    short: '0.2s',
    base: '0.4s',
    long: '1s',
  },
  easing: {
    ghost: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
};
```

**🚫 Proibido:**  
- scale  
- bounce  
- rotate  

**Permitido:**  
- opacity  
- blur  
- translateY (máx 18px)  

### 3. COMPONENTES BASE  
#### 3.1 `<GhostText />`  
_Uso: Manifestos, frases-chave_  
```tsx
<GhostText as="p" delay={0.4}>
  Você não vê tudo o que eu faço.
</GhostText>
```  
**Comportamento**  
- Fade + blur.  
- Entrada por tempo ou viewport.  
- Nunca reanima depois de visível.  

#### 3.2 `<GhostHeading />`  
```tsx
<GhostHeading level="h1">
  Sou Danilo Novais.
</GhostHeading>
```  
- Alinhamento fluido.  
- Peso médio.  
- Tracking negativo leve.  

#### 3.3 `<GhostSection />`  
_Wrapper padrão de seção._  
```tsx
<GhostSection height="100vh">
  {children}
</GhostSection>
```  
**Regras**  
- Uma seção = uma intenção.  
- Nunca empilhar múltiplas animações diferentes na mesma área.  

#### 3.4 `<GhostList />`  
```tsx
<GhostList
  items={[
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
  ]}
/>
```  
- Entrada item a item.  
- Stagger fixo: 0.18s.  
- Hover só altera opacity/cor do texto.  

#### 3.5 `<GhostMedia />`  
```tsx
<GhostMedia type="video" src="/sobre/AI.mp4" />
```  
**Regras**  
- Opacity máx 0.85.  
- Blur permanente sutil.  
- Nunca texto diretamente sobre a mídia; se houver, usar overlay sólido.  

#### 3.6 `<GhostCTA />`  
```tsx
<GhostCTA href="/contato">
  Fale comigo
</GhostCTA>
```  
- Sem glow exagerado.  
- Hover silencioso (opacity/cor).  
- Sempre com tom humano, nunca agressivo.  

### 4. LAYOUT SYSTEM  
#### 4.1 Grid Invisível  
**Desktop (lg+)**  
- 12 colunas virtuais.  
- Texto tipicamente em colunas 2–7.  
- Mídia em colunas 8–12.  

**Mobile (sm / md)**  
- 1 coluna.  
- Texto sempre antes da imagem/vídeo.  

*Objetivo: o usuário não percebe o grid, apenas o ritmo.*

#### 4.2 Section Heights  

| Tipo        | Altura alvo |
|-------------|-------------|
| Hero        | 100vh       |
| Conteúdo    | 120–140vh   |
| Fechamento  | 80–100vh    |

*Valores são referências, não travas rígidas. A prioridade é fluxo narrativo.*

#### 4.3 Layout Responsivo por Seção  
- **Seção 01**  
  - Mobile: 1 coluna, texto centralizado.  
  - Desktop: texto à direita sobre vídeo com overlay.  
- **Seção 02 (Origem)**  
  - Mobile: blocos texto → mídia empilhados.  
  - Desktop: alternância texto ↔ mídia em 2 colunas.  
- **Seção 03 (O que eu faço)**  
  - Mobile: lista em 1 coluna.  
  - Desktop: grid de 2–3 colunas de cards.  
- **Seção 04 (Como eu trabalho)**  
  - Mobile: texto em faixa escura sobre vídeo recortado (lado direito).  
  - Desktop: texto à esquerda, vídeo/ghost em evidência à direita.  
- **Seção 05 (O que me move)**  
  - Mobile: texto centralizado + ghost abaixo.  
  - Desktop: texto à esquerda, ghost à direita.  
- **Seção 06 (Fechamento)**  
  - Mobile: CTAs empilhados.  
  - Desktop: CTAs lado a lado, com texto central.  

### 5. BREAKPOINTS (TÉCNICO)  
```ts
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

### 6. ACESSIBILIDADE & PERFORMANCE  
- Respeitar `prefers-reduced-motion` em todas as animações.  
- Nenhuma animação rodando fora do viewport.  
- **Vídeos:**  
  - `loading="lazy"` (quando possível).  
  - `muted`, `autoplay`, `loop`.  
- Sem re-render em scroll contínuo:  
  - Usar observers (`IntersectionObserver`) em vez de listeners de scroll diretos.  
- Contraste sempre AA+:  
  - Especialmente em hero e seção 04 (texto sobre vídeo com overlay).  

### 7. REGRAS ABSOLUTAS DO SISTEMA  
❌ Texto direto sobre imagem/vídeo sem overlay  
❌ Animações chamativas (glow, bounce, scale)  
❌ Motion decorativo desconectado da narrativa  

✅ Ritmo  
✅ Silêncio  
✅ Presença  

### 8. MANIFESTO TÉCNICO  
O melhor design:  
- não explica  
- não chama atenção  
- não se impõe  

Ele permanece.  

Isso é Ghost Design System.

🧩 **REGRA FINAL**  
Se algo:  
- não está aqui  
- não respeita este documento  
- ou altera o ritmo Ghost  

➡ É BUG.  

Ghost Design não é estilo.  
É comportamento.
```
