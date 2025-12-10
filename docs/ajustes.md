analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 


## 1. Globais — Acessibilidade, SEO e Estrutura

### [Alta] Ajustar Hierarquia de Headings e Semântica da Home

- **Localização:** Layout principal da Home (`app/page.tsx` ou equivalente) e componentes de seção (`Header`, `Hero`, `Manifesto`, `PortfolioShowcase`, `FeaturedProjects`, `Clients`, `Contact`, `Footer`).
- **Descrição Técnica:**  
  Há risco de múltiplos `h1` ou headings fora de ordem, o que prejudica acessibilidade e SEO.
- **Solução Proposta (passos):**
  1. Garantir que apenas a Hero use `<h1>` com o texto `Design, não é só estética.`.
  2. Em cada seção da Home, usar `<h2>` para o título principal:
     - `portfólio showcase`
     - `Projetos em Destaque`
     - `marcas com as quais já trabalhei`
     - `contato`
  3. Subtítulos/labels internos (como microtexto, categorias de stripes, etc.) devem ser `<h3>` ou `<p>`, conforme o caso.
  4. Envolver o conteúdo principal da página em `<main>` e manter Header/Footer fora do `<main>`.
- **Impacto Esperado:**  
  Melhora significativa em acessibilidade (leitores de tela navegam corretamente) e SEO (crawlers entendem melhor a hierarquia de conteúdo).

---

### [Alta] Implementar `prefers-reduced-motion` Globalmente

- **Localização:**  
  - Configuração global de estilos (`globals.css`/`tailwind.css`).  
  - Componentes que usam `framer-motion` e R3F (Hero, vídeo manifesto, cards, logos).
- **Descrição Técnica:**  
  Hoje, animações 3D e de scroll podem desrespeitar a preferência do usuário por menos movimento, especialmente no Hero (esfera de vidro) e nos reveals.
- **Solução Proposta:**
  1. Criar um hook utilitário, por exemplo `useReducedMotionPreference`, que use `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  2. Em componentes `motion.*`, condicionar props `initial`/`animate`/`whileInView`:
     - Se `reduce` estiver ativo, usar apenas `opacity` + pequena `translateY`.
  3. No componente R3F da esfera de vidro, quando `reduce` estiver ativo:
     - Desativar rotação contínua.
     - Desabilitar parallax (não ler mouse/scroll).
  4. Em CSS/Tailwind, declarar:
     ```css
     @media (prefers-reduced-motion: reduce) {
       html, body {
         scroll-behavior: auto;
       }
     }
     ```
- **Impacto Esperado:**  
  Conformidade com boas práticas de acessibilidade, experiência melhor para usuários sensíveis a movimento e redução de carga de GPU/CPU nesses casos.

---

### [Alta] Melhorar SEO (Title, Description, OG/Twitter) da Home

- **Localização:** `app/layout.tsx` ou `app/head.tsx` (App Router), configuração de metadata da rota da Home.
- **Descrição Técnica:**  
  Metadados básicos reduzem o potencial de descoberta e de compartilhamento social.
- **Solução Proposta (passos):**
  1. Definir `metadata` da página principal com:
     - `title`: `"Portfólio — Danilo Novais | Design, não é só estética."`
     - `description`: frase clara sobre design estratégico, UX, motion, WebGL.
  2. Configurar `openGraph`:
     - `title`, `description`, `url: 'https://portfoliodanilo.com'`, `images` com uma imagem de destaque do portfolio.
  3. Configurar `twitter`:
     - `card: 'summary_large_image'`, `creator: '@danilo_novais'`.
- **Impacto Esperado:**  
  Melhora de CTR em resultados de busca e prévias mais profissionais em redes sociais.

---

### [Média] Revisar `alt` de Imagens e Logos

- **Localização:**  
  - Componente de imagem dos projetos (`FeaturedProjects`).  
  - Componente de logos dos clientes (`Clients`).  
  - Thumb do vídeo manifesto na Hero e na seção Manifesto.
- **Descrição Técnica:**  
  `alt` genérico ou ausente prejudica acessibilidade; cada imagem deve descrever sua função.
- **Solução Proposta (passos):**
  1. Para cada card de projeto, definir `alt` com o título do projeto + categoria + cliente (ex.: `"Magic — devolvendo a magia ao rádio, projeto de branding & campanha para Magic"`).
  2. Para cada logo de cliente, usar `alt="Logo da [Nome da Marca]"`.
  3. Para a thumb do manifesto, usar `alt="Thumb do vídeo manifesto do portfólio de Danilo Novais"`.
- **Impacto Esperado:**  
  Aumenta a acessibilidade e clareza em leitores de tela, sem alterar copy visual.

---


analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 

## 2. Hero — Layout, 3D (R3F) e Animações

### [Alta] Otimizar Renderização da Esfera de Vidro (MeshTransmissionMaterial)

- **Localização:** Componente 3D da Hero (ex.: `components/HeroGlassScene.tsx` / `components/ModelCanvas.tsx`).
- **Descrição Técnica:**  
  A esfera de vidro usa material de transmissão custoso; sem tiering, isso sobrecarrega dispositivos mobile.
- **Solução Proposta:**
  1. Ajustar `<Canvas>`:
     - `dpr={[1, 1.5]}` para limitar pixel ratio.
     - `eventSource={document.body}` quando houver scroll suave (Lenis ou similar).
  2. Introduzir um hook `useMobile` (user-agent, largura de viewport ou heurística simples).
  3. Dobrar a configuração de material:
     - Desktop:
       - `samples={12-16}`, `resolution={1024}`, `transmission={1}`, `roughness={0.0-0.1}`.
     - Mobile:
       - `samples={4-6}`, `resolution={512}`, `chromaticAberration` e `distortion` ligeiramente reduzidos.
  4. Em um estado ainda mais reduzido (FPS < ~30), trocar `MeshTransmissionMaterial` por `MeshPhysicalMaterial` translúcido (vidro fosco) sem refração dinâmica.
- **Impacto Esperado:**  
  Aumento significativo de FPS em mobile e laptops fracos, mantendo o visual de vidro líquido como destaque de marca.

---

### [Média] Implementar Parallax Suave e Controle de Scroll na Esfera

- **Localização:** Mesmo componente 3D da Hero.
- **Descrição Técnica:**  
  A experiência esperada é de interação leve com mouse/scroll (rotações e distorções). Isso precisa ser feito com `useFrame` e `state.mouse` para evitar listeners manuais.
- **Solução Proposta (conceito):**
  1. Usar `useFrame((state, delta) => { ... })` para:
     - Ler `state.mouse.x`/`state.mouse.y` no range -1..1.
     - Aplicar damped rotation ao mesh principal (ex.: `rotation.y` e `rotation.x`).
  2. Se houver `useScroll`, mapear `scroll.offset` (0..1) para uma rotação extra ou leve ajuste de `distortion`.
  3. Encapsular isso em condicional: se `prefers-reduced-motion`, não aplicar transformações contínuas.
- **Impacto Esperado:**  
  Hero mais viva e responsiva ao usuário, reforçando o posicionamento de alta fidelidade 3D.

---

### [Média] Ajustar Animação de Entrada do Título da Hero

- **Localização:** Componente `Hero` (texto principal).
- **Descrição Técnica:**  
  O título deve entrar com efeito 3D leve (`rotateX`) e `stagger` entre linhas, mas respeitando fallback simples quando motion reduzido.
- **Solução Proposta:**
  1. Usar `motion.div` com `variants`:
     - Container com `staggerChildren`.
     - Cada linha/palavra com `initial={{ opacity: 0, y: 24, rotateX: -15 }}` → `animate={{ opacity: 1, y: 0, rotateX: 0 }}`.
  2. Quando `prefers-reduced-motion`, reduzir para:
     - `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`, sem `rotateX`.
- **Impacto Esperado:**  
  Entrada mais impactante alinhada à referência visual, sem comprometer acessibilidade.

---

### [Média] Implementar Seção Hero com Bloco Interno Sticky e Altura ~200vh

- **Localização:** Estrutura da seção Hero na Home.
- **Descrição Técnica:**  
  A especificação prevê uma hero com altura estendida, onde o conteúdo interno fica `sticky` enquanto o usuário rola, liberando espaço para a transição da thumb do vídeo manifesto.
- **Solução Proposta:**
  1. Envolver o conteúdo da Hero em um wrapper com `min-h-[200vh]` (ou cálculo equivalente).
  2. Dentro, criar um container `sticky top-0 min-h-screen` que mantém o grid texto + 3D + thumb fixo ao rolar.
  3. Conectar `useScroll` (Framer Motion) a este container para animar:
     - Opacidade do texto (esmaecendo na segunda metade do scroll).
     - Posição/escala da thumb (preparando transição para o Manifesto).
- **Impacto Esperado:**  
  Experiência imersiva e fluida, aproximando o comportamento à proposta original sem alterar copy.

---


analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 

## 3. Thumb do Vídeo Manifesto (Hero) e Seção Manifesto

### [Média] Animar Thumb do Manifesto com `scrollYProgress`

- **Localização:** Componente da Hero que contém a thumb do vídeo manifesto.
- **Descrição Técnica:**  
  Hoje a thumb é estática; a especificação pede que ela cresça e se mova com o scroll em direção à seção Manifesto.
- **Solução Proposta:**
  1. Usar `useScroll` e `useTransform` sobre o container sticky da Hero.
  2. Mapear `scrollYProgress` (0 → 1) para:
     - `scale` da thumb (ex.: 0.9 → 1.2).
     - `y` da thumb (ex.: 0 → `-150px`).
     - Opcionalmente, `borderRadius` (ex.: 24px → 0) simulando expansão para vídeo completo.
  3. Em `prefers-reduced-motion`, fixar a thumb sem essas transformações; manter apenas um fade-in.
- **Impacto Esperado:**  
  Criação de um elo visual forte entre Hero e Manifesto, reforçando a narrativa de “mergulho” no manifesto.

---

### [Média] Enriquecer a Seção Manifesto com Overlay e Badge de Play Acessível

- **Localização:** Seção `Manifesto (Vídeo)`.
- **Descrição Técnica:**  
  O vídeo aparece, mas falta overlay de contexto e botão de play/pause acessível.
- **Solução Proposta:**
  1. Criar overlay com gradiente inferior (ex.: `from-black/60 to-transparent`) dentro do wrapper do vídeo.
  2. Adicionar microtexto (ex.: “Manifesto em vídeo — visão e processo”) sem alterar copy original da página.
  3. Criar botão de play/pause:
     - Ícone (triângulo/círculo) com label `aria-label="Reproduzir manifesto em vídeo"` / `aria-label="Pausar manifesto em vídeo"`.
     - Controlar o elemento `<video>` via ref (play/pause).
  4. Garantir que autoplay inicie com som desligado; o usuário deve habilitar áudio manualmente.
- **Impacto Esperado:**  
  Melhor compreensão da função da seção, controles claros e maior alinhamento à especificação.

---
analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 

## 4. Portfolio Showcase

### [Média] Alinhar Tipografia, Stripes e CTAs ao Layout de Referência

- **Localização:** Componente `PortfolioShowcase`.
- **Descrição Técnica:**  
  A estrutura de 3 stripes e CTAs está presente, mas detalhes de tipografia, espaçamentos e microinterações podem divergir do mockup.
- **Solução Proposta:**
  1. Garantir que:
     - Título `portfólio showcase` seja `<h2>` com `text-2xl md:text-3xl`, `font-bold`, cor azul.
     - Microtexto `[what we love working on]` fique na lateral ou logo abaixo dependendo do breakpoint.
  2. Stripes:
     - Cada stripe é um bloco horizontal com tipografia grande (`text-xl md:text-2xl`), `font-bold`.
     - Em desktop, usar `hover` com:
       - Fundo levemente cinza (`bg-[#F4F5F7]` ou `bg-white/40`).
       - Sombra suave (`shadow-md shadow-blue-500/10`).
  3. CTAs:
     - `VEJA MAIS →` aponta para `/portfolio`.
     - `let’s build something great →` aponta para `/#contact`.
     - Ambos com estilo alinhado ao CTA da hero (mesma paleta, radius, animação hover).
- **Impacto Esperado:**  
  Seção mais editorial, coerente e claramente clicável, reforçando o entendimento das categorias de atuação.

---
analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 
## 5. Featured Projects

### [Média] Padronizar Grid Responsivo e Interações dos Cards

- **Localização:** Componente `FeaturedProjects`.
- **Descrição Técnica:**  
  Os cards atuais exibem conteúdo correto, mas precisam de ajustes finos de grid e hover para bater com a especificação.
- **Solução Proposta:**
  1. Grid:
     - Mobile: 1 coluna.
     - Tablet: 2 colunas.
     - Desktop grande: 3 colunas, com `gap-6`/`gap-8`.
  2. Cards:
     - Usar `motion.div` com animação de entrada:
       - Container: `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`.
       - Stagger via `AnimatePresence`/`variants`.
     - Hover:
       - Imagem aumenta levemente (`scale: 1.03`, `y: -4`).
       - Sombra azulada suave.
  3. CTA “view projects”:
     - Botão grande alinhado ao layout, com ícone de seta e leve animação no eixo X em loop lento (ex.: `x: [0, 4, 0]`).
- **Impacto Esperado:**  
  Maior sensação de polimento, foco em projetos principais e incentivo para navegar ao portfólio completo.

---
analise todo o detalhamento, monte um plano de execução, execute os ajustes e após executar, confira se todas os ajustes foram feitos da maneira correta e estão funcionando. 
## 6. Clients / Brands

### [Média] Garantir Grid de Logos Acessível e Animado com Suavidade

- **Localização:** Componente `Clients`.
- **Descrição Técnica:**  
  A faixa azul está correta, mas é preciso garantir animações leves e acessíveis.
- **Solução Proposta:**
  1. Logos em grid fluido:
     - Mobile: 2–3 colunas.
     - Desktop: 4–6 colunas com `gap-4`.
  2. Animação de entrada:
     - Título: `initial={{ opacity: 0, y: 16 }}` → `whileInView={{ opacity: 1, y: 0 }}`.
     - Logos: `staggerChildren` curto (0.03–0.05).
  3. Hover:
     - `whileHover={{ scale: 1.04 }}` + leve `brightness(1.1)`.
  4. Garantir `alt` conforme item global de acessibilidade.
- **Impacto Esperado:**  
  Seção de credibilidade mais dinâmica e responsiva, sem sacrificar performance ou acessibilidade.

---

## 7. Contact

### [Alta] Melhorar Acessibilidade do Formulário de Contato

- **Localização:** Componente `Contact`.
- **Descrição Técnica:**  
  Inputs podem não ter `label` devidamente associado, o que prejudica leitores de tela e navegação por teclado.
- **Solução Proposta:**
  1. Para cada `<input>`/`<textarea>`, garantir:
     - `id` único.
     - `<label htmlFor="...">` com texto descritivo (sem alterar o texto exibido se já existir).
  2. Adicionar `aria-required="true"` em campos obrigatórios se for o caso.
  3. Garantir foco visível:
     - Tailwind: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`.
- **Impacto Esperado:**  
  Formulário utilizável por teclado e leitores de tela, alinhado a boas práticas de acessibilidade.

---

### [Média] Ajustar Layout Responsivo do Contact

- **Localização:** Mesmo componente `Contact`.
- **Descrição Técnica:**  
  Em breakpoints menores, informações e formulário podem ficar muito próximos horizontalmente.
- **Solução Proposta:**
  1. Grid responsivo:
     - Mobile: stack vertical (`flex-col` ou `grid-cols-1`).
     - Desktop: grid 2 colunas (`md:grid-cols-2`) com `gap-8` ou maior.
  2. Garantir `py-12` ou `py-16` consistentes com outras seções.
  3. Manter título `contato` como `<h2>` e subtítulo como `<p>` com espaçamento inferior adequado (`mb-4`/`mb-6`).
- **Impacto Esperado:**  
  Melhor legibilidade, sensação de respiro e Harmonia com demais seções.

---

## 8. Footer

### [Média] Unificar Copyright e Links

- **Localização:** Componente `Footer`.
- **Descrição Técnica:**  
  A especificação sugere unificar para `© 2025 Danilo Novais Vilela — todos os direitos reservados.` e padronizar destinos dos links.
- **Solução Proposta:**
  1. Fixar o texto de copyright exatamente conforme especificado.
  2. Links:
     - `home` → `#hero`.
     - `portfólio showcase` → `#portfolio-showcase`.
     - `Sobre` → `/sobre` (preferível ao `#clients`).
     - `contato` → `#contact`.
  3. Garantir que links tenham o mesmo sublinhado animado do header e ícones sociais com hover consistente.
- **Impacto Esperado:**  
  Rodapé mais coerente, funcional e alinhado à navegação global.

---

## 9. Performance de Imagens, Vídeo e Fonte

### [Média] Otimizar Imagens com Next/Image e Lazy Loading

- **Localização:** Componentes de cards de projeto, logos e qualquer imagem estática.
- **Descrição Técnica:**  
  Uso de `<img>` sem otimização pode prejudicar LCP, principalmente em seções com muitas imagens (Featured Projects, Clients).
- **Solução Proposta:**
  1. Substituir `<img>` por `<Image>` do Next.
  2. Declarar `sizes` apropriados por breakpoint.
  3. Habilitar `loading="lazy"` para imagens abaixo da dobra.
  4. Manter URLs Supabase, apenas aproveitando o loader automático do Next.
- **Impacto Esperado:**  
  Melhora de LCP e uso de banda, especialmente em mobile.

---

### [Média] Otimizar Carregamento do Vídeo Manifesto

- **Localização:** Componentes da thumb na Hero e da seção Manifesto.
- **Descrição Técnica:**  
  Carregar o vídeo imediatamente pode pesar para conexões lentas.
- **Solução Proposta:**
  1. Usar atributo `preload="metadata"` ou similar.
  2. Exibir `poster` estático leve.
  3. Iniciar autoplay somente quando o vídeo estiver visível (`IntersectionObserver` ou `whileInView`).
- **Impacto Esperado:**  
  Redução do tempo de carga inicial e melhor desempenho geral sem sacrificar a narrativa em vídeo.

---

## 10. Conclusão

Executando os ajustes na ordem sugerida (acessibilidade + SEO + performance crítica, depois hero/manifesto e demais seções), a Home ficará:

- Mais alinhada ao layout de referência `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`.
- Mais fluida, imersiva e responsiva (especialmente na Hero em 3D e no vídeo manifesto).
- Mais robusta em acessibilidade, SEO e performance, sem mudança de conteúdo textual.
