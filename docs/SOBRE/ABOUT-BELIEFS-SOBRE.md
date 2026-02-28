
# 6. O Que Me Move — "About Beliefed"


Versão: Alinhada com scroll-triggered (Motion) + PDF de referência
Status: Mantidas todas as cores e textos; ajustado apenas o detalhamento de animação de BG e entrada/saída de texto para refletir um comportamento de scroll-triggered, com entrada e reverso suave, semelhante ao exemplo https://examples.motion.dev/js/scroll-triggered.

1. VISÃO GERAL

Sessão manifesto emocional que revela o "porquê" do Ghost Design.
Objetivo: gerar vínculo, presença e diferenciação conceitual.

Altura base desktop: ~140vh
Altura mobile: fluida (>120vh)
Fundo base inicial: #040013

2. ARQUITETURA EM CAMADAS (OBRIGATÓRIO)

A sessão é estruturada em camadas independentes para controle de animação, scroll-triggered e reset.

| Camada | Responsabilidade                               | Observação |
|--------|-----------------------------------------------|-----------|
| Camada 0 — Background Layer | Responsável por troca de cores | Fica abaixo de tudo, controlada via scroll progress com interpolação suave; animação sempre reversível (scroll para cima/baixo), sem repaints bruscos |
| Camada 1 — Background Overlay Transition Layer | Camada auxiliar para transição crossfade entre cores | Evita flicker; opacity animada sincronizada com a entrada e a saída das frases, em resposta ao scroll |
| Camada 2 — BeliefFixedHeader (Sticky) | Header fixo no topo | z-index acima do BG; independente das trocas de cor; frase sai sincronizada com a saída do último texto animado; não participa do morph final |
| Camada 3 — Texto Rotativo | Textos animados que rotacionam | Vive dentro do container principal; controla o timing da troca de cores; cada frase é um elemento observado (tipo .scroll-section pre), entrando e saindo com animação de opacity + transform gatilhada por scroll |
| Camada 4 — Manifesto Final (Morphing Layer) | Texto final "ISSO É GHOST DESIGN" | Aparece no clímax, acima do Ghost; controla intensificação do Ghost |
| Camada 5 — Ghost 3D (Canvas Layer) | Modelo 3D do Ghost | z-index acima do BG e de todos os textos; alinhado ao centro do texto (não da viewport); nunca absoluto na viewport; obedece o container pai |

3. SISTEMA DE TROCA DE CORES DO BACKGROUND

3.1 Paleta Sequencial

Ordem obrigatória de cores (mantida):

bg-bluePrimary (hsl(230, 85%, 30%))
bg-purpleDetails (hsl(270, 80%, 40%))
bg-pinkDetails (hsl(330, 85%, 50%))
bg-bluePrimary
bg-purpleDetails
bg-pinkDetails
bg-bluePrimary (retorna ao início)

A troca de fundo não é uma transição discreta (jump de uma cor para outra), mas um sistema de interpolação contínua controlada por scroll progress, usando duas camadas (Camada 0 + Camada 1) trabalhando em conjunto para criar um efeito de absorção emocional, em sincronia com a entrada e saída das frases — tal como no exemplo de scroll-triggered do Motion, onde o elemento entra quando entra no viewport e volta ao estado inicial ao sair.

✅ Tipo de animação (BG):
  Interpolação contínua de cor em HSL + crossfade overlay
  Totalmente bidirecional (subir/descer scroll restaura estados)
  Temporalmente vinculada à visibilidade do texto (entrada/saída), não a timers fixos

3.2 Estrutura de Camadas (BG)

| Camada  | Papel                                  | Animação (scroll-triggered) |
|---------|----------------------------------------|-----------------------------|
| Camada 0 (bg-layer) | Fundo base — recebe a cor final interpolada | backgroundColor interpolado em HSL, controlado por scrollProgress ou scrollYProgress da área de manifesto |
| Camada 1 (overlay-layer) | Camada de transição — evita flicker e cortes bruscos | opacity: 0 → 1 → 0 sincronizada com entrada/saída de cada frase; atua como um fade over suave entre cores consecutivas |

A Camada 0 guarda o estado “estável” de cor da sessão.
A Camada 1 é usada durante a transição entre cores, acompanhando o intervalo em que a nova frase entra em cena (fade-in) e a anterior sai (fade-out / deslocamento).
📌 A Camada 1 é obrigatória: sem ela, a troca de cor pode causar flash/jank em Safari/Android, especialmente quando o scroll é rápido ou os elementos entram e saem do viewport com muita frequência.

3.3 Lógica de Interpolação (Core do Sistema)

A cor não muda de forma instantânea (#253EFF → #8A00FF), mas por interpolação linear entre duas cores, controlada pelo progresso do bloco de frase — seguindo a mesma lógica do exemplo de scroll-triggered da Motion: quando o elemento entra em viewport, animamos de um estado inicial para um final; quando sai, revertemos para o estado inicial.

Fórmula geral

const t = clamp((scrollProgress - start) / duration, 0, 1) // 0 → 1 dentro do bloco
const color = lerp(colorPrev, colorNext, ease(t))

start: início do bloco (ex: 0.14)
duration: intervalo do bloco (ex: 0.14)
ease(t): curva suave, ex: power2.inOut
lerp(a, b, t): interpolação em HSL (recomendado) para transições naturais

Comportamento tipo scroll-triggered

Entrada da frase (equivalente ao “element enters viewport”):**
  opacity: 0 → 1
  transform ajustado (ver seções Desktop/Mobile)
  backgroundColor inicia interpolação de colorPrev para colorNext
Saída da frase (equivalente ao “element leaves viewport”):**
  Frase anima de volta para um estado “oculto” (offset + opacity)
  BG volta “de forma coerente” para a cor relacionada à nova frase que entra
  O sistema é reversível: se o usuário rolar para cima, a frase volta a entrar, e a cor do BG volta a acompanhar o movimento.

Exemplo prático (entre frase 1 e 2)

scrollProgress = 0.14 → começa transição bluePrimary → purpleDetails
scrollProgress = 0.196 (≈ 40% do bloco) → cor em ~60% da interpolação → cor já dominante
scrollProgress = 0.28 → transição completa → bg-purpleDetails estabilizado
Mantido: “Quando a frase está 40% visível, a cor atinge 60% da interpolação.”
Ajuste: essa regra passa a ser estritamente vinculada à entrada/saída do elemento (scroll-triggered), de forma reversível, em vez de depender de um tempo fixo.

3.4 Sincronização com o Texto — Versão Desktop (Scroll-triggered DETALHADA)

A visibilidade da frase é o gatilho da animação, inspirada diretamente no padrão do exemplo https://examples.motion.dev/js/scroll-triggered:

Quando a frase entra no viewport (topo da área de manifesto), ela:
  Faz fade-in (opacity: 0 → 1)
  Se desloca de fora da tela para o topo (análogo a x: [-100, 0], mas aqui via eixo y)
Quando a frase sai do viewport (scrolando para cima), ela:
  Faz fade-out (opacity: 1 → 0)
  Desliza levemente para cima, voltando a um estado oculto
Todo o processo é reverso se o usuário rolar de volta.

Linha do tempo Desktop (em termos de progress, não timer absoluto)

| Momento | Texto                             | Cor (BG)                           | Comportamento Visual |
|---------|-----------------------------------|------------------------------------|----------------------|
| t = 0.00 | "Um vídeo que respira." é considerado off-screen | BG: #040013 (base)              | Texto está com opacity: 0, posicionado ligeiramente acima do topo (estado inicial escondido) |
| t ~ entrada (frase cruza limiar de viewport) | Inicia fade-in (opacity: 0 → 1) e movimento de y (de cima para o topo) | BG inicia interpolação #040013 → #253EFF | Análogo a x: [-100, 0] do exemplo Motion, mas aplicado em y + opacity |
| t ≈ 0.056 (40% da visibilidade da frase) | Texto 40% visível no topo          | Cor em ~60% interpolada           | Texto estabiliza na posição fixa no topo (sticky dentro da área) |
| t = 0.14 (frase totalmente “em cena”) | Texto 100% visível                 | Cor 100% estabilizada (#253EFF) | BG estável; texto permanece fixo |
| t > 0.14 (início da saída da frase) | Texto começa a deslizar para cima e fazer leve fade-out | Cor já começa a interpolar para próxima (#253EFF → #8A00FF) | Frase anterior sobe, próxima entra. Processos de entrada/saída são sincronizados com scroll |

Detalhes Técnicos Desktop (ajustados ao padrão Motion):

A entrada da frase usa o mesmo conceito do Motion:
  opacity: 0 → 1
  y: [offsetNegativo, 0] (efeito de “slide in” de cima)
  duration equivalente a ~0.8–0.9s quando o usuário faz um scroll contínuo, mas scrubado pelo scroll (não um timer fixo).
A saída é um “reverse” coerente:
  opacity: 1 → 0
  y: [0, offsetPositivo] (frase sobe e some)
O BG acompanha essa entrada/saída com interpolação contínua, usando ease suave.
Não há timers para enter/leave principais: tudo é scroll-triggered baseado em scrollYProgress e em algo como um IntersectionObserver/inView, similar ao tutorial do PDF.

3.5 Sincronização com o Texto — Versão Mobile (Scroll-triggered DETALHADA)

No mobile, a referência visual e de movimento é mantida, mas adaptada ao layout:

Linha do tempo Mobile

| Momento | Texto                             | Cor (BG)                           | Comportamento Visual |
|---------|-----------------------------------|------------------------------------|----------------------|
| t = 0.00 | "Um vídeo que respira." fora da área ativa | BG: #040013 (base)              | Texto está com opacity: 0, fora do viewport central |
| Ao entrar no viewport (ponto de ativação) | Inicia fade-in (opacity: 0 → 1) | BG inicia interpolação #040013 → #253EFF | Texto surge centralizado, a 20% do rodapé, com leve movimento (pode ser em y ou scale sutil) |
| t ≈ 0.056 (40% da frase visível) | Texto 40% visível                  | BG em ~60% da interpolação        | Texto mantém posição centralizada |
| t = 0.14 (frase 100% visível) | Texto totalmente visível           | BG estabilizado em #253EFF      | Texto parado, centralizado a 20% do rodapé |
| A partir de t > 0.14 (saída da frase) | Texto inicia slide out para a direita com opacity: 1 → 0 | BG inicia interpolação #253EFF → #8A00FF | Frase atual desliza para a direita; a próxima entra novamente com fade-in no centro |

Detalhes Técnicos Mobile (alinhados ao comportamento scroll-triggered):

Entrada:**
  opacity: 0 → 1
  Leve deslocamento (ex: de baixo para posição fixa ou pequeno y/scale)
  Disparada quando o elemento entra na área “in view” (threshold configurado, ex: 0.5).
Posicionamento:**
  Texto fica centralizado na tela, a 20% da distância do rodapé (como já especificado na versão anterior).
Saída (direita):**
  Quando o bloco está prestes a sair da área de foco (rolando para cima ou para baixo), o texto:
    Desliza para a direita (x: [0, offsetPositivo])
    Faz fade-out (opacity: 1 → 0)
  Esse movimento é reversível: se o usuário rolar de volta, a frase retorna do lado direito, com opacity: 0 → 1, restaurando a posição central.
BG:**
  Mantém a mesma lógica de interpolação da versão desktop.
  A sincronia é baseada em scrollProgress e no estado de “in view” de cada frase, não na posição absoluta do texto.

3.6 Por que usar duas camadas? (Camada 0 + Camada 1)

| Problema                                              | Solução                                                                                 |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Transição direta de backgroundColor causa flash em Safari/Android | Usar Camada 1 (overlay) para fazer crossfade: opacity: 0 → 1 → 0, escondendo o corte brusco |
| Mudança abrupta quebra o “efeito de absorção”        | Overlay atua como véu suave entre as cores, garantindo continuidade visual              |
| Scroll reverso causa “jump” se a interpolação não for bidirecional | Com scrub: 1 (ou lógica ligada ao scrollYProgress), a cor volta naturalmente ao estado anterior ao rolar para cima |
💡 Dica de implementação:
- will-change: background-color na Camada 0
- contain: paint para evitar repaints desnecessários

3.7 Exemplo de Código (mantendo HSL + conceito Motion)

// Função de interpolação HSL (evita tons estranhos em RGB)
const lerpHsl = (
  h1: number, s1: number, l1: number,
  h2: number, s2: number, l2: number,
  t: number
) => {
  const h = ((h2 - h1 + 360) % 360) * t + h1
  const s = s1 * (1 - t) + s2 * t
  const l = l1 * (1 - t) + l2 * t

  return hsl(${h}, ${s}%, ${l}%)
}

// Dentro do update de scroll (equivalente a scrub):
// progressInBlock ∈ [0,1], calculado por clamp no intervalo da frase.
tl.to(bgLayer, {
  backgroundColor: () =>
    lerpHsl(
      230, 85, 30, // bluePrimary: hsl(230,85%,30%)
      270, 80, 40, // purpleDetails: hsl(270,80%,40%)
      progressInBlock // t ∈ [0,1]
    ),
  duration: 0.14,
  ease: "power2.inOut"
}, start)

Mantida a conclusão:
Controlada por scroll progress (não por timer fixo)
Sincronizada com a entrada e saída do texto em tempo real
Implementada com duas camadas para evitar flicker
Bidirecional (subir/descer scroll mantém coerência visual)

4. ANIMAÇÕES — SCROLL BIDIRECIONAL

Todas as animações devem funcionar para:

Scroll para baixo (entrada natural dos elementos)
Scroll para cima (saída reversa — reverte animações, como no exemplo do PDF)

Regras (ajustadas ao padrão scroll-triggered Motion):

Não usar animações irreversíveis (tudo precisa poder “desfazer” com scroll inverso).
Usar scrollYProgress normalizado (0 → 1).
Mapear intervalos com clamp para cada frase/bloco.
Não usar timers para eventos principais:
  As transições principais (entrada/saída de texto, variação de BG) são reativas ao scroll.
  Timers podem ser usados apenas para microdetalhes, como wobble automático, se necessário.

5. RESET TOTAL AO SAIR DA SESSÃO

Quando a sessão:

Sai completamente da viewport (IntersectionObserver threshold 0)
  OU
scrollYProgress retorna a 0

Todos os estados devem resetar:

Frase volta para a primeira
Ghost scale volta para 1
Ghost rotação zera
Intensidade de wobble volta ao padrão base
Background volta para #040013
Overlay opacity = 0
Manifesto final invisível
Morph resetado
⚠️ Isso garante reexecução perfeita ao reentrar na sessão, exatamente como no exemplo de scroll-triggered, em que o elemento volta ao estado inicial quando sai de cena.

6. GHOST 3D — COMPORTAMENTO COMPLETO

(Conteúdo mantido, apenas reforçada a relação com o scroll)

Estado Inicial

scale: 1
Rotação leve em Y
Flutuação base
Sem intensificação

Durante Frases

Follow cursor (desktop)
Scroll influencia rotação em Y
Leve deslocamento em Z, vinculado ao scrollYProgress

Após 0.8 de scroll progress

scale: 1 → 1.1
wobble intensifica
Resposta ao scroll aumenta

No Manifesto Final

Centraliza horizontal e verticalmente
Intensidade máxima
Pequeno avanço no eixo Z

Ao Sair da Sessão

Tudo retorna ao estado inicial (reset descrito na seção 5)

7. ORDEM DE ENTRADA DOS ELEMENTOS

Sequência cronológica — Versão Desktop

BG inicial visível
BeliefFixedHeader faz fade-in no topo
Ghost entra com a primeira frase (estado inicial suave)
Primeira troca de cor inicia simultaneamente com a entrada scroll-triggered do texto
Frases rotativas continuam, cada uma:
   Entrando do topo com opacity: 0 → 1 e movimento de y
   Saindo por cima com opacity: 1 → 0
   Sempre de forma reversível se o usuário rolar para cima
Intensificação gradual do Ghost conforme scrollYProgress
Manifesto final surge:
   Ao mesmo tempo em que a frase fixa sai para cima
Ghost escala + centraliza (clímax)
Scroll continua → elementos saem para cima com animação suave
Reset total ao sair da sessão

Sequência cronológica — Versão Mobile

BG inicial visível
BeliefFixedHeader faz fade-in
Ghost entra com a primeira frase
Primeira troca de cor inicia simultaneamente com a entrada scroll-triggered do texto
Texto fica centralizado a 20% da distância do rodapé
Frases rotativas continuam, cada uma:
   Entrando com fade-in, posicionando-se no centro
   Saindo pela direita com opacity: 1 → 0
   Reversível: ao rolar para cima, o texto volta desde a direita até o centro com opacity: 0 → 1
Intensificação gradual do Ghost conforme scroll
Manifesto final surge ao mesmo tempo em que a frase fixa sai para a direita
Ghost escala + centraliza
Scroll continua → elementos saem para a direita
Reset total ao sair da sessão

8. MANIFESTO FINAL — MORPHING

Texto fixo:
ISSO É GHOST DESIGN.

Especificações (mantidas):

Cada linha independente
Pequeno espaçamento entre linhas
opacity: 0 → 1
y: 40 → 0 (entrada de cima para baixo)
Ghost intensifica no momento exato em que "GHOST" completa o morph

Integração com scroll-triggered:

O manifesto entra quando sua área entra em viewport / atinge o bloco de progresso definido.
A animação de entrada (opacity + y) é vinculada à faixa de scrollProgress do manifesto (scrub).
Ao sair da área de viewport (rolando para cima ou para baixo), o manifesto pode:
  Fazer fade-out suave
  Voltar ao offset em y, mantendo a reversibilidade do sistema.

9. COMPORTAMENTO MOBILE ESPECÍFICO

Posicionamento do Texto

Texto entra com fade-in (opacity: 0 → 1)
Mantém posição centralizada, a 20% da distância do rodapé da tela
Texto não se move verticalmente durante sua exibição
Ao final da exibição (quando o bloco atinge o limiar de saída), desliza para a direita até sair da tela (x: 0 → offsetPositivo, opacity: 1 → 0)

Sincronização BG-Texto Mobile

A transição de cores mantém a mesma lógica de interpolação da versão desktop
A sincronia é calculada com base no scroll progress e na entrada/saída scroll-triggered do texto, não na posição absoluta em pixels
A troca de cores acontece enquanto o texto entra e se estabiliza, não somente após

Ghost 3D Mobile

Mantém alinhamento com o texto (não com a viewport)
Ghost flutua levemente em torno do texto centralizado
Durante a saída do texto (para a direita), o Ghost acompanha suavemente a direção, podendo ter leve deslocamento em x sincronizado com o scrollProgress do bloco

Observação Importante
A animação mobile não é uma versão reduzida da desktop, mas uma adaptação específica que mantém a essência emocional do design, respeitando as expectativas de mobile.
A saída pela direita cria um fluxo mais natural para telas menores, enquanto os movimentos seguem a lógica de scroll-triggered reversível, como no exemplo utilizado de referência.

10. PERFORMANCE

Preload do GLB
Suspense com fallback
Evitar re-render do Canvas
Hooks isolados:
  useBeliefsScrollSync
  useRotatingPhrases
  useGhostWobble

11. ACESSIBILIDADE

section aria-labelledby
canvas aria-label
Sem focus trap
Contraste AA/AAA


