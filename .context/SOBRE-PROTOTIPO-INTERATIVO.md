# 🧠 SOBRE — PROTÓTIPO INTERATIVO + DESIGN SYSTEM
## portifoliodanilo.com
### Conceito-mãe: Ghost Design — presença que guia sem aparecer

---

## 📌 ESTE DOCUMENTO É A FONTE ÚNICA DA VERDADE

Este arquivo consolida **TODO** o conteúdo da página **/sobre**:
- Narrativa
- Conteúdo textual
- Layout
- Motion
- Componentes
- Tokens técnicos
- Regras absolutas
- Auditoria

Nenhuma decisão fora deste documento é válida.

---

# PARTE 1 — PROTÓTIPO INTERATIVO (EXPERIÊNCIA)

# 🧠 PROTÓTIPO INTERATIVO — PÁGINA “SOBRE”
Domínio: portifoliodanilo.com
Conceito-mãe: Ghost Design — presença que guia sem aparecer

⸻

🎯 OBJETIVO DA PÁGINA

Criar conexão silenciosa, profundidade e confiança.
Nada grita. Nada explica demais.
O design age no subconsciente.

⸻

🎨 SISTEMA VISUAL — COLOR PALETTE

Token    Valor    Uso
primary    #0048ff    Marca, destaques, CTAs
accent    #4fe6ff    Glow, atmosferas Ghost
background    #040013    Fundo principal
backgroundLight    #f0f0f0    Formulários e respiros
text    #fcffff    Texto principal
textSecondary    #a1a3a3    Metadados
neutral    #0b0d3a    Gradientes
neutralLight    #F5F5F5    Seções claras


## **HEADER O MESMO DA HOME

## 🟣 SEÇÃO 01 — HERO / MANIFESTO
**Função:** Primeiro contato. Estabelecer presença sem exposição.

### Layout
- Viewport: 100vh
- Fundo: escuro contínuo
- Elemento visual sutil vídeo
- Video hero sobre Desktop: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE-DESKTOP.mp4
- Video hero sobre Mobile: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE%20MOBILE.mp4
- `h-screen`
- Texto centralizado verticalmente a direita (ligeiramente acima do centro)
- Vídeo hero (desktop e mobile)
- Sem CTA


### Motion (frame-by-frame)
| Frame | Estado |
|------|-------|
| 0% | opacity 0 / blur 10px |
| 30% | linha 1 |
| 60% | linha 2 |
| 100% | texto completo |


### Conteúdo
**H1**
> Sou Danilo Novais.

**Texto manifesto**
> Você não vê tudo 
> o que eu faço.Mas 
> sente quando 
> funciona.  
>  
> Crio design que observa, entende  
> e guia experiências com intenção,  
> estratégia e tecnologia — na medida certa.

### Interação & Motion
Etapa    Estado
0%    opacity 0 / blur 10px
30%    linha 1
60%    linha 2
100%    texto completo

    •    Entrada linha a linha
    •    Delay: 0.2s – 0.4s
    •    Duração média: 1.4s
    •    Easing: ghostIn

- Easing: ghostIn  
- Background com loop lento (imperceptível)

---

## 🟣 SEÇÃO 02 — ORIGEM CRIATIVA
**Função:** Construir profundidade, tempo e memória.

### Layout
- Altura: 120–140vh
- Texto alinhado à esquerda
- Imagens soltas, flutuantes (sem grid rígido)
- Imagens nunca chegam a 100% de opacidade

### Conteúdo
**Título (H2 discreto)**
> Origem

**Texto**
> Desde cedo, sempre prestei atenção no que ficava —  
> não só no que aparecia.  
- Video:https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/photo.mp4
>  
> Rabiscos viraram ideias.  
> Ideias viraram projetos.  
> E os projetos começaram a deixar rastros.  
- imagem: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/squetch.webp
>  
> Foi ali que entendi:  
> design não é enfeite.  
> É ferramenta invisível de transformação. 
- imagem: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/design.webp 
>  
> Estudei Comunicação, mergulhei no design, no branding  
> e hoje uso inteligência artificial para expandir o alcance  
> sem perder a essência humana da criação.
- Video: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/AI.mp4

### Interação & Motion
- Texto aparece progressivamente conforme scroll
- Imagens entram com deslocamento lateral de 10–15px
- Opacity máxima das imagens: 0.85
- Blur leve permanente nas imagens
- Easing: ghostIn
- Nada aparece de uma vez



---

## 🟣 SEÇÃO 03 — O QUE EU FAÇO
**Função:** Mostrar valor sem autopromoção.

### Layout
- Altura: 100vh
- Lista vertical centralizada
- Largura fixa: 520–600px
- Muito espaço entre itens

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
- Cada item entra individualmente ao entrar no viewport, cada card entra um de cada vez e o texto do card surge em fade in;
- Stagger: 0.18s entre itens
- Entrada: opacity + leve rise (18px)
- Hover:
  - Opacity +5%
  - Nenhuma escala
  - Nenhum underline

---

## 🟣 SEÇÃO 04 — COMO EU TRABALHO
**Função:** Gerar confiança racional através do método.

### Layout
- Altura: 120vh
- Texto em primeiro plano
- Fundo vivo (vídeo abstrato / código / IA em segundo plano)
- Fundo full-bleed
- Versão mobile ajustar para usar o lado direito do video.
- Vídeo: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/VideoAboutMethod.mp4

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
- Background com parallax ultra sutil
- Texto entra com fadeGhost
- Texto permanece estático após aparecer
- Nenhuma animação contínua no conteúdo principal



### Motion
| Frame | Estado |
|------|-------|
| 0% | invisível |
| 100% | visível e estático

Sem animação contínua no texto.
---

## 🟣 SEÇÃO 05 — O QUE ME MOVE
**Função:** Criar vínculo emocional e manifesto.

### Layout
- Altura: 100vh
- Texto centralizado
- Sem imagens óbvias
- Muito espaço negativo

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

### Interação & Motion
- Frases surgem por tempo, não por scroll
- Delay longo entre blocos (1s+)
- Entrada apenas com opacity e blur
- Nenhum deslocamento vertical
- Sensação: pensamentos aparecendo

### ANIMAÇÃO GHOST

Ghost.module.css: ["/* Ghost.module.css */

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
  /* Aqui usamos as variáveis que o React vai injetar */
  transform: translate(calc(var(--target-x, 0) * 1px), calc(var(--target-y, 0) * 1px));
}"]

Ghost.tsx ["import React, { useEffect, useState } from 'react';
import styles from './Ghost.module.css';

const Ghost: React.FC = () => {
  // Estado para armazenar a direção do olhar (-1, 0, ou 1)
  const [lookDir, setLookDir] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = event;

      // Lógica para replicar a grade 3x3 do original
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
      // Injetamos as variáveis CSS dinamicamente aqui
      style={{
        '--target-x': lookDir.x,
        '--target-y': lookDir.y,
      } as React.CSSProperties}
    >
      <svg viewBox="0 0 14 14" className={styles.svgIcon}>
        <defs>
          <rect id="pixel-dot-rect" x="0.175" y="0.175" width="0.7" height="0.7" rx="0.2" />
          <pattern id="pixel-dot-pattern" viewBox="0 0 1 1" width="1" height="1" patternUnits="userSpaceOnUse">
            {/* CORPO: Azul Elétrico */}
            <use fill="#0048ff" href="#pixel-dot-rect" />
          </pattern>
          <mask id="pixel-dot-mask">
            <rect fill="white" width="14" height="14" />
            <path 
              transform="translate(0 0.5)" 
              fill="none" 
              stroke="black" 
              d="M 0 0 h5M 9 0h5 M 0 1h3 M 11 1h3 M 0 2h2 M 12 2h2M 0 3h1 M 13 3h1M 0 4h1 M 13 4h1 M 0 5h1 M 13 5h1 M 4 12h1 M 9 12h1 M 0 13h1 M 3 13h3 M8 13h3 M 13 13h1" 
            />
          </mask>
        </defs>
        
        <rect mask="url(#pixel-dot-mask)" fill="url(#pixel-dot-pattern)" width="14" height="14" />
        
        {/* GRUPO DOS OLHOS: Controlado pela classe .eyeGroup e variáveis CSS */}
        <g className={styles.eyeGroup}>
          
          {/* Olho Esquerdo */}
          <g transform="translate(2 3)">
            {/* Fundo do olho (Azul Escuro/Dark) */}
            <path transform="translate(0 0.5)" fill="none" stroke="#040013" d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2" />
            {/* Pupila (Roxo) */}
            <g fill="#8705f2" className="dot">
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>

          {/* Olho Direito */}
          <g transform="translate(8 3)">
             {/* Fundo do olho (Azul Escuro/Dark) */}
            <path transform="translate(0 0.5)" fill="none" stroke="#040013" d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2" />
             {/* Pupila (Roxo) */}
            <g fill="#8705f2" className="dot">
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

export default Ghost;"]

---

## 🟣 SEÇÃO 06 — FECHAMENTO / CONFIRMAÇÃO
**Função:** Convite claro e humano.

### Layout
- Altura: 80–100vh
- Texto alinhado à esquerda
- CTAs visíveis e simples

### Conteúdo
> Hoje sou Diretor de Criação,  
> com mais de 10 anos de estrada.  
>  
> Já liderei marcas, agências, eventos  
> e criei experiências para todos os canais.  
>  
> Agora, quero criar algo que permaneça —  
> com você.

### CTAs
- [ Fale comigo ]
- [ Download Curriculum ]

### Interação & Motion
- Texto entra com fadeGhost padrão
- CTAs com hover mínimo:
  - leve mudança de opacidade
  - nenhuma animação chamativa
- Sensação de encerramento calmo

---

## 🎬 MOTION TOKENS (RESUMO)

- Duração padrão: 0.9s
- Duração longa: 1.4–1.6s
- Delay padrão: 0.2–0.4s
- Easing principal: cubic-bezier(0.22, 1, 0.36, 1)
- Escala: proibida
- Bounce: proibido
- Opacity nunca é brusca
- Imagens nunca chegam a 100%

---
## **APÓS IMPLEMENTAR AS MESMAS SESSÕES DA HOME:**
 - CLIENTES, CONTATO E FOTTER
 
 
 
## 🧩 EXPERIÊNCIA FINAL

O usuário não percebe a técnica.  
Não vê o esforço.  
Não sente ruído.

Mas sente presença.  
Sente fluidez.  
Sente confiança.

Isso é o protótipo interativo da página SOBRE.



## 📱 BREAKPOINTS

| Breakpoint | Regra |
|-----------|------|
| sm | fonte maior |
| md | sem colunas duplas |
| lg | layout completo |
| xl | mais respiro |

---

## 🚫 REGRAS ABSOLUTAS

- ❌ Texto sobre imagem
- ❌ Blur excessivo
- ❌ Scale / bounce
- ✅ Alternância fluida desktop
- ✅ Ritmo frase ↔ imagem
- ✅ Mobile-first

---

## 🧩 EXPERIÊNCIA FINAL

O usuário não percebe técnica.  
Mas sente ritmo, memória e presença.

Isso é **Ghost Design**.

---

# 🤖 PROMPT DE AUDITORIA AUTOMÁTICA — PÁGINA SOBRE (GHOST DESIGN)

Você é um **Agent Auditor Sênior Frontend/UI**, responsável por validar PRs
que alterem a página **/sobre** do site.

## Fonte da verdade
- `docs/PROTOTIPO_INTERATIVO_SOBRE_GHOST_COMPLETO.md`

---

## OBJETIVO
Garantir fidelidade TOTAL ao protótipo Ghost Design.
Qualquer divergência = BUG.

---

## CHECKLIST AUTOMÁTICO (OBRIGATÓRIO)

### Estrutura
- [ ] Seções 01 → 06 presentes e na ordem correta
- [ ] Componentes isolados por seção
- [ ] Nenhuma seção extra

### Layout
- [ ] Hero com texto alinhado à direita
- [ ] Origem com alternância fluida texto ↔ imagem
- [ ] Texto nunca sobre imagem
- [ ] Mobile sempre texto antes da imagem

### Motion
- [ ] Apenas opacity / blur / translate
- [ ] Sem scale / bounce / rotate
- [ ] Motion dispara apenas quando visível
- [ ] Manifesto é time-based (não scroll)

### Tipografia
- [ ] Keywords com `.ghost-accent`
- [ ] Hover apenas muda cor
- [ ] Máx. 1–2 keywords por parágrafo

### Performance
- [ ] Nenhuma animação fora do viewport
- [ ] prefers-reduced-motion respeitado
- [ ] Sem re-render excessivo

---

## SE ENCONTRAR PROBLEMAS
1. Liste o arquivo exato
2. Descreva o desvio objetivamente
3. Proponha correção mínima
4. Não altere conteúdo textual
5. Não "melhore" o design

---

## RESULTADO ESPERADO
- Fidelidade visual
- Ritmo ghost preservado
- UX silenciosa
- PR aprovado apenas se todos os itens passarem


---

# PARTE 2 — DESIGN SYSTEM TÉCNICO (IMPLEMENTAÇÃO)

# 🧠 GHOST DESIGN SYSTEM — TÉCNICO
## Tokens + Componentes
### portifoliodanilo.com

---

## 1. VISÃO GERAL

**Ghost Design** é um sistema silencioso de interface.
Ele prioriza:
- Presença sem ruído
- Movimento como respiração
- Design como guia invisível

Este documento é a **fonte técnica oficial** para design, frontend e motion.

---

# 2. DESIGN TOKENS

## 2.1 Color Tokens

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

---

## 2.2 Typography Tokens

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

---

## 2.3 Spacing Tokens

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

---

## 2.4 Motion Tokens (CRÍTICO)

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

🚫 Proibido:
- scale
- bounce
- rotate

Permitido:
- opacity
- blur
- translateY (máx 18px)

---

# 3. COMPONENTES BASE

## 3.1 `<GhostText />`

**Uso:** Manifestos, frases-chave

```tsx
<GhostText as="p" delay={0.4}>
  Você não vê tudo o que eu faço.
</GhostText>
```

**Comportamento**
- Fade + blur
- Entrada por tempo ou viewport
- Nunca reanima

---

## 3.2 `<GhostHeading />`

```tsx
<GhostHeading level="h1">
  Sou Danilo Novais.
</GhostHeading>
```

- Alinhamento fluido
- Peso médio
- Tracking negativo leve

---

## 3.3 `<GhostSection />`

Wrapper padrão de seção.

```tsx
<GhostSection height="100vh">
  {children}
</GhostSection>
```

**Regras**
- Uma seção = uma intenção
- Nunca empilhar animações

---

## 3.4 `<GhostList />`

```tsx
<GhostList
  items={[
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
  ]}
/>
```

- Entrada item a item
- Stagger fixo: `0.18s`
- Hover só altera opacity

---

## 3.5 `<GhostMedia />`

```tsx
<GhostMedia
  type="video"
  src="/sobre/AI.mp4"
/>
```

**Regras**
- Opacity máx 0.85
- Blur permanente sutil
- Nunca texto sobre mídia

---

## 3.6 `<GhostCTA />`

```tsx
<GhostCTA href="/contato">
  Fale comigo
</GhostCTA>
```

- Sem glow
- Hover silencioso
- Sempre humano

---

# 4. LAYOUT SYSTEM

## 4.1 Grid Invisível

- Desktop: fluxo livre
- Mobile: texto sempre antes da imagem
- Nada centralizado por padrão

---

## 4.2 Section Heights

| Tipo | Altura |
|----|------|
| Hero | 100vh |
| Conteúdo | 120–140vh |
| Fechamento | 80–100vh |

---

# 5. BREAKPOINTS

```ts
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

---

# 6. ACESSIBILIDADE & PERFORMANCE

- Respeitar `prefers-reduced-motion`
- Nenhuma animação fora do viewport
- Vídeos lazy + muted
- Sem re-render em scroll contínuo

---

# 7. REGRAS ABSOLUTAS DO SISTEMA

❌ Texto sobre imagem  
❌ Animações chamativas  
❌ Motion decorativo  

✅ Ritmo  
✅ Silêncio  
✅ Presença  

---

# 8. MANIFESTO TÉCNICO

O melhor design:
- não explica
- não chama atenção
- não se impõe

Ele permanece.

Isso é **Ghost Design System**.


---

## 🧩 REGRA FINAL

Se algo:
- não está aqui
- não respeita este documento
- ou altera o ritmo Ghost

➡️ **É BUG.**

Ghost Design não é estilo.  
É comportamento.

---

© Ghost Design / Danilo Novais
