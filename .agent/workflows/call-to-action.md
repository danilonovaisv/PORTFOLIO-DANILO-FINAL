---
description: # Workflow Antigravity: CTA "Levitation Blue"
---

# Workflow Antigravity: CTA "Levitation Blue"

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

Aqui está o componente refatorado para **Next.js + Tailwind CSS**, utilizando as especificações exatas do seu relatório.

```tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Exemplo de ícone

const AntigravityCTA = () => {
  return (
    /* Elemento Pai (uid=2556) 
       - Flex container
       - Dimensões fixas
       - Gatilho da animação de levitação (group)
    */
    <button
      className="
        group
        relative
        flex items-stretch
        w-[369px] h-[64px]
        cursor-pointer
        transition-transform duration-200 ease-out
        hover:-translate-y-px
      "
      aria-label="Let's build something great"
    >
      {/* Elemento Filho Principal (uid=2557) 
          - Núcleo visual azul
          - Centralização flex
          - Transição de cor independente
      */}
      <div
        className="
          flex flex-1 justify-center items-center
          bg-[rgb(0,87,255)]
          hover:bg-[rgb(50,120,255)] 
          text-white
          rounded-full
          px-8 py-5
          gap-[0.25rem]
          overflow-hidden
          whitespace-nowrap
          z-10
          transition-colors duration-300
        "
      >
        <span className="text-lg font-medium tracking-wide">
          let's build something great
        </span>

        {/* Ícone separado visualmente na imagem, mas 
            integrado no fluxo flex conforme descrição */}
        <div className="ml-2 flex items-center justify-center">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </button>
  );
};

export default AntigravityCTA;
```

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
