:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

## \*\* ANEXO TÉCNICO

Implementação de Estética de Vidro Líquido Interativo de Alta Fidelidade em Ambientes Web

Uma Análise Técnica Abrangente dos Fluxos de Trabalho React Three Fiber

Objetivo: Documentar de forma aprofundada o raciocínio técnico por trás da bola de vidro líquido da Hero, servindo como referência para ajustes futuros e novos experimentos 3D no portfólio.

⸻

1. Estratégia Global de Arquitetura e Performance
   1.1. Configuração do Canvas e Scroll (R3F + Lenis)
   Para garantir que os elementos 3D fixos ou flutuantes estejam perfeitamente sincronizados com o scroll suave do Lenis, o Canvas deve ser configurado para usar o DOM principal como fonte de eventos.

- Implementação:
  _ Wrapper Global: O <Canvas> deve residir no layout.tsx ou num wrapper global, posicionado com position: fixed; pointer-events: none;.
  _ Event Source: Propriedade obrigatória para corrigir o raycasting do mouse durante o scroll: <Canvas eventSource={document.body} ... />.
  _ DPR (Device Pixel Ratio): Limitar para economizar GPU em telas Retina/4K.
  _ Config: dpr={[1, 1.5]} (Permite no máximo 1.5x de densidade, visualmente indistinguível de 2x/3x mas muito mais leve).
  1.2. Estratégia de Performance WebGL (Mobile Tiering)
  O uso de materiais de vidro (MeshTransmissionMaterial) é custoso. Devemos implementar uma estratégia de degradação graciosa para dispositivos móveis.
- Hook de Detecção: Criar/usar hook useMobile para definir a qualidade.
- Configuração de Material:
  _ Desktop: samples={16}, resolution={1024}, transmission={1}.
  _ Mobile: samples={4}, resolution={512}, anisotropy={0}. \* Fallback Extremo: Se FPS < 30, trocar o material de transmissão por um MeshPhysicalMaterial simples (vidro fosco estático) sem refração em tempo real.
  1.3. UX e Estado de Carregamento (Preloader)
  Como o site carrega modelos e texturas pesadas, o estado "branco" inicial deve ser evitado.
- Overlay de Preloader:
  - Componente fixed z-50 cobrindo a tela.
  - Uso do hook useProgress do @react-three/drei.
  - Mostrar progresso numérico ou visual minimalista.
  - Transição: Quando progress === 100, disparar animação de saída (fade-out/slide-up) do overlay e disparar a entrada dos elementos da Home via Store global (Zustand).

2. Fundamentos Arquiteturais do WebGL Moderno

2.1. O Paradigma React Three Fiber (R3F)
• R3F é um reconciliador, assim como o react-dom, mas para objetos Three.js.
• A cena 3D passa a ser descrita de forma declarativa, guiada por estado React.
• Benefícios:
• Reutiliza hooks e sistema de estado (Zustand, Context API, etc.)
• Facilita controlar propriedades de objetos 3D a partir do DOM (scroll, mouse, inputs).

2.1.1. Loop de Renderização e useFrame
• No Three.js puro, o dev cria o requestAnimationFrame manualmente.
• Em R3F, useFrame injeta lógica a cada frame, com acesso a:
• state.clock e delta (tempo entre frames).
• Isso permite animações independentes do frame rate, essenciais para:
• distorções temporais de material (temporalDistortion)
• rotação suave baseada em scroll.

2.2. Papel do @react-three/drei
• Drei é uma coleção de helpers e componentes de alto nível.
• Para este projeto, o mais importante é o MeshTransmissionMaterial, que:
• encapsula shaders complexos de transmissão/refração
• gerencia buffers internos para capturar o que está “atrás” do vidro
• expõe props de alto nível (distortion, chromaticAberration, etc.)
• Sem ele, seria necessário:
• configurar WebGLRenderTarget
• gerenciar render pass separado para o fundo
• escrever shader GLSL customizado para refração em screen-space.

⸻

3. Pipeline de Ativos: do GLB para JSX

3.1. Sobre o formato GLB
• GLB é o padrão moderno para 3D na web:
• carrega geometria, texturas, animações e hierarquias em um único arquivo binário.
• Porém, carregar apenas com:

const { scene } = useGLTF('/media/torus_dan.glb');
<primitive object={scene} />

dificulta customizar materiais em nível de mesh.

3.2. Ferramenta gltfjsx
• gltfjsx percorre o GLB e gera um componente React:

npx gltfjsx public/media/torus_dan.glb --transform

    •    Saída (simplificada):

import { useGLTF } from '@react-three/drei';

export function TorusDan(props: JSX.IntrinsicElements['group']) {
const { nodes } = useGLTF('/media/torus*dan.glb');
return (
<group {...props} dispose={null}>
<mesh geometry={nodes.Torus.geometry}>
{/* material será substituído \_/}
</mesh>
</group>
);
}

    •    Isso permite injetar o MeshTransmissionMaterial diretamente na mesh correta.

3.3. Otimização e Draco
• A flag --transform aplica:
• normalização de escala
• centralização
• compressão Draco da geometria.
• Benefícios:
• reduz tamanho do GLB
• acelera carregamento em redes móveis
• mantém qualidade alta para o efeito de vidro (que se beneficia de mais polígonos).

⸻

4. Física do Vidro Líquido: MeshTransmissionMaterial

4.1. Transmissão em PBR
• Diferente de simples opacity, transmissão simula:
• Refração: desvio da luz ao atravessar o material.
• Absorção: atenuação da luz com a espessura (Lei de Beer-Lambert).
• Espalhamento: difusão interna (efeito “leitosa” / subsurface).

4.2. Parâmetros principais (visão prática)
• transmission: controla a transparência (para o toro, 1.0).
• thickness: simula volume; valores médios (0.4–0.8) funcionam bem.
• roughness: rugosidade superficial; vidros líquidos pedem valores bem baixos (0–0.2).
• ior: índice de refração; 1.1–1.3 dá aspecto “aquoso” sem exagerar reflexos internos.
• chromaticAberration: separa levemente canais de cor nas bordas; ótimo para realismo.
• distortion / distortionScale: definem amplitude e frequência das ondas líquidas.
• temporalDistortion: anima o padrão de distorção ao longo do tempo.
• backside: importante para ver a espessura interna de toros e objetos fechados.

4.2.1. Distorção
• O shader aplica ruído nas coordenadas de lookup da textura de fundo.
• Amplitude média (≈0.5) cria:
• aparência de gel / água suspensa
• sem destruir a legibilidade da forma.

4.2.2. IOR e realismo
• Vidro real ≈ 1.5, diamante ≈ 2.4.
• Para web criativa:
• 1.1–1.3 equilibra realismo e legibilidade
• evita áreas pretas causadas por reflexões internas totais exageradas.

⸻

5. Ambiente e Iluminação

5.1. Ambiente HDRI
• Environment preset="city" fornece:
• áreas de alto contraste (janelas, céu)
• bons highlights especulares no vidro.
• Opção:
• background={false} → usa HDRI apenas como iluminação, fundo controlado via CSS.

5.2. Luzes analíticas
• Combinar:
• ambientLight baixa para preenchimento.
• directionalLight ou spotLight com angle pequeno para rim light.
• Efeito:
• silhueta do toro bem recortada
• destaques fortes que reforçam a sensação de superfície molhada.

⸻

6. Interatividade e Animação

6.1. Mouse Parallax

6.1.1. Otimização com state do R3F
• Ao invés de listeners globais de mousemove, usar state.mouse dentro de useFrame:

useFrame((state, delta) => {
const { mouse } = state; // -1 → 1
// aplicar em rotação/posição com damp
});

    •    Benefícios:
    •    Menos overhead de event listeners
    •    Sincronizado com o loop de render do R3F.

6.2. Scroll Controlado
• ScrollControls + useScroll:

<ScrollControls pages={4} damping={0.3}>
  <TorusDan />
</ScrollControls>

    •    No modelo:

const scroll = useScroll();

useFrame((state, delta) => {
const offset = scroll.offset; // 0 → 1
const target = offset _ Math.PI _ 4;
mesh.current.rotation.y = THREE.MathUtils.damp(
mesh.current.rotation.y,
target,
4,
delta
);
});

    •    Sensação final:
    •    o usuário “gira” o toro conforme percorre a seção
    •    animação física / suave (sem travadas).

⸻

7. Guia de Implementação (Resumo Passo a Passo)
   1. Projeto
      • Next.js App Router + TypeScript
      • Instalar:
      • three
      • @react-three/fiber
      • @react-three/drei
      • framer-motion
   2. Ativo 3D
      • Salvar torus_dan.glb em public/media.
      • Rodar gltfjsx com --transform.
   3. Cena Principal
      • Criar componente HeroGlassScene.tsx com <Canvas> + <Environment> + luzes.
   4. Modelo Interativo
      • Usar componente gerado (TorusDan)
      • Substituir material pelo MeshTransmissionMaterial.
      • Conectar useScroll & useFrame.
   5. Integração com Layout
      • Embed do Canvas em container responsivo.
      • Sincronizar altura da seção hero com animação do vídeo manifesto.
   6. Performance
      • Ajustar samples e resolution de acordo com device.
      • Usar Suspense + fallback leve para carregamento do GLB.

⸻

8. Performance e Otimização

8.1. Resolução e samples
• Reduções possíveis sem degradar demais o visual:
• resolution: 1024 → 512
• samples: 16 → 6 em laptops / mobile.

8.2. Múltiplos Objetos de Vidro
• Caso a cena ganhe mais elementos de vidro:
• avaliar uso de transmissionSampler compartilhado.
• ou limitar objetos de vidro ao hero para manter FPS.

8.3. Mobile
• Estratégia sugerida:
• Dispositivos high-end:
• manter MeshTransmissionMaterial completo.
• Dispositivos low-end:
• reduzir qualidade OU
• fallback para MeshPhysicalMaterial translúcido sem refração pesada.

⸻

9. Conclusão

A bola de vidro líquido do hero não é apenas um elemento decorativo, mas uma peça central de branding que:
• Comprime o discurso “Design, não é só estética.” em uma forma viva, tátil e interativa.
• Demonstra domínio técnico de WebGL/R3F alinhado à estratégia de posicionamento.
• Traz para o portfólio de Danilo a mesma sensibilidade de movimento e refinamento visual de experiências como loandbehold.studio.

A combinação de:
• MeshTransmissionMaterial
• ScrollControls + useScroll
• useFrame + state.mouse

cria uma pipeline reutilizável para futuros experimentos de vidro líquido, blobs, shapes abstratos e outras formas 3D de alta fidelidade dentro do portfólio.

⸻

9. Referência Rápida de Parâmetros

Valores típicos para o material da bola de vidro na hero (podem ser refinados em desenvolvimento).

    •    transmission: 1.0
    •    thickness: 0.4 – 0.8
    •    roughness: 0.0 – 0.15
    •    ior: 1.2 – 1.3
    •    chromaticAberration: 0.04 – 0.07
    •    distortion: 0.45 – 0.6
    •    distortionScale: 0.3 – 0.45
    •    temporalDistortion: 0.18 – 0.3
    •    samples: 12 – 16 (desktop), 4 – 8 (mobile high-end)
    •    resolution: 512 – 1024

⸻

9.1. Snippet de Rotação com Amortecimento

useFrame((state, delta) => {
const scrollOffset = scroll.offset; // 0 → 1
const targetRotation = scrollOffset _ Math.PI _ 2;

mesh.current.rotation.y = THREE.MathUtils.damp(
mesh.current.rotation.y,
targetRotation,
4,
delta
);
});

⸻

9.2. Caminho do Arquivo GLB
• Arquivo físico: public/media/torus_dan.glb
• Caminho de carregamento em R3F:

useGLTF('/media/torus_dan.glb');
