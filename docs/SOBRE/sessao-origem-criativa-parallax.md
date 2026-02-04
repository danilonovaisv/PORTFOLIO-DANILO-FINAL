
# 📄 Documentação Técnica — Sessão ORIGEM CRIATIVA com Parallax (Framer Motion)

## 1. 🎯 Objetivo da Página/Sessão

| Item | Detalhamento |
|------|--------------|
| **Função** | Gerar profundidade emocional, sugerindo memória e trajetória não linear |
| **Ação esperada** | Leitura sequencial dos blocos, percepção visual narrativa |
| **Contribuição** | Reforça valores da marca (intuição, transformação, sensibilidade) e diferencia estética |

---

## 2. 📐 Estrutura de Conteúdo

- **Título Principal:** `"Origem"` (label centralizada no topo)
- **Blocos (4):** Alternância de texto e mídia, com layout adaptativo
  - Bloco A: Texto (esquerda), vídeo retrato (direita)
  - Bloco B: Imagem (esquerda), texto (direita)
  - Bloco C: Texto (esquerda), imagem (direita)
  - Bloco D: Vídeo (esquerda), texto (direita)
- **Layout Desktop:**
  - Grid 12 colunas
  - Mídia com blur e opacidade máx. 0.85
- **Layout Mobile:**
  - 1 coluna, sequência texto → mídia
- **CTAs:** Não há botões, mas a progressão é guiada por ritmo visual

---

## 3. 🎨 Identidade Visual

- **Cores principais:**
  - Fundo: `#040013`
  - Linha superior: `primary`
  - Texto label: `textSecondary` ou variação suave de `primary`
- **Tipografia:**
  - Títulos: bold, tamanho responsivo
  - Corpo: serif ou humanista, legível, espaçamento generoso
- **Elementos Visuais:**
  - Imagens com bordas suaves, vídeos em loop com blur
  - Motion Titles (`#00X`) animados em parallax

---

## 4. 💫 Interatividade & Animações

### ✨ Framer Motion — Parallax com `useScroll`

```tsx
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
```

### 🧠 Lógica por imagem:

```tsx
function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt={`Imagem ${id}`} />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}
```

### 📊 Progresso com `scaleX`:

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});
<motion.div className="progress" style={{ scaleX }} />
```

---

## 5. 📱 Responsividade

| Breakpoint | Comportamento |
|------------|----------------|
| `sm`       | 1 coluna, espaçamento 24–32px, tipografia maior |
| `md`       | Largura limitada (~80%), texto centralizado |
| `lg+`      | Grid alternado, deslocamentos verticais sutis nas mídias |

---

## 6. ♿ Acessibilidade & SEO

- Uso de `alt` nas imagens ✔️
- Semântica: cada bloco poderia usar `<section>` + `<h2>` para conteúdo
- Contraste alto com fundo escuro
- Foco e animações suaves (com fallback: `prefers-reduced-motion`)
- Estrutura legível para buscadores, mas sem CTAs diretos

---

## 7. 🔌 Recursos Especiais

- Componente `Image` com `motion.h2` sincronizado ao scroll
- Sem formulários ou dados externos
- Vídeos e imagens estáticos (não carregados via API)
- Títulos dinâmicos com transição suave

---

## 8. ⚙️ Considerações Técnicas

| Item | Detalhamento |
|------|--------------|
| **Client-side** | Sim, todos os componentes são client-only |
| **Reutilização** | O componente `Image` pode ser reaproveitado para várias sessões |
| **Next.js compatível** | Pode ser adaptado para App Router com `useClient` e layouts modulares |
| **Fallbacks** | `alt` para imagens, scroll reduzido via `prefers-reduced-motion` |
| **Hooks personalizados** | `useParallax` reutilizável com `MotionValue` genérico |

---

## ✅ Checklist Técnico Preenchido

✔ Objetivo da sessão claro  
✔ Layout desktop/mobile definido  
✔ Animações com scroll via Framer Motion  
✔ Estrutura modular com React  
✔ Visual coerente com branding  
✔ Responsividade e acessibilidade previstas  
✔ Código pronto para ser usado em agente autônomo
