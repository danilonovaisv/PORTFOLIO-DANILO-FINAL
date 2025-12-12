
# Auditoria & Prompts de Sessão — Home do Portfólio (Next.js + R3F + Tailwind + Framer Motion)

Visão Geral

  - Página home usa components/sections/Hero.tsx (não o components/home/
    Hero.tsx), sem o canvas 3D e com um scroll sticky de 450vh que não bate
    com o layout-alvo de 2 colunas. GLB existe em public/media/torus_dan.glb,
    mas não é carregado em nenhum lugar; o HeroGlassCanvas que renderiza a
    torus procedural está fora da página usada.
  - Referências de assets e layout estão documentadas em docs/HOME-PORTFOLIO-
    LAYOUYT_ESPERADO.jpg e docs/PORT DAN REVISADO - NEXT.pdf, mas o código
    atual diverge (alinhamento, hierarquia visual, integração Hero → Canvas →
    GLB → vídeo).
  - Globais: fonte Inter declarada no CSS mas não carregada via next/
    font; cores estão em :root, mas não há tokens aplicados nos componentes
    principais; ausência de prefers-reduced-motion em animações pesadas.

  Diagnóstico por Dimensão

  - UI/Alinhamento: Hero real é fullscreen com vídeo central; referência pede
    texto à esquerda e 3D/vídeo à direita em 2 colunas. CTA e tag lateral
    perdem o grid de alinhamento do mock. A torus 3D não aparece porque o
    canvas não é montado na versão importada.
  - UX/Fluxo: Autoplay do vídeo desmuta ao rolar (pode violar autoplay policy
    e surpreender usuários); altura de 450vh cria scroll artificial antes de
    ver o manifesto. Mobile menu não tem trap de foco e não bloqueia scroll
    do body.
  - Acessibilidade: Sem guardas para prefers-reduced-motion em framer-motion
    e R3F; vídeo sem aria complementar ou pista alternativa; foco visual do
    header só via cor; CTA não tem aria-label contextual; nav usa anchors
    cruas, sem role/aria-current.
  - Performance: Hero roda vídeo em fullscreen + animações de scroll +
    transições longas; 450vh mantém layers animando fora da viewport; ausência
    de lazy/preload seletivo do vídeo; GLB não usado (mas deve ser, com
    useGLTF + useMemo); Inter não otimizada via next/font aumenta FOUT.
  - Globais: Token ASSETS.heroAbstractModel aponta para /media/
    abstract_element.glb inexistente; app/globals.css não injeta reset/
    normalização adicional; não há breakpoints explícitos para manter colunas
    fiéis ao layout esperado.

  Análise Detalhada — Hero

  - Layout: app/page.tsx importa components/sections/Hero.tsx, que não chama
    HeroGlassCanvas. Resultado: sem orb de vidro e sem coluna direita. Precisa
    reintroduzir o canvas + GLB na metade direita mantendo texto alinhado à
    esquerda conforme HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg.
  - Integração: Pipeline esperado Hero → HeroGlassCanvas → Torus_dan.glb não
    está ativo; GLB está em public/media/torus_dan.glb, mas o componente usa
    geometria procedural e está desconectado da página.
  - Vídeo: Está em foreground fullscreen; mock indica thumb/área dedicada
    à direita, não cobrindo toda a viewport. Controle de áudio automático
    (scroll>0.01) pode quebrar autoplay e não respeita consentimento.
  - Motion: Animação de letras custom (CSS inline) sem fallback para redução
    de movimento; duração de 3000ms pode deixar texto lento em mobile e
    desalinhado com ritmo da referência.

  Lista de Problemas

  - Alta: Hero renderizado sem 3D nem GLB; layout em tela cheia não segue
    colunas da referência (components/sections/Hero.tsx, app/page.tsx).
  - Alta: GLB public/media/torus_dan.glb nunca carregado; HeroGlassCanvas
    desconectado da rota principal.
  - Alta: Vídeo auto-desmuta via scroll (useMotionValueEvent), risco de
    bloqueio/autoplay e má experiência.
  - Média: Scroll artificial de h-[450vh] com sticky pesado; degrada
    performance e não existe no mock.
  - Média: Fonte Inter não carregada via next/font; FOUT e inconsistência
    tipográfica.
  - Média: ASSETS.heroAbstractModel aponta para asset inexistente; fallback
    implícito não implementado.
  - Média: Mobile menu sem trap de foco/lock de scroll; acessibilidade
    prejudicada.
  - Baixa: Falta de prefers-reduced-motion para animações e R3F; CTA sem aria-
    label contextual; ausência de tokens globais aplicados aos componentes.

  Recomendações Prioritárias

  1. Reativar o pipeline Hero → Canvas → GLB na página real, mantendo layout 2
     colunas conforme HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg.
  2. Substituir geometria procedural pelo GLB em public/media/torus_dan.glb
     usando useGLTF, cache/memo e fallback leve.
  3. Refatorar o Hero para remover o h-[450vh] e alinhar texto/CTA/tag à
     esquerda, orb+vídeo à direita (grid responsivo).
  4. Ajustar vídeo para permanecer muted por padrão, com botão de áudio
     opcional; mover para o container direito em vez de fullscreen.
  5. Adotar next/font para Inter e aplicar tokens globais de cor/spacing;
     adicionar prefers-reduced-motion para animações principais.
  6. Corrigir ASSETS.heroAbstractModel ou removê-lo; limpar duplicação entre
     components/home/Hero.tsx e components/sections/Hero.tsx.
  7. Melhorar acessibilidade: trap de foco no menu mobile, aria-current nos
     links ativos, labels nos CTAs, e fallback textual para vídeo.

  Prompts Técnicos de Ajuste (colar no executor)

  1) Reintroduzir canvas 3D no Hero em layout 2 colunas
  - Arquivos: app/page.tsx, components/sections/Hero.tsx
  - Ação: Remover layout fullscreen/sticky e usar grid (texto à esquerda,
  canvas+vídeo à direita). Importar e renderizar <HeroGlassCanvas /> na coluna
  direita. Manter cores e textos originais. Background #F4F5F7.

  2) Carregar GLB real em vez de torus procedural
  - Arquivo: components/three/TorusDan.tsx (ou novo componente)
  - Substituir geometria procedural por:
  ```tsx
  import { useGLTF } from '@react-three/drei';
  import { useMemo } from 'react';

  const TorusDan = () => {
    const { scene } = useGLTF('/media/torus_dan.glb');
    const cloned = useMemo(() => scene.clone(), [scene]);
    return (
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <primitive object={cloned} />
      </Float>
    );
  };
  useGLTF.preload('/media/torus_dan.glb');

  - Manter MeshTransmissionMaterial se precisar aplicar material custom (usar
    traverse no clone).

  3. Vídeo alinhado à direita, sempre muted e com botão de áudio

  - Arquivo: components/sections/Hero.tsx
  - Colocar o <video> dentro da coluna direita (mesma altura que o orb),
    remover auto-unmute no scroll. Manter muted por padrão; botão toggla audio
    com estado explícito. Sem overlay/badges sobre o vídeo.

  4. Remover scroll artificial e otimizar animações

  - Arquivo: components/sections/Hero.tsx
  - Trocar h-[450vh] por altura mínima de viewport e padding top/bottom;
    remover sticky se não estiver no mock. Adicionar guardas:

  const shouldReduceMotion = useReducedMotion();
  const anim = shouldReduceMotion ? {} : { ...motionProps };

  5. Fonts e tokens globais

  - Arquivo: app/layout.tsx, app/globals.css
  - Importar Inter via next/font/google e aplicar ao body. Garantir uso de
    tokens (--color-surface-main, --color-text-main, --color-accent-blue) em
    componentes-chave (Header, Hero, CTA).

  6. Acessibilidade de navegação

  - Arquivo: components/layout/Header.tsx
  - Adicionar aria-current={link.href === '#hero' ? 'page' : undefined} onde
    aplicável, trap de foco e scroll lock no menu mobile (body overflow hidden
    enquanto aberto).


  **Reforço**
  - Use `docs/HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg` como referência visual
  absoluta e valide a estrutura com `docs/PORT DAN REVISADO - NEXT.pdf`. Não
  altere nenhum texto; apenas alinhe layout, integrações e comportamento aos
  arquivos de referência.

 
› Summarize recent commits
 
  85% context left · ? for shortcuts
