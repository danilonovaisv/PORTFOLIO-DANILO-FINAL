 # SOBRE — PROTOTIPO INTERATIVO (CANONICO)

Versao: **3.0**  
Data: **2026-02-09**  
Status: **Canonica para implementacao**

## 1. Objetivo da pagina

A rota `/sobre` deve construir confianca e contexto estrategico com leitura confortavel, ritmo editorial e narrativa progressiva.

Resultado esperado:

- visitante entende visao, metodo e posicionamento;
- conteudo permanece legivel em qualquer dispositivo;
- a pagina direciona para Portfolio e Contato sem friccao.

## 2. Regras absolutas de legibilidade

Nunca fazer:

- texto direto sobre imagem/video sem overlay escuro forte;
- blur excessivo prejudicando leitura;
- animacoes com `scale`, `bounce` ou `rotate` em conteudo.

Excecoes controladas:

- Hero com texto sobre video **com overlay escuro >= 80%**.
- Secao 04 com texto dentro de card escuro sobre video.

## 3. Regras globais (Ghost)

- Easing oficial: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Uma secao = uma intencao de motion.
- Animacoes permitidas: `opacity`, `blur`, `translateY` (max. 18px).
- `prefers-reduced-motion` obrigatorio.

## 4. IA da pagina `/sobre`

Ordem canonica:

1. Header
2. Hero / Manifesto
3. Origem criativa
4. O que eu faco
5. Como eu trabalho
6. O que me move
7. Fechamento (CTA)
8. Marcas
9. Contato
10. Footer

## 5. Conteudo por secao

### 5.1 Header

- Mesmo padrao global da Home.
- Link ativo: `/sobre`.
- Sem efeitos chamativos no scroll.

### 5.2 Hero / Manifesto

Objetivo: abrir com declaracao de identidade e tom editorial.

Conteudo recomendado:

- H1: `Sou Danilo Novais.`
- Manifesto: `Voce nao ve tudo o que eu faco. Mas sente quando funciona.`
- Sem CTA primario no Hero (foco em leitura).

Midia:

- Desktop video: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4`
- Mobile video: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4`
- Sempre com overlay escuro forte e poster.

### 5.3 Origem criativa

Objetivo: mostrar repertorio e criterio criativo sem autopromocao vazia.

Diretriz:

- narrativa em blocos curtos;
- imagens de apoio com prioridade secundaria;
- texto permanece dominante na hierarquia visual.

Assets:

- `.../about/origin/about.origin_image.1.webp`
- `.../about/origin/about.origin_image.2.webp`
- `.../about/origin/about.origin_image.3.webp`
- `.../about/origin/about.origin_image.4.webp`

### 5.4 O que eu faco

Objetivo: traduzir oferta em linguagem clara de negocio.

Formato:

- 3 a 5 pilares.
- Cada pilar com H3 + descricao curta + resultado.

Regra de leitura:

- evitar blocos longos;
- usar espacamento para escaneabilidade.

### 5.5 Como eu trabalho

Objetivo: tornar metodo explicito e repetivel.

Estrutura sugerida:

1. Diagnostico
2. Direcao
3. Prototipacao
4. Validacao
5. Entrega e evolucao

Cada etapa deve explicitar:

- entrada;
- criterio de decisao;
- saida mensuravel.

### 5.6 O que me move

Objetivo: camada de crença e visao de longo prazo.

Implementacao:

- opcionalmente usar modelo 3D decorativo;
- o texto nunca depende do 3D;
- fallback obrigatorio para imagem estatica.

Asset 3D opcional:

- `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb`

### 5.7 Fechamento (CTA)

Objetivo: converter interesse em acao direta.

CTAs recomendados:

- primario: `fale comigo`
- secundario: `ver portfolio`

Comportamento:

- sem scale no hover/tap;
- feedback por opacidade e contraste.

## 6. Acessibilidade e semantica

Estrutura obrigatoria:

- `header/nav/main/section/footer`
- H1 unico na pagina
- H2 por secao
- H3 por card/item

Checklist minimo:

- [ ] contraste AA em todas as secoes
- [ ] foco visivel em links e botoes
- [ ] navegacao 100% teclado
- [ ] alt text descritivo onde houver imagem informativa
- [ ] midia decorativa com `aria-hidden="true"`
- [ ] skip link para conteudo principal

## 7. Performance, stack e boundaries

Stack da pagina:

- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis opcional
- R3F/Drei opcional (sempre com fallback)

Regras de implementacao:

- Server components para shell/metadata.
- Client components apenas para animacao/video/modal/3D.
- Lazy load de video abaixo da dobra.
- Dynamic import para blocos 3D.

Targets:

- LCP < 2.5s
- CLS < 0.1
- INP bom
- Lighthouse > 90

## 8. SEO da rota

- `export const metadata` em `/sobre`.
- Titulo e descricao orientados a posicionamento profissional.
- Open Graph com imagem representativa da pagina.
- JSON-LD `Person` com foco em atividade criativa.

## 9. Estrutura recomendada (implementacao)

```txt
app/sobre/page.tsx
app/sobre/_components/AboutHero.tsx
app/sobre/_components/AboutOrigin.tsx
app/sobre/_components/AboutWhatIDo.tsx
app/sobre/_components/AboutMethod.tsx
app/sobre/_components/AboutBeliefs.tsx
app/sobre/_components/AboutClosing.tsx
app/sobre/_hooks/usePrefersReducedMotion.ts
lib/motion.ts
```

## 10. Checklist de QA da pagina Sobre

- [ ] texto sempre legivel sobre midia (overlay >= 80% quando necessario)
- [ ] nenhum uso de scale/bounce/rotate em UI de leitura
- [ ] Hero com H1 unico e contraste AA
- [ ] secoes com hierarquia editorial clara
- [ ] fallback funcional para video e 3D
- [ ] reduced motion desativando parallax/3D/reveals complexos
- [ ] navegacao por teclado validada de ponta a ponta

---

## 11. Prompt estruturado (prototype-prompt-generator)

### Role

Voce e um engenheiro(a) de frontend especializado em paginas editoriais de alta legibilidade, com dominio de Next.js App Router, Tailwind e motion acessivel.

### Task

Crie o prototipo da pagina `/sobre` do portfolio Ghost Design System com foco absoluto em leitura, narrativa sequencial e conversao discreta.

### Tech Stack

- Next.js App Router + React 18+ + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (opcional)
- R3F/Drei (opcional e nao essencial)

### Visual Requirements

- Estetica premium e silenciosa.
- Grid editorial denso.
- Texto sempre acima da midia em prioridade de leitura.
- Tokens de cor e espacamento devem seguir a base global do projeto.

### Motion Requirements

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Permitido: `opacity`, `blur`, `translateY`
- Proibido: `scale`, `bounce`, `rotate`
- Max `translateY`: 18px
- `prefers-reduced-motion` obrigatorio

### Accessibility Requirements

- Contraste AA
- semantica correta
- foco visivel
- alvos touch >= 48x48
- navegacao 100% teclado

### Output Format

Entregar pagina com:

1. secoes canonicas da IA;
2. conteudo textual pronto para producao;
3. fallback de video/3D;
4. metadata SEO + JSON-LD;
5. checklist de QA implementado.
