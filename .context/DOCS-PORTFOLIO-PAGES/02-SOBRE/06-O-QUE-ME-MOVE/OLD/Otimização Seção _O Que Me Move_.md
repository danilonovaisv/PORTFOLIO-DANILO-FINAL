# **Estratégias Avançadas de Engenharia de Interface e Orquestração Visual para a Sessão 06-O-QUE-ME-MOVE do Portfólio Danilo Novais**

A arquitetura de interfaces contemporâneas para portfólios de alto nível exige uma transição do paradigma puramente estático para um ecossistema de experiências imersivas. No projeto específico de Danilo Novais, a sessão intitulada "06-O-QUE-ME-MOVE" não é apenas uma divisão de conteúdo, mas o epicentro de um manifesto profissional que deve ser traduzido visualmente através de animações complexas, renderização tridimensional e tipografia cinética. O desafio reside na integração harmônica de tecnologias distintas, como Motion.dev, React Three Fiber e GSAP, garantindo que o desempenho não seja sacrificado em prol da estética. A análise técnica que se segue estabelece as diretrizes para a auditoria sistemática da página "Sobre" e a reconstrução detalhada da sessão mencionada, utilizando referências de excelência na indústria de desenvolvimento criativo.1

## **Auditoria Sistemática e Arquitetura de Prompt para Agentes de IA**

A primeira etapa para a evolução do portfólio de Danilo Novais envolve a criação de um comando técnico de alta precisão para agentes de auditoria. Este prompt deve ser capaz de orientar os agentes através de uma análise profunda da integridade do código, performance e fidelidade visual. A auditoria deve focar na identificação de redundâncias no carregamento de bibliotecas e na verificação de como os estados de scroll estão sendo propagados através da árvore de componentes do React.3 É fundamental que o agente compreenda que a página "Sobre" atua como um sistema único, onde a sessão 06 deve emergir de forma fluida, sem quebras na continuidade visual ou na taxa de quadros (FPS).5

Para garantir resultados ótimos, o prompt de auditoria deve ser estruturado para analisar tanto o "Main Thread" do navegador quanto o uso da GPU pelo WebGL. A complexidade de integrar componentes 3D do React Three Fiber (R3F) com animações baseadas em scroll do Motion.dev exige que o agente verifique a existência de possíveis "layout thrashes" — momentos em que o navegador é forçado a recalcular o layout repetidamente, prejudicando a fluidez.5 Abaixo, apresenta-se uma tabela com os parâmetros de diagnóstico que o agente deve considerar durante a análise da página.

| Parâmetro de Auditoria        | Ferramenta/Métrica           | Objetivo Técnico                                                       | Prioridade |
| :---------------------------- | :--------------------------- | :--------------------------------------------------------------------- | :--------- |
| First Contentful Paint (FCP)  | Lighthouse / Web Vitals      | Avaliar a velocidade inicial de entrega do conteúdo visual.            | Alta       |
| Cumulative Layout Shift (CLS) | Performance Observer         | Garantir que a inserção de elementos 3D não desloque o texto.          | Crítica    |
| Draw Calls (WebGL)            | Spector.js / Three-inspector | Reduzir a carga na GPU durante o efeito de 3D Ghost.                   | Média      |
| Scroll Jacking Detection      | Manual / Event Listeners     | Verificar se a biblioteca de scroll não interfere na navegação nativa. | Alta       |
| Memory Leaks (GSAP/R3F)       | Chrome DevTools Memory       | Garantir a limpeza de instâncias de animação no "unmount".             | Crítica    |

A instrução para o agente deve ser: "Aja como um arquiteto de software especializado em interfaces ricas. Realize uma análise estática e dinâmica da página 'Sobre', focando na eficiência dos hooks de scroll e na renderização dos componentes da sessão 06\. O ajuste deve seguir rigorosamente as referências técnicas de Motion.dev para o background, React-Bits para a tipografia e o efeito de 3D Ghost baseado na estética de drinksom.eu, integrando o arquivo de vídeo local para a transição cromática".7

## **Fundamentos Teóricos do Movimento e Animação Baseada em Scroll**

A implementação solicitada para a animação do background e do texto animado baseia-se nos princípios de "Scroll-Triggered Animations". Segundo as documentações técnicas da Motion, esse tipo de animação difere das "Scroll-Linked Animations" porque o progresso da animação não é necessariamente proporcional à posição do scroll, mas sim disparado por eventos de entrada ou saída do viewport.4 A função inView é o pilar central desta abordagem, permitindo que o desenvolvedor execute callbacks específicos quando um elemento atinge um determinado "threshold" de visibilidade.7

Para Danilo Novais, a transição do background deve mimetizar o comportamento observado no vídeo anima.mov. Isso exige uma manipulação sofisticada do CSS via JavaScript, onde as propriedades de opacidade e translação são alteradas de forma assíncrona. A Motion utiliza o motor nativo de animações do navegador sempre que possível, o que garante uma execução suave mesmo em dispositivos móveis.5 A curva de easing recomendada para tais transições é frequentemente o cubic-bezier ![][image1], que proporciona um início de movimento mais agressivo com uma desaceleração orgânica, criando uma sensação de elegância e autoridade no manifesto visual.7

### **A Mecânica de Interseção e o Hook useInView**

No contexto do React, o uso do hook useInView da biblioteca Motion permite uma integração declarativa com o ciclo de vida dos componentes. Diferente da implementação puramente imperativa do Intersection Observer API, o useInView fornece um estado booleano que pode ser utilizado para alternar variantes de animação.4 No blueprint de implementação para Danilo, este hook deve ser configurado com o parâmetro once: false para permitir que o background e o texto reanimem caso o usuário retorne à sessão durante a navegação.7

Abaixo, descrevemos os estados de animação que devem ser orquestrados para os elementos da sessão 06:

| Estado da Animação    | Propriedades CSS                        | Timing / Easing            | Gatilho (Trigger)         |
| :-------------------- | :-------------------------------------- | :------------------------- | :------------------------ |
| Inicial (Hidden)      | opacity: 0, y: 40px, filter: blur(10px) | N/A                        | Entrada na Seção          |
| Ativo (Visible)       | opacity: 1, y: 0, filter: blur(0px)     | 0.9s / cubic-bezier        | Viewport Threshold 0.2    |
| Saída (Exiting)       | opacity: 0, y: \-40px                   | 0.6s / easeIn              | Viewport Threshold 0.0    |
| Background Transition | background-color, mix-blend-mode        | Baseado no scroll progress | scrollYProgress 0.1 a 0.5 |

## **O Fenômeno 3D Ghost e a Engenharia de Shaders no WebGL**

A referência visual ao site drinksom.eu introduz um conceito avançado de design: o 3D Ghost Reveal. Tecnicamente, este efeito é uma combinação de geometria tridimensional complexa e manipulação de buffers de renderização. O site referência utiliza tecnologias como Three.js e React Three Fiber para criar cenas declarativas que reagem ao estado da aplicação.1 O aspecto "etéreo" ou de "fantasma" é frequentemente alcançado através do uso de Shaders de Fragmento (Fragment Shaders) que aplicam efeitos de duotone ou dithering ao modelo 3D.2

No coração dessa implementação está o Stencil Masking. O Stencil Buffer atua como uma máscara binária, definindo quais pixels da tela devem ser renderizados e quais devem ser descartados. No ecossistema React Three Fiber, isso é facilitado pelo uso de componentes como Mask e o hook useMask da biblioteca @react-three/drei.10 Para o portfólio de Danilo, o modelo 3D deve aparecer apenas dentro de um recorte específico, ou mudar de cor conforme "atravessa" uma determinada área da tela, criando a ilusão de um objeto que existe em múltiplas dimensões simultaneamente.2

### **Implementação de Stencil Masking com R3F**

Para replicar o efeito de revelação, o blueprint deve prever a criação de uma geometria invisível que escreve no buffer de stencil. Esta geometria define o "portal" através do qual o 3D Ghost será visível. O modelo tridimensional em si deve possuir um material que verifique o valor do stencil antes de pintar cada pixel.10 A matemática por trás desse processo envolve operações de bitwise no buffer, garantindo que o custo computacional seja mínimo, já que o descarte de pixels ocorre nas etapas iniciais do pipeline de renderização da GPU.11

As propriedades fundamentais para a configuração do material do "Ghost" incluem:

- stencilWrite: Ativado para permitir a interação com o buffer.
- stencilFunc: Definido como EqualStencilFunc (ou similar) para que o objeto só apareça onde o stencilID coincidir.
- stencilRef: O identificador único da máscara.10

Esta técnica permite criar uma narrativa visual onde o manifesto de Danilo ("O Que Me Move") é ilustrado por um objeto 3D que se revela à medida que a filosofia é lida pelo usuário, estabelecendo uma conexão sinestésica entre texto e forma.2

## **Tipografia Cinética: O Poder do Componente SplitText**

Para os textos BeliefFixedHeader e o "Manifesto final", a especificação técnica aponta para o uso da biblioteca React-Bits, especificamente o componente SplitText. Esta ferramenta é uma abstração de alto nível sobre bibliotecas de animação de baixo nível, como GSAP ou Motion, focada em decompor strings de texto em caracteres, palavras ou linhas individuais para manipulação granular.6 A vantagem desta abordagem é a capacidade de criar efeitos de "stagger" (atraso escalonado), onde cada letra surge na tela com um tempo ligeiramente diferente, criando um efeito orgânico de fluxo.13

O componente SplitText do React-Bits permite configurar propriedades como delay, duration e ease diretamente via props, facilitando a manutenção do código.12 No caso do BeliefFixedHeader, que atua como uma âncora visual, a animação deve ser sutil e sofisticada, possivelmente utilizando uma translação no eixo Z (3D transform) para dar profundidade. Já o "Manifesto final" pode utilizar um efeito de revelação por palavras, enfatizando o ritmo da leitura e a importância de cada termo no manifesto.12

### **Configurações de Performance para Texto Animado**

Animar centenas de nós do DOM individualmente pode sobrecarregar o navegador, especialmente em dispositivos móveis. Para mitigar esse risco, o SplitText deve ser configurado para utilizar a propriedade CSS will-change: transform, opacity, sinalizando ao navegador para promover esses elementos para suas próprias camadas de renderização na GPU.17 Além disso, o uso de IntersectionObserver (via prop threshold) garante que a animação só ocorra quando o texto estiver no campo de visão, economizando ciclos de processamento preciosos.12

Abaixo, apresentamos uma comparação de propriedades recomendadas para os dois blocos de texto solicitados:

| Atributo  | BeliefFixedHeader (Fixo)        | Manifesto Final (Fluxo) |
| :-------- | :------------------------------ | :---------------------- |
| splitType | chars                           | words                   |
| stagger   | 0.05s por caractere             | 0.08s por palavra       |
| from      | { opacity: 0, y: 50, z: \-100 } | { opacity: 0, x: \-20 } |
| to        | { opacity: 1, y: 0, z: 0 }      | { opacity: 1, x: 0 }    |
| duration  | 1.2s                            | 0.8s                    |
| easing    | power3.out (GSAP)               | expo.out (GSAP)         |

## **Integração de Ativos de Vídeo e Transições Dinâmicas de Background**

Um dos requisitos mais específicos do pedido de Danilo é a utilização do vídeo anima.mov como referência para a transição de background. Tecnicamente, em vez de simplesmente reproduzir um arquivo de vídeo no fundo, a abordagem mais moderna e performática consiste em extrair a lógica de cores ou estados do vídeo e aplicá-los programaticamente via shaders ou transições de gradientes da biblioteca Motion.4 Se o vídeo mostra uma mudança de uma atmosfera escura para uma aurora vibrante, essa transição deve ser mapeada para o scrollYProgress da sessão 06\.4

O uso do hook useScroll da Motion permite capturar a porcentagem exata de rolagem da sessão. Com o hook useTransform, podemos mapear o valor de 0 a 1 do scroll para um intervalo de cores hexadecimais ou para a reprodução de frames específicos de um vídeo se utilizarmos a técnica de "video scrubbing".4 Esta última técnica, embora visualmente impressionante, requer um cuidado extremo com a compressão do arquivo e o pré-carregamento para evitar engasgos durante a rolagem.

### **Arquitetura de Transição Cromática Baseada em Dados**

Para que o background reaja conforme o desejado, a implementação deve seguir uma lógica de interpolação matemática. Se ![][image2] representa a posição do scroll no intervalo $$, a cor do background ![][image3] pode ser definida pela função ![][image4]. No blueprint, isso se traduz no uso de motion.div com estilos dinâmicos vinculados a motionValue.

Abaixo, detalhamos o fluxo de dados para a transição do background:

1. **Monitoramento:** O componente ScrollProvider detecta o target (Sessão 06).
2. **Mapeamento:** O scrollYProgress é passado para o componente de background.
3. **Interpolação:** A função useTransform converte o progresso em valores de filter, background-color ou mix-blend-mode.
4. **Sincronização:** O texto animado e o 3D Ghost ajustam seus contrastes automaticamente para manter a acessibilidade conforme o fundo clareia ou escurece.4

## **Blueprint de Implementação MD: Sessão 06-O-QUE-ME-MOVE**

Este documento é a especificação técnica final pronta para ser integrada ao sistema de desenvolvimento de Danilo Novais. Ele contém a estrutura de componentes e a lógica de animação necessária para satisfazer todos os requisitos.

# **Blueprint de Implementação: Sessão 06-O-QUE-ME-MOVE**

## **1\. Visão Geral do Componente**

Esta sessão orquestra uma experiência imersiva onde o manifesto pessoal é revelado através de scroll. Ela utiliza um background dinâmico inspirado em anima.mov, um elemento 3D etéreo baseado em drinksom.eu e tipografia cinética via React-Bits.

## **2\. Dependências Necessárias**

- framer-motion (Motion.dev)
- @react-three/fiber
- @react-three/drei
- gsap
- react-bits (Custom Component: SplitText)

## **3\. Implementação do Background e Scroll Logic**

Utiliza-se o hook useScroll para capturar o progresso da sessão.javascript

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Section06 \= () \=\> {

const containerRef \= useRef(null);

const { scrollYProgress } \= useScroll({

target: containerRef,

offset: \["start end", "end start"\]

});

// Amortecimento da rolagem para suavidade extrema

const smoothProgress \= useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

// Transição de cor baseada no vídeo anima.mov

const backgroundColor \= useTransform(

smoothProgress,

\[0.1, 0.4, 0.8\],

\["\#050505", "\#1a1a2e", "\#ffffff"\]

);

return (

\<motion.section ref={containerRef} style={{ backgroundColor }} className="relative h-\[300vh\]"\>

\</motion.section\>

);

};

\#\# 4\. O Cabeçalho Fixo (BeliefFixedHeader)  
Implementação utilizando \`SplitText\` para revelação de caracteres.

\`\`\`javascript  
import SplitText from './react-bits/SplitText';

const BeliefFixedHeader \= ({ progress }) \=\> {  
 return (  
 \<div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none"\>  
 \<SplitText  
 text="BELIEF SYSTEM"  
 className="text-8xl font-black uppercase tracking-tighter"  
 delay={50}  
 animationFrom={{ opacity: 0, y: 100, rotateX: 90 }}  
 animationTo={{ opacity: 1, y: 0, rotateX: 0 }}  
 easing="power4.out"  
 threshold={0.1}  
 /\>  
 \</div\>  
 );  
};

## **5\. Cena 3D Ghost (Referência drinksom.eu)**

Integração de R3F com Stencil Masking.

JavaScript

import { Canvas } from '@react-three/fiber';  
import { Mask, useMask, Float, MeshDistortMaterial } from '@react-three/drei';

const GhostEffect \= () \=\> {  
 const stencil \= useMask(1); // Ativa o filtro do portal ID 1

return (  
 \<Float speed\={2} rotationIntensity\={0.5} floatIntensity\={1}\>  
 \<mesh\>  
 \<sphereGeometry args\={} /\>  
 \<MeshDistortMaterial  
 {...stencil}  
 speed\={3}  
 distort\={0.4}  
 color\="\#444"  
 roughness\={0.1}  
 metalness\={1}  
 /\>  
 \</mesh\>  
 \</Float\>  
 );  
};

const GhostCanvas \= ({ progress }) \=\> {  
 const maskScale \= useTransform(progress, \[0.3, 0.6\], );

return (  
 \<div className\="fixed inset-0 z-10 pointer-events-none"\>  
 \<Canvas camera\={{ position:  }}\>  
 \<Mask id\={1} position\={}\>  
 \<motion.circleGeometry args\={} scale\={maskScale} /\>  
 \</Mask\>  
 \<GhostEffect /\>  
 \<ambientLight intensity\={0.5} /\>  
 \<pointLight position\={} /\>  
 \</Canvas\>  
 \</div\>  
 );  
};

## **6\. Manifesto Final**

Animação por palavras para ritmo de leitura.

JavaScript

const ManifestoFinal \= ({ progress }) \=\> {  
 return (  
 \<div className\="h-screen flex items-end p-20"\>  
 \<SplitText  
 text\="A inovação não é um destino, é a força que move cada pixel em direção ao futuro."  
 className\="text-4xl max-w-2xl leading-tight"  
 splitType\="words"  
 delay\={80}  
 animationFrom\={{ opacity: 0, x: \-50 }}  
 animationTo\={{ opacity: 1, x: 0 }}  
 threshold\={0.5}  
 /\>  
 \</div\>  
 );  
};

## **7\. Estilos Globais Sugeridos (CSS)**

CSS

.split-parent { overflow: hidden; }  
.split-child { display: inline-block; will-change: transform; }  
canvas { touch-action: none; }

\#\# Considerações sobre Performance e Experiência do Usuário (UX)

A orquestração de uma página tão rica em recursos exige uma vigilância constante sobre a "Main Thread" do navegador. Ao utilizar o GSAP para o componente \`SplitText\` e a Motion para as transições de background, Danilo aproveita o melhor de dois mundos: a precisão cronométrica do GSAP para tipografia e a eficiência de hardware da Motion para transformações de layout.\[6, 17, 20\] Entretanto, é vital garantir que a cena 3D não consuma recursos desnecessários quando não estiver visível. O uso do componente \`AdaptiveEvents\` ou simplesmente o descarte de frames (\`frameloop="demand"\`) no R3F pode ser considerado se a performance em dispositivos móveis for uma preocupação.\[1, 3\]

Além da performance técnica, a UX da sessão 06 deve ser pautada pela acessibilidade. Animações disparadas por scroll podem ser desconfortáveis para usuários com sensibilidades vestibulares. Recomenda-se a implementação de um "media query" CSS ou uma verificação via hook \`useReducedMotion\` da Motion para simplificar ou desativar as transições de translação mais agressivas para esses usuários.\[1, 4, 6\] A elegância do design reside não apenas no que se move, mas em como o movimento respeita os limites do observador.

\#\# Conclusão: A Convergência entre Arte e Código

A reestruturação da sessão "06-O-QUE-ME-MOVE" representa um salto qualitativo na narrativa digital de Danilo Novais. Ao alinhar as melhores práticas de bibliotecas como React Three Fiber, Motion.dev e React-Bits, o projeto não apenas cumpre os requisitos visuais solicitados, mas estabelece um novo patamar de interatividade para portfólios profissionais.\[2, 6\] O uso de técnicas avançadas como Stencil Masking e interpolação cromática baseada em scroll transforma a leitura de um manifesto em uma jornada sensorial, onde cada centímetro de rolagem revela uma nova camada da identidade criativa do autor.\[7, 11, 14\] Este relatório e o blueprint anexo servem como o mapa definitivo para a execução desta visão, garantindo uma implementação que é, ao mesmo tempo, tecnicamente robusta e visualmente deslumbrante.

#### **Referências citadas**

1. React Three Fiber: Introduction, acessado em maio 11, 2026, [https://r3f.docs.pmnd.rs/](https://r3f.docs.pmnd.rs/)
2. After Five Years: A New React Three Fiber Portfolio Build \- Showcase \- three.js forum, acessado em maio 11, 2026, [https://discourse.threejs.org/t/after-five-years-a-new-react-three-fiber-portfolio-build/90146](https://discourse.threejs.org/t/after-five-years-a-new-react-three-fiber-portfolio-build/90146)
3. React-Three-Fiber: Making 3D So Easy, You'll Think You're in a Game\! \- Eftee Codes, acessado em maio 11, 2026, [https://efteecodes.medium.com/react-three-fiber-making-3d-so-easy-youll-think-you-re-in-a-game-f5d5471aac22](https://efteecodes.medium.com/react-three-fiber-making-3d-so-easy-youll-think-you-re-in-a-game-f5d5471aac22)
4. React scroll animation — scroll-linked & parallax \- Motion.dev, acessado em maio 11, 2026, [https://motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations)
5. Motion component \- React \- Motion.dev, acessado em maio 11, 2026, [https://motion.dev/docs/react-motion-component](https://motion.dev/docs/react-motion-component)
6. appletosolutions/reactbits \- GitHub, acessado em maio 11, 2026, [https://github.com/appletosolutions/reactbits](https://github.com/appletosolutions/reactbits)
7. Scroll-triggered animation step-by-step tutorial \- Motion.dev, acessado em maio 11, 2026, [https://motion.dev/tutorials/js-scroll-triggered](https://motion.dev/tutorials/js-scroll-triggered)
8. Modern Elixir From Ancient Core: SOM, acessado em maio 11, 2026, [https://www.drinksom.eu](https://www.drinksom.eu)
9. Introduction to Shaders \- Wawa Sensei, acessado em maio 11, 2026, [https://wawasensei.dev/courses/react-three-fiber/lessons/shaders-introduction](https://wawasensei.dev/courses/react-three-fiber/lessons/shaders-introduction)
10. Use object to selectively mask other objects \- Questions \- three.js forum, acessado em maio 11, 2026, [https://discourse.threejs.org/t/use-object-to-selectively-mask-other-objects/41271](https://discourse.threejs.org/t/use-object-to-selectively-mask-other-objects/41271)
11. Mask \- Drei, acessado em maio 11, 2026, [https://drei.docs.pmnd.rs/portals/mask](https://drei.docs.pmnd.rs/portals/mask)
12. Split Text \- React Bits, acessado em maio 11, 2026, [https://www.reactbits.dev/text-animations/split-text](https://www.reactbits.dev/text-animations/split-text)
13. Split text step-by-step tutorial \- Motion.dev, acessado em maio 11, 2026, [https://motion.dev/tutorials/react-split-text](https://motion.dev/tutorials/react-split-text)
14. 5 micro-animations to make your UI feel more alive | Motion 12 | Digital Consultancy, acessado em maio 11, 2026, [https://motion12.digital/blogs/5-micro-animations-to-make-your-ui-feel-more-alive](https://motion12.digital/blogs/5-micro-animations-to-make-your-ui-feel-more-alive)
15. Installation \- React Bits, acessado em maio 11, 2026, [https://www.reactbits.dev/get-started/installation](https://www.reactbits.dev/get-started/installation)
16. Using SplitText in React Component including nested components \- GSAP, acessado em maio 11, 2026, [https://gsap.com/community/forums/topic/42229-using-splittext-in-react-component-including-nested-components/](https://gsap.com/community/forums/topic/42229-using-splittext-in-react-component-including-nested-components/)
17. SplitText Headers Flicker (Flash Briefly into View) on Page Transition \- GSAP, acessado em maio 11, 2026, [https://gsap.com/community/forums/topic/36319-splittext-headers-flicker-flash-briefly-into-view-on-page-transition/](https://gsap.com/community/forums/topic/36319-splittext-headers-flicker-flash-briefly-into-view-on-page-transition/)
18. SplitText \+ Gradient in React not working \- Stack Overflow, acessado em maio 11, 2026, [https://stackoverflow.com/questions/79397077/splittext-gradient-in-react-not-working](https://stackoverflow.com/questions/79397077/splittext-gradient-in-react-not-working)
19. How to trigger background color change on scroll \- Framer Community, acessado em maio 11, 2026, [https://www.framer.community/c/support/how-to-trigger-background-color-change-on-scroll](https://www.framer.community/c/support/how-to-trigger-background-color-change-on-scroll)

[image1]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAXCAYAAADp7bafAAAE+0lEQVR4Xu2aV6gkRRSGj2ExoGsEUdSFFcXwIEYQBRFFFARxWcy6ii8GTCgqGDCBYkBRUDA8KCz7sGACFVFhMYIBVEwYMGPCjDmeb6trPH2mqru6787svdAf/Nytv07VnJk5XdNVvSIDAwMDc5FjKu3jOwYGHLFWUCt/qHZSbeU7BgYc1An613ek+M0bFXdJmOBj1baur4TzVad5U9lEwrwXq05SHas6WnVUpXVGkWXcKOHi+Ea1n+vLsZvqCdXuqjVVC1U3qx6wQcr3qhMk5LyRarHqu1pEOZeqflT9ojrF9eUozZP3f45qC9V6qoNUH9qAjqwtYc4cvQvrH9XBps1Eh5h2jmUSEiIenV7vXsmJ8n9/SrypUn5QXW3av6quNe0cfPD+db+qRQR8DNq6FlHGm6rHTft11bOmnWMmeR5QiyjjbanPkaOpb4QvrKtkfOBhCa8N4lOFtVy1RLWranvVdhKuxPul8Le74kAZz2nThJdif9XDElblK1Ub1LtHMNc1qtskvF4f5ks6J7yNvenokuflEuJY9WcKK2sq50hT3whfWAziCvPgb+PNBnKFxariYV6uli7EldGDd7w3HfxkXuHNBKn5u/KKpOfBoxCamGaelokVFr/rHvxbvNlArrBSFCXqYMyf3pTgv+ZNx74yvS+MOVLz5HzLNPO0TKywHnIe4D/qzQZKC4srus/9APPzAXjwU6uihaOVpRJiuS/khvqpWkSA/ndUb6ieU/0l3e4BIVdAOd/SJU/u4T5TPVK1uZHvyyovLHYeDLrPeBH8d73ZAPFneNOxlhQmmYBx33pTyr4wdlkfOY8xTyc8u0uNX1oXcvnkfEuXPBeY9gWV15dVXljAIL+dhdQbaoL4M73peFH6b4uZn+MADz672q58Ie0f2I4SYjg6KCVXQDm/jZI8gZgnvVnIxArrMecB/p3ebID4s7zpIOY6bxbC2N+9KcHvsrJGVkgYa39CWFEtcUV/y/lN5Aoo57exQsbznGf+Hek7P0yssHK7wi5bWeI5tMvBST8xJedjKXIfHN7t3nSkxr5UeetW7fdcG9ju4z1jvDZ+kvHXAry2Ai3J8+6qvdcoIoCX2tyUMJHCoqj8wL0THoVxhPMsxJ/rTcNNEmI4z0rBCfLZ3jRwtuRzWqPy7BWcypMYztMs/viCJw4/mzZwERDD04IIr3mJaXuOlPE8AW8P06ZQ/D1pSZ73qv6WkEdkQwkxdxgPLnPtHBMprHjIaK9UrrqXTRuIyb3A5hL6bvAdhnjKy+Foijg/RZ2D/l1M+wUZ3ymm8mQnylY+sqWEmCXG42ztfdMGPiu/4+RREmO5Yc5B/6mmfX3lWWKeOxuvJE9+nn1OH8j4/BxA47EBaYPdpx9vaeob4QsL4qOEByU8G3u+3r2Si2T8Jp+r62vVp6pPqr9fSvq5060SXoOVKcUiCdvne3yHYYGEObhJZYUh3pPKE+LKHFcA3rMnPn5iXv6mHsOw4lJcfvdm4T0ynsJ/VcJnblcYOFzCZsZTkueeEvr4rPnLZ+9hweC7aSoKFpDPJYxHvG923jwdsTTNMSJVWLMFlvQLvTlL6XLGtzrh+epMmfOF1bRazSZOln4Pp6fNDqrjvNmDOV1Ym0n60dJshLOluUCf870URYXFWRD/12h937Ga6fr/sgba8fd1XaFOUFFhnVfpUN8xMOCItYIGBqbHfy6Sri2lty/mAAAAAElFTkSuQmCC
[image2]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAAqklEQVR4XmNgGLJADYhnArEvklgJEhsFsALxPyCeDcR8QGwHxP+BuAaIPyOpQwEgBTboggwQ8Sp0QRBYwACRxAZA4iBXYACQBD5NWAFMUy+6BD7QzYDQCMMzUFTgAHkMmBpvoaggAFwY8PuTIRhdAAoWM+DQ5AfEBeiCUFDKgEPTWSBehy4IBX8ZcAQGzN08aOJrGfAknSdAzATEHxggmt9D6QVIakbBwAEAIrItoSGpzDcAAAAASUVORK5CYII=
[image3]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAsUlEQVR4XmNgGJZAGogLgHgmECshiVshsTHAYiD+D8S3gdgbiFWBeBoQPwdiS6gcVgCS+AfE/OgSQFDJAJG/hC4BAn8Y8JgKBSD5IHTBD1AJTnQJNIBhuC5U8Ba6BBaAofkvVBCbPwkCkEYME4kFZGtmZoBofIkugQVgtYAYmy2AOAFdEATuMkA0g1yBDYDEX6ELIgOQZlAiQTfACIhfo4lhBbsZEF74CqVTUVSMgqEIAG1gK0HBSgf2AAAAAElFTkSuQmCC
[image4]: data:image/png;base64,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
