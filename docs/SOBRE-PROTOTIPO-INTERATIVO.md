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

## 🟣 SEÇÃO 03 — O QUE EU FAÇO

**Função:** Mostrar valor sem autopromoção.  
Transformar capabilities em lista silenciosa de entregas.

### Layout — Desktop

- Altura de referência: **≈100vh**, mas permite scroll se necessário.
- Fundo: `backgroundDark`.
- Container centralizado (`max-width` ≈ 1120px).
- Título:
  - Centralizado, em duas linhas, max-width ≈ 680px.
  - Muito espaço acima e abaixo (40–56px).
- Lista:
  - Implementada como **grid de cards GhostList**:
    - 7 itens fixos.
    - Em `lg`: **2 colunas**.
    - Em `xl`: **3 colunas**.
  - Cada card:
    - Fundo `neutral`, leve borda ou linha superior em `primary`.
    - Padding interno generoso (20–24px).
    - Texto alinhado à esquerda, sem ícones chamativos.
    - Opacity base ≈ 0.9 (não 1.0).

### Layout — Mobile

- Título centralizado com margem superior generosa.
- Lista de 7 cards em **1 coluna**:
  - Largura 100% do container.
  - Espaçamento vertical 12–16px entre cards.
  - Padding 16–20px por card.
- Sem side-by-side; tudo em scroll vertical.

### Responsividade

- `sm` e `md`:
  - 1 coluna para cards.
  - Tipografia um pouco maior para leitura em lista.
- `lg`:
  - 2 colunas, mantendo altura dos cards consistente.
- `xl`:
  - 3 colunas com mais respiro horizontal.

### Conteúdo

**Título**

> Do insight ao impacto.  
> Mesmo quando você não percebe.

**Lista**

- Direção criativa que organiza o caos  
- Design estratégico que guia decisões  
- Identidades que permanecem na memória  
- Campanhas multicanais com lógica e emoção  
- Branding que não grita — mas marca  
- Inteligência artificial aplicada à criação e automação  
- Liderança criativa com visão e método  

### Interação & Motion

- Cada **card** entra individualmente ao entrar no viewport.
- Stagger: **0.18s** entre itens.
- Entrada:
  - `opacity: 0 → 1`
  - `translateY: 18px → 0`
  - Sem scale.
- Hover (desktop):
  - **+5% de opacity** ou pequeno ajuste de cor do texto.
  - Sem escala.
  - Nenhum underline de links internos.
- Respeitar `prefers-reduced-motion`: sem animação, apenas fade-in instantâneo.

---

## 🟣 SEÇÃO 04 — COMO EU TRABALHO

**Função:** Gerar confiança racional através do método.  
Mostra que a criatividade é suportada por processo.

### Layout — Desktop

- Altura alvo: **≈120vh**.
- Fundo:
  - Vídeo abstrato/IA full-bleed:  
    `VideoAboutMethod.mp4`
  - `object-fit: cover`, ocupando 100% de largura e altura da seção.
  - Overlay escuro com gradiente (mais opaco na área de texto).
- Grid:
  - Container 12 colunas.
  - **Texto em primeiro plano** ocupando colunas 2–7.
  - À direita (col. 8–12): área onde o vídeo/ghost aparece com mais clareza (sem texto sobreposto).
- Conteúdo:
  - Título em duas linhas, alinhado à esquerda.
  - Parágrafo introdutório.
  - Lista de processo em **blocos horizontais**:
    - Cada item com índice (01–06) + texto.
    - Cards com fundo `neutral` translucido (overlay sobre o vídeo).

### Layout — Mobile

- Fundo:
  - Mesmo vídeo `VideoAboutMethod.mp4`, recortado priorizando o **lado direito** (ghost/IA).
  - Overlay ainda mais forte para contraste.
- Conteúdo:
  - Tudo em **1 coluna**.
  - Título, texto e lista ficam **sobre uma faixa escura sólida** (pode ser um pseudo-card sobre o vídeo).
  - Ghost/IA aparece como recorte de fundo ou miniatura ao final da seção, nunca competindo com o texto.
- Altura:
  - Flexível (>100vh se necessário).

### Responsividade

- `sm` e `md`:
  - 1 coluna.
  - Lista ocupa toda a largura do container.
  - Espaçamento vertical 20–24px entre itens.
- `lg+`:
  - 2 blocos visuais: texto à esquerda, vídeo mais visível à direita.
  - Cards da lista limitados em largura (≈75% do texto) para manter legibilidade.

### Conteúdo

**Título**

> Criatividade com método.  
> Impacto sem ruído.

**Texto introdutório**

> Antes da estética, existe intenção.  
> Antes do layout, existe lógica.  
> Antes do impacto, existe silêncio.

**Lista de processo**

- Briefings bem construídos para decisões claras  
- Estratégia como base de qualquer criação  
- Design com propósito, não só beleza  
- Revisões inteligentes, sem ruído desnecessário  
- IA e automações para escalar com qualidade  
- Métricas criativas: engajamento, retenção e resultado  

### Interação & Motion

- Background com **parallax ultra sutil** (opcional e respeitando `prefers-reduced-motion`).
- Texto principal:
  - Entra com **fadeGhost** (opacity + blur leve).
  - Após aparecer, permanece estático (sem loop).
- Motion geral:

| Frame | Estado                |
|-------|-----------------------|
| 0%    | invisível             |
| 100%  | visível e estático    |

- Nenhuma animação contínua no texto ou nos cards de processo.
- Vídeo faz o “movimento de fundo” da seção.

---

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
> Não pelo choque —  
> mas pela conexão.  
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
