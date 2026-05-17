# 10-SHADER-SECTION

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/home/ShaderSection.tsx`
- Componentes internos:
  - `ShaderAnimation`
  - `ShaderSection`
- Dependências:
  - React `useEffect`
  - React `useRef`
  - `three`
  - `motion/react`
  - `@/config/motion`
- Padrão arquitetural:
  - Seção client-side da HOME com shader procedural decorativo e overlay editorial.
- Observações sobre coesão e acoplamento:
  - Componente autocontido.
  - Sem dependência direta de Supabase, Firebase ou APIs externas.
  - Dependente de DOM, `window`, WebGL e ciclo de vida client-side.

## 1. Objetivo da Página/Sessão

Criar uma pausa editorial imersiva dentro da HOME, traduzindo a filosofia Ghost em uma superfície visual abstrata que sustenta a frase central:

`Design que transforma intenção em percepção.`

A seção opera como intervalo conceitual entre blocos da página, reforçando atmosfera, contraste e narrativa sem adicionar CTA, formulário, navegação ou conteúdo dinâmico.

## 2. Estrutura de Conteúdo

- Container principal em `m.section`.
- Altura fixa aproximada de `650px` via `h-[650px]`.
- Camada WebGL absoluta ocupando todo o fundo da seção.
- Overlay radial editorial para legibilidade do texto.
- Bloco textual centralizado com quebra de linha explícita.
- Destaques de texto em `text-blueAccent` e `text-bluePrimary`.
- Borda inferior decorativa com gradiente horizontal.
- Ausência de CTA, formulário, links ou conteúdo dinâmico.

## 3. Identidade Visual

- Fundo base `#040013`, consistente com o token Void Black do Ghost System.
- Estética dark, espectral e imersiva.
- Shader procedural com mistura luminosa em tons cyan e pink.
- Azul permanece como destaque editorial e identidade principal da seção.
- O pink aparece como detalhe luminoso/glitch dentro do shader, não como cor primária de marca.
- Ausência de vermelho como linguagem visual da interface.
- Coerência geral com a filosofia Ghost de presença sem ruído.

## 4. Interatividade & Animações

- Uso de `m.section` com reveal por `opacity`:
  - `initial={{ opacity: 0 }}`
  - `whileInView={{ opacity: 1 }}`
  - `transition={{ duration: MOTION_TOKENS.duration.slow, ease: GHOST_EASE }}`
  - `viewport={{ once: true, margin: '-20%' }}`
- Uso de `m.span` com reveal editorial:
  - `initial={{ opacity: 0, y: 18 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `transition` com `MOTION_TOKENS.duration.ghostIn`, `GHOST_EASE` e `delay: 0.3`
- Shader animado continuamente por `requestAnimationFrame`.
- Uniform `time` incrementado a cada frame.
- Listener de `resize` para recalcular tamanho do renderer e resolução do shader.

Conformidade Ghost System:

- O texto respeita o limite de `translateY` em `18px`.
- A UI usa apenas `opacity` e `translateY` no reveal.
- Não há `scale`, `rotate`, `bounce` ou `translateX` em conteúdo UI.
- O shader não viola a governança de motion de conteúdo, mas roda animação WebGL contínua fora da camada semântica.
- Recomenda-se validar gate específico de reduced motion se ele ainda não existir para esta seção.

## 5. Responsividade

- Largura fluida `w-full`.
- Altura fixa `h-[650px]`.
- Padding horizontal `px-6`.
- Container textual com `max-w-[1680px]`.
- Tipografia responsiva:
  - `text-3xl`
  - `md:text-5xl`
  - `lg:text-7xl`
- O renderer recalcula dimensões com base em `clientWidth` e `clientHeight`.
- O uniform `resolution` é atualizado com a dimensão real do canvas renderizado.
- A composição visual tende a se manter estável em telas diversas, mas existe risco de custo perceptível em dispositivos com GPU fraca ou alta densidade de pixels.

## 6. Acessibilidade & SEO

- O texto central é conteúdo editorial real, visível e semanticamente relevante.
- O shader funciona como camada decorativa, não como conteúdo semântico.
- Vale avaliar `aria-hidden="true"` no container visual do shader, caso ainda não exista, para evitar carga inútil a leitores de tela.
- O contraste do texto branco sobre fundo escuro é favorável para legibilidade.
- Como a seção é `client component`, o conteúdo crítico para SEO não deve depender exclusivamente do efeito WebGL.
- Reduced motion permanece como ponto de atenção, já que o shader mantém animação contínua mesmo sem interação do usuário.

## 7. Integrações ou Recursos Especiais

- Three.js utilizado diretamente neste componente:
  - `THREE.Camera`
  - `THREE.Scene`
  - `THREE.PlaneGeometry`
  - `THREE.ShaderMaterial`
  - `THREE.WebGLRenderer`
  - `THREE.Vector2`
- Uniforms observados:
  - `time`
  - `resolution`
- Vertex shader simples com `gl_Position`.
- Fragment shader procedural com glow, mistura de cores e dependência de tempo.
- Motion usado para reveal editorial por viewport.
- Tokens de motion centralizados em `@/config/motion`.
- Sem uso direto de Firebase.
- Sem uso direto de Supabase.
- Sem APIs externas.
- Sem uso de React Three Fiber neste componente específico, apesar de o stack global do projeto incluir R3F.

## 8. Considerações Técnicas

- O componente exige `'use client'`.
- Depende de `window`, refs de DOM e APIs browser-only de WebGL.
- O renderer é criado manualmente com `new THREE.WebGLRenderer({ antialias: true, alpha: true })`.
- O canvas é anexado ao DOM com `appendChild`.
- O componente define `renderer.setPixelRatio(window.devicePixelRatio)`.
- Há risco de custo elevado em dispositivos com DPR alto.
- Uma otimização futura plausível é limitar DPR, por exemplo com `Math.min(window.devicePixelRatio, 2)`.
- O ciclo de vida é controlado por `useEffect`, compatível com acesso seguro a APIs de navegador em Client Components do App Router.
- O cleanup observado cobre:
  - remoção do listener de `resize`
  - cancelamento do `requestAnimationFrame`
  - remoção do canvas do DOM
  - `renderer.dispose()`
  - `geometry.dispose()`
  - `material.dispose()`
- Existe risco de animação WebGL continuar custosa quando a seção estiver fora da viewport, porque não há gate por visibilidade.
- Recomenda-se avaliar no futuro:
  - reduced motion explícito
  - pause/offload fora da viewport
  - `aria-hidden="true"` na camada decorativa
  - validação visual e de performance em mobile real
- Testabilidade:
  - inspeção visual do shader e da legibilidade do texto
  - validação de ausência de erro WebGL em console
  - validação de cleanup ao desmontar
  - validação de performance em hardware modesto

## 9. Componentes Interativos

| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| `ShaderAnimation` | Renderiza o shader procedural em WebGL com Three.js | Mounted, Animating, Resizing, Unmounted | Resize de viewport e loop contínuo de renderização | Implementado |
| `ShaderSection` | Orquestra a seção editorial da HOME com fundo shader e texto central | Hidden, Revealed | Reveal por viewport | Implementado |
| Texto editorial | Frase central da seção com destaque semântico por cor | Initial, Visible | Entrada com `opacity` e `translateY` | Implementado |
| Overlay radial | Camada de apoio visual para profundidade e legibilidade | Estático | Nenhuma | Implementado |
| Border glow | Linha inferior decorativa com gradiente horizontal | Estático | Nenhuma | Implementado |

## 10. Estrutura de Páginas e Navegação

- A seção pertence à HOME.
- Não cria rota própria.
- Não possui links internos.
- Não possui CTA.
- Não altera client-side routing.
- Não deve interferir com Header, Portfolio, Contact ou Modal Root.
- Deve permanecer como bloco visual/editorial dentro da narrativa da HOME.

## 11. Informações Relevantes para Compreensão da Sessão

- A seção tem papel narrativo de transição visual entre blocos da HOME.
- Sua função é reforçar o conceito Ghost de transformar intenção em percepção.
- O shader deve permanecer atmosférico e subordinado ao texto, sem competir com a mensagem central.
- O texto editorial é a âncora semântica da seção.
- A manutenção futura deve preservar a frase e a hierarquia visual, salvo decisão editorial documentada.
- Qualquer expansão de complexidade visual deve ser validada contra performance, legibilidade e governança do Ghost Design System.

## 12. Atualização de estado — 2026-05-17

- Documentação inicial criada para `src/components/home/ShaderSection.tsx`.
- Seção classificada como bloco editorial WebGL procedural client-side da HOME.
- Componente identificado como dependente de DOM, `window` e WebGL manual via Three.js.
- Pontos de atenção registrados:
  - reduced motion
  - DPR alto
  - custo de GPU
  - `aria-hidden` para a camada decorativa do shader
  - validação visual mobile
  - cleanup de recursos Three.js
