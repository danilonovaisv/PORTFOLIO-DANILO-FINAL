
# **3. Origem Criativa**

**Função:** Revelar trajetória criativa através de efeito mask reveal pinned — imagens emergem de baixo para cima como "memórias sendo descobertas".

**Stack Técnico:** GSAP 3.13 + ScrollTrigger + Lenis

**Referência:** https://codepen.io/danilonovaisv/pen/KwMgWMG
**CÓDIGO REFERENCIA:** https://drive.google.com/drive/folders/1SZg3TTXHT3l6OHZhxeFbCC8vR0k2RHE3?usp=sharing

#### Desktop

**Layout:**
- Grid 2 colunas fixas:
  - Esquerda (300px mín): textos
  - Direita (540px máx): imagens pinned
- Container: 1440px
- Gap: 60px
- Padding: 2rem

**Composição Grid:**

```tsx
<section className="w-full bg-background py-24">
  <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
    {/* Título */}
    <h1 className="text-h1 text-center mb-16">Origem</h1>
    
    {/* Grid Desktop */}
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12">
      {/* Textos - Esquerda */}
      <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-24">
        {/* Blocos de texto */}
      </div>
      
      {/* Imagens Pinned - Direita */}
      <div className="hidden lg:block lg:col-span-6 sticky top-24 h-fit">
        {/* Imagens com mask reveal */}
      </div>
    </div>
  </div>
</section>
```

**Imagens:**
- 4 imagens (500px altura, auto largura)
- Pinned à direita
- Z-index: 4 → 1 (sequencial)
- `object-fit: cover`
- `border-radius: 24px`
- `blur(4px)` inicial → `blur(0)`
- `opacity: 0.85` → `1`

#### Mobile

**Layout:**
- Stack vertical intercalado: Texto → Imagem
- Ordem controlada via CSS `order`
- Imagens: 400–400px

**Composição Mobile:**

```tsx
<section className="w-full bg-background py-16">
  <div className="max-w-[1680px] mx-auto px-6">
    <h1 className="text-h1 text-center mb-12">Origem</h1>
    
    <div className="space-y-12">
      {/* Bloco 1 */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-h2 text-bluePrimary mb-4">O QUE PERMANECE</h2>
          <p className="text-body">...</p>
        </div>
        <img src="..." className="w-full rounded-2xl" />
      </div>
      
      {/* Repetir para blocos 2-4 */}
    </div>
  </div>
</section>
```

#### Conteúdo

**Título (H1):**
```
Origem
```

**Blocos:**

**1. O QUE PERMANECE** (H1, `bluePrimary`)
```
Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.1.webp`
- Texto: alinhado à direita, -10% vertical

**2. DO TRAÇO À INTENÇÃO** (H1, `bluePrimary`)
```
Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.2.webp`
- Texto: alinhado à esquerda, -10% vertical

**3. A DESCOBERTA DO INVISÍVEL** (H1, `bluePrimary`)
```
Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.3.webp`
- Texto: alinhado à direita, -10% vertical

**4. EXPANSÃO COM PROPÓSITO** (H1, `bluePrimary`)
```
Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.4.webp`
- Texto: alinhado à esquerda, -10% vertical

#### Animação GSAP

**Desktop (Pin + Mask Reveal):**

```tsx
gsap.timeline({
  scrollTrigger: { 
    pin: ".arch__right", 
    scrub: true,
    start: "top top",
    end: "bottom bottom"
  }
})
.to(imgAtual, { 
  clipPath: "inset(0 0 100%)",
  duration: 1
})
.to(imgProxima, { 
  objectPosition: "0px 40%",
  duration: 1
}, "<");
```

**Especificações:**
- `clipPath: "inset(0 0 100%)"` → `inset(0)`
- Object position: `0% 0%` → `60%` (atual) + `40%` (próxima)
- Transição BG: `#040013` → `#0a001a` (duration: 1.5s)
- Blur/Focus: `blur(4px)` → `blur(0px)` + `opacity: 0.85→1`

**Mobile (Parallax):**
- `objectPosition: 60% → 30%` por imagem
- Trigger: Intersection Observer

#### Identidade Visual

| Elemento | Especificação |
|----------|---------------|
| Cores | `#040013` → `#0a001a`, `#fcffff` (texto), `bluePrimary` (H1) |
| Tipografia | TT Norms Pro: H1 800 (32-48px), H3 400 (16-20px), line-height: 1.6 |
| Espaçamentos | Container 1440px, gap 60px, padding 2rem |
| Bordas | `border-radius: 24px` |

#### Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| < 560px | Stack vertical, imgs 280px, container padding 10px |
| 560–768px | Stack, imgs 360px, gap 20px |
| 769–1024px | 2-col, right flexível, gap 30px |
| 1024px+ | Pin completo, textos 356px fixos, max-width 1100px |
| > 1440px | Container limitado, centralizado |

#### Acessibilidade

- Semântica: `<section class="origem-criativa">` + H1 por bloco
- ALT texts descritivos (ex: "O que permanece - essência que sobrevive...")
- Contraste: 21:1 (`#fcffff` sobre `#040013`)
- Navegação por teclado nativa
- `prefers-reduced-motion` support
- SEO: H1 único "Origem" + H3s hierárquicos
- Performance: `loading="lazy"`, GPU `transform`/`clip-path`

---


1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

