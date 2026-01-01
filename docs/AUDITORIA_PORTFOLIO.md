 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

1️⃣ Visão Geral
Com o material disponível (documentação v2.0 da HOME, instruções da página /sobre, componentes identificados no repositório e o screenshot completo da HOME que você enviou), dá para traçar um quadro razoavelmente claro:

HOME:

Estrutura macro (ordem das seções, existência de stripes do portfólio, grid bento de projetos, faixa de marcas, contato, footer) está bem próxima da v2.0.

O header desktop ainda se comporta visualmente como uma barra cheia em vez de um “pill” de vidro fluido centralizado.

Não é possível validar por aqui os comportamentos mais finos de scroll + vídeo manifesto (thumbnail → fullscreen, hold de 2s, lógica de áudio) e de ROME/Ghost Atmosphere (bloom, DPI, prefers-reduced-motion, fallback).

Responsividade parece correta em estrutura, mas a auditoria de breakpoints, touch targets e overflows depende de inspeção real em dispositivos.

ABOUT (/sobre):

Pelo repositório existem componentes dedicados (AboutHero, AboutMethod, AboutWhatIDo, AboutOrigin, AboutBeliefs, AboutClosing) e utilitário de motion (src/components/sobre/motion.ts) que batem com a arquitetura desejada.

Sem visual da página nem acesso direto ao HTML renderizado, não dá para afirmar se layout/tipografia/motion estão 100% fiéis ao protótipo Ghost; o seguro é tratá-los como “a conferir/ajustar” em vez de assumir que já estão corretos.

Dado isso, a resposta abaixo foca em:

Traduzir as exigências da doc v2.0 + specs Ghost em critérios objetivos de QA.

Apontar os desvios visíveis (principalmente no header).

Transformar cada grupo de requisitos em prompts atômicos para o agente, mesmo quando o estado atual não é verificável daqui (nesses casos, o prompt funciona como checklist de implementação/validação).

2️⃣ Diagnóstico por Dimensão
HOME
Estrutura

Ordem das seções na HOME observada no screenshot (Hero → Showcase → Featured → Marcas → Contato → Footer) está alinhada com a IA definida.

Arquitetura de componentes no repo (HomeHero, HeroHeader, HeroCopy, GhostCanvas, PortfolioShowcaseSection, AccordionRow, ContactSection, ContactForm, CTAButton) sugere boa separação de responsabilidades.

UI/UX

Hierarquia geral faz sentido e segue narrativa: hero forte, showcase → projetos → prova social → contato.

Principal desvio visual claro: header desktop ainda parece uma faixa cheia; deveria ser um container central em forma de pill com efeito glass, não competindo com o hero.

CTA principal (“step inside” / “let’s build something great → / view projects → / Enviar Mensagem”) já existe, mas precisa ser totalmente padronizado pelo componente CTAButton com tokens corretos.

Fidelidade visual

Hero textual + composição Ghost + thumbnail de vídeo estão muito próximos da referência visual que você enviou.

Sem acesso ao canvas e ao scroll em runtime, não é possível validar:

posicionamento exato do Ghost vs screenshot de referência;

intensidade de bloom, glow, contraste;

analog decay / grain / scanlines;

curva de movimento vs mouse.

Portfolio Showcase, Featured Projects, Clients e Contato parecem estruturalmente fiéis às imagens do layout, mas isso precisa ser travado em grid e spacing (mesmos gutters/margens em todas as seções).

Responsividade

Screenshot é só desktop; não dá para avaliar com precisão:

menu mobile “staggered fullscreen”;

manifesto como seção fullscreen separada no mobile;

empilhamento de cards / grids;

footer não fixo no mobile.

Considerar responsividade ainda em estado “não auditado” e tratá-la como prioridade de QA.

Motion

Sabemos que há Framer Motion e hooks de scroll (useScrollNarrative.ts), mas sem ver o runtime não dá para checar:

se o hero não tem fade/translate (ele deve ser 100% estático);

se o manifesto vídeo faz a transição scroll-based para fullscreen com hold de 2s;

se as stripes do portfólio têm stagger + mudança de cor conforme spec;

se prefers-reduced-motion está sendo honrado globalmente.

ROME/WebGL (Ghost Atmosphere)

Existem GhostCanvas.tsx e canvas para header (FluidGlass.tsx, GlassBar.tsx), apropriados para implementar Ghost Atmosphere e header fluido.

Faltam garantias (e prompts) para:

DPR máximo 2;

antialias off;

follow-mouse apenas desktop;

fallback quando WebGL falha;

desligar animações em prefers-reduced-motion.

Performance

Arquitetura (App Router + componentes de seção + canvas isolados) é adequada para otimização, mas:

LCP/CLS dependem de preload das fontes + placeholders para vídeo e canvas;

Manifesto vídeo com lógica de fullscreen hold + áudio precisa ser extremamente leve;

Canvas deve ser carregado via dynamic import e suspenso fora do LCP.

Acessibilidade

Estrutura semântica é favorável (header/nav/main/section/footer estão presentes no projeto).

Itens críticos a validar/ajustar:

menu mobile com focus trap, aria-expanded, ESC;

botões de som dos vídeos com aria-pressed/aria-label;

todos CTAs com foco visível e texto descritivo;

contraste azul/white vs fundos escuros e claros.

ABOUT (/sobre)
Estrutura

Componentização (AboutHero, AboutWhatIDo, AboutOrigin, AboutBeliefs, AboutMethod, AboutClosing) está alinhada com as 6 seções Ghost descritas.

Página /sobre/page.tsx deve simplesmente orquestrar essas seções na ordem correta, sem lógica extra de layout.

UI/UX + Fidelidade Ghost

Sem imagens de referência do estado atual, não dá para cravar desvios, mas o alvo é:

tipografia protagonista (sem caixas, sem cards pesados);

vídeos com overlay tipográfico minimalista;

edges/margens laterais perfeitamente alinhados à HOME;

animações apenas em opacity/blur/translate.

Responsividade

Mesmos problemas de visibilidade: precisamos garantir mobile-first, com:

hero vídeo mobile usando HeroSobreMobile.mp4;

colunas tipográficas empilhadas;

toque confortável em todos os hovers interativos.

Motion

Arquivo src/components/sobre/motion.ts sugere centralização de variantes Framer Motion:

precisa ser revisado para: easing correto, durações, prefers-reduced-motion, sem escala/rotação.

Acessibilidade

Requisitos similares à HOME, com atenção adicional a:

navegação por parágrafos longos (headings corretos H2/H3);

foco nos controles de vídeo e nos termos .ghost-accent.

3️⃣ Diagnóstico por Seção
Abaixo sigo o template sugerido. Onde não é possível validar apenas por screenshot e docs, marco explicitamente como “Não avaliado (depende de inspeção em browser)”.

🎯 Página: HOME
🎯 Seção: Header (Desktop + Mobile)
📌 Fidelidade visual (referência): ✗ — Doc: seção 4.1 Header + imagens HEADER / HERO-PORTFOLIO-GHOST

📐 Grid e margens laterais: ✗ (header ocupa 100% da largura, não respeita container central)

↔️ Alinhamento duas laterais: ✗ (header não alinha com colunas internas usadas nas seções)

🔤 Tipografia (hierarquia/legibilidade): ✓ (nav com texto pequeno e discreto; apenas precisa ajuste fino de pesos/spacing se ainda não bater com doc)

🎥 Vídeos: N/A

🌀 ROME/WebGL (Glass header): Não avaliado (não consigo testar efeito fluido / distorção / tracking do mouse)

📱 Mobile (sm/md): Não avaliado (não tenho captura do menu mobile staggered)

🎞️ Motion/Animações: Não avaliado (estado do spring/sigmoid do header não visível no screenshot)

🧩 Componentes envolvidos: src/components/layout/Header.tsx, src/components/layout/header/SiteHeader.tsx, src/components/canvas/header/FluidGlass.tsx, src/components/canvas/header/GlassBar.tsx, src/config/navigation.tsx

🔗 Integrações: layout.tsx → Header + FluidGlass/GlassBar (via dynamic import) + rota / e /sobre

❌ Problemas (objetivos, mensuráveis)
Header não é um pill centralizado

Hoje aparenta ser uma barra contínua full-width no topo.

Doc exige: largura parcial, centralizada dentro do container, bordas arredondadas, efeito glass.

Provável ausência (ou subimplementação) do efeito “fluid glass” com follow do cursor

Não é possível confirmar sem runtime, mas é um ponto crítico da spec.

Menu mobile não auditado

Precisa ser overlay fullscreen com animação stagger e acessibilidade completa.

🔧 Correção Técnica (ação exata)
Ajustar Header.tsx / SiteHeader.tsx para:

Renderizar o header dentro de um wrapper com max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)].

Usar um container com rounded-full backdrop-blur e gradiente conforme tokens de cor.

Ligar/ajustar o canvas de header (FluidGlass / GlassBar) apenas em desktop via dynamic(() => import(...), { ssr: false }).

Implementar menu mobile:

position: fixed; inset: 0; overlay;

animações Framer Motion com stagger nos itens;

focus trap, ESC para fechar, aria-expanded.

✅ Resultado esperado (comparável)
Em desktop, header aparece como pílula translúcida flutuando sobre o hero, não roubando atenção.

Em mobile, barra simples + hambúrguer → overlay fullscreen, ritmo de entrada inspirado em Phantom (mas com identidade própria).

🎯 Página: HOME
🎯 Seção: Hero + Ghost Atmosphere + CTA
📌 Fidelidade visual (referência): Parcial (texto + composição): ✓ — Ghost/Hero imagens que você enviou; ROME/motion: Não avaliado

📐 Grid e margens laterais: ✓ (hero aparenta centralizado, com bons respiros)

↔️ Alinhamento duas laterais: Parcial (texto parece alinhado, mas header acima não segue a mesma borda)

🔤 Tipografia (hierarquia/legibilidade): ✓ (H1/H2 muito próximos ao esperado; checar pesos/size exatos vs tokens)

🎥 Vídeos: ✗ (comportamento manifesto full-screen/hold/áudio não validado)

🌀 ROME/WebGL: Não avaliado (sem acesso a canvas)

📱 Mobile (sm/md): Não avaliado (não tenho captura mobile)

🎞️ Motion/Animações: Não avaliado (preloader + entry hero + ghost follow)

🧩 Componentes envolvidos: HomeHero.tsx, HeroHeader.tsx, HeroCopy.tsx, GhostCanvas.tsx, CTAButton.tsx, possivelmente hooks de motion; manifesto vídeo provavelmente em um componente separado ou dentro de HomeHero

🔗 Integrações: page.tsx → HomeHero → GhostCanvas + CTAButton, manifesto vídeo + rota /sobre

❌ Problemas / Lacunas
Preloader Ghost não garantido

Doc exige preloader com ghost SVG, texto “SUMMONING SPIRITS” e barra de progresso animada ~2s antes de revelar hero.

Ghost Atmosphere (ROME) precisa ser validado contra spec

Lerps de posição, intensidade emissiva, partículas, bloom, analog decay, DPR, prefers-reduced-motion e fallback estático.

Lógica completa do vídeo manifesto (thumbnail → fullscreen, hold 2s, áudio) provavelmente ainda não está 100% implementada como descrito na v2.0 (é um comportamento bem específico e sofisticado).

CTA principal deve ser implementado via CTAButton padrão

A aparência no screenshot bate, mas precisamos garantir uso do componente único com tokens corretos e whileHover/whileTap padronizados.

🔧 Correção Técnica (ação exata)
Centralizar toda a lógica do hero em HomeHero.tsx:

Hero editorial 100% estático (sem scroll fade).

GhostCanvas em camada inferior (z-20), texto z-10 e manifesto thumbnail z-30.

Criar componente ManifestoVideoThumbnail com:

Framer Motion + useScroll (scrollYProgress) para escalar/centralizar o vídeo.

State machine (thumbnail | transition | fullscreenHold | released) controlando áudio e scroll lock de 2s.

Atualizar GhostCanvas:

dpr={[1, 2]}, gl={{ antialias: false }}, fallback se !supportsWebGL ou prefers-reduced-motion.

UseFrame com follow mouse apenas em desktop.

✅ Resultado esperado
Ao carregar, usuário vê preloader Ghost → hero com ghost atmosférico brilhante e CTA “step inside →” estável.

Em desktop, ao rolar, vídeo manifesto se expande suavemente ocupando a viewport, trava scroll por 2s enquanto ativa áudio, depois libera.

Em mobile, vídeo manifesto aparece como seção fullscreen separada abaixo do hero.

🎯 Página: HOME
🎯 Seção: Manifesto (Mobile)
📌 Fidelidade visual (referência): Não avaliado (sem screenshot mobile)

📐 Grid e margens laterais: Não avaliado

↔️ Alinhamento duas laterais: Não avaliado

🔤 Tipografia: N/A (quase só vídeo)

🎥 Vídeos: ✗ (precisa usar HeroSobreMobile.mp4 equivalente de manifesto ou mesmo asset com layout mobile)

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): ✗ (não validado, mas spec exige seção própria logo abaixo do hero)

🎞️ Motion/Animações: ✗ (reveal suave + controle de som com tap)

🧩 Componentes envolvidos: componente de Manifesto mobile (a definir) ou condicional dentro do mesmo componente do manifesto desktop

🔗 Integrações: rota /, breakpoints md para condicional de layout

❌ Problema
Manifesto em mobile deve ser uma seção fullscreen própria logo após o hero, não um thumbnail flutuante — e isso precisa ser implementado/validado.

🔧 Correção Técnica
No componente do manifesto:

Renderizar versão thumbnail + scroll-driven apenas em md+.

Renderizar seção section id="manifesto-mobile" com vídeo fullscreen (aspect-video, w-full) e controle de som/toggle em sm/md.

Garantir que ao sair da seção o vídeo volte a ficar mudo.

✅ Resultado esperado
Em mobile, usuário rola do hero diretamente para uma seção de vídeo manifesto fullscreen, com comportamento de som 100% sob controle explícito do usuário.

🎯 Página: HOME
🎯 Seção: Portfolio Showcase
📌 Fidelidade visual (referência): ✓ — Doc 4.3 + screenshot HOME

📐 Grid e margens laterais: Parcial (estrutura parece correta; é preciso travar espaçamentos exatos e alinhamento da label flutuante)

↔️ Alinhamento duas laterais: Parcial (tende a alinhar com hero, mas precisa ser medido)

🔤 Tipografia: ✓ (títulos e label condizem com spec)

🎥 Vídeos: N/A

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): Não avaliado (cartões empilhados, thumbnails estáticos)

🎞️ Motion/Animações: ✗ (hover reveal de thumbnail, gap change, arrow rotate, scroll stagger precisam ser garantidos)

🧩 Componentes envolvidos: PortfolioShowcaseSection.tsx, AccordionRow.tsx, CTAButton.tsx, src/lib/constants.tsx (slugs/assets)

🔗 Integrações: clique nas stripes → /portfolio?category=slug, CTA → /#contact

❌ Problemas
Hover stripes completo precisa ser implementado

Thumbnail expandindo de 0 → 288px com opacity;

gap ajustando gap-7 → gap-10;

ícone girando de -45deg → 0deg.

Scroll reveal com stagger e mudança de cor do título

Entradas simultâneas e classes de cor text-[#0057FF] no highlight.

Mobile sem thumbnails dinâmicos

Em mobile, as thumbnails devem ser ou escondidas ou exibidas estáticas, sem depender de hover.

🔧 Correção Técnica
Em AccordionRow.tsx:

Usar Framer Motion com variants para container e children.

No hover (desktop), animar width do wrapper da imagem (usando motion.div e overflow-hidden), rotation do arrow (rotate), e gap via classe condicionada.

Em PortfolioShowcaseSection.tsx:

Implementar label flutuante com absolute e alinhamento exato à primeira stripe;

Scroll reveal com whileInView + viewport={{ amount: 0.3, once: true }}.

✅ Resultado esperado
Em desktop, cada stripe revela preview da categoria e reforça “accordion” visual; em mobile, cards empilhados mantêm mesma ordem e textos, sem efeitos dependentes de hover.

🎯 Página: HOME
🎯 Seção: Featured Projects (Bento Grid)
📌 Fidelidade visual (referência): ✓ — Doc 4.4

📐 Grid e margens laterais: Parcial (estrutura bento parece correta; é preciso travar colspans exatos)

↔️ Alinhamento duas laterais: ✓ (cards alinham com container geral)

🔤 Tipografia: ✓ (títulos, meta com client • year)

🎥 Vídeos: N/A

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): Não avaliado (cards devem estar empilhados)

🎞️ Motion/Animações: ✗ (hover nos cards + CTA card precisam seguir espec)

🧩 Componentes envolvidos: (provavelmente) src/components/home/FeaturedProjectsSection.tsx ou similar + cards; CTAButton.tsx

🔗 Integrações: clique no card → /portfolio/[slug], CTA card → /portfolio

❌ Problemas
Animações de hover dos cards

Escala leve da imagem, translateY(-1px), arrow transladando 20px.

CTA card separado com comportamento de hover específico

Fundo bg-[#0d003b], texto clareando para #0057FF no hover, arrow 4px.

Mobile stack

Confirmar que não há horizontal scroll e que as alturas respeitam aspect-[...] indicado.

🔧 Correção Técnica
Usar Grid md:grid-cols-12 gap-x-8 gap-y-10 com colspans exatos da doc.

Criar ProjectCard e CTAProjectCard compartilhando tokens de animação (Framer Motion) e variando apenas layout e destino.

✅ Resultado esperado
Em desktop, grid se comporta como editorial de revista, com CTA card chamando atenção mas sem competir com trabalhos.

Em mobile, cards aparecem em uma única coluna, em ordem narrativa coerente.

🎯 Página: HOME
🎯 Seção: Clients/Brands
📌 Fidelidade visual (referência): ✓ — Doc 4.5

📐 Grid e margens laterais: ✓ (faixa azul full-width, título centralizado, grid de logos)

↔️ Alinhamento duas laterais: ✓ (conteúdo centralizado dentro do container)

🔤 Tipografia: ✓ (título 2xl bold em branco)

🎥 Vídeos: N/A

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): Não avaliado (mas grid parece escalável)

🎞️ Motion/Animações: ✗ (hover scale/brightness + stagger na entrada ainda precisam ser garantidos)

🧩 Componentes envolvidos: seção de marcas (nome exato a confirmar), provavelmente em src/components/home

🔗 Integrações: assets via Supabase (client1.svg…client12.svg)

❌ Problemas
Stagger de entrada das logos

Título e logos devem animar com fade-up/scale + stagger curto.

Hover suave em desktop

scale(1.04) + leve aumento de brightness, respeitando prefers-reduced-motion.

🔧 Correção Técnica
Usar Framer Motion para container e children, com variants e staggerChildren.

Logos importadas com next/image ou <img> + filter: invert() para garantir branco.

✅ Resultado esperado
Faixa azul funciona como “respiro” forte, com logos ganhando leve vida no hover, sem distração excessiva.

🎯 Página: HOME
🎯 Seção: Contato
📌 Fidelidade visual (referência): ✓ — Doc 4.6 + screenshot

📐 Grid e margens laterais: ✓ (two-column desktop, single column mobile esperado)

↔️ Alinhamento duas laterais: ✓ (alinhado com container geral)

🔤 Tipografia: ✓ (headline/subheadline + labels claros)

🎥 Vídeos: N/A

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): Não avaliado (estrutura já sugere adaptação fácil)

🎞️ Motion/Animações: ✗ (reveal + focos e hovers precisam seguir especificação)

🧩 Componentes envolvidos: ContactSection.tsx, ContactForm.tsx, ContactDetails.tsx

🔗 Integrações: FormSubmit.co endpoint, links sociais externos

❌ Problemas
Formulário precisa seguir exatamente a especificação de campos/estados

Name, Email, Message obrigatórios; endpoint https://formsubmit.co/danilo@portfoliodanilo.com; loading, error, success states.

Focus/hover states padronizados

Inputs com ring-2 ring-blue-500 ring-offset-2, botões com scale/translate conforme doc CTA.

Acessibilidade

Labels associados via htmlFor, mensagens de erro com aria-describedby, touch targets ≥ 48×48.

🔧 Correção Técnica
Revisar ContactForm.tsx para:

Usar required + validação custom (se necessário).

Controlar estado de envio (isSubmitting, isSuccess, isError).

Aplicar classes Tailwind dos estados de foco/erro.

✅ Resultado esperado
Usuário consegue enviar mensagem com confiança, recebendo feedback claro de sucesso/erro, e o formulário não quebra layout em mobile.

🎯 Página: HOME
🎯 Seção: Footer
📌 Fidelidade visual (referência): ✓ em aparência; comportamento ainda não avaliado — Doc 4.7

📐 Grid e margens laterais: ✓

↔️ Alinhamento duas laterais: ✓

🔤 Tipografia: ✓

🎥 Vídeos: N/A

🌀 ROME/WebGL: N/A

📱 Mobile (sm/md): Não avaliado (doc exige footer não fixo em mobile)

🎞️ Motion/Animações: ✓ (apenas hovers simples)

🧩 Componentes envolvidos: provavelmente dentro de layout.tsx ou Footer.tsx em src/components/layout

🔗 Integrações: navegação secundária, links sociais

❌ Problemas
Comportamento fixo por breakpoint

Footer deve ser fixed bottom-0 apenas em desktop (≥1024px), e estático em mobile/tablet.

Acessibilidade de links e ícones

Confirmar aria-label em ícones sociais; foco visível.

🔧 Correção Técnica
Em layout.tsx/Footer:

Usar classes condicionais (hidden lg:flex para variante fixa, flex lg:hidden para variante estática ou um único footer com comportamento condicional via CSS media queries).

Garantir altura consistente (h-12–h-16) e z-10 sem competir com hero.

✅ Resultado esperado
Em desktop, footer fixa a base da janela sem sobrepor conteúdo; em mobile, aparece no final do fluxo, sem “colado” na viewport.

🎯 Página: ABOUT (/sobre)
🎯 Seção: AboutHero
📌 Fidelidade visual (referência): Não avaliado — docs Ghost (SOBRE-PROTOTIPO-INTERATIVO)

📐 Grid e margens laterais: Não avaliado

↔️ Alinhamento duas laterais: Não avaliado

🔤 Tipografia: Não avaliado (mas deve ser extremamente protagonista)

🎥 Vídeos: ✗ (precisa garantir URLs exatas: HeroSobre.mp4 desktop, HeroSobreMobile.mp4 mobile)

🌀 ROME/WebGL: N/A (sobre usa vídeo, não canvas)

📱 Mobile (sm/md): ✗ (seção fullscreen mobile precisa ser implementada com vídeo correto)

🎞️ Motion/Animações: ✗ (opacity/blur/translate apenas; sem scale/rotate)

🧩 Componentes envolvidos: AboutHero.tsx

🔗 Integrações: rota /sobre, overlay tipográfico, controle de som

❌ Problemas / Lacunas esperadas
Verificar uso dos vídeos corretos conforme URLs e breakpoints.

Garantir overlay tipográfico Ghost: tag, headline, micro-copy, sem elementos conflitantes.

Lógica de som: mutado por padrão; toggle explícito; respeitar prefers-reduced-motion e autoplay rules.

🔧 Correção Técnica
Em AboutHero.tsx:

Renderizar <video> desktop e mobile condicionais por breakpoint via CSS/JS.

Adicionar botão de som com ícone, aria-pressed, estado em React.

Tipografia HTML semântica (H1/H2/p), alinhada ao grid global.

✅ Resultado esperado
Hero da página /sobre funciona como “espelho” conceitual do manifesto/hero da HOME, com vídeo imersivo e copy Ghost, sem ruído.

🎯 Página: ABOUT
🎯 Seções: AboutWhatIDo, AboutOrigin, AboutBeliefs, AboutMethod, AboutClosing
Para não alongar demais, agrupo as seções 2–6, pois as necessidades são semelhantes.

📌 Fidelidade visual (referência): Não avaliado (depende do protótipo Ghost em SOBRE-PROTOTIPO-INTERATIVO.md)

📐 Grid e margens laterais: Devem replicar exatamente o grid invisível usado na HOME

↔️ Alinhamento duas laterais: Crítico (texto deve cair na mesma coluna de hero/portfolio/contact da HOME)

🔤 Tipografia: Altamente crítica (variações finas de peso/tamanho/leading são a alma do layout Ghost)

🎥 Vídeos:

AboutMethod deve usar VideoAboutMethod.mp4 embutido com overlay tipográfico.

🌀 ROME/WebGL: N/A

📱 Mobile: Precisa de validação (tipografia reflow sem quebrar ritmo, micro-breakpoints para parágrafos longos)

🎞️ Motion/Animações:

Apenas opacity/blur/translate;

Stagger sutil;

.ghost-accent com hover suave (cor + talvez sublinhado)

🧩 Componentes envolvidos:

AboutWhatIDo.tsx, AboutOrigin.tsx, AboutBeliefs.tsx, AboutMethod.tsx, AboutClosing.tsx, motion.ts

🔗 Integrações: /sobre/page.tsx na ordem correta

❌ Problemas / Pontos de atenção
Garantir ordem narrativa correta 01 → 06 em /sobre/page.tsx.

Alinhar grid/tipografia com tokens globais da doc v2.0.

Vídeo AboutMethod usando exata URL e comportamento de áudio/motion correto.

Aplicar .ghost-accent em keywords definidas, com hover mínimo.

Revisar variants de motion em motion.ts para evitar scale/bounce/rotate.

🔧 Correção Técnica
Em /sobre/page.tsx:

Renderizar na ordem: AboutHero, AboutWhatIDo, AboutOrigin, AboutBeliefs, AboutMethod, AboutClosing.

Em cada componente:

Usar wrappers max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)].

Garantir tokens de tipografia (TT Norms Pro, tamanhos/pesos).

Aplicar variants de Framer Motion importados de motion.ts.

Em AboutMethod.tsx:

Integrar vídeo de método com controls/toggle som.

✅ Resultado esperado
Página /sobre funciona como manifesto textual Ghost, com ritmo e densidade comparáveis ao benchmark Phantom, porém com identidade sua.

4️⃣ Lista de Problemas (com severidade)
🔴 Alta

Header desktop não implementado como pill de vidro fluido centralizado; barra full-width conflita com hero.

Lógica completa do vídeo manifesto (scroll → fullscreen, hold 2s, áudio) não auditada; assumimos que precisa ser implementada/ajustada.

Fallback e acessibilidade de WebGL (GhostCanvas + header FluidGlass): DPR, reduced-motion, fallback estático não garantidos.

Responsividade mobile do manifesto (seção própria fullscreen) + menu mobile stagger + footer não fixo em mobile ainda não foram validados — devem ser tratados como pendência crítica.

Página /sobre: ordem das seções, vídeos corretos e tipografia Ghost não confirmados; precisa alinhamento estrito à doc.

🟡 Média

Stripes do Portfolio Showcase: hover (thumbnail, gap, arrow) e scroll reveal podem não seguir spec ponto a ponto.

Featured Projects: animações de hover em cards e CTA card podem não estar idênticas à doc.

Clients/Brands: falta garantir stagger na entrada e hover scale/brightness.

Contact: estados de formulário (loading, erro, sucesso), foco e acessibilidade podem estar incompletos.

Footer: comportamento fixo em desktop e estático em mobile precisa ser explícito e testado.

🟢 Baixa (polimento)

Fino ajuste de grid/gutters/margens laterais entre seções para garantir “edge rhythm” perfeito.

Padronização global do componente CTAButton em todas as seções, inclusive hover/active/focus.

Ajuste de tokens de cor/contraste para WCAG AA em todos os contextos (especialmente texto claro em fundo azul).

Pequenos ajustes de easing/duração/stagger para todos os motions, alinhando ao padrão easeOutExpo definido.

5️⃣ Recomendações Prioritárias (ordem de execução)
Tipografia + grid global

Travar tokens de fonte, tamanhos, line-height e container/margens em globals.css/layout.

Header + Footer (estrutura + comportamento)

Corrigir header desktop/mobilidade e footer fixo vs estático.

Hero + Ghost Atmosphere + CTA

Preloader, GhostCanvas com fallback, CTAButton padronizado.

Manifesto vídeo (desktop e mobile)

Implementar state machine, hold de 2s, som, seção mobile.

Portfolio Showcase + Featured Projects

Implementar animações de hover/scroll conforme spec; garantir navegação para /portfolio.

Clients/Brands + Contact

Polimento de motion, acessibilidade, validação de formulário.

Página /sobre (todas as seções)

Garantir fidelidade Ghost total (order 01–06, vídeos, tipografia, motion).

Performance & A11y pass

DPR WebGL, prefers-reduced-motion, Core Web Vitals, Lighthouse 90+/100/100.

🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR
Abaixo, prompts atômicos. Use quantos forem úteis no fluxo real.

🛠️ Prompt #01 — Header desktop em pill glass fluido
Objetivo
Transformar o header desktop em um container pill centralizado com efeito glass fluido e navegação conforme a doc 4.1.

Arquivos/Rotas envolvidas

src/app/layout.tsx

src/components/layout/Header.tsx

src/components/layout/header/SiteHeader.tsx

src/components/canvas/header/FluidGlass.tsx

src/components/canvas/header/GlassBar.tsx

src/config/navigation.tsx

Ações

Ajustar o header desktop para usar max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] e rounded-full backdrop-blur com gradiente/transparência conforme tokens da doc (background escuro, texto claro).

Integrar FluidGlass/GlassBar via dynamic(() => import(...), { ssr: false }) apenas em desktop; garantir position: sticky; top: 0; z-40.

Implementar leve follow do cursor (até 40–60px em X) e micro-scale (scaleX até 1.05, scaleY até 1.02) usando Framer Motion, sem comportamento “chiclete”.

Regras

❌ Não alterar textos ou labels de navegação.

❌ Não mudar ordem dos links.

✅ Tailwind para layout; Framer Motion para movimento.

✅ Mobile-first; aplicar comportamento fluido apenas em lg+.

✅ Comparar com: docs/HEADER + HERO-PORTFOLIO-GHOST.jpg + Phantom (ritmo e presença).

Critérios de aceite (Checklist)



Header ocupa largura parcial, centralizado, em forma de pill.



Navegação continua legível, sem competir com o hero.



Efeito fluido responde suavemente ao cursor, sem saltos.



Com prefers-reduced-motion, header fica estático.



Sem regressão em mobile/tablet.

🛠️ Prompt #02 — Header mobile com menu stagger fullscreen
Objetivo
Implementar o header mobile com hambúrguer + overlay fullscreen e animação stagger nos itens.

Arquivos/Rotas envolvidas

src/components/layout/Header.tsx

src/components/layout/header/SiteHeader.tsx

src/config/navigation.tsx

Ações

Adicionar botão hambúrguer em sm–md com aria-label, aria-expanded e estado controlado (isOpen).

Criar overlay fullscreen (fixed inset-0) com gradiente primary → neutral, nav vertical com texto grande e espaçado.

Implementar animações Framer Motion: overlay fade-in + slideX, itens com stagger, ícone hambúrguer → X; fechar ao clicar fora, clicar no item ou pressionar ESC. Garantir focus trap no overlay.

Regras

❌ Não alterar os rótulos dos links.

✅ Mobile-first.

✅ Comparar com: docs/HEADER (mobile), Phantom (ritmo do menu mobile).

Critérios de aceite



Menu mobile abre em overlay fullscreen com animação suave.



Foco é preso dentro do menu aberto.



ESC, clique fora e clique nos links fecham o menu.



Nenhum overflow horizontal em mobile.

🛠️ Prompt #03 — Preloader Ghost no Hero da HOME
Objetivo
Implementar preloader Ghost (SVG + texto + barra) que aparece no load e some após ~2s antes de exibir o hero.

Arquivos/Rotas envolvidas

src/components/home/HomeHero.tsx

src/components/canvas/home/GhostCanvas.tsx (apenas como contexto de z-index)

Eventual componente PreloaderGhost.tsx (novo)

Ações

Criar componente PreloaderGhost com:

Ghost SVG centralizado animando levemente;

texto “SUMMONING SPIRITS” em fonte mono, uppercase, tracking wide;

barra de progresso animada (2s) com gradiente #0057FF → #5227FF.

Em HomeHero.tsx, mostrar PreloaderGhost logo após mount e esconder hero; após 1.5–2s, fade-out do preloader e render do hero.

Respeitar prefers-reduced-motion: apenas fade básico, sem animações extras.

Regras

❌ Não alterar o conteúdo textual do hero.

✅ Usar Tailwind para layout; Framer Motion para fade.

✅ Comparar com: HERO-PORTFOLIO-GHOST.jpg e doc do Hero.

Critérios de aceite



Preloader aparece imediatamente ao entrar na HOME.



Some em ~2s com fade suave, revelando hero.



Nenhum impacto negativo em LCP; preloader não bloqueia HTML inicial.

🛠️ Prompt #04 — Ghost Atmosphere (ROME) com DPR e fallback corretos
Objetivo
Garantir que GhostCanvas implemente Ghost Atmosphere conforme spec (movimento, emissive pulse, particles, bloom, fallback).

Arquivos/Rotas envolvidas

src/components/canvas/home/GhostCanvas.tsx

diretório de subcomponentes de canvas se existir (Ghost.tsx, Particles.tsx, etc.)

Ações

Configurar <Canvas> com dpr={[1, 2]}, gl={{ antialias: false }} e tamanho desacoplado da UI (canvas absoluto atrás do texto).

Implementar ghost emissivo com movimento:

follow do cursor via useFrame + lerp(targetPosition, 0.05) somente em desktop;

movimento senoidal (Y e X) conforme doc;

material.emissiveIntensity pulsando levemente com sin(time).

Adicionar postprocessing:

bloom pass com intensidade ~2.8;

analog decay/grain/scanlines sutil.

Implementar fallback:

se prefers-reduced-motion ou erro WebGL, renderizar apenas gradiente estático (StaticGradientBackground) atrás do hero.

Regras

❌ Não acoplar o layout textual dentro do canvas.

✅ Comparar visualmente com HERO-PORTFOLIO-GHOST.jpg (posição/escala/brilho/presença).

Critérios de aceite



Ghost ocupa posição equivalente à imagem de referência.



Movimento é orgânico, sem jitter, e segue o mouse apenas em desktop.



DPR <= 2, sem quedas de performance em mobile.



Fallback estático funcional e automático.

🛠️ Prompt #05 — Manifesto vídeo desktop: thumbnail → fullscreen com hold de 2s e som
Objetivo
Implementar o comportamento completo do manifesto vídeo na HOME desktop, com transição scroll-based para fullscreen, hold de 2s e lógica de som.

Arquivos/Rotas envolvidas

src/components/home/HomeHero.tsx (ou componente dedicado de manifesto)

Eventual ManifestoVideoThumbnail.tsx (novo)

Ações

Criar componente ManifestoVideoThumbnail:

posição inicial bottom-right fixo, ~30vw, 16:9, muted, loop, playsInline;

usar Framer Motion + useScroll para animar scale, x, y, borderRadius, opacity do texto do hero baseado em scrollYProgress da seção do hero.

Implementar state machine com estados thumbnail | transition | fullscreenHold | released; ao atingir scrollYProgress = 1:

travar scroll (via control de overflow ou interceptando wheel/touch) por 2s;

expandir vídeo para fullscreen (fixed inset-0, borderRadius: 0), desmutar áudio.

Ao rolar além da seção ou voltar:

mutar novamente o vídeo;

resetar estado conforme doc.

Clique no thumbnail deve pular direto para fullscreenHold (skip gradual scroll), seguindo mesma lógica de som e hold.

Regras

❌ Não animar o texto do hero além da opacidade indicada.

✅ Respeitar autoplay policies (começar sempre muted).

✅ Comparar com doc da seção 4.2 (Manifesto vídeo).

Critérios de aceite



Vídeo começa como thumbnail flutuante, fixo no canto inferior direito.



Ao rolar, cresce e centraliza até fullscreen, mantendo posição fixed.



Scroll é travado por 2s em fullscreen e som é ativado apenas nesse estado.



Ao sair do hero, vídeo é mutado novamente.

🛠️ Prompt #06 — Manifesto vídeo mobile como seção fullscreen
Objetivo
Criar a seção de manifesto vídeo específica para mobile, logo após o hero, com som controlado via tap.

Arquivos/Rotas envolvidas

src/components/home/HomeHero.tsx ou ManifestoVideoMobile.tsx novo

Ações

Renderizar uma seção section id="manifesto" visível apenas em sm/md (block lg:hidden) logo abaixo do hero.

Dentro dela, inserir <video> fullscreen (w-full, aspect-video) usando o mesmo asset do manifesto, autoplay, loop, muted por padrão, playsInline.

Criar botão de som (ícone) sobreposto ao vídeo, com estado React (isMuted) e aria-pressed; ao rolar para fora da seção, garantir voltar a muted.

Adicionar animação de entrada suave (opacity/scale/translateY) com Framer Motion e respeitar prefers-reduced-motion.

Regras

✅ Comparar com doc da seção “Manifesto Section (Mobile)”.

✅ Mobile-first; não afetar desktop.

Critérios de aceite



Em mobile, manifesto aparece como seção fullscreen logo após hero.



Som só é habilitado ao toque e volta a ser mutado após sair da seção.



Nenhum overflow horizontal.

🛠️ Prompt #07 — Padronizar CTAButton em toda a HOME
Objetivo
Usar o componente CTAButton como única fonte de verdade para CTAs primários, secundários e accent na HOME.

Arquivos/Rotas envolvidas

src/components/ui/CTAButton.tsx

src/components/home/HomeHero.tsx

src/components/portfolio/PortfolioShowcaseSection.tsx

src/components/home/FeaturedProjectsSection.tsx (ou equivalente)

src/components/home/ContactSection.tsx

Ações

Revisar CTAButton.tsx para bater 100% com a doc da CTA (cores, variante primary/secondary/accent, whileHover/whileTap, focus-visible).

Substituir qualquer <a> ou <button> manual de CTA nessas seções por <CTAButton> com as props adequadas.

Garantir que o texto dos botões (“step inside →”, “let's build something great →”, “view projects →”, “Enviar Mensagem”) não seja alterado.

Regras

❌ Não renomear textos dos CTAs.

✅ Comparar com doc “CTA Button Component Specification”.

Critérios de aceite



Todos CTAs principais usam CTAButton.



Hover levanta 1px, arrow desloca 4px quando especificado.



Focus-visible com outline 2px #4fe6ff offset 4px.

🛠️ Prompt #08 — Portfolio Showcase: hover stripes + scroll reveal
Objetivo
Implementar interações de hover e entrada das três stripes de portfólio exatamente como especificado.

Arquivos/Rotas envolvidas

src/components/portfolio/PortfolioShowcaseSection.tsx

src/components/portfolio/AccordionRow.tsx

src/lib/constants.tsx (slugs + URLs de thumbnails)

Ações

Em AccordionRow.tsx, usar Framer Motion:

na imagem: width animando de 0 → 288px, opacity de 0 → 1 em ~700ms;

no container de conteúdo: animar gap via classe condicional (group-hover:gap-10 ou semelhante);

no arrow: rotation de -45deg → 0deg em 500ms.

Em PortfolioShowcaseSection.tsx, adicionar scroll reveal das stripes:

initial={{ opacity: 0, y: 24 }}

whileInView={{ opacity: 1, y: 0 }}

transition={{ duration: 0.8, ease: [0.22,1,0.36,1], staggerChildren: 0.12 }}

títulos mudando para text-[#0057FF] ao entrarem em view.

Mapear cliques nas stripes para /portfolio?category=slug de acordo com os slugs definidos na doc.

Regras

✅ Mobile-first (no mobile, condicionar animações de hover ao breakpoint).

✅ Comparar com imagem HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.

Critérios de aceite



Em desktop, hover abre thumbnail e rotaciona arrow.



Em mobile, layout não depende de hover; thumbnails são estáticas ou omitidas.



Scroll reveal segue timing/easing especificados.

🛠️ Prompt #09 — Featured Projects Bento Grid fiel ao layout
Objetivo
Garantir que a seção de projetos em destaque siga exatamente o bento grid proposto, com interações de hover padronizadas.

Arquivos/Rotas envolvidas

src/components/home/FeaturedProjectsSection.tsx (ou nome equivalente)

Cards de projeto individuais, se existirem

src/lib/constants.tsx (dados das 4 peças)

Ações

Configurar grid md:grid-cols-12 com colspans:

Card 1 → md:col-span-5,

Card 2 → md:col-span-7,

Card 3 → md:col-span-12,

Card 4 → md:col-span-8, CTA → md:col-span-4.

Implementar ProjectCard:

imagem/vídeo object-cover w-full h-full;

pill de tags absolute top-... right-...;

info block abaixo com título + meta + arrow em círculo azul.

Hover:

imagem: scale: 1.03, y: -1 (Framer Motion);

arrow: x: 20 em 700ms.

CTAProjectCard:

fundo bg-[#0d003b];

texto “Like what you see?” mudando para #0057FF no hover;

botão “view projects →” usando CTAButton secundário.

Regras

✅ Não alterar títulos/metadados dos projetos.

✅ Respeitar doc 4.4.

Critérios de aceite



Grid bate visualmente com diagrama ASCII da doc.



Todos cards têm hover consistente.



Em mobile, cards empilhados em uma coluna sem overflow.

🛠️ Prompt #10 — Clients/Brands: grid + hover + stagger
Objetivo
Implementar animações de entrada e hover das logos de clientes.

Arquivos/Rotas envolvidas

src/components/home/ClientsSection.tsx (ou similar)

Carregamento de logos via Supabase

Ações

Estruturar faixa section com bg-[#0048ff] py-12.

Título centralizado com Framer Motion (opacity: 0→1, y:16→0).

Grid de 12 logos via map; cada logo como motion.img:

initial={{ opacity: 0, y: 12, scale: 0.9 }}

whileInView={{ opacity: 1, y: 0, scale: 1 }}

transition com staggerChildren: 0.03.

Hover em desktop:

whileHover={{ scale: 1.04 }} + CSS filter: brightness(1.1).

Regras

✅ Respeitar URLs base de Supabase.

✅ Garantir alt descritivo.

Critérios de aceite



Grid responsivo (3–4 colunas mobile, 6+ desktop).



Logos entram com stagger suave.



Hover funciona apenas em desktop; com prefers-reduced-motion desativado.

🛠️ Prompt #11 — ContactSection: grid 2 colunas, form acessível
Objetivo
Ajustar a seção de contato para seguir exatamente layout e comportamento do formulário descritos na doc.

Arquivos/Rotas envolvidas

src/components/home/ContactSection.tsx

src/components/home/contact/ContactForm.tsx

src/components/home/contact/ContactDetails.tsx

Ações

Garantir layout md:grid md:grid-cols-2 gap-12, com coluna esquerda (info + redes) e direita (form).

Em ContactForm.tsx:

Campos Name, Email, Message com labels e required;

method="POST" para https://formsubmit.co/danilo@portfoliodanilo.com;

estados isSubmitting, isSuccess, isError com mensagens visíveis;

botão CTAButton variant primary com whileHover e whileTap.

Estilizar foco e erro com Tailwind conforme doc (ring-2, etc.).

Garantir links de contato e redes sociais com tel:, mailto: e target="_blank" rel="noopener noreferrer".

Regras

❌ Não alterar texto de labels ou mensagens.

✅ Mobile-first, sem overflow.

Critérios de aceite



Formulário envia corretamente para FormSubmit.



Mensagens de sucesso/erro são claras e acessíveis.



Campos e botão têm foco visível e touch targets confortáveis.

🛠️ Prompt #12 — Footer: fixo apenas em desktop
Objetivo
Garantir que o footer seja fixo no bottom apenas em desktop e esteja no fluxo normal em mobile/tablet.

Arquivos/Rotas envolvidas

src/app/layout.tsx

src/components/layout/Footer.tsx (ou equivalente)

Ações

Alterar classes do footer para:

desktop (lg:): fixed bottom-0 left-0 right-0 z-10;

mobile/tablet: footer em fluxo (sem fixed).

Garantir espaçamento vertical apropriado para que conteúdo não fique escondido atrás do footer em desktop (ex.: pb-footer no main).

Ajustar navegação e ícones sociais com hover/focus conforme doc.

Regras

✅ Comparar com doc 4.7.

Critérios de aceite



Em desktop, footer sempre visível ao fundo, sem cobrir conteúdo.



Em mobile/tablet, footer aparece no final da página, não fixo.

🛠️ Prompt #13 — /sobre: orquestração das seções Ghost
Objetivo
Garantir que /sobre renderize as seções Ghost na ordem correta, usando componentes dedicados.

Arquivos/Rotas envolvidas

src/app/sobre/page.tsx

src/components/sobre/AboutHero.tsx

src/components/sobre/AboutWhatIDo.tsx

src/components/sobre/AboutOrigin.tsx

src/components/sobre/AboutBeliefs.tsx

src/components/sobre/AboutMethod.tsx

src/components/sobre/AboutClosing.tsx

Ações

Abrir /sobre/page.tsx e garantir que o JSX renderize, nesta ordem:

<AboutHero />

<AboutWhatIDo />

<AboutOrigin />

<AboutBeliefs />

<AboutMethod />

<AboutClosing />

Remover qualquer lógica de layout duplicada ali; usar apenas containers internos de cada seção.

Certificar que cada seção usa o mesmo container global (max-w + px).

Regras

❌ Não mudar textos das seções.

✅ Comparar com SOBRE-PROTOTIPO-INTERATIVO.md (estrutura narrativa).

Critérios de aceite



Ordem das seções bate 1:1 com o protótipo Ghost.



Grid/margens laterais são consistentes com a HOME.

🛠️ Prompt #14 — AboutHero: vídeos corretos + overlay tipográfico Ghost
Objetivo
Aplicar exatamente os vídeos HeroSobre (desktop) e HeroSobreMobile (mobile) no hero da página /sobre, com overlay tipográfico Ghost.

Arquivos/Rotas envolvidas

src/components/sobre/AboutHero.tsx

Ações

Inserir <video> desktop usando HeroSobre.mp4 com autoPlay, muted, loop, playsInline.

Inserir versão mobile (HeroSobreMobile.mp4) visível apenas em sm/md (block lg:hidden), com mesmas props.

Adicionar overlay com tipografia:

tag, headline, subheadline conforme protótipo;

alinhada ao grid (esquerda/direita conforme doc).

Criar controle de som explícito (ícone) com estado, respeitando regras de autoplay.

Regras

✅ Não alterar textos; apenas aplicar layout e vídeo corretos.

✅ Seguir motion de opacity/translate apenas.

Critérios de aceite



Vídeo correto em desktop e mobile.



Overlay tipográfico legível em todos os breakpoints.



Sem scroll horizontal causado pelo hero.

🛠️ Prompt #15 — AboutMethod: vídeo de método com motion Ghost
Objetivo
Implementar a seção de método na página /sobre usando VideoAboutMethod.mp4 com motion e tipografia Ghost.

Arquivos/Rotas envolvidas

src/components/sobre/AboutMethod.tsx

Ações

Inserir <video> com src="...VideoAboutMethod.mp4", em container aspect-video e fundo escuro igual ao resto da página.

Overlay tipográfico com copy de método, alinhado às colunas e seguindo tokens de tipografia.

Motion suavizado: fade-in + translateY, sem scale nem rotações.

Controle de som semelhante ao Hero (muted por padrão, toggle explícito).

Regras

✅ Comparar com trechos do PROTOTIPO_INTERATIVO_SOBRE_GHOST_COMPLETO (seção método).

Critérios de aceite



Seção método se destaca visualmente, mas segue grid e ritmo de texto do resto da página.



Vídeo inicia muted e só toca áudio com interação.

🛠️ Prompt #16 — Motion centralizado para /sobre (motion.ts)
Objetivo
Centralizar e padronizar todas as variantes de motion das seções /sobre em motion.ts, respeitando as regras de animação do Ghost.

Arquivos/Rotas envolvidas

src/components/sobre/motion.ts

Todas as seções src/components/sobre/*.tsx

Ações

Definir variants padrão (e.g. fadeUp, fadeIn, staggerSection) apenas com opacity e y.

Remover qualquer escala, rotação, bounce ou overshoot exagerado; usar easing [0.22,1,0.36,1] e durações entre 0.4–0.7s.

Em cada seção, importar e aplicar esses variants em elementos de texto principais.

Envolver animações em media query de prefers-reduced-motion para desativá-las quando necessário.

Regras

✅ Não alterar textos nem ordem das seções.

Critérios de aceite



Todas animações da página /sobre vêm de motion.ts.



Apenas opacity e translateY são animados.



prefers-reduced-motion desativa as animações.

🛠️ Prompt #17 — Revisão de grid e edge rhythm global
Objetivo
Unificar margens laterais e grid invisível entre todas as seções de HOME e ABOUT.

Arquivos/Rotas envolvidas

src/app/layout.tsx

Todas as seções de src/components/home/* e src/components/sobre/*

Ações

Definir container global (.page-container) com max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)].

Garantir que todas as seções usem esse container, evitando margens customizadas isoladas.

Revisar alinhamento de textos e elementos-chave para cair nas mesmas colunas (esquerda/direita) do layout de referência.

Ajustar espaçamentos verticais (py-16 md:py-24) entre seções.

Regras

✅ Não mover seções de lugar; apenas alinhar margens/spacing.

✅ Comparar com HOME-PORTFOLIO-LAYOUYT-GHOST.jpg e Phantom (ritmo e densidade).

Critérios de aceite



Nenhuma seção “salta” para fora do grid em desktop.



Margem esquerda/direita consistente em toda a página.



Sem overflow horizontal em qualquer breakpoint.

🛠️ Prompt #18 — Passada de performance + acessibilidade (Lighthouse + WCAG)
Objetivo
Garantir que HOME e ABOUT atinjam Performance 90+, Accessibility 100, Best Practices 100 no Lighthouse.

Arquivos/Rotas envolvidas

Global (todos os arquivos relevantes descritos nos prompts anteriores)

Ações

Otimizar imagens (WebP/GIF) com next/image, loading="lazy" quando fora da viewport inicial.

Verificar que todos vídeos usam preload="metadata" e não bloqueiam o LCP.

Adicionar next/font para TT Norms Pro ou fallback robusto com preload adequado.

Rodar Lighthouse em / e /sobre em modo mobile e desktop; corrigir issues reportadas (foco, contrast, heading order, etc.).

Regras

✅ Não alterar identidade visual; apenas ajustes técnicos.

Critérios de aceite



Lighthouse: Performance ≥ 90, Accessibility = 100, Best Practices = 100.



Nenhuma violação WCAG AA óbvia (contraste, teclabilidade, foco).

