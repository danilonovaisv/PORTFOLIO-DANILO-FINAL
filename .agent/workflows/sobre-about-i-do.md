---
description: # Workflow: criação e Ajuste da sessão AboutWhatIDo
---

# Workflow: criação e Ajuste da sessão AboutWhatIDo da pagina 'SOBRE` — Desktop & Mobile Scroll Animation

---

## 🎯 Objetivo da Sessão

Transformar **serviços/capabilities** em uma sequência visual clara, progressiva e silenciosa,  
com **animação horizontal guiada pelo scroll**.

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).
6. Crie uma lista mental (ou JSON interno) contendo para cada item:
   - `ID`: Identificador sequencial.
   - `Contexto`: Arquivos alvo (ex: `src/components/Header.tsx`).
   - `Ação`: O que mudar (ex: "Aumentar padding", "Corrigir Z-Index").
   - `Validação`: Critério de sucesso (ex: "Compilar sem erros", "Igual à imagem X").

###REFERECIAS BIBLE DE NA PASTA:

- '/docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md'

- '/docs/SOBRE/`SOBRE-PORTFOLIO-BLACK---GHOST.jpg`<br>

**Visual Mobile:** '/docs/SOBRE/`SOBRE-MOBILE-BLACK---GHOST.jpg`<br>

### FASE 2: Protocolo de Análise Profunda

Desktop → **blocos**

- Mobile → **barras**
- Movimento: **direita → esquerda**
- Origem **sempre fora da tela**, partindo da **extremidade lateral direita**
- Finalização com **rodapé animado (marquee / ghost design)**

Referência de animação:  
https://codepen.io/luis-lessrain/pen/dPPOGaZ

---

## 🎨 Identidade Visual

| Elemento        | Cor       |
| --------------- | --------- |
| Fundo da seção  | `#040013` |
| Blocos / Barras | `#0048ff` |
| Texto           | `#ffffff` |
| Numeração       | `#8705f2` |

---

## 🧠 Princípio de Motion

- Movimento horizontal progressivo
- Nenhum fade brusco ou pop-in
- Sincronizado ao scroll (desktop)
- Entrada por viewport (mobile)
- Sempre respeitar `prefers-reduced-motion`

## 🖥️ Desktop (≥ 1024px)

### Layout

- Altura: ~100vh
- Container central:
  - max-width: 1200px
  - padding-inline: 32px
- Cards em **linha única (flex-row)**
- 7 blocos, sem wrap

### Cards

- min-height: 140px
- padding: 24px
- border-radius: 16px
- background: `#0048ff`
- display: flex
- align-items: center
- gap interno: 16px

### Numeração

- Fonte grande
- Cor: `#8705f2`
- Peso: 800

### Animação (Scroll Driven)

- Origem X: `+120vw`
- Destino X: `0`
- Opacidade: `0 → 1`
- Stagger: `0.06s`
- Trigger: entrada da seção no viewport
- Técnica recomendada:
  - `GSAP + ScrollTrigger` **ou**
  - `Framer Motion + useScroll`

---

## 📱 Mobile (≤ 768px)

### Layout

- Coluna vertical
- Gap: 12px
- Cards ocupam 100% da largura

### Barras

- Altura menor (70–90px)
- padding: 18px
- border-radius: 12px

### Animação (Viewport-based)

- Origem X: `+80px`
- Destino X: `0`
- Duração: `0.4s`
- Delay progressivo por índice
- Trigger: Intersection Observer

---

## 🧾 Conteúdo dos Cards

1. **Direção** criativa que organiza o caos
2. **Design** estratégico que guia decisões
3. **Identidades** que permanecem na memória
4. **Campanhas** multicanais com lógica e emoção
5. **Branding** que não grita — mas marca
6. **Inteligência Artificial** aplicada à criação
7. **Liderança Criativa** com visão e método

Regra:

- Palavra-chave inicial em azul claro
- Complemento em branco

---

## 🌀 Rodapé Animado — Marquee (Ghost Design)

### Layout

- margin-top: 64px
- padding-block: 20px
- background: `#0048ff`
- text-color: `#8705f2`
- Duas linhas

### Conteúdo

Linha A → B  
DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・BRANDING・IA・LIDERANÇA CRIATIVA・

Linha B → A  
BRANDING・IA・LIDERANÇA CRIATIVA・DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・

### Motion

- Loop infinito
- Direções opostas
- Velocidade base: ±10
- Scroll modula velocidade
- Mobile: velocidade reduzida
- prefers-reduced-motion:
  - animação desativada
  - texto centralizado

---

## ♿ Acessibilidade

- `<h2>` para o título
- Cards como `<article>` com `aria-label`
- Marquee com `aria-hidden="true"`
- Contraste AA/AAA
- Navegação por teclado

---

## 🧩 Notas Técnicas

- Usar `transform: translateX()`
- `will-change: transform`
- Evitar sombras pesadas
- Animações suaves (ease: linear / easeOut)
- Código modular (AboutWhatIDo.tsx isolado)

---

## FASE 3: 🛠️ EXECUÇÃO IMEDIATA:

## FASE 4: 🛠️ VERIFICAÇÂO:

### 3. Tipografia e Textos

- **Fonte:** Confirmar se `src/config/brand.ts` está sendo a única fonte de definição de fontes (`TT Norms Pro`).
- **Hierarquia:**
- Verificar se os tamanhos de fonte em `src/app/globals.css` (clamp) estão sendo aplicados via classes utilitárias (`text-display`, `text-h1`).

- **Quebra de Linha:** O agente deve alertar se títulos longos não tiverem `max-w-[ch]` para evitar linhas infinitas em monitores ultrawide.

### 4. Responsividade

- **Breakpoints:** Verificar o uso consistente do prefixo `lg:` (1024px) como ponto de virada principal (Desktop).
- **Menu:** O `MobileStaggeredMenu.tsx` deve ser ativado apenas em `< lg`.
- **Touch Targets:** Botões em `src/components/ui/CTAButton.tsx` devem ter altura mínima (ex: `h-12` ou `py-3`).

### 5. Componentes e Interações

- **Estados:** Verificar se os botões têm `hover:`, `active:` e `focus-visible:` definidos.
- **Feedback:** Componentes de formulário (`ContactForm.tsx`) possuem estados de erro/sucesso visuais alinhados com o tema escuro?
- **Animações:** As transições em `src/config/motion.ts` estão sendo usadas, ou há animações "hardcoded" soltas nos componentes?

### 6. Acessibilidade

- **Contraste:** Verificar se textos cinza (`text-secondary`) sobre fundo preto têm contraste suficiente.
- **Tags Semânticas:** Uso correto de `<main>`, `<section>`, `<h1>`, `<button>` vs `<div>`.
- **Imagens:** Verificar se componentes como `Image` do Next.js possuem `alt` descritivo.

### 7. Coerência Global

- **Design Tokens:** O código usa cores hexadecimais soltas (ex: `#0048ff`) ou usa variáveis do Tailwind/Brand (`bg-primary`)? _Isso é crítico para manutenção._
