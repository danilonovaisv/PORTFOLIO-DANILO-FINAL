/**
 * Google Antigravity Manager Prompts
 * Sistema de prompts atômicos para orquestração de correções no portfólio
 * Ghost System v3.0
 */

// ==========================================
// TYPES
// ==========================================

export type PromptSeverity = 'critical' | 'high' | 'medium' | 'low';
export type PromptStatus = 'pending' | 'in_progress' | 'completed' | 'failed';
export type PromptCategory =
  | 'layout'
  | 'mobile'
  | 'motion'
  | 'accessibility'
  | 'performance';

export interface AtomicPrompt {
  id: string;
  title: string;
  severity: PromptSeverity;
  category: PromptCategory;
  objective: string;
  files: string[];
  actions: string[];
  rules: string[];
  acceptanceCriteria: string[];
  status: PromptStatus;
  dependsOn?: string[];
}

export interface PromptWave {
  id: string;
  name: string;
  description: string;
  prompts: AtomicPrompt[];
}

// ==========================================
// ATOMIC PROMPTS (10 Prompts do Relatório de Auditoria)
// ==========================================

export const ATOMIC_PROMPTS: AtomicPrompt[] = [
  {
    id: 'PROMPT_01',
    title: 'Unificar grid global e margens laterais',
    severity: 'critical',
    category: 'layout',
    objective:
      'Garantir que Home, Sobre e Portfólio usem exatamente o mesmo container (largura útil, gutters e paddings) para obter alinhamento "duas laterais" perfeito em todo o scroll.',
    files: [
      'src/app/layout.tsx',
      'src/components/layout/ClientLayout.tsx',
      'src/components/layout/Container.tsx',
      'src/app/page.tsx',
      'src/app/sobre/page.tsx',
      'src/app/portfolio/page.tsx',
    ],
    actions: [
      'Padronizar um único componente Container com Tailwind (ex.: mx-auto max-w-screen-xl px-4 md:px-6) para refletir exatamente o grid das imagens Ghost.',
      'Garantir que todas as seções principais de Home, Sobre e Portfólio sejam diretamente embrulhadas por esse Container, sem paddings laterais adicionais em cada seção.',
      'Ajustar ClientLayout (se usado) para não duplicar margens/paddings já definidos em Container.',
      'Confirmar que globals.css e Tailwind estão corretamente importados em layout.tsx.',
    ],
    rules: [
      'Mobile-first',
      'Apenas ajustes de layout (sem alterar textos)',
      'Manter o grid idêntico às imagens em docs/HOME, docs/SOBRE e docs/PORTFOLIO',
    ],
    acceptanceCriteria: [
      'Ao rolar de cima a baixo em /, /sobre e /portfolio, as bordas esquerda/direita de títulos, textos e cards mantêm alinhamento perfeito',
      'O item "grid e margens laterais correspondem exatamente à imagem?" pode ser marcado como Sim para todas as seções',
    ],
    status: 'pending',
  },
  {
    id: 'PROMPT_02',
    title: 'Corrigir Header e comportamento de clique em mobile',
    severity: 'critical',
    category: 'mobile',
    objective:
      'Garantir que o Header tenha área de clique/touch consistente, sem interferência na rolagem ou nos CTAs em mobile.',
    files: [
      'src/components/layout/Header.tsx',
      'src/components/layout/header/*',
      'src/app/layout.tsx',
    ],
    actions: [
      'Revisar estrutura de nav e botões de menu (hamburger) para garantir que nenhum elemento overlay capture cliques fora da área esperada.',
      'Em mobile, assegurar que cada item de navegação tenha área mínima de 44×44px (via Tailwind, ex.: px-3 py-2).',
      'Validar se existe algum pointer-events indevido em wrappers do Header que interfiram em cliques no Hero e nas seções abaixo.',
    ],
    rules: [
      'Não alterar o conteúdo textual nem adicionar links novos',
      'Apenas ajustar estrutura e classes Tailwind',
    ],
    acceptanceCriteria: [
      'Em dispositivos touch, todos os links do Header respondem com precisão, sem áreas "mortas" ou cliques acidentais',
      'Nenhum overflow horizontal é introduzido pelo Header',
      'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim para Home',
    ],
    status: 'pending',
  },
  {
    id: 'PROMPT_03',
    title: 'Travar Home Hero + GhostScene na referência HERO.jpg',
    severity: 'critical',
    category: 'layout',
    objective:
      'Ajustar tipografia, espaçamento e cena 3D do Hero para ficar 1:1 com docs/HOME/HERO.jpg e o blueprint Ghost.',
    files: [
      'src/components/home/hero/*',
      'src/components/canvas/home/hero/GhostScene.tsx',
    ],
    actions: [
      'Equalizar hierarquia tipográfica (h1, h2/h3, body) com o blueprint, ajustando apenas classes Tailwind (weights, tracking, line-height), sem alterar o texto.',
      'Revisar espaçamentos verticais entre título/subtítulo/CTA para que as distâncias visuais coincidam com a imagem de referência.',
      'Em GhostScene.tsx, ajustar posição, escala e intensidade de luz/materiais para obter o mesmo enquadramento e "glow" do Ghost na HERO.jpg.',
    ],
    rules: [
      'Não mexer no copy',
      'Qualquer ajuste 3D deve preservar performance (usar useFrame apenas quando necessário e memoizar materiais)',
    ],
    acceptanceCriteria: [
      'Comparando a Home Hero com docs/HOME/HERO.jpg, espaçamentos, tipografia e enquadramento do Ghost são indistinguíveis a olho nu',
      'Parallax leve do Ghost permanece suave, sem jitter',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_01'],
  },
  {
    id: 'PROMPT_04',
    title: 'Manifesto: áudio + scroll e grid alinhado',
    severity: 'high',
    category: 'motion',
    objective:
      'Fazer o Manifesto respeitar o grid global e implementar lógica de áudio que auto-mute/unmute conforme a seção entra/sai da viewport.',
    files: [
      'src/components/home/hero/*',
      'src/components/home/ManifestoSection.tsx',
    ],
    actions: [
      'Garantir que o container do Manifesto esteja dentro do mesmo Container global, sem paddings extras.',
      'Implementar observer de scroll (ex.: IntersectionObserver no client) para mutar o áudio quando a seção estiver abaixo de um certo threshold de visibilidade.',
      'Em desktop, permitir que o áudio inicie ao entrar na seção; em mobile, respeitar a necessidade de interação explícita do usuário para iniciar áudio.',
    ],
    rules: [
      'Não alterar o conteúdo do Manifesto',
      'Manter a UI atual, refinando apenas comportamento e layout',
    ],
    acceptanceCriteria: [
      'Manifesto ocupa a mesma largura da Hero/Featured Projects',
      'Áudio nunca continua tocando enquanto a seção está completamente fora de viewport',
      'O checklist de grid/alinhamento e mobile pode ser marcado como Sim para Manifesto',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_01'],
  },
  {
    id: 'PROMPT_05',
    title: 'Featured Projects: grid 100% horizontal e mobile centrado',
    severity: 'critical',
    category: 'layout',
    objective:
      'Fazer os cards de projetos em destaque preencherem 100% da largura do container, com alturas equalizadas por linha e CTAs/textos centralizados em mobile.',
    files: ['src/components/home/featured-projects/*'],
    actions: [
      'Modelar o grid com Tailwind usando combinações de grid-cols-* e auto-fit/auto-fill (ou flex com flex-[x]) para reproduzir a distribuição de larguras da referência, sem espaços vazios.',
      'Garantir que todos os cards de uma mesma linha compartilhem a mesma altura (via items-stretch + conteúdo interno com h-full).',
      'Em mobile, centralizar títulos/descrições/CTAs dos cards e revisar paddings para remover qualquer overflow horizontal.',
    ],
    rules: [
      'Mobile-first',
      'Sem alterar textos',
      'Comparação constante com docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg e docs/HOME/HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg',
    ],
    acceptanceCriteria: [
      'Não há gaps horizontais no fim de nenhuma linha',
      'Todos os cards têm mesma altura visual por linha',
      'Em mobile, os CTAs ficam centralizados e facilmente clicáveis',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_01'],
  },
  {
    id: 'PROMPT_06',
    title: 'Portfólio (/portfolio): Mosaic Grid + parallax estilo CodePen',
    severity: 'critical',
    category: 'layout',
    objective:
      'Ajustar o grid de /portfolio para preencher 100% da largura, equalizar alturas por linha e implementar parallax/hover inspirado no CodePen de referência.',
    files: [
      'src/app/portfolio/page.tsx',
      'src/components/portfolio/PortfolioMosaicGrid.tsx',
      'src/components/portfolio/MosaicCard.tsx',
      'src/components/portfolio/PortfolioCard.tsx',
    ],
    actions: [
      'Refatorar PortfolioMosaicGrid para calcular larguras relativas por linha (ex.: colunas flex com basis-* e grow) de forma a sempre fechar 100% da largura do container.',
      'Garantir que todos os cards de uma mesma linha tenham altura igual (via h-full + wrappers internos com flex flex-col e justify-between).',
      'Implementar animações de hover/parallax nos cards usando Framer Motion (ex.: leve translateZ em perspectiva simulada, com easing cubic-bezier(0.22, 1, 0.36, 1)) para aproximar o efeito do CodePen.',
    ],
    rules: [
      'Não alterar estrutura de conteúdo dos cards (título, descrição, tags)',
      'Apenas layout e motion',
    ],
    acceptanceCriteria: [
      'Qualquer linha de cards ocupa 100% da largura do container',
      'Nenhuma linha apresenta gaps residuais',
      'Hover/parallax são fluidos, sem overshoot ou bounce exagerado, replicando a fluidez do CodePen',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_01'],
  },
  {
    id: 'PROMPT_07',
    title: 'About Hero (tipografia) + About Closed (vídeo Supabase)',
    severity: 'critical',
    category: 'accessibility',
    objective:
      'Corrigir a visibilidade do texto em About Hero e implementar troca dinâmica de vídeo Desktop/Mobile em About Closed usando URLs do Supabase.',
    files: [
      'src/components/sobre/AboutHero.tsx',
      'src/components/sobre/AboutClosing.tsx',
    ],
    actions: [
      'Em AboutHero, aplicar classes Tailwind para que o subtítulo/h3 use cor branca e contraste adequado sobre o background, respeitando a escala tipográfica Ghost.',
      'Identificar no Supabase as chaves/URLs de vídeo para Desktop e Mobile (por ex.: colunas about_closed_desktop_url e about_closed_mobile_url).',
      'Em AboutClosing, implementar lógica client-side (hook de breakpoint ou matchMedia) para escolher a URL correta no player de vídeo sem duplicar o componente.',
    ],
    rules: [
      'Não mudar o texto dos títulos',
      'Apenas cores/tailwind para visibilidade e seleção dinâmica de mídia',
    ],
    acceptanceCriteria: [
      'Em qualquer breakpoint, o subtítulo de About Hero é claramente legível',
      'O About Closed carrega automaticamente a versão de vídeo adequada ao viewport (Desktop vs Mobile), sem que o usuário perceba troca de layout',
    ],
    status: 'pending',
  },
  {
    id: 'PROMPT_08',
    title: 'About Origin / Method / What I Do: scroll animations e glow roxo',
    severity: 'medium',
    category: 'motion',
    objective:
      'Refinar animações de scroll em Origin e Method e implementar/ajustar glow roxo + ícones redondos em What I Do, seguindo a especificação Ghost.',
    files: [
      'src/components/sobre/AboutOrigin.tsx',
      'src/components/sobre/AboutMethod.tsx',
      'src/components/sobre/AboutWhatIDo.tsx',
      'src/components/sobre/motion.ts',
    ],
    actions: [
      'Centralizar as variantes do Framer Motion em motion.ts com um set de easings premium (por exemplo, curvas suaves sem overshoot) e reutilizá-las em todas as seções.',
      'Em Origin/Method, disparar animações apenas quando o bloco estiver parcialmente visível (ex.: 25–30% em viewport) para evitar disparos prematuros.',
      'Em What I Do, ajustar o glow roxo para que o efeito seja suave, sem serrilhado, e centralizar os ícones em círculos perfeitos, respeitando o grid lateral.',
    ],
    rules: [
      'Não alterar textos',
      'Evitar qualquer animação que cause "bounce" exagerado ou fadiga visual',
    ],
    acceptanceCriteria: [
      'As animações de entrada seguem o mesmo timing e easing em todas as seções',
      'O glow roxo nos ícones é sutil mas perceptível, alinhado ao look Ghost',
      'O item "animação de parallax/hover segue a fluidez Ghost?" pode ser marcado como Sim para essas seções',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_07'],
  },
  {
    id: 'PROMPT_09',
    title: 'Centralização absoluta de mídia nos cards de portfólio',
    severity: 'medium',
    category: 'layout',
    objective:
      'Garantir que todas as imagens e vídeos dentro dos cards de portfólio estejam sempre centralizados e preencham o card de forma consistente, independentemente da proporção.',
    files: [
      'src/components/portfolio/PortfolioCard.tsx',
      'src/components/portfolio/ProjectsGallery.tsx',
    ],
    actions: [
      'Envolver a mídia (img/video) em um wrapper com relative overflow-hidden e altura fixa ou proporcional à linha (para suportar alturas equalizadas).',
      'Definir mídia com object-cover object-center w-full h-full para garantir que sempre preencha o espaço sem distorção.',
      'Validar casos extremos de proporção (super wide vs super vertical) para garantir que o recorte preserve a parte visual mais importante do conteúdo.',
    ],
    rules: [
      'Não alterar textos ou ordem de informações do card',
      'Apenas o container de mídia',
    ],
    acceptanceCriteria: [
      'Nenhum card mostra barras pretas/brancas laterais ou em cima/baixo',
      'Todas as mídias parecem perfeitamente centradas e recortadas, mantendo a altura dos cards uniforme por linha',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_06'],
  },
  {
    id: 'PROMPT_10',
    title:
      'Eliminar overflow horizontal e validar touch targets em todo o site',
    severity: 'high',
    category: 'mobile',
    objective:
      'Garantir que todas as páginas estejam livres de scroll horizontal acidental e que todos os CTAs/cards tenham zonas de toque confortáveis em mobile.',
    files: [
      'src/app/page.tsx',
      'src/app/sobre/page.tsx',
      'src/app/portfolio/page.tsx',
      'src/components/home/*',
      'src/components/sobre/*',
      'src/components/portfolio/*',
    ],
    actions: [
      'Auditar todos os wrappers horizontais (carrosséis, grids) para remover larguras fixas que ultrapassem 100vw em mobile.',
      'Garantir que todos os botões/links tenham px-3 py-2 ou superior em mobile, mantendo a identidade Ghost.',
      'Testar manualmente em breakpoints principais (sm/md/lg) para confirmar ausência total de scroll horizontal.',
    ],
    rules: [
      'Não remover seções para resolver overflow',
      'A correção deve ser via layout/responsividade',
    ],
    acceptanceCriteria: [
      'Nenhuma página apresenta scroll horizontal em qualquer breakpoint',
      'Todos os CTAs e cards são facilmente clicáveis em touchscreen',
      'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim em todas as seções',
    ],
    status: 'pending',
    dependsOn: ['PROMPT_02', 'PROMPT_05', 'PROMPT_06'],
  },
];

// ==========================================
// PROMPT WAVES (Organização por Prioridade)
// ==========================================

export const PROMPT_WAVES: PromptWave[] = [
  {
    id: 'WAVE_1',
    name: 'Foundation & Critical Layout',
    description:
      'Corrigir grid global, header mobile e garantir base sólida para todas as páginas',
    prompts: ATOMIC_PROMPTS.filter((p) =>
      ['PROMPT_01', 'PROMPT_02', 'PROMPT_05', 'PROMPT_06'].includes(p.id)
    ),
  },
  {
    id: 'WAVE_2',
    name: 'Hero & 3D Calibration',
    description: 'Ajustar Hero, GhostScene e seções visuais críticas',
    prompts: ATOMIC_PROMPTS.filter((p) =>
      ['PROMPT_03', 'PROMPT_04', 'PROMPT_07'].includes(p.id)
    ),
  },
  {
    id: 'WAVE_3',
    name: 'Motion & Polish',
    description:
      'Animações refinadas, glow effects e validação final de responsividade',
    prompts: ATOMIC_PROMPTS.filter((p) =>
      ['PROMPT_08', 'PROMPT_09', 'PROMPT_10'].includes(p.id)
    ),
  },
];

// ==========================================
// MANAGER PROMPT (Para o Agent Manager)
// ==========================================

export const GOOGLE_ANTIGRAVITY_MANAGER_PROMPT = `
# Ghost Portfolio Audit Orchestrator

Você é o orquestrador principal do sistema de auditoria Ghost Portfolio.
Execute os prompts atômicos em ondas (waves), respeitando dependências.

## Contexto
- Projeto: Portfólio Danilo Novais (Ghost Era)
- Framework: Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS
- 3D: React Three Fiber + @react-three/drei
- Motion: Framer Motion
- Design System: Ghost System v3.0

## Paleta de Cores (Tokens Oficiais)
- bluePrimary: #0048ff (Cor da Marca, CTAs, Links)
- blueAccent: #4fe6ff (Brilhos Ghost, Atmosfera)
- background: #040013 (Fundo Principal - Deep Void)
- text: #fcffff (Texto Principal)
- textSecondary: #a1a3a3 (Metadados)
- purpleDetails: #8705f2 (Highlights sutis)

## Easing Padrão Ghost
cubic-bezier(0.22, 1, 0.36, 1) - easeOutExpo

## Ordem de Execução

### Wave 1: Foundation & Critical Layout
1. PROMPT_01 - Unificar grid global
2. PROMPT_02 - Corrigir Header mobile
3. PROMPT_05 - Featured Projects grid
4. PROMPT_06 - Portfolio Mosaic Grid

### Wave 2: Hero & 3D Calibration
5. PROMPT_03 - Home Hero + GhostScene
6. PROMPT_04 - Manifesto áudio + scroll
7. PROMPT_07 - About Hero + About Closed

### Wave 3: Motion & Polish
8. PROMPT_08 - About sections animations
9. PROMPT_09 - Media centralization
10. PROMPT_10 - Final overflow/touch validation

## Regras de Execução
1. Execute um prompt por vez, aguarde conclusão
2. Respeite dependências (dependsOn)
3. Após cada prompt, valide com build: pnpm run build
4. Documente mudanças no git com mensagens semânticas
5. Se um prompt falhar, registre e continue com próximo independente

## Critérios de Sucesso Global
- Zero overflow horizontal em mobile
- Grid consistente em todas as páginas
- Touch targets ≥ 44x44px
- Animações suaves sem jitter
- Build passa sem erros
`;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

export const getPromptById = (id: string): AtomicPrompt | undefined =>
  ATOMIC_PROMPTS.find((p) => p.id === id);

export const getPromptsByCategory = (
  category: PromptCategory
): AtomicPrompt[] => ATOMIC_PROMPTS.filter((p) => p.category === category);

export const getPromptsBySeverity = (
  severity: PromptSeverity
): AtomicPrompt[] => ATOMIC_PROMPTS.filter((p) => p.severity === severity);

export const getPromptWave = (waveId: string): PromptWave | undefined =>
  PROMPT_WAVES.find((w) => w.id === waveId);

export const getCriticalPrompts = (): AtomicPrompt[] =>
  ATOMIC_PROMPTS.filter((p) => p.severity === 'critical');

export const getPendingPrompts = (): AtomicPrompt[] =>
  ATOMIC_PROMPTS.filter((p) => p.status === 'pending');

export const getExecutionOrder = (): AtomicPrompt[] => {
  const executed = new Set<string>();
  const result: AtomicPrompt[] = [];

  const canExecute = (prompt: AtomicPrompt): boolean => {
    if (!prompt.dependsOn) return true;
    return prompt.dependsOn.every((dep) => executed.has(dep));
  };

  while (result.length < ATOMIC_PROMPTS.length) {
    const next = ATOMIC_PROMPTS.find(
      (p) => !executed.has(p.id) && canExecute(p)
    );
    if (next) {
      result.push(next);
      executed.add(next.id);
    } else {
      // Circular dependency or all done
      break;
    }
  }

  return result;
};

// Default export for convenience
export default {
  ATOMIC_PROMPTS,
  PROMPT_WAVES,
  GOOGLE_ANTIGRAVITY_MANAGER_PROMPT,
  getPromptById,
  getPromptsByCategory,
  getPromptsBySeverity,
  getPromptWave,
  getCriticalPrompts,
  getPendingPrompts,
  getExecutionOrder,
};
