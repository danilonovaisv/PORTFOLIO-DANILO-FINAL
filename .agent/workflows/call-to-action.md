---
description: ### ⚡ Workflow Antigravity: "Compound Fusion"
---

### ⚡ Workflow Antigravity: "Compound Fusion"

### 1. 📐 Blueprint (Arquitetura)

Definição da estrutura DOM baseada nos UIDs e propriedades de layout fornecidas.

- **Container Mestre (`uid=2556`):**
- **Função:** Wrapper de interação e posicionamento.
- **Dimensões:** `w-[369px]`, `h-[64px]`.
- **Comportamento:** `flex`, `items-stretch` (garante preenchimento vertical).
- **Gatilho:** Responsável por disparar a levitação (`group` no Tailwind).

- **Núcleo Visual (`uid=2557`):**
- **Função:** Estética e conteúdo.
- **Forma:** "Pílula" completa (`rounded-full` / `9999px`).
- **Camada:** `z-10` (Elevação hierárquica).
- **Preenchimento:** `bg-[rgb(0,87,255)]` (Azul Antigravity).

### 2. ⚡ Physics (Animação & Estados)

Configuração da "sensação" do botão baseada nos tempos e curvas de bézier fornecidos.

| Estado    | Propriedade  | Valor / Classe Tailwind             | Duração | Easing     |
| --------- | ------------ | ----------------------------------- | ------- | ---------- |
| **Idle**  | Translação Y | `translate-y-0`                     | -       | -          |
| **Hover** | Translação Y | `-translate-y-px` (Levitação sutil) | `200ms` | `ease-out` |
| **Hover** | Background   | `bg-light-blue` (Iluminação)        | `300ms` | `default`  |

> **Nota de Design:** A duração da cor (`300ms`) é propositalmente mais lenta que o movimento (`200ms`) para criar um efeito de "rastro" cognitivo suave.

### 3. 🛠️ Implementação (Código)

Esta versão divide o elemento interno em dois nós visuais que compartilham a mesma cor e estado de hover, criando a silhueta complexa da imagem.

```tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const AntigravityCTA = () => {
  return (
    /* CONTAINER MESTRE (Driver da Animação)
      - group: permite que os filhos reajam ao hover do pai.
      - gap-[-1px]: hack visual para garantir fusão perfeita sem linhas brancas.
    */
    <button
      className="
        group
        relative
        flex flex-row items-center justify-center
        h-[64px]
        cursor-pointer
        transition-transform duration-200 ease-out
        hover:-translate-y-px
      "
      aria-label="Let's build something great"
    >
      {/* NÓ 1: CÁPSULA DE TEXTO (Esquerda)
        - rounded-l-full: Arredonda apenas a esquerda.
        - pr-2: Menos padding na direita para aproximar do ícone.
      */}
      <div
        className="
          flex items-center justify-center
          h-full
          pl-8 pr-4
          bg-[rgb(0,87,255)]
          group-hover:bg-[rgb(50,120,255)]
          text-white
          rounded-l-full
          transition-colors duration-300
        "
      >
        <span className="text-lg font-medium tracking-wide whitespace-nowrap">
          let's build something great
        </span>
      </div>

      {/* NÓ 2: ESFERA DO ÍCONE (Direita)
        - Aspect Ratio 1:1 (Quadrado perfeito virando círculo).
        - rounded-r-full: Arredonda a direita (ou full para garantir círculo).
        - border-l: opcional, se quiser uma linha divisória sutil, mas a imagem sugere fusão.
      */}
      <div
        className="
          flex items-center justify-center
          h-full aspect-square
          bg-[rgb(0,87,255)]
          group-hover:bg-[rgb(50,120,255)]
          text-white
          rounded-r-full
          transition-colors duration-300
        "
      >
        {/* O ícone também pode ter uma animação própria no hover, ex: group-hover:rotate-45 */}
        <ArrowUpRight size={24} strokeWidth={2} />
      </div>
    </button>
  );
};

export default AntigravityCTA;
```

### 🔍 Anatomia das Alterações

1. **Geometria Dividida:** Ao invés de um `div` gigante, usamos dois `divs` irmãos.

- **Texto:** Usa `rounded-l-full` (arredonda esquerda) e reto na direita.
- **Ícone:** Usa `rounded-r-full` (arredonda direita) e reto na esquerda (ou levemente sobreposto).

2. **Sincronia de Cores (`group-hover`):** Ambos os filhos usam `group-hover:bg-...`. Isso garante que, mesmo passando o mouse apenas na ponta do ícone, o texto também muda de cor instantaneamente, mantendo a ilusão de ser uma peça única.
3. **Área de Clique:** O `<button>` pai envolve ambos, garantindo que o clique funcione em qualquer pixel da estrutura composta.

### 4. 🧪 Auditoria de Qualidade

Checklist para garantir que o resultado final bate com a especificação:

- [ ] **Dimensões:** O botão ocupa exatamente `369px` x `64px`?
- [ ] **Curva de Animação:** O movimento usa `ease-out` (desaceleração no final)?
- [ ] **Timing:** O movimento é perceptivelmente mais rápido (`200ms`) que a mudança de cor (`300ms`)?
- [ ] **Z-Index:** O container azul respeita o `z-10` (útil se houver elementos decorativos ou sombras atrás)?

### 5. 💡 Sugestão de Melhoria (Touch "Antigravity")

A imagem sugere que a "bolinha" do ícone é levemente separada ou tem um efeito de união ("gooey") com o corpo principal. O detalhamento em texto descreve um único bloco flex.

Para atingir o visual exato da imagem (onde o círculo da seta parece "anexado" ao lado):

1. Separaríamos o `uid=2557` em dois elementos filhos dentro do pai `flex`.
2. Um para o texto (pílula maior).
3. Um para o ícone (círculo perfeito).
4. Aplicaríamos `gap-1` ou margem negativa para uni-los visualmente.

---
