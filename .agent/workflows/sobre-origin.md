---
description: # Workflow: criação e Ajuste da sessão AboutOrigin
---

# Workflow: criação e Ajuste da sessão AboutOrigin da pagina 'SOBRE` — ORIGEM CRIATIVA

### 1. 🎯 Objetivo da Página/Sessão

| Item                 | Detalhamento                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Função principal** | Revelar trajetória criativa através de **efeito mask reveal pinned** - imagens emergem de baixo para cima como "memórias sendo descobertas" |
| **Ação do usuário**  | Scroll contínuo para revelar cada imagem sequencialmente + leitura natural dos textos laterais                                              |
| **Contribuição**     | **Diferenciação visual extrema** + reforço emocional da narrativa pessoal + demonstração técnica avançada                                   |

---

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

### FASE 2: Protocolo de Análise Profunda:

### 2. 📐 Estrutura de Conteúdo

| Elemento              | Detalhes                                                                   |
| --------------------- | -------------------------------------------------------------------------- |
| **Título principal**  | `"Origem"` (H1, `#fcffff`, centralizado topo, 64px desktop)                |
| **Subtítulo**         | Não aplicável                                                              |
| **Elementos visuais** | **4 imagens Supabase** (500x auto, pinned right, z-index 4→1)              |
| **CTA**               | **Não** - progressão guiada por scroll                                     |
| **Texto de apoio**    | **4 blocos H1+H3** (`bluePrimary` títulos, `#fcffff` corpo)                |
| **Layout Desktop**    | **2-colunas fixas**: Textos (L, 300px min) + Imagens pinned (R, 540px max) |
| **Layout Mobile**     | **Intercalado**: Texto → Imagem (order CSS)                                |

**Conteúdo dos blocos** (mantido 100% fiel):

```
A: "O QUE PERMANECE" + img1 (texto direita, -10% vertical)
B: "DO TRAÇO À INTENÇÃO" + img2 (texto esquerda)
C: "A DESCOBERTA DO INVISÍVEL" + img3 (texto direita)
D: "EXPANSÃO COM PROPÓSITO" + img4 (texto esquerda)
```

### Conteúdo completo:

**Título (H1)**
**texto:** 'Origem'

**Blocos textuais e mídias**
**Títulos (H1) e conteúdo (H3)**

- Bloco A: **Título(H1):** O QUE PERMANECE (bluePrimary)
  **conteúdo (H3)**
  Desde cedo, sempre prestei atenção no que ficava —
  não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.

(mídia: ‘https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp’)

- texto **alinhado à direita do bloco** dentro do bloco. (`#fcffff`)
- Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  ⸻

- Bloco B: **Título(H1):** DO TRAÇO À INTENÇÃO (bluePrimary)
  **conteúdo (H3)**
  Rabiscos viraram ideias.
  Ideias viraram projetos.
  E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.

(mídia: ‘https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp’)

- texto **alinhado à esquerda do bloco** dentro do bloco. (`#fcffff`)
- Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  ⸻

- Bloco C: **Título(H1):** A DESCOBERTA DO INVISÍVEL (bluePrimary)
  **conteúdo (H3)**
  Foi ali que entendi:
  design não é enfeite.
  É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.

(mídia: ‘https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp’)

- texto **alinhado à direita do bloco** dentro do bloco. (`#fcffff`)
- Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  ⸻

- Bloco D: **Título(H1):** EXPANSÃO COM PROPÓSITO (bluePrimary)
  **conteúdo (H3)**
  Estudei Comunicação, mergulhei no design, no branding
  e hoje uso inteligência artificial para expandir o alcance
  sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.

(mídia: ‘https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp’)

- texto **alinhado à esquerda do bloco** dentro do bloco. (`#fcffff`)
- Verticamente posicionado **ligeiramente acima do centro** (≈ -10%).
  ⸻

---

### 3. 🎨 Identidade Visual

| Elemento         | Especificação                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Cores**        | `#040013` (bg inicial) → `#0a001a` (transição scroll), `#fcffff` (texto), `bluePrimary` (H1) |
| **Tipografia**   | **Outfit**: H1 `800` (32-48px), H3 `400` (16-20px), `line-height: 1.6`                       |
| **Imagens**      | `object-fit: cover`, `blur(4px)` inicial, `opacity: 0.85` → `1` on reveal                    |
| **Espaçamentos** | Container `1440px`, gap `60px`, padding `2rem`                                               |
| **Bordas**       | Imagens `border-radius: 24px`                                                                |

---

### 4. 💫 Interatividade & Animações

**🛠️ Stack:** `GSAP 3.13 + ScrollTrigger + Lenis`

| Animação              | Trigger                                  | Detalhes                                      |
| --------------------- | ---------------------------------------- | --------------------------------------------- |
| **Pin + Mask Reveal** | `scrollTrigger: { pin: ".arch__right" }` | `clipPath: "inset(0 0 100%)"` → `inset(0)`    |
| **Transição BG**      | Scroll progress                          | `#040013` → `#0a001a` (`duration: 1.5`)       |
| **Object Position**   | Por imagem                               | `0% 0%` → `60%` (atual) + `40%` (próxima)     |
| **Blur/Focus**        | Sync com reveal                          | `blur(4px)` → `blur(0px)` + `opacity: 0.85→1` |
| **Mobile Parallax**   | `@media (max-width: 768px)`              | `objectPosition: 60%→30%` por imagem          |

**Código chave:**

```tsx
gsap
  .timeline({
    scrollTrigger: { pin: '.arch__right', scrub: true },
  })
  .to(imgAtual, { clipPath: 'inset(0 0 100%)' })
  .to(imgProxima, { objectPosition: '0px 40%' });
```

---

### 5. 📱 Responsividade

| Breakpoint     | Comportamento                        | Ajustes                |
| -------------- | ------------------------------------ | ---------------------- |
| **<560px**     | Stack vertical, imgs 280px           | Container padding 10px |
| **560-768px**  | Stack, imgs 360px                    | Gap 20px               |
| **769-1024px** | 2-col, right flexível                | Gap 30px               |
| **1024px+**    | **Pin completo**, textos 356px fixos | Max-width 1100px       |
| **>1440px**    | Container limitado                   | Centralizado           |

**Mobile ordering:** `texto.order=0, imagem.order=1` (CSS `order`)

---

### 6. ♿ Acessibilidade & SEO

| Item            | Implementação                                                |
| --------------- | ------------------------------------------------------------ |
| **Semântica**   | `<section class="origem-criativa">` + `H1` por bloco         |
| **ALT texts**   | `"O que permanece - essência que sobrevive..."` (descritivo) |
| **Contraste**   | **21:1** (`#fcffff` sobre `#040013`)                         |
| **Teclado**     | Scroll nativo + `prefers-reduced-motion`                     |
| **SEO**         | H1 único "Origem" + H3s hierárquicos                         |
| **Performance** | `loading="lazy"`, GPU `transform`/`clip-path`                |

---

### 7. 🔌 Integrações ou Recursos Especiais

| Recurso              | Status       | Detalhes                                  |
| -------------------- | ------------ | ----------------------------------------- |
| **Carrossel/Slider** | Não          | ScrollTrigger substitui                   |
| **API**              | Não          | 4 URLs Supabase estáticas                 |
| **Formulários**      | Não          |                                           |
| **Smooth Scroll**    | ✅ **Lenis** | `raf()` loop com `ScrollTrigger.update()` |
| **MatchMedia**       | ✅           | Desktop pin vs Mobile parallax            |

---

### 8. ⚙️ Considerações Técnicas

| Item             | Detalhamento                                     |
| ---------------- | ------------------------------------------------ |
| **Renderização** | **`'use client'`** (GSAP não SSR)                |
| **Reutilização** | **Componente completo** + `useMaskReveal` hook   |
| **Next.js**      | **App Router** (`useEffect`, `useRef`)           |
| **Fallbacks**    | `prefers-reduced-motion`, erro img → placeholder |
| **Performance**  | **RAF loop**, `matchMedia`, lazy loading         |
| **Cleanup**      | `ScrollTrigger.revert()`, `lenis.destroy()`      |
| **Bundle**       | GSAP tree-shakeable + Lenis minified             |

---

### FASE 3: EXECUÇÃO DO LOOP (Iterativo)

Para cada item da lista indexada na FASE 1, execute:

#### 1. Análise de Contexto

- Leia o conteúdo atual dos arquivos alvo.
- Compare o código atual com o pedido do prompt.
- _Raciocínio:_ "O que preciso mudar neste código para atingir o critério de aceite sem quebrar o que já funciona?"

#### 2. Aplicação Atômica

- Aplique a mudança mínima necessária.
- **Regras de Ouro:**
  - Mantenha a consistência do Tailwind (use classes utilitárias, evite style inline).
  - Não remova lógica de negócios existente.
  - Respeite a estrutura do App Router.

#### 3. Verificação Técnica (Self-Correction)

- Após a edição, simule/rode: `npm run lint` ou verifique a sintaxe.
- **Se houver erro:** Tente corrigir o erro **uma vez** baseado na mensagem de log.
- **Se persistir:** Desfaça a alteração e marque como "FALHA TÉCNICA".

#### 4. Verificação de Layout (Code-Level)

- Verifique se as classes de responsividade (ex: `md:`, `lg:`) foram aplicadas conforme o pedido "Mobile-First".
- Verifique se não há valores hardcoded que quebrem o layout (ex: `width: 1000px`).

---

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

## 8. ✅ Checklist Técnico Preenchido

✔ **GSAP mask reveal** pinned com 4 imagens  
✔ **Posicionamento texto** exato (-10% vertical)  
✔ **Mobile ordering** automático  
✔ **Cores/typo** 100% spec  
✔ **Acessibilidade** AAA  
✔ **Next.js production-ready**  
✔ **Smooth 60fps** scroll experience

---
