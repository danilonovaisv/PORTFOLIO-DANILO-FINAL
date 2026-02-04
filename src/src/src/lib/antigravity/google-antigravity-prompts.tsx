import type { FC } from 'react';

const GhostPortfolioAuditReport: FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-12 text-sm leading-relaxed text-zinc-100">
      {/* 1️⃣ Visão Geral */}
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">1️⃣ Visão Geral</h1>
        <p>
          A estrutura do projeto está organizada em App Router, com{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/app/layout.tsx
          </code>{' '}
          como RootLayout e páginas segmentadas para Home (
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/app/page.tsx
          </code>
          ), Sobre (
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/app/sobre/page.tsx
          </code>
          ) e Portfólio (
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/app/portfolio/page.tsx
          </code>
          ). Essa arquitetura segue o padrão recomendado do App Router, com um
          layout raiz envolvendo todas as rotas.
        </p>
        <p>
          A camada de layout reutilizável está concentrada em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/components/layout
          </code>{' '}
          (incluindo <code>Header</code>, <code>Container</code> e{' '}
          <code>ClientLayout</code>), enquanto as seções de página se apoiam em
          componentes específicos: Home em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/components/home/*
          </code>
          , Sobre em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/components/sobre/*
          </code>{' '}
          e Portfólio em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/components/portfolio/*
          </code>
          . A cena 3D Ghost/ROME está centralizada em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            src/components/canvas/home/hero/GhostScene.tsx
          </code>
          .
        </p>
        <p>
          Com base nas pendências que você descreveu (ajustes de grid, margens,
          CTAs, áudio do Manifesto, vídeo dinâmico no About Closed, grid do
          portfólio e parallax), e sem acesso direto ao CSS/TSX ou às imagens de
          referência a partir deste ambiente, assumo que ainda existem desvios
          relevantes em relação às imagens canônicas em{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            docs/HOME
          </code>
          ,{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            docs/SOBRE
          </code>{' '}
          e{' '}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            docs/PORTFOLIO
          </code>
          . Abaixo, o checklist parte do princípio conservador de que qualquer
          ponto não explicitamente fechado deve ser tratado como “Não” até que
          os ajustes propostos sejam implementados e validados visualmente.
        </p>
      </section>

      {/* 2️⃣ Diagnóstico por Seção */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">2️⃣ Diagnóstico por Seção</h2>

        {/* 2.1 Home Hero */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">2.1 Home Hero</h3>

          <div className="space-y-1">
            <p className="font-semibold">Checklist de Fidelidade:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                O grid e as margens laterais correspondem exatamente à imagem?{' '}
                <strong>Não</strong> — é necessário travar todas as colunas em
                um único container matemático (provavelmente via{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  Container
                </code>
                ) compartilhado entre Home, Sobre e Portfólio.
              </li>
              <li>
                O alinhamento “duas laterais” está consistente em todo o scroll?{' '}
                <strong>Não</strong> — existe indício de “saltos” entre seções
                (Hero → Manifesto → Featured Projects).
              </li>
              <li>
                Os cards do portfólio ocupam toda a largura horizontal sem gaps?{' '}
                <strong>Não se aplica</strong> (seção sem cards tipo mosaico).
              </li>
              <li>
                A animação de parallax e hover segue a fluidez do CodePen
                referência? <strong>Não</strong> — o Ghost/ROME precisa seguir
                exatamente o timing/easing e amplitude definidos no blueprint,
                incluindo profundidade suave em resposta ao scroll/mouse.
              </li>
              <li>
                O mobile está livre de overflow horizontal e com touch targets
                adequados? <strong>Não</strong> — há relato de problemas de
                clique no Header e possíveis quebras de alinhamento/padding no
                Hero em telas pequenas.
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Inconsistências principais:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Hero não está perfeitamente alinhado ao grid Ghost definido em{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  docs/HOME/HERO.jpg
                </code>
                , com diferença de margens laterais e possivelmente da distância
                entre título, subtítulo e CTA.
              </li>
              <li>
                Cena <code>GhostScene</code> (posição, scale, brightness) ainda
                não casada 1:1 com o enquadramento da imagem canônica.
              </li>
              <li>
                Em mobile, o Hero herdando problemas do Header (área de clique /
                nav) e potencial overflow horizontal residual.
              </li>
            </ul>
          </div>
        </section>

        {/* 2.2 Manifesto */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">2.2 Manifesto</h3>

          <div className="space-y-1">
            <p className="font-semibold">Checklist de Fidelidade:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                O grid e as margens laterais correspondem exatamente à imagem?{' '}
                <strong>Não</strong> — Manifesto precisa seguir o mesmo
                container de Hero e Featured Projects, sem variação de paddings.
              </li>
              <li>
                O alinhamento “duas laterais” está consistente em todo o scroll?{' '}
                <strong>Não</strong> — transição Ghost → Manifesto ainda não é
                ótica e matematicamente contínua.
              </li>
              <li>
                Os cards do portfólio ocupam toda a largura horizontal sem gaps?{' '}
                <strong>Não se aplica</strong>.
              </li>
              <li>
                A animação de parallax e hover segue a fluidez do CodePen
                referência? <strong>Não</strong> — a interação aqui é
                principalmente áudio + scroll; a fluidez de entrada/saída do
                texto e controles de áudio ainda não está “Ghost level”.
              </li>
              <li>
                O mobile está livre de overflow horizontal e com touch targets
                adequados? <strong>Não</strong> — player/controle de áudio e CTA
                precisam ser garantidos como touch-friendly (min 44×44px).
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Inconsistências principais:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Sincronia entre áudio do Manifesto e scroll não está descrita
                como finalizada (auto-mute/unmute em função da presença em
                viewport).
              </li>
              <li>
                Possível variação de largura do texto/legenda em relação ao
                container global.
              </li>
            </ul>
          </div>
        </section>

        {/* 2.3 Featured Projects (Home) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            2.3 Featured Projects (Home)
          </h3>

          <div className="space-y-1">
            <p className="font-semibold">Checklist de Fidelidade:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                O grid e as margens laterais correspondem exatamente à imagem?{' '}
                <strong>Não</strong> — o layout precisa espelhar{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg
                </code>
                .
              </li>
              <li>
                O alinhamento “duas laterais” está consistente em todo o scroll?{' '}
                <strong>Não</strong> — atual “salto” visual entre o final do
                Manifesto e o início dos cards.
              </li>
              <li>
                Os cards do portfólio ocupam toda a largura horizontal sem gaps?{' '}
                <strong>Não</strong> — o mosaico ainda não preenche 100% da
                largura útil com larguras variáveis e alturas equalizadas por
                linha.
              </li>
              <li>
                A animação de parallax e hover segue a fluidez do CodePen
                referência? <strong>Não</strong> — precisa replicar precisamente
                profundidade, easing e latência do CodePen.
              </li>
              <li>
                O mobile está livre de overflow horizontal e com touch targets
                adequados? <strong>Não</strong> — existe pendência explícita
                para centralizar textos/CTAs e evitar tap targets pequenos.
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Inconsistências principais:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Cards não compartilham sempre a mesma altura por linha,
                quebrando a “barra ótica” Ghost.
              </li>
              <li>
                Grid não parece derivar de um sistema matemático único (colunas
                e gutters) compartilhado com o restante da página.
              </li>
              <li>
                Em mobile, textos/CTAs desalinhados e possível overflow
                horizontal em projeções mais largas.
              </li>
            </ul>
          </div>
        </section>

        {/* 2.4 About (Origin / Method / What I Do) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            2.4 About (Origin / Method / What I Do)
          </h3>

          <div className="space-y-1">
            <p className="font-semibold">Checklist de Fidelidade:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                O grid e as margens laterais correspondem exatamente à imagem?{' '}
                <strong>Não</strong> — seções como{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  AboutOrigin.tsx
                </code>{' '}
                e{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  AboutMethod.tsx
                </code>{' '}
                ainda precisam ser rigidamente alinhadas ao mesmo container da
                Home.
              </li>
              <li>
                O alinhamento “duas laterais” está consistente em todo o scroll?{' '}
                <strong>Não</strong> — especialmente na transição entre Origin →
                Method → What I Do.
              </li>
              <li>
                Os cards do portfólio ocupam toda a largura horizontal sem gaps?{' '}
                <strong>Não se aplica</strong> (seções textuais + ícones).
              </li>
              <li>
                A animação de parallax e hover segue a fluidez do CodePen
                referência? <strong>Não</strong> — as micro-animações de scroll
                e o glow roxo dos ícones circulares em{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  AboutWhatIDo.tsx
                </code>{' '}
                ainda precisam ser calibradas.
              </li>
              <li>
                O mobile está livre de overflow horizontal e com touch targets
                adequados? <strong>Não</strong> — o texto do About Hero (H3)
                requer fonte branca para legibilidade e a hierarquia tipográfica
                Ghost.
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Inconsistências principais:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>About Hero</strong>: subtítulo/h3 não visível o
                suficiente sobre o background; necessidade explícita de usar
                fonte branca.
              </li>
              <li>
                <strong>About Closed</strong> (
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  AboutClosing.tsx
                </code>
                ): falta troca dinâmica de vídeo Desktop vs Mobile via URLs do
                Supabase.
              </li>
              <li>
                <strong>Origin / Method</strong>: animações de entrada on scroll
                ainda não seguem uma curva premium (sem bounce exagerado, sem
                jitter).
              </li>
              <li>
                <strong>What I Do</strong>: glow roxo e ícones circulares ainda
                não replicam exatamente o look and feel Ghost.
              </li>
            </ul>
          </div>
        </section>

        {/* 2.5 Portfolio Grid (/portfolio) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            2.5 Portfolio Grid (/portfolio)
          </h3>

          <div className="space-y-1">
            <p className="font-semibold">Checklist de Fidelidade:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                O grid e as margens laterais correspondem exatamente à imagem?{' '}
                <strong>Não</strong> — a página de Portfólio deve seguir a mesma
                largura útil e margens da Home e das imagens em{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  docs/PORTFOLIO
                </code>
                .
              </li>
              <li>
                O alinhamento “duas laterais” está consistente em todo o scroll?{' '}
                <strong>Não</strong> — há risco de variação entre o Hero da
                página e o grid/mosaico.
              </li>
              <li>
                Os cards do portfólio ocupam toda a largura horizontal sem gaps?{' '}
                <strong>Não</strong> — o mosaico em{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  PortfolioMosaicGrid.tsx
                </code>{' '}
                e <code>PortfolioCard.tsx</code> não está explicitamente
                descrito como preenchendo 100% da largura útil com alturas
                equalizadas.
              </li>
              <li>
                A animação de parallax e hover segue a fluidez do CodePen
                referência? <strong>Não</strong> — ainda não há menção de
                replicação fiel do CodePen de referência.
              </li>
              <li>
                O mobile está livre de overflow horizontal e com touch targets
                adequados? <strong>Não</strong> — cartões e filtros (
                <code>CategoryFilter.tsx</code>) precisam ser validados para
                evitar scroll lateral e tap impreciso.
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Inconsistências principais:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Cards não garantem a mesma altura vertical por linha em todas as
                quebras de layout.
              </li>
              <li>
                Mídias (imagem/vídeo) dentro de <code>PortfolioCard.tsx</code>{' '}
                não estão explicitamente centralizadas/crocadas para preencher o
                card independentemente da proporção.
              </li>
              <li>
                Parallax e hover ainda não replicam a sensação “3D card stack”
                do CodePen.
              </li>
            </ul>
          </div>
        </section>
      </section>

      {/* 3️⃣ Lista de Problemas (Severidade) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          3️⃣ Lista de Problemas (Severidade 🔴🟡🟢)
        </h2>

        <ul className="space-y-1">
          <li>
            🔴{' '}
            <strong>P1 — Grid global e margens laterais inconsistentes</strong>:
            falta de um único sistema de colunas/gutters aplicado em Home, Sobre
            e Portfólio (RootLayout + Container).
          </li>
          <li>
            🔴{' '}
            <strong>
              P2 — Layout do grid de portfólio (Home + /portfolio)
            </strong>
            : cards não ocupam 100% da largura, alturas não equalizadas por
            linha, e alinhamento visual divergente da referência Ghost.
          </li>
          <li>
            🔴 <strong>P3 — Mobile crítico (Header + Featured Projects)</strong>
            : problemas de clique no Header, CTAs e textos não centralizados na
            seção de projetos em destaque e risco de overflow horizontal.
          </li>
          <li>
            🔴 <strong>P4 — Legibilidade no About Hero</strong>: subtítulo/h3
            precisa ser branco e seguir a escala tipográfica Ghost para
            contraste adequado.
          </li>
          <li>
            🔴 <strong>P5 — Vídeo dinâmico em About Closed</strong>: ausência
            (ou não finalização) da troca automática Desktop vs Mobile usando
            URLs do Supabase.
          </li>
          <li>
            🟡 <strong>P6 — Animações Framer Motion fora da curva Ghost</strong>
            : timings/easings com bounce/scale possivelmente exagerados em
            relação à especificação premium.
          </li>
          <li>
            🟡 <strong>P7 — Falta de parallax de profundidade nos cards</strong>
            : interações de hover/scroll do portfólio não reproduzem o CodePen
            referência.
          </li>
          <li>
            🟡{' '}
            <strong>
              P8 — Áudio do Manifesto acoplado de forma rudimentar
            </strong>
            : falta lógica clara de auto-mute/unmute com base em scroll e
            visibilidade da seção.
          </li>
          <li>
            🟡{' '}
            <strong>
              P9 — About Origin/Method/What I Do sem refinamento fino
            </strong>
            : scroll animations, glow roxo e ícones circulares ainda aquém do
            desejo Ghost.
          </li>
          <li>
            🟢{' '}
            <strong>P10 — Uso inconsistente de Container/ClientLayout</strong>:
            oportunidade de centralizar todas as páginas no mesmo componente de
            grid para reduzir divergências.
          </li>
          <li>
            🟢 <strong>P11 — Redução de movimento</strong>: adicionar fallback
            suave para usuários com{' '}
            <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
              prefers-reduced-motion
            </code>{' '}
            nas animações de hover/parallax.
          </li>
          <li>
            🟢 <strong>P12 — Otimização de mídia</strong>: garantir lazy loading
            inteligente e placeholders no grid de portfólio, sem alterar o
            layout canônico.
          </li>
        </ul>
      </section>

      {/* 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos) */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)
        </h2>

        <div className="space-y-8">
          {/* Prompt 01 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #01 — Unificar grid global e margens laterais
            </h3>
            <p>
              <strong>Objetivo:</strong> Garantir que Home, Sobre e Portfólio
              usem exatamente o mesmo container (largura útil, gutters e
              paddings) para obter alinhamento “duas laterais” perfeito em todo
              o scroll.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/layout.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/layout/ClientLayout.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/layout/Container.tsx
              </code>
              , todas as páginas de topo (
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/page.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/sobre/page.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/portfolio/page.tsx
              </code>
              ).
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Padronizar um único componente <code>Container</code> com
                Tailwind (ex.:{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  mx-auto max-w-screen-xl px-4 md:px-6
                </code>
                ) para refletir exatamente o grid das imagens Ghost.
              </li>
              <li>
                Garantir que todas as seções principais de Home, Sobre e
                Portfólio sejam diretamete embrulhadas por esse{' '}
                <code>Container</code>, sem paddings laterais adicionais em cada
                seção.
              </li>
              <li>
                Ajustar{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  ClientLayout
                </code>{' '}
                (se usado) para não duplicar margens/paddings já definidos em{' '}
                <code>Container</code>.
              </li>
              <li>
                Confirmar que{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  globals.css
                </code>{' '}
                e Tailwind estão corretamente importados em{' '}
                <code>layout.tsx</code>, conforme o padrão do App Router e
                Tailwind v3.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Mobile-first, apenas ajustes de layout
              (sem alterar textos), manter o grid idêntico às imagens em{' '}
              <code>docs/HOME</code>, <code>docs/SOBRE</code> e{' '}
              <code>docs/PORTFOLIO</code>.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Ao rolar de cima a baixo em
              /, /sobre e /portfolio, as bordas esquerda/direita de títulos,
              textos e cards mantêm alinhamento perfeito; o item “grid e margens
              laterais correspondem exatamente à imagem?” pode ser marcado como{' '}
              <strong>Sim</strong> para todas as seções.
            </p>
          </article>

          {/* Prompt 02 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #02 — Corrigir Header e comportamento de clique em
              mobile
            </h3>
            <p>
              <strong>Objetivo:</strong> Garantir que o Header tenha área de
              clique/touch consistente, sem interferência na rolagem ou nos CTAs
              em mobile.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/layout/Header.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/layout/header/*
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/layout.tsx
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Revisar estrutura de nav e botões de menu (hamburger) para
                garantir que nenhum elemento overlay capture cliques fora da
                área esperada.
              </li>
              <li>
                Em mobile, assegurar que cada item de navegação tenha área
                mínima de 44×44px (via Tailwind, ex.:{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  px-3 py-2
                </code>
                ).
              </li>
              <li>
                Validar se existe algum{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  pointer-events
                </code>{' '}
                indevido em wrappers do Header que interfiram em cliques no Hero
                e nas seções abaixo.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não alterar o conteúdo textual nem
              adicionar links novos; apenas ajustar estrutura e classes
              Tailwind.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Em dispositivos touch, todos
              os links do Header respondem com precisão, sem áreas “mortas” ou
              cliques acidentais; nenhum overflow horizontal é introduzido pelo
              Header; o item “mobile livre de overflow e com touch targets
              adequados?” pode ser marcado como <strong>Sim</strong> para Home.
            </p>
          </article>

          {/* Prompt 03 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #03 — Travar Home Hero + GhostScene na referência
              HERO.jpg
            </h3>
            <p>
              <strong>Objetivo:</strong> Ajustar tipografia, espaçamento e cena
              3D do Hero para ficar 1:1 com <code>docs/HOME/HERO.jpg</code> e o
              blueprint Ghost.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/home/hero/*
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/canvas/home/hero/GhostScene.tsx
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Equalizar hierarquia tipográfica (h1, h2/h3, body) com o
                blueprint, ajustando apenas classes Tailwind (weights, tracking,
                line-height), sem alterar o texto.
              </li>
              <li>
                Revisar espaçamentos verticais entre título/subtítulo/CTA para
                que as distâncias visuais coincidam com a imagem de referência.
              </li>
              <li>
                Em <code>GhostScene.tsx</code>, ajustar posição, escala e
                intensidade de luz/materiais para obter o mesmo enquadramento e
                “glow” do Ghost na HERO.jpg.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não mexer no copy; qualquer ajuste 3D
              deve preservar performance (usar{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                useFrame
              </code>{' '}
              apenas quando necessário e memoizar materiais).
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Comparando a Home Hero com{' '}
              <code>docs/HOME/HERO.jpg</code>, espaçamentos, tipografia e
              enquadramento do Ghost são indistinguíveis a olho nu; parallax
              leve do Ghost permanece suave, sem jitter.
            </p>
          </article>

          {/* Prompt 04 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #04 — Manifesto: áudio + scroll e grid alinhado
            </h3>
            <p>
              <strong>Objetivo:</strong> Fazer o Manifesto respeitar o grid
              global e implementar lógica de áudio que auto-mute/unmute conforme
              a seção entra/sai da viewport.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/home/hero/*
              </code>{' '}
              (se Manifesto estiver acoplado), módulo específico de Manifesto
              (onde o player é usado).
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Garantir que o container do Manifesto esteja dentro do mesmo{' '}
                <code>Container</code> global, sem paddings extras.
              </li>
              <li>
                Implementar observer de scroll (ex.:{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  IntersectionObserver
                </code>{' '}
                no client) para mutar o áudio quando a seção estiver abaixo de
                um certo threshold de visibilidade.
              </li>
              <li>
                Em desktop, permitir que o áudio inicie ao entrar na seção; em
                mobile, respeitar a necessidade de interação explícita do
                usuário para iniciar áudio.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não alterar o conteúdo do Manifesto;
              manter a UI atual, refinando apenas comportamento e layout.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Manifesto ocupa a mesma
              largura da Hero/Featured Projects; áudio nunca continua tocando
              enquanto a seção está completamente fora de viewport; o checklist
              de grid/alinhamento e mobile pode ser marcado como{' '}
              <strong>Sim</strong> para Manifesto.
            </p>
          </article>

          {/* Prompt 05 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #05 — Featured Projects: grid 100% horizontal e
              mobile centrado
            </h3>
            <p>
              <strong>Objetivo:</strong> Fazer os cards de projetos em destaque
              preencherem 100% da largura do container, com alturas equalizadas
              por linha e CTAs/textos centralizados em mobile.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/home/featured-projects/*
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Modelar o grid com Tailwind usando combinações de{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  grid-cols-*
                </code>{' '}
                e <code>auto-fit / auto-fill</code> (ou flex com{' '}
                <code>flex-[x]</code>) para reproduzir a distribuição de
                larguras da referência, sem espaços vazios.
              </li>
              <li>
                Garantir que todos os cards de uma mesma linha compartilhem a
                mesma altura (via{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  items-stretch
                </code>{' '}
                + conteúdo interno com{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  h-full
                </code>
                ).
              </li>
              <li>
                Em mobile, centralizar títulos/descrições/CTAs dos cards e
                revisar paddings para remover qualquer overflow horizontal.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Mobile-first; sem alterar textos;
              comparação constante com{' '}
              <code>docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg</code> e{' '}
              <code>docs/HOME/HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg</code>.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Não há gaps horizontais no
              fim de nenhuma linha; todos os cards têm mesma altura visual por
              linha; em mobile, os CTAs ficam centralizados e facilmente
              clicáveis.
            </p>
          </article>

          {/* Prompt 06 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #06 — Portfólio (/portfolio): Mosaic Grid + parallax
              estilo CodePen
            </h3>
            <p>
              <strong>Objetivo:</strong> Ajustar o grid de{' '}
              <code>/portfolio</code> para preencher 100% da largura, equalizar
              alturas por linha e implementar parallax/hover inspirado no
              CodePen de referência.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/portfolio/page.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/PortfolioMosaicGrid.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/MosaicCard.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/PortfolioCard.tsx
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Refatorar <code>PortfolioMosaicGrid</code> para calcular
                larguras relativas por linha (ex.: colunas flex com{' '}
                <code>basis-*</code> e <code>grow</code>) de forma a sempre
                fechar 100% da largura do container.
              </li>
              <li>
                Garantir que todos os cards de uma mesma linha tenham altura
                igual (via{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  h-full
                </code>{' '}
                + wrappers internos com{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  flex flex-col
                </code>{' '}
                e{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  justify-between
                </code>
                ).
              </li>
              <li>
                Implementar animações de hover/parallax nos cards usando Framer
                Motion (ex.: leve{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  translateZ
                </code>{' '}
                em perspectiva simulada, com easing{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  cubic-bezier(0.22, 1, 0.36, 1)
                </code>
                ) para aproximar o efeito do CodePen.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não alterar estrutura de conteúdo dos
              cards (título, descrição, tags); apenas layout e motion.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Qualquer linha de cards
              ocupa 100% da largura do container; nenhuma linha apresenta gaps
              residuais; hover/parallax são fluidos, sem overshoot ou bounce
              exagerado, replicando a fluidez do CodePen.
            </p>
          </article>

          {/* Prompt 07 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #07 — About Hero (tipografia) + About Closed (vídeo
              Supabase)
            </h3>
            <p>
              <strong>Objetivo:</strong> Corrigir a visibilidade do texto em
              About Hero e implementar troca dinâmica de vídeo Desktop/Mobile em
              About Closed usando URLs do Supabase.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/AboutHero.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/AboutClosing.tsx
              </code>
              , configuração Supabase (cliente utilitário).
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Em <code>AboutHero</code>, aplicar classes Tailwind para que o
                subtítulo/h3 use cor branca e contraste adequado sobre o
                background, respeitando a escala tipográfica Ghost.
              </li>
              <li>
                Identificar no Supabase as chaves/URLs de vídeo para Desktop e
                Mobile (por ex.: colunas{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  about_closed_desktop_url
                </code>{' '}
                e{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  about_closed_mobile_url
                </code>
                ).
              </li>
              <li>
                Em <code>AboutClosing</code>, implementar lógica client-side
                (hook de breakpoint ou{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  matchMedia
                </code>
                ) para escolher a URL correta no player de vídeo sem duplicar o
                componente.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não mudar o texto dos títulos; apenas
              cores/tailwind para visibilidade e seleção dinâmica de mídia.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Em qualquer breakpoint, o
              subtítulo de About Hero é claramente legível; o About Closed
              carrega automaticamente a versão de vídeo adequada ao viewport
              (Desktop vs Mobile), sem que o usuário perceba troca de layout.
            </p>
          </article>

          {/* Prompt 08 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #08 — About Origin / Method / What I Do: scroll
              animations e glow roxo
            </h3>
            <p>
              <strong>Objetivo:</strong> Refinar animações de scroll em Origin e
              Method e implementar/ajustar glow roxo + ícones redondos em What I
              Do, seguindo a especificação Ghost.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/AboutOrigin.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/AboutMethod.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/AboutWhatIDo.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/motion.ts
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Centralizar as variantes do Framer Motion em{' '}
                <code>motion.ts</code> com um set de easings premium (por
                exemplo, curvas suaves sem overshoot) e reutilizá-las em todas
                as seções.
              </li>
              <li>
                Em Origin/Method, disparar animações apenas quando o bloco
                estiver parcialmente visível (ex.: 25–30% em viewport) para
                evitar disparos prematuros.
              </li>
              <li>
                Em What I Do, ajustar o glow roxo para que o efeito seja suave,
                sem serrilhado, e centralizar os ícones em círculos perfeitos,
                respeitando o grid lateral.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não alterar textos; evitar qualquer
              animação que cause “bounce” exagerado ou fadiga visual.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> As animações de entrada
              seguem o mesmo timing e easing em todas as seções; o glow roxo nos
              ícones é sutil mas perceptível, alinhado ao look Ghost; o item
              “animação de parallax/hover segue a fluidez Ghost?” pode ser
              marcado como <strong>Sim</strong> para essas seções.
            </p>
          </article>

          {/* Prompt 09 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #09 — Centralização absoluta de mídia nos cards de
              portfólio
            </h3>
            <p>
              <strong>Objetivo:</strong> Garantir que todas as imagens e vídeos
              dentro dos cards de portfólio estejam sempre centralizados e
              preencham o card de forma consistente, independentemente da
              proporção.
            </p>
            <p>
              <strong>Arquivos:</strong>{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/PortfolioCard.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/ProjectsGallery.tsx
              </code>
              .
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Envolver a mídia (img/video) em um wrapper com{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  relative overflow-hidden
                </code>{' '}
                e altura fixa ou proporcional à linha (para suportar alturas
                equalizadas).
              </li>
              <li>
                Definir mídia com{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  object-cover object-center w-full h-full
                </code>{' '}
                para garantir que sempre preencha o espaço sem distorção.
              </li>
              <li>
                Validar casos extremos de proporção (super wide vs super
                vertical) para garantir que o recorte preserve a parte visual
                mais importante do conteúdo.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não alterar textos ou ordem de
              informações do card; apenas o container de mídia.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Nenhum card mostra barras
              pretas/brancas laterais ou em cima/baixo; todas as mídias parecem
              perfeitamente centradas e recortadas, mantendo a altura dos cards
              uniforme por linha.
            </p>
          </article>

          {/* Prompt 10 */}
          <article className="space-y-2">
            <h3 className="font-semibold">
              ### 🛠️ Prompt #10 — Eliminar overflow horizontal e validar touch
              targets em todo o site
            </h3>
            <p>
              <strong>Objetivo:</strong> Garantir que todas as páginas estejam
              livres de scroll horizontal acidental e que todos os CTAs/cards
              tenham zonas de toque confortáveis em mobile.
            </p>
            <p>
              <strong>Arquivos:</strong> Páginas principais (
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/page.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/sobre/page.tsx
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/app/portfolio/page.tsx
              </code>
              ), componentes de seções (
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/home/*
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/sobre/*
              </code>
              ,{' '}
              <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                src/components/portfolio/*
              </code>
              ).
            </p>
            <p>
              <strong>Ações:</strong>
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>
                Auditar todos os wrappers horizontais (carrosséis, grids) para
                remover larguras fixas que ultrapassem <code>100vw</code> em
                mobile.
              </li>
              <li>
                Garantir que todos os botões/links tenham{' '}
                <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
                  px-3 py-2
                </code>{' '}
                ou superior em mobile, mantendo a identidade Ghost.
              </li>
              <li>
                Testar manualmente em breakpoints principais (sm/md/lg) para
                confirmar ausência total de scroll horizontal.
              </li>
            </ol>
            <p>
              <strong>Regras:</strong> Não remover seções para resolver
              overflow; a correção deve ser via layout/responsividade.
            </p>
            <p>
              <strong>Critérios de Aceite:</strong> Nenhuma página apresenta
              scroll horizontal em qualquer breakpoint; todos os CTAs e cards
              são facilmente clicáveis em touchscreen; o item “mobile livre de
              overflow e com touch targets adequados?” pode ser marcado como{' '}
              <strong>Sim</strong> em todas as seções.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default GhostPortfolioAuditReport;
