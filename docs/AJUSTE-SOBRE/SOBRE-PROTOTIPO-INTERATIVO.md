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
- Fundo: `backgroundDark`. (#040013)
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

# 🟣 **SEÇÃO 03 — O QUE EU FAÇO**
## Protótipo Interativo + Rodapé Animado (Ghost Design)

---

## 🎯 Função da Seção

Mostrar valor sem autopromoção.  
Transformar **capabilities** em uma lista silenciosa de entregas, finalizada com um **rodapé animado** que atua como fechamento rítmico da seção.

---

## 📐 Layout — Desktop

- Altura de referência: ≈100vh  
- Fundo: `backgroundDark` → `#040013`  
- Container centralizado:
  - max-width: 1120–1200px  
  - padding-inline: 24–32px  

---

### 🟣 Título

Texto:
> Do **insight** ao **impacto**.  
> Mesmo quando você não percebe.

- Centralizado  
- Duas linhas  
- max-width ≈ 800px  
- Espaçamento:
  - 64–80px acima  
  - 48–64px abaixo  

Tipografia:
- font-size: 40–48px  
- line-height: 1.2  
- font-weight: 600–700  

---

## 🧩 Lista de Cards

### Grid — Desktop
- Total: 7 cards  
- lg (≥1024px): 2 colunas  
- xl (≥1280px): 3 colunas  
- Gap: 20–24px  

### Estrutura do Card
- Fundo: `rgba(255,255,255,0.04)`  
- Borda superior: 2px em `primary`  
- Padding: 24–28px  
- Border-radius: 8–12px  
- Opacity base: 0.92  

---

## 📌 Conteúdo dos Cards

1. Direção criativa — que organiza o caos  
2. Design estratégico — que guia decisões  
3. Identidades — que permanecem na memória  
4. Campanhas — multicanais com lógica e emoção  
5. Branding — que não grita, mas marca  
6. Inteligência artificial — aplicada à criação e automação  
7. Liderança criativa — com visão e método  

---

## **Rodapé Animado da Seção 03**

## 📍 Posicionamento
Inserido logo após o grid de cards, dentro da mesma seção.

---

## 🧾 Conteúdo
- Linha 01: Direção criativa  
- Linha 02: Inteligência artificial  
- Cor do texto: branca  
- Opacity: ~0.75  
- Background: mesmo da seção  

---

## 🎬 Motion
- Duas faixas horizontais  
- Direções opostas  
- Velocidade influenciada pelo scroll  
- Loop infinito  
- Sem scale, sem bounce  

---

## 🧩 Implementação — Framer Motion

```tsx
'use client';

import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
} from 'framer-motion';
import { useRef } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function MarqueeLine({ text, baseVelocity }) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-2, 0, 2]
  );

  const x = useTransform(baseX.current, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    moveBy += moveBy * velocityFactor.get();
    baseX.current += moveBy;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="flex gap-12" style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-white text-lg md:text-xl font-medium tracking-wide opacity-75"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Section03Marquee() {
  return (
    <div className="mt-16 md:mt-20 py-6 md:py-8" aria-hidden="true">
      <div className="flex flex-col gap-6">
        <MarqueeLine text="DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・" baseVelocity={-10} />
        <MarqueeLine text="BRANDING・INTELIGÊNCIA ARTIFICIAL・LIDERANÇA CRIATIVA・" baseVelocity={10} />
      </div>
    </div>
  );
}
```

---

## ♿ Acessibilidade
- Respeitar `prefers-reduced-motion`
- Em modo reduzido: animação desativada, texto estático

---

**Ghost Design não explica.  
Ele permanece.**


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




# 🟣 SEÇÃO 05 — O QUE ME MOVE

**Função:** Criar vínculo emocional e manifesto.  
Momento mais íntimo, quase carta aberta com narrativa sequencial.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** ≈140vh (permite scroll para acomodar a sequência animada).
- **Fundo:** `backgroundDark` (#040013).
- **Grid:**
  - Container de 12 colunas, max-width ≈ 1200px
  - Área de conteúdo: colunas 2–12

### Composição Visual

**Seção dividida em 3 momentos:**

#### 1. Título Fixo (Sempre visível no topo)
- Posicionamento: colunas 2–10, centralizado horizontalmente
- Permanece fixo durante toda a sequência
- Margin-top: 10–12vh
- Margin-bottom: 8–10vh

**Texto:**
> Acredito no **design que muda o dia** de alguém.  
> Não pelo choque, **mas pela conexão.**

**Estilo:**
- Font-size: 44–52px
- Line-height: 1.2
- Font-weight: 700
- Palavras em `primary`: "design que muda o dia" e "mas pela conexão"
- Max-width: 900px
- Text-align: center

#### 2. Área de Frases Rotativas (Centro da tela)
- Posicionamento: colunas 3–11
- Min-height: 40vh (espaço para frases transitarem)
- Display: flex, justify-content: center, align-items: center

**Frases que alternam (uma por vez):**
1. "Um vídeo que **respira**."
2. "Uma marca que se **reconhece**."
3. "Um detalhe que **fica**."
4. "**Crio** para gerar presença."
5. "**Mesmo** quando não estou ali."
6. "**Mesmo** quando ninguém percebe o esforço."

**Estilo de cada frase:**
- Font-size: 32–38px
- Line-height: 1.4
- Font-weight: 500
- Palavras em `primary` destacadas em negrito
- Text-align: center
- Max-width: 700px
- Opacity transition entre frases

#### 3. Reveal Final — Ghost + Manifesto
- Aparece após todas as frases rotativas
- Posicionamento: colunas 2–12
- Layout: Grid 2 colunas (desktop)
  - Coluna esquerda (6 cols): Ghost animado
  - Coluna direita (6 cols): Texto "ISSO É GHOST DESIGN"

**Ghost:**
- Max-width: 320–380px
- Centralizado verticalmente com o texto
- Implementa animação de olhos seguindo cursor (código existente)

**Texto "ISSO É GHOST DESIGN":**
- Alinhamento: à esquerda ou centralizado com o Ghost
- Font-size: 56–64px
- Line-height: 1.1
- Font-weight: 700
- "GHOST DESIGN" em `primary`
- "ISSO É" em branco

---

## Layout — Mobile

### Estrutura
- **1 coluna**, padding lateral: 20–24px
- **Altura:** Flexível, >120vh

### Título Fixo
- Centralizado, margin-top: 8vh
- Font-size: 28–34px
- Max-width: 100%
- Margin-bottom: 6–8vh
- Quebras de linha ajustadas para mobile:
  - "Acredito no **design que muda o dia** de alguém."
  - "Não pelo choque, **mas pela conexão.**"

### Área de Frases Rotativas
- Min-height: 35vh
- Font-size: 22–26px
- Max-width: 100%
- Padding: 0 16px
- Frases permanecem centralizadas

### Reveal Final
- **Layout em coluna** (não mais grid)
- **Ghost primeiro:**
  - Centralizado
  - Max-width: 200–240px
  - Margin-bottom: 32–40px
- **Texto "ISSO É GHOST DESIGN":**
  - Centralizado
  - Font-size: 36–42px
  - Line-height: 1.15
  - Quebra de linha opcional:
    - "ISSO É"
    - "GHOST DESIGN."

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- Título fixo: 28–30px
- Frases rotativas: 20–22px
- Ghost: 180–200px
- Texto final: 32–36px

### Medium (`md`: 768px–1023px)
- Título fixo: 34–38px
- Frases rotativas: 24–28px
- Ghost: 220–260px
- Texto final: 40–46px
- Considerar layout em coluna ainda

### Large (`lg`: 1024px–1279px)
- **Transição para grid 2 colunas no reveal final**
- Título fixo: 40–44px
- Frases rotativas: 30–34px
- Ghost: 280–320px
- Texto final: 48–54px

### Extra Large (`xl`: 1280px+)
- Título fixo: 48–52px
- Frases rotativas: 36–38px
- Ghost: 320–380px
- Texto final: 60–64px
- Max respiro entre elementos

---

## Animação & Sequência Temporal

### Timing da Sequência

**Fase 1: Título Fixo (0s)**
- Fade-in ao carregar a seção
- Permanece visível durante toda a experiência
- Animação inicial:
  - `opacity: 0 → 1`
  - `filter: blur(10px) → blur(0)`
  - Duration: 1.2s
  - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Fase 2: Frases Rotativas (Início após 1.5s)**

Cada frase tem um ciclo de:
- **Entrada:** 0.8s
- **Permanência:** 2.5s
- **Saída:** 0.6s
- **Pausa entre frases:** 0.3s

**Total por frase:** ≈4.2s  
**Total de 6 frases:** ≈25s

**Animação de cada frase:**

```
Entrada:
- opacity: 0 → 1
- translateY: 30px → 0
- filter: blur(8px) → blur(0)
- duration: 0.8s
- easing: ease-out

Permanência:
- Estado estático por 2.5s

Saída:
- opacity: 1 → 0
- translateY: 0 → -20px
- filter: blur(0) → blur(6px)
- duration: 0.6s
- easing: ease-in
```

**Fase 3: Reveal Final (Após ≈26.5s do início)**

**Ghost entra:**
- `opacity: 0 → 1`
- `scale: 0.8 → 1`
- `filter: blur(12px) → blur(0)`
- Duration: 1.2s
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce suave)

**Texto "ISSO É GHOST DESIGN" entra (delay 0.4s após Ghost):**
- `opacity: 0 → 1`
- `translateX: -30px → 0` (desktop) ou `translateY: 20px → 0` (mobile)
- `filter: blur(8px) → blur(0)`
- Duration: 1s
- Easing: ease-out

**Após reveal:** tudo permanece fixo (sem loops)

---

## Interação & Comportamento

### Ghost — Olhos Seguem Cursor
- Apenas ativo após o reveal final
- Sistema 3x3 grid (código já implementado)
- Transição suave: 0.2s `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Scroll Behavior
- Seção pode ter scroll interno ou ser parte do scroll geral da página
- Recomendado: usar **Intersection Observer** para:
  - Trigger do início da sequência quando 30% da seção entra no viewport
  - Pausar animações se usuário scrollar para fora

### States & Controles

**Estados da seção:**
1. `initial`: título invisível
2. `title-visible`: título aparece
3. `phrases-cycling`: frases em rotação
4. `final-reveal`: Ghost + manifesto aparecem
5. `static`: tudo visível e estático

**Considerar adicionar:**
- Botão "pular animação" (acessibilidade) → vai direto para `final-reveal`
- Progress indicator sutil (opcional)

---

## Acessibilidade

### prefers-reduced-motion
- **Se ativado:**
  - Título aparece instantaneamente
  - Frases aparecem todas de uma vez (sem rotação)
  - Reveal final instantâneo
  - Apenas fade-in rápido (0.3s) sem blur ou translateY

### Navegação por Teclado
- Ghost e texto final devem ser acessíveis via tab
- ARIA labels apropriados

### Screen Readers
- Adicionar `aria-live="polite"` na área de frases rotativas
- Garantir que o conteúdo completo seja lido mesmo com animações

---

## Notas de Implementação

### Tecnologias Sugeridas
- **React:** useState para controle de fase atual
- **Framer Motion** ou **GSAP:** para animações complexas
- **Intersection Observer:** para trigger inicial
- **CSS Custom Properties:** para timings configuráveis

### Estrutura de Dados

```typescript
const phrases = [
  { text: "Um vídeo que <strong>respira</strong>.", duration: 4200 },
  { text: "Uma marca que se <strong>reconhece</strong>.", duration: 4200 },
  { text: "Um detalhe que <strong>fica</strong>.", duration: 4200 },
  { text: "<strong>Crio</strong> para gerar presença.", duration: 4200 },
  { text: "<strong>Mesmo</strong> quando não estou ali.", duration: 4200 },
  { text: "<strong>Mesmo</strong> quando ninguém percebe o esforço.", duration: 4200 }
];
```

### Performance
- Preload do SVG do Ghost
- Otimizar blur filters (can be expensive)
- Considerar `will-change: transform, opacity` durante animações
- Limpar listeners de mousemove quando Ghost não está visível

---

# 🟣 SEÇÃO 06 — FECHAMENTO / CONFIRMAÇÃO

**Função:** Convite claro e humano.  
Conectar narrativa com ação, sem agressividade.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** 80–100vh
- **Fundo:** `backgroundDark` (#040013)
- **Container:** 12 colunas, max-width ≈ 1120px
- **Padding vertical:** 80–100px
- **Padding lateral:** 32–40px

### Composição

#### Área de Conteúdo (Centralizada)
- Colunas 3–11
- Display: flex, flex-direction: column, align-items: center
- Text-align: center

#### Título Principal
- Primeira linha com destaque em `primary`
- Margin-bottom: 32–40px

**Texto:**
> Hoje sou **Diretor de Criação**,  
> com mais de **10 anos de estrada**.

**Estilo:**
- Font-size: 40–48px
- Line-height: 1.25
- Font-weight: 700
- "Diretor de Criação" e "10 anos de estrada" em `primary`
- Max-width: 800px

#### Parágrafos de Contexto
- Dois blocos de texto
- Spacing entre blocos: 24–32px
- Margin-bottom total: 48–56px

**Bloco 1:**
> Já liderei marcas, agências, eventos  
> e **criei experiências** para todos os canais.

**Bloco 2:**
> Agora, quero criar algo que permaneça —  
> **com você**.

**Estilo:**
- Font-size: 20–24px
- Line-height: 1.5
- Font-weight: 400
- Opacity: 0.92
- "criei experiências" e "com você" em `primary`
- Max-width: 700px

#### CTAs (Call-to-Actions)
- Layout: flex row, gap 20–24px
- Alinhamento: center
- Margin-top: 56–64px

**Botão 1: "fale comigo"**
- Primary button style
- Background: `primary` (#5B5FFF)
- Color: white
- Padding: 16–20px 36–44px
- Border-radius: 50px (pill shape)
- Font-size: 16–18px
- Font-weight: 600
- Ícone: seta diagonal (arrow-up-right) à direita do texto

**Botão 2: "baixar curriculum"**
- Secondary/Ghost button style
- Background: transparent
- Border: 2px solid `primary`
- Color: `primary`
- Padding: 16–20px 36–44px
- Border-radius: 50px
- Font-size: 16–18px
- Font-weight: 600
- Ícone: seta diagonal (arrow-up-right) à direita do texto

---

## Layout — Mobile

### Estrutura
- **1 coluna**, largura 100%
- **Padding lateral:** 20–24px
- **Padding vertical:** 60–80px
- **Altura:** Flexível

### Conteúdo

#### Título Principal
- Centralizado
- Font-size: 28–34px
- Line-height: 1.3
- Margin-bottom: 24–28px
- Quebras de linha ajustadas:
  - "Hoje sou **Diretor de Criação**,"
  - "com mais de **10 anos de estrada**."

#### Parágrafos
- Font-size: 17–19px
- Line-height: 1.6
- Spacing entre blocos: 20–24px
- Margin-bottom: 40–48px
- Max-width: 100%

#### CTAs
- **Layout:** flex column (empilhados verticalmente)
- **Gap:** 16px
- **Largura:** 100% cada botão (max-width: 320px opcional)
- **Order:**
  1. "fale comigo" (primary)
  2. "baixar curriculum" (secondary)

**Estilo dos botões (mobile):**
- Padding: 14–16px 28–32px
- Font-size: 15–16px
- Mantém pill shape

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- Título: 28–30px
- Texto: 16–17px
- CTAs empilhados, largura 100%
- Gap entre CTAs: 14px

### Medium (`md`: 768px–1023px)
- Título: 32–36px
- Texto: 18–20px
- CTAs ainda empilhados ou começam a ficar lado a lado
- Max-width dos botões: 280px cada

### Large (`lg`: 1024px–1279px)
- **CTAs lado a lado** (flex row)
- Título: 38–42px
- Texto: 20–22px
- Gap entre CTAs: 20px

### Extra Large (`xl`: 1280px+)
- Título: 44–48px
- Texto: 22–24px
- Gap entre CTAs: 24px
- Máximo respiro e espaçamento

---

## Comportamento dos Botões

### Estados

**Default:**
- Primary: background `primary`, color white
- Secondary: border `primary`, color `primary`, background transparent

**Hover (Desktop):**
- **Primary:**
  - Background: lighten `primary` em 8–10%
  - Transform: `translateY(-2px)`
  - Box-shadow: `0 8px 20px rgba(91, 95, 255, 0.3)`
- **Secondary:**
  - Background: `rgba(91, 95, 255, 0.1)`
  - Border-color: lighten `primary` em 10%
  - Transform: `translateY(-2px)`
- **Transition:** 0.3s ease
- **Cursor:** pointer

**Active:**
- Transform: `translateY(0)`
- Transition mais rápida: 0.15s

**Focus (Acessibilidade):**
- Outline: 3px solid `primary` com offset 3px
- Sem remoção do outline padrão

**Disabled (se aplicável):**
- Opacity: 0.5
- Cursor: not-allowed
- Sem hover effects

### Ícones
- **Biblioteca:** Lucide React ou similar
- **Nome:** `ArrowUpRight`
- **Size:** 18–20px
- **Position:** à direita do texto com margin-left: 8–10px
- **Animação no hover:** 
  - Ícone: `translate(2px, -2px)` (movimento diagonal)
  - Duration: 0.3s

---

## Interação & Motion

### Animação de Entrada (Scroll)

**Título:**
- Trigger: 20% da seção no viewport
- `opacity: 0 → 1`
- `translateY: 30px → 0`
- `filter: blur(8px) → blur(0)`
- Duration: 0.8s
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Parágrafos:**
- Delay: 0.2s após título
- Mesma animação do título
- Duration: 0.7s

**CTAs:**
- Delay: 0.3s após parágrafos
- `opacity: 0 → 1`
- `translateY: 20px → 0`
- Stagger: 0.1s entre botões
- Duration: 0.6s
- Easing: ease-out

### Sensação de "Respirar"
- **Sem loops ou animações contínuas**
- Uma vez que entra, permanece estático
- Apenas hover effects nos botões
- Movimento só retorna ao scroll

### prefers-reduced-motion
- Todas as animações reduzidas para fade-in simples
- Duration: 0.3s
- Sem translateY ou blur
- Sem stagger

---

## Hierarquia Visual & Fluxo

### Sequência de Leitura
1. **Título** → estabelece credibilidade ("Diretor de Criação, 10 anos")
2. **Experiência** → valida através de histórico
3. **Proposta** → convite pessoal ("com você")
4. **Ação** → CTAs claros e acessíveis

### Linha Horizontal (Opcional)
- Entre título e parágrafos
- Ou acima/abaixo da seção
- Width: 100% do container ou 60%
- Height: 1px
- Color: `rgba(255, 255, 255, 0.1)`
- Margin: 40–48px vertical

---

## Conteúdo dos CTAs

### Botão 1: "fale comigo"
- **Ação:** Scroll suave até seção de contato (formulário)
- **Comportamento:** 
  - `document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' })`
  - Ou abre modal de contato
  - Ou link mailto (menos recomendado)

### Botão 2: "baixar curriculum"
- **Ação:** Download direto do CV em PDF
- **Comportamento:**
  - `<a href="/path/curriculum.pdf" download="GhostDesign_Curriculum.pdf">`
  - Ou abre em nova aba: `target="_blank" rel="noopener noreferrer"`
- **Analytics:** Track download event

---

## Seções Subsequentes

Após esta seção, na ordem:

1. **Marcas / Clientes** (fundo escuro mantido ou transição gradual)
2. **Contato** (formulário em fundo claro — contraste forte)
3. **Footer** (retorna ao fundo escuro)

### Transição para Seção de Marcas
- Padding-top generoso: 80–120px
- Pode ter linha divisória sutil
- Mantém fundo escuro ou inicia transição gradual

---

## Notas de Implementação

### Acessibilidade
- Heading hierarchy: `<h2>` para título principal
- Botões com `aria-label` descritivos se necessário
- Focus visible em todos os elementos interativos
- Contraste mínimo AA/AAA

### Performance
- Lazy load de assets se fora do viewport inicial
- Intersection Observer para animações
- `will-change` apenas durante animações

### Analytics
- Track impressions da seção
- Track clicks em cada CTA
- Track downloads do curriculum
- Eventos: `section_view`, `cta_click`, `cv_download`

### SEO
- Conteúdo semântico bem estruturado
- Texto alternativo em ícones (se relevante)
- Schema.org markup para pessoa/profissional (opcional)

---

## Variações Opcionais

### Versão com Linha do Tempo
- Adicionar mini timeline visual de carreira
- Apenas se não interferir na simplicidade

### Versão com Depoimento
- Quote curto de cliente/parceiro
- Posicionado entre parágrafos e CTAs
- Estilo ghost/sutil

### Versão com Social Proof
- Logos pequenos de 3-5 marcas principais
- Acima ou abaixo dos CTAs
- Escala de cinza, opacity 0.6

**Recomendação:** manter versão minimal e direta conforme especificado inicialmente.



------

##✨ **APÓS A SEÇÃO 06**  
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
