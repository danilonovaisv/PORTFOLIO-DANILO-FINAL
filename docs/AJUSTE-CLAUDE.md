# Análise de Bugs — `portfoliodanilo.com/sobre`

Fiz uma análise completa da sessão atual via DevTools (console, rede, DOM, React internals e CSS). Encontrei **5 bugs**, do crítico ao menor:

---

## 🔴 BUG 1 — Tela Preta ao Recarregar (CRÍTICO)

**Sintoma:** Ao recarregar a página (F5), ela abre com tela completamente preta. O usuário precisa fazer scroll manual para o conteúdo aparecer.

**Causa raiz:** `history.scrollRestoration` está como `"auto"` (padrão do browser). O Lenis (smooth scroll) **não está sobrescrevendo** isso para `"manual"`. Quando o browser recarrega, restaura automaticamente a posição de scroll anterior (detectei `scrollY = 11082px`, que é o fim da seção animada "O Que Me Move"). O Lenis inicializa **nessa posição**, mas as animações ainda não foram calculadas para ela — resultado: tela preta.

**Correção:** No `LenisProvider` (ou onde o Lenis é instanciado), adicionar antes do `new Lenis(...)`:

```js
// Antes de instanciar o Lenis
if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
}
```

---

## 🟠 BUG 2 — Double Fetch de Imagens do Supabase (MODERADO)

**Sintoma:** As 4 imagens `about.origin_image.1` a `4` são buscadas **2 vezes cada** no carregamento (requisições 1–4 e 5–8 nas network requests).

**Causa:** O componente de Origem está fazendo fetch tanto no **Server Component (RSC)** quanto novamente no **Client Component via `useEffect`**, sem deduplicação ou passagem de dados como props.

**Impacto:** Dobra as requisições ao Supabase, aumenta o tempo de carregamento e consome mais quota da API.

**Correção:** Usar o `cache()` do React no fetch server-side, ou passar os dados já buscados no server como props ao componente cliente:
```js
// server component
const data = await fetchOriginImages(); // cached
return <OriginSection images={data} />; // passa como prop, sem re-fetch
```

---

## 🟠 BUG 3 — Erros 503 nos Vídeos do Supabase Storage (MODERADO)

**Sintoma:** 4 vídeos são requisitados **simultaneamente** no carregamento da página, causando throttling:
- `about.hero.desktop_video.mp4` → 206, depois **503**
- `about.hero.mobile_video.mp4` → 206, depois **503**
- `about.method.desktop_video.mp4` → 206, depois **503**
- `video.closing.desk.mp4` → 206, depois **503**

Os 503 indicam que o Supabase Storage está rejeitando requisições paralelas excessivas.

**Correção:** Aplicar lazy loading nos vídeos que estão fora do viewport inicial. Apenas o vídeo do hero precisa carregar imediatamente:
```jsx
// Vídeos abaixo do fold
<video loading="lazy" preload="none" ...>
```

---

## 🟡 BUG 4 — Canvas Three.js com DPR Incorreto (MENOR)

**Sintoma:** O canvas 3D da seção "O Que Me Move" está renderizando com ratio de **~1.56x** ao invés de **2x** (esperado em tela Retina com `devicePixelRatio = 2`). O canvas de marquee (skills) está correto em 2x.

**Impacto:** A cena 3D fica levemente borrada em telas HiDPI/Retina.

**Causa provável:** O `<Canvas>` do React Three Fiber está configurado com `dpr={[1, 1.5]}` ao invés de `dpr={[1, 2]}`.

**Correção:**
```jsx
<Canvas dpr={[1, Math.min(window.devicePixelRatio, 2)]} ...>
```

---

## 🟡 BUG 5 — `THREE.Clock` Depreciado (MENOR)

**Sintoma:** Dois warnings no console (detectados via React DevTools):
```
THREE.THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```

**Causa:** A versão do `three.js` em uso ainda referencia `THREE.Clock`, que foi depreciado em favor de `THREE.Timer` nas versões mais recentes.

**Correção:** Atualizar `three.js` para a versão mais recente e substituir usos de `THREE.Clock` por `THREE.Timer` no código.

---

## Resumo Executivo

| # | Severidade | Bug | Causa | Onde Corrigir |
|---|---|---|---|---|
| 1 | 🔴 Crítico | Tela preta no reload | `scrollRestoration = "auto"` | `LenisProvider` |
| 2 | 🟠 Moderado | Double fetch de imagens | RSC + useEffect sem cache | Componente `OriginSection` |
| 3 | 🟠 Moderado | 503 nos vídeos | 4 vídeos carregando em paralelo | Tags `<video>` off-screen |
| 4 | 🟡 Menor | Canvas 3D borrado | DPR = 1.56x ao invés de 2x | `<Canvas dpr=...>` no R3F |
| 5 | 🟡 Menor | THREE.Clock deprecated | Versão antiga do three.js | Atualizar dependência |

O **Bug 1** é o mais urgente — é o que causa a tela preta que o usuário provavelmente está vendo na sessão atual. A correção é de **1 linha de código** no provider do Lenis.
