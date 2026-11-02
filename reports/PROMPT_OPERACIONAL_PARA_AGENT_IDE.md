# MISSÃO

Você está trabalhando no repositório:

danilonovaisv/PORTFOLIO-DANILO-FINAL

Sua missão é revisar e implementar uma evolução da seção `ORIGEM` da página `/sobre`, substituindo a atual galeria de imagens estáticas por quatro cenas visuais multicamada com paralaxe contínuo, preservando a narrativa textual, a identidade visual do projeto, acessibilidade, performance e o comportamento de scroll existente.

A implementação deve partir do código REAL do repositório. Não invente paths, componentes, tokens, APIs, configurações ou dependências.

Não reescreva a página inteira.

Não altere outras seções de `/sobre` sem necessidade comprovada.

Não faça refatorações laterais.

Antes de modificar qualquer arquivo, inspecione o código atual.

---

# OBJETIVO DE RESULTADO

Transformar `AboutOrigin` em uma experiência editorial composta por quatro capítulos:

01. SENSIBILIDADE
   "O QUE PERMANECE"

02. CRIAÇÃO
   "DO TRAÇO À INTENÇÃO"

03. DESIGN
   "A DESCOBERTA DO INVISÍVEL"

04. EXPANSÃO
   "EXPANSÃO COM PROPÓSITO"

Cada capítulo deve controlar uma composição visual em quatro layers de profundidade.

O scroll da seção continua definindo qual capítulo está ativo.

Dentro da composição ativa, os layers executam um paralaxe contínuo e sutil.

A animação interna não deve substituir a narrativa de scroll. Ela funciona como movimento ambiental dentro da cena atualmente ativa.

Resultado visual esperado:

SENSIBILIDADE → matéria humana
CRIAÇÃO → gesto transformado em estrutura
DESIGN → estrutura revelando significado
EXPANSÃO → significado transformado em sistema

A experiência final deve parecer um único ensaio visual, não quatro efeitos independentes.

---

# FONTE DE VERDADE

Antes de escrever código:

1. Leia o repositório real.
2. Inspecione obrigatoriamente:

src/components/sobre/sections/AboutOrigin.tsx
src/components/sobre/origin/OriginComponents.tsx
src/components/sobre/origin/data.ts
src/components/sobre/origin/useOriginAnimations.ts
src/config/site-assets*
src/contexts/site-assets*
src/config/motion*
src/hooks/useMotionGate*
next.config.*
package.json

3. Localize testes relacionados à página `/sobre` e à seção Origin.
4. Localize a implementação de `DynamicAssetImage`.
5. Confirme como assets Supabase são resolvidos.
6. Confirme a versão de Next.js, React, GSAP, motion/react e bibliotecas envolvidas.
7. Execute `git status --short` antes de modificar qualquer coisa.
8. Preserve mudanças existentes do usuário.

Não proponha alterações em arquivos que não foram inspecionados.

---

# REFERÊNCIAS VISUAIS E TÉCNICAS

Os protótipos HTML fornecidos são REFERÊNCIA DE COMPORTAMENTO.

Não devem ser copiados literalmente.

Extraia deles:

- composição em quatro layers;
- profundidade progressiva;
- `translate3d`;
- movimento contínuo;
- `requestAnimationFrame`;
- tratamento de resize;
- tratamento de orientation change;
- `prefers-reduced-motion`;
- pausa quando a página deixa de estar visível;
- overscan suficiente para impedir bordas durante a animação.

O produto final deve ser React/TypeScript integrado à arquitetura atual.

---

# ASSETS DAS QUATRO CENAS

## Cena 01: Sensibilidade

Base path:

about/origin/ANIMA-FOTO/

Layers:

CAMADA-0.webp
CAMADA-1.webp
CAMADA-2.webp
CAMADA-3.webp

Movimento de referência:

depths:
0.006
0.013
0.024
0.040

coverScale:
1.12

motion:
horizontal

timing:
segment = 4000ms
period = 8000ms

curve:
cosine

Direção visual:

Retrato humano em ambiente criativo.

Esta é a cena mais pessoal e concreta.

Deve estabelecer a origem humana da narrativa.

---

## Cena 02: Criação

Base path:

about/origin/02-criacao/

Layers:

camada-0.webp
camada-1.webp
camada-2.webp
camada-3.webp

Movimento de referência:

amplitudes:
0.006
0.014
0.028
0.048

baseScale:
1.16

verticalRatio:
0.35

cycle:
4000ms

curve:
sine

Direção visual:

Sketches, papel, gesto manual e geometria construída.

A imagem deve representar a transformação:

rabisco → ideia → estrutura → direção.

---

## Cena 03: Design

Base path:

about/origin/03-design/

Layers:

camada-0.webp
camada-1.webp
camada-2.webp
camada-3.webp

Movimento de referência:

amplitudes:
0.006
0.014
0.028
0.048

baseScale:
1.16

verticalRatio:
0.35

cycle:
4000ms

Direção visual:

Escultura translúcida e arquitetura abstrata.

A sensação deve ser contemplativa.

A animação deve reforçar profundidade, transparência e descoberta.

Não aumente a amplitude apenas porque existem elementos 3D.

---

## Cena 04: Expansão

Base path:

about/origin/04-expansao/

Layers:

camada-0.webp
camada-1.webp
camada-2.webp
camada-3.webp

Movimento de referência:

amplitudes:
0.006
0.014
0.028
0.048

baseScale:
1.16

verticalRatio:
0.35

cycle:
4000ms

Direção visual:

Sistema expansivo, núcleo central e estruturas orbitais.

Deve transmitir:

integração
estratégia
tecnologia
IA
ampliação de possibilidades

A cena pode transmitir maior energia que a Cena 03, mas não deve virar uma animação frenética.

---

# DECISÃO ARQUITETURAL OBRIGATÓRIA

Não criar quatro componentes de animação independentes com código duplicado.

Criar uma abstração reutilizável equivalente a:

OriginParallaxScene

ou nome coerente com a nomenclatura existente.

O componente deve receber configuração da cena.

Exemplo conceitual de contrato:

type OriginParallaxLayer = {
  src: string;
  depth: number;
  alt?: string;
};

type OriginParallaxSceneConfig = {
  id: number;
  layers: OriginParallaxLayer[];
  scale: number;
  cycleMs: number;
  verticalRatio: number;
  motionMode: 'horizontal' | 'diagonal';
  wave: 'sine' | 'cosine';
};

Não use esse schema cegamente.

Adapte aos padrões reais encontrados no repositório.

---

# REGRA CRÍTICA DE PERFORMANCE

Nunca deixe quatro loops `requestAnimationFrame` independentes rodando simultaneamente.

Somente a cena ativa pode executar seu paralaxe completo.

Quando:

- outra cena se torna ativa;
- a seção sai do viewport;
- `document.hidden === true`;
- `prefers-reduced-motion` está ativo;

o loop deve ser interrompido.

Ao reativar, deve continuar de forma visualmente estável.

Não acumule múltiplos RAFs após re-render.

Não deixe listeners órfãos.

Todos os listeners e RAF IDs devem ser limpos no unmount.

---

# ARQUITETURA DE ANIMAÇÃO

Separar responsabilidades.

## Scroll narrative

Continuar usando o mecanismo existente da seção para:

- detectar capítulo ativo;
- transicionar entre cenas;
- destacar título e texto ativos;
- manter sticky behavior;
- controlar entrada e saída da galeria.

Hoje essa lógica está concentrada em:

src/components/sobre/origin/useOriginAnimations.ts

Não reimplementar ScrollTrigger sem primeiro entender essa lógica.

## Internal parallax

O componente multicamada deve cuidar apenas de:

- movimento dos layers;
- profundidade;
- RAF;
- resize;
- visibility;
- reduced motion.

GSAP não precisa controlar cada frame do paralaxe ambiental se o RAF dedicado for mais barato e previsível.

Não introduzir uma nova biblioteca de animação.

---

# ESTADO DA CENA ATIVA

A arquitetura deve possuir uma única fonte de verdade para `activeScene`.

Evite inferir a cena ativa simultaneamente em:

- GSAP
- React state
- DOM queries
- CSS classes

Escolha uma estratégia e documente-a.

Preferencialmente, adapte o sistema de ScrollTrigger existente para informar qual cena está ativa ao componente visual.

Não crie polling.

---

# COMPORTAMENTO VISUAL DA TRANSIÇÃO ENTRE CENAS

Ao trocar de capítulo:

1. a cena atual permanece visível durante o início da transição;
2. a próxima cena entra suavemente;
3. não deve ocorrer flash preto;
4. não deve ocorrer frame vazio;
5. não deve ocorrer layout shift;
6. os quatro layers da nova cena entram como um conjunto;
7. depois da troca, somente a nova cena continua animando.

A transição entre cenas pode usar a linguagem existente de:

opacity
translateY sutil
blur curto

Evite:

zoom dramático
3D rotation
clip-path complexo
morphing artificial
glitches
efeitos neon adicionais

As próprias imagens já possuem riqueza visual suficiente.

---

# COMPOSIÇÃO DESKTOP

Preservar a arquitetura editorial:

texto à esquerda
media stage sticky à direita

A cena visual deve ocupar o container atual da galeria sem alterar desnecessariamente a arquitetura geral.

A imagem não deve virar fullscreen.

Manter espaço para leitura.

A animação visual não pode competir com títulos e texto.

---

# COMPOSIÇÃO MOBILE

Não reproduzir obrigatoriamente o sticky desktop.

Manter fluxo editorial linear.

Ordem esperada:

título
copy
imagem/cena
próximo capítulo

Em mobile existem duas opções aceitáveis, escolha após medir performance:

A. parallax multicamada reduzido, rodando apenas quando a cena estiver visível;

B. composição estática consolidada quando o custo de quatro layers for desproporcional.

Priorize B em aparelhos modestos se necessário.

Não use user-agent sniffing.

Use capacidade, viewport e motion preference quando aplicável.

---

# SEMÂNTICA E ACESSIBILIDADE

A composição multicamada é uma única imagem conceitual.

Não exponha quatro descrições redundantes ao screen reader.

Recomendação:

- apenas o container semântico da cena recebe descrição;
- layers puramente decorativos usam `alt=""`;
- elementos duplicados usam `aria-hidden="true"`;
- o texto da seção continua sendo a principal fonte semântica.

Não usar:

"Camada 1"
"Camada 2"
"Imagem da homepage"

como conteúdo acessível final.

Os `alt` atuais dos protótipos são técnicos e não são adequados como copy final.

Use descrições relacionadas ao significado da cena somente onde necessário.

---

# PREFERS REDUCED MOTION

Obrigatório.

Se:

prefers-reduced-motion: reduce

então:

- nenhuma oscilação contínua;
- nenhuma translação automática;
- nenhuma animação infinita;
- apresentar composição visual estática;
- manter troca entre capítulos funcional;
- reduzir ou remover blur/translate não essencial.

Investigue e reutilize:

useMotionGate()

Não crie uma segunda abstração se o projeto já possui uma solução correta.

---

# IMAGE LOADING

O projeto usa assets remotos.

Consulte a documentação atual de Next.js antes de alterar carregamento de imagens.

Para imagens remotas:

- confirmar `remotePatterns`;
- usar `width` + `height` ou `fill`;
- evitar CLS;
- usar `sizes` correto;
- lazy-load cenas não iniciais;
- não pre-carregar 16 imagens ao abrir `/sobre`.

A Cena 01 é a primeira composição potencialmente visível e pode receber tratamento diferenciado após confirmar sua posição real em relação ao LCP.

Não aplique `preload` a todas as layers automaticamente.

Next.js moderno utiliza `preload` para candidatos LCP; não use `priority` cegamente se a versão instalada já o depreciou.

---

# ESTRATÉGIA DE CARREGAMENTO RECOMENDADA

Scene 01:
carregar inicialmente quando necessário.

Scene 02:
preparar pouco antes de se tornar ativa.

Scene 03:
lazy.

Scene 04:
lazy.

Quando uma cena estiver próxima de entrar, iniciar download de seus layers sem executar sua animação.

Evitar:

16 requests eagerly no início da página.

---

# FAILSAFE DE ASSETS

Se um layer falhar:

- não quebrar a seção;
- não lançar erro fatal;
- manter os outros layers;
- preferencialmente manter o fallback existente da cena;
- registrar erro apenas conforme padrão atual do projeto.

Não esconder todo o conteúdo textual por falha visual.

---

# PROGRESSO VISUAL

Adicionar um indicador discreto no media stage:

01 / 04
02 / 04
03 / 04
04 / 04

Opcionalmente uma barra vertical de progresso.

Não criar carousel controls.

A navegação continua sendo determinada pelo scroll.

O indicador deve acompanhar `activeScene`.

---

# INTRO DA SEÇÃO

Avalie inserir uma pequena introdução antes do primeiro capítulo:

eyebrow:
ORIGEM

headline:
Da intuição ao método.

supporting copy:
Uma frase curta conectando observação, criação, design e tecnologia.

IMPORTANTE:

Não invente biografia.

Não invente datas.

Não invente experiência.

Caso o conteúdo não esteja já documentado no repositório, preserve apenas conceitos comprováveis.

---

# CONTEÚDO DOS QUATRO CAPÍTULOS

Preservar como base o conteúdo existente de `ORIGIN_CONTENT`.

Não reescrever toda a copy automaticamente.

Melhorar apenas estrutura e apresentação.

Mapeamento conceitual:

A / 01
SENSIBILIDADE
O QUE PERMANECE

B / 02
CRIAÇÃO
DO TRAÇO À INTENÇÃO

C / 03
DESIGN
A DESCOBERTA DO INVISÍVEL

D / 04
EXPANSÃO
EXPANSÃO COM PROPÓSITO

Se o schema de `OriginBlock` for expandido, considerar campos equivalentes a:

chapter
phase
title
paragraph
highlight
caption
scene

Somente introduzir os campos realmente utilizados.

---

# PONTE FINAL

Depois da Cena 04, criar uma transição conceitual para a próxima seção existente.

Direção:

"O que começou como olhar virou método."

Não criar CTA comercial artificial.

A ponte deve conectar Origem ao próximo capítulo da página.

Antes de implementar, identifique a seção real seguinte no código.

---

# DESIGN

Preservar:

dark canvas
bluePrimary
tipografia atual
spacing system
motion tokens
grid existente
Ghost design language
visual premium/editorial

Não copiar literalmente:

loehx.com
arcoglobal.com

Os benchmarks foram usados apenas para extrair princípios de:

clareza narrativa
prova
progressão
hierarquia editorial

A identidade visual deve continuar pertencendo ao portfolio.

---

# FERRAMENTA: CONTEXT7

## O que faz

Recupera documentação oficial atualizada de frameworks, libraries e APIs.

## Quando usar

Use antes de alterar:

Next.js Image
App Router
remote images
preload
client component boundaries
GSAP integration
React lifecycle relacionado a RAF/listeners
qualquer API cuja sintaxe dependa da versão instalada

## Quando não usar

Não use para descobrir a estrutura do projeto.

Essa informação deve vir do workspace/GitHub.

## Formato / contrato operacional

Entrada:

library + pergunta técnica precisa

Saída:

documentação oficial aplicável à versão ou branch atual

Antes de escrever uma solução dependente de API, registre internamente:

documented behavior
project version
decision adopted

Não inventar comportamento que a documentação não confirma.

---

# FERRAMENTA: GITHUB / WORKSPACE

## O que faz

Inspeciona o projeto real, arquivos, dependências, testes, convenções e mudanças existentes.

## Quando usar

Sempre antes de editar arquivo.

Use também para:

git status
diff
test discovery
build scripts
asset configuration
existing abstractions

## Quando não usar

Não substitui documentação oficial de framework.

## Formato / contrato operacional

Antes de editar:

READ → UNDERSTAND → MODIFY → DIFF → VERIFY

Não modificar código não inspecionado.

Não apagar mudanças do usuário.

Não criar arquivo novo se uma abstração existente for mais apropriada.

---

# AGENT / SKILL: UI-UX DESIGN REVIEW

Origem:

Agent-Skills-Knowledge-Hub
baseline commit:
bb85514e2e1e1c67c4fe986b8112967929e91c47
resource:
contents/agents/ui-ux-designer.md

## O que faz

Avalia hierarquia, legibilidade, composição, responsividade, motion, acessibilidade e distintividade visual.

## Quando usar

Use durante:

revisão da seção Origin
avaliação desktop/mobile
motion review
hierarquia de texto
media stage
progress indicator

## Quando não usar

Não use para decidir APIs React/Next.js ou arquitetura de código.

## Formato / contrato operacional

Para cada alteração visual relevante, validar:

hierarchy
readability
mobile logic
motion purpose
contrast
reduced motion
visual distinctiveness

Não adicionar efeitos apenas porque são tecnicamente possíveis.

---

# SKILL: FRONTEND PERFORMANCE

## O que faz

Controla custo de:

network
decode
CPU
main thread
GPU
memory
React rendering

## Quando usar

Obrigatório porque a nova seção terá até 16 assets em quatro cenas e animação contínua.

## Quando não usar

Não reduzir a qualidade visual de forma perceptível por micro-otimizações sem evidência.

## Formato / contrato operacional

Para cada decisão, classificar impacto quando relevante:

NETWORK
CPU
MAIN_THREAD
GPU
MEMORY
MEDIA
REACT

Verificar:

quantidade de imagens carregadas inicialmente
RAF ativo
listeners
paint
compositing
layout shift
lazy loading
cleanup

---

# SKILL: ACCESSIBILITY WCAG

## O que faz

Garante que a experiência continue utilizável independentemente da animação.

## Quando usar

Obrigatório em todo componente modificado.

## Quando não usar

Não adicionar ARIA redundante quando HTML semântico resolve.

## Formato / contrato operacional

Validar:

semantic headings
alt strategy
aria-hidden
screen reader duplication
prefers-reduced-motion
keyboard flow
focus
contrast

Nenhuma informação essencial pode existir exclusivamente na animação.

---

# WORKFLOW OBRIGATÓRIO

## ETAPA 1: DISCOVERY

Inspecione os arquivos obrigatórios.

Entregue antes da implementação um resumo curto:

Current architecture
Files involved
Animation ownership
Asset pipeline
Tests found
Risks found

Não peça confirmação se não houver decisão de produto ambígua.

---

## ETAPA 2: PLAN

Produza um plano de implementação por arquivo.

Cada item deve conter:

file
change
reason
verification

Evite tarefas genéricas como:

"implementar paralaxe"

Explique exatamente onde e por quê.

---

## ETAPA 3: IMPLEMENT CORE COMPONENT

Criar/adaptar o componente reutilizável de paralaxe.

Garantir:

4 layers
config per scene
one RAF
cleanup
active state
reduced motion
visibility pause
resize
orientation
overscan
no edge exposure

---

## ETAPA 4: INTEGRATE ASSETS

Registrar os 16 layers conforme a arquitetura real de assets.

Não hardcode Supabase URLs em JSX se o projeto já possui registry/configuração para isso.

Preservar fallback onde aplicável.

---

## ETAPA 5: INTEGRATE SCROLL STATE

Conectar a cena ativa à narrativa GSAP existente.

Eliminar lógica redundante.

Garantir:

forward scroll
reverse scroll
rapid scroll
refresh
resize

---

## ETAPA 6: DESKTOP EXPERIENCE

Implementar:

sticky visual stage
scene counter
smooth transitions
single active animated scene

Verificar em:

1440x900
1920x1080
1366x768

ou breakpoints equivalentes existentes no projeto.

---

## ETAPA 7: MOBILE EXPERIENCE

Verificar pelo menos:

390x844
430x932

Não aceitar overflow horizontal.

Não aceitar crops que removam o elemento focal de cada composição.

A ordem de leitura deve continuar lógica.

---

## ETAPA 8: REDUCED MOTION

Testar explicitamente com:

prefers-reduced-motion: reduce

A seção deve continuar visualmente completa e legível.

---

## ETAPA 9: PERFORMANCE

Verificar:

apenas um RAF ativo
sem RAF após unmount
sem listeners duplicados
sem 16 imagens eager
sem layout shift relevante
sem re-render por frame
transform-only animation
sem mudança de React state a 60fps

IMPORTANTE:

RAF deve manipular refs/transform diretamente quando apropriado.

Não atualizar React state a cada frame.

---

## ETAPA 10: TESTS

Usar infraestrutura já existente.

Adicionar ou adaptar testes somente onde houver valor.

Cobrir pelo menos:

Origin renderiza quatro capítulos
sticky gallery/media stage existe no desktop
scene transition acompanha scroll
reduced motion não executa looping contínuo
mobile não depende do sticky desktop
sem erro de console durante navegação

Se Playwright já estiver configurado, usar Playwright.

Não adicionar outro framework de E2E.

---

## ETAPA 11: FINAL VERIFICATION

Rodar todos os scripts reais disponíveis e relevantes.

Esperado, caso existam:

lint
typecheck
tests
e2e
build

Não inventar comandos.

Descobrir comandos no package.json.

Depois:

git diff --check

e revisar:

git diff

---

# CRITÉRIOS DE ACEITAÇÃO VISUAL

PASS somente se:

[ ] As quatro cenas correspondem aos quatro capítulos.
[ ] O storytelling visual progride de humano para sistema.
[ ] A Cena 01 continua mais humana que as demais.
[ ] A Cena 02 comunica gesto e construção.
[ ] A Cena 03 comunica descoberta, profundidade e design.
[ ] A Cena 04 comunica expansão e integração.
[ ] Nenhuma cena compete visualmente com o texto.
[ ] Nenhum layer revela bordas durante o movimento.
[ ] A transição de cena não pisca.
[ ] Desktop mantém leitura editorial.
[ ] Mobile permanece compreensível.
[ ] Reduced motion apresenta versão estática adequada.

---

# CRITÉRIOS DE ACEITAÇÃO TÉCNICA

PASS somente se:

[ ] Existe uma abstração compartilhada para o paralaxe.
[ ] Não existem quatro implementações duplicadas.
[ ] Apenas a cena ativa anima.
[ ] Não há React state update em todo frame.
[ ] RAF é cancelado corretamente.
[ ] `visibilitychange` é tratado.
[ ] resize é tratado.
[ ] orientation change é tratado quando necessário.
[ ] reduced motion é respeitado.
[ ] imagens não causam CLS relevante.
[ ] assets futuros permanecem lazy.
[ ] TypeScript continua strict conforme configuração existente.
[ ] zero erro no build.
[ ] zero erro relevante no console.
[ ] testes existentes continuam passando.

---

# NÃO FAZER

Não:

- copiar o HTML diretamente para JSX;
- criar `<iframe>` para os protótipos;
- criar quatro componentes quase idênticos;
- rodar quatro RAFs simultaneamente;
- atualizar state React a 60fps;
- adicionar Three.js;
- adicionar WebGL;
- adicionar canvas;
- adicionar nova library de parallax;
- adicionar outra animation library;
- reescrever GSAP existente sem motivo;
- carregar 16 layers com eager;
- ignorar reduced motion;
- inventar biografia;
- mudar a identidade tipográfica;
- transformar a seção em fullscreen;
- alterar outras páginas;
- fazer deploy;
- push;
- merge;
- abrir PR sem autorização explícita.

---

# CONDIÇÕES DE DELEGAÇÃO

Se houver suporte a subagents:

## Research / Architecture

Pode inspecionar repositório e documentação.

Somente leitura.

## UI/UX Reviewer

Pode revisar a experiência final desktop/mobile.

Não modifica código sem missão explícita.

## Frontend Implementer

Pode alterar somente arquivos relacionados ao escopo aprovado.

## QA / Browser

Executa testes, screenshots e browser verification.

Não altera design para "fazer o teste passar".

Não permita dois agents alterarem simultaneamente os mesmos arquivos.

---

# CONDIÇÃO DE PARADA

Pare e pergunte ao usuário somente se surgir uma decisão que não pode ser determinada pelo código ou pelos assets, por exemplo:

- mudança substancial de copy;
- remoção de conteúdo;
- mudança de branding;
- alteração de comportamento desktop definida apenas por preferência pessoal;
- asset inexistente ou inacessível sem fallback.

Problemas técnicos normais devem ser resolvidos pelo agent.

---

# CONDIÇÃO DE CONCLUSÃO

Não declare "concluído" apenas porque a interface renderiza.

A tarefa só termina quando existirem evidências de:

1. implementação;
2. desktop verification;
3. mobile verification;
4. reduced-motion verification;
5. lint/typecheck;
6. testes relevantes;
7. build;
8. diff review.

---

# RELATÓRIO FINAL OBRIGATÓRIO

Responder ao final com:

## Arquivos alterados

path
purpose

## Arquitetura implementada

Explicar brevemente:

scene config
active scene
RAF lifecycle
scroll integration
asset loading

## Comportamento por cena

01
02
03
04

## Performance

RAF
image loading
cleanup
GPU transforms

## Accessibility

reduced motion
alt strategy
semantic structure

## Testes executados

command
result

## Browser verification

desktop
mobile
reduced motion

## Pendências

Somente pendências reais.

## Diff summary

Resumo objetivo do que mudou.

Não declarar sucesso sem evidência executada.>

