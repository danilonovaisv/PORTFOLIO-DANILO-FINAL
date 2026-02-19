# O Que Me Move — "About Beliefed" (Versão Ajustada)

🎯 **Objetivo**  
Construir a sessão manifesto "O Que Me Move" como uma experiência scroll-driven cinematográfica usando:

- Motion (https://motion.dev)
- `inView()` para detectar entrada no viewport
- `animate()` para animações suaves
- Interpolação contínua de background
- Sistema de camadas
- Ghost 3D com React Three Fiber
- Sincronização emocional entre texto e cor

🧠 **Stack Obrigatória**

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Motion (`inView`, `animate`)
- React Three Fiber + drei + three.js
- Firebase Hosting
- Supabase Storage (assets)

---

## 🏗 Arquitetura em Camadas (Atualizada)

### **Camada 0 — Background Layer**

- `absolute inset-0`
- Recebe interpolação contínua de cor em HSL
- Controlado por `animate()` com easing personalizado
- **NÃO usa fade simples ou transition CSS**
- **Nova implementação:** Interpolação inicia no primeiro frame da entrada do texto e termina exatamente quando o texto completa sua animação

### **Camada 1 — Overlay Transition Layer**

- Opacidade animada (0 → 1 → 0) com duração de 0.9s
- Evita flicker durante transições de cor
- Atua como camada de absorção suave
- **Ajuste crítico:** Timing function [0.4, 0, 0.2, 1] para sincronia perfeita com texto
- Ordem obrigatória de cores:

1. bg-bluePrimary -`#0048ff`- (HSL: 230, 85%, 30%)
2. bg-purpleDetails -`#8705f2`- (HSL: 270, 80%, 40%)
3. bg-pinkDetails -`#f501d3`- (HSL: 330, 85%, 50%)
4. bg-bluePrimary
5. bg-purpleDetails
6. bg-pinkDetails
7. bg-bluePrimary (retorna ao início)

### **Camada 2 — BeliefFixedHeader (Sticky)**

- **Texto:**
  - "Acredito no design que muda o dia de alguém." - font-Display - black - Branca
  - "Não pelo choque, mas pela conexão." - font-h2 - bold - Branca
- **Desktop:**
  - Sticky com z-index 30
  - Alinhado visualmente ao centro
  - Ancorado à direita do grid
  - `text-right`
  - Animação de entrada pela direita com fade-in suave
  - Animação de saida acompanhando o scroll antes da entrada da ultima tela
- **Mobile:**
  - Sticky top-right com z-index 30 (20% do topo (20vh))
  - `text-right`
  - Não disputa espaço com bloco central
  - Animação de entrada pela direita com fade-in suave
  - Animação de saida acompanhando o scroll antes da entrada da ultima tela

### **Camada 3 — Texto Rotativo**

- **Características:**
  - font-h1 - bold - `#4fe6ff` - **blueAccent**
  - Frases (ordem obrigatória):
    1. "Um vídeo que respira."
    2. "Uma marca que se reconhece."
    3. "Um detalhe que fica."
    4. "Crio para gerar presença."
    5. "Mesmo quando não estou ali."
    6. "Mesmo quando ninguém percebe o esforço."
- **Comportamento:**
  - **Desktop:**
    - Posicionado à esquerda (15% da margem)
    - Alinhado no rodapé (10% do bottom)
    - Cada palavra em linha separada
    - Entra imediatamente na mudança de cor
    - Movimento contínuo acompanhando o scroll
    - Sai para a esquerda na transição
  - **Mobile:**
    - Centralizado com 20% do rodapé (20vh)
    - Quebras de linha naturais
    - Entra na mudança de cor
    - Permanece fixo na posição durante o scroll
    - Sai para a direita na transição para próxima seção

### **Camada 4 — Manifesto Final**

- **Texto fixo (3 linhas) ocupando 90% da tela:**
  ```
  ISSO É
  GHOST
  DESIGN.
  ```
- font-Display - black - branca
- Morphing Text com espaçamento pequeno
- Forte peso visual
- Entrada sincronizada com clímax do Ghost

### **Camada 5 — Ghost 3D (Atualizado)**

- **Posicionamento:**
  - **Z-index máximo (camada acima de todas)**
  - GLB oficial: [https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb](https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb)
  - Carregado via `useGLTF`
- **Comportamento do Ghost:**
  - Flutuação constante
  - Movimento lateral leve
  - Responde ao cursor (desktop)
  - Responde ao scroll (mobile)
  - Nunca completamente parado
- **Entrada:**
  - Surge junto com BeliefFixedHeader
  - scale 0.95 → 1
  - Fade suave com duração de 1.2s
- **Intensificação:**
  - Cada nova frase aumenta levemente energia
  - Última frase:
    - Escala +10%
    - Centraliza na seção
    - Movimento mais intenso e alegre
- **Comportamento:**
  - **Desktop:**
    - Posicionado centralizado no eixo horizontal e vertical
  - **Mobile:**
    - Sticky top-left (20% do topo (20vh))
    - Permanece fixo na posição durante o scroll
    - Vai para o centro da pagina na ultima sessão

- **Saída:**
  - Sai junto com manifesto
  - Acompanha scroll
  - **Ajuste crítico:** Mantém z-index superior durante toda a animação

---

## 🎨 Sistema de Troca de Cor do Background (Atualizado)

**Ordem obrigatória de cores:**

1. bg-bluePrimary - `#0048ff` - (HSL: 230, 85%, 30%)
2. bg-purpleDetails - `#8705f2` - (HSL: 270, 80%, 40%)
3. bg-pinkDetails - `#f501d3` - (HSL: 330, 85%, 50%)
4. bg-bluePrimary
5. bg-purpleDetails
6. bg-pinkDetails
7. bg-bluePrimary (retorna ao início)

🔥 **REGRA CRÍTICA**  
A troca de fundo NÃO é uma transição simples.  
**Nunca usar:**

- `transition: background-color`
- Fade entre divs simples

✅ **Tipo de animação (Atualizado)**  
**Interpolação contínua de cor + crossfade overlay**  
→ A cor muda enquanto o texto entra, não depois.  
→ Inicia no primeiro frame da entrada do texto  
→ Quando o texto atinge 60% de visibilidade, o BG já está ~70% interpolado  
→ A cor termina exatamente quando o texto termina a animação

---

## 🎬 Sincronização Detalhada (Otimizada)

```javascript
import { animate, inView } from 'motion';

inView('.belief-line', { margin: '-30% 0px 0px 0px' }, (element) => {
  const isMobile = window.innerWidth <= 767;

  // 1️⃣ Entrada do texto (comportamento diferenciado)
  animate(
    element,
    {
      opacity: [isMobile ? 0 : 0.3, 1],
      x: [-100, 0],
    },
    {
      duration: 0.8,
      easing: [0.22, 1, 0.36, 1],
      delay: 0.2,
    }
  );

  // 2️⃣ Troca sincronizada do BG (interpolação contínua em HSL)
  animate(
    backgroundLayer,
    { backgroundColor: nextColor },
    {
      duration: 0.9,
      easing: [0.4, 0, 0.2, 1],
    }
  );

  // 3️⃣ Overlay absorvendo a transição
  animate(overlayLayer, { opacity: [0, 1, 0] }, { duration: 0.9 });

  return () => {
    // 4️⃣ Saída diferenciada por dispositivo
    const exitDirection = isMobile ? 100 : -100;
    animate(
      element,
      { opacity: 0, x: exitDirection },
      {
        duration: 0.6,
        easing: [0.25, 0.46, 0.45, 0.94],
      }
    );
  };
});
```

---

## 📐 Regra de Alinhamento do Ghost (Atualizada)

**Layout:**

```
| Texto (esquerda) | Ghost (direita) |
```

- Ghost sempre alinhado ao centro vertical do bloco de texto
- **Z-index máximo para garantir sobreposição sobre todas as camadas**
- Nunca alinhado à viewport
- Se o texto cresce, o Ghost acompanha
- Usar grid/flex com items-center
- **Ajuste crítico:** Ghost mantém posição relativa ao texto durante toda a animação

---

## ⏱ Sequência Cronológica — Desktop (Atualizada)

1. BG inicial visível
2. BeliefFixedHeader fade-in com opacidade 0.3 → 1
3. Ghost entra junto com BeliefFixedHeader (z-index máximo)
4. Primeira troca de cor inicia simultaneamente com entrada do texto
5. Frases rotativas continuam, entrando do topo com movimento contínuo
6. Intensificação gradual do Ghost (aumento sutil de energia a cada frase)
7. Manifesto final surge enquanto frase fixa sai para cima
8. Ghost escala +10% e centraliza na seção
9. Clímax com movimento mais intenso do Ghost
10. Scroll continua → elementos saem para cima
11. Reset total com interpolação contínua

## 📱 Sequência Cronológica — Mobile (Atualizada)

1. BG inicial visível
2. BeliefFixedHeader fade-in com opacidade 0.3 → 1
3. Ghost entra junto com BeliefFixedHeader (z-index máximo)
4. Primeira troca de cor inicia simultaneamente com entrada do texto
5. Texto centralizado a 20% da distância do rodapé
6. Frases entram com fade-in no centro com movimento contínuo
7. Texto sai pela direita ao final da seção
8. Intensificação gradual do Ghost (aumento sutil de energia a cada frase)
9. Manifesto surge enquanto frase fixa sai para a direita
10. Ghost escala +10% e centraliza na seção
11. Elementos saem para a direita
12. Reset total com interpolação contínua

---

## 🎭 Personalidade da Experiência (Refinada)

- **Cinemática** com ritmo cinematográfico
- **Emocional** com sincronia entre cor e texto
- **Profunda** na mensagem transmitida
- **Elegante** na execução técnica
- **Fluida** nas transições
- **Escura** na paleta visual
- **Nunca agressiva** nos movimentos

**Sensação final:**  
_O design respira. O Ghost sente. A cor absorve significado._

---

## 🏁 Resultado Esperado (Verificável)

✅ **Texto e cor são um único sistema**

- A cor muda enquanto o texto entra, não depois
- Quando o texto atinge 60% de visibilidade, o BG já está ~70% interpolado

✅ **O BG reage no mesmo frame que o texto entra**

- Interpolação contínua em HSL com easing personalizado
- Timing functions sincronizados para sensação orgânica

✅ **O Ghost vive dentro da narrativa**

- Z-index máximo garantindo sobreposição sobre todas as camadas
- Movimento sutil que intensifica com cada frase
- Resposta ao scroll/cursor mantendo personalidade

✅ **Scroll é a força motriz emocional**

- Animações acionadas por `inView` com margin ajustado (-30%)
- Transições suaves mesmo em scroll rápido

✅ **Desktop e Mobile possuem ritmos distintos**

- Desktop: texto acompanha scroll com movimento contínuo
- Mobile: texto permanece fixo na posição durante o scroll

✅ **Reset é perfeito e bidirecional**

- Limpeza adequada com `return () =>` no inView
- Estado restaurado para reentradas suaves
- Funciona tanto com scroll para baixo quanto para cima
