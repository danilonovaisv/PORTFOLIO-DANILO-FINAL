# Roadmap de Ajustes — Prompts de Instrução por Seção

Use os blocos abaixo como prompts individuais para um agente aplicar as correções no projeto.
Cada bloco está organizado por **seção da página** e contém prompts autocontidos.


---

## BLOCO 1 — GLOBAL / ARQUITETURA / PERFORMANCE

### Prompt 1.1 — Otimizar Canvas 3D global (DPR, eventSource, posicionamento)

**Sessão/Área:** Global (Canvas R3F usado na Home, principalmente Hero)

**Severidade:** Alta

**Arquivos-alvo (ajuste conforme o projeto):**  
- Layout ou provider global que contém o `<Canvas>` (ex.: `app/layout.tsx`, `app/(site)/layout.tsx` ou componente `SceneCanvas.tsx`)
- Cena/scene atual da Hero (ex.: `HeroGlassScene.tsx`, `Model.js` / `Model.tsx`)

**Objetivo**  
Configurar o Canvas R3F para ter boa performance e integração com scroll/mouse, limitando DPR, usando `eventSource` adequado e evitando bloquear interações do DOM.

**Instruções para o agente**

1. Localize o componente que renderiza o `<Canvas>` principal do 3D na Home.
2. Ajuste o `<Canvas>` para:
   - Ter `dpr={[1, 1.5]}` (ou semelhante) para limitar o devicePixelRatio.
   - Definir a câmera com algo na linha de `camera={{ position: [0, 0, 4], fov: 45 }}`.
   - Usar `eventSource={typeof window !== 'undefined' ? document.body : undefined}` (ou equivalente) para que eventos de mouse/scroll sejam globais.
3. Se o Canvas ficar sobreposto ao conteúdo e bloquear cliques:
   - Envolva-o em um container com classes similares a:
     - `className="pointer-events-none fixed inset-0"` (ou `absolute` conforme o layout).
4. Garanta que o Canvas seja carregado apenas onde necessário (ex.: somente na Home, não globalmente em todas as páginas).

**Critérios de aceite**

- Canvas não degrada fortemente a performance em laptops e mobile.
- Interações de mouse/scroll funcionam em toda a página (não apenas área do Canvas).
- Links e botões do DOM continuam clicáveis mesmo com o Canvas renderizado.


---

### Prompt 1.2 — Aplicar “tiering” de performance no MeshTransmissionMaterial (vidro)

**Sessão/Área:** Global 3D (modelo de vidro: toro/esfera)

**Severidade:** Alta

**Arquivos-alvo:**  
- Componente do modelo 3D que usa `MeshTransmissionMaterial` ou material equivalente (ex.: `Model.js`, `TorusDan.tsx`, `HeroGlassScene.tsx`)

**Objetivo**  
Diminuir a carga de GPU em dispositivos mais fracos, ajustando qualidade do material de vidro conforme o dispositivo (desktop vs mobile) e, se necessário, aplicando fallback.

**Instruções para o agente**

1. Localize o mesh que usa `MeshTransmissionMaterial` (ou material de vidro semelhante) no componente do modelo.
2. Crie ou utilize um hook/helper para detectar mobile:
   - Ex.: `useIsMobile` usando `window.matchMedia('(max-width: 768px)')` ou user agent.
3. Condicione as props do material conforme o dispositivo. Por exemplo:
   - Em desktop: `samples` e `resolution` mais altos.
   - Em mobile: `samples` e `resolution` reduzidos e menor `distortion`.
4. Se for detectado FPS muito baixo (se houver métrica disponível), prever fallback para `meshPhysicalMaterial` mais simples (mesmo tom e transparência aproximada).
5. Garanta que o material esteja memoizado quando possível, para não recriar instâncias a cada render.

**Critérios de aceite**

- Em mobile, a cena continua fluida (sem quedas bruscas de FPS) mantendo aparência aceitável.
- Em desktop, o vidro mantém boa qualidade visual.
- Não há regressões visuais severas no hero 3D.


---

### Prompt 1.3 — Respeitar `prefers-reduced-motion` em 3D e animações (Framer Motion)

**Sessão/Área:** Global (3D da Hero, animações Framer Motion, animações baseadas em scroll)

**Severidade:** Alta

**Arquivos-alvo:**  
- Componentes com animações Framer Motion (ex.: `Hero.tsx`, `ManifestoSection.tsx`, cards de projetos)
- Cena 3D (ex.: `Model.js`, `HeroGlassScene.tsx`)

**Objetivo**  
Desativar ou simplificar animações intensas quando o usuário tiver `prefers-reduced-motion: reduce` configurado no sistema.

**Instruções para o agente**

1. Adicione um hook global ou use `useReducedMotion` do Framer Motion para detectar `prefers-reduced-motion`.
2. Aplique esta flag em:
   - Rotação contínua do modelo 3D (toro/esfera).
   - Animações de parallax baseadas em `useFrame` e scroll.
   - Animations de entrada/scroll (Framer Motion) dos blocos de texto e seções.
3. Em modo “reduced”:
   - Congele a rotação do 3D ou reduza muito a velocidade.
   - Desative parallax (use apenas posição estática).
   - Troque animações elaboradas (slide/rotate 3D) por fades simples, ou exiba o conteúdo já visível sem transições.
4. Garanta que esse comportamento seja consistente em todas as seções.

**Critérios de aceite**

- Com `prefers-reduced-motion: reduce`, o site praticamente não usa animações complexas.
- Sem o flag, a experiência mantém as animações atuais (ou melhoradas).
- Não há warnings ou erros novos relacionados a hooks ou SSR.


---

### Prompt 1.4 — Lazy load de elementos pesados (vídeo manifesto, seções densas)

**Sessão/Área:** Global (principalmente seção Manifesto + vídeos/projetos pesados)

**Severidade:** Média

**Arquivos-alvo:**  
- Componente do vídeo manifesto (ex.: `ManifestoSection.tsx`, `ManifestoVideo.tsx`)
- Seções com grids de projetos e imagens pesadas (ex.: `FeaturedProjectsSection.tsx`)

**Objetivo**  
Evitar que vídeo e seções pesadas sejam carregados logo no carregamento inicial, melhorando LCP e uso de banda.

**Instruções para o agente**

1. Localize o componente de vídeo manifesto e transforme-o em import dinâmico:
   - Ex.: `const ManifestoVideo = dynamic(() => import('./ManifestoVideo'), { ssr: false });`
2. Use `Suspense` ou algum mecanismo de `IntersectionObserver` (caso já haja infra) para só montar o vídeo quando a seção estiver próxima da viewport.
3. Em seções de projetos com muitas imagens:
   - Garanta que estejam usando `next/image` (ver Prompt 1.5).
   - Se necessário, avalie `loading="lazy"` combinado com `sizes` corretos.
4. Teste em mobile (rede 3G/4G) para validar que o vídeo não comece a carregar muito antes do usuário chegar à seção.

**Critérios de aceite**

- LCP e tempo até primeira interação melhoram (perceptivelmente) em conexões médias.
- Vídeo manifesto não consome banda até que o usuário role para perto da seção.
- Não há flash ou quebra visual ao montar o vídeo.


---

### Prompt 1.5 — Otimizar imagens com `next/image` e `sizes` adequados

**Sessão/Área:** Global (principalmente cards de projetos e imagens de destaque)

**Severidade:** Média

**Arquivos-alvo:**  
- Seções e componentes de projetos (ex.: `FeaturedProjectsSection.tsx`, `ProjectCard.tsx`)
- Qualquer `<img>` que traga imagens grandes

**Objetivo**  
Reduzir peso das imagens e evitar downloads maiores que o necessário, melhorando LCP e layout.

**Instruções para o agente**

1. Substitua `<img>` por `<Image>` de `next/image` em todos os cards/projetos relevantes.
2. Defina:
   - `width` e `height` proporcionais à imagem.
   - `alt` descritivo (sem mudar a copy do texto visível).
3. Configure `sizes` coerentes com o layout. Exemplo típico para uma grid de projetos:
   - `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
4. Verifique se não há `layout shift` (CLS) ao carregar as imagens:
   - Use `fill` + container com posição relativa e altura fixa ou
   - Defina `width`/`height` melhorando a reserva de espaço.
5. Teste em 3 resoluções (mobile, tablet, desktop) para garantir que imagens são nítidas mas não excessivamente pesadas.

**Critérios de aceite**

- Lighthouse aponta melhor pontuação em “Performance” e “Best Practices”.
- Nenhum layout é quebrado ou “pulando” quando imagens carregam.
- Imagens ainda mantêm boa qualidade visual.


---

### Prompt 1.6 — Ajustar espaçamentos globais para aderir ao layout de referência

**Sessão/Área:** Todas as seções (Portfolio Showcase, Featured Projects, Clients, Contact, etc.)

**Severidade:** Baixa

**Arquivos-alvo:**  
- Componentes de seção (ex.: `PortfolioShowcaseSection.tsx`, `FeaturedProjectsSection.tsx`, `ClientsSection.tsx`, `ContactSection.tsx`)
- Estilos globais (`globals.css`, módulos CSS ou classes Tailwind utilizadas)

**Objetivo**  
Refinar `padding`, `gap` e `space-y` nas seções para ficar mais próximo do mock de referência, sem alterar conteúdo.

**Instruções para o agente**

1. Revise cada seção da Home e compare com o layout de referência:
   - `py` de cada seção (ex.: `py-16`, `py-20`).
   - `gap` entre título e conteúdo (`gap-4`, `gap-8`, etc.).
   - Espaçamento entre grid de cards e CTA.
2. Ajuste utilitários Tailwind ou classes CSS para:
   - Dar mais respiro onde a seção está “apertada”.
   - Reduzir espaço onde a seção parece “solta” demais.
3. Nos clientes/logos:
   - Alinhe verticalmente os logos no centro das faixas.
   - Ajuste margens laterais para não colar nas bordas em mobile.
4. No formulário de contato:
   - Garanta ritmo vertical consistente entre label, input e mensagens de erro.
   - Use mesma escala de espaçamento (ex.: múltiplos de 4).

**Critérios de aceite**

- Layout visualmente mais limpo e coerente com o mock.
- Nenhuma quebra de responsividade em 3 principais breakpoints (mobile, tablet, desktop).


---


# BLOCO ESPECÍFICO — SESSÃO DE PROJETOS EM DESTAQUE (GRID DE CASES)

### Prompt — Implementar sessão de trabalhos em destaque *idêntica* à referência visual

**Sessão/Área:** Grade de cases com cards grandes + CTA “Like what you see? / view projects” (seção mostrada na imagem de referência).

**Severidade:** Crítica

**Arquivos-alvo sugeridos (ajuste conforme o projeto):**
- \`FeaturedProjectsSection.tsx\` (ou equivalente).
- Componentes de card de projeto (ex.: \`ProjectCard.tsx\`).
- Estilos da seção (Tailwind direto, módulo CSS ou styled components).

---

## 1. REGRA OBRIGATÓRIA DE CONTEÚDO TEXTUAL

Esta sessão **NÃO PODE** incluir **nenhum texto visível diferente** do que está na imagem de referência.

Só é permitido renderizar exatamente os seguintes textos (mesmo idioma, ortografia, pontuação e capitalização):

- \`let's build something great\`
- \`branding\` (tag do card “magic”)
- \`Bringing the Magic Back to Radio\`
- \`Magic\`
- \`campaign\` (tag do card da atleta)
- \`Fearless.\`
- \`Unmatched.\`
- \`Taking Sportswear to the Skies\`
- \`Eurosport\`
- \`Epic look\`
- \`Refreshing a Telecom Challenger\`
- \`EPIC\`
- \`branding\` (tag do card FFF Legal)
- \`website\` (tag do card FFF Legal)
- \`Designing Trust – The FFF Legal Identity\`
- \`FFF Legal\`
- \`Like what you see?\`
- \`view projects\`

**Não é permitido, nesta sessão:**

- Adicionar headings extras como \`Featured Projects\`, \`Work\`, \`Cases\` etc.
- Criar descrições adicionais, subtítulos, legendas, rótulos de botões ou qualquer outro texto além dos listados acima.
- Traduzir, reescrever ou variar esses textos (por exemplo, não usar \`Vamos construir algo incrível\` no lugar de \`let's build something great\`).

> Se precisar de atributos não visíveis para acessibilidade (ex.: \`aria-label\`, \`alt\`), use variações baseadas nesses mesmos textos ou descrições mínimas, mas **não renderize** esses textos extra visualmente na interface.

Esta regra de conteúdo textual **vale apenas para esta sessão específica** (grid de cases + CTA “Like what you see? / view projects”) e **não** para as demais seções da página.

---

## 2. ESTRUTURA E LAYOUT DA SESSÃO

1. **Organização geral**
   - A sessão deve reproduzir a grade mostrada na imagem:
     - Linha 1:
       - Card “magic” (esquerda).
       - Card da atleta “Fearless. / Unmatched.” (direita).
       - Pill flutuante no topo: \`let's build something great\`.
     - Linha 2:
       - Card grande “Epic look” ocupando toda a largura.
     - Linha 3:
       - Card “FFF Legal” à esquerda.
       - Bloco de CTA “Like what you see? / view projects” à direita.

2. **Cards de projeto**
   - Cada card é clicável (use \`<button>\` ou \`<a>\` abrangendo toda a área clicável).
   - Inclua:
     - Imagem principal.
     - Tag(s) no canto superior direito (ex.: \`branding\`, \`campaign\`, \`website\`).
     - Título do projeto (linha principal abaixo da imagem).
     - Nome do cliente (linha menor logo abaixo do título).
     - Ícone de seta azul no canto inferior direito.

3. **CTA “Like what you see?”**
   - Composto por:
     - Texto \`Like what you see?\` em duas linhas (quebra responsiva ok).
     - Botão pill azul com \`view projects\` + ícone de seta.

---

## 3. ESTILOS E INTERAÇÃO (SEM MUDAR TEXTO)

1. **Hover e foco**
   - Cards e CTA devem ter feedback claro:
     - Leve elevação/scale no hover.
     - \`cursor-pointer\`.
     - Estados de foco acessíveis, por exemplo:
       - \`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]\`.

2. **Tipografia**
   - Respeitar o contraste e peso aparentes:
     - Títulos dos projetos com peso maior que o nome do cliente.
     - CTA “Like what you see?” com tipografia forte, seguindo a referência.

3. **Responsividade**
   - Mobile: cards empilhados verticalmente, mantendo ordem visual da referência.
   - Desktop: manter a grade 2x2 e o CTA à direita do card FFF Legal, como na imagem.

---

## 4. RESTRIÇÕES ADICIONAIS

- **Não inventar cópias**:
  - Proibido criar qualquer texto auxiliar, tooltips visíveis, microcopies novas ou rótulos extras.
- **Acessibilidade sem poluir a UI**:
  - Pode-se usar \`aria-label\`, \`aria-describedby\` e \`alt\` para acessibilidade, desde que esses textos extras **não sejam exibidos visualmente**.
  - Quando possível, derive esses textos diretamente das strings permitidas (por ex., \`aria-label="Bringing the Magic Back to Radio — Magic"\`).

---

## 5. CRITÉRIOS DE ACEITE

- A sessão mostra **apenas** os textos da lista de permitidos.
- O layout da grade e CTA corresponde visualmente à referência da imagem.
- Interações de hover/foco funcionam e são acessíveis, sem introduzir textos visíveis novos.
`;

// Componente 3D simples (orb girando) apenas para seguir o padrão do projeto com R3F.
function SpinningOrb() {
  const meshRef = useRef<Mesh | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.35;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color="#2563eb"
        metalness={0.85}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function FeaturedProjectsPromptPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 p-6 md:p-10">
      {/* Coluna esquerda: Markdown do prompt para copiar e colar */}
      <section className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
        <h1 className="mb-4 text-lg font-semibold text-slate-100">
          Prompt da sessão de projetos em destaque (copiar e colar em .md)
        </h1>
        <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap text-[11px] leading-relaxed md:text-xs font-mono text-slate-100">
          {featuredProjectsPromptMarkdown}
        </pre>
      </section>

      {/* Coluna direita: Canvas R3F decorativo */}
      <aside className="relative h-[320px] md:h-auto rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.4}
            castShadow
          />
          <SpinningOrb />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center p-4">
          <span className="rounded-full bg-slate-900/80 px-4 py-1 text-xs font-medium text-slate-200 shadow-lg shadow-blue-500/20">
            Visual helper — não faz parte da UI final da sessão
          </span>
        </div>
      </aside>
    </main>
  );
}

## BLOCO 2 — HERO + 3D

### Prompt 2.1 — Reestruturar layout da Hero com sticky e 2 colunas claras

**Sessão/Área:** Hero

**Severidade:** Alta

**Arquivos-alvo:**  
- Componente da Hero (ex.: `Hero.tsx`, `app/page.tsx` ou `app/(site)/page.tsx`)
- Estilos da Hero (Tailwind direto ou módulo CSS correspondente)

**Objetivo**  
Garantir que a Hero siga o layout de 2 colunas bem definidas, com bloco sticky ocupando aproximadamente `200vh`, texto à esquerda e 3D + thumb de vídeo à direita.

**Instruções para o agente**

1. Transforme a Hero em um `<section id="hero">` com altura estendida:
   - Ex.: `className="relative min-h-[200vh] bg-[...]"` (ajuste conforme design).
2. Dentro da seção, crie um wrapper sticky:
   - Algo como: `className="sticky top-0 min-h-screen flex items-center"`.
3. Implemente um grid responsivo:
   - `md:grid md:grid-cols-2 md:gap-8` (ou semelhante).
   - Mobile: colunas em stack, 3D abaixo do texto.
4. Organize conteúdo:
   - **Coluna esquerda:** tag `[BRAND AWARENESS]`, H1 principal, subtítulo (bloco translúcido) e CTA.
   - **Coluna direita:** Canvas 3D (topo) e thumb do vídeo manifesto (parte inferior direita).
5. Ajuste z-index e posicionamento do 3D para não sobrepor indevidamente o texto.
6. Refine o bloco branco translúcido do subtítulo para destacar melhor (ex.: `bg-white/60 backdrop-blur-md rounded-xl px-4 py-3`).

**Critérios de aceite**

- Em desktop, Hero se comporta como um painel sticky entre ~1–2 páginas de rolagem.
- A separação de colunas é clara: texto à esquerda, 3D e thumb à direita.
- Em mobile, layout se adapta sem sobreposição confusa entre título e 3D.


---

### Prompt 2.2 — Sincronizar rotação/parallax do toro/esfera com scroll e mouse

**Sessão/Área:** Hero (3D)

**Severidade:** Alta

**Arquivos-alvo:**  
- Componente do modelo 3D (ex.: `Model.js`, `TorusDan.tsx`)
- Cena que utiliza `useFrame`/`useScroll` (ex.: `HeroGlassScene.tsx`)

**Objetivo**  
Fazer com que o toro/esfera reaja suavemente ao scroll e ao movimento do mouse, passando sensação de interação viva e fluida.

**Instruções para o agente**

1. Envolva a cena do 3D em `<ScrollControls>` do drei (se ainda não estiver):
   - Ex.: `<ScrollControls pages={2}> ... </ScrollControls>` dentro do `<Canvas>`.
2. Dentro do componente do modelo:
   - Crie um `ref` para o mesh principal (ex.: `const mesh = useRef<THREE.Mesh>(null);`).
   - Use `const scroll = useScroll();`.
3. No `useFrame`, atualize `rotation` e, se necessário, `position` baseado em:
   - `scroll.offset` (0 → 1) para rotação em Y (ex.: `offset * Math.PI * 2`).
   - `state.mouse` para parallax leve (X e Y).
   - Use funções de amortecimento (`THREE.MathUtils.damp`) para transições suaves.
4. Respeite `prefers-reduced-motion` (ver Prompt 1.3):
   - Se reduzido, fixe rotação em um ângulo estável e desative parallax.
5. Teste se o movimento responde bem tanto em mouse quanto em trackpad/touch.

**Critérios de aceite**

- Ao rolar, o toro/esfera gira de forma suave e coerente, sem travadas.
- Ao mexer o mouse, há um parallax leve, sem exagero.
- Em modo “reduced motion”, o modelo fica quase estático.


---

## BLOCO 3 — INTEGRAÇÃO HERO ↔ MANIFESTO / VÍDEO MANIFESTO

### Prompt 3.1 — Implementar animação da thumb do vídeo manifesto baseada em scroll

**Sessão/Área:** Transição Hero → Manifesto

**Severidade:** Alta

**Arquivos-alvo:**  
- `Hero.tsx` (ou página que contém a Hero)
- `ManifestoSection.tsx` (ou equivalente)
- Componente compartilhado para thumb/vídeo, se criado (ex.: `ManifestoThumb.tsx`)

**Objetivo**  
Transformar a thumb de vídeo da Hero em um elemento que cresce e se reposiciona, tornando-se o player principal na seção Manifesto conforme o usuário rola.

**Instruções para o agente**

1. Crie um componente para a thumb de vídeo (se ainda não existir) que possa ser animado via Framer Motion (`motion.div`).
2. Em `Hero.tsx`, envolva a thumb em um elemento animável:
   - Use `useScroll` + `useTransform` do Framer Motion com `target` apontando para a Hero.
3. Mapeie `scrollYProgress` da Hero para:
   - `scale` (ex.: de `0.6` a `1.2`).
   - `translateY` e `translateX` (para mover da coluna da Hero até a posição aproximada da seção Manifesto).
   - `borderRadius` (de `24px` até `0px`, por exemplo).
4. Na seção Manifesto:
   - Garanta que o container do player final esteja alinhado com o estado final da animação da thumb, para que a continuação pareça natural (mesma proporção, alinhamento aproximado).
5. Sincronize opacidade/escala do texto da Hero:
   - Conforme a thumb se aproxima do tamanho máximo, reduza a opacidade do texto principal da Hero (H1, subtítulo).
6. Respeite `prefers-reduced-motion`:
   - Se ativo, desative a animação de transição e apenas exiba a thumb em estado estático na Hero e o vídeo completo na seção Manifesto sem transição contínua.

**Critérios de aceite**

- Ao rolar da Hero para o Manifesto, o usuário percebe claramente que é o mesmo elemento de vídeo “crescendo”.
- A transição é suave, sem saltos bruscos de posição ou escala.
- Não há glitches visuais em breakpoints mobile/desktop.


---

### Prompt 3.2 — Otimizar carregamento do vídeo manifesto e acessibilidade do player

**Sessão/Área:** Manifesto (vídeo principal)

**Severidade:** Alta/Média

**Arquivos-alvo:**  
- `ManifestoSection.tsx`
- Componente do player de vídeo (ex.: `ManifestoVideo.tsx`)

**Objetivo**  
Garantir que o vídeo manifesto seja carregado de forma eficiente e tenha controles acessíveis (teclado, screen reader, `aria-labels`), além de respeitar autoplay sem som por padrão.

**Instruções para o agente**

1. Configure o elemento `<video>` com:
   - `preload="metadata"`.
   - `playsInline`.
   - `muted`.
   - `autoPlay` apenas se o vídeo estiver sem som e for coerente com o design.
2. Se controles nativos forem ocultos:
   - Crie um botão customizado de play/pause:
     - `role="button"`.
     - `tabIndex={0}`.
     - `aria-pressed={isPlaying}`.
     - `aria-label` dinâmico entre:
       - `"Reproduzir manifesto em vídeo"` / `"Pausar manifesto em vídeo"`.
   - Permita ativação por teclado (`Enter` / `Space`).
3. Forneça fallback de texto:
   - Pequena descrição ou resumo textual do manifesto.
   - Opcional: link para uma página com transcrição completa (se existir/planejada).
4. Combine com lazy load (Prompt 1.4) para só carregar o vídeo próximo da viewport.
5. Teste em mobile:
   - Verifique se o vídeo respeita 16:9.
   - Use `object-fit: cover` ou `contain` conforme o layout.
   - Garanta margens internas adequadas para não colar nas outras seções.

**Critérios de aceite**

- Usuário consegue controlar o vídeo somente com teclado.
- Leitores de tela anunciam o botão de play/pause corretamente.
- Em conexões mais lentas, o vídeo não bloqueia a renderização inicial do restante da página.


---

## BLOCO 4 — PORTFOLIO SHOWCASE

### Prompt 4.1 — Melhorar affordance das “stripes” como elementos clicáveis

**Sessão/Área:** Portfolio Showcase (stripes de categorias)

**Severidade:** Média

**Arquivos-alvo:**  
- `PortfolioShowcaseSection.tsx`
- Componente de stripe de categoria (se existir, ex.: `ShowcaseStripe.tsx`)

**Objetivo**  
Deixar claro que as “stripes” são clicáveis (filtros/navegação), reforçando interação via hover, foco e feedback visual.

**Instruções para o agente**

1. Garanta que cada stripe seja um `<button>` ou `<a>` cobrindo toda a área clicável:
   - Se filtra conteúdo: prefira `<button>`.
   - Se navega para outra rota/página: use `<Link>` + `<a>`.
2. Aplique classes de interação:
   - `cursor-pointer`.
   - `transition-transform`, `transition-shadow`, `duration-150` (ou similar).
   - Hover: leve `scale-105`, `shadow-md` e/ou mudança sutil de background.
3. Adicione estados de foco visíveis:
   - Ex.: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]`.
4. Garanta semântica de destino:
   - Se for filtro: atualize estado de filtro ao clicar e exiba visual de “ativo”.
   - Se for link: direcione para `/portfolio?category={id}` (ou rota equivalente).
5. Verifique textos longos em mobile (ex.: “Web Campaigns, Websites & Tech”) para evitar quebra ruim ou barra horizontal:
   - Use `flex-wrap` adequado ou ajuste `text-sm` e `leading-tight`.

**Critérios de aceite**

- Usuário tem percepção imediata de que as stripes são clicáveis.
- Navegação/filtro funciona bem tanto com mouse quanto teclado.
- Em mobile, o layout das stripes continua legível e sem overflow lateral.


---

### Prompt 4.2 — Alinhar microcopy “[what we love working on]” e contraste

**Sessão/Área:** Portfolio Showcase (microcopy de apoio)

**Severidade:** Baixa

**Arquivos-alvo:**  
- `PortfolioShowcaseSection.tsx`
- Estilos específicos desta microcopy

**Objetivo**  
Garantir que a microcopy “[what we love working on]” tenha alinhamento e contraste suficientes para ser lida e funcionar como elemento de apoio visual.

**Instruções para o agente**

1. Reposicione a microcopy em relação ao título da seção para seguir o mock (alinhamento à esquerda, abaixo ou acima do título, conforme referência).
2. Ajuste contraste de cor:
   - Se estiver muito claro sobre fundo claro, escureça levemente (ex.: `text-slate-600` ou equivalente).
3. Garanta tamanho e espaçamento:
   - Ex.: `text-sm` ou `text-xs` com `tracking-wide` e `uppercase` se o design pedir.
   - Margem vertical coerente (ex.: `mt-2`/`mb-4`).
4. Verifique legibilidade em mobile e desktop.

**Critérios de aceite**

- Microcopy é perceptível e legível, não desaparecendo visualmente.
- Mantém estética sutil, sem competir com o título principal da seção.


---

## BLOCO 5 — FEATURED PROJECTS

### Prompt 5.1 — Refinar hierarquia visual e espaçamento da seção Featured Projects

**Sessão/Área:** Featured Projects (projetos em destaque)

**Severidade:** Média

**Arquivos-alvo:**  
- `FeaturedProjectsSection.tsx`
- Componentes de card de projeto (ex.: `ProjectCard.tsx`)

**Objetivo**  
Reforçar visualmente a hierarquia da seção (título → grid de cards → CTA “view projects”), com espaçamentos coerentes e leitura clara.

**Instruções para o agente**

1. Garanta que o título da seção esteja marcado como `h2` (ver Prompt 9.1 sobre headings).
2. Ajuste espaçamento:
   - Espaço razoável entre título/subtítulo e grid (ex.: `mt-8`).
   - Espaço entre grid e CTA “view projects” (ex.: `mt-10`), para separar claramente os blocos.
3. Em cada card:
   - Verifique tamanho e peso da tipografia do título do projeto vs descrição.
   - Use `line-clamp` se necessário para evitar textos muito longos quebrando a grid.
4. Posicione o CTA “view projects” de forma consistente:
   - Preferencialmente alinhado à direita ou centro abaixo da grid, com bom respiro.
5. Combine com otimização de imagens (Prompt 1.5) para performance.

**Critérios de aceite**

- O olho do usuário lê naturalmente: título da seção → cards → CTA.
- Nenhum elemento parece “colado” ou perdido visualmente.
- Em mobile, cards continuam legíveis e ordenados.


---

## BLOCO 6 — CLIENTS / BRANDS

### Prompt 6.1 — Refinar espaçamento vertical e tamanho dos logos de clientes

**Sessão/Área:** Clients / Brands

**Severidade:** Baixa

**Arquivos-alvo:**  
- `ClientsSection.tsx`
- Componente de logo/brand stripe, se existir (ex.: `ClientLogo.tsx`)

**Objetivo**  
Aproximar ainda mais a seção do layout de referência, ajustando espaçamentos verticais e tamanhos de logo, especialmente em telas pequenas.

**Instruções para o agente**

1. Revise `py` da seção:
   - Ajuste para que o bloco azul (ou cor equivalente) não fique nem apertado nem exageradamente alto.
2. Padronize o tamanho dos logos:
   - Use wrappers com altura fixa e `object-fit: contain`/`max-h-*` para limitar crescimento.
3. Em mobile:
   - Garanta espaçamento suficiente entre linhas de logos (`gap-y-6` ou similar).
   - Evite logos encostados em bordas laterais (`px-4`/`px-6`).
4. Em desktop:
   - Verifique alinhamento e distribuição (grid ou flex) seguindo o mock.

**Critérios de aceite**

- Seção de clientes parece “âncora visual” sólida, sem desconforto de proporções.
- Logos são claramente reconhecíveis em mobile, sem ficarem minúsculos.


---

## BLOCO 7 — CONTACT

### Prompt 7.1 — Alinhar grid e ritmo vertical do formulário de contato

**Sessão/Área:** Contact

**Severidade:** Baixa

**Arquivos-alvo:**  
- `ContactSection.tsx`
- Eventuais componentes de input genéricos

**Objetivo**  
Deixar o formulário mais próximo do mock, com um grid mais rígido, colunas alinhadas e ritmo vertical consistente entre labels e campos.

**Instruções para o agente**

1. Estruture o formulário em grid:
   - Ex.: `md:grid md:grid-cols-2 md:gap-8` para campos lado a lado em desktop, uma coluna em mobile.
2. Alinhe labels e inputs:
   - Use `flex` ou `grid` internos para que labels fiquem alinhados verticalmente.
   - Aplique espaçamento uniforme entre label e input (`mb-1` ou `mb-2`).
3. Padronize altura dos campos:
   - Inputs de texto e textareas com `py-3`/`py-2.5`, mesma fonte.
4. Verifique consistência das mensagens de erro (se existirem):
   - Mesma cor, tamanho de fonte e espaçamento.
5. Em mobile:
   - Garanta que o formulário não encoste nas bordas laterais (`px-4`/`px-6`).

**Critérios de aceite**

- Formulário tem aparência profissional e organizada.
- Em desktop, colunas são alinhadas; em mobile, o conteúdo continua legível e coerente.


---

## BLOCO 8 — NAVEGAÇÃO (HEADER & FOOTER)

### Prompt 8.1 — Refinar estados de foco e acessibilidade na navegação

**Sessão/Área:** Header, Footer, botões e links em geral

**Severidade:** Média

**Arquivos-alvo:**  
- `SiteHeader.tsx` / `Header.tsx`
- `Footer.tsx`
- Componentes de botão/link reutilizáveis

**Objetivo**  
Garantir que todos os links e botões tenham foco visível e navegação por teclado consistente, especialmente sobre fundos azul/branco.

**Instruções para o agente**

1. Para todos os links e botões principais (nav, CTAs, stripes, cards):
   - Adicione classes de foco, por exemplo:
     - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-white`
   - Ajuste cores de `ring-offset` conforme o fundo (azul vs branco).
2. Verifique ordem de tabulação no header e footer:
   - Deve seguir a ordem visual dos itens.
   - Não incluir elementos “invisíveis” (a não ser que tenham função clara).
3. Nos cards/stripes clicáveis:
   - Se não forem `<button>/<a>`, garanta `tabIndex={0}` e handlers para teclado (`Enter`).
4. Teste com teclado:
   - Navegue do topo ao fim da página apenas com `Tab` e `Shift+Tab`, garantindo que o foco é sempre visível.

**Critérios de aceite**

- Qualquer usuário vê claramente onde está o foco ao navegar por teclado.
- Não há “traps” de foco ou elementos inacessíveis.


---

### Prompt 8.2 — Uniformizar comportamento/estilo de header e footer (links, microanimações)

**Sessão/Área:** Header & Footer

**Severidade:** Baixa

**Arquivos-alvo:**  
- `SiteHeader.tsx`
- `Footer.tsx`
- Eventual componente compartilhado de navegação (ex.: `MainNav.tsx`)

**Objetivo**  
Padronizar rotas, textos e microanimações de navegação entre header e footer, incluindo ano de copyright.

**Instruções para o agente**

1. Padronize textos e destinos dos links:
   - `home` → `#hero`
   - `portfólio showcase` → `#portfolio-showcase`
   - `sobre` → `/sobre` (ou rota equivalente real)
   - `contato` → `#contact`
2. Certifique-se de que header e footer reutilizam a mesma lógica/componente de navegação quando possível (ex.: `MainNav`).
3. Uniformize o texto de copyright:
   - Exemplo sugerido: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
4. Aplique microanimações consistentes em links:
   - Underline animado, mudança de cor suave em hover, etc.
   - Use o mesmo estilo visual em header e footer.

**Critérios de aceite**

- Header e footer comunicam a mesma estrutura de navegação.
- Microanimações são sutis e consistentes em todo o site.
- Nenhum link aponta para âncoras erradas ou rotas inconsistentes.


---

## BLOCO 9 — ACESSIBILIDADE & SEO

### Prompt 9.1 — Garantir hierarquia de headings (H1/H2/H3) correta

**Sessão/Área:** Toda a Home

**Severidade:** Média

**Arquivos-alvo:**  
- `Hero.tsx` / `page.tsx` (H1)
- Todas as seções subsequentes (`ManifestoSection.tsx`, `PortfolioShowcaseSection.tsx`, `FeaturedProjectsSection.tsx`, `ClientsSection.tsx`, `ContactSection.tsx`)

**Objetivo**  
Assegurar que exista apenas um `h1` (na Hero) e que cada seção use `h2` como título principal, com subtítulos usando `h3` ou `p`.

**Instruções para o agente**

1. Verifique a presença de `h1`:
   - Garanta que o título principal da Hero seja o único `h1` na página.
2. Em cada seção principal:
   - Título da seção como `h2` (Manifesto, Portfolio Showcase, Projetos em Destaque, Clientes, Contato).
3. Subtítulos e microcopies:
   - Use `h3`, `h4` ou `p` conforme necessário, sem pular níveis sem necessidade.
4. Ajuste CSS/Tailwind para manter a mesma aparência visual mesmo mudando os elementos semânticos, se preciso.

**Critérios de aceite**

- Ferramentas de acessibilidade (ex.: plugins de headings) mostram uma árvore de headings clara e linear.
- SEO bots conseguem compreender a estrutura de tópicos da página.


---

### Prompt 9.2 — Revisar `alt` em imagens, `aria-labels` e foco em elementos interativos

**Sessão/Área:** Global

**Severidade:** Média

**Arquivos-alvo:**  
- Todos os componentes que usam imagens, ícones e vídeos
- Botões/links com ícones sem texto

**Objetivo**  
Aumentar a acessibilidade geral com `alt` descritivos, `aria-labels` adequados para elementos icônicos e foco correto.

**Instruções para o agente**

1. Em todas as imagens:
   - Adicione `alt` descritivo (o que é a imagem e por que está ali).
   - Use `alt=""` apenas quando a imagem for puramente decorativa.
2. Em ícones de botões/links (ex.: ícone de play do vídeo, ícones de redes sociais):
   - Adicione `aria-label` descritivo no botão/link que envolve o ícone.
3. Em qualquer componente “custom” interativo:
   - Verifique que possui `role` adequado (`button`, `link`, etc.) se não for nativamente interativo.
   - Verifique `tabIndex` e handlers de teclado.
4. Teste com um leitor de tela (ou extensão) para validar a experiência.

**Critérios de aceite**

- Leitores de tela conseguem informar corretamente o propósito de imagens importantes e botões.
- Não há elementos “clicáveis” escondidos sem descrição.


---

### Prompt 9.3 — Configurar `metadata` e Open Graph (OG tags) para a Home

**Sessão/Área:** SEO global (App Router)

**Severidade:** Baixa

**Arquivos-alvo:**  
- `app/layout.tsx` ou `app/page.tsx` (`export const metadata = { ... }`)

**Objetivo**  
Aprimorar SEO e aparência da página em compartilhamentos (redes sociais, etc.) com título, descrição e imagem OG coerentes.

**Instruções para o agente**

1. Localize o arquivo de layout ou página raiz onde `metadata` é exportado.
2. Defina um objeto de metadata similar a:

   ```ts
   export const metadata = {
     title: 'Danilo Novais — Portfólio de Design, Estratégia e Experiência',
     description:
       'Portfólio institucional de Danilo Novais, focado em design estratégico, campanhas, vídeos & motions e experiências digitais.',
     openGraph: {
       title: 'Danilo Novais — Portfólio',
       description: 'Design não é só estética. É intenção, estratégia e experiência.',
       url: 'https://portfoliodanilo.com', // ajuste para a URL real
       images: ['/og-image.jpg'],          // ajuste para o caminho real da imagem
     },
     twitter: {
       card: 'summary_large_image',
       title: 'Danilo Novais — Portfólio',
       description: 'Design, não é só estética.',
       images: ['/og-image.jpg'],
     },
   }
